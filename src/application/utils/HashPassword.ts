import bcrypt  from 'bcrypt';

const saltRounds = parseInt(process.env.PROJECT_GDB_SALT_ROUNDS ?? '10', 10);
const secretKey = process.env.PROJECT_GDB_SECRET_KEY ?? '';

export class HashPassword {
    static async hashPassword(password: string) {
        return await bcrypt.hash(password, saltRounds);
    }

    static async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }

    static async hashPasswordWithSecretKey(password: string) {
        return bcrypt.hash(password, secretKey)
    }

    static async comparePasswordWithSecretKey(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }
}

