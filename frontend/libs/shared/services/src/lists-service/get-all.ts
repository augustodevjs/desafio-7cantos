import { Task } from "shared/domain-types";
import { setupTodoApiConfig } from "shared/environment";
import { HttpClient, HttpStatusCode, UnexpectedError } from "shared/core";

export const getAll = async (): Promise<Task[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as Task[];
    default:
      throw new UnexpectedError();
  }
};
