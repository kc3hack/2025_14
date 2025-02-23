import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./PictureBook.css"


function PictureBook() {
    const [displayObjects, setDisplayObjects] = useState([]);  // 初期値をnullに設定

    const location = useLocation(); //遷移時の情報を取得する
    useEffect(() => {
        // ページ遷移が発火したタイミングで処理を実行
        console.log('遷移先ページ:', location.pathname);
        console.log('session:', document.cookie);

        // 空送信したい場合
        const sendData = () => {
            console.log("空のJsonを送信");

            axios.post("http://127.0.0.1:5000/collection/get", {
                text : "空のJsonを送信"
            }, {
                headers: {
                    "Content-Type": "application/json", // リクエストがJSONデータであることを伝える
                    "Accept": "application/json", // サーバーにJSON形式のレスポンスを期待
                },
                withCredentials: true, // クッキーを送信
            })
            .then((response) => {
                console.log(response.data);
                // 必要なデータを抽出してstateに格納
                const extractedData = response.data.result.map(item => ({
                    caption: item.caption,
                    image_name: item.image_name,
                }));
                setDisplayObjects(extractedData);
                console.log("Extracted Data:", extractedData);
            })
            .catch((error) => {
                if (error.response) {
                    // サーバーがレスポンスを返した場合
                    console.error("Response Error:", error.response);
                } else if (error.request) {
                    // リクエストは送信されたが、サーバーからのレスポンスがなかった場合
                    console.error("Request Error:", error.request);
                } else {
                    // その他のエラー
                    console.error("Error:", error.message);
                }
            });
        };

        sendData();  // 空のデータを送信
    }, [location]);

    return (
        <>
            <div className='background'>

            </div>
        </>
    );
}

export default PictureBook;
