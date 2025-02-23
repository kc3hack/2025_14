import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

import sampleImage from "./testData/a1.png";
import sampleImage2 from "./testData/a2.png";
import sampleImage3 from "./testData/a3.png";
import sampleImage4 from "./testData/a4.png";
import sampleImage5 from "./testData/a5.png";
import sampleImage6 from "./testData/a6.png";
import sampleImage7 from "./testData/a7.png";
import sampleImage8 from "./testData/a8.png";
import sampleImage9 from "./testData/a9.png";
import sampleImage10 from "./testData/a10.png";

import toHomeButton from "./material/toHome.svg"

import axios from "axios";
import "./PictureBook.css"


function PictureBook() {
    const [displayObjects, setDisplayObjects] = useState([]);
    /*画面遷移*/
    const navigate = useNavigate();

    //特定の画面にデータを持って移動する(stateプロパティを用いてデータを送信)
    const movePage = (pageName) => {
        navigate(pageName);
    }

    const location = useLocation(); //遷移時の情報を取得する
    useEffect(() => {
            // // ページ遷移が発火したタイミングで処理を実行
            // console.log('遷移先ページ:', location.pathname);
            // console.log('session:', document.cookie);

            // const sendData = () => {
            //     console.log("空のJsonを送信");

            //     axios.post("http://127.0.0.1:5000/collection/get", {
            //         text: "空のJsonを送信"
            //     }, {
            //         headers: {
            //             "Content-Type": "application/json", // リクエストがJSONデータであることを伝える
            //             "Accept": "application/json", // サーバーにJSON形式のレスポンスを期待
            //         },
            //         withCredentials: true, // クッキーを送信
            //     })
            //         .then((response) => {
            //             console.log(response.data);

            //             // `result` が存在するか確認
            //             if (response.data && Array.isArray(response.data.result)) {
            //                 // 必要なデータを抽出してstateに格納
            //                 const extractedData = response.data.result.map(item => ({
            //                     caption: item.caption || "No caption", // captionがない場合のデフォルト値
            //                     image_name: item.image_name || "default_image.png", // image_nameがない場合のデフォルト値
            //                     tag: item.tag || "No tag",  // tagがない場合のデフォルト値

            //                 }));

            //                 setDisplayObjects(extractedData);
            //                 console.log("Extracted Data:", extractedData);
            //             } else {
            //                 console.error("Invalid response structure:", response.data);
            //             }
            //         })
            //         .catch((error) => {
            //             if (error.response) {
            //                 // サーバーがレスポンスを返した場合
            //                 console.error("Response Error:", error.response);
            //             } else if (error.request) {
            //                 // リクエストは送信されたが、サーバーからのレスポンスがなかった場合
            //                 console.error("Request Error:", error.request);
            //             } else {
            //                 // その他のエラー
            //                 console.error("Error:", error.message);
            //             }
            //         });
            // };
            // sendData();  // 空のデータを送信

        // テストデータを直接セット
        const testData = [
            {
                caption: "これはサンプル画像1です",
                image_name: sampleImage,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像2です",
                image_name: sampleImage2,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像3です",
                image_name: sampleImage3,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像4です",
                image_name: sampleImage4,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像5です",
                image_name: sampleImage5,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像6です",
                image_name: sampleImage6,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像7です",
                image_name: sampleImage7,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像8です",
                image_name: sampleImage8,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像9です",
                image_name: sampleImage9,
                tag:"そば粉のガレット"
            },
            {
                caption: "これはサンプル画像10です",
                image_name: sampleImage10,
                tag:"そば粉のガレット"
            },
        ];

        setDisplayObjects(testData);  // テストデータを設定

    }, [location]);

    const handleButtonClick = (img,caption,tag) => {
        alert(`ボタンがクリックされました: ${caption}`);
        navigate("/detail", { state: { img, caption, tag } }); // 画面遷移時にデータを送る
    };

    return (
        <>
            <div className='background'>
                <div className="title">
                    <h1>図鑑</h1>
                </div>

                <div>
                    {displayObjects.length > 0 ? (
                        <div className="button-container-wrapper">
                            {displayObjects.map((item, index) => (
                                <div key={index} className="button-container">
                                    <button
                                        className="image-button"
                                        style={{ backgroundImage: `url(${item.image_name})` }}
                                        onClick={() => handleButtonClick(item.image_name,item.caption,item.tag)}  // クリック時にアラート表示
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>データがありません。</p>
                    )}
                </div>

                <div className="to-home-button-parent">
                    <button
                        className="to-home-button"
                        style={{ backgroundImage: `url(${toHomeButton})` }}
                        onClick={() => movePage("/")}  // ホーム画面に移動する
                    />
                </div>
            </div>
        </>
    );
}

export default PictureBook;
