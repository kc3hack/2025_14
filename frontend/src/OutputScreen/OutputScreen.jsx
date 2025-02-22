import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./OutputScreen.css"

//json:caption,tag,tag_id
function OutputScreen() {
    const [pictureURL, setPictureURL] = useState("");
    const [textData, setTextData] = useState("");

    const location = useLocation();
    const { data } = location.state || {};

    //Jsonからデータを抽出
    const explainData = data?.caption || "";
    const imgTag = data?.tag || "";
    const imgTagID = data?.tag_id || "";
    const imgPath = data?.image_path || "";

    useEffect(() => {
        if (explainData) {
            setTextData(explainData || "");
        }
    }, [explainData]); // `explainData` が変更されたときに実行

    useEffect(() => {
        if (imgPath && imgPath.trim() !== "") {
            setPictureURL(imgPath);
        }
    }, [imgPath]);  // imgPathが変更されるたびに実行

    /*画面遷移*/
    const navigate = useNavigate();

    //特定の画面にデータを持って移動する(stateプロパティを用いてデータを送信)
    const movePage = (pageName) => {
        navigate(pageName);
    }

    // データを送る
    const sendData = (imagePath, caption, tagID) => {
        console.log("ファイルを送信します");

        // JSONオブジェクトを作成
        const jsonData = {
            image_name: imagePath,  // imagePath を image_name に対応
            caption: caption,
            tag_id: tagID
        };

        // axiosでJSONを送信
        axios.post("http://127.0.0.1:5000/collection/save", jsonData, {
            headers: {
                "Content-Type": "application/json", // JSONとして送信
            },
        })
            .then((response) => {
                console.log("Response:", response.data);
                movePage("/");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <div className="background">
                <div className="Group1">
                    <div className="Group1-1">
                        <div className="text">
                            類似する粉物料理は・・・
                        </div>
                        <img
                            className="outputImg"
                            src={pictureURL || ""}
                            alt="出力結果"
                            onLoad={() => console.log("画像が読み込まれました")}
                            onError={() => console.error("画像の読み込みに失敗しました")}
                        />
                    </div>
                    <div className="Group1-2">
                        <div className="conversation-box">
                            <p className="conversation">{textData || "データなし"}</p>
                        </div>
                        <div className="avatar"></div>
                    </div>
                </div>
                <div className="Group2">
                    <button
                        className="to-homescreen-icon"
                        onClick={() => movePage("/")}
                        aria-label="ホームへ移動"
                    ></button>
                    <button
                        className="to-registering-picturebook-icon"
                        onClick={() => sendData(imgPath, textData, imgTagID)}
                        aria-label="データを登録"
                    ></button>
                </div>
            </div>
        </>
    );
}

export default OutputScreen;