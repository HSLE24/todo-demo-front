import React, { useState } from "react";

const IntroComp = ({ checkUser, error }) => {
  const [email, setEmail] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && email) {
      checkUser(email);
    }
  };
  return (
    <div className="intro-area">
      <div>
        <h4 className="title">이메일을 입력해주세요:)</h4>
        <div className="info">로그인 또는 회원가입에 필요합니다.</div>
      </div>
      <div className="input-area">
        <span className={error ? "alarm" : "disable"}>
          {error ? error : "-"}
        </span>
        <br />
        <input
          type="text"
          placeholder="welcome@todo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className={email ? "" : "disable"}
          onClick={() => {
            if (email) {
              checkUser(email);
            }
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default IntroComp;
