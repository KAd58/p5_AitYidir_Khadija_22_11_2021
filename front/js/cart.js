//------Récupération du local storage-----------------

let productLocalStorage= JSON.parse(localStorage.getItem("product"));
const cart = document.getElementById("cart__items");

getCart();

function getCart()
{  
   // si le panier est vide
   if (!productLocalStorage )
   {
      const emptyBasket = `<p>Votre panier est vide</p>`;
      cart.innerHTML = emptyBasket;

   }
   // on crée les éléments manquants
   else
   {  
      for(let product in productLocalStorage)
      {
         //creation de l'article

         let article = document.createElement("article");
         document.querySelector("#cart__items").appendChild(article);
         article.className = "cart__item";
         article.setAttribute("data-id", productLocalStorage[product].idProduct);

         // Ajout de la div "cart__item__img"
         let productDiv = document.createElement("div");
         article.appendChild(productDiv);
         productDiv.className = "cart__item__img";

         // ajout de l'image
         let productImg = document.createElement("img");
         productDiv.appendChild(productImg);
         productImg.src =productLocalStorage[product].img;
         productImg.alt =productLocalStorage[product].altimg;
         
         
         // Ajout de la div "cart__item__content"
         let itemContent = document.createElement("div");
         article.appendChild(itemContent);
         itemContent.className = "cart__item__content";

         // Ajout de la div "cart__item__content__titlePrice"
         let itemContentTitlePrice = document.createElement("div");
         itemContent.appendChild(itemContentTitlePrice);
         itemContentTitlePrice.className = "cart__item__content__titlePrice";
         
         // Ajout du titre h3
         let productTitle = document.createElement("h2");
         itemContentTitlePrice.appendChild(productTitle);
         productTitle.innerHTML = productLocalStorage[product].name;

         // Ajout de la couleur
         let productColor = document.createElement("p");
         productTitle.appendChild(productColor);
         productColor.innerHTML = productLocalStorage[product].color;
         

         // Ajout du prix
         let productPrice = document.createElement("p");
         itemContentTitlePrice.appendChild(productPrice);
         productPrice.innerHTML = productLocalStorage[product].price + " €";

         // Ajout de la div "cart__item__content__settings"
         let itemContentSettings = document.createElement("div");
         itemContent.appendChild(itemContentSettings);
         itemContentSettings.className = "cart__item__content__settings";

         // Ajout de la div "cart__item__content__settings__quantity"
         let itemContentSettingsQuantity = document.createElement("div");
         itemContentSettings.appendChild(itemContentSettingsQuantity);
         itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
         
         // Ajout de "Qté : "
         let productQte = document.createElement("p");
         itemContentSettingsQuantity.appendChild(productQte);
         productQte.innerHTML = "Qté : ";

         // Ajout de la quantité
         let productQuantity = document.createElement("input");
         itemContentSettingsQuantity.appendChild(productQuantity);
         productQuantity.value = productLocalStorage[product].quantity;
         productQuantity.className = "itemQuantity";
         productQuantity.setAttribute("type", "number");
         productQuantity.setAttribute("min", "1");
         productQuantity.setAttribute("max", "100");
         productQuantity.setAttribute("name", "itemQuantity");

         // Ajout de la "div" "cart__item__content__settings__delete"
         let itemContentSettingsDelete = document.createElement("div");
         itemContentSettings.appendChild(itemContentSettingsDelete);
         itemContentSettingsDelete.className = "cart__item__content__settings__delete";

         // Ajout de "p" suppression
         let productDelete = document.createElement("p");
         itemContentSettingsDelete.appendChild(productDelete);
         productDelete.className = "deleteItem";
         productDelete.innerHTML = "Supprimer";
      }
   }
}

function getTotals()
{
   // On récupère la quantité totale
   let elementsQuantity = document.getElementsByClassName('itemQuantity');
   let myLength = elementsQuantity.length;
   totalQuantity = 0;

   for (let i = 0; i < myLength; i++) 
   { 
      totalQuantity += elementsQuantity[i].valueAsNumber;
   }

   let productTotalQuantity = document.getElementById('totalQuantity');
   productTotalQuantity.innerHTML = totalQuantity;
   console.log(totalQuantity);

   // On récupère le prix total
   totalPrice = 0;

   for (let i = 0; i < myLength; i++) 
   {
      totalPrice += (elementsQuantity[i].valueAsNumber * productLocalStorage[i].price);
   }

   let productTotalPrice = document.getElementById('totalPrice');
   productTotalPrice.innerHTML = totalPrice;
   console.log(totalPrice);
}
getTotals()

// On modifie la quantité d'un produit dans le panier

modifyQuantity();

