import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styles from './QRDisplay.module.css';

type QRDisplayProps = {
    url: string,
    secondsToClose: number,
}

const QRDisplay = ({ url, secondsToClose }: QRDisplayProps) => {

    const [secsToClose, setSecsToClose] = useState(secondsToClose);

    // timer
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSecsToClose(prev => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    return 0;
                };
                return prev - 1;
            })
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div className={styles.overlay}>
        <div className={styles['qr-wrapper']}>
            <QRCode value={url} size={200} />
            <p className={styles['timer-msg']}>
                Closing in {secsToClose} seconds
            </p>
        </div>
    </div>
}

export default QRDisplay;