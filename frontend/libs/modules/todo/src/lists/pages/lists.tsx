import { useEffect, useState } from 'react'

import { Task } from 'shared/domain-types'
import { Button } from 'shared/components'
import { Alert, useModal } from 'shared/core'
import { ListsService } from 'shared/services'

import * as S from './lists.styles'
import { AddListModal, EditListModal, RemoveListModal, Table } from '../components'
import { Logo } from '../../../../../../src/assets'

export const Lists = () => {
  const [data, setData] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const [isAddModalOpen, openAddModal, closeAddModal] = useModal();
  const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
  const [isRemoveModalOpen, openRemoveModal, closeRemoveModal] = useModal();

  const handleEdit = (list: Task) => {
    setSelectedTask(list);
    openEditModal();
  };

  const handleRemove = (list: Task) => {
    setSelectedTask(list);
    openRemoveModal();
  };

  const loadData = async () => {
    try {
      const response = await ListsService.getAll({ page: '11' });
      setData(response.data)
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <S.Container>
      <S.Header>
        <S.Content>
          <img src={Logo} alt="" />
          <p>Seja bem vindo</p>
        </S.Content>

        <S.ButtonGroup>
          <Button onClick={openAddModal}>Nova Tarefa</Button>
        </S.ButtonGroup>
      </S.Header>


      {data.length !== 0 ? (
        <S.Tasks>
          <ul>
            {data.map(data => (
              <Table
                key={data.id}
                status={data.completed}
                description={data.description}
                responsible={data.responsible}
                title={data.title}
                onDelete={() => handleRemove(data)}
                onEdit={() => handleEdit(data)}
              />
            ))}
          </ul>
        </S.Tasks>
      ) : (
        <S.NoData>
          Não há registros para exibir
        </S.NoData>
      )}

      <AddListModal
        setData={setData}
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
      />

      <EditListModal
        setData={setData}
        id={selectedTask?.id}
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
      />

      <RemoveListModal
        id={selectedTask?.id}
        setData={setData}
        title={selectedTask?.title}
        isOpen={isRemoveModalOpen}
        onRequestClose={closeRemoveModal}
      />
    </S.Container>
  )
}