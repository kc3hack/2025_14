import React, { useState } from 'react';
//import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // アイコンライブラリ（Font Awesome）
import Logo from "./image/logo.png";
import Post from "./login_post.js";
import "./login.css";

// export const userName = "exampleUser"; //送信するユーザ名初期化
// export const password = "examplePass"; //送信するパスワード初期化



function LogoImage() { //ロゴ画像
  return (
    <div className="logo-image">
      <img src={Logo} alt="Logo" />
    </div>);
}


export default function SignIn() {
  const [userName, setInputUserName] = useState(""); //テキストボックス内のユーザ名
  const [password, setInputPassword] = useState(""); //テキストボックス内のパスワード
  const [isRevealPassword, setIsRevealPassword] = useState(false); //伏せ字

  // const togglePassword = () => {
  //   setIsRevealPassword((prevState) => !prevState);  // パスワード表示/非表示の切り替え
  // };

  return (
    <div className="page">
      {/* ロゴボタン */}
      <div className="logo-image">
        <button>
          <a href="/">
            <LogoImage></LogoImage>
          </a>
        </button>
      </div>

      {/* ユーザ名入力 */}
      <input className="text-input"
        value={userName}
        onChange={(e) => setInputUserName(e.target.value)}
        type="text"
        placeholder=" ユーザ名"
        style={{ paddingRight: "100px" }}
      />

      {/* パスワード入力 */}
      <div>
        <input className="password-input"
          value={password}
          onChange={(e) => setInputPassword(e.target.value)}
          type={isRevealPassword ? 'text' : 'password'} // showPasswordがtrueならtype="text"（表示）
          placeholder="パスワード"
          style={{ paddingRight: "100px" }}
        />
        {/* <span
          onClick={togglePassword}
          role="presentation"
          className="PasswordReveal"
        >
          {isRevealPassword ? (
            <FaEye />
          ) : (
            <FaEyeSlash />
          )}
        </span> */}
      </div>

      {/* 送信 */}
      <div>
        <Post userName={userName} password={password} />
      </div>

      {/* サインアップへ */}
      <div className="toSignup">
        <a href="/" >
          ユーザ登録
        </a>
      </div>
    </div>
  );
}
