const btn = document.querySelector("[data-btn_open_nav]");
let header = document.getElementsByClassName('header')
btn.addEventListener('click', ()=> {
   header.style.display='flex'
})
