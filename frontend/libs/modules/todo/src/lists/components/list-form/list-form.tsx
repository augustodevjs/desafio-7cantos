import { SubmitHandler, useFormContext } from 'react-hook-form';

import { TextInput } from 'shared/components';
import { CreateTaskInputModel } from 'shared/domain-types';

import * as S from './list-form.styles';

type Props = {
  onSubmit: SubmitHandler<CreateTaskInputModel>;
  id: string;
};

export const ListForm: React.FC<Props> = ({ onSubmit, id }) => {
  const { register, handleSubmit, formState } = useFormContext<CreateTaskInputModel>();

  return (
    <S.Form autoComplete='off' onSubmit={handleSubmit(onSubmit)} id={id}>
      <TextInput
        type="text"
        label="Título"
        isRequired
        placeholder="Digite o título"
        error={formState.errors.title?.message}
        {...register('title')}
      />
      <TextInput
        type="text"
        label="Descrição"
        isRequired
        placeholder="Digite a descrição"
        error={formState.errors.responsible?.message}
        {...register('description')}
      />
      <TextInput
        type="text"
        label="Responsável"
        isRequired
        placeholder="Digite o nome do responsável"
        error={formState.errors.responsible?.message}
        {...register('responsible')}
      />
    </S.Form>
  );
};
