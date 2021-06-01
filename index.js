const express = require("express")
const app = express();
const porta = 1234;

const router = require("./router")

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(router);

app.listen(porta, () => {
    console.log("Server started on port ", porta)
});