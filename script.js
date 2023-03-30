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

var dados = null;
const localStorageProduto = JSON.parse(localStorage.getItem('produtoAtual'));
let produtoAtual = localStorage.getItem('produtoAtual') !== null ? localStorageProduto : null;
var isOnProductPage = false;

var regioesBrazil = [['SP', 'MG', 'RJ', 'ES'],//sudeste
                    ['PR', 'SC', 'RS'],//sul
                    ['MT', 'GO', 'MS','DF'],//centro
                    ['RO', 'AC', 'AM', 'RR', 'AP', 'PA', 'TO'],//amazonia
                    ['MA', 'PI', 'CE', 'PE', 'RN', 'PB', 'AL', 'SE', 'BA',]];//nordeste

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

const preencherPaginaProdutos = () =>{

    

    let preco = produtoAtual.preco;

    
    console.log("Preco formatacao original : "  + preco);
    preco = preco.replaceAll(".", "");
    console.log("Preco formatacao sem pontos : "  + preco);
    preco = preco.replaceAll(",", ".")
    console.log("Preco formatacao virgulas por pontos : "  + preco);

    preco = Number(preco);

    preco = preco - ( preco * produtoAtual.desconto);

    preco = preco.toLocaleString('pt-br',{style: 'currency', currency: 'USD'})

    preco = preco.replace("US", "");

    setValue("breadcrumbProduto", produtoAtual.nomeFacto);
    setValue("tituloProduto", produtoAtual.titulo);
    setValue("rating", produtoAtual.rating);
    setValue("preco", "$" + produtoAtual.preco);
    setValue("precoComDesconto", preco);
    setValue("rating2", produtoAtual.rating);
    setValueImg("imagem1", produtoAtual.imgMain);

    for(let numbImg = 1; numbImg <= 8; numbImg++) {
        document.getElementById(`imagemTeste${numbImg}`).src = produtoAtual.imgMain
        console.log(numbImg)
    }

    //setValue("breadcrumbProduto", produtoAtual.nomeFacto);
    //setValue("breadcrumbProduto", produtoAtual.nomeFacto);
    //setValue("breadcrumbProduto", produtoAtual.nomeFacto);

}

function setValue(id, valor){
   
    if(document.getElementById(id) != undefined){
        let elemento = document.getElementById(id);
        elemento.innerHTML = valor;
        console.log(valor);
    }

}

function setValueByClass(id, valor){
   
    if(document.getElementsByClassName(id) != undefined){
        let elemento = document.getElementsByClassName(id);
        elemento.src = valor;
        console.log(valor);
    }

}


function setValueImg(id, valor){
   
    if(document.getElementsByClassName(id) != undefined){
        let elemento = document.getElementsByClassName("poImg");
        let elemento2 = document.getElementsByClassName("imagem1");
        elemento2.href = valor;
        elemento.src = valor;
        console.log(valor);
    }

}

if(produtoAtual.page){
    preencherPaginaProdutos();
    console.log("foi");
}

function calcularFrete(endereco){

    console.log(endereco);

    cepRegion = endereco.cep.slice(0,endereco.cep.indexOf('-'));
    console.log(cepRegion);

    let frete = undefined;

    if(regioesBrazil[0].includes(endereco.uf)){
        frete = 10.90;
    }else if(regioesBrazil[1].includes(endereco.uf)){
        frete = 5.30;
    }else if (regioesBrazil[2].includes(endereco.uf)){
        frete = 12.90;
    }else if(regioesBrazil[3].includes(endereco.uf)){
        frete = 20.30;
    }else if(regioesBrazil[4].includes(endereco.uf)){
        frete = 15.32;
    }else{
        console.log('alguma coisa deu muito errado :D');//graças a deus esse console log não foi executado :D
    }

    if(endereco.localidade == "Mogi das Cruzes"){
        frete = 'Grátis';
    }else if(Number(cepRegion) >= 6000 && Number(cepRegion) <= 9999){
        frete -= frete * 0.5;
        console.log('região metropolitana')
    }else if(Number(cepRegion) >= 11000 && Number(cepRegion) <= 11999){
        frete -= frete * 0.4;
        console.log('região Litorãnea');
    }

    return frete;

}

function converter(preco, conversor){

    preco = preco;

    console.log(conversor);

    preco *= conversor.USDBRL.bid;

    return preco;

}

const cepValido = (cep) => {
    if (cep.length == 8) {
        return true;
    } else {
        return false;
    }
}

