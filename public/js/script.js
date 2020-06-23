const cards = document.querySelectorAll('.card');

const ingredientList = document.querySelector('.ingredient-list');
const preparationList = document.querySelector('.preparation-list');
const aditionalInfo = document.querySelector('.aditional-info');

const hideIngredients = document.querySelector('.hide-i');
const hidePreparation = document.querySelector('.hide-p');
const hideAditional = document.querySelector('.hide-a');


for (let i=0; i<cards.length ; i++){
    cards[i].addEventListener('click', ()=> {
        window.location.href = `/recipes/${i}`;
    })
}



function handleHideButton (hideButton, info){
    hideButton.addEventListener('click', ()=> {
        info.classList.toggle('hidden');
        if(hideButton.textContent=='ESCONDER'){
            hideButton.textContent = 'MOSTRAR';
        } else {
            hideButton.textContent='ESCONDER';
        }
    })
}

handleHideButton (hideIngredients, ingredientList);
handleHideButton (hidePreparation, preparationList);
handleHideButton (hideAditional, aditionalInfo);