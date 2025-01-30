//BASIC CRAWLING FOR CROMA.COM- Open home page--> Search for latops--> Extract product name, price, url and display in console

const {Builder, By, Key, Browser, until, Select} = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
require('chromedriver'); //For Chrome browser

(async()=>{
try {
    //DECLARE VARIABLES
    const domain = 'https://www.croma.com/'
    const search = 'laptop'
    let handles; //To store all window handles
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); //Incase we need to add some delay in our code

    //LAUNCH BROWSER AND MAXIMIZE WINDOW
    driver = await new Builder().forBrowser(Browser.CHROME).build() //Mention desired browser name here
    await driver.manage().window().maximize() //Maximize window

    //NAVIGATE TO ECOMMERCE SITE
    await driver.get(domain)

    //FIND SERCHBOX AND SEARCH FOR LAPTOP
    await driver.wait(elementLocated(By.id('searchV2'),10000))
    const search_box= await driver.findElement(By.id('searchV2'))
    await search_box.sendKeys(search,Key.RETURN)

    //GET ALL PRODUCT DETAILS
    await driver.wait(until.elementsLocated(By.xpath("//*[@class='plp-prod-title-rating-cont']")), 10000);     

    const product_titles = await driver.findElements(By.xpath("//*[@class='plp-prod-title-rating-cont']"));
    const product_cost = await driver.findElements(By.xpath("//span[@class='amount plp-srp-new-amount']"));
    const product_link = await driver.findElements(By.xpath("//*[@class='product-title plp-prod-title 999']/a"));

    //Looping through all the accquired product details
    for (let i = 0; i < product_titles.length; i++) {
        //Extract text
        const product_title_text = await product_titles[i].getText();
        const product_cost_text = await product_cost[i].getText();
        const url = await product_link[i].getAttribute('href')

        //Output product details
        console.log('PRODUCT NAME: ',product_title_text);
        console.log('COST: ', product_cost_text);
        console.log('URL: ', url)
        console.log('--------------------')
    }


} catch (error) {
    console.log('AN ERROR OCCURRED...')
    console.log(error)
} finally{
    //driver.quit()             //Commenting this line to keep browser open to verify output.
}

}) ()