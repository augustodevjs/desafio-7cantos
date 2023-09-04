import { Link } from 'react-router-dom'
import { FormRegister } from '../components'
import * as S from './register.styles'

export const Register = () => {
  return (
    <S.Container>
      <S.Content>
        <FormRegister />
        <Link to="/login">Já possui uma conta?</Link>
      </S.Content>
    </S.Container>
  )
}