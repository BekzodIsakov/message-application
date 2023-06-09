import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path='signin' element={<Signin />} />
        <Route
          path='*'
          element={
            <h2 className='text-center'>
              Page you are looking does not exist: 404
            </h2>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
