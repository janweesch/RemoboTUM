import { type JSX, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../components/molecules/PageHeader/PageHeader";
import { BackButton } from "../../../../components/atoms/IconButton/IconButton";
import SettingSlider from "../../../../components/molecules/SettingsSlider/SettingsSlider";

import "./FollowMeSettingsPage.css";

export default function FollowMeSettingsPage(): JSX.Element {

    const navigate = useNavigate();

    const [distance, setDistance] = useState(1.5);
    const [speed, setSpeed] = useState(0.5);

    return (
        <div className="follow-me-settings-page-wrapper">

            <PageHeader>
                <BackButton position="top-left-fixed" onClick={() => navigate(-1)}/>
            </PageHeader>

            <main className="follow-me-settings-content">

                <SettingSlider
                    label="Distance"
                    value={distance}
                    min={0.5}
                    max={3}
                    step={0.1}
                    unit="m"
                    onChange={setDistance}
                />

                <SettingSlider
                    label="Speed"
                    value={speed}
                    min={0.1}
                    max={1}
                    step={0.1}
                    unit="m/s"
                    onChange={setSpeed}
                />

            </main>

        </div>
    );
}