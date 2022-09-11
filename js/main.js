const img = document.querySelectorAll('.layout1-img img');
const slides = document.getElementById('slide');
const layout = document.querySelector('.layout1-img');
var i = 0;


const size = layout.clientWidth;

// setInterval(function slideShow() {
//     moveImg(i);
//     i++;
//     if(i > img.length){
//         slides.style.transform = 'translateX(400px)';
//         slides.style.transition = '.0s linear';
//         i=0;
//     }
// }, 1500);

// function moveImg(index) {
//     const i = index;
   
//     slides.style.transform = 'translateX('+ (-size*i) +'px)';
//     slides.style.transition = '.5s linear';
// }



//scroll
window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
    console.log(window.pageYOffset);
    if(window.pageYOffset >= 200){
       const circle =  document.getElementById('layout2');
       circle.classList.add('current');
    }
    if(window.pageYOffset >= 450){
       const text =  document.getElementById('content3');
       text.classList.add('current');
    }
}

window.onload = function() {
    getData();
    async function getData() {
       await fetch('https://62f3b5d3b81dba4a0139cc26.mockapi.io/api/products')
        .then((res) => {
            return res.json();
        } )
        .then((data) => {
            const listProduct = document.getElementById('listProduct');
            list = data;
            var htmls = '';
            data.forEach(e => {
                htmls += ` 
                    <div class="sp">
                        <div>
                            <img src="img2/${e.img}" alt="">
                        </div>
                        <div>
                            <p>${e.name}</p>
                            <h5>$ ${e.price} USD</h5>
                        </div>
                    </div>`
            });
        
            listProduct.innerHTML = htmls;



            const product = document.querySelectorAll('.sp');
            const cart = document.querySelector('.shopping');  
            let index = 0;
        
            //xu li khi click vao san pham
            for(let i = 0; i < product.length; i++){
                product[i].onclick = function() {
                    const inforProduct = document.getElementById('inforProduct');
                    const drakMode = document.getElementById('drakMode');
                    const nameProduct = document.querySelectorAll('.sp div p');
                    const priceProduct = document.querySelectorAll('.sp div h5');
          
                    inforProduct.style.display = 'block';
                    drakMode.style.display = 'block';
    
                    inforProduct.innerHTML = `
                        <div class="inforShoe">
                            <div> 
                                <img class="image" src="img2/s${i+1}.png">
                            </div>
                            <div>
                                <h1>${nameProduct[i].innerHTML}</h1>
                                <h3>${priceProduct[i].innerHTML}</h3>
                                <ul>
                                    <li>Giày sneaker,Giày sneaker nam phong cách thời trang HOT 2020 mã 8801(Shop DZP>.Giá tận xưởng</li>
                                    <li>Phong Cách Hàn Quốc</li>
                                    <li>Thiết kế thời trang phong cách trẻ trung, hiện đại, cá tính</li>
                                    <li>Màu sắc:Trắng được phối tinh tế, Dễ phối đồ</li>
                                    <li>Chất liệu da , khử mùi, thoáng khí</li>
                                </ul>
                                <div>
                                    <button class="buy">Them vao gio hang</button>
                                </div>
                            </div>
                        </div>`;
    
                        const buy = document.querySelector('.buy');
                        
                        buy.onclick = function(e) {
                            e.preventDefault();
                            index++;
                            
                            const data = {
                                name: nameProduct[i].innerHTML,
                                price: priceProduct[i].innerHTML,
                                image: `img2/s${i+1}.png`
                            }   

                            window.localStorage.setItem(`order${index}`, JSON.stringify(data));
                            console.log('da them vao gio hang', index);

                            const order = JSON.parse(window.localStorage.getItem(`order${index}`));
                            console.log(order);
                            cart.innerHTML = `
                                <div class='infor'>
                                    <div>
                                        <img src="${order.image}" alt="" width="70px" height="70px">
                                    </div>
                                    <div>
                                        <h3>${order.name}</h3>
                                        <p>${order.price}</p>
                                    </div>
                                    <div id="time">
                                        <i class="fas fa-times"></i>
                                    </div>
                                </div>
                            `;        
                                                         
                        }
                   
                }
            }
    
    
            drakMode.onclick = function() {
                inforProduct.style.display = 'none';
                drakMode.style.display = 'none';
            }
    
            //xu li khi hover vao san pham
            for(let i = 0; i < product.length; i++){
                product[i].onmouseover = function() {
                    const img = document.querySelectorAll('.sp div img');
                    img[i].style.width = '88%';
                    img[i].style.transition = 'all .1s linear';
                }
                product[i].onmouseout = function() {
                    const img = document.querySelectorAll('.sp div img');
                    img[i].style.width = '75%';
                }
            }
        })
    }

   
}

//xi li gio hang 
const shoping = document.querySelector('.shopping a');
shoping.onclick = function(e) {
    const cart = document.getElementById('cart');
    const times = document.querySelector('#cart i');
    e.preventDefault();
    cart.style.transform = 'translateX(0)';
    cart.style.boxShadow = '5px 2px 15px 1px';
    times.onclick = () => {
        cart.style.transform = 'translateX(100%)';
    }
}
