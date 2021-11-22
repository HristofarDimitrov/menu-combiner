const puppeteer = require('puppeteer');

const PIVNI_UCAPA_URL = "https://www.pivnice-ucapa.cz/denni-menu.php";
const SUZIES_URL = "https://www.suzies.cz/poledni-menu";
const MENICKA = "https://www.menicka.cz/4921-veroni-coffee--chocolate.html";

//TODO MAKE IT DYNAMIC
const day = "Čtvrtek";

const startBrowser = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    return { browser, page }
}

const closeBrowser = async (browser) => {
    return browser.close();
}


const getPivniceUcapaData = async () => {
    const { browser, page } = await startBrowser();
    await page.goto(PIVNI_UCAPA_URL);

    const rootDayElement = await page.$x(`//div[@class='day'][contains(., '${day}')]`);
    const rootDayElementParrent = (await rootDayElement[0].$x(".."))[0];
    const rootDayElementGrandparrent = (await rootDayElementParrent.$x(".."))[0];
    const innerNeighborElChildreds = (await rootDayElementGrandparrent.$x('following-sibling::*'))[0];
    const arrayWithTextData = await innerNeighborElChildreds.evaluate(el => [...el.children].map((el => el.textContent)));
    const result = [...arrayWithTextData].map(el => el.replace(/\t|\n/g, " ").trim());

    await closeBrowser(browser);

    return result;
};

const getSuziesData = async () => {
    const { browser, page } = await startBrowser();
    await page.goto(SUZIES_URL);

    const rootDayElement = await page.$x(`//div/h2[contains(., '${day}')]`)
    const parrentEl = (await rootDayElement[0].$x(".."))[0];
    const arrayWithTextData = await parrentEl.evaluate(el => [...el.children].map((el => el.textContent)))
    const result = [...new Set(arrayWithTextData)].reduce((acc, el, index, array) => {
        if (index !== 0 && index !== 1 && index !== array.length - 1) {
            acc.push(el.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ').trim())
        }

        return acc
    }, [])

    await closeBrowser(browser);

    return result;
};

const getMemickaData = async () => {
    const { browser, page } = await startBrowser();
    await page.goto(MENICKA);

    const rootDayElement = await page.$x(`//div[@class='nadpis'][contains(., '${day}')]`);
    const siblingElement = (await rootDayElement[0].$x('following-sibling::*'))[0];
    const arrayWithTextData = await siblingElement.evaluate(el => [...el.children].map((el => el.textContent)))
    const result = [...arrayWithTextData].map(el => el.replace(/\t|\n/g, " ").trim())

    await closeBrowser(browser);

    return result;
}


module.exports = { getPivniceUcapaData, getSuziesData, getMemickaData };