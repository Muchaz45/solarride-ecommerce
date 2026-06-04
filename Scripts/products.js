let products = [
    {name: "Alpha +", image: "Images/Alpha +.png", price: 2000, category: "bikes" },
    {name: "Ekon 450", image: "Images/Ekon 450.jpg", price: 2000, category: "bikes"},
    {name: "Ekon", image: "Images/Ekon.jpg", price: 2000, category: "bikes"},
    {name: "eBX 2", image: "Images/ebX 2.webp", price: 999, category: "bikes"},
    {name: "Nyuki", image: "Images/Nyuki.webp", price: 899, category: "bikes" },
    {name: "Whizz", image: "Images/Whizz.webp", price: 1299, category: "bikes"},
    {name: "Family Solar Kit", image: "Images/Family Solar Kit.png", price: 599, category: "solar"},
    {name: "Mini Solar Pump", image: "Images/Mini Solar Pump.jpg", price: 999, category: "solar"},
    {name: "Household Solar +", image: "Images/Household Solar+.png", price: 799, category: "solar" },
    {name: "Mini Solar Irrigation Kit", image: "Images/Solar Irrigation Kit.webp", price: 499, category: "solar"},
    {name: "Solar Charger", image: "Images/Solar Charger.webp", price: 299, category: "solar"},
    {name: "Solar Freezer", image: "Images/Solar Freezer.webp", price: 799, category: "solar"}
];

let cart = JSON.parse(localStorage.getItem('Cart')) || [];

function renderProducts(){

    let productHTML = "";

    products.forEach(product =>{
        let dailyInstalment = dailyInstalments(product.price,0.3*parseFloat(0),365, 0.2);
        

    productHTML+=`
    <div class = "product-card">
    <img class = "product-image" src = "${product.image}">
    <h3 class = "product-name">${product.name}</h3>
    <p class = "product-price">$ ${product.price}</p>
    <p class = "paygo-amount">or $ ${dailyInstalment.toFixed(2)} daily for 1 year!</p>
    <button class = "add-to-cart-btn" onclick = "addProduct('${product.name}', '${product.image}', ${product.price})">
    &#128722; Add to Cart<button class = "specs-btn" onclick = "window.location = 'calculator.html'">
 PAYGO</button>
    </div>`;


    });

    document.querySelector('.product-container').innerHTML = productHTML;
    
}

function addProduct(name, image, price){
    let item = cart.find(item => item.name===name);

    if (item){
        item.quantity++;

    } else{
        cart.push({
            image: image,
            name: name,
            price: price,
            quantity: 1

        });
    }

    
    localStorage.setItem('Cart', JSON.stringify(cart));
    console.log(cart);
    saveCart();

}

function saveCart(){
    cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('totalCart', JSON.stringify(cartQuantity));
    document.querySelector('.total-quantity').innerHTML = cartQuantity;
    
}
function dailyInstalments(amount,deposit,days,interest){
    let balance = parseFloat(amount)-deposit;
    let totalPayment = balance * (1+parseFloat(interest));
    let dailyInstalment = totalPayment/days;

    return dailyInstalment;

}

function renderSolar(category){

    let solarHTML = "";
    products.forEach(product=>{
        if (product.category === category){
            let dailyInstalment = dailyInstalments(product.price,0.3*product.price,365, 0.2);

    solarHTML+=`
    <div class = "product-card">
    <img class = "product-image" src = "${product.image}">
    <h3 class = "product-name">${product.name}</h3>
    <p class = "product-price">$ ${product.price}</p>
    <p class = "paygo-amount">or $ ${dailyInstalment.toFixed(2)} daily for 1 year!</p>
    <button class = "add-to-cart-btn" onclick = "addProduct('${product.name}', '${product.image}', ${product.price})">
    &#128722; Add to Cart</button>
    <button class = "specs-btn" onclick = "window.location = 'calculator.html'">PAYGO</button>
    </div>`;

        }
    } );
    document.querySelector('.product-container').innerHTML = solarHTML;

}

function renderBikes(category){

    let bikesHTML = "";
    products.forEach(product=>{
        if (product.category === category){
            let dailyInstalment = dailyInstalments(product.price,0.3*product.price,365, 0.2);

    bikesHTML+=`
    <div class = "product-card">
    <img class = "product-image" src = "${product.image}">
    <h3 class = "product-name">${product.name}</h3>
    <p class = "product-price">$ ${product.price}</p>
    <p class = "paygo-amount">or $ ${dailyInstalment.toFixed(2)} daily for 1 year!</p>
    <button class = "add-to-cart-btn" onclick = "addProduct('${product.name}', '${product.image}', ${product.price})">
    &#128722; Add to Cart</button>
    <button class = "specs-btn" onclick = "window.location = 'calculator.html'">
    PAYGO</button>
    </div>`;

        }
    } );
    document.querySelector('.product-container').innerHTML = bikesHTML;

}

function populateSelect(){

    let select = document.querySelector('.select-btn');
    let categories = [...new Set(products.map(p => p.category))];

    
    categories.forEach(category =>{
        let option = document.createElement('option');
        option.innerText = category;
        option.value = category;
        option.classList.add('option-btn');
        select.appendChild(option);

    });
}

function renderbySearch(){

    let searchHTML = "";

    let selected = document.querySelector('.select-btn');
    let inputItem = selected.value;

    document.querySelector('.search-bar').value = inputItem;

    products.forEach(product => {
        let dailyInstalment = dailyInstalments(product.price,0.3*product.price,365, 0.2);


        if (inputItem === product.category){
            searchHTML += `
        <div class = "product-card">
        <img class = "product-image" src = "${product.image}">
        <h3 class = "product-name">${product.name}</h3>
        <p class = "product-price">$ ${product.price}</p>
        <p class = "paygo-amount">or $ ${dailyInstalment.toFixed(2)} daily for 1 year!</p>
        <button class = "add-to-cart-btn" onclick = "addProduct('${product.name}', '${product.image}', ${product.price})">
        &#128722; Add to Cart</button>
        <button class = "specs-btn" onclick = "window.location = 'calculator.html'">
        PAYGO</button>
        </div>
            
            `;
        }

    });
    document.querySelector('.product-container').innerHTML= searchHTML;

}

function updateInput(){
    let selected = document.querySelector('.select-btn');
    selectedValue = selected.value;
    document.querySelector('.search-bar').value = selectedValue;
    
}
updateInput();

populateSelect();
renderBikes('bikes')
renderSolar('solar');
renderProducts();
saveCart();




