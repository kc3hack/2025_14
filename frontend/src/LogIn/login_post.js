import { createCookieSessionStorage, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import "./login.css";

function Post({ userName, password }) {
  const navigate = useNavigate();

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
        Cookies.set("user_id", responseData.user_id, { expires: 1, path: '/' });

        console.log("Cookie に保存された user_id:", Cookies.get("user_id"));
        console.log("成功:", responseData);
        toast.success(" ログイン成功", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        clickedToPageBtn('/');
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

    fetch("http://127.0.0.1:5000/check-session", {
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json().then(err => { throw err; });
          } else {
            throw new Error("サーバーからJSON以外のレスポンスが返されました");
          }
        }
        return response.json();
      })
      .then(responseData => {
        console.log("ログイン確認結果:", responseData);
      })
      .catch(error => {
        console.error("ログイン確認エラー:", error);
      });
  };

  return (
    <div className="login-signin-button">
      <button id="signin" onClick={handleSubmit}>ログイン</button>
    </div>
  );
};

export default Post;
