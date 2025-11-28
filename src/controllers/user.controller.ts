import type Express from ("express");
import * as userService from "../services/user.service.js"

export async function createUser(req: Request, res: Response) {
    const {name, email, password} = req.body
     const user = await userService.createUser({ name, email, password })
    res.status(200).json(user)
}

export async function getAllUser(req: Request, res: Response){
    const user = await userService.getAllUsers();
    res.status(200).json(user)
}

export async function getUserById(req: Request, res: Response){
    const { id } = req.params
    const user = await userService.findUserById(Number(id))
    user ? res.status(200).json(user) : res.status(404).json({ message:"Usuário não encontrado"})
}

export async function updateUser(req: Request, res: Response){
    const { id } = req.params
    const { name, email, password} = req.body
    const user = await userService.updateUser(Number(id), {
        name,
        email,
        password
    })
    !user ? res.status(404).json({ message: "Usuário não encontrado/Não foi possível encontrar a opção ATUALIZAR"}) : res.status(200).json(user)
}

export async function deleteUserById(req: Request, res: Response){
    const { id } = req.params
    const user = await userService.deleteUser(Number(id))
    !user ? res.status(404).json({ message: "Usuário não encontrado/Não foi possível encontrar a opção ATUALIZAR"}) : res.status(200).json(user)
}
    
