import './HomeScreen.css';
import React, { useState } from "react";

function App() {
  const [inputText, setInputElement] = useState(""); //テキストボックス内の文字列

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
            onClick={() => alert("ボタンがクリックされました")}>
          </button>
          <button
            className="image-icon"
            onClick={() => alert("ボタンがクリックされました")}>
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

export default App;
