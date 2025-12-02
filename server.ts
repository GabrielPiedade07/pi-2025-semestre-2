import "dotenv/config"
import express from 'express'
import cors from 'cors' // <--- 1. IMPORTAR O CORS
import userRoutes from './src/routes/user.routes.ts'
import clientRoutes from './src/routes/clients.routes.ts'
import serviceRoutes from './src/routes/service.routes.ts'
import budgetRoutes from './src/routes/budget.routes.ts'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors()) // <--- 2. USAR O CORS (Permite que o React acesse o Backend)

app.use(userRoutes)
app.use(clientRoutes)
app.use(serviceRoutes)
app.use(budgetRoutes)

app.listen(PORT, ()=>{
    console.log(`The server is running on http://localhost:${PORT}`)
})