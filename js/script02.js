"use strict"
// Opretter en indkøbskurv med et array af objekter
// Cart er en global variable som kan tilgås alle steder i koden
let cart = [

    {type: "coffee", quantity: 0, price: 10, total: 0},
    {type: "americano", quantity: 0, price: 12, total: 0},
    {type: "espresso", quantity: 0, price: 15, total: 0}

];

// Gemmer kurvens indhold i browserens localStorage
function saveCartToLocalStorage() {
    localStorage.setItem(`cart`, JSON.stringify(cart));
}

// Funktion henter kruvens indhold fra localStorage ved sideindlæsning
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(`cart`);

    if (storedCart) {
        cart = JSON.parse(storedCart); // Konvertere JSON-strengen tilbage til et array
        updateUIFromCart(); // Opdatere UI med de hentede data
    }
}


function updateUIFromCart() {
    cart.forEach( item => {
        let quantityField = document.getElementById(item.type);
        let totalField = document.getElementById(item.type + "-total");

        if (quantityField & totalField) {
            quantityField.value = item.quantity;

            totalField.value = item.total;
        }
    });
    totalPrice();
}


function addToCart(product){
    let product = cart.find( item => item.type === product);

    if (product) {
        product.quantity++;
        updateTotalPrice(product);
        saveCartToLocalStorage();
    }
}


function removeFromCart(product) {
    let product = cart.find( item => item.type === product);  
    
    if (product && product.quantity > 0) {
        product.quantity--;
        updateTotalPrice(product);
        saveCartToLocalStorage();
    } 
}


function resetCart(product){
    let product = cart.find( item => item.type === product);

    if (product) {
        product.quantity = 0;
        updateTotalPrice(product);
        saveCartToLocalStorage();
    }
}


function updateTotalPrice(product) {
    let product = cart.find( item => item.type === product);

    if (product) {
        product.total = product.quantity * product.price;
        
        document.getElementById(product).value = product.quantity;
        document.getElementById(product + "-total").value = product.total;

        totalPrice();
    }
}


function totalPrice() {
    const totalSum = cart.reduce((sum, item) => sum + item.total, 0);
    document.getElementById("totalSum").value = totalSum;
}


function resetCart() {
    cart.forEach( item => {
        item.quantity = 0;
        item.total = 0;
    });

    updateUIFromCart();
    saveCartToLocalStorage();

}


window.onload = function() {
    loadCartFromLocalStorage();
}