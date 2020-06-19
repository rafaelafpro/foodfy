modalOverlay = document.querySelector('.modal-overlay');
modal = document.querySelector('.modal');
closeModal = document.querySelector('.close-modal');
cards = document.querySelectorAll('.card');



for (let card of cards) {
    card.addEventListener('click', ()=> {
        let cardId = card.getAttribute('id');
        let modalTitle = modal.querySelector('p');
        let modalAuthor = modal.querySelector('span');
        let cardTitle = card.querySelector('h3');
        let cardAuthor = card.querySelector('span');
        let modalImageDiv = modal.querySelector('.img-box')
        modalOverlay.classList.add('active');
        modalTitle.textContent = cardTitle.textContent;
        modalAuthor.textContent = cardAuthor.textContent;
        console.log(cardId);
        modalImageDiv.style.backgroundImage = `url(./assets/${cardId}.png`; 
    })
}


closeModal.addEventListener('click', ()=> {
    modalOverlay.classList.remove('active');
})


function fillModal (card) {

}