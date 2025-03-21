import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import MyList from "./Routes/MyList";
import ReviewForm from "./Routes/ReviewForm";
import PrivateRoute from "./Routes/PrivateRoute";

function RoutesComp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="join" element={<Join />} />
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="review" element={<MyList />} />
        <Route path="review/create" element={<ReviewForm />} />
      </Route>
    </Routes>
  );
}
export default RoutesComp;
