import express from "express";
import fs from "fs";

const router = express.Router();

//Leemos el json de products
const readUsuaris = () => {
    try {
        const data = fs.readFileSync("./db/dbusuaris.json");
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
    const data = readUsuaris();
    res.render("usuaris", { user, data, htmlMessage })
    //res.json(data.products);
});

// Obtener un por ID
router.get("/:id", (req, res) => {
    const data = readUsuaris();
    const user = { name: "Marc" }
    const id = parseInt(req.params.id);
    const usuari = data.usuaris.find((usuari) => usuari.id === id);
    res.render("usuarisDetall", { user, usuari })
});

// Ruta para mostrar el formulario 
router.get("/:id/edit", (req, res) => {
    const data = readUsuaris();
    const user = { name: "Marc" };
    const id = parseInt(req.params.id);
    const usuari = data.usuaris.find((usuari) => usuari.id === id);
    if (usuari) {
        res.render("editUsuari", { user, usuari });
    } else {
        res.status(404).send("Usuari no trobat");
    }
});

export default router;