import * as clientRepository from "../repositories/client.repository.ts";

export async function createClient(data: {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
}) {
  return await clientRepository.create(data);
}

export async function getAllClients() {
  return await clientRepository.findAll();
}

export async function findClientById(id: number) {
  return await clientRepository.findById(id);
}

export async function updateClient(
  id: number,
  data: { nome?: string; email?: string; senha?: string }
) {
  return await clientRepository.update(id, data);
}

export async function deleteClient(id: number) {
  return await clientRepository.remove(id);
}