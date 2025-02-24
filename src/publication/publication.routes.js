import { Router } from "express";
import {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById,
    getPostsByCategory,
} from "./publication.controller.js";

import { validateCategoryExists} from "../../middlewares/validations.post.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post("/create", validateJwt, validateCategoryExists, createPost);
api.get("/all", getAllPosts);
api.get("/find/:id", getPostById);
api.get("/findByCategory/:categoryId", getPostsByCategory);
api.put("/update/:id", validateCategoryExists, updatePost);
api.delete("/delete/:id", deletePost);


export default api