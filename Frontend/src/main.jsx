
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GroupsProvider } from './components/group/group-context/GroupContext.jsx'
import { AuthProvider } from './components/auth/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <AuthProvider>
                <GroupsProvider>
                    <App />
                </GroupsProvider>
            </AuthProvider>
    </BrowserRouter>

)
