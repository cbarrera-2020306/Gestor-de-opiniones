import Post from "../../src/publication/publication.model.js";

/**
 * Agregar un nuevo post
 */
export const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body;
        const author = req.user._id; // Extraído desde el middleware authenticateUser

        const newPost = new Post({ title, category, content, author });
        await newPost.save();

        res.status(201).send({ success: true, message: "Post created successfully", post: newPost });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error creating post", err });
    }
};

/**
 * Actualizar un post por ID
 */
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, content } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(id, { title, category, content }, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ success: false, message: "Post not found" });
        }

        res.send({ success: true, message: "Post updated successfully", post: updatedPost });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error updating post", err });
    }
};

/**
 * Eliminar un post por ID (solo el autor puede hacerlo)
 */
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);

        res.send({ success: true, message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error deleting post", err });
    }
};

/**
 * Obtener todos los posts
 */
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("category", "name");
        res.send({ success: true, posts });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error fetching posts", err });
    }
};

/**
 * Buscar un post por diferentes criterios
 */
// export const getPostById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const post = await Post.findById(id).populate("category", "name").populate("author", "name");

//         if (!post) {
//             return res.status(404).send({ success: false, message: "Post not found" });
//         }

//         res.send({ success: true, post });
//     } catch (err) {
//         res.status(500).send({ success: false, message: "Error fetching post", err });
//     }
// };

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id)
            .populate("category", "name") // Trae solo el nombre de la categoría

        if (!post) {
            return res.status(404).send({ success: false, message: "Post not found" });
        }

        res.send({ success: true, post });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error retrieving post", err });
    }
};

export const getPostsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const posts = await Post.find({ category: categoryId });

        res.send({ success: true, posts });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error fetching posts by category", err });
    }
};