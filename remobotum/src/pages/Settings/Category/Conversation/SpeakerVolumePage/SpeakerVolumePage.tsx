import { type JSX, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../../../components/molecules/PageHeader/PageHeader";
import { BackButton } from "../../../../../components/atoms/IconButton/IconButton";
import VolumeBar from "../../../../../components/molecules/VolumeBar/VolumeBar";

import "./SpeakerVolumePage.css";

export default function SpeakerVolumePage(): JSX.Element {

    const navigate = useNavigate();
    const [volume, setVolume] = useState(50);

    return (
        <div className="speaker-volume-page-wrapper">

            <PageHeader>
                <BackButton
                    position="top-left-fixed"
                    onClick={() => navigate(-1)}
                />
            </PageHeader>

            <main className="speaker-volume-content">
                <VolumeBar
                    volume={volume}
                    onChange={setVolume}
                />
            </main>

        </div>
    );
}