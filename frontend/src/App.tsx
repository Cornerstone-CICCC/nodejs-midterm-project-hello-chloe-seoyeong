import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Home from "./Routes/Home";
import Join from "./Routes/Join";
import Profile from "./Routes/Profile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="join" element={<Join />}>
          <Route path="signup" element={<Register />} />
          <Route index path="login" element={<Login />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
