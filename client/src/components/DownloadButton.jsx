import React, { useState, useEffect, useRef } from "react";
import { download } from "../assets";

const DownloadButton = ({ downloadCanvasToImage, downloadDecalImage, snap }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  const openPicker = () => setIsPickerOpen(true);
  const closePicker = () => setIsPickerOpen(false);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        closePicker();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  return (
    <div>
      <button className="download-btn" onClick={openPicker}>
        <img
          src={download}
          alt="download_image"
          className="w-3/5 h-3/5 object-contain"
        />
      </button>

      {isPickerOpen && (
        <div ref={pickerRef} className="downloadpicker-container">
          <div className="flex-1 flex flex-col">
            <button
              className="mt-2 text-white text-xs truncate"
              onClick={() => {
                downloadCanvasToImage();
                closePicker();
              }}
            >
              Download T-shirt
            </button>
            <button
              className="mt-2 text-white text-xs truncate"
              onClick={() => {
                downloadDecalImage(snap.logoDecal);
                closePicker();
              }}
            >
              Download Logo
            </button>
            <button
              className="mt-2 text-white text-xs truncate"
              onClick={() => {
                downloadDecalImage(snap.fullDecal);
                closePicker();
              }}
            >
              Download Full Texture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;