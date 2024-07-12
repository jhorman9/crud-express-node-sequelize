import { DataTypes } from "sequelize";
import db from "../database/database.js";

const User = db.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Debe ingresar un email válido"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 12],
                msg: "La contraseña debe tener entre 6 y 12 caracteres"
            },
        }
    }
});

export default User;