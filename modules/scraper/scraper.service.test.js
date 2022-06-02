/* eslint-disable no-undef */
import chai from 'chai';

import { startBrowser, loginLinkedin, scrapCompanyInformationsLinkedin, scrapSearchLinkedin, convertFileToBase64 } from './scraper.service.js';

const { expect } = chai;

describe('scrapper', () => {

	before (async function () {
    global.browser = await startBrowser();
		await loginLinkedin(browser);
  });

	after (async function () {
    await browser.close();
  });

	describe('scrapSearchLinkedin', function () {
		it('should return an empty array if no data', async () => {
			const response = await scrapSearchLinkedin(browser, 'dxwfgn gxhgf,xg');
			expect(response).to.be.an('array').and.have.lengthOf(0);
		});
		it('should return an array of companies', async () => {
			const response = await scrapSearchLinkedin(browser, '365talents');
			expect(response).to.be.an('array').and.have.lengthOf(3);
			expect(response[0]).to.be.an('object').and.have.keys('name', 'link', 'theme', 'subscribers');
			expect(response[0].name).to.equal('365Talents');
			expect(response[0].link).to.equal('365talents');
			expect(response[0].theme).to.equal('Logiciels informatiques • Lyon, Auvergne-Rhone-Alpes');
			expect(response[0].subscribers).to.equal('3,1 mille');
		});
	})

	describe('scrapCompanyInformationsLinkedin', () => {
		it('should return an empty object if no data', async () => {
			const response = await scrapCompanyInformationsLinkedin(browser, 'dxwfgn gxhgf,xg');
			expect(response).to.be.empty;
		});
		it('should return an object with company informations', async () => {
			const response = await scrapCompanyInformationsLinkedin(browser, '365talents');
			expect(response).to.be.an('object').and.have.keys('name', 'logo', 'webSite', 'employeeCount', 'linkedinEmployeeCount', 'foundedDate', 'description');
			expect(response.name).to.equal('365Talents');
			expect(response.logo).to.equal('https://media-exp2.licdn.com/dms/image/C4D0BAQEM_bhwh1rcjQ/company-logo_200_200/0/1553619292550?e=1661990400&v=beta&t=xW1l5f5pvSfx4cc0l1krP3SLanz-vXwEIT-GdjqLyD0');
			expect(response.webSite).to.equal('https://www.365talents.com/');
			expect(response.employeeCount).to.equal('51-200');
			expect(response.linkedinEmployeeCount).to.equal('65');
			expect(response.foundedDate).to.equal('2015');
		});
	})

	describe('convertFileToBase64', () => {
		it('should download and convert file to base64', async () => {
			expect(await convertFileToBase64('https://media-exp2.licdn.com/dms/image/C4D0BAQEM_bhwh1rcjQ/company-logo_200_200/0/1553619292550?e=1661990400&v=beta&t=xW1l5f5pvSfx4cc0l1krP3SLanz-vXwEIT-GdjqLyD0')).to.be.an('string');
		})
		it('should send an empty string if no url is given', async () => {
			expect(await convertFileToBase64('')).to.be.an('string').and.have.lengthOf(0);
		})
		it('should send an empty string if an error occured', async () => {
			expect(await convertFileToBase64('https://media-exp2.licdn.com/dms/image/test-aucun-fichier')).to.be.an('string').and.have.lengthOf(0);
			expect(await convertFileToBase64('https://test-rien.com')).to.be.an('string').and.have.lengthOf(0);
		})
	})

})