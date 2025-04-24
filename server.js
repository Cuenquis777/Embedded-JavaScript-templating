import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import usuarisRoutes from './routes/usuaris.js'
import recursosRoutes from './routes/recursos.js'
import reservesRoutes from './routes/reserves.js'
import notificacionsRoutes from '/routes/notificacions.js'


const app = express();
app.use(express.json());
app.use(express.static("public")); // Carpeta pública para CSS
app.set("view engine", "ejs"); // Usar el motor de plantillas EJS
app.set("views", "./views"); // Carpeta donde se almacenan los archivos .ejs

//EndPoint de home
app.get("/", (req, res) => {
    res.render("home");
});

// Llamamos a las rutas 
app.use('/usuaris',usuarisRoutes);
app.use('/recursos',recursosRoutes);
app.use('/reserves',reservesRoutes);
app.user('/notificacions, ' ,notificacionsRoutes)


// Iniciar el servidor en el puerto 3002
app.listen(3002, () => {
    console.log("Server listening on port 3002");
});