/* eslint-disable react/react-in-jsx-scope */
import { UserContextProvider } from './context/userContext'
import { AppRoutes } from './router/AppRoutes'
import './App.css'

function App () {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  )
}

export default App
