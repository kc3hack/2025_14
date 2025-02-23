import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import Sample from "./image/galetto.jpg";
import "./detail.css"

function Detail() {
    const location = useLocation();
    const { img, caption, tag } = location.state || {}; // 受け取ったデータ
    const [isPortrait, setIsPortrait] = useState(false); //画像のアスペクト比を計算

    useEffect(() => {
        if (!img) return;
        const image = new Image();
        image.src = img;
        image.onload = () => {
            // 画像が読み込まれた後にアスペクト比を計算
            if (image.height > image.width) {
                setIsPortrait(true); // 縦長画像
            } else {
                setIsPortrait(false); // 横長画像
            }
        };
    }, [img]);


    return (
        <div className="detail-page">
            <div className={`detail-image ${isPortrait ? 'img-portrait' : 'img-landscape'}`}>
                <img src={img} alt="Detail" />
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
