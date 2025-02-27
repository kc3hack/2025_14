import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./material/fortune.png";
import avatar from "./material/avatar.png";
import text from "./material/lucky.png";
import "./lucky_powder.css";

function FortuneButton({ fetchLuckyPowder, Movepage }) {
  const handleClick = () => {
    // alert('Button clicked!');
    Movepage("../judge");
    fetchLuckyPowder();
  };

  return (
    <button className="Button" onClick={handleClick}>
      <img src={Button} alt="Button" />
    </button>
  );
}

function AvatarImage() {
  return (
    <div className="logo-image">
      <img src={avatar} alt="avatar" />
    </div>
  );
}

function TextImage() {
  return (
    <div className="text-image">
      <img src={text} alt="text" />
    </div>
  );
}

function LuckyPowder() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchLuckyPowder = async () => {
    try {
      const response = await axios.get("http://localhost:5000/daily_lucky_powder");
      setData(response.data);
      navigate('../judge', { state: { data: response.data } });
    } catch (error) {
      console.error("Error fetching the lucky powder data:", error);
    }
  };

  const Movepage = (pageName) => {
    console.log(`${pageName} に移動します`);
    navigate(pageName);
  };

  useEffect(() => {
    // 初回レンダリング時にデータを取得したい場合はここで呼び出します
    // fetchLuckyPowder();
  }, []);

  /* 画面遷移 */
  const movePage = (pageName) => {
    navigate(pageName);
  };

  return (
    <div className="container">
      <TextImage />
      <AvatarImage />
      <FortuneButton fetchLuckyPowder={fetchLuckyPowder} Movepage={Movepage} />
      <div className="group2">
        <button
          className="To-homescreen-icon-a"
          onClick={() => {
            console.log("ホームへ移動");
            movePage("/");
          }}
          aria-label="ホームへ移動"
        ></button>
      </div>
      {data && (
        <div className="result">
          <p>{data.caption}</p>
          <img src={data.image_path} alt="Lucky powder" />
        </div>
      )}
    </div>
  );
}

export default LuckyPowder;