const preencherFormulario = (endereco) => {
    document.getElementById("enderecoInput").value = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}` ;
}

const pesquisarCep2 = async() =>{


    const cep = document.getElementById("cepInput").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    let url2 = 'https://economia.awesomeapi.com.br/json/last/USD-BRL'
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const dadosCotacaoDolar = await fetch(url2);
        const endereco = await dados.json();
        const dolaReal = await dadosCotacaoDolar.json();

        //preencherFormulario(endereco);
        let preco = produtoAtual.preco;

        console.log("Preco formatacao original : "  + preco);
        preco = preco.replaceAll(".", "");
        console.log("Preco formatacao sem pontos : "  + preco);
        preco = preco.replaceAll(",", ".")
        console.log("Preco formatacao virgulas por pontos : "  + preco);
        preco = converter(Number(preco), dolaReal);

        precoRealSemDesconto = preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        preco = preco  - (preco * produtoAtual.desconto);
        console.log("preço convertido e com desconto" + Number(preco));

        precoN = preco;
        console.log(preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        preco = preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        let frete = calcularFrete(endereco);

        precoTotal = preco;

        if(typeof(frete) == 'number'){
            precoTotal = precoN + frete;
            console.log(frete);
            console.log("preco total: " + precoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));

            precoTotal = precoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            frete = frete.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

        }
       
        resultadoPopup(frete, precoRealSemDesconto, preco, precoTotal)
        //console.log(frete.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        //mostrarFreteEPreco(frete, preco);
    }


}

function resultadoPopup(frete, preco, precoDesconto, precoTotal){

    console.log("preco do frete: " + frete);
    console.log("preco sem desconto: " + preco);
    console.log("preco com desconto: " + precoDesconto);
    console.log("preco total: " + precoTotal);
    document.getElementById('produtoPreco').innerHTML = `Preço em Real: ${preco}`
    document.getElementById('produtoPrecoTotal').innerHTML = `Preço Frete: ${frete}`
    document.getElementById('produtoPrecoDesc').innerHTML = `Preco c/ Desc: ${precoDesconto}`
    document.getElementById('precoFrete').innerHTML = `Preço Total: ${precoTotal}`

}


function irPaginaCompra(index){
    console.log(index);
    console.log(dados.produtos[index])
    produtoAtual = dados.produtos[index];
    isOnProductPage = true;
    produtoAtual.page = isOnProductPage;
    console.log(produtoAtual);
    updateLocalStorageProduto();
    if(index == 0 ){
        location.href = "./page-offer.html";
    }else{
        location.href = "./page-single.html";
    }
    
}

const criarPopup = async() => {

    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popup.appendChild(popupContent);
    
    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.textContent = 'Fechar';
    popupContent.appendChild(closeButton);
    
    const form = document.createElement('form');
    popupContent.appendChild(form);
    
    const nameLabel = document.createElement('label');
    nameLabel.innerHTML = '<br/> Nome:';
    form.appendChild(nameLabel);
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;
    nameLabel.appendChild(nameInput);
    
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'E-mail:';
    form.appendChild(emailLabel);
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.required = true;
    emailLabel.appendChild(emailInput);
    
    const cepLabel = document.createElement('label');
    cepLabel.textContent = 'CEP:';
    form.appendChild(cepLabel);
    
    const cepInput = document.createElement('input');
    cepInput.setAttribute('id', 'cepInput')
    cepInput.type = 'text';
    cepInput.required = true;
    form.appendChild(cepInput);
    
    const enderecoLabel = document.createElement('label');
    enderecoLabel.textContent = 'Logradouro:';
    form.appendChild(enderecoLabel);
    
    const enderecoInput = document.createElement('input');
    enderecoInput.setAttribute('id', 'enderecoInput')
    enderecoInput.type = 'text';
    enderecoInput.required = true;
    enderecoInput.readOnly = true;
    form.appendChild(enderecoInput);
    
    const produtoNome = document.createElement('p');
    produtoNome.innerHTML = 'Produto: <br/>' + produtoAtual.nomeFacto;
    form.appendChild(produtoNome);

    const produtoPreco = document.createElement('p');
    produtoPreco.setAttribute('id', 'produtoPreco');
    produtoPreco.innerHTML = 'Preço em Real: <br/>';
    form.appendChild(produtoPreco);

    const produtoPrecoDesc = document.createElement('p');
    produtoPrecoDesc.setAttribute('id', 'produtoPrecoDesc');
    produtoPrecoDesc.innerHTML = 'Preco c/ Desc: <br/>';
    form.appendChild(produtoPrecoDesc);

    const produtoPrecoDolar = document.createElement('p');
    produtoPrecoDolar.innerHTML = 'Preço em Dólar: <br/> $' + produtoAtual.preco ;
    form.appendChild(produtoPrecoDolar);

    const precoFrete = document.createElement('p');
    precoFrete.setAttribute('id', 'precoFrete')
    precoFrete.innerHTML = 'Preço Frete: <br/>';
    form.appendChild(precoFrete);

    const produtoPrecoTotal = document.createElement('p');
    produtoPrecoTotal.setAttribute('id', 'produtoPrecoTotal')
    produtoPrecoTotal.innerHTML = 'Preco Total: <br/>';
    form.appendChild(produtoPrecoTotal);

    const compraButton = document.createElement('button');
    //compraButton.type = 'submit';
    compraButton.textContent = 'Comprar';
    compraButton.id = "compraProdutoPika";
    popupContent.appendChild(compraButton);
    
    document.body.appendChild(popup);
    
    closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
    })

    
    //buscar API
    //Com async e await podemos trabalhar com código assíncrono em um estilo mais parecido com o bom e velho código síncrono.
    const pesquisarCep = async () => {
        const cep = document.getElementById("cepInput").value;
        const url = `http://viacep.com.br/ws/${cep}/json/`;
        if (cepValido(cep)) {
            const dados = await fetch(url);
            const endereco = await dados.json();
            preencherFormulario(endereco);
            return endereco;
        }
        
    }

    document.getElementById("cepInput").addEventListener("focusout", pesquisarCep);
    document.getElementById("compraProdutoPika").addEventListener("click", pesquisarCep2);  
    

};