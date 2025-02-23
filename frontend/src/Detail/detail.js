import { useEffect, useState } from "react";
// import axios from "axios";
import Sample from "./image/PXL.jpg";
import "./detail.css"

function Detail({ image_path = Sample, caption = "No", tag = "No" }) {

    const [isPortrait, setIsPortrait] = useState(false); //画像のアスペクト比を計算

    useEffect(() => {
        const img = new Image();
        img.src = image_path;
        img.onload = () => {
            // 画像が読み込まれた後にアスペクト比を計算
            if (img.height > img.width) {
                setIsPortrait(true); // 縦長画像
            } else {
                setIsPortrait(false); // 横長画像
            }
        };
    }, [image_path]);


    return (
        <div className="detail-page">
            <div className={`detail-image ${isPortrait ? 'img-portrait' : 'img-landscape'}`}>
                <img src={Sample} alt="Detail" />
            </div>

            <div className="detail-text">
                <div className="detail-tag">
                    <h1>分類</h1>
                    <p>{tag}</p>
                </div>
                <div className="detail-cap">
                    <h1>説明</h1>
                    <p>{caption}</p>
                </div>
            </div>

            <div className="detail-backBtn">
                <button onClick={() => window.history.back()}>
                    <p>←戻る</p>
                </button>
            </div>

        </div>
    );
}

export default Detail;
