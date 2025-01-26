//ASSIGNMENT TASK FROM FITPAGE.
//Write a simple test automation flow in any language to handle the happy flow from selection of an event on the home page up until the payments page. 

const { log } = require('console');
const {Builder, By, Key, Browser, until, Select} = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
require('chromedriver'); //For Chrome browser

(async()=>{
try {
    //DECLARE VARIABLES
    const domain = 'https://www.amazon.in'
    let handles; //To store all window handles

    //LAUNCH BROWSER AND MAXIMIZE WINDOW
    driver = await new Builder().forBrowser(Browser.FIREFOX).build() //Mention desired browser name here
    await driver.manage().window().maximize() //Maximize window

    //NAVIGATE TO ECOMMERCE SITE
    await driver.get(domain)




} catch (error) {
    console.log('AN ERROR OCCURRED...')
    console.log(error)
} finally{
    driver.quit()
}

}) ()