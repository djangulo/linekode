const value = document.getElementById('value');
const why = document.getElementById('why');
const proof = document.getElementById('services');
const work = document.getElementById('work');

const navLinks = document.querySelectorAll('nav ul li a');


function listenClick(elem, destElem) {
    elem.addEventListener('click', function (event) {
            destElem.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            event.preventDefault();
        }
    );
};

listenClick(navLinks[0], value);
listenClick(navLinks[1], why);
listenClick(navLinks[2], proof);
listenClick(navLinks[3], work);