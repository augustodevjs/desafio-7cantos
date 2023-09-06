type ErrorMessage = {
  message: string
}

export class ValidationError extends Error {
  error: ErrorMessage;

  constructor(error: ErrorMessage) {
    super('Erro de Validação');
    this.name = 'Erro de Validação';
    this.error = error;
  }
}
