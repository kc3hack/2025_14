import React from "react";
import Button from "./material/Button.png";
import Background from "./material/background.png";
import avatar from "./material/3davatars.png";
import fortune from "./material/daily_lucky_powder.png";
import "./signin.css"

function SingInButtonImage() {
  return <img src={Button} alt="Button" />;
}

function LogoImage() {
  return (
    <div className="logo-image">
      <img src={Background} alt="Logo" />
    </div>);
}

export default function SignIn() {
  return (
    <div>
      <div>
        <LogoImage></LogoImage>
      </div>

      <div>
        <SingInButtonImage></SingInButtonImage>
      </div>
      <div className="text-center mt-32">
        <a href="/" className="[font-family:'Yuji_Mai-Regular',Helvetica] text-[45.3px] leading-[68px] text-[#04abff] underline">
          サインアップ
        </a>
      </div>
    </div>
  );
}
