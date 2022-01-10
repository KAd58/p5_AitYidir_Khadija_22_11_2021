let params = new URL(document.location).searchParams;
let id = params.get("id");

console.log(params)
console.log("id",id)

const productImg= document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const productColor = document.querySelector("#colors");
const productQuantity = document.querySelector("#quantity");


Products();

// Get API products
function Products(url) {
  console.log("function")
  fetch(`http://localhost:3000/api/products/${id}`)
  
    .then(function (res) {
      return res.json();
    })
    .then(function (prod) {

    //Placer les données au bon endroit 
    
    
    article = prod    
    
    productName.innerHTML = article.name;
    productDescription.innerText = article.description;
    productPrice.innerHTML = article.price;
    document.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${article.imageUrl}" alt="Photographie d'un canapé ${article.altTxt}">`);
    
    
     console.log(prod)

     let colorSelect = document.getElementById("colors");
      for (let i = 0; i < prod.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = prod.colors[i];
        productColor.appendChild(option);
      }
    })
    .catch(function (err) {
      alert("Le serveur ne répond pas!")
      console.log("api error")
    });
}
//----------------le panier---------------
addToCart();

function addToCart() {
  const addToCartBtn = document.getElementById("addToCart");
  

  addToCartBtn.addEventListener("click", function(event) {
    console.log("ajout")
    if(productQuantity.value > 0 && productQuantity.value<=100){
      let choiceColor = productColor.value;
      let choiceQuantity = productQuantity.value;

      //creation du produit à ajouter au panier
      let productAdded = {
        img : article.imageUrl,
        altimg : article.altTxt,
        color : choiceColor,
        name:article.name,
        price: parseFloat(article.price),
        quantity: parseFloat(choiceQuantity),
        idProduct: id,
      };
      console.log(productAdded)
    
    //-----------------Local storage------------------

      //Déclarer la variable pour mettre key et value dans le local storage
      //convertir les données au  format JSON qui sont dans le local storage en objet js

     
     
      
      let addConfirm =() =>{
        alert (`Votre commande de ${choiceQuantity} ${article.name} ${choiceColor} est ajoutée au panier
      Pour consulter votre panier, cliquez sur OK`)
        window.location.href = "cart.html"
    }; 
    
    let productLocalStorage= JSON.parse(localStorage.getItem("product"));
    
        
      //Si le panier comporte au minimum 1 produit je vérifie la quantité et la couleur
      if(productLocalStorage){
        const result = productLocalStorage.find(
          (productOk) => productOk.idProduct === id && productOk.color === choiceColor);
          //si le produit est déja dans le panier 
            if (result){
              let qtyBasket = parseInt(productAdded.quantity) + parseInt(result.quantity);
              result.quantity = qtyBasket;
              localStorage.setItem("product",JSON.stringify(productLocalStorage));
              console.log(productLocalStorage);
              addConfirm();
            

            
           //si le produit n'est pas dans le panier
             } else{
            productLocalStorage.push(productAdded);
            localStorage.setItem("product",JSON.stringify(productLocalStorage));
            addConfirm();
           }
          //si le panier est vide on crée le tableau produit
        } else{
        productLocalStorage = [];
        productLocalStorage.push(productAdded);
        localStorage.setItem("product",JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        addConfirm();
      }
    
    }
  
} )
    
}