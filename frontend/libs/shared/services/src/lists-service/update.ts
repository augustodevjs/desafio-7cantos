import { setupTodoApiConfig } from "shared/environment";
import { FormTaskInputModel, FormTaskViewModel } from "shared/domain-types";
import { HttpClient, HttpStatusCode, NotFoundError, UnexpectedError, ValidationError } from "shared/core";

type Input = {
  id: number;
  data: FormTaskInputModel
};

export const update = async ({ data, id }: Input): Promise<FormTaskViewModel> => {
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
      return response.body.data as FormTaskViewModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body);
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
