import { useState } from "react";
//import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./login.css";



function Post({ userName, password }) { //送信機能
  // const navigate = useNavigate();
  // const clickedToHomeBtn = () => {
  //   navigate('/');
  // };
  const handleSubmit = async () => {
    const data = { user_name: userName, password: password };

    axios.post("http://127.0.0.1:5000/login", data, { //ログイン
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log("成功:", response.data);
        //navigate('./')
      })
      .catch(err => {
        console.error("エラー:", err.response ? err.response.data : err.message);
      });
  };

  return ( //サインインボタン
    <div className="signin-button">
      <button id="signin" onClick={handleSubmit}>ログイン</button>
    </div>
  );
};

export default Post;



