// src/hooks/useSpeech.js
import { useState, useEffect, useCallback, useRef } from "react";

// Di chuyển logic âm thanh ra ngoài để dễ quản lý
const sounds = {
  correct: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
  ),
  incorrect: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
  ),
  click: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3"
  ),
};
Object.values(sounds).forEach((s) => (s.volume = 0.5));

export const playSound = (soundName) => {
  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch((e) => console.error("Error playing sound:", e));
  }
};

export const useSpeech = () => {
  const voiceRef = useRef(null);

  const findVoice = useCallback(() => {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    const enUSVoice =
      voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang?.startsWith("en")) ||
      voices[0];
    voiceRef.current = enUSVoice || null;
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech Synthesis not supported.");
      return;
    }

    // Tải giọng nói ngay lập tức
    findVoice();

    // Nếu danh sách giọng nói thay đổi, tìm lại giọng nói tốt nhất
    window.speechSynthesis.onvoiceschanged = findVoice;

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [findVoice]);

  const speak = useCallback((text) => {
    if (!("speechSynthesis" in window) || !voiceRef.current) return;
    window.speechSynthesis.cancel(); // Dừng bất kỳ phát âm nào trước đó
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceRef.current;
    utterance.lang = voiceRef.current.lang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, []);

  const cancelSpeech = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, cancelSpeech };
};
