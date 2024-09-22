/* Array PS5 */
const containerPS5 = document.getElementById('catalogoPs5');
if (containerPS5) {
    const catalogoPS5 = [
        { name: 'spider man 2 ps5', price: 53000, img: '../assets/spider.jpg', alt: 'spider-man-2' },
        { name: 'the last of us ps5', price: 44200, img: '../assets/last.jpg', alt: 'the-last-of-us' },
        { name: 'ghost of tsushima ps5', price: 35500, img: '../assets/ghost.jpg', alt: 'ghost-of-tsushima' },
        { name: 'god of war ps5', price: 62900, img: '../assets/god.jpg', alt: 'god-of-war' },
        { name: 'horizon zero ps5', price: 54000, img: '../assets/horizon.jpg', alt: 'horizon-zero' },
        { name: 'returnal ps5', price: 45800, img: '../assets/returnal.jpg', alt: 'returnal' },
        { name: 'gran turismo ps5', price: 36000, img: '../assets/gran.jpg', alt: 'gran-turismo' },
        { name: 'rached ps5', price: 27000, img: '../assets/rached.jpg', alt: 'rached' }
    ];

    const tarjetasHTMLps5 = catalogoPS5.map(item => `
        <div class="item">
            <img class="imgcatalogo" src="${item.img}" alt="${item.alt}">
            <span class="precio">$${item.price.toLocaleString()}</span>
            <button data-name="${item.name}" data-price="${item.price}">Agregar al carrito</button>
        </div>
    `).join('');
    containerPS5.innerHTML = tarjetasHTMLps5;
}

/* Array PS4 */
const containerPS4 = document.getElementById('catalogoPs4');
if (containerPS4) {
    const catalogoPS4 = [
        { name: 'bloodborne ps4', price: 21000, img: '../assets/blood.jpg', alt: 'bloodborne' },
        { name: 'days gone ps4', price: 27000, img: '../assets/days.jpg', alt: 'days-gone' },
        { name: 'death stranding ps4', price: 23400, img: '../assets/death.jpg', alt: 'death-stranding' },
        { name: 'last of us part 2 ps4', price: 30000, img: '../assets/part2.jpg', alt: 'last-of-us-part2' },
        { name: 'sackboy ps4', price: 16100, img: '../assets/sackboy.jpg', alt: 'sackboy' },
        { name: 'miles morales ps4', price: 32750, img: '../assets/miles.jpg', alt: 'spider-miles-morales' },
        { name: 'uncharted ps4', price: 19600, img: '../assets/uncharted.jpg', alt: 'uncharted' },
        { name: 'gran turismo ps4', price: 28300, img: '../assets/turismo.jpg', alt: 'gran-turismo' }
    ];

    const tarjetasHTMLps4 = catalogoPS4.map(item => `
        <div class="item">
            <img class="imgcatalogo" src="${item.img}" alt="${item.alt}">
            <span class="precio">$${item.price.toLocaleString()}</span>
            <button data-name="${item.name}" data-price="${item.price}">Agregar al carrito</button>
        </div>
    `).join('');
    containerPS4.innerHTML = tarjetasHTMLps4;
}
