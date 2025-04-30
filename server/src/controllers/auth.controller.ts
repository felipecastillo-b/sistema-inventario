import { Request, Response } from 'express';
import { loginUserService } from '../services/auth.service';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { token } = await loginUserService(email, password);

        res.status(200).json({
            message: 'Login Succesfully',
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'intern error' });
    }
}