import { FaTrash } from 'react-icons/fa';
import { Dispatch, SetStateAction, useState } from 'react';

import { Alert } from 'shared/core';
import { Task } from 'shared/domain-types';
import { ListsService } from 'shared/services';
import { ConfirmModal, ConfirmModalProps, ModalProps } from 'shared/components';

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  title?: string;
  id?: number;
  setData: Dispatch<SetStateAction<Task[]>>;
};

export const RemoveListModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  title,
  id,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    if (id) {
      setIsLoading(true)

      await ListsService.remove({ id });

      Alert.callSuccess({
        title: `Item removido com sucesso!`,
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((data) => data.filter((list) => list.id !== id));
    }
  }

  const onError = (error: unknown) => {
    Alert.callError({
      title: (error as Error).name,
      description: (error as Error).message,
    });
  };

  const onConfirm = async () => {
    try {
      await onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const modalConfigs: ConfirmModalProps = {
    isOpen,
    onRequestClose,
    onConfirm,
    title: 'Remoção de Tarefa',
    icon: FaTrash,
    size: 'sm',
    message: `Tem certeza de que deseja excluir a tarefa ${title}?`,
    isLoading: isLoading,
  };

  return <ConfirmModal {...modalConfigs} />;
};
