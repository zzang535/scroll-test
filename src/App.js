import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Scroll from "./components/Scroll";
import Scroll2 from "./components/Scroll2";
import Scroll3 from "./components/Scroll3";

import "./assets/tailwind.css";

function App() {
  return (
    <Router>
      <div className="bg-gray-300 p-4">
        {/* <div>
          <Link to="/scroll">[TEST - 3D 두루마리 && 이미지 3차원 이동]</Link>
        </div> */}
        <div>
          <Link to="/scroll2">[TEST - 박스 2차원 이동]</Link>
        </div>
        <div>
          <Link to="/scroll3">[TEST - 3D 두루마리]</Link>
        </div>
      </div>
      <Routes>
        <Route path="/scroll" element={<Scroll />}></Route>
        <Route path="/scroll2" element={<Scroll2 />}></Route>
        <Route path="/scroll3" element={<Scroll3 />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
