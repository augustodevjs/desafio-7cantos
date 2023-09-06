import { HttpClient, HttpStatusCode, UnexpectedError } from "shared/core";
import { GetViewInputModel } from "shared/domain-types";
import { setupTodoApiConfig } from "shared/environment";

type Input = {
  id: number
}

export const loadById = async ({ id }: Input): Promise<GetViewInputModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks/${id}`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body.data as GetViewInputModel;
    default:
      throw new UnexpectedError();
  }
};
