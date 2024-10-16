import { DataTypes, Model } from 'sequelize';
import { Schedule } from './ScheduleModel';
import { ListBaseAttributes } from '../interfaces/attributes/ListBaseAttributes';
import { Group } from './GroupModel';
import sequelize from '../../infrastructure/database/index';

type ListCreationAttributes = Omit<ListBaseAttributes, 'id' | 'created_at' | 'updated_at'>;

class List extends Model<ListBaseAttributes, ListCreationAttributes> implements ListBaseAttributes {
    public id!: number;
    public status!: boolean;
    public player_limit!: number;
    public starting_time!: Date;
    public ending_time!: Date;
    public day_of_week!: string;
    public groups_id!: number;
    public locals_id!: number;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly createdAd!: Date;
    public readonly updatedAt!: Date;
    public readonly schedule!: Schedule;
}

List.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    player_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    starting_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    ending_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    day_of_week: {
        type: DataTypes.TEXT,
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
    locals_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'locals',
            key: 'id',
        },
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
    tableName: 'list_base',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

List.belongsTo(Schedule, { foreignKey: 'schedules_id', as: 'schedule' });
List.belongsTo(Group, { foreignKey: 'groups_id', as: 'group' });

export { List };
