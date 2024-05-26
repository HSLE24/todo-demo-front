import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import TodoPage from "./pages/TodoPage";
import IntroPage from "./pages/IntroPage";
import PrivateRoute from "./route/PrivateRoute";

import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage user={user} setUser={setUser} />
          </PrivateRoute>
        }
      />
      <Route
        path="/intro"
        element={<IntroPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
