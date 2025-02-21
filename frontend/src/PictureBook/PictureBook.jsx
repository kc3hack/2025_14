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

        // 空送信したい場合
        const sendData = () => {
            console.log("空のJsonを送信");

            axios.post("http://127.0.0.1:5000/collection/get", {}, {
                headers: {
                    "Content-Type": "application/json", // JSON形式のデータを送る
                },
            })
                .then((response) => {
                    // response.data.result から必要な部分（caption と image_name）を抽出
                    const extractedData = response.data.result.map(item => ({
                        caption: item.caption,
                        image_name: item.image_name,
                    }));

                    // 抽出したデータを useState の配列に格納
                    setDisplayObjects(extractedData);

                    console.log("Extracted Data:", extractedData);
                })
                .catch((error) => {
                    console.error("File Upload Error:", error);
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