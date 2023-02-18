
getRecipes('pizza');
var links=document.querySelectorAll('.navbar .nav-link');
for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
        getRecipes(e.target.text);
    })
}


var recipes=[];

function getRecipes(meal){
    var httpRequest=new XMLHttpRequest();
    httpRequest.open('GET',`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    httpRequest.send();
    httpRequest.addEventListener('readystatechange',function(){       
        if(httpRequest.readyState==4&&httpRequest.status==200){
            recipes=JSON.parse(httpRequest.response).recipes; 
             console.log(recipes)
            display();
        }
    })
}

 
function display(){
    var cols='';
    for(var i=0;i<recipes.length;i++){
        cols+=`
        <div class="col-md-3 pt-3">
        <img class="w-100  recipesStyle" src="${recipes[i].image_url}" id="img">
        <h6>${recipes[i].title}</h6>
        <h5>${recipes[i].publisher}</h5>
         <a href="${recipes[i].source_url}" class="btn text-light my-3" target="_blank" >Source</a>
         <a  onclick='getRecipeDetails(${recipes[i].recipe_id})'  class="btn text-light my-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
        </div>
        
        `
    }
document.getElementById('data').innerHTML=cols;

}

async function getRecipeDetails(recipeId){
var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
var recipeDetails=await response.json();
var recipeDetails=recipeDetails.recipe;
var recipe=`
<img class="w-100 py-3 recipesStyle " src="${recipeDetails.image_url}" id="img">
<h3>${recipeDetails.publisher}</h3>
<h4>${recipeDetails.title}</h4>
<h6>${recipeDetails.ingredients}</h6>
`
document.getElementById('RecipeInfo').innerHTML=recipe;

}       












// Ecma Script
// function sayHello(name="Ahmed",age=26,sallery=5000){
//     alert(`Hello ${name} Myage ${age} MySallery ${sallery}`);
// }
// sayHello('Alaa',undefined,8000)