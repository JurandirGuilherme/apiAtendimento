import Express from "express";
import cors from 'cors';
import router from "./Routes/router";
const app = Express();
app.use(Express.json());
app.use(cors());
app.use(router);
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(400).json({ msg: 'error' });
});
app.listen(3333, () => {
    console.log('Servidor Rodando!');
});
