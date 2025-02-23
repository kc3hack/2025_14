  // データを送る
  const sendData = (data) => {
    console.log(data);
    if (data instanceof File) {
      // 単一のファイルの場合
      console.log("ファイルを送信します");
      const formData = new FormData();
      formData.append("file", data); // ファイルを 'file' という名前で追加
      axios.post("http://127.0.0.1:5000/process", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type は multipart/form-data に設定
        },
      })
        .then((response) => {
          setResponseData(response.data);
          console.log("File Upload Response:", response.data);
          movePageToBringData("../OutputScreen", response.data, data);
        })
        .catch((error) => {
          console.error("File Upload Error:", error);
        });
    } else {
      console.log("テキストを送信します");
      // テキストを送る場合
      axios.post("http://127.0.0.1:5000/process", { text: data }, {
        headers: {
          "Content-Type": "application/json", // JSONとして送ることを明示
        },
      })
        .then((response) => {
          setResponseData(response.data);
          console.log("Text Processing Response:", response.data);
          movePageToBringData("OutputScreen", response.data, null);
        })
        .catch((error) => {
          console.error("Text Processing Error:", error);
        });
    }
  };
