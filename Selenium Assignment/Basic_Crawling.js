//BASIC CRAWLING- Open home page--> Search for latops--> Extract product name, price, ratings, url and save extracted info in a csv file

//IMPORT REQUIRED PACKAGES
const {Builder, By, Key, Browser, until, Select} = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
require('chromedriver'); //For Chrome browser
const fs = require('fs');  // For writing to the file

//----------------------------------------------------------------------------------------
(async()=>{
try {
    //DECLARE VARIABLES
    const domain = 'https://www.amazon.in'
    const search = 'laptop'
    let handles; //To store all window handles
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); //Incase we need to add some delay in our code

    //LAUNCH BROWSER AND MAXIMIZE WINDOW
    driver = await new Builder().forBrowser(Browser.FIREFOX).build() //Mention desired browser name here
    await driver.manage().window().maximize() //Maximize window

    //NAVIGATE TO ECOMMERCE SITE
    await driver.get(domain)

    //FIND SERCHBOX AND SEARCH FOR LAPTOP
    await driver.wait(elementLocated(By.id('twotabsearchtextbox'),10000))
    const search_box= await driver.findElement(By.id('twotabsearchtextbox'))
    await search_box.sendKeys(search,Key.RETURN)
    await delay(2500)

            //Run following code in browser to get required results
            let result = await driver.executeScript(`
            let data = [];
            document.querySelectorAll('[class="a-section"]').forEach(e => {
                if (e !== null && e.hasChildNodes()) {
                    let title = e.querySelector('[data-cy="title-recipe"]') ? e.querySelector('[data-cy="title-recipe"]').querySelector('h2').getAttribute("aria-label") : null;
                    let url = e.querySelector('[data-cy="title-recipe"]') ? e.querySelector('[data-cy="title-recipe"]').querySelector('.a-link-normal').href : null;
                    let rating = e.querySelector('[data-cy="reviews-ratings-slot"]') ? e.querySelector('[data-cy="reviews-ratings-slot"]').querySelector('span').textContent : null;
                    let price = e.querySelector('[data-cy="price-recipe"]') ? e.querySelector('[data-cy="price-recipe"]').querySelector('.a-offscreen').textContent : null;

                    if (title && url && rating && price) {
                        data.push({Title: title, URL: url, Rating: rating, Price: price});
                    }
                }
            });
            return data;
            `);

            // Print result in console
            console.log('LIST OF SEARCH RESULT PRODUCTS- ')
            result.forEach(item => {
                console.log(`Title: ${item.Title}`);
                console.log(`URL: ${item.URL}`);
                console.log(`Rating: ${item.Rating}`);
                console.log(`Price: ${item.Price}`);
                console.log('------------------------------');
            });

            //Store result in csv format
            const header = "Title,URL,Rating,Price\n"; // CSV header
            let csvContent = header;

            result.forEach(item => {
            csvContent += `"${item.Title.replace(/"/g, '""')}", "${item.URL}", "${item.Rating}", "${item.Price}"\n`;
            });

            //Write the csv content to file named 'search_results.csv'
            fs.writeFileSync('search_results.csv', csvContent);
            console.log('CSV file has been saved as search_results.csv');

    
} catch (error) {
    console.log('AN ERROR OCCURRED...')
    console.log(error)
} finally{
    //driver.quit()         //Commenting this line to keep browser open to verify output.
}

}) ()