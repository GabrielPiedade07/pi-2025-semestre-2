import { Router } from "express";
import * as budgetController from "../controllers/budged.controller.js";
import * as budgetItemController from "../controllers/budgedItem.controller.js"

const router = Router();

router.post("/budget", budgetController.createBudget);
router.get("/budgets", budgetController.getAllBudget);
router.get("/budget/:id", budgetController.getBudgetById);
router.patch("/budget/:id", budgetController.updatebudget);
router.delete("/budget/:id", budgetController.deletebudgetById);

// --- Rotas de Itens (Filhos) ---

router.post("/:budgetId/items", budgetItemController.createItem);

// 2. Listar Itens de um Orçamento (GET /budgets/10/items)
router.get("/:budgetId/items", budgetItemController.getItemsByBudget);


router.patch("/items/:id", budgetItemController.updateItem);

// 4. Deletar Item (DELETE /items/50)
router.delete("/items/:id", budgetItemController.deleteItemById);

// 5. Pegar um Item só
router.get("/items/:id", budgetItemController.getItemById);

export default router