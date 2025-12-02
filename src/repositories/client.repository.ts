import client from "../entities/client.entity.js";

export async function create(data: {
  name: string;
  email: string;
  phone: string;
  company: string;

}) {
  return client.create({ data });
}

export async function findAll() {
  return client.findMany();
}

export async function findById(id: number) {
  return client.findUnique({ where: { id } });
}

export async function update(id: number, data: {name?:string; email?: string; phone?: string; company?:string}){
    return client.update({ where : {id}, data})
}

export async function remove(id: number){
    return client.delete({ where: {id}})
}