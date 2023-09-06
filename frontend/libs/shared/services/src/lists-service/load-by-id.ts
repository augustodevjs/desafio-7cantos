import { HttpClient, HttpStatusCode, NotFoundError, UnexpectedError } from "shared/core";
import { GetIdViewInputModel } from "shared/domain-types";
import { setupTodoApiConfig } from "shared/environment";

type Input = {
  id: number
}

export const loadById = async ({ id }: Input): Promise<GetIdViewInputModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks/${id}`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body.data as GetIdViewInputModel;
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
