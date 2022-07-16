import express , {Request, Response} from 'express';
import  jwt  from 'jsonwebtoken';


export const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization as unknown as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)

        next()
    } catch (error) {
        res.status(401)
        res.json(`invalid token ${error}`)
    }
}