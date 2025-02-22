import React from "react";
import Button from "./material/fortune.png";
import avatar from "./material/avatar.png";
import text from "./material/lucky.png";

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

export default function SignIn() {
  return (
    <div className="container">
      <TextImage />
      <AvatarImage />
      <FortuneButton />
    </div>
  );
}
