import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Crystale from "./material/crystale.png";
import Send from "./material/sendIcon.png";
import Book from "./material/toPictureBook.png";
import './HomeScreen.css';
import CameraModal from './CameraModal';

function SendImage() { //ロゴ画像
  return (
    <div>
      <img src={Send} alt="send" />
    </div>);
}

function CrystaleImage() { //ロゴ画像
  return (
    <div>
      <img src={Crystale} alt="clys" />
    </div>);
}

function BookImage() { //ロゴ画像
  return (
    <div>
      <img src={Book} alt="book" />
    </div>);
}

function HomeScreen() {
  /* 入力 */
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // 撮影画像を保存

  const [file, setFile] = useState(null); //選択されたファイルを保存

  const [inputText, setInputElement] = useState(""); //テキストボックス内の文字列を保存

  const [savedTexts, setSavedTexts] = useState(""); // 格納されたテキストの配列を管理するuseState

  const fileInputRef = useRef(null); //ファイルInputオブジェクトを格納


  /* 出力 */
  const [responseData, setResponseData] = useState(null); //geminiから受け取ったデータを保存

  /*画面遷移*/
  const navigate = useNavigate();

  const speed = 2; // 移動速度

  const [containerWidth, setContainerWidth] = useState(window.innerWidth); // 親要素の幅
  const [itemWidth, setItemWidth] = useState(window.innerWidth / 6); // 子要素の幅（スクリーンの6分の1として例）
  const [gap, setGap] = useState(window.innerWidth / 50); // 子要素間の隙間（スクリーン幅の1/50として例）

  // 初期位置を親要素の右端からスタートするように設定
  const initialPositions = [
    containerWidth, // 右端から開始
    containerWidth + itemWidth + gap, // 2番目の要素も右端から
    containerWidth + itemWidth * 2 + gap * 2,
    containerWidth + itemWidth * 3 + gap * 3,
    containerWidth + itemWidth * 4 + gap * 4,
    containerWidth + itemWidth * 5 + gap * 5,
  ];

  const [positions, setPositions] = useState(initialPositions);

  // ウィンドウサイズが変更された時に再計算
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
      setItemWidth(window.innerWidth / 6); // 例としてスクリーンの6分の1
      setGap(window.innerWidth / 30); // 例としてスクリーン幅の1/20
    };

    // リサイズイベントのリスナーを設定
    window.addEventListener("resize", handleResize);

    return () => {
      // クリーンアップ
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) =>
          pos <= -itemWidth ? containerWidth + gap : pos - speed
        )
      );
    }, 20);

    return () => clearInterval(interval);
  }, [containerWidth, itemWidth, gap]);

  // カメラを起動
  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  // カメラを閉じる
  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  // カメラを操作する
  const handleCapture = (capturedImage) => {
    setImageSrc(capturedImage);
    setIsCameraOpen(false);
    sendData(capturedImage);
  };

  // ファイルを選択する
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // 最初の1つだけ取得
    console.log("Selected files:", file);
    setFile(file);
    sendData(file);
  };

  // ボタンが押されたときの処理
  const handleSaveText = () => {
    if (inputText.trim() !== "") {
      setSavedTexts(prevSavedTexts => {
        const updatedTexts = prevSavedTexts + inputText; // 文字列をそのまま結合
        sendData(updatedTexts); // 文字列として送信
        return updatedTexts;
      });
      setInputElement(""); // 入力フィールドをクリア
    }
  };

  //Cookiesがあるかどうか
  useEffect(() => {
    console.log("Current Cookies:", document.cookie);
  }, []);

  // データを送る
  const sendData = (data) => {
    console.log(data);
    if (data instanceof File) {
      // 単一のファイルの場合
      console.log("ファイルを送信します");
      const formData = new FormData();
      formData.append("file", data); // ファイルを 'file' という名前で追加
      axios.post("http://127.0.0.1:5000/process", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type は multipart/form-data に設定
        },
      })
        .then((response) => {
          setResponseData(response.data);
          console.log("File Upload Response:", response.data);
          movePageToBringData("../OutputScreen", response.data, data);
        })
        .catch((error) => {
          console.error("File Upload Error:", error);
        });
    } else {
      console.log("テキストを送信します");
      // テキストを送る場合
      axios.post("http://127.0.0.1:5000/process", { text: data }, {
        headers: {
          "Content-Type": "application/json", // JSONとして送ることを明示
        },
      })
        .then((response) => {
          setResponseData(response.data);
          console.log("Text Processing Response:", response.data);
          movePageToBringData("OutputScreen", response.data, null);
        })
        .catch((error) => {
          console.error("Text Processing Error:", error);
        });
    }
  };

  //特定の画面にデータを持って移動する(stateプロパティを用いてデータを送信)
  const movePageToBringData = (pageName, data, imgData) => {
    navigate(pageName, {
      state: { data, imgData },
    });
  }

  //特定の画面にデータを持って移動する(stateプロパティを用いてデータを送信)
  const movePage = (pageName) => {
    console.log(`${pageName} に移動します`);
    navigate(pageName);
  }

  return (
    <>
      <div className='background-homescreen'>

        <div className='Group8'>
          <div className="title-frame"></div>
          <button
            className="to-login-screen-button"
            onClick={() => movePage("../Login")}>
          </button>
          <button
            className="to-logout-btn"
            onClick={() => movePage("../CheckLogout")}>
            <p>ログアウトへ</p>
          </button>
        </div>
        <div className="Group9">
          <div className="image2"></div>
          <div className="okonomiyaki"></div>
          <div className="image3"></div>
          <div className="image4"></div>
          <div className="image5"></div>
          <div className="image6"></div>
        </div>

        {/* <div
          className="Group9"
          style={{
            width: containerWidth,
            display: "flex",
            position: "relative",
          }}
        >
          {positions.map((pos, index) => (
            <div
              key={index}
              className={`
            ${index === 0 ? "image2" : ""}
            ${index === 1 ? "okonomiyaki" : ""}
            ${index === 2 ? "image3" : ""}
            ${index === 3 ? "image4" : ""}
            ${index === 4 ? "image5" : ""}
            ${index === 5 ? "image6" : ""}
          `}
              style={{
                position: "absolute",
                left: `${pos}px`,
                transition: "none",
                width: itemWidth,
              }}
            />
          ))}
        </div> */}

        <div className="avatar-homescreen"></div>

        <div className="Group10">

          <button
            className="camera-icon"
            onClick={handleOpenCamera}>
          </button>
          {isCameraOpen && <CameraModal onClose={handleCloseCamera} onCapture={handleCapture} />}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
            id="fileInput"
          />
          <button
            className="image-icon"
            onClick={() => {
              console.log("fileInputRef.current:", fileInputRef.current);
              if (fileInputRef.current) {
                fileInputRef.current.click();
              } else {
                console.error("fileInputRef が null です");
              }
            }}>
          </button>


          <input
            className="text-input"
            value={inputText}
            onChange={(e) => setInputElement(e.target.value)}
            type="text"
            placeholder=" text"
          />
          <button
            className="send-icon"
            onClick={handleSaveText}>
            <SendImage></SendImage>
          </button>
        </div>

        <div className="buttons">
          <button
            className="to-fortune-telling-button"
            onClick={() => movePage("/Fortune")}>
            <CrystaleImage></CrystaleImage>
          </button>
          <button
            className="to-picture-book-button"
            onClick={() => movePage("/PictureBook")}>
            <BookImage></BookImage>
          </button>
        </div>
      </div>
    </>
  )
}

export default HomeScreen;
