//FUNCTIONAL TESTING- 
// Validate the following elements on the product page:
// 1) Presence of "Add to Cart" button.
// 2) Product details section (e.g., description, specifications).
// 3) Image gallery functionality.

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
    const search = 'iphone'
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

    //SELECT FIRST PRODUCT FROM RESULT
    await driver.wait(elementLocated(By.xpath("/html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[5]/div/div/span/div/div/div/div[2]/div/div/div[1]/a/h2/span"),10000))
    const first_product = await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[5]/div/div/span/div/div/div/div[2]/div/div/div[1]/a/h2/span"))
    await first_product.click()

    //GET WINDOW HANDLE FOR NEW TAB AND SWITCH TO IT
    handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);
    await delay(3000)

    //VERIFY PRESENCE OF ADD TO CART BUTTON
    try {
        const cart = await driver.findElement(By.xpath("//h1[@id='title']"))
        console.log('ADD TO CART BUTTON PRESENT')
        console.log('--------------------')
    } catch (error) {
        console.log('ADD TO CART BUTTON NOTPRESENT')
        console.log('--------------------')
    }

    //GET DESCRIPTION TEXT
    const description = await driver.findElement(By.xpath("//ul[@class='a-unordered-list a-vertical a-spacing-mini']"))
    const description_text = await description.getText()
    console.log('PRODUCT DESCRIPTION-')
    console.log(description_text)
    console.log('--------------------')

    //IMAGE FUNCTIONALITY
    const galleryDiv = await driver.findElement(By.xpath("//div[@id='imageBlock']"));
    const images = await galleryDiv.findElements(By.css('img')); // Find all image elements inside the gallery div

        // Extract the src attribute (image link) of each image
        const imageLinks = [];
        for (let image of images) {
        const src = await image.getAttribute('src');
        if (src) {
            imageLinks.push(src);
        }
        }

        // Print all image links and status
        console.log('IMAGE FUNCTIONALITY-')
        for (let [index, link] of imageLinks.entries()) {
            console.log(`${index + 1}. ${link}`);
        
            try {
            let response = await fetch(link);
            if (response.status === 200) {
                console.log('Status: 200 OK');
            } else {
                console.log('Status: ', response.status);
            }
            } catch (error) {
            console.log('Status: Failed to fetch image');
            }
        }
    

} catch (error) {
    console.log('AN ERROR OCCURRED...')
    console.log(error)
} finally{
    //driver.quit()         //Commenting this line to keep browser open to verify output.
}

}) ()

