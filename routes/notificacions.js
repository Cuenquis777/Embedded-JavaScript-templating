import express from "express";
import fs from "fs";

const router = express.Router()


//Leemos el json de products
const readNotificacions = () => {
    try {
        const data = fs.readFileSync("./db/dbnotificacions.json");
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
    const data = readNotificacions();
    res.render("notificacions", { user, data, htmlMessage })
    //res.json(data.products);
});

// Obtener un por ID
router.get("/:id", (req, res) => {
    const data = readNotificacions();
    const user = { name: "Marc" }
    const id = parseInt(req.params.id);
    const noti = data.notificacions.find((noti) => noti.id === id);
    res.render("notificacionsDetall", { user, noti })
});

export default router;