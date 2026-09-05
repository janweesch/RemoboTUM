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
    const handleSettingClick = (setting: string) => {
        switch (setting) {
            case "General":
                navigate("/settings/general");
                break;

            case "Conversation":
                navigate("/ConversationSettingPage");
                break;

            case "Movements":
                navigate("/movements/settings");
                break;

            case "Follow Me":
                navigate("/settings/follow-me");
                break;

            default:
                console.log("Unknown setting:", setting);
        }
    };

  const navigate = useNavigate();

    return (
        <div className="settings-page-wrapper">
        
            <PageHeader>
                <BackButton onClick={()=>navigate(-1)}/>
            </PageHeader>

            <ScrollableView gap={10}> {SETTINGS.map(setting => (<Button key={setting.id} label={setting.name} onClick={() => handleSettingClick(setting.name)}/>))} </ScrollableView>
        </div>






    );
}