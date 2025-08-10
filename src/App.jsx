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
import MatchingGame from "./pages/MatchingGame";
import WordfallGame from "./pages/WordfallGame";
import GalaxyGrammarGame from "./pages/GalaxyGrammarGame";
import DetectiveGame from "./pages/DetectiveGame";
import EnglishWordSprint from "./pages/EnglishWordSprint";
import MillionaireGame from "./pages/MillionaireGame ";
import SentenceArchitectGame from "./pages/SentenceArchitectGame";

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
        <Route path="/matching-game" element={<MatchingGame />} />
        <Route path="/wordfall-game" element={<WordfallGame />} />
        <Route path="/galaxy-grammar-game" element={<GalaxyGrammarGame />} />
        <Route path="/detective-game" element={<DetectiveGame />} />
        <Route path="/english-word-sprint" element={<EnglishWordSprint />} />
        <Route path="/millionaire-game" element={<MillionaireGame />} />
        <Route
          path="/sentence-architect-game"
          element={<SentenceArchitectGame />}
        />

        {/* Additional routes for other pages */}
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
