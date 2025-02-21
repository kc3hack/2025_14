import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";



function Post({ userName, password }) { //送信機能
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const clickedToPageBtn = (pageName) => {
    navigate(pageName);
  };

  const handleSubmit = () => {
    console.log("送信ボタンが押されました！");

    if (!userName || !password) {
      alert("ユーザ情報を入力してください");
      return;
    }

    const data = { user_name: userName, password: password };
    console.log("送信データ:", data); //データを確認

    axios.post("http://127.0.0.1:5000/login", data, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        console.log("成功:", response.data);
        alert("ログインに成功しました");
        clickedToPageBtn('HomeScreen');
      })
      .catch(err => {
        console.error("エラー:", err.response ? err.response.data : err.message); // ✅ エラーの詳細
        alert("ログインに失敗しました。ユーザ登録してください");
        clickedToPageBtn('SignUp');
      });
  };


  return ( //サインインボタン
    <div className="login-signin-button">
      <button id="signin" onClick={handleSubmit}>ログイン</button>
    </div>
  );
};

export default Post;



