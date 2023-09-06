import { CreateViewInputModel, Task } from "../models"

export const toTask = (createdTask: CreateViewInputModel): Task => {
  return {
    id: createdTask.id,
    title: createdTask.title,
    description: createdTask.description,
    responsible: createdTask.responsible,
    completed: false,
  }
}