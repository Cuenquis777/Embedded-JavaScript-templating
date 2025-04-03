import express from "express";
import fs from "fs";

const router = express.Router()


//Leemos el json de products
const readProducts = () => {
    try {
        const data = fs.readFileSync("./db/dbproducts.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Ruta para renderizar productos con EJS
router.get('/', (req, res) => {
    const user={name:"Marc"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readProducts();
    res.render("products",{user, data,htmlMessage})
    //res.json(data.products);
});

// Obtener un por ID
router.get("/:id", (req, res) => {
    const data = readProducts();
    const user = {name: "Marc"}
    const id = parseInt(req.params.id);
    const product = data.products.find((product) => product.id === id);
    res.render ("productsDetall", {user, product})
});

export default router;