import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Button from "./material/fortune.png";
import avatar from "./material/avatar.png";
import text from "./material/lucky.png";
import "./lucky_powder.css";

function FortuneButton({ fetchLuckyPowder }) {
  const handleClick = () => {
    alert('Button clicked!');
    fetchLuckyPowder();
  };

  return (
    <button className="button" onClick={handleClick}>
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
    <div className="logo-image">
      <img src={text} alt="text" />
    </div>
  );
}

export default function LuckyPowder() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchLuckyPowder = async () => {
    try {
      const response = await axios.get("http://localhost:5000/daily_lucky_powder");
      setData(response.data);
      navigate('/judge', { state: { data: response.data } });
    } catch (error) {
      console.error("Error fetching the lucky powder data:", error);
    }
  };

  useEffect(() => {
    // 初回レンダリング時にデータを取得したい場合はここで呼び出します
    // fetchLuckyPowder();
  }, []);

  return (
    <div className="container">
      <TextImage />
      <AvatarImage />
      <FortuneButton fetchLuckyPowder={fetchLuckyPowder} />
      {data && (
        <div className="result">
          <p>{data.caption}</p>
          <img src={data.image_path} alt="Lucky powder" />
        </div>
      )}
    </div>
  );
}
