import * as yup from 'yup';

export const listFormValidation = yup.object({
  title: yup.string().required('O campo é obrigatório'),
  description: yup.string().required('O campo é obrigatório'),
  responsible: yup.string().required('O campo é obrigatório'),
});
