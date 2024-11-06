import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { Group } from './GroupModel';
import { JwtToken } from './JwtTokenModel';
import { UserAttributes } from '../interfaces/attributes/UserAttributes';

type UserCreationAttributes = Omit<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public user_id!: string;
    public name!: string;
    public surname!: string;
    public login!: string;
    public type!: string;
    public status!: boolean;
    public password!: string;
    public phone_number!: number;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at?: Date;
    public reset_password_token?: string | null;
    public reset_password_expires?: Date | null;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public readonly jwtTokens?: JwtToken;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
});

User.hasMany(JwtToken, { foreignKey: 'users_id' });
User.hasMany(Group, { foreignKey: 'users_id' });

export { User, UserCreationAttributes };
