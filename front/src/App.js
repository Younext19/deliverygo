import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./screens/components/Sidebar/Sidebar";
import Delivery from "./screens/Delivery/Delivery";
import Users from "./screens/Users/Users";
import Tours from "./screens/Tours/Tours";
function App() {
  return (
    <div className="appContainer">
      <Sidebar />

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/tournees" element={<Tours />} />
        <Route path="/courses" element={<Delivery />} />
      </Routes>
    </div>
  );
}

export default App;
