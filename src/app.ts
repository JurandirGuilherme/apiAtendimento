import Express from "express";
import router from "./Routes/router";

const app = Express()
app.use(router)


app.listen(3333, ()=>{
    console.log('Servidor Rodando!')
})