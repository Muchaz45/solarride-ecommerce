let cart = JSON.parse(localStorage.getItem('Cart')) || [];
let cartQty = JSON.parse(localStorage.getItem('totalCart')) || 0;

function renderCheckoutItems(){
    let checkoutHTML = "";

    cart.forEach(item => {

        checkoutHTML+= `
        
        <div class = "checkout-items-card">
            <div class = "checkout-item-image">
                <img class = "checkout-item-image" src = "${item.image}">
            </div>
            <div class = "checkout-item-stats">
                <h4 class = "checkout-item-name">${item.name}</h4>
                <p class = "checkout-item-qty">Qty: ${item.quantity}</p>
                <p class = "checkout-item-price">$ ${item.price}</p>
            </div>
            <div class = "check-item-total-container">
                <h4 class = "checkout-item-total">$ ${parseFloat(item.quantity) * item.price}</h4>
            </div>

        </div>
        `;
    
    });
    document.querySelector('.purchase-summary').innerHTML = checkoutHTML;
    saveCart();
    updateTotals();
}

renderCheckoutItems();


function saveCart(){

    let checkoutTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem('Cart', JSON.stringify(cart));
    localStorage.setItem('totalCart', JSON.stringify(cartQty));
    document.querySelector('.total-quantity').innerHTML = checkoutTotal;

}

function updateTotals(){
    let subTotal = cart.reduce((sum, item) => sum + (parseFloat(item.quantity) * parseFloat(item.price)), 0 );
    let tax = 0.16 * subTotal;
    let totalAmount = subTotal + tax;

    document.querySelector('.checkout-subtotal').innerHTML = `$ ${subTotal.toLocaleString()}`;
    document.querySelector('.checkout-shipping').innerHTML = "Free Shipping";
    document.querySelector('.checkout-tax').innerHTML = `$ ${tax.toLocaleString()}`;
    document.querySelector('.checkout-total').innerHTML = `$ ${totalAmount.toLocaleString()}`;
}


