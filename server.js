import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM correcao_MarcioMarcal"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.post("/create-movie", (request, response) => {
    const { title, gender, ageLimit, duration } = request.body

    const insertCommand = "INSERT INTO correcao_MarcioMarcal(title, gender, ageLimit, duration) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [title, gender, ageLimit, duration], (error) => {
        if(error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme criado com sucesso!"
            })
        }
    })
})

app.delete("/delete-movie/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM correcao_MarcioMarcal WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme removido com sucesso!"
            })
        }
    })
})

app.put("/edit-movie/:id", (request, response) => {
    const { id } = request.params
    const { title, gender, ageLimit, duration } = request.body

    const updateCommand = "UPDATE correcao_MarcioMarcal SET title = ?, gender = ?, ageLimit = ?, duration = ? WHERE id = ?"

    database.query(updateCommand, [title, gender, ageLimit, duration, id], (error) => {
        if (error) {
            console.log(error)
            return
        }
        
        response.json({
	        message: "Filme editado com sucesso!"
        })
    })})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

const database = mysql2.createPool({
    database: "alunos_filmes_03MA",
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    connectionLimit: 10
})