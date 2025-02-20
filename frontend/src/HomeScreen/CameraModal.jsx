import React, { useRef } from "react";
import Webcam from "react-webcam";
import "./CameraModal.css"

const CameraModal = ({ onClose, onCapture }) => {
    const webcamRef = useRef(null);

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            onCapture(imageSrc);
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
