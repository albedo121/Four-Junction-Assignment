# Selenium & Unit Test Assignments

This repository includes two tasks: **Selenium Task** and **Unit Test Task**.

## **Selenium Task**

1. **Basic Crawling**:  
   - Open an e-commerce website, search for laptops, and extract the product name, price, ratings, and URL.  
   - Save the extracted data into a `search_results.csv` file.

   **Code**:  
   The script uses `selenium-webdriver` to interact with the Amazon site, search for laptops, and store the product details in CSV format.

2. **Functional Testing**:  
   - Validate key elements on a product page:
     1. Presence of the "Add to Cart" button.
     2. Product description section.
     3. Image gallery functionality (checking image links).

   **Code**:  
   This script navigates to a product page, checks for essential elements like the "Add to Cart" button, and verifies image links for functionality.

### **Frameworks Used:**
- **Selenium WebDriver** for browser automation.
- **Chromedriver** for Chrome or **Geckodriver** for Firefox.

### **Steps to Run:**
1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Basic Crawling script:
  ```bash
   node basicCrawling.js
   ```
4. Run the Functional Testing script:
  ```bash
   node functionalTesting.js
   ```
### **Reports:**
1. Basic Crawling: Results are saved in search_results.csv.
2. Functional Testing: Outputs are logged in the console, including-  Presence of "Add to Cart" button, Product description details, Image functionality (status of image links)

## **Unit Test Task**

This task contains unit tests, and the code coverage report is generated after running Jest. The coverage report will be available in the `coverage` folder.

### **Framework Used:**
- **Jest** for unit testing.

### **Steps to Run:**
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run unit tests with coverage:
   ```bash
   npm test
   ```
### **Coverage Reports:**
1. After running the tests, the coverage report will be generated in the `coverage` folder.
2. You can open the `coverage/index.html` file in a browser to view the detailed code coverage report.
