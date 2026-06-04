let cart = JSON.parse(localStorage.getItem('Cart')) || [];
let itemQuantity = JSON.parse(localStorage.getItem('totalCart')) || 0;

function renderCart(){
    let cartHTML = "";

    cart.forEach(item => {
        let dailyInstalment = dailyInstalments(item.price,0.3*item.price,365, 0.2);

        cartHTML += `
    <div class = "cart-product-card">

    <div><img class = "cart-product-image"src = "${item.image}"></div>

    <div class = "card-item-stats>
    <h3 class= "cart-item-name">${item.name}</h3>
    <p class = "cart-item-price">$ ${item.price}</p>
    <p class = "paygo-amount">or $ ${dailyInstalment.toFixed(2)} daily for 1 year!</p>
    </div>
    
    <div class = "update-item">
    <div class = "update-btns"><button class ="update-btn" onclick = "decreaseQuantity('${item.name}')">-</button>
    <span class= "cart-quantity">${item.quantity}</span>
    <button class = "update-btn" onclick = "increaseQuantity('${item.name}')">+</button>
    </div>
    <button class = "delete-btn" onclick = "deleteItem('${item.name}')">&#128465;</button>
    </div>

    </div>
    
    `;

    });
    document.querySelector('.cart-items-container').innerHTML = cartHTML;

    updateTotals();
    saveCart();
}
function dailyInstalments(amount,deposit,days,interest){
    let balance = parseFloat(amount)-deposit;
    let totalPayment = balance * (1+parseFloat(interest));
    let dailyInstalment = totalPayment/days;

    return dailyInstalment;

}
renderCart();

function decreaseQuantity(name){
    let item = cart.find(item => item.name ===name);

    if (item.quantity == 1){
        deleteItem(name);

    }

    if (item){
        item.quantity--;
    }
    renderCart();
    updateTotals();
    saveCart();
    
}

function increaseQuantity(name){
    let item = cart.find(item => item.name === name);

    if (item){
        item.quantity++;
    }

    renderCart();
    updateTotals();
    saveCart();
    
}

function deleteItem(name){
    cart = cart.filter(item => item.name !== name);
    renderCart();
    updateTotals();
    saveCart();
    
}

function updateTotals(){

    let orderHTML = "";

    let subTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    let tax = subTotal * 0.16
    let Total = subTotal + tax

    orderHTML = `
    <h3 class = "order-summary-title">Order Summary</h3>
    <div class = "order-summary-items">
    <p>Sub-Total : $ ${subTotal}</p>
    <p>Tax (16%): $ ${tax.toFixed(2)}</p>
    <hr>
    <h3>Total: $ ${Total}</h3> <hr>
    <button class = "proceed-btn" onclick = "window.location = 'checkout.html'">Proceed to Checkout &rarr;</button>
    <h4>or</h4>
    <button class = "consider-paygo" onclick = "window.location = 'calculator.html'">Enroll in PAYGO</button>
    </div>
`;

document.querySelector('.cart-order-summary').innerHTML = orderHTML;


}

function saveCart(){
let cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

 document.querySelector('.total-quantity').innerHTML = cartQuantity;
 document.querySelector('.cart-heading').innerHTML = `Your Cart (${cartQuantity})`;



    localStorage.setItem('Cart', JSON.stringify(cart));
    localStorage.setItem('totalCart', JSON.stringify(cartQuantity));
   
    
}


