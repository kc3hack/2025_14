import React, { useState } from 'react';
import axios from "axios";

import './HomeScreen.css';
import CameraModal from './CameraModal';

function HomeScreen() {
  /* 入力 */
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // 撮影画像を保存

  const [file, setFile] = useState(null); //選択されたファイルを保存

  const [inputText, setInputElement] = useState(""); //テキストボックス内の文字列を保存

  // 格納されたテキストの配列を管理するuseState
  const [savedTexts, setSavedTexts] = useState([]);

  /* 出力 */
  const [responseData, setResponseData] = useState(null); //geminiから受け取ったデータを保存

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
    const files = [...event.target.files]; // FileList → 配列に変換(実際には単体)
    console.log("Selected files:", files);
    setFile(files);
    sendData(files);
  };

  // ボタンが押されたときの処理
  const handleSaveText = () => {
    if (inputText.trim() !== "") {
      setSavedTexts(prevSavedTexts => {
        const updatedTexts = [...prevSavedTexts, inputText];
        sendData(updatedTexts); // 新しいデータを送る
        return updatedTexts;
      });
      setInputElement(""); // 入力フィールドをクリア
    }
  };

  // データを送る
  const sendData = (data) => {
    if (Array.isArray(data) && data.length > 0 && data[0] instanceof File) {
      // ファイルの場合
      const formData = new FormData();
      data.forEach(file => formData.append("files", file));

      axios.post("http://127.0.0.1:5000/process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          setResponseData(response.data);
          console.log("File Upload Response:", response.data);
        })
        .catch((error) => {
          console.error("File Upload Error:", error);
        });

    } else {
      // テキストを送る場合
      axios.post("http://127.0.0.1:5000/process", { text: data }, {
        headers: {
          "Content-Type": "application/json", // JSONとして送ることを明示
        },
      })
        .then((response) => {
          setResponseData(response.data);
          console.log("Text Processing Response:", response.data);
        })
        .catch((error) => {
          console.error("Text Processing Error:", error);
        });
    }
  };


  return (
    <>
      <div className='background'>
        <br />
        <br />
        <div className="title-frame"></div>

        <br />
        <br />

        <div className="Group9">
          <div className="image2"></div>
          <div className="sobako"></div>
          <div className="image3"></div>
          <div className="sobako"></div>
          <div className="image4"></div>
          <div className="sobako"></div>
        </div>

        <br />
        <br />

        <div className="avatar"></div>

        <br />
        <br />

        <div className="Group10">

          <button
            className="camera-icon"
            onClick={handleOpenCamera}>
          </button>
          {isCameraOpen && <CameraModal onClose={handleCloseCamera} onCapture={handleCapture} />}

          <input
            type="file"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            id="fileInput"
          />
          <button
            className="image-icon"
            onClick={() => document.getElementById("fileInput").click()}>
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
          </button>
        </div>

        <br />
        <br />

        <button
          className="to-picture-book-button"
          onClick={() => alert("ボタンがクリックされました")}>
        </button>
      </div>
      <br />
      <br />
      <br />
    </>
  )
}

export default HomeScreen;
