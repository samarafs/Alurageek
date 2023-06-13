import { poductsServices } from '../services/products-services.js';


const btnLogin = document.querySelector('[data-login]')
const btnConsoles = document.querySelector('[data-btn-consoles]')

const seeMore = document.querySelectorAll('.seeMore')
const productRows = document.querySelectorAll('.product-row')

btnLogin.addEventListener('click', () => {
    window.location.href = './views/login.html'
})

btnConsoles.addEventListener('click', () => {
    window.location.href = './views/listProducts-consoles.html'
})

seeMore.forEach(el => {
    el.addEventListener('click', (e) => {

        productRows.forEach(el => {
            el.classList.toggle('row-1')      
        })

        if(el.classList.toggle('seeLess')) {
            e.target.innerHTML = 'Ver menos 🡪'
            
        } else {
            e.target.innerHTML = 'Ver mais 🡪'
        }
    })
})


const newProductList = (imgURL, alt, name, price) => {

    const card = document.createElement('div');      
    const template = `
        <div class="products-body">
            <img class="products-body-img" src="${imgURL}" alt="${alt}">
            <div class="product-resume">
                <p class="product-name">${name}</p>
                <p class="product-price">R$ ${price}</p>
                <p class="product-detail">Ver Produto</p>
            </div>
        </div>
    `
    card.innerHTML = template
    return card
}

const tableProductStar = document.querySelector('[data-product-star]')
const tableProductConsoles = document.querySelector('[data-product-consoles]')
const tableProductDiversos = document.querySelector('[data-product-diversos]')


const render =  async () => {
    const productsServ = await poductsServices.listProducts()
    // console.log(productsServ)
    
    productsServ.map(el => {       
        const products = newProductList(el.imgURL, el.alt, el.name, el.price)
        if(el.category === "star wars"){
            tableProductStar.appendChild(products)
        } else if (el.category === "consoles") {
            tableProductConsoles.appendChild(products)
        } else {
            tableProductDiversos.appendChild(products)
        }
    })
}

render()
