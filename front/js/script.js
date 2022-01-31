// Faire appel à l'API qui contient les produits


function fetchProducts(url){
    fetch('http://localhost:3000/api/products/')
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (products) {
              
        for(let product of products){
          
          /*création de l'element a*/
          const productLink = document.createElement("a");
          productLink.href = `./product.html?id=${product._id} `; /*ajout du lien id*/

          /*création de la section */
          const section = document.getElementById("items");
          section.appendChild(productLink)/*ajout de l'élément a dans la section */

          /*création de l'article*/
          const article = document.createElement("article");
          productLink.appendChild(article) /*ajout de l'article dans l'élément a */

          /*creation de l'image*/
          const img = document.createElement("img")
          article.appendChild(img) /*ajout de l'image dans l'article*/       

          img.setAttribute("src",product.imageUrl);/*modification de la source*/
          img.setAttribute("alt",product.altTxt);

         const title = document.createElement("h3");
         article.appendChild(title);
         title.textContent = `${product.name}`

         const p = document.createElement("p")
         article.appendChild(p)
         p.textContent = `${product.description}`
         

        }
    
       
      })
      .catch(function (err) {
        console.log("api error")
        
      });
  }
  //Appeler la fonction fetch pour récupérer les données et créer les produits
  fetchProducts('http://localhost:3000/api/products/');


        