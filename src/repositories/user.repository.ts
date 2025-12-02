
import user from "../entities/user.entity.js";

export async function create(data: {
  name: string;
  email: string;
  password: string;
}) {
  return user.create({ data });
}

export async function findAll() {
  return user.findMany();
}

export async function findById(id: number) {
  return user.findUnique({ where: { id } });
}

export async function update(id: number, data: {name?:string; email?: string; password?: string}){
    return user.update({ where : {id}, data})
}

export async function remove(id: number){
    return user.delete({ where: {id}})
}