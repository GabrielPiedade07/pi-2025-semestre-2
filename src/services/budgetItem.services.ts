import * as budgetItemRepository from "../repositories/budgetItem.repository.js"
import * as budgetRepository from "../repositories/budget.repository.js"; // Importe o repository do Budget
import * as serviceServices from "./service.services.js"; // Importe o repository do Service

async function updateParentBudgetTotal(budgetId: number) {
    // 1. Busca apenas os itens desse orçamento específico
    const items = await budgetItemRepository.findByBudgetId(budgetId);
    
    // 2. Soma os totais
    const newTotal = items.reduce((acc, item) => acc + item.total, 0);

    // 3. Atualiza a capa do orçamento
    await budgetRepository.update(budgetId, { totalAmount: newTotal });
}

export async function createBudgetItem(data: {
    budgetId: number;
    serviceId: number;
    quantity: number;
    unitPrice: number;
}) {
    // 1. VALIDAÇÃO: O Orçamento existe? (Evita o erro P2003)
    const budgetExists = await budgetRepository.findById(data.budgetId);
    if (!budgetExists) {
        throw new Error(`Orçamento com ID ${data.budgetId} não encontrado.`);
    }

    // 2. VALIDAÇÃO: O Serviço existe? (Evita o erro P2003)
    const serviceExists = await serviceServices.findServiceById(data.serviceId);
    if (!serviceExists) {
        throw new Error(`Serviço com ID ${data.serviceId} não encontrado.`);
    }
    
    // 3. Lógica de Preço
    // Se o usuário não mandou preço, usa o do serviço. Se mandou, usa o do usuário.
    const finalPrice = data.unitPrice || serviceExists.unitPrice;
    const total = data.quantity * finalPrice;

    const prepareData = {
        ...data,
        unitPrice: finalPrice, // Garante que estamos salvando o preço certo
        total,
    };

    // 4. Cria o item
    const newItem = await budgetItemRepository.create(prepareData);

    // 5. ATUALIZA O TOTAL DO ORÇAMENTO PAI
    await updateParentBudgetTotal(data.budgetId);

    return newItem;
}

export async function getItemsByBudget(budgetId: number){
    if(!budgetId) throw new Error("Id orçamento é obrigatório")
    return await budgetItemRepository.findByBudgetId(budgetId)
}

export async function findItemById(id: string){
    const item = await budgetItemRepository.findById(id);
    if(!item){
        throw new Error("Item do orçamento não encontrado")
    }
    return item;
}

export async function updateBudgetItem(
    id: string,
    data: {
        quantity?: number;
        unitPrice?: number;
    }
) {
    const existingItem = await budgetItemRepository.findById(id);
    if (!existingItem) {
        throw new Error("Item nao encontrado para atualizacao");
    }

    const newQuantity = data.quantity !== undefined ? data.quantity : existingItem.quantity;
    const newPrice = data.unitPrice !== undefined ? data.unitPrice : existingItem.unitPrice;

    const newTotal = newQuantity * newPrice;

    const updatedItem = await budgetItemRepository.update(id, {
        quantity: newQuantity,
        unitPrice: newPrice,
        total: newTotal,
    });

    // RECALCULA O TOTAL DO PAI
    await updateParentBudgetTotal(updatedItem.budgetId);

    return updatedItem;
}

export async function deleteBudgetItem(id: string) {
  const item = await budgetItemRepository.findById(id);
  if (!item) {
    throw new Error("Item não encontrado para exclusão");
  }

  const deleted = await budgetItemRepository.remove(id);

  // RECALCULA O TOTAL DO PAI (Usando o ID que pegamos antes de deletar)
  await updateParentBudgetTotal(item.budgetId); //<--

  return deleted;
}