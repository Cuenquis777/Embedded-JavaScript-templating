import express from "express";
import fs from "fs";

const router = express.Router()


//Leemos el json de products
const readReserves = () => {
    try {
        const data = fs.readFileSync("./db/dbreserves.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Ruta para renderizar productos con EJS
router.get('/', (req, res) => {
    const user = { name: "Marc" }
    const htmlMessage = `
    
   <a href="/">Home</a>`;

    const data = readReserves();
    res.render("reserves", { user, data, htmlMessage })
    //res.json(data.products);
});

// Obtener un por ID
router.get("/:id", (req, res) => {
    const data = readReserves();
    const user = { name: "Marc" }
    const id = parseInt(req.params.id);
    const reserva = data.reserves.find((reserva) => reserva.id === id);
    res.render("reservesDetall", { user, reserva })
});

// Ruta para mostrar el formulario 
router.get("/:id/edit", (req, res) => {
    const data = readReserves();
    const user = { name: "Marc" };
    const id = parseInt(req.params.id);
    const reserva = data.reserves.find((reserva) => reserva.id === id);
    if (reserva) {
        res.render("editReserva", { user, reserva });
    } else {
        res.status(404).send("Reserva no encontrada");
    }
});

export default router;