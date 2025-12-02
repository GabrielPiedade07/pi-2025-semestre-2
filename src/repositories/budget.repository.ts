import budget from "../entities/budget.entity.js"

export async function create(data: {
  title: string;
  clientId: number;
  createdById: number;
  validUntil?: string | Date; // corrigi o nome da propriedade aqui (era validUnitl)
}) {
  return budget.create({
    data: {
      title: data.title,
      clientId: data.clientId,
      createdById: data.createdById,
      // A correção principal: converte string para Date se necessário
      validUntil: data.validUntil ? new Date(data.validUntil) : null, // onde ta null era pra estar undefined 
    },
  });
}

export async function findAll() {
  return budget.findMany();
}

export async function findById(id: number) {
  return budget.findUnique({ where: { id } });
}

export async function update(
  id: number,
  data: {
    title?: string;
    totalAmount?: number;
    validUntil?: string | Date;
    status?: 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED'
  }
) {
  const dateToUpdate: any = { ...data };

  if (data.validUntil) {
    dateToUpdate.validUntil = new Date(data.validUntil);
  }
  return budget.update({ where: { id }, data: dateToUpdate });
}

export async function remove(id: number) {
  return budget.delete({ where: { id } });
}