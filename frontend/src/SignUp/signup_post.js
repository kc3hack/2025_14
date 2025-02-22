import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./signup.css";
import { toast } from 'react-toastify';



function Post({ userName, password }) { //送信機能
  const navigate = useNavigate();
  const clickedToPageBtn = (pageName) => {
    navigate(pageName);
  };
  const handleSubmit = () => {
    console.log("送信ボタンが押されました！");

    if (!userName || !password) {
      toast.error("❌ ユーザ情報を入力してください", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
      return;
    }

    const data = { user_name: userName, password: password };
    console.log("送信データ:", data); // ✅ データを確認

    axios.post("http://127.0.0.1:5000/register", data, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        console.log("成功:", response.data); // ✅ ここが出るか？
        toast.success("🎉 ユーザ登録に成功しました", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        clickedToPageBtn('HomeScreen');
    })
    .catch(err => {
        console.error("エラー:", err.response ? err.response.data : err.message); // ✅ エラーの詳細
        toast.error("❌ すでに存在するユーザ名かパスワードです", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        clickedToPageBtn('SignUp');
    });
};


  return ( //ログインボタン
    <div className="sign-signin-button">
      <button id="signin" onClick={handleSubmit}>登録</button>
    </div>
  );
};

export default Post;



