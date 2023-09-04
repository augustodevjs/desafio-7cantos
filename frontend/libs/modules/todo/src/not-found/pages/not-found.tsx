import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as S from './not-found.styles'
import { env } from "shared/environment"

export const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <S.Container>
      <S.Code>404</S.Code>
      <S.Title>Algo deu errado aqui :</S.Title>
      <S.Description>
        Estamos trabalhando nisso e vamos corrigí-lo o mais rápido possível
      </S.Description>
      <button
        onClick={() => navigate(env.app.homepageUrl)}
      >
        Voltar
      </button>
    </S.Container>
  )
}