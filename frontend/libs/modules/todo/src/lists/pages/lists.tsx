import { Button } from 'shared/components'
import { Logo } from '../../../../../../src/assets'
import * as S from './lists.styles'
import { Table } from '../components'

export const Lists = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Content>
          <img src={Logo} alt="" />
          <p>Seja bem vindo</p>
        </S.Content>

        <S.ButtonGroup>
          <Button>Nova Tarefa</Button>
        </S.ButtonGroup>
      </S.Header>


      <S.Tasks>
        <ul>
          <Table
            key={''}
            text={'ada'}
            onDelete={() => console.log('teste')}
            onEdit={() => console.log('teste')}
          />
          <Table
            key={''}
            text={'ada'}
            onDelete={() => console.log('teste')}
            onEdit={() => console.log('teste')}
          />
          <Table
            key={''}
            text={'ada'}
            onDelete={() => console.log('teste')}
            onEdit={() => console.log('teste')}
          />
          <Table
            key={''}
            text={'ada'}
            onDelete={() => console.log('teste')}
            onEdit={() => console.log('teste')}
          />
          <Table
            key={''}
            text={'ada'}
            onDelete={() => console.log('teste')}
            onEdit={() => console.log('teste')}
          />
          <Table
            key={''}
            text={'ada'}
            onDelete={() => console.log('teste')}
            onEdit={() => console.log('teste')}
          />

        </ul>
      </S.Tasks>

      {/* <S.NoData>
        Não há registros para exibir
      </S.NoData> */}
    </S.Container>
  )
}