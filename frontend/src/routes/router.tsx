import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Lists, NotFound } from 'modules/todo'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
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