const content = [
   'https://evmhistory.ru/images/programming/javascript_1.jpg',
   'https://lh3.googleusercontent.com/proxy/uLNS_rm3UdNU2yRmFZoeZlGIvM04mFJNzRMlyNBKdPgqS8xxtTFCL02ROJMBJwpPBxyRx7F12aUhe_PaAMtemWECVXE',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBU0_iqifNKJzAbIMhPEQ2LY0zRo1PeWYNxQ&usqp=CAU',
];

const slider = document.querySelector('.slider');

//build page
const slider__list = slider.querySelector('.slider__list');
const dot__list = slider.querySelector('.dot__list');

content.forEach(src => {
   slider__list.innerHTML += `<li class='slider__item'><img class='img' src='${src}'></li>`;
   dot__list.innerHTML += '<li class="dot"></li>';
});

//slider functions
const items = slider__list.querySelectorAll('.slider__item');
const dots = dot__list.querySelectorAll('.dot');
const cb = slider.querySelector('.slider__cb');

let index = 0;
dots[index].classList.toggle('dot__active');
dots.forEach((dot, i) => {
   dot.addEventListener('click', function () {
      currentSlide(i);
   });
});

function next(n, len) {
   n++;
   return (n < len) ? n : 0;
}
function prev(n, len) {
   n--;
   return (n < 0) ? (len - 1) : n;
}

function nextSlide() {
   currentSlide(next(index, dots.length));
}
function prevSlide() {
   currentSlide(prev(index, dots.length));
}

function currentSlide(n) {
   dots[index].classList.remove('dot__active');
   index = n;
   slider__list.style.transform = `translateX(-${index * slider__list.clientWidth}px)`;
   dots[index].classList.add('dot__active');
}

function closeSlider() {
   slider.style.display = 'none';
   localStorage.setItem('auto', cb.checked);
}

//init
document.addEventListener('keydown', function (event) {
   var key = event.key;
   if (key == 'ArrowLeft') {
      prevSlide();
   } else if (key == 'ArrowRight') {
      nextSlide();
   } else if (key == 'Escape') {
      closeSlider();
   }
});

//toggle btn
let id;
function cbClick() {
   if (cb.checked) {
      if (id == null)
         id = setInterval(nextSlide, 8000);
   } else {
      clearInterval(id);
      id = null;
   }
}

let flag = localStorage.getItem('auto');
cb.checked = (flag == null) || (flag == 'true');
cb.addEventListener('click', cbClick)
cbClick();

//show
setTimeout(function () { slider.style.display = 'block'; }, 5000);