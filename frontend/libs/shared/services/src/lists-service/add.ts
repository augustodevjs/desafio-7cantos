import { HttpClient, HttpStatusCode, UnexpectedError, ValidationError } from "shared/core";
import { CreateTaskInputModel, CreateViewInputModel } from "shared/domain-types";
import { setupTodoApiConfig } from "shared/environment";

type Input = {
  data: CreateTaskInputModel
};

export const add = async ({ data }: Input): Promise<CreateViewInputModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: "/tasks",
    method: "POST",
    body: data,
  });

  console.log(response)

  switch (response.statusCode) {
    case HttpStatusCode.Created:
      return response.body.data as CreateViewInputModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body);
    default:
      throw new UnexpectedError();
  }
};
