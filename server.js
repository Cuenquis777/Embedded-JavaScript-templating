import { name } from "ejs";
import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.static("public")); // Carpeta pública para CSS
app.set("view engine", "ejs"); // Usar el motor de plantillas EJS
app.set("views", "./views"); // Carpeta donde se almacenan los archivos .ejs

//EndPoint de home
app.get("/", (req, res) => {
    res.render("home");
});











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
app.get('/products', (req, res) => {
    const user={name:"Marc"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readProducts();
    res.render("products",{user, data,htmlMessage})
    //res.json(data.products);
});

// Obtener un por ID
app.get("/products/:id", (req, res) => {
    const data = readProducts();
    const user = {name: "Marc"}
    const id = parseInt(req.params.id);
    const product = data.products.find((product) => product.id === id);
    res.render ("productsDetall", {user, product})
});












//Leemos el json de products
const readBooks = () => {
    try {
        const data = fs.readFileSync("./db/dbbooks.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Ruta para renderizar libros con EJS
app.get('/books', (req, res) => {
    const user={name:"Marc"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readBooks();
    res.render("book",{user, data,htmlMessage})
    //res.json(data.book);
});

// Obtener un por ID
app.get("/books/:id", (req, res) => {
    const data = readBooks();
    const user = {name: "Marc"}
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.render ("booksDetall", {user, book})
});

const writeData = (data) => fs.writeFileSync("./db.json", JSON.stringify(data));// Función para escribir datos en el archivo JSON

// Iniciar el servidor en el puerto 3002
app.listen(3002, () => {
    console.log("Server listening on port 3000");
});