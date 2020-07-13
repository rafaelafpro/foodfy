const newIngredientButton = document.querySelector("#new-ingredient")
const newStepButton = document.querySelector("#new-step")

newIngredientButton.addEventListener("click", addIngredient)
newStepButton.addEventListener("click", addStep)

function addIngredient(event) {
    
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false;

    newField.children[0].value = ''

    ingredients.appendChild(newField)
}

function addStep() {
    const steps = document.querySelector("#steps")
    const step = document.querySelectorAll(".step")
    const newField = step[step.length - 1].cloneNode(true)

    if (newField.children[0] == '') return false

    newField.children[0].value = ''

    steps.appendChild(newField)
}