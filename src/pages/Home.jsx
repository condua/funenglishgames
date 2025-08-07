// src/App.jsx

import React from "react";

// Giả lập dữ liệu cho các trò chơi
const games = [
  {
    title: "Vocabulary Victor",
    description:
      "Mở rộng vốn từ vựng của bạn qua các câu đố hình ảnh vui nhộn.",
    imageUrl:
      "https://images.unsplash.com/photo-1593349480503-685d873b8f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Nzc0MTR8MHwxfHNlYXJjaHw0fHx2b2NhYnVsYXJ5JTIwZ2FtZXxlbnwwfHx8fDE3MjMwMjY0NTR8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    title: "Grammar Guardian",
    description:
      "Trở thành người hùng ngữ pháp bằng cách sửa lỗi trong các câu.",
    imageUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Nzc0MTR8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGJvb2tzfGVufDB8fHx8fDE3MjMwMjY1MzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    title: "Listening Legend",
    description: "Luyện kỹ năng nghe hiểu qua các đoạn hội thoại thực tế.",
    imageUrl:
      "https://images.unsplash.com/photo-1505664194779-8be62b6d3cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Nzc0MTR8MHwxfHNlYXJjaHwxfHxsaXN0ZW5pbmclMjBoZWFkcGhvbmVzfGVufDB8fHx8fDE3MjMwMjY1NjJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    title: "Pronunciation Pro",
    description: "Cải thiện phát âm với công nghệ nhận dạng giọng nói AI.",
    imageUrl:
      "https://images.unsplash.com/photo-1589999099234-a82f3de3513a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Nzc0MTR8MHwxfHNlYXJjaHwxfHxtaWNyb3Bob25lJTIwc291bmQlMjB3YXZlc3xlbnwwfHx8fDE3MjMwMjY1ODh8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

// Component Icon cho phần tính năng
const FeatureIcon = ({ children }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
    {children}
  </div>
);

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* ===== Thanh điều hướng (Navbar) ===== */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-teal-600">
              LingoPlay 🚀
            </a>
            <div className="hidden items-center space-x-6 md:flex">
              <a href="#" className="text-gray-600 hover:text-teal-500">
                Games
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-500">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-500">
                Pricing
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-teal-500">
                Login
              </a>
              <a
                href="#"
                className="rounded-full bg-teal-500 px-5 py-2 text-white shadow-lg hover:bg-teal-600 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Phần Hero Section ===== */}
      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Learn English The{" "}
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Fun Way
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Master vocabulary, grammar, and pronunciation through exciting games
          designed for all learning levels. Stop memorizing, start playing!
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="#"
            className="rounded-full bg-teal-500 px-8 py-3 text-lg font-semibold text-white shadow-xl hover:bg-teal-600 transition-all transform hover:scale-105"
          >
            Start Playing for Free
          </a>
        </div>
        <div className="mt-16">
          {/*  */}
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/kids-learning-online-5683933-4731295.png"
            alt="Kids learning English with games"
            className="mx-auto w-full max-w-3xl"
          />
        </div>
      </main>

      {/* ===== Phần Tính năng (Features) ===== */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why You'll Love LingoPlay</h2>
            <p className="mt-2 text-gray-500">
              The best way to make learning stick.
            </p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <FeatureIcon>🎮</FeatureIcon>
              </div>
              <h3 className="mt-4 text-xl font-semibold">Engaging Games</h3>
              <p className="mt-2 text-gray-500">
                Our games are so fun, you'll forget you're even studying.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <FeatureIcon>📈</FeatureIcon>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Track Your Progress
              </h3>
              <p className="mt-2 text-gray-500">
                Watch your skills grow with our detailed progress tracking.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <FeatureIcon>🌍</FeatureIcon>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Real-World Scenarios
              </h3>
              <p className="mt-2 text-gray-500">
                Learn practical language you can use in everyday conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Phần Game Showcase ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Explore Our Games</h2>
            <p className="mt-2 text-gray-500">
              Pick a skill and start your adventure.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {games.map((game, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2"
              >
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{game.title}</h3>
                  <p className="mt-2 text-gray-600">{game.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-800 py-12 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} LingoPlay. All rights reserved.
            Let the games begin!
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
