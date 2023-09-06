import { FaCheck, FaEdit, FaTrash } from "react-icons/fa"
import * as S from './table.styles'

type TableProps = {
  status: boolean;
  title: string;
  description: string;
  responsible: string;
  onDelete: () => void
  onEdit: () => void
}

export const Table: React.FC<TableProps> = ({ status, title, description, responsible, onDelete, onEdit }) => {
  return (
    <li>
      <S.Container>
        <S.Header>
          <p className='concluded'>{status ? 'Concluído' : 'Não Concluído'}</p>

          <S.IconGroup>
            <FaCheck className="completed" />
            <FaEdit className="edit" onClick={onEdit} />
            <FaTrash className="delete" onClick={onDelete} />
          </S.IconGroup>
        </S.Header>

        <S.Content>
          <p className='title'>Título: {title}</p>
          <span className='description'>Descrição: {description}</span>
          <p className='responsible'>Responsável: {responsible}</p>
        </S.Content>

      </S.Container>
    </li>
  )
}