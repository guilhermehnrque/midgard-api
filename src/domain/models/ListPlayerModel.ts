import { DataTypes, Model } from 'sequelize';
import { User } from './UserModel';
import { List } from './ListBaseModel';
import { ListPlayerAttributes } from '../interfaces/attributes/ListPlayerAttributes';
import { Guest } from './GuestModel';
import sequelize from '../../infrastructure/database/index';

type PlayersListCreationAttributes = Omit<ListPlayerAttributes, 'id' | 'created_at' | 'updated_at'>;

class ListPlayer extends Model<ListPlayerAttributes, PlayersListCreationAttributes> implements PlayersListCreationAttributes {
    public id!: number;
    public list_base_id!: number;
    public player_status!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public users_id?: number | null;
    public guest_id?: number | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ListPlayer.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    list_base_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: List,
            key: 'id',
        }
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    guest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Guest,
            key: 'id',
        }
    },
    player_status: {
        type: DataTypes.STRING(100),
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
}, {
    sequelize,
    tableName: 'list_player',
    modelName: 'ListPlayer',
    timestamps: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

ListPlayer.belongsTo(List, { foreignKey: 'lists_id', as: 'list' });
ListPlayer.belongsTo(User, { foreignKey: 'players_id', as: 'user' });

export { ListPlayer };