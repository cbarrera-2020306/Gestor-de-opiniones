import Router from "express";
import { createComment, getCommentsByPublication, updateComment, deleteComment, getCommentById } from "../comment/comment.controller.js";
import { authenticateUser } from "../../middlewares/authenticate.user.js"; // Asegúrate de que tienes un middleware para autenticar al usuario
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router();

// Ruta para crear un comentario
api.post("/create",validateJwt, createComment);

// Ruta para obtener comentarios de una publicación específica
api.get("/:publicationId", getCommentsByPublication);

// Ruta para obtener un comentario específico por ID
api.get("/one/:id", getCommentById);

// Ruta para actualizar un comentario (solo puede actualizar el autor)
api.put("/:id", validateJwt, updateComment);

// Ruta para eliminar un comentario (solo puede eliminar el autor)
api.delete("/:id", validateJwt, deleteComment);

export default api;
