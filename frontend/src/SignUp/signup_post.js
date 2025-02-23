import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./signup.css";



function Post({ userName, password }) { //送信機能
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
    console.log("送信データ:", data); // ✅ データを確認

    axios.post("https://backend-backend-latest.onrender.com/register", data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    .then(response => {
        console.log("成功:", response.data); // ✅ ここが出るか？
        alert("ユーザ登録に成功しました");
        clickedToPageBtn('/');
    })
    .catch(err => {
        console.error("エラー:", err.response ? err.response.data : err.message); // ✅ エラーの詳細
        alert("すでに存在するユーザ名かパスワードです");
        clickedToPageBtn('../SignUp');
    });
};


  return ( //ログインボタン
    <div className="sign-signin-button">
      <button id="signin" onClick={handleSubmit}>登録</button>
    </div>
  );
};

export default Post;



