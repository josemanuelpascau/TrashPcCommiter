//Librerias y dependencias
const http = require('http');
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

//Recursos
app.use(express.static(__dirname + '/'));

//Configuracion del servidor
app.set("view engine", "ejs"); //Establece el motor de plantilla, con archivos ejs
app.set("views", path.join(__dirname, "")); //Permite gestionar las rutas de los diferentes recursos de la app
app.use(express.urlencoded({ extended: false })); //Permiten recuperar valores publicados en un request
app.listen(5000);
console.log("Servidor corriendo exitosamente en el puerto 5000")

//Base de Datos
const db_name = path.join(__dirname, "db", "base.db");
const db = new sqlite3.Database(db_name, err => {
	if (err) {
		return console.error(err.message);
	} else {
		console.log("Conexión exitosa con la base de Datos");
	}
})

//Crear la tabla

const sql_commands = [
	"CREATE TABLE IF NOT EXISTS Commands(command_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, pos INTEGER NOT NULL, base INTEGER NOT NULL, array VARCHAR(50) NOT NULL);",

	//"INSERT INTO Commands (pos, base, array) VALUES (0, 0, 'Test1'), (1, 1, 'Test1'), (2, 3, 'Test1'), (0, 1, 'Test2'), (1, 2, 'Test2');",
];

for (var i = 0; i < sql_commands.length; i++) {
	var command = sql_commands[i];
	db.run(command);
	console.log(command);
};

//Enrutamiento

app.get('/', (req, res) => {
	res.render('index.ejs')
})

//Mostrar tabla de Productos
app.get('/commits', (req, res) => {
	const sql = "SELECT * FROM Commands";
	db.all(sql, [], (err, rows) => {
		if (err) {
			return console.error(err.message);
		} else {
			res.render("Commits.ejs", { modelo: rows });
			console.log({ modelo: rows });
		}
	})
})

//Crear un nuevo Registro
/*app.get('/crear',(req,res)=>{
	res.render('crear.ejs',{modelo: {}})
});*/

//POST /crear
app.post('/crear', (req, res) => {
	const sql = "INSERT INTO Commands(pos, base, array) VALUES(?,?,?)";
	const nuevo_commit = [req.body.Pos, req.body.Base, req.body.Array];
	console.log(req.body.Pos.value);
	db.run(sql, nuevo_commit, err => {
		if (err) {
			return console.error(err.message);
		}
		else {
			res.redirect("/commits");
		}
	})
});

//GET /edit/id
/*app.get("/editar/:id",(req, res)=>{
	const id=req.params.id;
	const sql="SELECT * FROM Productos WHERE Producto_ID=?";
	db.get(sql,id,(err, rows)=>{
		res.render("editar.ejs",{modelo: rows})
	})
})*/

//POST /edit/id
app.post("/editar/:id", (req, res) => {

	const id = req.params.id;
	const info_producto = [req.body.Nombre, req.body.Precio, req.body.Descripcion, id];
	const sql = "UPDATE Productos SET Nombre=?, Precio=?, Descripcion=? WHERE (Producto_ID=?)";

	db.run(sql, info_producto, err => {
		if (err) {
			return console.error(err.message);
		}
		else {
			res.redirect("/commits");
		}
	});
})

// Eliminar Registros

//GET /eliminar/id
app.get("/eliminar/:id", (req, res) => {
	const id = req.params.id;
	const sql = "SELECT * FROM Productos WHERE Producto_ID=?";
	db.get(sql, id, (err, rows) => {
		res.render("eliminar.ejs", { modelo: rows })
	})
})

//POST /eliminar/id
/*app.post("/eliminar/:id",(req, res)=>{

	const id=req.params.id;
	const sql="DELETE FROM Productos WHERE Producto_ID=?";

	db.run(sql, id, err =>{
			if (err){
				return console.error(err.message);
			}
			else{
					res.redirect("/productos");
		}
	});
})*/

//Este metodo siempre debe ir al final
app.get('/*', (req, res) => {
	res.render('notfound.ejs')
})