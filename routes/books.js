import express from "express";
import fs from "fs";

const router = express.Router()

const readBooks = () => {
    try {
        const data = fs.readFileSync("./db/dbbooks.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => fs.writeFileSync("./db.json", JSON.stringify(data));// Función para escribir datos en el archivo JSON

router.get('/', (req, res) => {
    const user={name:"Marc"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readBooks();
    res.render("book",{user, data,htmlMessage})
    //res.json(data.book);
});

// Obtener un por ID
router.get("/:id", (req, res) => {
    const data = readBooks();
    const user = {name: "Marc"}
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.render ("booksDetall", {user, book})
});

export default router;