import budgetItem from "../entities/user.entity.js"

export async function create(data: {
  budgetId: number;
  serviceId: number;
  quantity: number;
  unitPrice: number;
  total: number;
}) {
  return budgetItem.create({ data });
}

export async function findAll() {
  return budgetItem.findMany();
}

export async function findById(id: string) {
  return budgetItem.findUnique({ where: { id } });
}

export async function update(
  id: string,
  data: { quantity?: number; unitPrice?: number; total?: number; }
) {
  return budgetItem.update({ where: { id }, data });
}

export async function remove(id: string) {
  return budgetItem.delete({ where: { id } });
}

export async function findByBudgetId(budgetId: number) {
  return budgetItem.findMany({
    where: { budgetId: budgetId }
  });
}