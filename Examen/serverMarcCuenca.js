// Importar librerías
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

// Crear el servidor
const app = express();

// Middleware para convertir las solicitudes en JSON
app.use(bodyParser.json());

// Función para leer datos del archivo JSON
const readData = () => {
    try {
        const data = fs.readFileSync("./examen.json");  // Convertimos el archivo a json
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

// Función para escribir datos en el archivo JSON
const writeData = (data) => {
    try {
        fs.writeFileSync("./examen.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

// Ruta principal
app.get("/", (req, res) => {
    res.send("Hola mundo, mi primer servidor con Node.js");
});

// Obtener todos los exámenes
app.get("/examen", (req, res) => {
    const data = readData();
    res.json(data.examen);
});

// Obtener un examen por ID
app.get("/examen/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const examen = data.examen.find((examen) => examen.id === id);
    res.json(examen);
});

// Crear un nuevo examen
app.post("/examen", (req, res) => {
    const data = readData();
    const body = req.body;

    const newExamen = {
        id: data.examen.length + 1,
        ...body,
    };

    data.examen.push(newExamen);
    writeData(data);
    res.json(newExamen);
});

// Modificar un examen existente
app.put("/examen/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);

    const examenIndex = data.examen.findIndex((examen) => examen.id === id);

    data.examen[examenIndex] = {
        ...data.examen[examenIndex],
        ...body
    };
    writeData(data);
    res.json({message: "Actualizado"})
});

// Eliminar un examen
app.delete("/examen/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const examenIndex = data.examen.findIndex((examen) => examen.id === id);

    data.examen.splice(examenIndex,1);
    writeData(data);
    res.json({message: "Deleteado"});

});

// Iniciar el servidor en el puerto 3000
app.listen(5000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});