import { FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ListsService } from 'shared/services';
import { Alert, ValidationError } from 'shared/core';
import { Button, Modal, ModalProps } from 'shared/components';
import { CreateTaskInputModel, FormTaskInputModel, Task, listFormValidation, toTask } from 'shared/domain-types';

import { ListForm } from '../../components';
import * as S from './add-list-modal.styles'

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  setData: Dispatch<SetStateAction<Task[]>>;
};

export const AddListModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateTaskInputModel>({
    mode: 'onChange',
    resolver: yupResolver(listFormValidation),
  });

  const submitButton = (
    <Button
      type="submit"
      disabled={!form.formState.isValid}
      form="add-form-input"
      variant="primary"
    >
      {isLoading ? (
        <S.ContainerLoading>
          <ClipLoader color="#fff" loading size={18} speedMultiplier={1} />
        </S.ContainerLoading>
      ) : (
        'Salvar'
      )}
    </Button>
  );

  const onSuccess = async (data: FormTaskInputModel) => {
    const response = await ListsService.add({ data });

    Alert.callSuccess({
      title: 'Tarefa cadastrada com sucesso',
      onConfirm: onRequestClose,
    });

    setIsLoading(false);

    form.reset();

    setData((prevData) => [...prevData, toTask(response)]);
  }

  const onError = (error: unknown) => {
    setIsLoading(false);
    form.reset();

    if (error instanceof ValidationError) {
      Alert.callError({
        title: (error as Error).name,
        description: error.error.message,
        onConfirm: onRequestClose
      });
    } else {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
        onConfirm: onRequestClose
      });
    }
  };

  const onSubmit: SubmitHandler<FormTaskInputModel> = async (data) => {
    setIsLoading(true);

    try {
      await onSuccess(data)
    } catch (error) {
      onError(error)
    }
  };

  const modalConfigs: ModalProps = {
    size: 'sm',
    isOpen,
    icon: FaPlus,
    onRequestClose,
    title: 'Cadastro da Tarefa',
    actions: [submitButton],
  };

  return (
    <Modal {...modalConfigs}>
      <FormProvider {...form}>
        <ListForm id="add-form-input" onSubmit={onSubmit} />
      </FormProvider>
    </Modal>
  );
};
