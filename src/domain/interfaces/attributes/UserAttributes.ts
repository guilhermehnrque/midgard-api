export interface UserAttributes {
    id?: number;
    user_id: string;
    name: string;
    surname: string;
    type: string;
    status: boolean;
    password: string;
    phone_number: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    reset_password_token?: string | null;
    reset_password_expires?: Date | null;
}