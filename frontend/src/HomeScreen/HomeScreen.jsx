import React, { useState } from 'react';
import axios from "axios";

import './HomeScreen.css';
import CameraModal from './CameraModal';



function HomeScreen() {
  /* 入力 */
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // 撮影画像を保存

  const [file,setFile] = useState(null); //選択されたファイルを保存

  const [inputText, setInputElement] = useState(""); //テキストボックス内の文字列を保存

  /* 出力 */
  const [responseData,setResponseData] = useState(null); //geminiから受け取ったデータを保存

  // データを送る
  const sendData = (data) => {
    axios.post("http://127.0.0.1:5000/process", { data })
    .then((response) => {
      // レスポンスの処理
      setResponseData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      // エラーハンドリング
      console.error("Error:", error);
    });
  }

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
    const files = event.target.files; // 選択されたファイル
    console.log("Selected files:", files);
    setFile(files);
    sendData(files);
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
            onClick={() => alert("ボタンがクリックされました")}>
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
