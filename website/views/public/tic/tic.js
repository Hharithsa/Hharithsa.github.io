const boxes = document.querySelectorAll('.child')
let symbol = -1;
const x = '&#215;'
const o = '&#927;'


for (let box of boxes) {
    box.addEventListener('click', () => {
        symbol *= -1;
        if (symbol > 0) {
            box.innerHTML = x;
        }
        else {
            box.innerHTML = o;
        }
    })
}