// import { getQuantityItem } from "index.js";

//Global
var cartitems = [];
var products = [];
var total = 0;
var quantity = 0;
const cart = document.querySelector('#quantityItem');
const table = document.getElementById('table');

//render view 
function render() {
    products = JSON.parse(localStorage.getItem("cart"));

    if(products != null) {
        for(let i = 0; i < products.length; i++) {
            table.innerHTML += renderHTML(i + 1, products[i].image, products[i].name, products[i].quantity, products[i].price)
            total += parseFloat(products[i].price);
            quantity += products[i].quantity;
        }

        table.innerHTML += `
        <tr>
            <td colspan="3"></td>
            <td><b>${quantity}</b></td>
            <td><b>Total: $${parseFloat(total).toFixed(1)}</b></td>
        </tr>
        <tr> 
            <td colspan="3"></td>
            <td> 
                <input class="clean" type="button" onclick="clean()" value="Clean Shoping Cart">
            </td>
            <td> 
            <input class="buy " type="button" onclick="buy()" value="Buy">
            </td>
        </tr>
        `
        getQuantityItem();
    }
}


function renderHTML(index, image, name, quantity, price) {
    return `
        <tr class="">
            <td>${index}</td>
            <td><img src="${image}" alt=""></td>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>$${price}</td>   
            <td>
                <input class="deleteProduct" onclick="deleteProduct('${name}')" type="button" value="Delete">
            </td>
        </tr>
    `
}

//xoa toan bo san pham trong localStorage
function clean() {
    const IdeaCustomer = confirm('Are you sure you want to delete this item ?');

    if(IdeaCustomer) {
        localStorage.clear(); 
        reload();
        location.reload();
    }
}

// delete product 
function deleteProduct(name) {
    const product = JSON.parse(localStorage.getItem("cart"));
    const newArray = product.filter( item => {
        return !item.name.includes(name);
    })

    localStorage.setItem("cart", JSON.stringify(newArray));
    table.remove();
    location.reload();
    reload();
    
}

function buy() {
    const form = document.getElementById('formSubmit');
    const submit = document.getElementById('submit');
    form.style.display = 'block';
    document.documentElement.scrollTo({
       top: form.offsetTop,
       behavior: "smooth"
    });
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const susscess = document.querySelector('#susscess');
        const drak = document.querySelector('.drakMode');
        const consoleTime = document.querySelector('#susscess i');
        const nameCustomer = document.querySelector('#nameCustomer');
        const consoleName = document.querySelector('#susscess b');
        let time = 5;

        susscess.style.display = 'block';
        drak.style.display = 'block';
        consoleName.innerHTML = nameCustomer.value;
        document.querySelector('#susscess input').onclick = () => {
            susscess.style.display = 'none';
            drak.style.display = 'none';
            form.style.display = 'none';
            clearInterval(Interval); 
        }
        const Interval =  setInterval( () => {
            consoleTime.innerText = time;
            time--;
            if(time == -2) {
                susscess.style.display = 'none';
                drak.style.display = 'none';
                form.style.display = 'none';
                clearInterval(Interval);
            }
        }, 1000)

        localStorage.clear();
        reload();
        getQuantityItem();
    })
}

function reload() {
    const product = localStorage.getItem("cart");
    if(product == null) {
        table.innerHTML = '';
    }
    else {
        product.forEach( (item, index) => {
            table.innerHTML += renderHTML(index + 1, item.image, item.name, item.quantity, item.price)
        });
    }
}

function getQuantityItem() {
    products = JSON.parse(localStorage.getItem("cart"));
    if(products) {
       const cart = document.querySelector('#quantityItem');
       cart.innerHTML = `[${products.length}]`
    }
    else {
        cart.innerHTML = '';
    }
 }