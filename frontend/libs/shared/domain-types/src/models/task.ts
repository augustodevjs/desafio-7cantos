type CreateDataViewInputModel = {
  id: number;
  title: string;
  description: string;
  responsible: string;
}

type GetDataViewInputModel = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
}

type UpdateDataViewInputModel = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
}

export type CreateTaskInputModel = {
  title: string;
  description: string;
  responsible: string;
}

export type UpdateTaskInputModel = {
  title: string;
  description: string;
  responsible: string;
}

export type CreateViewInputModel = {
  data: CreateDataViewInputModel;
}

export type GetViewInputModel = {
  data: GetDataViewInputModel;
}

export type UpdateViewInputModel = {
  data: UpdateDataViewInputModel;
}

export type DeleteViewInputModel = {
  message: string;
}

export type UncompletedViewInputModel = {
  message: string;
}

export type CompletedViewInputModel = {
  message: string;
}