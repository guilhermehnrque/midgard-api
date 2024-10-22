import { Model, DataTypes, Optional } from 'sequelize';
import { Group } from './GroupModel';
import { Local } from './LocalModel';
import { ScheduleAttributes } from '../interfaces/attributes/ScheduleAttributes';
import sequelize from '../../infrastructure/database/index';

type ScheduleCreationAttributes = Optional<ScheduleAttributes, 'id' | 'created_at' | 'updated_at'>;

class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
    public id!: number;
    public starting_time!: string;
    public ending_time!: string;
    public day_of_week!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public groups_id!: number;
    public locals_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly local?: Local;
    public readonly group?: Group;
}

Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    day_of_week: {
        type: DataTypes.TEXT,
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
            model: Local,
            key: 'id',
        },
    },

}, {
    sequelize,
    tableName: 'schedules',
    modelName: 'Schedule',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Schedule.belongsTo(Group, { foreignKey: 'groups_id', as: 'group' });
Schedule.belongsTo(Local, { foreignKey: 'locals_id', as: 'local' });

export { Schedule };
