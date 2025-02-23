import React, { useRef } from "react";
import Webcam from "react-webcam";
import "./CameraModal.css"

const CameraModal = ({ onClose, onCapture }) => {
    const webcamRef = useRef(null);

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();

        if (imageSrc) {
            // base64からBlobに変換
            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];

            const arrayBuffer = new ArrayBuffer(byteString.length);
            const uint8Array = new Uint8Array(arrayBuffer);

            for (let i = 0; i < byteString.length; i++) {
                uint8Array[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([uint8Array], { type: mimeString });

            // BlobをFileに変換（任意のファイル名を指定）
            const file = new File([blob], "captured_image.jpg", { type: mimeString });

            onCapture(file);
        }
    };

    return (
        <div className="camera-modal">
            <div className="camera-container">
                <Webcam
                    className="webcam"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <button className="capture-button" onClick={capture}>📸 撮影</button>
                <button className="close-button" onClick={onClose}>❌ 閉じる</button>
            </div>
        </div>
    );
};

export default CameraModal;
