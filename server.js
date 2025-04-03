import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import productRoutes from './routes/products.js'
import bookRoutes from './routes/books.js'


const app = express();
app.use(express.json());
app.use(express.static("public")); // Carpeta pública para CSS
app.set("view engine", "ejs"); // Usar el motor de plantillas EJS
app.set("views", "./views"); // Carpeta donde se almacenan los archivos .ejs

//EndPoint de home
app.get("/", (req, res) => {
    res.render("home");
});

app.use('/products',productRoutes);
app.use('/books',bookRoutes);


// Iniciar el servidor en el puerto 3002
app.listen(3002, () => {
    console.log("Server listening on port 3000");
});