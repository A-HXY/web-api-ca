import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const verifyToken = async (token) => {
  try {
      return jwt.verify(token, process.env.SECRET);
  } catch (error) {
      throw error;
  }
};

const authenticate = async (request, response, next) => {
    try { 
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ message: "Authorization header is required" });
          }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return response.status(401).json({ message: "Bearer token not found" });
          }

        const decoded = await verifyToken(token);
        console.log(`Decoded JWT: User - ${decoded.username}`);

        const user = await User.findByUserName(decoded.username); 
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        request.user = user; 
        console.log("Authenticated user:", user.username);
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
