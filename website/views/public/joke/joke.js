const but = document.querySelector('button');
const h1 = document.querySelector('.cate');
const h2 = document.querySelector('.joke');
const h3 = document.querySelector('.typ')
const formCategory = document.querySelector('.category')
const formType = document.querySelector('.type')
const formBlacklist = document.querySelector('.blacklist')
const any = document.querySelector('#one')
const single = document.querySelector('.single')
const double = document.querySelector('.double')
const second = document.querySelector('.second')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

const catcheckbox = document.querySelectorAll('.catcheck')
const blacheckbox = document.querySelectorAll('.blacheck')
let ty = 'Any';
let typ = 'twopart';
let bla = '?blacklistFlags=racist,sexist,religious';
let rand = false;

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

formBlacklist.addEventListener('change', () => {
    let blaVal = [];
    let k = 0;
    bla = '?';
    for (let box of blacheckbox) {
        if (box.checked == true) {
            blaVal.push(box.value)
        }
    }
    k = blaVal.length;
    for (let i = 1; i <= k; i++) {
        if (k == i) {
            for (let j = 0; j < k; j++) {
                if (j == 0) {
                    bla = '?blacklistFlags=' + blaVal[j];
                }
                /* else if (j == k - 1) {
                    bla = bla + ',' + blaVal[j] + '&';
                } */
                else {
                    bla = bla + ',' + blaVal[j];
                }
            }
        }
    }
    console.log(`https://v2.jokeapi.dev/joke/${ty}${bla}type=single`)
})

formCategory.addEventListener('change', () => {
    let catVal = [];
    let n = 0;
    ty = 'Any';

    for (let box of catcheckbox) {
        if (box.checked == true) {
            catVal.push(box.value)
        }
    }
    n = catVal.length;
    for (let i = 1; i <= n; i++) {
        if (n == i) {
            for (let j = 0; j < n; j++) {
                if (j == 0) {
                    ty = catVal[j];
                }
                else {
                    ty = ty + ',' + catVal[j];
                }
            }
        }
    }
})

formType.addEventListener('change', () => {
    if (single.checked || double.checked) {
        if (single.checked && double.checked) {
            rand = true;
        }
        else if (single.checked) {
            typ = 'single';
            rand = false;
        }
        else {
            typ = 'twopart';
            rand = false;
        }
    }
    console.log(`https://v2.jokeapi.dev/joke/${ty}${bla}&type=${typ}`)
})

but.addEventListener('click', () => {
    if (rand) {
        let ran = Math.random();
        if (ran <= 0.5) {
            typ = 'single';
        }
        else {
            typ = 'twopart';
        }
    }
    fetch(`https://v2.jokeapi.dev/joke/${ty}${bla}&type=${typ}`, {
        method: 'get',
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const { category, joke, type } = data;
            h1.innerText = category;
            h3.innerText = type;
            if (typ === 'twopart') {
                const { setup, delivery } = data;
                h2.innerText = setup;
                second.innerText = delivery;
                next.classList.remove('disable')
                prev.classList.remove('disable')
            }
            else {
                h2.innerText = joke;
                prev.classList.add('disable')
                next.classList.add('disable')
            }
        })
        .catch((err) => {
            console.log(err)
        })
})
console.log(`https://v2.jokeapi.dev/joke/${ty}${bla}&type=${typ}`)