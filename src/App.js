import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
