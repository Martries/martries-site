import { useEffect, useRef, useState } from "react";
import qrcode from "qrcode-generator";

const CELL = 8; // px per QR module
const QUIET_ZONE = 4; // modules of white margin around the code

export default function QRCodeCanvas({ url }) {
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();

    const count = qr.getModuleCount();
    const size = (count + QUIET_ZONE * 2) * CELL;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#0F2347";
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qr.isDark(row, col)) {
          ctx.fillRect((col + QUIET_ZONE) * CELL, (row + QUIET_ZONE) * CELL, CELL, CELL);
        }
      }
    }
    setDownloadUrl(canvas.toDataURL("image/png"));
  }, [url]);

  return (
    <div className="qr-box">
      <canvas ref={canvasRef} className="qr-canvas" role="img" aria-label={`QR code linking to ${url}`} />
      {downloadUrl && (
        <a href={downloadUrl} download="muktar-owolabi-qr.png" className="btn btn-outline btn-sm">
          Download QR
        </a>
      )}
    </div>
  );
}
