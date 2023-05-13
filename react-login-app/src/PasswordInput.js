import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={props.className}>
      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          value={props.value}
          onChange={props.onChange}
          className="input-field"
        />
        <span className="password-toggle-icon" onClick={handlePasswordToggle}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
  );
}

export default PasswordInput;
