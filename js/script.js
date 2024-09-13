document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.item button');
    const carritoItems = document.getElementById('carrito-items');
    const totalAmountElement = document.getElementById('total');
    const finalizarCompraButton = document.getElementById('finalizar-compra');
    const nombreApellidoInput = document.getElementById('nombre-apellido');
    const emailInput = document.getElementById('email');

    let totalAmount = 0; // Variable para llevar el total acumulado

    // Carga el carrito desde localStorage al cargar la página
    loadCarritoFromLocalStorage();

    // Agrega eventos a los botones de los artículos
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            addItemToCarrito(itemName, itemPrice);
        });
    });

    // Agrega evento al botón de finalizar compra
    finalizarCompraButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        if (validateForm()) {
            alert('¡La compra fue exitosa! En la brevedad recibirás al mail los códigos de tus juegos digitales.');
            clearCarrito(); // Limpia el carrito después de la compra
            clearForm(); // Limpia el formulario después de la compra
        }
    });

    // Agrega eventos de validación al formulario
    nombreApellidoInput.addEventListener('blur', () => {
        validarCampo("nombre-apellido", "error-nombre");
    });

    emailInput.addEventListener('blur', () => {
        validarEmail();
    });

    // Función para limpiar el formulario
    function clearForm() {
        nombreApellidoInput.value = '';
        emailInput.value = '';
    }

    // Función para agregar un artículo al carrito
    function addItemToCarrito(itemName, itemPrice) {
        // Verifica si el artículo ya está en el carrito
        const existingItem = Array.from(carritoItems.children).find(item => item.textContent.includes(itemName.toUpperCase()));

        if (existingItem) {
            // Si el artículo ya está en el carrito, no se añade de nuevo
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = `${itemName.toUpperCase()} - $${itemPrice.toFixed(2)}`;

        // Crear botón para eliminar el artículo
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            carritoItems.removeChild(listItem);
            updateTotalAmount(-itemPrice); // Actualiza el total al eliminar un artículo
            saveCarritoToLocalStorage(); // Guarda el carrito después de eliminar un artículo
        });

        listItem.appendChild(removeButton);
        carritoItems.appendChild(listItem);

        updateTotalAmount(itemPrice); // Actualiza el total al añadir un artículo
        saveCarritoToLocalStorage(); // Guarda el carrito después de añadir un artículo
    }

    // Función para actualizar el total del carrito
    function updateTotalAmount(amount) {
        totalAmount += amount;
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }

    // Función para guardar el carrito en localStorage
    function saveCarritoToLocalStorage() {
        const items = Array.from(carritoItems.children).map(item => {
            return {
                name: item.textContent.split(' - ')[0],
                price: parseFloat(item.textContent.split(' - $')[1])
            };
        });

        localStorage.setItem('carrito', JSON.stringify(items));
    }

    // Función para cargar el carrito desde localStorage
    function loadCarritoFromLocalStorage() {
        const storedCarrito = localStorage.getItem('carrito');
        if (storedCarrito) {
            const items = JSON.parse(storedCarrito);
            items.forEach(item => addItemToCarrito(item.name, item.price));
        }
    }

    // Función para limpiar el carrito
    function clearCarrito() {
        carritoItems.innerHTML = '';
        updateTotalAmount(-totalAmount); // Reinicia el total
        localStorage.removeItem('carrito'); // Elimina el carrito de localStorage
    }

    // Función para validar el formulario
    function validateForm() {
        let isValid = true;

        // Validar nombre y apellido
        const nombreApellido = nombreApellidoInput.value;
        if (nombreApellido.trim() === "") {
            document.getElementById('error-nombre').style.display = "inline";
            isValid = false;
        } else {
            document.getElementById('error-nombre').style.display = "none";
        }

        // Validar email
        const email = emailInput.value;
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === "") {
            document.getElementById('error-email').style.display = "inline";
            document.getElementById('error-email-formato').style.display = "none";
            isValid = false;
        } else if (!regex.test(email)) {
            document.getElementById('error-email').style.display = "none";
            document.getElementById('error-email-formato').style.display = "inline";
            isValid = false;
        } else {
            document.getElementById('error-email').style.display = "none";
            document.getElementById('error-email-formato').style.display = "none";
        }

        return isValid;
    }
});

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