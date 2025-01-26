const tests = require('./functions')

//TEST FOR FUNCTION 1- calculateDiscount()
describe('TESTS FOR calculateDiscount function', () => {

    // Test for valid inputs
    test('should correctly calculate the final price after applying the discount', () => {
      expect(tests.calculateDiscount(100, 20)).toBe(80);
      expect(tests.calculateDiscount(50, 50)).toBe(25);
      expect(tests.calculateDiscount(200, 10)).toBe(180);
    });
  
    // Test edge cases
    test('should return the original price when discount is 0%', () => {
      expect(tests.calculateDiscount(100, 0)).toBe(100);
    });
  
    test('should return 0 when discount is 100%', () => {
      expect(tests.calculateDiscount(100, 100)).toBe(0);
    });
  
    // Test for invalid inputs (negative values)
    test('should throw an error if price is negative', () => {
      expect(() => tests.calculateDiscount(-100, 20)).toThrow('Invalid input');
    });
  
    test('should throw an error if discount is negative', () => {
      expect(() => tests.calculateDiscount(100, -10)).toThrow('Invalid input');
    });
  
    test('should throw an error if discount is greater than 100%', () => {
      expect(() => tests.calculateDiscount(100, 110)).toThrow('Invalid input');
    });
  
    // Test for large numbers
    test('should handle very large numbers correctly', () => {
      expect(tests.calculateDiscount(1000000, 10)).toBe(900000);
    });
  
    // Test for small numbers
    test('should handle very small numbers correctly', () => {
      expect(tests.calculateDiscount(0.01, 10)).toBeCloseTo(0.009, 8);
    });
  
  });

//TEST FOR FUNCTION 2- filterProducts()
describe('TESTS FOR filterProducts function', () => {

  // Positive test cases: Correct functionality
  test('should return products whose name includes the query string', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    const query = 'lap';
    expect(tests.filterProducts(products, query)).toEqual([
      { name: 'Laptop', price: 80000 }
    ]);
  });

  test('should return an empty array if no products match the query', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    const query = 'camera';
    expect(tests.filterProducts(products, query)).toEqual([]);
  });

  test('should be case insensitive when filtering products', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    const query = 'lAp';
    expect(tests.filterProducts(products, query)).toEqual([
      { name: 'Laptop', price: 80000 }
    ]);
  });

  test('should handle an empty query string and return all products', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    const query = '';
    expect(tests.filterProducts(products, query)).toEqual(products);
  });

  test('should handle an empty array of products and return an empty array', () => {
    const products = [];
    const query = 'laptop';
    expect(tests.filterProducts(products, query)).toEqual([]);
  });

  // Negative test cases: Invalid inputs and edge cases
  test('should throw an error if products is not an array', () => {
    const products = 'not an array';
    const query = 'laptop';
    expect(() => tests.filterProducts(products, query)).toThrow('Invalid input');
  });

  test('should throw an error if query is not a string', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    const query = 123; // Not a string
    expect(() => tests.filterProducts(products, query)).toThrow('Invalid input');
  });

  test('should throw an error if both inputs are invalid', () => {
    const products = 'not an array';
    const query = 123; // Not a string
    expect(() => tests.filterProducts(products, query)).toThrow('Invalid input');
  });

});

//TEST FOR FUNCTION 3- sortProducts()
describe('TESTS FOR sortProducts function', () => {

  // Positive test cases: Correct functionality
  test('should sort products by name in ascending order', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    const sortedByName = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    expect(tests.sortProducts(products, 'name')).toEqual(sortedByName);
  });

  test('should sort products by price in ascending order', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 }
    ];
    const sortedByPrice = [
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000 },
      { name: 'Laptop', price: 80000 }
    ];
    expect(tests.sortProducts(products, 'price')).toEqual(sortedByPrice);
  });

  test('should return an empty array when the input is an empty array', () => {
    const products = [];
    expect(tests.sortProducts(products, 'name')).toEqual([]);
  });

  test('should handle products with identical names by sorting by price', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Laptop', price: 50000 },
      { name: 'Laptop', price: 30000 }
    ];
    const sortedByPrice = [
      { name: 'Laptop', price: 30000 },
      { name: 'Laptop', price: 50000 },
      { name: 'Laptop', price: 80000 }
    ];
    expect(tests.sortProducts(products, 'price')).toEqual(sortedByPrice);
  });

  test('should handle products with identical prices by sorting by name', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Tablet', price: 80000 },
      { name: 'Smartphone', price: 80000 }
    ];
    const sortedByName = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 80000 },
      { name: 'Tablet', price: 80000 }
    ];
    expect(tests.sortProducts(products, 'name')).toEqual(sortedByName);
  });

  // Negative test cases: Invalid inputs and edge cases
  test('should throw an error if products is not an array', () => {
    const products = 'not an array';
    const key = 'price';
    expect(() => tests.sortProducts(products, key)).toThrow('Invalid input');
  });

  test('should throw an error if key is neither "name" nor "price"', () => {
    const products = [
      { name: 'Laptop', price: 80000 },
      { name: 'Smartphone', price: 30000 },
      { name: 'Tablet', price: 50000}
    ];
    const key = 'color'; // Invalid key
    expect(() => tests.sortProducts(products, key)).toThrow('Invalid input');
  });

});

//TEST FOR FUNCTION 4- validateEmail()
describe('TESTS FOR validateEmail function', () => {

  // Positive test cases: Valid email addresses
  test('should return true for a valid email address with lowercase characters', () => {
    const email = 'test@example.com';
    expect(tests.validateEmail(email)).toBe(true);
  });

  test('should return true for a valid email address with uppercase characters', () => {
    const email = 'Test@Example.com';
    expect(tests.validateEmail(email)).toBe(true);
  });

  test('should return true for an email address with numbers in the domain', () => {
    const email = 'test123@domain123.com';
    expect(tests.validateEmail(email)).toBe(true);
  });

  test('should return true for an email address with a subdomain', () => {
    const email = 'user@mail.example.com';
    expect(tests.validateEmail(email)).toBe(true);
  });

  test('should return true for an email address with a hyphen in the domain name', () => {
    const email = 'test@sub-domain.example.com';
    expect(tests.validateEmail(email)).toBe(true);
  });

  // Negative test cases: Invalid email addresses
  test('should return false for an email address without "@" symbol', () => {
    const email = 'testexample.com';
    expect(tests.validateEmail(email)).toBe(false);
  });

  test('should return false for an email address without a domain', () => {
    const email = 'test@';
    expect(tests.validateEmail(email)).toBe(false);
  });

  test('should return false for an email address with spaces', () => {
    const email = 'test @example.com';
    expect(tests.validateEmail(email)).toBe(false);
  });

  test('should return false for an email address with an invalid domain format', () => {
    const email = 'test@.com';
    expect(tests.validateEmail(email)).toBe(false);
  });

  test('should return false for an email address without "@" and domain', () => {
    const email = 'test';
    expect(tests.validateEmail(email)).toBe(false);
  });

  test('should return false for an email address with consecutive "@" symbols', () => {
    const email = 'test@@example.com';
    expect(tests.validateEmail(email)).toBe(false);
  });

  // Edge cases: Non-string input
  test('should throw an error if the email is not a string', () => {
    const email = 12345; // Not a string
    expect(() => tests.validateEmail(email)).toThrow('Invalid input');
  });

  // Edge case: Empty string
  test('should return false for an empty email string', () => {
    const email = '';
    expect(tests.validateEmail(email)).toBe(false);
  });

});