import prisma from "../configs/prisma.config";
import bcrypt from 'bcryptjs';

export const getUserService = async () => {
    return await prisma.users.findMany();
};

export const createUserService = async (userId: string, name: string, email: string, password: string, roleId: number, statusId: number) => {

    // Verify is user exist
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('The User/Email already exist')
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.users.create({
        data: {
            userId,
            name,
            email,
            password: hashedPassword,
            roleId,
            statusId,
        },
    });
};

export const updateUserService = async (userId: string, name: string, email: string, password: string, roleId: number, statusId: number) => {
    
    // Verify is user exist
    const existingUser = await prisma.users.findUnique({ where: { userId } });

    if (!existingUser) {
        throw new Error("User not found");
    }

    // Verify password
    let updatedPassword = existingUser.password;

    if (password !== existingUser.password) {
        updatedPassword = await bcrypt.hash(password, 10);
    }
    
    return await prisma.users.update({
        where: { userId },
        data: { name, email, password: updatedPassword, roleId, statusId },
    })
}