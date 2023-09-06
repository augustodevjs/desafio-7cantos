import { HttpClient, HttpStatusCode, UnexpectedError, ValidationError } from "shared/core";
import { FormTaskInputModel, FormTaskViewModel } from "shared/domain-types";
import { setupTodoApiConfig } from "shared/environment";

type Input = {
  data: FormTaskInputModel
};

export const add = async ({ data }: Input): Promise<FormTaskViewModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupTodoApiConfig()
  ).request({
    url: "/tasks",
    method: "POST",
    body: data,
  });

  switch (response.statusCode) {
    case HttpStatusCode.Created:
      return response.body.data as FormTaskViewModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body);
    default:
      throw new UnexpectedError();
  }
};
