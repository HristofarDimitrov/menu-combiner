const puppeteer = require('puppeteer');

const PIVNI_UCAPA_URL = "https://www.pivnice-ucapa.cz/denni-menu.php";
const SUZIES_URL = "https://www.suzies.cz/poledni-menu";
const MENICKA = "https://www.menicka.cz/4921-veroni-coffee--chocolate.html";

const getTodaysDay = () => {
    const todayDate = new Date().getDay();
  
    switch (todayDate) {
      case 0:
        return 'Neděle';
      case 1:
        return 'Pondělí';
      case 2:
        return 'Úterý';
      case 3:
        return 'Středa';
      case 4:
        return 'Čtvrtek';
      case 5:
        return 'Pátek';
      case 6:
        return 'Sobota';
    }
  };

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

    const rootDayElement = await page.$x(`//div[@class='day'][contains(., '${getTodaysDay()}')]`);
    if(rootDayElement.length){
        const rootDayElementParrent = (await rootDayElement[0].$x(".."))[0];
        const rootDayElementGrandparrent = (await rootDayElementParrent.$x(".."))[0];
        const innerNeighborElChildreds = (await rootDayElementGrandparrent.$x('following-sibling::*'))[0];
        const arrayWithTextData = await innerNeighborElChildreds.evaluate(el => [...el.children].map((el => el.textContent)));
        const result = [...arrayWithTextData].map(el => el.replace(/\t|\n/g, " ").trim());

        await closeBrowser(browser);
    
        return result;
    }
    
    return []
};

const getSuziesData = async () => {
    const { browser, page } = await startBrowser();
    await page.goto(SUZIES_URL);

    const rootDayElement = await page.$x(`//div/h2[contains(., '${getTodaysDay()}')]`)
    if(rootDayElement.length){
        const parrentEl = (await rootDayElement[0].$x(".."))[0];
        const arrayWithTextData = await parrentEl.evaluate(el => [...el.children].map((el => el.textContent)))
        const result = [...new Set(arrayWithTextData)].reduce((acc, el, index, array) => {
            if (index !== 0 && index !== 1 && index !== array.length - 1) {
                const trimedEl = el.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ').trim();
                if (acc.forCombination.length === 0) {
                    acc.forCombination.push(trimedEl);
                  } else {
                    const combined = acc.forCombination[0] + ' - ' + trimedEl;
              
                    acc.forCombination.pop();
              
                    acc.final.push(combined);
                  }
            }
    
            return acc
        }, {
            forCombination: [],
            final: [],
        });
    
        await closeBrowser(browser);
    
        return result.final;
    }

    return [];
};

const getMemickaData = async () => {
    const { browser, page } = await startBrowser();
    await page.goto(MENICKA);

    const rootDayElement = await page.$x(`//div[@class='nadpis'][contains(., '${getTodaysDay()}')]`);
    if(rootDayElement.length){
        const siblingElement = (await rootDayElement[0].$x('following-sibling::*'))[0];
        const arrayWithTextData = await siblingElement.evaluate(el => [...el.children].map((el => el.textContent)))
        const result = [...arrayWithTextData].map(el => el.replace(/\t|\n/g, " ").trim())
    
        await closeBrowser(browser);
    
        return result;
    }

    return []
}


module.exports = { getPivniceUcapaData, getSuziesData, getMemickaData };