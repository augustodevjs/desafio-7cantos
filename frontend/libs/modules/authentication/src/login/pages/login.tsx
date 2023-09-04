import { Link } from 'react-router-dom'
import { FormLogin } from '../components/form-login/form.login'
import * as S from './login.styles'

export const Login = () => {
  return (
    <S.Container>
      <S.Content>
        <FormLogin />
        <Link to="/register">Não possui uma conta?</Link>
      </S.Content>
    </S.Container>
  )
}