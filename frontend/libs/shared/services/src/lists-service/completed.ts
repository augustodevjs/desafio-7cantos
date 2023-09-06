import { setupTodoApiConfig } from "shared/environment";
import { HttpClient, HttpStatusCode, UnexpectedError, ValidationError } from "shared/core";

type Input = {
  id: number;
};

export const completed = async ({ id }: Input): Promise<void> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks/${id}/completed`,
    method: "PATCH",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body);
    default:
      throw new UnexpectedError();
  }
};
