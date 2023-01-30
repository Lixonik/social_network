import express from "express";
import router from "./routes/router.js";
import authRouter from './routes/authRouter.js'

import path from 'path';
import cors from 'cors';
import SocketService from "./services/socketService.js";


const PORT = 5000;

const __dirname = path.resolve();

const gulpFolder = path.join(__dirname, 'dist/gulp');
const webpackFolder = path.join(__dirname, 'dist/webpack');
let argv = process.argv.slice(2)
const currentFolder = argv[0] === "gulp" ? gulpFolder : webpackFolder;

const app = express();

app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true
}))

// app.use((req, res, next) => {
//     if (req.headers.authorization) {
//       jwt.verify(
//         req.headers.authorization.split(' ')[1],
//         tokenKey,
//         (err, payload) => {
//           if (err) next()
//           else if (payload) {
//             for (let user of users) {
//               if (user.id === payload.id) {
//                 req.user = user
//                 next()
//               }
//             }

//             if (!req.user) next()
//           }
//         }
//       )
//     }

//     next()
//   })

app.use(express.static(path.join(__dirname, '/src/images')));
app.use(express.static(currentFolder));
app.use(express.static(path.join(currentFolder, '/src')));
app.use(express.static(path.join(currentFolder, '/src/scripts')));
app.use(express.static(path.join(currentFolder, '/src/images')));
app.use(express.static(path.join(currentFolder, '/src/styles')));
app.use("views", express.static(path.join(currentFolder, '/src/views')));

app.set("view engine", "pug");
app.set('views', path.resolve(currentFolder, './views'));

app.use(express.json());
app.use("/", router);
app.use('/api', authRouter)

async function startApp() {
    try {
        let socketService = new SocketService()
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
    } catch (e) {
        console.log(e);
    }
}

await startApp()
