import { setupTodoApiConfig } from "shared/environment";
import { HttpClient, HttpStatusCode, NotFoundError, UnexpectedError } from "shared/core";

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
    case HttpStatusCode.NoContent:
      return;
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
