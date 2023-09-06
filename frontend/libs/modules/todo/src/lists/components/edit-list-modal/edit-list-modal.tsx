import { FaPen } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ListsService } from 'shared/services';
import { Alert, ValidationError } from 'shared/core';
import { Button, Modal, ModalProps } from 'shared/components';
import { FormTaskInputModel, Task, UpdateTaskInputModel, listFormValidation } from 'shared/domain-types';

import { ListForm } from '../../components';
import * as S from './edit-list-modal.styles'

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  id?: number;
  setData: Dispatch<SetStateAction<Task[]>>;
};

export const EditListModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  setData,
  id,
}) => {
  const form = useForm<UpdateTaskInputModel>({
    mode: 'onChange',
    resolver: yupResolver(listFormValidation),
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    try {
      if (id) {
        const response = await ListsService.loadById({ id });
        form.reset(response)
      }
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }

  useEffect(() => {
    loadData()
  }, [id]);

  const onSuccess = async (data: FormTaskInputModel) => {
    if (id) {
      const response = await ListsService.update({ data, id });

      Alert.callSuccess({
        title: 'Tarefa atualizado com sucesso!',
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((prevData) =>
        prevData.map((list) =>
          list.id === response.id ? { ...response } : list,
        ),
      );

      form.reset();
    }
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

  const submitButton = (
    <Button
      type="submit"
      disabled={!form.formState.isValid}
      form="edit-list-form"
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

  const modalConfigs: ModalProps = {
    size: 'sm',
    isOpen,
    icon: FaPen,
    onRequestClose,
    title: 'Edição de Tarefa',
    actions: [submitButton],
  };

  return (
    <Modal {...modalConfigs}>
      <FormProvider {...form}>
        <ListForm id="edit-list-form" onSubmit={onSubmit} />
      </FormProvider>
    </Modal>
  );
};
