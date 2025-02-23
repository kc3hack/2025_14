import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "./login.css";

function Post({ userName, password }) {
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

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: "include"
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw err; });
      }
      return response.json();
    })
    .then(responseData => {
        console.log("成功:", responseData);
        toast.success(" ログイン成功", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        // fetch("http://127.0.0.1:5000/check-session", {
        //   credentials: "include"
        // })
        // .then(response => {
        //   if (!response.ok) {
        //     return response.json().then(err => { throw err; });
        //   }
        //   return response.json();
        // })
        // .then(responseData => {
        //   console.log("ログイン確認結果:", responseData);
        // })
        // .catch(error => {
        //   console.error("ログイン確認エラー:", error);
        // });
        clickedToPageBtn("/");
    })
    .catch(err => {
        console.error("エラー:", err.error || err.message || "ログイン失敗");
        toast.error("❌ ログイン失敗", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
    });
  };

  return (
    <div className="login-signin-button">
      <button id="signin" onClick={handleSubmit}>ログイン</button>
    </div>
  );
};

export default Post;
