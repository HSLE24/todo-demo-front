import React, { useEffect, useState, useRef } from "react";

const RegisterComp = ({ registerUser, error }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  const handleKeyPress = (event, nextInputRef) => {
    if (event.key === "Enter" && nextInputRef) {
      nextInputRef.current.focus();
    } else if (event.key === "Enter" && !nextInputRef && name && password) {
      registerUser(name, password);
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-area">
      <div>
        <h4 className="title">별명과 비밀번호를 입력해주세요</h4>
        <div className="info">1번만 입력하니 정확히 입력해주세요:)</div>
      </div>
      <div className="input-area">
        <div className={error ? "alarm" : "disable"}>{error ? error : "-"}</div>
        <div className="input-layer">
          <input
            ref={inputRef}
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(e) => handleKeyPress(e, inputRef2)}
          />
        </div>
        <div className="input-layer">
          <input
            ref={inputRef2}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(e) => handleKeyPress(e, null)}
          />
        </div>
        <input
          checked={showPassword}
          onChange={handleCheckboxChange}
          type="checkbox"
          id="pass"
        />
        <label for="pass">비밀번호 보기</label>
        <button onClick={() => registerUser(name, password)}>확인</button>
      </div>
    </div>
  );
};
export default RegisterComp;
