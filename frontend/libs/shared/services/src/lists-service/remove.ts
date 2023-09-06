import { HttpClient, HttpStatusCode, UnexpectedError, ValidationError } from "shared/core";
import { setupTodoApiConfig } from "shared/environment";

type Input = {
  id: number
};

export const remove = async ({ id }: Input) => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks/${id}`,
    method: "DELETE",
  });

  console.log(response)

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body.message as string;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body);
    default:
      throw new UnexpectedError();
  }
};
