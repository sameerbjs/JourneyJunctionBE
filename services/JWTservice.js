import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY } from "../config/index.js";

export class JWTService {
    // sign access token
    static signAccessToken(payload, expiryTime) {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: expiryTime,
        });
    }

    // verify access token
    static verifyAccessToken(token) {
        return jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    }
}
