/* radius=(width/2)-(stroke-width*2) */
const cards = document.querySelectorAll('.card');
const progress = document.querySelector('.progress');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const input = document.querySelector('.percent');


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

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

function formatSelected(suggestion) {
    if (suggestion.data.postal_code) {
        return suggestion.data.postal_code + ', ' + suggestion.value;
    } else {
        return suggestion.value;
    }
}

$(document).ready(function() {
    const token = '90679458301ab3afe593cf792de6f6496881fec2';
    $(".job").suggestions({
        token: token,
        type: "PARTY",
        onSelect: function(suggestion) {
            console.log(suggestion);
        }
    });
    $(".fio").suggestions({
        token: token,
        type: "NAME",
        onSelect: function(suggestion) {
            console.log(suggestion);
        }
    });
    $(".address").suggestions({
        token: token,
        type: "ADDRESS",
        formatSelected: formatSelected
    });
});



/* Обработчики */
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
}

document.addEventListener('mousemove', parallax);
window.addEventListener('scroll', progressBar);
input.addEventListener('change', function() {
    setProgress(input.value);
})

setProgress(49);

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;