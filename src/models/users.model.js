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
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 12],
                msg: "La contraseña debe tener entre 6 y 12 caracteres"
            },
            isAlphanumeric: {
                args: true,
                msg: "La contraseña debe ser alfanumerica"
            },
            isLowercase: {
                args: true,
                msg: "La contraseña debe tener minuscula"
            },
            isUppercase: {
                args: true,
                msg: "La contraseña debe tener mayuscula"
            }
        }
    }
});

export default User;