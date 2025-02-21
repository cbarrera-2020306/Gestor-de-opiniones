import jwt from 'jsonwebtoken';

export const verifyClient = (req, res, next) => {
    const token = req.authorization['authorization']?.split(' ')[1];  // Obtener token del encabezado 'Authorization'

    if (!token) {
        return res.status(403).send({ message: 'Token is required' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  // JWT_SECRET debe estar definido
        
        if (decoded.role !== 'CLIENT') {
            return res.status(403).send({ message: 'You do not have the required role' });
        }

        req.user = decoded;  // Guardar los datos del usuario en el objeto de la solicitud
        next();  // Continuar con el siguiente middleware o la ruta
    } catch (err) {
        return res.status(401).send({ message: 'Error verifying token or user role' });
    }
};
