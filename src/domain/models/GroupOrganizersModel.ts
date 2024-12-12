import { Model, DataTypes } from 'sequelize';
import { User } from './UserModel';
import { Group } from './GroupModel';
import { GroupOrganizersAttributes } from '../interfaces/attributes/GroupOrganizersAttributes';
import sequelize from '../../infrastructure/database/index';

type GuestCreationAttributes = Omit<GroupOrganizersAttributes, 'id' | 'created_at'>;

class GroupOrganizers extends Model<GroupOrganizersAttributes, GuestCreationAttributes> implements GroupOrganizersAttributes {
    public groups_id!: number;
    public users_id!: number;
}

GroupOrganizers.init({
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Group,
            key: 'id',
        },
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'group_has_organizers',
    modelName: 'GroupOrganizers',
    timestamps: false,
});


GroupOrganizers.belongsTo(User, { foreignKey: 'users_id',  as: 'user' });
GroupOrganizers.belongsTo(Group, { foreignKey: 'groups_id',  as: 'group' });

export { GroupOrganizers };