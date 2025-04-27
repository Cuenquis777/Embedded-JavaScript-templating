import express from "express";
import fs from "fs";

const router = express.Router();

// Leer el JSON de notificaciones
const readNotificacions = () => {
    try {
        const data = fs.readFileSync("./db/dbnoti.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Ruta para renderizar la lista de notificaciones
router.get('/', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/">Home</a>`; 
    const data = readNotificacions();
    res.render("notificacions", { user, notificacions: data.notificacio, htmlMessage }); 
});

// Ruta para mostrar los detalles de una notificación
router.get("/:id", (req, res) => {
    const data = readNotificacions();
    const user = { name: "Marc" };
    const id = parseInt(req.params.id);
    const notificacio = data.notificacio.find((noti) => noti.id === id);
    if (notificacio) {
        res.render("notificacioDetall", { user, notificacio });
    } else {
        res.status(404).send("Notificació no trobada");
    }
});

// Ruta para mostrar el formulario de edición
router.get("/:id/edit", (req, res) => {
    const data = readNotificacions();
    const user = { name: "Marc" };
    const id = parseInt(req.params.id);
    const notificacio = data.notificacio.find((noti) => noti.id === id);
    if (notificacio) {
        res.render("editNotificacio", { user, notificacio });
    } else {
        res.status(404).send("Notificació no trobada");
    }
});

export default router;
