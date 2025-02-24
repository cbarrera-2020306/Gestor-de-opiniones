import Comment from "../comment/comment.model.js";
import Publication from "../publication/publication.model.js"; // Asegúrate de que la ruta sea correcta
import User from "../user/user.model.js"; // Asegúrate de que la ruta sea correcta
import mongoose from 'mongoose';


export const createComment = async (req, res) => {
    try {
        const { content, publication } = req.body;
        const userId = req.user.id; // ID del usuario autenticado

        // Verificar si la publicación existe
        const publicationToComment = await Publication.findById(publication);
        if (!publicationToComment) {
            return res.status(404).json({ success: false, message: 'Publication not found' });
        }

        // Crear el comentario
        const newComment = new Comment({
            content,
            author: userId,
            publication
        });

        // Guardar el comentario
        await newComment.save();

        res.status(201).json({ success: true, message: 'Comment created successfully', comment: newComment });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating comment', err });
    }
};


// Obtener comentarios por publicación
export const getCommentsByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;  // Usamos publicationId desde los parámetros de la URL

        // Verificar si la publicación existe
        const publication = await Publication.findById(publicationId);  // Usamos publicationId aquí
        if (!publication) {
            return res.status(404).json({ success: false, message: 'Publication not found' });
        }

        // Obtener los comentarios de la publicación
        const comments = await Comment.find({ publication: publicationId });  // Usamos publicationId para buscar comentarios
        res.status(200).json({ success: true, comments });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching comments", err });
    }
};

// Actualizar un comentario
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid comment ID" });
        }

        // Buscar el comentario
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Actualizar el comentario
        comment.content = content;
        await comment.save();

        res.status(200).json({ success: true, message: "Comment updated", comment });
    } catch (err) {
        console.error(err); // Imprimir el error en la consola para depuración
        res.status(500).json({ success: false, message: "Error updating comment", error: err.message });
    }
};

// Eliminar un comentario
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid comment ID" });
        }

        // Buscar el comentario
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Eliminar el comentario
        await comment.deleteOne(); // Usamos deleteOne en lugar de remove()

        res.status(200).json({ success: true, message: "Comment deleted" });
    } catch (err) {
        console.error("Error deleting comment:", err); // Imprimir el error detallado en la consola para depuración
        res.status(500).json({ success: false, message: "Error deleting comment", error: err.message });
    }
};


// Buscar un comentario por ID
export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid comment ID" });
        }

        // Buscar el comentario por ID
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        res.status(200).json({ success: true, comment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching comment", err });
    }
};

