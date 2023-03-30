//copy menu for mobile
function copyMenu() {
    //copy inside .cate-cat to .categories
    var cateCategory = document.querySelector('.cate-cat');
    var catePlace = document.querySelector('.categories');
    catePlace.innerHTML = cateCategory.innerHTML;

    //copy inside nav to nav
    var mainNav = document.querySelector('.header-nav nav');
    var navPlace = document.querySelector('.off-canvas nav');
    navPlace.innerHTML = mainNav.innerHTML;

    //copy .header-top .wrapper to .thetop-nav
    var topNav = document.querySelector('.header-top .wrapper');
    var topPlace = document.querySelector('.off-canvas .thetop-nav');
    topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();

//show mobile menu
const menuButton = document.querySelector('.trigger'),
    closeButton = document.querySelector('.t-close'),
    addclass = document.querySelector('.site');
menuButton.addEventListener('click', function() {
    addclass.classList.toggle('showmenu')
})
closeButton.addEventListener('click', function() {
    addclass.classList.remove('showmenu')
})


//Show sub menu on mobile
const submenu = document.querySelectorAll('.has-child .icon-small');
submenu.forEach((menu) => menu.addEventListener('click', toggle));

function toggle(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null);
    if (this.closest('.has-child').classList != 'expand');
    this.closest('.has-child').classList.toggle('expand')
}

//slider
const swiper = new Swiper('.swiper', {
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },    

});
  
//show search
const searchButton = document.querySelector('.t-search'),
        tClose = document.querySelector('.search-close'),
        showClass = document.querySelector('.site');
searchButton.addEventListener('click', function() {
    showClass.classList.toggle('showsearch')
})
tClose.addEventListener('click', function() {
    showClass.classList.remove('showsearch')
})


//show cate menu
const cateButton = document.querySelector('.cate-cat .cate-trigger'),
      cateClass = document.querySelector('.site');
cateButton.addEventListener('click', function() {
    cateClass.classList.toggle('showcate')
})

//product image slider
var productThumb = new Swiper ('.small-image', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        481: {
            spaceBetween: 32,
        }
    }
});
var productBig = new Swiper ('.big-image', {
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: productThumb,
    }
})

//stock products bar width percentage
var search = document.querySelectorAll('.products .stock');

/*if(stocks != undefined){

    for (let x = 0; x < stocks.length; x++) {
        let stock = stocks[x].dataset.stock,
        available = stocks[x].querySelector('.qty-available').innerHTML,
        sold = stocks[x].querySelector('.qty-sold').innerHTML,
        percent = sold*100/stock;
    
        stocks[x].querySelector('.available').style.width = percent + '%';
    }

}*/

//renderiza o row products big

//ideia sistema pesquisa
//o arquivo json guardará keys words relacionadas a cada produto
//na hora de checar se o codigo vai desenhar o produto como resultado da pesquisa
//ele vai comparar as keys words com oq foi digitado na caixa de busca
//se a key word e o oq foi digitado baterem, desenhe o produto, senão nao desenha sapoha tendeu?

// const drawProductBig = (dados) => {

// }

// //renderiza o row products mini/ row products mini 2 

// const drawProductMini = (dados, targetDivId) => {

// }

// //renderiza p products main flexwrap

// const drawProductMainFlexwrap = (dados) => {

// }


var dados = null;
const localStorageProduto = JSON.parse(localStorage.getItem('produtoAtual'));
let produtoAtual = localStorage.getItem('produtoAtual') !== null ? localStorageProduto : null;

const updateLocalStorageProduto = () =>{
    localStorage.setItem('produtoAtual', JSON.stringify(produtoAtual));
}

const deslogarProduto = () =>{
    produtoAtual = null;
    updateLocalStorageProduto();
}

const sair = () =>{
    deslogarProduto();
    location.href="./index.html";
}


const getDataBase = async() => {

    let res = await fetch('./produtos.json');
    dados = await res.json();
    console.log(dados);

}

getDataBase();

function irPaginaCompra(index){
    console.log(index);
    console.log(dados.produtos[index])
    produtoAtual = dados.produtos[index];
    updateLocalStorageProduto();

    if(index == 0 ){
        location.href = "./page-offer.html";
    }else{
        location.href = "./page-single.html"
    }
    
}
