// const api = 'https://62f3b5d3b81dba4a0139cc26.mockapi.io/api/products';
var cartItems = [];
var products = [];


//variable use to scroll
const layout2 = document.querySelector('.layout2');
const circle =  document.getElementById('layout2');
const text =  document.getElementById('content3');
const page = document.querySelectorAll('.currentPage');
const line = document.querySelector('.line');
const li = document.querySelectorAll('.menu li');
const arrowUp = document.querySelector('.gotoTop');

//lay ra chieu cao cua thanh nav-bar
const heightNavbar = document.querySelector(".nav-bar").offsetHeight;
let id = '';

//mac dinh line se o trang home
line.style.left = '0px';
line.style.width = li[0].offsetWidth + 'px';

window.addEventListener('scroll', scrollFunction);


function scrollFunction() {
   const image1 = document.querySelector('.l3-noidung1');
   const image2 = document.querySelector('#part2-1');
    if(window.pageYOffset >= circle.offsetTop - (innerHeight / 1.5)){
       circle.classList.add('current');
    }
    if(window.pageYOffset >= text.offsetTop - (innerHeight / 1.5)){
       text.classList.add('current');
    }
    if(window.pageYOffset >= image1.offsetTop - (innerHeight / 1.5)){
      const img1 = document.querySelector('.img1');
      img1.classList.add('move');
   }
   if(window.pageYOffset >= image2.offsetTop - (innerHeight / 1.5)){
      const img2 = document.querySelector('.img2');
      img2.classList.add('move');
   }
   if(window.pageYOffset >= layout2.offsetTop) {
      arrowUp.classList.add('block');
   }
   else {
      arrowUp.classList.remove('block');
   }

   // li.forEach( e => {
   //    e.onclick = () => {
   //       const left = e.offsetLeft;
   //       const width = e.offsetWidth;
   //       line.style.left = left + 'px';
   //       line.style.width = width + 'px';
   //    }
   // });
   page.forEach( page => {
      const layoutTop = page.offsetTop;
      const pageY = window.pageYOffset + heightNavbar;
      if(pageY >= layoutTop) {
         id = page.getAttribute('id');
      }
   });
   li.forEach( li => {
      if(li.classList.contains(id)){
         const left = li.offsetLeft;
         const width = li.offsetWidth;
         line.style.left = left + 'px';
         line.style.width = width + 'px';
      }
   });
}


function home() {
   const layout1 = document.querySelector(".layout1");
   document.documentElement.scrollTo({
      top: layout1.offsetTop - heightNavbar, // chieu cao cua thanh navbar
      behavior: "smooth"
   })
}
// function about() {
//    const layout2 = document.querySelector(".layout2");
//    document.documentElement.scrollTo({
//       top: layout2.offsetTop - heightNavbar,
//       behavior: "smooth"
//    })
// }
// function shop() {
//    const layout4 = document.querySelector('.layout4');
//    document.documentElement.scrollTo({
//       top: layout4.offsetTop - heightNavbar,
//       behavior: "smooth"
//    })
// }
// function contact() {
//    const layout6 = document.querySelector(".layout6");
//    document.documentElement.scrollTo({
//       top: layout6.offsetTop - heightNavbar,
//       behavior: "smooth"
//    })
// }

function gotoTop() {
   document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
   })
}

const listProduct = document.getElementById('products');
function getData() {
   fetch('./data/data.json')
      .then(res => {
         return res.json();
      })
      .then(res => {
         res.forEach( data => {
            listProduct.innerHTML += render(data.name, data.price, data.image);
         });
      })
   
      getQuantityItem();
}

function render(name, price, img) {
   return `
      <div id="sp1" class="sp">
         <div>
            <img src="${img}" alt="">
            <div>
               
                     <i style="color:orange;" class="fa fa-star"></i>
                     <i style="color:orange;" class="fa fa-star"></i>
                     <i style="color:orange;" class="fa fa-star"></i>
                     <i style="color:orange;" class="fa fa-star"></i>
                     <i style="color:orange;" class="fa fa-star"></i>
               
               <p class="card-text">Cupcake</p>
               <p class="card-text">${name}</p>
               <p class="card-text">Price: $${price}</p>
            </div>
         </div>
         
         <div>
            <button class="buy"><a href="#">Buy</a></button>
            <button id="thanhcong" onclick="cart('${name}', '${price}', '${img}')" class="addToCart" >Add to cart</button>
         </div>
      </div>
   ` 
}

//ham click vao de order 
function cart(name, price, img) {
   let getQuantity = 1;
   let  getPrice = '';
   let temp = '';
   let quantity= 1;
   let product = {};
   let item = {
      name: name,
      price: Number.parseFloat(price),
      quantity: quantity,
      image: img
   }

   action({
      type: 'susces',
      icon: 'fas fa-check-circle',
      title: 'Order susscessfuly!',
      content: 'Added to cart',
  })

   //them san pham vao localStorage
   let storage = localStorage.getItem("cart")

   if(storage === null) {
      cartItems.push(item)
      localStorage.setItem("cart", JSON.stringify(cartItems))
   }
   else {
      cartItems = JSON.parse(localStorage.getItem("cart"));

      // lay ra san pham bi trung, du lieu duoc tra ve tu localStorage
      temp = cartItems.filter(data => {
         return data.name.includes(item.name)
      })
   
      // kiem tra neu co san pham bi trung thi tang so luong va gia len  
      if(temp.length >= 1) {
         getQuantity = temp[0].quantity;
         getPrice = Number.parseFloat(temp[0].price);

         product = {
            name: name,
            price: getPrice + item.price,
            quantity: getQuantity + item.quantity,
            image: img
         }

         // xoa san pham bi trung sau do update san pham moi len localStorage da cap nhat so luong va gia
         for (let i = 0; i < cartItems.length; i++) {
            if(cartItems[i].name == product.name) {
               cartItems.splice(i, 1);
            }
         }
         cartItems.push(product)
      }
      else {
         cartItems.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
   }

   getQuantityItem();

}

// thong bao da order thanh cong
function action({type = '',icon = '', title = '', content = ''}) {
   const main = document.getElementById('added');

   if(main) {
       const createDiv = document.createElement('div');
       createDiv.classList.add('added', `${type}`);
       createDiv.innerHTML = `
         <div class="icon__${type}">
            <i class="${icon}"></i>
         </div>
         <div class="body">
            <div><h4>${title}</h4></div>
            <div class="content">${content}</div>
         </div>
         <div class="times">
            <i class="fas fa-times"></i>
         </div>
       `;


      // console.log(main.appendChild(createDiv));
       main.appendChild(createDiv);
       window.setTimeout(function() {
           main.removeChild(createDiv);
       }, 3000)
   }
}


//Lay so luong item trong localStorage
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
