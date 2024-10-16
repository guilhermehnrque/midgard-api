import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { Group } from './GroupModel';
import { LocalAttributes } from '../../domain/interfaces/attributes/LocalAttributes';

type LocalCreationAttributes = Omit<LocalAttributes, 'id' | 'created_at' | 'updated_at'>;

class Local extends Model<LocalAttributes, LocalCreationAttributes> implements LocalAttributes {
    public id!: number;
    public country!: string;
    public state!: string;
    public city!: string;
    public street!: string;
    public zip_code!: number;
    public number!: number | null;
    public description!: string;
    public groups_id!: number;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Local.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(255),
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
    modelName: 'Local',
    tableName: 'locals',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


export { Local };
