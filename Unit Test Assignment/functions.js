
//FUNCTION 1- CALCULATE DISCOUNT
function calculateDiscount(price, discount) {
    if(price < 0 || discount < 0 || discount > 100){
        throw new Error('Invalid input')
    }
    return price - (price * discount / 100);

}

//FUNCTION 2- FILTER PRODUCTS
function filterProducts(products, query){
    if(!Array.isArray(products) || typeof query !== 'string'){
        throw new Error('Invalid input')
    }
    return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
}

//FUNCTION 3- SORT PRODUCTS FUNCTION
function sortProducts(products, key){
    if(!Array.isArray(products) || (key !== 'name' && key !== 'price')){
        throw new Error('Invalid input')
    }
    return products.sort((a,b) => {
        if(key === 'price'){
            return a.price - b.price;
        }
        else{
            return a.name.localeCompare(b.name);
        }
    });
}

//FUNCTION 4- VALIDATE EMAIL FUNCTION
function validateEmail(email){
    if(typeof email !== 'string'){
        throw new Error('Invalid input');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

//EXPORT ALL ABOVE FUNCTIONS
const tests = {calculateDiscount, filterProducts, sortProducts, validateEmail}
module.exports = tests;