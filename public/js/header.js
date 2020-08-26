const currentPage = location.pathname
const headerMenuOptions = document.querySelectorAll('.menu a')

console.log(headerMenuOptions);


function handleActiveMenu() {
    for(let option of headerMenuOptions){
        if(currentPage.includes(option.getAttribute("href"))){            option.classList.add('menu-active')
        } else {
            option.classList.add('menu-unnactive')
        }
    }
}

handleActiveMenu();