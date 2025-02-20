import React, { useState } from "react";
import QRCode from "qrcode";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState("");

  const handleGenerateQR = async () => {
    if (url.trim() !== "") {
      try {
        const qrDataUrl = await QRCode.toDataURL(url);
        setQrImage(qrDataUrl);
      } catch (err) {
        console.error("Error generating QR Code:", err);
      }
    }
  };

  const handleDownloadQR = () => {
    if (qrImage) {
      const link = document.createElement("a");
      link.href = qrImage;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="generate-btn" onClick={handleGenerateQR}>
          Generate QR Code
        </button>

        {qrImage && (
          <div className="qr-container">
            <img src={qrImage} alt="Generated QR Code" />
            <button className="download-btn" onClick={handleDownloadQR}>
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
