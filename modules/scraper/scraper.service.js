import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';

// eslint-disable-next-line no-use-before-define
export { startBrowser, scrapSearchLinkedin, loginLinkedin, scrapCompanyInformationsLinkedin,convertFileToBase64 };

async function startBrowser() {
	let browser;
	try {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true,
			args: ["--disable-setuid-sandbox", '--lang=fr-FR,fr'],
			'ignoreHTTPSErrors': true
		});
	} catch (err) {
		console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

async function loginLinkedin (browser) {
	let url = 'https://www.linkedin.com/uas/login';
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('.login__form');
	await page.type('#username', process.env.LINKEDIN_EMAIL);
	await page.type('#password', process.env.LINKEDIN_PASSWORD);
	await Promise.all([
		page.click('.from__button--floating'),
	]);
	await page.close();
}

async function scrapCompanyInformationsLinkedin (browser, companyName) {
	let url = 'https://www.linkedin.com/company/' + companyName + '/about/';
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForFunction(() =>
		document.querySelectorAll('#main, .global-error').length
	);

	const company = await page.evaluate(() => {
		let companyInfos = {};

		if (document.querySelector('.global-error'))
			return companyInfos;

		companyInfos.name = document.querySelector('h1 > span')?.textContent?.trim() || '';
		companyInfos.logo = document.querySelector('.org-top-card-primary-content__logo-container > img')?.src || '';
		companyInfos.description = document.querySelector('.white-space-pre-wrap')?.textContent?.trim() || '';

		const dt = document.querySelectorAll('dl > dt');
		const dl = document.querySelectorAll('dl > dd');
		for (let i = 0; i < dt.length; i++) {
			switch (dt[i].textContent.trim()) {
				case 'Site web':
					companyInfos.webSite = dl[i]?.textContent?.trim() || '';
					break;
				case 'Taille de l’entreprise':
					companyInfos.employeeCount = dl[i]?.textContent?.trim().split(' ')[0] || '';
					companyInfos.linkedinEmployeeCount = dl[i+1]?.childNodes[1]?.nodeValue?.replace(/\D/g, "") || '';
					break;
				case 'Fondée en':
					companyInfos.foundedDate = dl[i+1]?.textContent?.trim() || '';
					break;
			}
		}

		return companyInfos;
	});
	return company;
}

async function scrapSearchLinkedin(browser, companyName) {
	let url = 'https://www.linkedin.com/search/results/companies/?keywords=' + companyName;
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('.search-results-container');

	const companies = await page.evaluate(() => {
		let companies = [];
		const entityResult = document.querySelectorAll('.entity-result__item');
		for (let i = 0; i < entityResult.length; i++) {
			let company = {};
			company.name = entityResult[i].querySelector('.entity-result__title-text a')?.textContent?.trim() || '';
			company.link = entityResult[i].querySelector('.entity-result__title-text a')?.href?.split('/')[4] || '';
			company.theme = entityResult[i].querySelector('.entity-result__primary-subtitle')?.textContent?.trim() || '';
			company.subscribers = entityResult[i].querySelector('.entity-result__secondary-subtitle')?.textContent?.replace("abonnés", "").trim() || '';
			companies.push(company);
		}
		return companies;
	});
	return companies;
}

function convertFileToBase64(fileUrl) {
	if (!fileUrl) return '';

	return new Promise((resolve, reject) => {
		https.get(fileUrl, (response) => {
			response.on("error", () => resolve(''));
			if (response.statusCode == 403)  resolve('');
			const stream = fs.createWriteStream('logo.png');
				stream.on("finish", () => {
						stream.close();
						let file = "data:image/gif;base64," + fs.readFileSync('logo.png', 'base64');
						fs.unlinkSync('logo.png');
						resolve(file);
				}).on("error", () => resolve(''));
				response.pipe(stream);
		}).on("error", () => resolve(''));
	});
}