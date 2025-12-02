import * as budgetRepository from "../repositories/budget.repository.js";

export async function createBudget(data: {
  title: string;
  clientId: number;
  createdById: number;
  validUntil?: string | Date;
}) {
  if (!data.title || !data.clientId || !data.createdById) {
    throw new Error(
      "Dados Invalidos: Titulo, CLientId e CreatedById são obrigatórios"
    );
  }
  const prepareData = {
    ...data,
    clientId: Number(data.clientId),
    createdById: Number(data.createdById),
  };
  return budgetRepository.create(prepareData);
}

export async function getAllBudgets() {
  return await budgetRepository.findAll();
}

export async function findBudgetById(id: number) {
  const budget = await budgetRepository.findById(id);
  if (!budget) {
    throw new Error("Orçamento não encontrado");
  }
  return budget;
}

export async function updateBudget(
  id: number,
  data: {
    title?: string;
    totalAmount?: number;
    validUntil?: string | Date;
    status: "RASCUNHO" | "ENVIADO" | "APROVADO" | "REJEITADO";
  }
) {
  const existingBudget = await budgetRepository.findById(id);
  if (!existingBudget) {
    throw new Error("Não existe este orcamento");
  }
  return await budgetRepository.update(id,data)
}

export async function deleteBudget(id: number) {
  const existingBudget = await budgetRepository.findById(id);
  if (!existingBudget) {
    {
      throw new Error("Orcamento não encontrado para exclusão");
    }
  }
  return await budgetRepository.remove(id);
}