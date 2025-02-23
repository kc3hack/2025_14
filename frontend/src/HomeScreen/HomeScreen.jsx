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

  // 格納されたテキストの配列を管理するuseState
  const [savedTexts, setSavedTexts] = useState("");

  /* 出力 */
  const [responseData, setResponseData] = useState(null); //geminiから受け取ったデータを保存

  /*画面遷移*/
  const navigate = useNavigate();

  /*ファイルInputオブジェクトを格納*/
  const fileInputRef = useRef(null);

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
          <div className="sobako"></div>
          <div className="image3"></div>
          <div className="sobako"></div>
          <div className="image4"></div>
          <div className="sobako"></div>
        </div>

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
