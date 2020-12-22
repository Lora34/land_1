const cards = document.querySelectorAll('.card');
const progress = document.querySelector('.progress');


window.addEventListener('scroll', progressBar);
/* Функции */
function startRotate(event) {
    const cardItem = this.querySelector('.card-item');
    const halfHeight = cardItem.offsetHeight / 2;
    const halfWidth = cardItem.offsetWidth / 2;
    cardItem.style.transform = 'rotateX(' + -(event.offsetY - halfHeight) / 5 + 'deg) rotateY(' + (event.offsetX - halfWidth) / 5 +'deg)' ;
}

function stopRotate(event) {
    const cardItem = this.querySelector('.card-item');
    cardItem.style.transform = 'rotate(0)';
}


function parallax(e) {
    this.querySelectorAll('.layer').forEach(layer => {
        let speed = layer.getAttribute('data-speed');
        layer.style.transform = `translateX(${e.clientX*speed/1000}px)`
    });
}

function progressBar(e) {
    let windowScroll = document.body.scrollTop || document.documentElement.scroll;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100 ;

    progress.style.width = per + '%';
}

/* Обработчики */
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
}

document.addEventListener('mousemove', parallax);
