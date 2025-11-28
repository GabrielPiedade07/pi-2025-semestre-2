import type { Request, Response } from 'express'
import * as serviceService from '../services/service.services.js'

export async function createService(req: Request, res: Response){
    const { nome, descricao, precoUnitario, unidadeDeMedida} = req.body
    const service = await serviceService.createService({ nome, descricao, unidadeDeMedida, precoUnitario })
    res.status(200).json(service)
}

export async function getAllService(req: Request, res: Response){
    const service = await serviceService.getAllServices();
    res.status(200).json(service)
}

export async function getServiceById(req: Request, res: Response){
    const { id } = req.params
    const service = await serviceService.findServiceById(Number(id))
    service ? res.status(200).json(service) : res.status(404).json({ message:"Serviço não encontrado"})
}

export async function updateService(req: Request, res: Response){
    const { id } = req.params
    const { nome, descricao, unidadeDeMedida, precoUnitario} = req.body
    const service = await serviceService.updateService(Number(id), {
        nome,
        descricao,
        unidadeDeMedida,
        precoUnitario,
    })
    !service ? res.status(404).json({ message: "Usuário não encontrado/Não foi possível encontrar a opção DELETAR"}) : res.status(200).json(service)
}

export async function deleteServiceById(req: Request, res: Response){
    const { id } = req.params
    const service = await serviceService.deleteservice(Number(id))
    !service ? res.status(404).json({ message: "Usuário não encontrado/Não foi possível encontrar a opção DELETAR"}) : res.status(200).json(service)
}

