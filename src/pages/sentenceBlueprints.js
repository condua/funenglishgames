// src/sentenceBlueprints.js

export const sentenceBlueprints = [
  {
    level: 1,
    title: "Simple Sentence",
    formula: "[Subject] + [Verb] + [Object/Complement]",
    explanation: "Câu đơn chỉ có một mệnh đề độc lập, diễn tả một ý trọn vẹn.",
    puzzles: [
      {
        blocks: ["the cat", "on the mat", "is sleeping"],
        correctOrder: ["the cat", "is sleeping", "on the mat"],
        meaning: "Con mèo đang ngủ trên tấm thảm.",
      },
      {
        blocks: ["a delicious meal", "for her family", "She cooked"],
        correctOrder: ["She cooked", "a delicious meal", "for her family"],
        meaning: "Cô ấy nấu một bữa ăn ngon cho gia đình.",
      },
    ],
  },
  {
    level: 2,
    title: "Compound Sentence",
    formula: "[Clause 1] , [Conjunction] [Clause 2]",
    explanation:
      "Câu ghép nối hai mệnh đề độc lập bằng một liên từ (for, and, nor, but, or, yet, so).",
    puzzles: [
      {
        blocks: ["but", "I wanted to go to the party", "I was too tired"],
        correctOrder: ["I wanted to go to the party", "but", "I was too tired"],
        meaning: "Tôi muốn đi dự tiệc nhưng tôi quá mệt.",
      },
      {
        blocks: [
          "so",
          "he studied hard for the exam",
          "He wanted a good grade",
        ],
        correctOrder: [
          "He wanted a good grade",
          "so",
          "he studied hard for the exam",
        ],
        meaning: "Cậu ấy muốn điểm tốt nên đã học chăm cho kỳ thi.",
      },
    ],
  },
  {
    level: 3,
    title: "Complex Sentence",
    formula: "[Independent Clause] + [Dependent Clause]",
    explanation:
      "Câu phức chứa một mệnh đề độc lập và ít nhất một mệnh đề phụ thuộc (bắt đầu bằng because, while, after, although...).",
    puzzles: [
      {
        blocks: ["Although it was raining", "we went for a walk"],
        correctOrder: ["Although it was raining", "we went for a walk"],
        meaning: "Mặc dù trời đang mưa, chúng tôi vẫn đi dạo.",
      },
      {
        blocks: ["because she missed the bus", "The student was late"],
        correctOrder: ["The student was late", "because she missed the bus"],
        meaning: "Cô học sinh đến muộn vì lỡ chuyến xe buýt.",
      },
    ],
  },

  // --- NEW BLUEPRINTS WITH MEANINGS ---

  {
    level: 4,
    title: "Simple Negative",
    formula: "[Subject] + do/does/did + not + [Base Verb] (+ …)",
    explanation:
      "Phủ định ở thì đơn dùng trợ động từ (do/does/did) + not + động từ nguyên mẫu.",
    puzzles: [
      {
        blocks: ["do not", "They", "like spicy food"],
        correctOrder: ["They", "do not", "like spicy food"],
        meaning: "Họ không thích đồ ăn cay.",
      },
      {
        blocks: ["Does not", "on Sundays", "She", "work"],
        correctOrder: ["She", "Does not", "work", "on Sundays"],
        meaning: "Cô ấy không làm việc vào Chủ nhật.",
      },
    ],
  },
  {
    level: 5,
    title: "Yes/No Question (Simple)",
    formula: "Do/Does/Did + [Subject] + [Base Verb] (+ …) ?",
    explanation: "Câu hỏi Yes/No ở thì đơn đảo trợ động từ lên đầu câu.",
    puzzles: [
      {
        blocks: ["Do", "you", "need any help?"],
        correctOrder: ["Do", "you", "need any help?"],
        meaning: "Bạn có cần giúp gì không?",
      },
      {
        blocks: ["Did", "he", "finish the report?"],
        correctOrder: ["Did", "he", "finish the report?"],
        meaning: "Anh ấy đã hoàn thành báo cáo chưa?",
      },
    ],
  },
  {
    level: 6,
    title: "Compound with Conjunctive Adverb",
    formula: "[Clause 1] ; [Conjunctive Adverb] , [Clause 2]",
    explanation:
      "Dùng trạng từ liên kết (however, therefore, moreover, meanwhile, otherwise...) giữa hai mệnh đề độc lập.",
    puzzles: [
      {
        blocks: ["I trained hard", "however", "I didn’t win the race"],
        correctOrder: ["I trained hard", "however", "I didn’t win the race"],
        meaning:
          "Tôi đã luyện tập chăm chỉ, tuy nhiên tôi không thắng cuộc đua.",
      },
      {
        blocks: [
          "She forgot the keys",
          "therefore",
          "she couldn’t enter the house",
        ],
        correctOrder: [
          "She forgot the keys",
          "therefore",
          "she couldn’t enter the house",
        ],
        meaning: "Cô ấy quên chìa khóa, do đó không thể vào nhà.",
      },
    ],
  },
  {
    level: 7,
    title: "Passive Voice (Simple Tenses)",
    formula: "[Subject] + be + V3/ed (+ by + Agent)",
    explanation:
      "Câu bị động nhấn mạnh đối tượng chịu tác động của hành động, cấu trúc: be + quá khứ phân từ.",
    puzzles: [
      {
        blocks: ["by the committee", "The plan", "was approved"],
        correctOrder: ["The plan", "was approved", "by the committee"],
        meaning: "Kế hoạch đã được ủy ban phê duyệt.",
      },
      {
        blocks: ["is cleaned", "every day", "The classroom"],
        correctOrder: ["The classroom", "is cleaned", "every day"],
        meaning: "Lớp học được dọn vệ sinh mỗi ngày.",
      },
    ],
  },
  {
    level: 8,
    title: "Present Perfect (since/for)",
    formula: "[Subject] + have/has + V3/ed + (since/for + time)",
    explanation:
      "Thì hiện tại hoàn thành diễn tả hành động kéo dài đến hiện tại, dùng since (mốc) / for (khoảng).",
    puzzles: [
      {
        blocks: ["for three years", "has lived", "She", "in Hanoi"],
        correctOrder: ["She", "has lived", "in Hanoi", "for three years"],
        meaning: "Cô ấy đã sống ở Hà Nội được ba năm.",
      },
      {
        blocks: ["since 2020", "have known", "I", "her"],
        correctOrder: ["I", "have known", "her", "since 2020"],
        meaning: "Tôi đã quen cô ấy từ năm 2020.",
      },
    ],
  },
  {
    level: 9,
    title: "Modal Verbs (advice/necessity/ability)",
    formula: "[Subject] + can/should/must + [Base Verb] (+ …)",
    explanation:
      "Động từ khuyết thiếu diễn tả khả năng, lời khuyên, bắt buộc: can/should/must…",
    puzzles: [
      {
        blocks: ["should", "You", "save your work frequently"],
        correctOrder: ["You", "should", "save your work frequently"],
        meaning: "Bạn nên lưu công việc thường xuyên.",
      },
      {
        blocks: ["must", "during the exam", "Students", "keep silent"],
        correctOrder: ["Students", "must", "keep silent", "during the exam"],
        meaning: "Học sinh phải giữ im lặng trong kỳ thi.",
      },
    ],
  },
  {
    level: 10,
    title: "Gerund as Subject/Object",
    formula: "V-ing (as Subject) … / [Verb] + V-ing (as Object)",
    explanation:
      "Danh động từ (V-ing) có thể làm chủ ngữ hoặc tân ngữ của động từ/giới từ.",
    puzzles: [
      {
        blocks: ["Reading books", "helps", "me relax"],
        correctOrder: ["Reading books", "helps", "me relax"],
        meaning: "Đọc sách giúp tôi thư giãn.",
      },
      {
        blocks: ["enjoys", "He", "playing chess", "at weekends"],
        correctOrder: ["He", "enjoys", "playing chess", "at weekends"],
        meaning: "Cậu ấy thích chơi cờ vào cuối tuần.",
      },
    ],
  },
  {
    level: 11,
    title: "Infinitive of Purpose",
    formula: "[Subject] + [Verb] + to + [Base Verb] (+ …)",
    explanation: "Dùng to-V để nêu mục đích.",
    puzzles: [
      {
        blocks: ["to buy some fruit", "I went to the market"],
        correctOrder: ["I went to the market", "to buy some fruit"],
        meaning: "Tôi đi chợ để mua một ít trái cây.",
      },
      {
        blocks: ["to improve her English", "She practices daily"],
        correctOrder: ["She practices daily", "to improve her English"],
        meaning: "Cô ấy luyện tập hằng ngày để cải thiện tiếng Anh.",
      },
    ],
  },
  {
    level: 12,
    title: "Comparatives and Superlatives",
    formula: "[Adj/Adv]-er + than / the + [Adj/Adv]-est",
    explanation:
      "So sánh hơn và so sánh nhất để so sánh hai hay nhiều đối tượng.",
    puzzles: [
      {
        blocks: ["than", "is", "This problem", "easier", "the last one"],
        correctOrder: ["This problem", "is", "easier", "than", "the last one"],
        meaning: "Bài này dễ hơn bài trước.",
      },
      {
        blocks: ["the tallest", "in the class", "Lan", "is"],
        correctOrder: ["Lan", "is", "the tallest", "in the class"],
        meaning: "Lan là người cao nhất lớp.",
      },
    ],
  },
  {
    level: 13,
    title: "Conditional Type 1 (Real Present/Future)",
    formula: "If + [Present Simple], [S + will/can + Base Verb]",
    explanation:
      "Diễn tả điều kiện có thật ở hiện tại/tương lai và kết quả có khả năng xảy ra.",
    puzzles: [
      {
        blocks: ["you will get wet", "If it rains"],
        correctOrder: ["If it rains", "you will get wet"],
        meaning: "Nếu trời mưa, bạn sẽ bị ướt.",
      },
      {
        blocks: ["I will call you", "finish early", "If I"],
        correctOrder: ["If I", "finish early", "I will call you"],
        meaning: "Nếu tôi xong sớm, tôi sẽ gọi bạn.",
      },
    ],
  },
  {
    level: 14,
    title: "Conditional Type 2 (Unreal Present)",
    formula: "If + [Past Simple], [S + would/could + Base Verb]",
    explanation: "Giả định trái với hiện tại; kết quả khó/không thể xảy ra.",
    puzzles: [
      {
        blocks: ["I would travel the world", "If I were rich"],
        correctOrder: ["If I were rich", "I would travel the world"],
        meaning: "Nếu tôi giàu, tôi sẽ đi du lịch khắp thế giới.",
      },
      {
        blocks: ["If he knew the answer", "he could help us"],
        correctOrder: ["If he knew the answer", "he could help us"],
        meaning: "Nếu anh ấy biết câu trả lời, anh ấy có thể giúp chúng ta.",
      },
    ],
  },
  {
    level: 15,
    title: "Conditional Type 3 (Unreal Past)",
    formula: "If + had + V3/ed, [S + would/could have + V3/ed]",
    explanation: "Giả định trái với quá khứ; hối tiếc về điều không xảy ra.",
    puzzles: [
      {
        blocks: ["If she had left earlier", "she would have caught the bus"],
        correctOrder: [
          "If she had left earlier",
          "she would have caught the bus",
        ],
        meaning: "Nếu cô ấy rời đi sớm hơn, cô ấy đã bắt kịp xe buýt.",
      },
      {
        blocks: ["we could have finished on time", "If we had started sooner"],
        correctOrder: [
          "If we had started sooner",
          "we could have finished on time",
        ],
        meaning:
          "Nếu chúng tôi bắt đầu sớm hơn, chúng tôi đã có thể hoàn thành đúng giờ.",
      },
    ],
  },
  {
    level: 16,
    title: "Relative Clauses (Defining)",
    formula: "[Noun] + who/which/that + [Clause]",
    explanation:
      "Mệnh đề quan hệ bổ nghĩa trực tiếp cho danh từ đứng trước, không dùng dấu phẩy.",
    puzzles: [
      {
        blocks: ["who lives next door", "The man", "is a doctor"],
        correctOrder: ["The man", "who lives next door", "is a doctor"],
        meaning: "Người đàn ông sống cạnh nhà là bác sĩ.",
      },
      {
        blocks: ["that I bought yesterday", "The book", "is fascinating"],
        correctOrder: ["The book", "that I bought yesterday", "is fascinating"],
        meaning: "Cuốn sách mà tôi mua hôm qua thật hấp dẫn.",
      },
    ],
  },
  {
    level: 17,
    title: "Reported Speech (Statements)",
    formula: "[S] + said (that) + [Clause] (backshift if needed)",
    explanation:
      "Tường thuật lời nói gián tiếp; thường lùi thì khi động từ tường thuật ở quá khứ.",
    puzzles: [
      {
        blocks: ["that", "She said", "she was busy"],
        correctOrder: ["She said", "that", "she was busy"],
        meaning: "Cô ấy nói rằng cô ấy bận.",
      },
      {
        blocks: ["He said", "that", "he had finished the task"],
        correctOrder: ["He said", "that", "he had finished the task"],
        meaning: "Anh ấy nói rằng anh ấy đã hoàn thành nhiệm vụ.",
      },
    ],
  },
  {
    level: 18,
    title: "Question Tags",
    formula: "[Statement] , [Aux + n’t/positive] ?",
    explanation:
      "Đuôi câu xác nhận; khẳng định → phủ định, phủ định → khẳng định.",
    puzzles: [
      {
        blocks: ["aren’t they?", "They are your classmates,"],
        correctOrder: ["They are your classmates,", "aren’t they?"],
        meaning: "Họ là bạn cùng lớp của bạn, phải không?",
      },
      {
        blocks: ["did he?", "He didn’t call yesterday,"],
        correctOrder: ["He didn’t call yesterday,", "did he?"],
        meaning: "Hôm qua anh ấy không gọi, đúng không?",
      },
    ],
  },
  {
    level: 19,
    title: "Cleft Sentences (It is/was ... that ...)",
    formula: "It is/was + [Focus] + that + [Clause]",
    explanation:
      "Câu chẻ dùng để nhấn mạnh một thành phần (chủ ngữ/tân ngữ/thời gian/nơi chốn).",
    puzzles: [
      {
        blocks: ["that she wanted to see", "It was", "the manager"],
        correctOrder: ["It was", "the manager", "that she wanted to see"],
        meaning: "Chính người quản lý là người cô ấy muốn gặp.",
      },
      {
        blocks: ["yesterday", "that", "It was", "he finished the report"],
        correctOrder: ["It was", "yesterday", "that", "he finished the report"],
        meaning: "Chính vào ngày hôm qua anh ấy hoàn thành báo cáo.",
      },
    ],
  },
  {
    level: 20,
    title: "Inversion with Negative Adverbials",
    formula: "Never/Rarely/Seldom/Hardly + [Aux] + [Subject] + [Verb] …",
    explanation:
      "Đảo ngữ để nhấn mạnh khi trạng từ phủ định/hiếm khi đứng đầu câu.",
    puzzles: [
      {
        blocks: ["Never", "have I", "seen such a view"],
        correctOrder: ["Never", "have I", "seen such a view"],
        meaning: "Tôi chưa bao giờ thấy khung cảnh như vậy.",
      },
      {
        blocks: ["Had hardly", "we", "arrived when it started to rain"],
        correctOrder: ["Had hardly", "we", "arrived when it started to rain"],
        meaning: "Chúng tôi vừa mới đến thì trời bắt đầu mưa.",
      },
    ],
  },
  {
    level: 21,
    title: "Participle Clauses (V-ing/V3 as Adverbials)",
    formula: "V-ing / V3/ed + [Clause] (same subject implied)",
    explanation:
      "Mệnh đề rút gọn dùng phân từ để diễn tả nguyên nhân/điều kiện/thời gian cùng chủ ngữ.",
    puzzles: [
      {
        blocks: ["Feeling tired", "she went to bed early"],
        correctOrder: ["Feeling tired", "she went to bed early"],
        meaning: "Cảm thấy mệt, cô ấy đi ngủ sớm.",
      },
      {
        blocks: ["Built in 1995", "the bridge", "still looks new"],
        correctOrder: ["Built in 1995", "the bridge", "still looks new"],
        meaning: "Cây cầu được xây năm 1995 nhưng trông vẫn mới.",
      },
    ],
  },
  {
    level: 22,
    title: "Because/So (Cause–Effect)",
    formula: "Because + [Clause] , [Clause] / [Clause] , so + [Clause]",
    explanation: "Diễn tả quan hệ nguyên nhân – kết quả với because/so.",
    puzzles: [
      {
        blocks: ["Because it was late", "we took a taxi"],
        correctOrder: ["Because it was late", "we took a taxi"],
        meaning: "Vì đã muộn nên chúng tôi gọi taxi.",
      },
      {
        blocks: ["so", "He was ill", "he stayed at home"],
        correctOrder: ["He was ill", "so", "he stayed at home"],
        meaning: "Cậu ấy bị ốm nên ở nhà.",
      },
    ],
  },
];
