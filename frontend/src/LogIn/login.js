import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";  // アイコンライブラリ（Font Awesome）
import Logo from "./image/logo.png";
import Pro from "./image/pro.png";
import Post from "./login_post.js";
import "./login.css";


function LogoImage() { //ロゴ画像
  return (
    <div className="login-logo-image">
      <img src={Logo} alt="Logo" />
    </div>);
}

function ProImage() { //職人画像
  return (
    <div className="login-pro-container">
      <img src={Pro} alt="Pro" className="login-pro-image" />
      <span className="login-pro-text">ログインしてや〜</span>
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
    <div className="login-page">
      {/* ロゴボタン */}
      <div className="login-logo-image">
        <button onClick={() => clickedToPageBtn('/')}>
          <LogoImage></LogoImage>
        </button>
      </div>

      {/* 職人画像 */}
      <div className="login-pro-image">
        <ProImage></ProImage>
      </div>

      {/* ユーザ名入力 */}
      <div>
        <input className="login-text-input"
          value={userName}
          onChange={(e) => setInputUserName(e.target.value)}
          type="text"
          placeholder=" ユーザ名"
        />
      </div>

      {/* パスワード入力 */}
      <div className="login-password-container">
        <input className="login-text-input"
          value={password}
          onChange={(e) => setInputPassword(e.target.value)}
          type={isRevealPassword ? 'text' : 'password'} // showPasswordがtrueならtype="text"（表示）
          placeholder="パスワード"
        />
        <span
          onClick={togglePassword}
          role="presentation"
          className="login-PasswordReveal"
        >
          {isRevealPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>


      {/* 送信 */}
      <div>
        <Post userName={userName} password={password} />
      </div>

      {/* サインアップへ */}
      <div className="login-toSignup">
        <a href="/"
          onClick={(e) => {
            e.preventDefault(); // デフォルトのリンク動作を防ぐ
            clickedToPageBtn('SignUp');
          }}
        >
          ユーザ登録
        </a>
      </div>
    </div>
  );
}