function modifyQuantity()
{
   let itemModif = document.querySelectorAll(".itemQuantity");

   for (let j=0; j < itemModif.length; j++)
   { 
      itemModif[j].addEventListener("change", (event) =>
      {
         event.preventDefault()
         //Je selectionne l'élément à modifier selon son Id et sa couleur
         let itemNew= productLocalStorage[j].quantity;
         let itemModifValue= itemModif[j].valueAsNumber;

         const result = productLocalStorage.find(
         (element) => element.itemModifValue !== itemNew );

         result.quantity = itemModifValue;
         productLocalStorage[j].quantity = result.quantity;

         localStorage.setItem("product",JSON.stringify(productLocalStorage));

         location.reload();// rafraichir la  page
         alert("votre panier est à jour.")
   
      });//fin addeventlistener
   }
}

//pour supprimer le produit du panier
deleteArticle();

function deleteArticle()
{
   let deleteItem = document.querySelectorAll(".deleteItem");

   for (let k=0; k < deleteItem.length; k++)
   { 
      deleteItem[k].addEventListener("click", (event) =>
      {
         event.preventDefault()

         //Je selectionne l'élément à modifier selon son Id et sa couleur
         let deleteId= productLocalStorage[k].idProduct;
         let deleteColor= productLocalStorage[k].color;

         productLocalStorage = productLocalStorage.filter(
         (element) => element.idProduct !==deleteId || element.color !== deleteColor);
         localStorage.setItem("product", JSON.stringify(productLocalStorage));

         location.reload();
         alert("Votre article a bien été supprimé.")
         

      })//fin addEventListener
   }
}

/*******************/
//formulaire
/*******************/

//Instauration du formulaire avec regexp
function getForm() {
   // Ajout des Regexp
   let form = document.querySelector(".cart__order__form");

   //Création des expressions régulières
   let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
   let letterRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
   let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

   // Ecoute de la modification du prénom
   form.firstName.addEventListener('change', function() {
      validFirstName(this);
   });

   // Ecoute de la modification du nom
   form.lastName.addEventListener('change', function() {
      validLastName(this);
   });

   // Ecoute de la modification de l'adresse
   form.address.addEventListener('change', function() {
      validAddress(this);
   });

   // Ecoute de la modification de la ville
   form.city.addEventListener('change', function() {
      validCity(this);
   });

   // Ecoute de la modification de l'email
   form.email.addEventListener('change', function() {
      validEmail(this);
   });

   //validation du prénom
   const validFirstName = function(inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (letterRegExp.test(inputFirstName.value)) {
         firstNameErrorMsg.innerHTML = '';
      } else {
         firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
   };

   //validation du nom
   const validLastName = function(inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (letterRegExp.test(inputLastName.value)) {
         lastNameErrorMsg.innerHTML = '';
      } else {
         lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
   };

   //validation de l'adresse
   const validAddress = function(inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressRegExp.test(inputAddress.value)) {
         addressErrorMsg.innerHTML = '';
      } else {
         addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
   };

   //validation de la ville
   const validCity = function(inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (letterRegExp.test(inputCity.value)) {
         cityErrorMsg.innerHTML = '';
      } else {
         cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
   };

   //validation de l'email
   const validEmail = function(inputEmail) {
      let emailErrorMsg = inputEmail.nextElementSibling;

      if (emailRegExp.test(inputEmail.value)) {
         emailErrorMsg.innerHTML = '';
      } else {
         emailErrorMsg.innerHTML = 'Email non valide.';
      }
   };
   }

 getForm();
const orderButton = document.getElementById('order');
 function order() {
  
   console.log('order--------------')
   let firstName = document.getElementById("firstName").value;
   let lastName = document.getElementById("lastName").value;
   let address = document.getElementById("address").value;
   let city = document.getElementById("city").value;
   let email = document.getElementById("email").value;
   const contact = {firstName, lastName, address, city, email};
   let products = [];
   console.log("ajout",productLocalStorage )
   productLocalStorage.forEach( function (product) {
     for (let i = 0; i<productLocalStorage.length; i++ ) {
        products.push(productLocalStorage[i].idProduct);
     }
              
   })
   console.log("contact",contact);
   console.log("products",products);
   createOrder(contact, products);
}
orderButton.addEventListener('click', order);

function createOrder(contact, products) {
   fetch("http://localhost:3000/api/products/order", {
   method: "POST",
   body: JSON.stringify({contact, products}),
   headers: {
   "Accept": "application/json",
   "Content-Type": "application/json",
   },
   
})
   .then(function (res) {
   if (res.ok) {
      return res.json();
   }
   })
   .then(function (order) {
   console.log("order",order);
   localStorage.clear();
   localStorage.setItem("orderId", order.orderId );
   window.location.replace("./confirmation.html?orderId="+ order.orderId );
   
   })
   .catch(function (err) {
   alert("problème avec fetch: "+ err.message);
   });
}

