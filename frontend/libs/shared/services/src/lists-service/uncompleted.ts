import { setupTodoApiConfig } from "shared/environment";
import { HttpClient, HttpStatusCode, NotFoundError, UnexpectedError } from "shared/core";

type Input = {
  id: number;
};

export const uncompleted = async ({ id }: Input): Promise<void> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks/${id}/uncompleted`,
    method: "PATCH",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Created:
      return;
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
