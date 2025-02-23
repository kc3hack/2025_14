import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "./image/logo.png";
import Pro from "./image/pro.png";
import "./logout.css";

function LogoImage() { //ロゴ画像
    return (
        <div className="login-logo-image">
            <img src={Logo} alt="Logo" />
        </div>);
}

function ProImage() { //職人画像
    return (
        <div className="login-pro-container">
            <img src={Pro} alt="Pro" className="login-pro-image" />
            <span className="login-pro-text">また遊びに来てな！</span>
        </div>);
}

export default function Logout() {
    const navigate = useNavigate(); //ナビゲートを使う
    const clickedToPageBtn = (pageName) => { //画面遷移の機能
        navigate(pageName);
    };
    return (
        <div className="logout-page">
            {/* ロゴボタン */}
            <div className="logout-logo-image">
                <button onClick={() => clickedToPageBtn('HomeScreen')}>
                    <LogoImage></LogoImage>
                </button>
            </div>

            {/* 職人画像 */}
            <div className="login-pro-image">
                <ProImage></ProImage>
            </div>

        </div>
    )
};
