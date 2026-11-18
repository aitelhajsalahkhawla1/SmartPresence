
import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QrCode, Camera, CheckCircle } from "lucide-react";

export default function Scanner() {
  const [result, setResult] = useState("");
  const [scanning, setScanning] = useState(false);

  const startScanner = () => {
    setResult("");
    setScanning(true);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      scanner.render(
        (decodedText) => {
          setResult(decodedText);
          scanner.clear();
          setScanning(false);
        },
        () => {}
      );
    }, 100);
  };

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>Scanner QR Code</h1>
          <p>Scanner le QR Code pour enregistrer la présence</p>
        </div>
      </div>

      <div className="students-card scanner-card">
        <div className="scanner-icon">
          <QrCode size={40} />
        </div>

        <h2>Scanner un étudiant</h2>

        <p>
          Placez le QR Code de l'étudiant devant la caméra.
        </p>

        <div id="reader"></div>

        {!scanning && (
          <button className="add-button" onClick={startScanner}>
            <Camera size={18} />
            Démarrer le scanner
          </button>
        )}

        {result && (
          <div className="scan-result">
            <CheckCircle size={22} />
            <div>
              <strong>QR Code détecté !</strong>
              <p>{result}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
