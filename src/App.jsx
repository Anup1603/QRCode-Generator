import React, { useState } from "react";
import QRCode from "qrcode";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [error, setError] = useState("");

  const handleGenerateQR = async (e) => {
    e.preventDefault();

    if (url.trim() === "") {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const qrDataUrl = await QRCode.toDataURL(url);
      setQrImage(qrDataUrl);
      setError("");
    } catch (err) {
      console.error("Error generating QR Code:", err);
      setError("Failed to generate QR Code. Please try again.");
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
        <p className="subtitle">Create custom QR codes in seconds!</p>

        <form onSubmit={handleGenerateQR}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={error ? "input-error" : ""}
          />
          {error && <p className="error-message">{error}</p>}

          <button className="generate-btn">Generate QR Code</button>
        </form>

        {/* QR Code Display */}
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
