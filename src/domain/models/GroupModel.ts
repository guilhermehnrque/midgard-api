import { DataTypes, Model } from 'sequelize';
import { User } from './UserModel';
import { Local } from './LocalModel';
import { GroupAttributes } from '../../domain/interfaces/attributes/GroupAttributes';
import sequelize from '../../infrastructure/database/index';

type GroupCreationAttributes = Omit<GroupAttributes, 'id' | 'created_at' | 'updated_at'>;

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    public id!: number;
    public description!: string;
    public is_active!: boolean;
    public users_id!: number;
    public visibility!: string;
    public sport_type!: string;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly local?: Local;
    public readonly deletedAt?: Date;
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    visibility: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sport_type: {
        type: DataTypes.STRING(100),
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
}, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Group.hasOne(Local, { foreignKey: 'groups_id', as: 'local' });

export { Group };
