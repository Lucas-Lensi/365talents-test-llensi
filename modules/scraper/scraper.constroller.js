import { startBrowser, scrapSearchLinkedin, loginLinkedin, scrapCompanyInformationsLinkedin, convertFileToBase64 } from './scraper.service.js';

// eslint-disable-next-line no-use-before-define
export { scrapCompanies, scrapCompanyInformations };

async function scrapCompanies(company) {
  if (!company) return [];
  const browser = await startBrowser();
  await loginLinkedin(browser);
  let data = await scrapSearchLinkedin(browser, company);
  await browser.close();
  return data;
}

async function scrapCompanyInformations (company) {
  if (!company) return {};
  const browser = await startBrowser();
  await loginLinkedin(browser);
  let data = await scrapCompanyInformationsLinkedin(browser, company);
  data.base64Logo = await convertFileToBase64(data.logo);
  await browser.close();
  return data;
}
