/* document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.item button');
    const carritoItems = document.getElementById('carrito-items');
    const totalAmountElement = document.getElementById('total');

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
});
*/

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.item button');
    const carritoItems = document.getElementById('carrito-items');
    const totalAmountElement = document.getElementById('total');
    const finalizarCompraButton = document.getElementById('finalizar-compra');

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
    finalizarCompraButton.addEventListener('click', () => {
        const nombreApellido = document.getElementById('nombre-apellido').value;
        const email = document.getElementById('email').value;

        if (nombreApellido && email) {
            alert('¡La compra fue exitosa! En la brevedad recibirás al mail los códigos de tus juegos digitales.');
            clearCarrito(); // Limpia el carrito después de la compra
        } else {
            alert('Por favor, es necesario que completes todos los campos.');
        }
    });

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
});
