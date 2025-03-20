import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Login from "./Routes/Login";
import Home from "./Routes/Home";
import Join from "./Routes/Join";
import Profile from "./Routes/Profile";
import MyList from "./Routes/MyList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="join" element={<Join />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="review" element={<MyList />} />
      </Routes>
    </Router>
  );
}

export default App;
