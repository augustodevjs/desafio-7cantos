import { FaCheck, FaEdit, FaTrash } from "react-icons/fa"
import * as S from './table.styles'

type TableProps = {
  text: string;
  onDelete: () => void
  onEdit: () => void
}

export const Table: React.FC<TableProps> = ({ text, onDelete, onEdit }) => {
  return (
    <li>
      <S.Container>
        <S.Header>
          <p className='concluded'>Status: Em Atraso</p>

          <S.IconGroup>
            <FaCheck className="completed" />
            <FaEdit className="edit" onClick={onEdit} />
            <FaTrash className="delete" onClick={onDelete} />
          </S.IconGroup>
        </S.Header>

        <S.Content>
          <p className='title'>Título: Título da Task</p>
          <span className='description'>Descrição: descrição da Task</span>
          <p className='responsible'>Responsável: Responsável da Task</p>
        </S.Content>

      </S.Container>
    </li>
  )
}