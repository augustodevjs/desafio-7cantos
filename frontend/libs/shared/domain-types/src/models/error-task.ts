type BadRequestErrorsData = {
  title: string[];
  description: string[];
  responsible: string[];
}

export type InternalServerError = {
  error: string;
}

export type DataNotFound = {
  message: string;
}

export type BadRequest = {
  message: string;
  error: BadRequestErrorsData
}