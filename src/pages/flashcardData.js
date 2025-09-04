// src/flashcardData.js
// Dữ liệu mẫu cho các bộ thẻ flashcard

export const decks = [
  {
    topic: "Common Verbs",
    slug: "common-verbs",
    cards: [
      {
        id: "v1",
        word: "Communicate",
        ipa: "/kəˈmjuːnɪkeɪt/",
        type: "verb",
        meaning: "Giao tiếp",
        example: "It's important to communicate your feelings clearly.",
      },
      {
        id: "v2",
        word: "Develop",
        ipa: "/dɪˈveləp/",
        type: "verb",
        meaning: "Phát triển",
        example: "They are developing a new software for the project.",
      },
      {
        id: "v3",
        word: "Achieve",
        ipa: "/əˈtʃiːv/",
        type: "verb",
        meaning: "Đạt được",
        example: "With hard work, you can achieve your goals.",
      },
      {
        id: "v4",
        word: "Consider",
        ipa: "/kənˈsɪdər/",
        type: "verb",
        meaning: "Cân nhắc, xem xét",
        example:
          "You should consider all the options before making a decision.",
      },
      {
        id: "v5",
        word: "Improve",
        ipa: "/ɪmˈpruːv/",
        type: "verb",
        meaning: "Cải thiện",
        example: "I need to improve my public speaking skills.",
      },
    ],
  },
  {
    topic: "Technology",
    slug: "technology",
    cards: [
      {
        id: "t1",
        word: "Algorithm",
        ipa: "/ˈælɡərɪðəm/",
        type: "noun",
        meaning: "Thuật toán",
        example: "Search engines use a complex algorithm to rank pages.",
      },
      {
        id: "t2",
        word: "Innovation",
        ipa: "/ˌɪnəˈveɪʃn/",
        type: "noun",
        meaning: "Sự đổi mới",
        example: "The company is known for its constant innovation.",
      },
      {
        id: "t3",
        word: "Artificial",
        ipa: "/ˌɑːtɪˈfɪʃl/",
        type: "adjective",
        meaning: "Nhân tạo",
        example: "Artificial intelligence is changing the world rapidly.",
      },
    ],
  },
];
