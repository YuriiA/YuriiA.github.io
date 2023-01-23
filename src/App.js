import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { Home } from "./components/Home/Home";
import { Weather } from "./components/Weather/Weather";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route
            path="*"
            element={
              <>
                <h1>404 Page not found</h1>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
