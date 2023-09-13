import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<Quiz />} path='/quiz'></Route>
        <Route element={<Results />} path='/results'></Route>
      </Routes>
    </Router>
  );
}

export default App;
