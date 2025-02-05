"use strict" // Gør JS-strict mode, hvilket hjælper med at finde fejl



function addToCart(product){
    // Hent nuværende værdi fra inputfeltet med specefik id og omdan til et tal
    const quantity = parseInt(document.getElementById(product).value); //.value er kun nå man skal have fat i input

    // Øg quantity med 1 - læg en til den eksisterende quantity værdi
    document.getElementById(product).value = quantity + 1;

    // Opdater totalprisen
    updateTotalPrice(product);

}


function removeFromCart(product){
     // Hent nuværende værdi fra inputfeltet med specefik id og omdan til et tal
    const quantity = parseInt(document.getElementById(product).value);

    if(quantity > 0){
        // Formindsk quantity med 1 - træk en fra den eksisterende quantity værdi
        document.getElementById(product).value = quantity - 1;

         // Opdater totalsummen for den enkelte varer (vare = kaffe-produkt)
        updateTotalPrice(product);
    }

}


function resetCart(product){
    // sæt quantity til 0
    document.getElementById(product).value = 0;

    // Opdater totalsummen for den enkelte varer (vare = kaffe-produkt)
    updateTotalPrice(product);

}


// Funktion som opdatere prisen for den enkelte vare (vare = kaffe-produkt)
function updateTotalPrice(product){
    // Hent mængden (quantity) og pris-inputfæltet for den specifikke vare (vare = kaffe-produkt)
    const quantity = parseInt(document.getElementById(product).value);

    const price = parseInt(document.getElementById(product + "-price").value);

    // Beregner totalprisen for denne specifikke vare
    const total = quantity * price;

    document.getElementById(product + "-total").value = total;

    // Opdater totalprisen for alle vare
    totalPrice();

}


// Funktion til at beregne og opdatere den samlede totalpris for alle varer i kurven
function totalPrice(){
    // Variabel til at holde styr på den samlede totalpris
    let totalSum = 0;

    // Finder alle inputfelter der indeholder et id med "produkt" efterfulgt af "-total"
    // Vi søger efter "-total" og det er ligegyldigt hvad der står foran "-total"
    const productElements = document.querySelectorAll("[id$=-total]")

    // Looper gennem hvert produkt-element (espresso, americano, coffee) og lægger værdierne sammen
    productElements.forEach(productElem => {
        totalSum += parseInt(productElem.value);
    });
    
    document.getElementById("totalSum").value = totalSum

}




