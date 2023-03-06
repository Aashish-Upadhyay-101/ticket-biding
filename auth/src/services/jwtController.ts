import jwt from "jsonwebtoken";

interface PayloadType {
    id: string;
    email: string;
}

const authJwtToken = (payload: PayloadType) => {
    const token = jwt.sign({
        id: payload.id,
        email: payload.email,
    },
        process.env.JWT_KEY!
    )

    return token;
}

const authPayloadDecoder = (token: string) => {
    const jwtPayload = jwt.verify(token, process.env.JWT_KEY!)
    return jwtPayload;
}

export { authJwtToken, authPayloadDecoder };