import { Task } from "./task";

export type TaskPagination = {
  current_page: number;
  data: Task[];
}