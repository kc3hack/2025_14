import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";  // アイコンライブラリ（Font Awesome）
import Logo from "./image/logo.png";
import Pro from "./image/pro.png";
import Post from "./signup_post.js";
import "./signup.css";


function LogoImage() { //ロゴ画像
  return (
    <div className="sign-logo-image">
      <img src={Logo} alt="Logo" />
    </div>);
}

function ProImage() { //職人画像
  return (
    <div className="sign-pro-container">
      <img src={Pro} alt="Pro" className="sign-pro-image" />
      <span className="sign-pro-text">登録してや〜</span>
    </div>);
}


export default function SignIn() {
  const [userName, setInputUserName] = useState(""); //テキストボックス内のユーザ名
  const [password, setInputPassword] = useState(""); //テキストボックス内のパスワード
  const [isRevealPassword, setIsRevealPassword] = useState(false); //伏せ字
  const navigate = useNavigate(); //ナビゲートを使う
  const clickedToPageBtn = (pageName) => { //画面遷移の機能
    navigate(pageName);
  };

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);  // パスワード表示/非表示の切り替え
  };

  return (
    <div className="sign-page">
      {/* ロゴボタン */}
      <div className="sign-logo-image">
        <button onClick={() => clickedToPageBtn('/')}>
          <LogoImage></LogoImage>
        </button>
      </div>

      {/* 職人画像 */}
      <div className="sign-pro-image">
        <ProImage></ProImage>
      </div>

      {/* ユーザ名入力 */}
      <div>
        <input className="sign-text-input"
          value={userName}
          onChange={(e) => setInputUserName(e.target.value)}
          type="text"
          placeholder=" ユーザ名"
        />
      </div>

      {/* パスワード入力 */}
      <div className="sign-password-container">
        <input className="sign-text-input"
          value={password}
          onChange={(e) => setInputPassword(e.target.value)}
          type={isRevealPassword ? 'text' : 'password'} // showPasswordがtrueならtype="text"（表示）
          placeholder="パスワード"
        />
        <span
          onClick={togglePassword}
          role="presentation"
          className="sign-PasswordReveal"
        >
          {isRevealPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      {/* 送信 */}
      <div>
        <Post userName={userName} password={password} />
      </div>

      {/* ログインへ */}
      <div className="sign-toSignup">
        <a href="/"
          onClick={(e) => {
            e.preventDefault(); // デフォルトのリンク動作を防ぐ
            clickedToPageBtn('../Login');
          }}
        >
          ログイン
        </a>
      </div>
    </div>
  );
}
