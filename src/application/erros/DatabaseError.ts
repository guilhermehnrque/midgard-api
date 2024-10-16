export class DatabaseError extends Error {
    constructor(message: string, public statusCode: number = 500) {
        super(message);
        this.name = 'DatabaseError';
    }
}
