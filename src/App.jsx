import { Routes, Route } from "react-router-dom";
import "./global.scss";
import Homepage from "./Pages/HomePage/Homepage";
function App() {
  const TechnicalError = () => {
    return (
      <h1 style={{ textAlign: "center", marginTop: "5rem" }}>
        Something went Wrong
      </h1>
    );
  };

  return (
    <Routes>
      <Route element={<Homepage />} path="/" />
      <Route element={<TechnicalError />} path="techincal-error" />
      <Route
        element={
          <p
            style={{
              marginTop: "6rem",
              textAlign: "center",
              fontSize: "3rem",
            }}
          >
            Page not found
          </p>
        }
        path="*"
      />
    </Routes>
  );
}

export default App;
