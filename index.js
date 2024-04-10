const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Importa bodyParser
const mysql = require("mysql");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

const credentials = {
  host: '154.56.47.52',
  user: 'u196388150_SU',
  password: 'E9n8@8xW9KB^6',
  database: 'u196388150_SU'
};

app.get('/', (req, res) => {
  res.send('hola desde tu primera ruta de la Api');
});


app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	/*aqui va lo del tipo_usuario*/
    const values = [username, password, ];

	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM login WHERE username = ? AND password = ?", values, (err, result) => {/* aqui debe de ir el campo de tipo_usuario */
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username,
                    "tipo_usuario": result[0].tipo_usuario
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})


app.post('/api/usuarios', (req, res) => {
    const { username, password } = req.body;/**aqui va de nuevo el tipo_usuario  */
    const values = [username, password];
    const sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
    var connection = mysql.createConnection(credentials);
    connection.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("Usuario creado correctamente");
        }
    });
    connection.end();
});

app.get('/api/usuarios2', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    var connection = mysql.createConnection(credentials);
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
    connection.end();
});

app.get('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    var connection = mysql.createConnection(credentials);
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).send("Usuario no encontrado");
            }
        }
    });
    connection.end();
});

app.put('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { username, password } = req.body;
    const values = [username, password, id];
    const sql = "UPDATE login SET ? WHERE id = ?";
    var connection = mysql.createConnection(credentials);
    connection.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Usuario actualizado correctamente");
        }
    });
    connection.end();
});

app.delete('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM login WHERE id = ?";
    var connection = mysql.createConnection(credentials);
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Usuario eliminado correctamente");
        }
    });
    connection.end();
});

app.post('/api/register', (req, res) => {
    const { id, user, username, password, tipo_usuario } = req.body;
    const values = [id, user, username, password];
    const sql = "INSERT INTO login (id, user, username, password  ) VALUES (?, ?, ?, ?)";
    var connection = mysql.createConnection(credentials);
    connection.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("Usuario registrado correctamente");
        }
    });
    connection.end();
});

app.get('/api/usuarios', (req, res) => {
    const sql = "SELECT * FROM login";
    var connection = mysql.createConnection(credentials);
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
    connection.end();
});
app.post('/api/esp32', (req, res) => {
    const { sensor_1, sensor_2, sensor_3 } = req.body;

    const values = [sensor_1, sensor_2, sensor_3];
    const sql = "INSERT INTO esp32_data (sensor_1, sensor_2, sensor_3) VALUES (?, ?, ?)";
    
    var connection = mysql.createConnection(credentials);
    connection.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("Datos de ESP32 almacenados correctamente");
        }
    });

    connection.end();
});


  


app.listen(4000, () => console.log('hola soy el servidor!!')) 