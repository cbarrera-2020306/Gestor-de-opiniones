import jwt from "jsonwebtoken";
import Category from "../src/category/category.model.js";
import Post from "../src/publication/publication.model.js";

/**
 * Verifica si la categoría existe antes de asignarla a un post
 */
export const validateCategoryExists = async (req, res, next) => {
    try {
        const { category } = req.body;

        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(404).send({ success: false, message: "Category not found" });
            }
        }

        next();
    } catch (err) {
        res.status(500).send({ success: false, message: "Error validating category", err });
    }
};
