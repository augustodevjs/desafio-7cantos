import { Button, TextInput } from 'shared/components';
import * as S from './form-login.styles';

export const FormLogin = () => {
  return (
    <S.Form autoComplete='off' onSubmit={() => console.log('teste')}>
      <h2>Autenticação</h2>
      <TextInput
        type="text"
        label="Email"
        isRequired
        placeholder="Digite o seu email"
      />
      <TextInput
        type="password"
        label="Senha"
        isRequired
        placeholder="Digite a sua senha"
      />
      <Button type="submit">
        Entrar
      </Button>
    </S.Form>
  )
}