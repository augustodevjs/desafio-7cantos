import { Dispatch, SetStateAction, useState } from "react";
import { Task } from "shared/domain-types";
import { ListsService } from "shared/services";
import { Alert, NotFoundError } from "shared/core";
import { ConfirmModal, ConfirmModalProps, ModalProps } from "shared/components";

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  title?: string;
  completed?: boolean;
  id?: number;
  setData: Dispatch<SetStateAction<Task[]>>;
};

export const StatusCompletedModal: React.FC<Props> = ({ setData, id, isOpen, onRequestClose, title, completed }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    if (id) {
      setIsLoading(true);

      completed ? await ListsService.uncompleted({ id }) : await ListsService.completed({ id });

      Alert.callSuccess({
        title: completed ? 'Tarefa desconcluída com sucesso!' : 'Tarefa concluída com sucesso!',
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((data) =>
        data.map((list) => {
          if (list.id === id) {
            return { ...list, completed: !completed };
          }
          return list;
        })
      );
    }
  }

  const onError = (error: unknown) => {
    if (error instanceof NotFoundError) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
        onConfirm: onRequestClose
      })
    } else {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
        onConfirm: onRequestClose
      });
    }
  }

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
    title: 'Status da Tarefa',
    size: 'sm',
    message: completed ? `Tem certeza de que deseja desconcluir a tarefa '${title}'?` : `Tem certeza de que deseja concluir a tarefa '${title}'`,
    isLoading: isLoading,
  };

  return <ConfirmModal {...modalConfigs} />;
}