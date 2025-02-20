import { useState } from "react";
import testImage from './material/testData.png';

import "./OutputScreen.css"

function OutputScreen() {
    const [pictureData, setPictureData] = useState(testImage);
    const [textData, setTextData] = useState("式(1)が表しているのは任意の信号f(t)は三角関数の級数で表すことができるということを表している。今回はこのことの逆を利用する。すなわちある信号f(t)というのはどのような三角関数の足し合わせで表すことができるのかを知る。");

    return (
        <>
            <div className="background">
                <div className="Group1">
                    <div className="Group1-1">
                        <div className="text">
                            類似する粉物料理は・・・
                        </div>
                        <img className="outputImg" src={pictureData} alt="出力結果" />
                    </div>
                    <div className="Group1-2">
                        <div className="conversation-box">
                            <p className="conversation">{textData}</p>
                        </div>
                        <div className="avatar"></div>
                    </div>
                    <div className="img">
                    </div>
                </div>
                <div className="Group2">
                    <button
                        className="to-homescreen-icon"
                        onClick={() => alert("ボタンがクリックされました")}>
                    </button>
                    <button
                        className="to-registering-picturebook-icon"
                        onClick={() => alert("ボタンがクリックされました")}>
                    </button>
                </div>
            </div>
        </>
    );
}

export default OutputScreen;