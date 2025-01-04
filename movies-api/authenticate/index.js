import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (request, response, next) => {
    try { 
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ message: "No authorization header provided" });
          }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return response.status(401).json({ message: "Bearer token not found" });
          }

        const decoded = await jwt.verify(token, process.env.SECRET); 
        console.log("Decoded JWT:", decoded);

        // Assuming decoded contains a username field
        const user = await User.findByUserName(decoded.username); 
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        // Optionally attach the user to the request for further use
        request.user = user; 
        next();
    } catch(err) {
        console.error("Authentication Error:", err.message);
        if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
            return response.status(403).json({ message: "Invalid or expired token" });
          }
          response.status(500).json({ message: `Verification failed: ${err.message}` });
    }
};

export default authenticate;
