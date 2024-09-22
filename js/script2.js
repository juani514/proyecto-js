// Función para cargar el catálogo de PS5

function cargarCatalogoPS5() {
    fetch('../json/catalogo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el Catalogo de Play Station 5');
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
                
                initializeButtons();
            }
        })
        .catch(error => {
            console.error('Error fetching the catalog:', error);
        });
}

// Función para cargar el catálogo de PS4

function cargarCatalogoPS4() {
    fetch('../json/catalogo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el Catalogo de Play Station 4');
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
            
                initializeButtons();
            }
        })
        .catch(error => {
            console.error('Error al cargar el Catalogo Seleccionado:', error);
        });
}


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

cargarCatalogoPS5();
cargarCatalogoPS4();
