document.addEventListener('DOMContentLoaded', () => {
    const carritoItems = document.getElementById('carrito-items');
    const totalAmountElement = document.getElementById('total');
    const finalizarCompraButton = document.getElementById('finalizar-compra');
    const nombreApellidoInput = document.getElementById('nombre-apellido');
    const emailInput = document.getElementById('email');

    let totalAmount = 0;

    // Carga el carrito desde localStorage al cargar la página
    loadCarritoFromLocalStorage();

    // Agrega evento al botón de finalizar compra
    finalizarCompraButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (validateForm()) {
            alert('¡La compra fue exitosa! En la brevedad recibirás al mail los códigos de tus juegos digitales.');
            clearCarrito();
            clearForm();
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
        const existingItem = Array.from(carritoItems.children).find(item => item.textContent.includes(itemName.toUpperCase()));
        if (existingItem) return;

        const listItem = document.createElement('li');
        listItem.textContent = `${itemName.toUpperCase()} - $${itemPrice.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            carritoItems.removeChild(listItem);
            updateTotalAmount(-itemPrice);
            saveCarritoToLocalStorage();
        });

        listItem.appendChild(removeButton);
        carritoItems.appendChild(listItem);

        updateTotalAmount(itemPrice);
        saveCarritoToLocalStorage();
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

        const nombreApellido = nombreApellidoInput.value;
        if (nombreApellido.trim() === "") {
            document.getElementById('error-nombre').style.display = "inline";
            isValid = false;
        } else {
            document.getElementById('error-nombre').style.display = "none";
        }

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

    // Función para cargar el catálogo de PS5
    function cargarCatalogoPS5() {
        fetch('../json/catalogo.json') // Ajusta la ruta aquí
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const catalogoPS5 = data.catalogoPS5;
                const containerPS5 = document.getElementById('catalogoPs5');
                if (containerPS5) {
                    const tarjetasHTMLps5 = catalogoPS5.map(item => `
                        <div class="item">
                            <img class="imgcatalogo" src="${item.img}" alt="${item.alt}">
                            <span class="precio">$${item.price.toLocaleString()}</span>
                            <button data-name="${item.name}" data-price="${item.price}">Agregar al carrito</button>
                        </div>
                    `).join('');
                    containerPS5.innerHTML = tarjetasHTMLps5;
                    initializeButtons(); // Inicializa los botones
                }
            })
            .catch(error => {
                console.error('Error fetching the catalog:', error);
            });
    }

    // Función para cargar el catálogo de PS4
    function cargarCatalogoPS4() {
        fetch('../json/catalogo.json') // Ajusta la ruta aquí
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const catalogoPS4 = data.catalogoPS4;
                const containerPS4 = document.getElementById('catalogoPs4');
                if (containerPS4) {
                    const tarjetasHTMLps4 = catalogoPS4.map(item => `
                        <div class="item">
                            <img class="imgcatalogo" src="${item.img}" alt="${item.alt}">
                            <span class="precio">$${item.price.toLocaleString()}</span>
                            <button data-name="${item.name}" data-price="${item.price}">Agregar al carrito</button>
                        </div>
                    `).join('');
                    containerPS4.innerHTML = tarjetasHTMLps4;
                    initializeButtons(); // Inicializa los botones
                }
            })
            .catch(error => {
                console.error('Error fetching the catalog:', error);
            });
    }

    // Función para inicializar los botones
    function initializeButtons() {
        const buttons = document.querySelectorAll('.item button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const itemName = button.getAttribute('data-name');
                const itemPrice = parseFloat(button.getAttribute('data-price'));
                addItemToCarrito(itemName, itemPrice);
            });
        });
    }

    // Llamar a las funciones para cargar los catálogos
    cargarCatalogoPS5();
    cargarCatalogoPS4();
});
