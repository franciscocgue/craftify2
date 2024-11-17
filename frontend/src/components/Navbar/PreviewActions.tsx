import BeatLoader from "react-spinners/BeatLoader";
import styles from './PreviewActions.module.css';
import IconButton from "../common/IconButton";
import { FaPlay } from "react-icons/fa";
import { IoQrCodeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import QRDisplay from "./QRDisplay";

const QR_CODE_SHOW_SECONDS = 5;

type PreviewActionsProps = {
    isBuilding: boolean,
    url: string | undefined,
}

const Loader = (isBuilding: boolean) => (
    <BeatLoader
        color={'grey'}
        loading={isBuilding}
        size={8}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
)

const PlayButton = (url: string) => (
    <IconButton
        icon={<FaPlay />}
        onClick={() => {
            var win = window.open(url, '_blank');
            if (win !== null) { win.focus(); }
        }}
        baseStylesOverwrite={{
            color: 'white'
        }}
    >
    </IconButton>
)

const ShowQrCodeButton = (openQr: () => void) => (
    <IconButton
        icon={<IoQrCodeSharp size={30} />}
        onClick={openQr}
        baseStylesOverwrite={{
            color: 'white'
        }}
    >
    </IconButton>
)

const PreviewActions = ({ isBuilding, url }: PreviewActionsProps) => {

    const [showQR, setShowQR] = useState(false);

    const openQr = () => setShowQR(true);

    useEffect(() => {
        if (showQR) {
            // set timer to close
            setTimeout(() => {
                setShowQR(false)
            }, QR_CODE_SHOW_SECONDS * 1000);
        }
    }, [showQR])

    return <div className={styles.wrapper}>
        {Loader(isBuilding)}
        {!isBuilding
            && url
            && PlayButton(url)
        }
        {!isBuilding
            && url
            && ShowQrCodeButton(openQr)
        }
        {/* QR with overlay */}
        {showQR
            && url
            && <QRDisplay url={url} secondsToClose={QR_CODE_SHOW_SECONDS} />
        }
    </div >
};

export default PreviewActions;