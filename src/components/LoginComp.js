import React, { useEffect, useState, useRef } from "react";

const LoginComp = ({ loginUser, name, error }) => {
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && password) {
      loginUser(password);
    }
  };
  return (
    <div className="intro-area">
      <div>
        <h4 className="title">비밀번호를 입력해주세요:)</h4>
        <div className="info">반갑습니다. {name ? name + "님" : "고객님"}</div>
      </div>
      <div className="input-area">
        <span className={error ? "alarm" : "disable"}>
          {error ? error : "-"}
        </span>
        <br />
        <input
          ref={inputRef}
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={() => loginUser(password)}>확인</button>
      </div>
    </div>
  );
};

export default LoginComp;
