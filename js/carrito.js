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
            Swal.fire({
                title: '¡La compra fue exitosa!',
                text: 'A la brevedad recibirás al mail los códigos de tus juegos digitales.',
                icon: 'success',
                confirmButtonText: 'CERRAR'
            });
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

    // Funciones del carrito
    function clearForm() {
        nombreApellidoInput.value = '';
        emailInput.value = '';
    }

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

    function updateTotalAmount(amount) {
        totalAmount += amount;
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }

    function saveCarritoToLocalStorage() {
        const items = Array.from(carritoItems.children).map(item => {
            const [name, price] = item.textContent.split(' - $');
            return {
                name: name.trim(),
                price: parseFloat(price)
            };
        });
        localStorage.setItem('carrito', JSON.stringify(items));
    }

    function loadCarritoFromLocalStorage() {
        const storedCarrito = localStorage.getItem('carrito');
        if (storedCarrito) {
            const items = JSON.parse(storedCarrito);
            items.forEach(item => addItemToCarrito(item.name, item.price));
        }
    }

    function clearCarrito() {
        carritoItems.innerHTML = '';
        updateTotalAmount(-totalAmount); // Reinicia el total
        localStorage.removeItem('carrito'); // Elimina el carrito de localStorage
    }

    function validateForm() {
        let isValid = true;

        const nombreApellido = nombreApellidoInput.value;
        const errorNombre = document.getElementById('error-nombre');
        if (nombreApellido.trim() === "") {
            errorNombre.style.display = "inline";
            isValid = false;
        } else {
            errorNombre.style.display = "none";
        }

        const email = emailInput.value;
        const errorEmail = document.getElementById('error-email');
        const errorEmailFormato = document.getElementById('error-email-formato');
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim() === "") {
            errorEmail.style.display = "inline";
            errorEmailFormato.style.display = "none";
            isValid = false;
        } else if (!regex.test(email)) {
            errorEmail.style.display = "none";
            errorEmailFormato.style.display = "inline";
            isValid = false;
        } else {
            errorEmail.style.display = "none";
            errorEmailFormato.style.display = "none";
        }

        return isValid;
    }


    window.addItemToCarrito = addItemToCarrito;
});
