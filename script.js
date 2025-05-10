const images = [
    "https://trizio.ru/img-srv01/032018/img_post/top_692.jpg",
    "https://toremont.ru/img/dizajn-spalni-v-sovremennom-stile.jpg",
    "https://www.stilkuhni.ru/upload/iblock/63e/3byzf4jvrcr6ufb1xqxl3cpsmmp0p48j/628_7_1920kh860.jpg.webp",
    "https://www.stilkuhni.ru/upload/medialibrary/Leonardo-5034-1490%D1%85860_1.jpg.webp"
];

const slider = document.querySelector("[data-slider]");
const prevBtn = document.querySelector("[data-btn-prev]");
const nextBtn = document.querySelector("[data-btn-next]");
const dots = document.querySelectorAll(".dot");

let currentindex = 0;
let dots_current_index = 0;

const setupSlides = () => {
    images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.classList.add('img-slider');
        img.src = imageUrl;
        img.dataset.index = index;

        slider.appendChild(img);
    })

    const firstclone = slider.firstElementChild.cloneNode(true);
    const lastClone = slider.lastElementChild.cloneNode(true);

    slider.appendChild(firstclone);
    slider.insertBefore(lastClone, slider.firstChild);


}

const initSlider = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    slider.style.transition = `none`;
    slider.style.translate = `-${slideWidth * (currentindex + 1)}px`;
}


const goToPrevSlide = () => {
    dots[dots_current_index].classList.remove('active')

    const slideWidth = slider.firstElementChild.offsetWidth;
    currentindex--;
    dots_current_index--;
    slider.style.transition = `translate .5s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentindex + 1)}px`;

    if(dots_current_index < 0) {
        dots_current_index = dots.length - 1;
    }
    dots[dots_current_index].classList.add('active');

    slider.addEventListener("transitionend", 
        () => {
            if(currentindex < 0) {
                currentindex = images.length - 1; 
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentindex + 1)}px`;
            }
        },
    {once: true}
    )
}


const goToNextSlide = () => {
    dots[dots_current_index].classList.remove('active')

    const slideWidth = slider.firstElementChild.offsetWidth;
    currentindex++;
    dots_current_index++;
    slider.style.transition = `translate .5s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentindex + 1)}px`;
    

    if(currentindex >= images.length) {
        nextBtn.disabled = "true";
    }
    console.log(currentindex);
    if(currentindex >= 4) {
        dots_current_index = 0;
    }
    dots[dots_current_index].classList.add('active')

    slider.addEventListener("transitionend", 
        () => {
            if(currentindex >= images.length) {
                currentindex = 0; 
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentindex + 1)}px`;
                nextBtn.disabled = false;

            }
        },
    {once: true}
    )
}


nextBtn.addEventListener("click", goToNextSlide);
prevBtn.addEventListener('click', goToPrevSlide);
setupSlides();
initSlider();

window.addEventListener("resize", initSlider);
