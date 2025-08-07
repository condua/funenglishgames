import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import VocabularyGame from "./pages/VocabularyGame";
import SentenceScrambleGame from "./pages/SentenceScrambleGame";
import ListeningGame from "./pages/ListeningGame";
import TypingGame from "./pages/TypingGame";
import GrammarGame from "./pages/GrammarGame";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vocabulary-game" element={<VocabularyGame />} />
        <Route path="/game2" element={<SentenceScrambleGame />} />
        <Route path="/listening-game" element={<ListeningGame />} />
        <Route path="/typing-game" element={<TypingGame />} />
        <Route path="/grammar-game" element={<GrammarGame />} />
        <Route
          path="/about"
          element={
            <div>
              <h2>About</h2>
              <p>This is the about page.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
