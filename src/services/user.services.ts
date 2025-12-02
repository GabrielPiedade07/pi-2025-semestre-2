import * as userRepository from "../repositories/user.repository.ts"

export async function createUser(data: { nome: string; email:string; senha: string}){
    return await userRepository.create(data)

}

export async function getAllUsers(){
    return await userRepository.findAll()
}

export async function findUserById(id: number){
    return await userRepository.findById(id)
}

export async function updateUser(id: number, data: {nome?:string;email?:string;senha?:string}) {
    return await userRepository.update(id, data)
}

export async function deleteUser(id:number){
    return await userRepository.remove(id)
}