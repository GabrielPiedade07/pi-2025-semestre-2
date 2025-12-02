import service from "../entities/service.entity.js";

export async function create(data: {
  name: string;
  description: string;
  unitPrice: number;
  unitOfMeasure: string;

}) {
  return service.create({ data });
}

export async function findAll() {
  return service.findMany();
}

export async function findById(id: number) {
  return service.findUnique({ where: { id } });
}

export async function update(id: number, data: {name?:string; description?: string; unitPrice?: number; unitOfMeasure?:string}){
    return service.update({ where : {id}, data})
}

export async function remove(id: number){
    return service.delete({ where: {id}})
}