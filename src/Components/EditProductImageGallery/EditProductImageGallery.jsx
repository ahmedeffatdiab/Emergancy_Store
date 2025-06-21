import React, { useState } from "react";

function EditProductImageGallery({ imageUrls, onImageReplace }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  // Selects image and resets preview.
  const handleImageClick = (url, index) => {
    setSelectedImage(url);
    setSelectedIndex(index);
    setPreviewUrl(null);
  };
  // Updates preview and replaces image.
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newUrl = URL.createObjectURL(file);
    setPreviewUrl(newUrl);

    // Optional: Call parent handler to store new file
    if (onImageReplace) onImageReplace(file, selectedIndex);
  };
  // Closes modal and resets selection.
  const closeModal = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setSelectedIndex(null);
  };
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {imageUrls?.map((ele, index) => (
          <img
            key={index}
            style={{ width: "100px", cursor: "pointer" }}
            src={ele}
            alt={`product-img-${index}`}
            onClick={() => handleImageClick(ele, index)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 999999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative", textAlign: "center" }}>
            <img
              src={previewUrl || selectedImage}
              alt="Selected"
              style={{
                width: "400px",
                maxWidth: "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div style={{ marginTop: "10px" }}>
              <button onClick={closeModal} style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProductImageGallery;
