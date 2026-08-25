import type { JSX } from "react"
import { Button } from "../../components/atoms/Button/Button"
import PageHeader from "../../components/molecules/PageHeader/PageHeader";
import { BackButton } from "../../components/atoms/IconButton/IconButton";
import ScrollableView from "../../components/molecules/ScrollableButtonList/ScrollableView";
import { useNavigate } from "react-router-dom";
import "./Settings.css"

interface Setting {
  id: number;
  name: string;
}

const SETTINGS: Setting[] = [
  { id: 1, name: 'General'},
  { id: 2, name: 'Conversation'},
  { id: 3, name: 'Movements'},
  { id: 4, name: 'Follow Me'},
];

export default function SettingsPage(): JSX.Element
{
      const handleMovementClick = (setting: string) => {
  console.log('Selected:', setting);
  };

  const navigate = useNavigate();

    return (
        <div className="settings-page-wrapper">
        
            <PageHeader>
                <BackButton onClick={()=>navigate('/')}/>
            </PageHeader>

            <ScrollableView gap={10}> {SETTINGS.map(setting => (<Button key={setting.id} label={setting.name} onClick={() => handleMovementClick(setting.name)}/>))} </ScrollableView>
        </div>






    );
}