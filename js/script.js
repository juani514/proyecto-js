
const juegos = [

    {
        id: 1,
        nombre: "Call of Duty",
        precio: 60
    },

    {
        id: 2,
        nombre: "The last of us",
        precio: 40
    },

    {
        id: 3,
        nombre: "Fifa 2024",
        precio: 50
    }

];

const usuario = {

    nombre: "",
    juegoSeleccionado: null

};

function saludo() {

    usuario.nombre = prompt("¿Cual es tu nombre?");
    const aceptaTerminos = confirm("Hola " + usuario.nombre + ", ¿quieres ver el catalogo de los juegos disponibles?");

    if (aceptaTerminos) {

        alert("Este es el catalogo")
        console.log("Mi nombre es: ", usuario.nombre);
        catalogo();
        elegir();
        compra();

    } else {

        alert("Te esperamos para cuando quieras comprar un juego :)");

    }
}

function catalogo() {

    for (const juego of juegos) {

        console.log("Juegos actualmente disponibles: ", juego.nombre);

    }
}

function elegir() {

    const idSeleccionado = 2;
    usuario.juegoSeleccionado = juegos.find (juego => juego.id === idSeleccionado);
    console.log("Me gustaría comprar el juego: ", usuario.juegoSeleccionado.nombre);

}

function compra() {

    if (usuario.juegoSeleccionado) {

        const nombreEnMayusculas = usuario.nombre.toUpperCase();
        const juegoEnMayusculas = usuario.juegoSeleccionado.nombre.toUpperCase();
        const precio = usuario.juegoSeleccionado.precio;

        console.log("Perfecto", nombreEnMayusculas, "tu juego seleccionado es ", juegoEnMayusculas, ". Sale ", precio, " pesos, ¿quieres finalizar la compra?");

    } else {

        console.log("No has seleccionado ningún juego.");

    }

}

saludo ()