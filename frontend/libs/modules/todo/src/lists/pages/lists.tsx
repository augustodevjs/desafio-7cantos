import { useEffect, useState } from 'react'
import { Button } from 'shared/components'
import { Logo } from '../../../../../../src/assets'
import * as S from './lists.styles'
import { AddListModal, Table } from '../components'
import { ListsService } from 'shared/services'
import { Task } from 'shared/domain-types'
import { Alert, useModal } from 'shared/core'

export const Lists = () => {
  const [isAddModalOpen, openAddModal, closeAddModal] = useModal();


  const [data, setData] = useState<Task[]>([])

  const loadData = async () => {
    try {
      const response = await ListsService.getAll();
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
                onDelete={() => console.log(data)}
                onEdit={() => console.log(data)}
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
    </S.Container>
  )
}