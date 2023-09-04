import { Button, TextInput } from 'shared/components'
import * as S from './form-register.styles'

export const FormRegister = () => {
  return (
    <S.Form autoComplete='off' onSubmit={() => console.log('oi')}>
      <h2>Nova Conta</h2>
      <TextInput
        type="text"
        label="Nome"
        isRequired
        placeholder="Digite o seu nome"
      />
      <TextInput
        type="email"
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
      <TextInput
        type="password"
        label="Confirmação de Senha"
        isRequired
        placeholder="Repita novamente sua senha"
      />
      <Button type="submit" >
        Cadastrar
      </Button>
    </S.Form>
  )
}