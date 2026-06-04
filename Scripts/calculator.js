console.log("CALCULATOR JS LOADED");

let products = [
    {id: 1, name: "Alpha +", image: "Images/Alpha +.png", price: 2000, category: "bikes" },
    {id: 2, name: "Ekon 450", image: "Images/Ekon 450.jpg", price: 2000, category: "bikes"},
    {id: 3, name: "Ekon", image: "Images/Ekon.jpg", price: 2000, category: "bikes"},
    {id: 4, name: "eBX 2", image: "Images/ebX 2.webp", price: 999, category: "bikes"},
    {id: 5, name: "Nyuki", image: "Images/Nyuki.webp", price: 899, category: "bikes" },
    {id: 6, name: "Whizz", image: "Images/Whizz.webp", price: 1299, category: "bikes"},
    {id: 7, name: "Family Solar Kit", image: "Images/Family Solar Kit.png", price: 599, category: "solar"},
    {id: 8, name: "Mini Solar Pump", image: "Images/Mini Solar Pump.jpg", price: 999, category: "solar"},
    {id: 9, name: "Household Solar +", image: "Images/Household Solar+.png", price: 799, category: "solar" },
    {id: 10, name: "Mini Solar Irrigation Kit", image: "Images/Solar Irrigation Kit.webp", price: 499, category: "solar"},
    {id: 11, name: "Solar Charger", image: "Images/Solar Charger.webp", price: 299, category: "solar"},
    {id: 12, name: "Solar Freezer", image: "Images/Solar Freezer.webp", price: 799, category: "solar"}
];

let cart = JSON.parse(localStorage.getItem('Cart')) || [];
let paygo = [];


function populateDropdown(){

    let selectProduct = document.querySelector('.paygo-product');
    console.log("script started");
    products.forEach(product =>{

        let selectOption = document.createElement('option');
        selectOption.innerHTML = product.name;
        selectOption.value = product.id;
        selectProduct.appendChild(selectOption);
    });  
}
populateDropdown();

function updateCalculator(){
 let selectedId = document.querySelector('#paygo-product').value;
 let selectedPrice = "";
 let deposit = 0;
 let repaymentPeriod = 0;
 let selectedItem = null;

 

products.forEach(item => {
    if (item.id == selectedId){
        selectedItem = item;
        selectedPrice = item.price;
    }
});

if (!selectedItem) return;
        document.querySelector('#paygo-id').value = `P00${selectedId}`;
        document.querySelector('#paygo-price').value = `$ ${selectedPrice}`;
        deposit = document.querySelector('#paygo-deposit').value;
        repaymentPeriod =  document.querySelector('#paygo-period-days').value;

        let depositPercent = (deposit/selectedPrice) *100;
        document.querySelector('#paygo-deposit-percent').value = `${depositPercent.toFixed(0)}% of the Price`;

        let repaymentMonths = repaymentPeriod/30.5;
        document.querySelector('#paygo-period-months').value = `${repaymentMonths.toFixed(0)} Months`;

        

    let interest = 0.2;
    let balance = selectedPrice-deposit;
    let totalPayment = balance * (1+interest);
    let dailyPay = totalPayment/repaymentPeriod;

document.querySelector('.daily-instalment').innerText = `$ ${dailyPay.toFixed(2)}/day`;
document.querySelector('.price').innerText = `$ ${selectedPrice}`;
document.querySelector('.deposit').innerText = `$ ${deposit}`;
document.querySelector('.interest').innerText = `${interest*100}%`;
document.querySelector('.payment-period').innerText = `${repaymentPeriod} days`;
document.querySelector('.product').innerText = `${selectedItem.name}`;

paygo.push({
    id: selectedId,
    name: selectedItem.name,
    image: selectedItem.image,
    price: selectedPrice,
    deposit: deposit,
    dailyInstalment: dailyPay,
    interest: interest,
    start_date: document.querySelector('#paygo-date').value

})

}

function renderpaygoProduct(){
    let productSelected = document.querySelector('.paygo-product').value;
    let productHTML = "";

    products.forEach(product => {

        if (productSelected == product.id){
            productHTML = `
                <img class = "paygo-product-image" src = "${product.image}">
                <h3> ${product.name}</h3>
                <p>$ ${product.price}</p>
            `;
        }
    });
    document.querySelector('.paygo-product-container').innerHTML = productHTML;
}
renderpaygoProduct();

function saveCart(){
    let cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelector('.total-quantity').innerHTML = cartQuantity;
}

saveCart();



 

