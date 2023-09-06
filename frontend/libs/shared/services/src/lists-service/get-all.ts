import { HttpClient, HttpStatusCode, UnexpectedError } from "shared/core";
import { TaskPagination } from "shared/domain-types";
import { setupTodoApiConfig } from "shared/environment";

export const getAll = async (): Promise<TaskPagination> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: "/tasks",
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body[0] as TaskPagination;
    default:
      throw new UnexpectedError();
  }
};
