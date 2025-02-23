import React from "react";
import Button from "./material/home_button.png";
import avatar from "./material/avatar.png";
import text from "./material/text.png";
import picture from "./material/ex_picture.png";
import bubble from "./material/bubble.png";
import "./lucky_powder_judge.css";

function FortuneButton() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <button className="button" onClick={handleClick}>
      <img src={Button} alt="Button" />
    </button>
  );
}

function AvatarImage() {
  return (
    <div className="avatar-image">
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

function PictureImage() {
  return (
    <div className="picture-image">
      <img src={picture} alt="picture" />
    </div>
  );
}

function BubbleImage() {
  return (
    <div className="bubble-image">
      <img src={bubble} alt="bubble" />
    </div>
  );
}

export default function SignIn() {
  return (
    <div className="container">
      <TextImage />
      <PictureImage />
      <BubbleImage />
      <AvatarImage />
      <FortuneButton />
    </div>
  );
}
