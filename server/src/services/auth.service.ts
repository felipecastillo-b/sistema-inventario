import prisma from "../configs/prisma.config";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/jwt.config";

interface LoginResult {
    token: string;
}

export const loginUserService = async (email: string, password: string): Promise<LoginResult> => {
    const user = await prisma.users.findUnique({
        where: { email },
        include: {
            role: true,
            status: true,
        },
    });

    if (!user) {
        throw { status: 401, message: 'Invalid Credentials' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid Credentials' };
    }

    if (user.status.statusId !== 1) {
        throw { status: 403, message: 'Your account is inactive, please contact the Admin.' };
    }

    const token = jwt.sign(
        {
            userId: user.userId,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            statusId: user.statusId,
        },
        JWT_SECRET,
        { expiresIn: '1hr' }
    );

    return {
        token,
    }
}