const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    'https://www.allrecipes.com/recipes/86/world-cuisine/?internalSource=hub%20nav&referringContentType=recipe%20hub&linkName=hub%20nav%20daughter&clickId=hub%20nav%202'
  );
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let data = [];
    let baseElement = document.getElementById('fixedGridSection');
    let children = baseElement.childElementCount;
    for (let i = 1; i <= children; i++) {
      let article = baseElement.querySelector(`article:nth-child(${i}) `);
      if (article.className === 'fixed-recipe-card') {
        let label = article.querySelector(
          'div.fixed-recipe-card__info > h3 > a > span'
        ).innerText;
        let image = article
          .querySelector('div.grid-card-image-container > a:nth-child(1) > img')
          .getAttribute('data-original-src');
        data.push({ label, image });
      }
    }
    return data;
  });

  browser.close();
  return result;
};

scrape().then(value => {
  fs.writeFile('./script/recipes/world.json', JSON.stringify(value), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
