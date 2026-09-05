import { type JSX } from "react";
import { useNavigate } from "react-router-dom";

import { BackButton } from "../../../../components/atoms/IconButton/IconButton";
import PageHeader from "../../../../components/molecules/PageHeader/PageHeader";

import "./ConversationSettingPage.css";
import { Button } from "../../../../components/atoms/Button/Button";

export default function ConversationSettingsPage(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="conversation-settings-page-wrapper">

            <PageHeader>
                <BackButton position="top-left-fixed" onClick={() => navigate("/")}/>
            </PageHeader>

            <main className="conversation-settings-content">
                <Button label="Speeches" onClick={() => navigate("/conversation/settings/speeches")}/>
                <Button label="Speaker Volume" onClick={() => navigate("/conversation/settings/volume")}/> 
            </main>
        </div>
    );
}