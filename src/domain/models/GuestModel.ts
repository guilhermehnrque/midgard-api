import { Model, DataTypes } from 'sequelize';
import { GuestAttributes } from '../interfaces/attributes/GuestAttributes';
import { User } from './UserModel';
import sequelize from '../../infrastructure/database/index';

type GuestCreationAttributes = Omit<GuestAttributes, 'id' | 'created_at'>;

class Guest extends Model<GuestAttributes, GuestCreationAttributes> implements GuestAttributes {
    public id!: number;
    public guest_name!: string;
    public users_id!: number;
}

Guest.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    guest_name: {
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
    tableName: 'guest',
    modelName: 'Guest',
    timestamps: false
});

Guest.belongsTo(User, { foreignKey: 'users_id',  as: 'user' });

export { Guest };