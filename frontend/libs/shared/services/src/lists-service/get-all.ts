import { TaskPagination } from "shared/domain-types";
import { setupTodoApiConfig } from "shared/environment";
import { HttpClient, HttpStatusCode, UnexpectedError } from "shared/core";

type Input = {
  page: string;
}

export const getAll = async ({ page }: Input): Promise<TaskPagination> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks?page=${page}`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body[0] as TaskPagination;
    default:
      throw new UnexpectedError();
  }
};
