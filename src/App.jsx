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
import CultureCrosswalkGame from "./pages/CultureCrosswalkGame";
import SpellingApp from "./pages/SpellingApp";
import CodeSandbox from "./pages/CodeSandbox";
import DSAReviewPage from "./pages/dsaPages/DSAReviewPage";
import ReviewPage from "./pages/dsaPages/ReviewPage";
import VsatTestPage from "./pages/vsat/VsatTest";
import VsatCreatorPage from "./pages/vsat/VsatCreatorPage";
import WomenDayRosePage from "./pages/WomenDayRosePage";

// import FlashcardGame from "./pages/FlashcardGame";
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
        <Route path="/spelling-app" element={<SpellingApp />} />
        <Route
          path="/culture-crosswalk-game"
          element={<CultureCrosswalkGame />}
        />
        <Route
          path="/sentence-architect-game"
          element={<SentenceArchitectGame />}
        />
        {/* <Route path="/flashcard-game" element={<FlashcardGame />} /> */}
        <Route path="/code-sandbox" element={<CodeSandbox />} />
        {/* Add more routes as needed */}
        <Route path="/dsa-review" element={<DSAReviewPage />} />
        <Route path="/dsa-review-new" element={<ReviewPage />} />
        <Route path="/vsat-test" element={<VsatTestPage />} />
        <Route path="/vsat-creator" element={<VsatCreatorPage />} />
        <Route path="/women-day-rose" element={<WomenDayRosePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
