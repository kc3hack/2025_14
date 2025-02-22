import { useEffect, useState } from "react";
import axios from "axios";
import "./detail.css"

export default function Detail() {
    const [detail_data, setData] = useState({ image_path: "", caption: "", tag: "" });

    useEffect(() => {
        axios.get("http://localhost:5000/collection/get")
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error fetching text:", error));
    }, []);

    return (
        <div className="detail-page">
            <div className="detail-image">
                <img src={detail_data.image_path} alt="Detail" />
            </div>

            <div className="detail-text">
                <div className="detail-tag">
                <p>{detail_data.tag}</p>
                <h1>{detail_data.caption}</h1>
                </div>
            </div>

        </div>
    );
}
