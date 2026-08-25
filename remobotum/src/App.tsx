import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MovementsPage from './pages/Movements/MovementsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ConversationPage from './pages/Conversation/ConversationPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movements" element={<MovementsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/conversation" element={<ConversationPage/>}/>
    </Routes>
  );
}