import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/logout");
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded">
                ログアウト
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="text-lg font-bold mb-4">本当にログアウトしますか？</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                                はい
                            </button>
                            <button onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                                キャンセル
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogoutButton;
