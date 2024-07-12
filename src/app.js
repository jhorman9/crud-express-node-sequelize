import express from 'express';
import morgan from 'morgan';
import os from 'os';
import db from './database/database.js';
import User from './models/users.model.js';
// import { middleware } from './database/middleware.js';
import cors from 'cors';
import { Sequelize } from 'sequelize';

User

process.loadEnvFile();
const PORT = process.env.PORT ?? 3000;
const HOST = os.networkInterfaces();
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

// const whitelist = ["http://localhost:8000", "http://localhost:5173"]
// const corsOptions = {
  //   origin: function(origin, cb) {
    //     if (whitelist.includes(origin)) {
      //       cb(null, true);
      //     } else {
        //       cb(new Error('No permitido por las CORS'));
        //     }
        //   }
        // }
        
app.use(cors());

//middleware(app);

db.authenticate()
.then(() => console.log('Conexión establecida correctamente.'))
.catch((error) => console.error('Error al conectar a la base de datos: ', error));

// sync() metodo de Sequelize que sincroniza el modelo con la base de datos. Si el modelo ha cambiado, se creará una nueva tabla en la base de datos.
// el {force:true} Crea la tabla pero elimina todo lo que ya existia, borra toda la información.
// el {alter: true} verifica el estado actual de la tabla en la db, si hay columna aplica los cambios necesarios en la tabla hasta que coincida con tu modelo.

// db.sync({alter: true})
db.sync()
  .then(() => console.log('Base de datos sincronizada correctamente.'))
  .catch((error) => console.error('Error al sincronizar la base de datos: ', error));

app.get('/', (req, res) => {
  res.json({ message: "It's ok" });
});

// Create user
// Cuando se haga una petición una request a /users crear un usuario.

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json( {error: error} )
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json( { message: 'Usuario creado exitosamente:',  user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await User.update(body, {
      where: { id: id } 
    });

    const usernotArray = user.toString();
    if (usernotArray === '0') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(201).json({message: 'Actualizado exitosamente', user: body, column_affected: user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/users', async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.destroy({ where: { id } });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    const { address } = HOST['Loopback Pseudo-Interface 1'][1];
    console.log(`Escuchando en el servidor http://${address}:${PORT}`);
});