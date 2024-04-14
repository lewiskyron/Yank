import "./App.css";
import "./index.css"; // Adjust the path according to your project structure
import PageSnapshotComponent from "./components/Menu/PageSnapshot";
import LoginForm from "./components/auth/login";
// import { supabase } from "./utils/supabase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageSnapshotComponent />}></Route>
          <Route path="/auth" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
