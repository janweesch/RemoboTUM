import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MovementsPage from './pages/Movements/MovementsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ConversationPage from './pages/Conversation/ConversationPage'
import RemoteControlPage from './pages/RemoteControl/RemoteControlPage';
import connection from './features/connection/websocket/WebSocket';
import messagerouter from './features/connection/messaging/MessageRouter';
import { useEffect } from 'react';
import AppLayout from './components/layouts/AppLayout/AppLayout';
import ConversationSettingPage from './pages/Settings/Category/Conversation/ConversationSettingPage';



export default function App() {

      useEffect(() => {

    connection.setMessageHandler(
      (message) => {
        messagerouter.handle(message);
      }
    );

    connection.connect();

    return () => {

      connection.disconnect();

    };

  }, []);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movements" element={<MovementsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/conversation" element={<ConversationPage/>}/>
        <Route path="/remotecontrol" element={<RemoteControlPage/>}/>
        <Route path="/ConversationSettingPage" element={<ConversationSettingPage/>}/>
      </Routes>
    </AppLayout>
  );
}