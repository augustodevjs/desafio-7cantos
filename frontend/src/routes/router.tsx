import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login, Register } from 'modules/authentication'
import { Lists, NotFound } from 'modules/todo'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={<Navigate to="/pagina-nao-encontrada" replace />}
        />
        <Route path="pagina-nao-encontrada" element={<NotFound />} />
        <Route path="/" element={<Lists />} />
      </Routes>
    </BrowserRouter>
  )
}