import { DataTypes, Model } from 'sequelize';
import { User } from './UserModel';
import { Group } from './GroupModel';
import { GroupUserAttributes } from '../interfaces/attributes/GroupUserAttributes';
import sequelize from '../../infrastructure/database/index';

type GroupsUsersCreationAttributes = Omit<GroupUserAttributes, 'id'>;

class GroupsUsers extends Model<GroupUserAttributes, GroupsUsersCreationAttributes> implements GroupUserAttributes {
    public id!: number;
    public groups_id!: number;
    public users_id!: number;

    public readonly player?: User;
    public readonly group?: Group;
}

GroupsUsers.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id',
        },
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
    modelName: 'GroupUser',
    tableName: 'groups_users',
    timestamps: false,
});

GroupsUsers.belongsTo(User, { foreignKey: 'users_id', as: 'player' });
GroupsUsers.belongsTo(Group, { foreignKey: 'groups_id', as: 'group' });

export { GroupsUsers };
