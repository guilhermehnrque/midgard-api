export interface LocalAttributes {
    id?: number;
    country: string;
    state: string;
    city: string;
    street: string;
    zip_code: number;
    number: number | null;
    description: string;
    district: string;
    groups_id: number;
    created_at: Date;
    updated_at: Date;
}