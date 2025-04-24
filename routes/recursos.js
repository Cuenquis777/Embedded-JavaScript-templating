import express from "express";
import fs from "fs";

const router = express.Router()


//Leemos el json de products
const readRecursos = () => {
    try {
        const data = fs.readFileSync("./db/dbrecursos.json");
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
    const data = readRecursos();
    res.render("recursos", { user, data, htmlMessage })
    //res.json(data.products);
});

// Obtener un por ID
router.get("/:id", (req, res) => {
    const data = readRecursos();
    const user = { name: "Marc" }
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.id === id);
    res.render("recursosDetall", { user, recurso })
});

export default router;