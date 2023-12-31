export type Task = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
}

export type FormTaskInputModel = {
  title: string;
  description: string;
  responsible: string;
}

export type FormTaskViewModel = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
};

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
  id: number;
  title: string;
  description: string;
  responsible: string;
}

export type GetIdViewInputModel = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
}