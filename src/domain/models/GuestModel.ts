import { Model, DataTypes } from 'sequelize';
import { List } from './ListBaseModel';
import { GuestAttributes } from '../interfaces/attributes/GuestAttributes';
import { User } from './UserModel';
import sequelize from '../../infrastructure/database/index';

type GuestCreationAttributes = Omit<GuestAttributes, 'id' | 'created_at'>;

class Guest extends Model<GuestAttributes, GuestCreationAttributes> implements GuestAttributes {
    public id!: number;
    public name!: string;
    public users_id!: number;
}

Guest.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
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

}, {
    sequelize,
    tableName: 'guests',
    modelName: 'Guest',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Guest.belongsTo(List, { foreignKey: 'lists_id', as: 'list' });
Guest.belongsTo(User, { foreignKey: 'users_id', as: 'user' });

export { Guest };