import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { JwtTokenAttributes } from '../interfaces/attributes/JwtTokenAttributes';

type JwtTokenCreationAttributes = Omit<JwtTokenAttributes, 'id' | 'created_at' | 'revoked_at'>;

class JwtToken extends Model<JwtTokenAttributes, JwtTokenCreationAttributes> implements JwtTokenAttributes {
    public id!: number;
    public users_id!: number;
    public token!: string;
    public expires_at!: Date;
    public revoked!: boolean;
    public revoked_at?: Date | null;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

JwtToken.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
        revoked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        revoked_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'jwt_tokens',
        modelName: 'JwtToken',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export { JwtToken };