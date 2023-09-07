import { FaCheck, FaEdit, FaTrash } from "react-icons/fa"
import { GrClose } from 'react-icons/gr';
import * as S from './table.styles'

type TableProps = {
  status: boolean;
  title: string;
  description: string;
  responsible: string;
  concluded: () => void;
  onDelete: () => void
  onEdit: () => void
}

export const Table: React.FC<TableProps> = ({ status, title, description, responsible, onDelete, onEdit, concluded }) => {
  return (
    <li>
      <S.Container>
        <S.Header status={status}>
          <p className='concluded'>{status ? 'Concluída' : 'Não Concluída'}</p>

          <S.IconGroup>
            {status ? <GrClose className="uncompleted" onClick={concluded} /> : <FaCheck className="completed" onClick={concluded} />}
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