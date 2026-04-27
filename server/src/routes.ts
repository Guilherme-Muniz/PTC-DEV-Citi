import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import CalcadosController from "./controllers/CalcadosController";


const routes = express.Router();
routes.get("/users", readAllUsers);

//rota para o create em calçados
routes.post("/calcados", CalcadosController.create);

//rota para o read em calçados
routes.get("/calcados", CalcadosController.read);

//rota para o update em calçados
routes.put("/calcados/:id", CalcadosController.update);

//rota para o delete em calçados
routes.delete("/calcados/:id", CalcadosController.deleteCalcados);

//rota para a busca por tamanho em calçados
routes.get("/calcados/tamanho/:tamanho", CalcadosController.buscarPorTamanho);

//rota para a busca por marca em calçados
routes.get("/calcados/marca/:marca", CalcadosController.buscarPorMarca);

//rota para a conta do estoque em calçados
routes.get("/calcados/estoque/total", CalcadosController.contarEstoque);

//rota para a "venda" em calçados
routes.patch("/calcados/compra/:id", CalcadosController.comprar);

export default routes;
