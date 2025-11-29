import React, { useState, useEffect } from "react";

const Captcha = ({ onChange, onGenerate }) => {
  const [captcha, setCaptcha] = useState("");

  // Generate random captcha text
  const generateCaptcha = () => {
    let text = "";
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setCaptcha(text);

    // ⭐ SEND generated captcha to Login.jsx
    onGenerate(text);

    // clear user input in Login.jsx
    onChange("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          letterSpacing: "3px",
          backgroundColor: "#fde7ef",
          padding: "10px",
          borderRadius: "6px",
          color: "#e91e63",
          display: "inline-block",
        }}
      >
        {captcha}
      </div>

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter verification code"
          onChange={(e) => onChange(e.target.value)}
          style={{
            padding: "0.8rem",
            borderRadius: "6px",
            border: "2px solid #90caf9",
            outline: "none",
            width: "100%",
            fontSize: "1rem",
          }}
        />

        <button
          onClick={generateCaptcha}
          type="button"
          style={{
            padding: "0.6rem 1rem",
            background: "#c7e91eac",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ↻
        </button>
      </div>
    </div>
  );
};

export default Captcha;
