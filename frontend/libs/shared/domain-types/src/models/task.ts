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

export type GetViewInputModel = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
}

export type UpdateViewInputModel = {
  id: number;
  title: string;
  description: string;
  responsible: string;
  completed: boolean;
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