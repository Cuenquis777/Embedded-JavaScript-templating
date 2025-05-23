import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import usuarisRoutes from "./routes/usuaris.js";
import recursosRoutes from "./routes/recursos.js";
import reservesRoutes from "./routes/reserves.js";
import notificacionsRoutes from "./routes/notificacions.js";

import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public")); // Carpeta pública para CSS
app.set("view engine", "ejs"); // Usar el motor de plantillas EJS
app.set("views", "./views"); // Carpeta donde se almacenan los archivos .ejs

// Middleware para manejar sesiones
app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };
    try {
        const data = jwt.verify(token, SECRET_JWT_KEY);
        req.session.user = data;
    } catch (error) {
        req.session.user = null;
    }
    next(); // Seguir a la siguiente ruta o middleware
});

//Endpoints
app.get('/', (req, res) => {
    const { user } = req.session
    res.render('index', user)
});

// Endpoint para login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        console.log("llego aqui")
        const user = await UserRepository.login({ username, password })
        console.log("llego aqui 1")
        const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET_JWT_KEY,
            {
                expiresIn: '1h'
            })
        console.log("llego aqui 2")
        res
            .cookie('access_token', token, {
                httpOnly: true, //la cookie solo se puede acceder en el servidor, no podrem fer un document.cookie
                //secure:true, //la cookie solo funciona en https
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', //la cookie es pot accedir dins del domini
                maxAge: 1000 * 60 * 60 //la cookie te un temps de validesa d'una hora
            })
            .send({ user, token })
    } catch (error) {
        //401 = no autorització
        res.status(401).send(error.message)
    }
});

app.post('/register', async (req, res) => {
    //aqui el body es el cuerpo de la petición
    const { username, password } = req.body
    console.log(req.body)
    try {
        const id = await UserRepository.create({ username, password });
        res.send({ id })
    } catch (error) {
        //No es buena idea mandar el error del repositorio
        res.status(400).send(error.message)
    }
});


// Endpoint para logout
app.post("/logout", (req, res) => {
    res
        .clearCookie('access_token')
        .json({ message: 'logout successful' });
});

// Endpoint protegido
app.get("/protected", (req, res) => {
    const { user } = req.session;
    if (!user) return res.status(404).send('acceso no autorizado');
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("home");
});

// Rutas adicionales
app.use('/usuaris', usuarisRoutes);
app.use('/recursos', recursosRoutes);
app.use('/reserves', reservesRoutes);
app.use('/notificacions', notificacionsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
