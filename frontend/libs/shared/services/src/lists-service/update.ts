import { setupTodoApiConfig } from "shared/environment";
import { UpdateTaskInputModel, UpdateViewInputModel } from "shared/domain-types";
import { HttpClient, HttpStatusCode, UnexpectedError, ValidationError } from "shared/core";

type Input = {
  id: number;
  data: UpdateTaskInputModel
};

export const update = async ({ data, id }: Input): Promise<UpdateViewInputModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: `/tasks/${id}`,
    method: "PUT",
    body: {
      title: data.title,
      description: data.description,
      responsible: data.responsible
    },
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body.data as UpdateViewInputModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body);
    default:
      throw new UnexpectedError();
  }
};
