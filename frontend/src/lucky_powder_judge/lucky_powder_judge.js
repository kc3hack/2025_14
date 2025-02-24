import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./lucky_powder_judge.css";
import testPictureURL from "./testdata/a1.png"

// json: caption, tag, tag_id
function LuckyPowderJudge() {
    const [pictureURL, setPictureURL] = useState("");
    const [textData, setTextData] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};

    // Jsonからデータを抽出
    const explainData = data?.caption || "";
    const imgPath = data?.image_path || "";
    
    //TestData
    const [testTextData, setTestTextData] = useState("aohsiansocxansaisxanbickxsabxcukdbcxdikcdnldcobkwdbcw");

    useEffect(() => {
        if (explainData) {
            setTextData(explainData || "");
        }
    }, [explainData]);

    useEffect(() => {
        if (imgPath && imgPath.trim() !== "") {
            setPictureURL(imgPath);
        }
    }, [imgPath]);

    /* 画面遷移 */
    const movePage = (pageName) => {
        navigate(pageName);
    };

    return (
        <>
            <div className="background-a">
                <div className="group1">
                    <div className="group1-1">
                        <div className="Text">
                            今日のラッキー粉物は・・・
                        </div>
                        <img
                            className="OutputImg"
                            src={testPictureURL|| ""}
                            alt="出力結果"
                            onLoad={() => console.log("画像が読み込まれました")}
                            onError={() => console.error("画像の読み込みに失敗しました")}
                        />
                    </div>
                    <div className="group1-2">
                        <div className="Conversation-box">
                            <p className="Conversation">{testTextData || "データなし"}</p>
                        </div>
                        <div className="Avatar"></div>
                    </div>
                </div>
                <div className="group2">
                    <button
                        className="To-homescreen-icon"
                        onClick={() => {
                            console.log("ホームへ移動");
                            movePage("/");
                        }}
                        aria-label="ホームへ移動"
                    ></button>
                </div>
            </div>
        </>
    );
}

export default LuckyPowderJudge;
