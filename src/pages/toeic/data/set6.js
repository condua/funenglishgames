// DATA: SET 6 (Focus: Finance, Banking & Budgeting)
const set6 = [
  {
    id: 1,
    question:
      "The company decided to invest _______ new technology to improve efficiency.",
    options: ["in", "on", "at", "to"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Invest in' (đầu tư vào cái gì).",
    translation:
      "Công ty đã quyết định đầu tư vào công nghệ mới để cải thiện hiệu quả.",
  },
  {
    id: 2,
    question: "Despite the recession, the firm remains _______ stable.",
    options: ["finance", "financially", "financial", "finances"],
    correct: "B",
    type: "Adverb",
    explanation:
      "Cần trạng từ bổ nghĩa cho tính từ 'stable'. 'Financially stable' (ổn định về tài chính).",
    translation: "Bất chấp suy thoái, công ty vẫn ổn định về mặt tài chính.",
  },
  {
    id: 3,
    question:
      "Please submit your estimated _______ for the upcoming project by Friday.",
    options: ["budgetary", "budgeting", "budget", "budgets"],
    correct: "C",
    type: "Noun",
    explanation: "'Estimated budget' (ngân sách dự trù).",
    translation:
      "Vui lòng nộp ngân sách dự trù cho dự án sắp tới trước thứ Sáu.",
  },
  {
    id: 4,
    question: "We cannot approve the loan _______ you provide proof of income.",
    options: ["if", "without", "except", "unless"],
    correct: "D",
    type: "Conjunctions",
    explanation: "'Unless' = If not (Trừ khi/Nếu không).",
    translation:
      "Chúng tôi không thể phê duyệt khoản vay trừ khi bạn cung cấp bằng chứng thu nhập.",
  },
  {
    id: 5,
    question: "The _______ rate has increased by 0.5% this quarter.",
    options: ["interest", "interesting", "interested", "interests"],
    correct: "A",
    type: "Noun Adjunct",
    explanation: "Danh từ ghép: 'Interest rate' (lãi suất).",
    translation: "Lãi suất đã tăng 0.5% trong quý này.",
  },
  {
    id: 6,
    question: "All travel expenses must be _______ within 30 days.",
    options: ["reimburse", "reimbursed", "reimbursement", "reimbursing"],
    correct: "B",
    type: "Passive Voice",
    explanation: "Bị động: 'be + V3/ed'. 'Reimbursed' (được hoàn lại).",
    translation: "Tất cả chi phí đi lại phải được hoàn lại trong vòng 30 ngày.",
  },
  {
    id: 7,
    question: "The bank charges a fee for international _______.",
    options: ["transfers", "transferable", "transactions", "transacting"],
    correct: "C",
    type: "Noun",
    explanation:
      "'International transactions' (giao dịch quốc tế) là cụm từ phù hợp nhất trong ngữ cảnh ngân hàng.",
    translation: "Ngân hàng tính phí cho các giao dịch quốc tế.",
  },
  {
    id: 8,
    question:
      "Mr. Evans acts as a financial _______ for several large corporations.",
    options: ["advice", "advise", "advisory", "advisor"],
    correct: "D",
    type: "Noun (Person)",
    explanation: "'Financial advisor' (cố vấn tài chính).",
    translation:
      "Ông Evans đóng vai trò là cố vấn tài chính cho một số tập đoàn lớn.",
  },
  {
    id: 9,
    question: "A detailed report on the company's _______ is attached.",
    options: ["expenditures", "expensive", "expend", "expense"],
    correct: "A",
    type: "Noun",
    explanation: "'Expenditures' (các khoản chi tiêu/chi phí).",
    translation:
      "Một báo cáo chi tiết về các khoản chi tiêu của công ty được đính kèm.",
  },
  {
    id: 10,
    question:
      "Shareholders are pleased with the significant _______ in profits.",
    options: ["growing", "growth", "grown", "grow"],
    correct: "B",
    type: "Noun",
    explanation:
      "Sau tính từ 'significant' cần danh từ. 'Growth' (sự tăng trưởng).",
    translation:
      "Các cổ đông hài lòng với sự tăng trưởng đáng kể về lợi nhuận.",
  },
  {
    id: 11,
    question: "To open a savings account, you need to make an initial _______.",
    options: ["withdraw", "withdrawal", "deposit", "depot"],
    correct: "C",
    type: "Vocabulary",
    explanation: "'Initial deposit' (khoản tiền gửi ban đầu).",
    translation:
      "Để mở tài khoản tiết kiệm, bạn cần thực hiện khoản tiền gửi ban đầu.",
  },
  {
    id: 12,
    question: "The accounting department is located _______ the third floor.",
    options: ["at", "in", "to", "on"],
    correct: "D",
    type: "Prepositions",
    explanation: "'On' dùng cho tầng (on the third floor).",
    translation: "Phòng kế toán nằm ở tầng ba.",
  },
  {
    id: 13,
    question: "_______ rising costs, we have to increase our prices.",
    options: ["Due to", "Because", "Since", "As"],
    correct: "A",
    type: "Prepositions",
    explanation:
      "'Due to' + Noun Phrase (rising costs). Các từ còn lại + Mệnh đề.",
    translation: "Do chi phí tăng cao, chúng tôi phải tăng giá.",
  },
  {
    id: 14,
    question: "The annual audit will be _______ by an independent firm.",
    options: ["conduct", "conducted", "conducting", "conductor"],
    correct: "B",
    type: "Passive Voice",
    explanation: "Bị động: 'will be conducted' (sẽ được thực hiện/tiến hành).",
    translation:
      "Cuộc kiểm toán hàng năm sẽ được thực hiện bởi một công ty độc lập.",
  },
  {
    id: 15,
    question: "We need to reduce overhead costs to stay _______.",
    options: ["competition", "compete", "competitive", "competitively"],
    correct: "C",
    type: "Adjective",
    explanation:
      "Sau động từ nối 'stay' cần tính từ. 'Competitive' (có tính cạnh tranh).",
    translation: "Chúng ta cần giảm chi phí chung để duy trì tính cạnh tranh.",
  },
  {
    id: 16,
    question: "The currency exchange rate fluctuates _______ day to day.",
    options: ["between", "in", "at", "from"],
    correct: "D",
    type: "Prepositions",
    explanation: "Cấu trúc 'from... to...' (từ ngày này sang ngày khác).",
    translation: "Tỷ giá hối đoái biến động theo từng ngày.",
  },
  {
    id: 17,
    question:
      "_______ carefully reviewing the figures, the accountant found an error.",
    options: ["After", "Since", "Due to", "Where"],
    correct: "A",
    type: "Conjunction/Preposition",
    explanation: "'After + V-ing' (Sau khi làm gì).",
    translation:
      "Sau khi xem xét cẩn thận các số liệu, kế toán viên đã tìm ra một lỗi.",
  },
  {
    id: 18,
    question: "The CEO is optimistic _______ the company's future revenue.",
    options: ["for", "about", "with", "on"],
    correct: "B",
    type: "Adjective Collocation",
    explanation: "'Optimistic about' (lạc quan về điều gì).",
    translation: "CEO lạc quan về doanh thu tương lai của công ty.",
  },
  {
    id: 19,
    question: "Failure to pay taxes on time may result in severe _______.",
    options: ["penalize", "penalizing", "penalties", "penalty"],
    correct: "C",
    type: "Noun (Plural)",
    explanation:
      "'Severe penalties' (các hình phạt nghiêm khắc). Dùng số nhiều để chỉ chung các loại phạt.",
    translation:
      "Việc không nộp thuế đúng hạn có thể dẫn đến các hình phạt nghiêm khắc.",
  },
  {
    id: 20,
    question: "Our goal is to maximize profits _______ minimizing risks.",
    options: ["during", "where", "since", "while"],
    correct: "D",
    type: "Conjunctions",
    explanation: "'While + V-ing' (Trong khi làm gì đó/Song song với việc...).",
    translation:
      "Mục tiêu của chúng tôi là tối đa hóa lợi nhuận trong khi giảm thiểu rủi ro.",
  },
  {
    id: 21,
    question:
      "This investment yields a higher _______ than traditional savings accounts.",
    options: ["return", "returning", "returned", "returns"],
    correct: "A",
    type: "Noun",
    explanation:
      "'Yield a return' (mang lại lợi nhuận). 'Return' ở đây là danh từ số ít.",
    translation:
      "Khoản đầu tư này mang lại lợi nhuận cao hơn so với tài khoản tiết kiệm truyền thống.",
  },
  {
    id: 22,
    question: "The director has requested a _______ breakdown of the costs.",
    options: ["details", "detailed", "detailing", "detail"],
    correct: "B",
    type: "Adjective",
    explanation: "Cần tính từ bổ nghĩa cho 'breakdown'. 'Detailed' (chi tiết).",
    translation: "Giám đốc đã yêu cầu một bảng phân tích chi tiết các chi phí.",
  },
  {
    id: 23,
    question:
      "_______ the merger is approved, the stock price will likely rise.",
    options: ["Unless", "Even", "If", "Despite"],
    correct: "C",
    type: "Conditional",
    explanation: "Câu điều kiện loại 1: 'If' (Nếu).",
    translation:
      "Nếu việc sáp nhập được thông qua, giá cổ phiếu có thể sẽ tăng.",
  },
  {
    id: 24,
    question: "Please ensure that the balance sheet is _______ correct.",
    options: ["accuracy", "accurate", "accurateness", "accurately"],
    correct: "D",
    type: "Adverb",
    explanation: "Cần trạng từ bổ nghĩa cho tính từ 'correct'.",
    translation:
      "Vui lòng đảm bảo rằng bảng cân đối kế toán chính xác tuyệt đối.",
  },
  {
    id: 25,
    question: "We offer competitive salaries and excellent _______ packages.",
    options: ["benefits", "beneficial", "benefit", "benefiting"],
    correct: "A",
    type: "Compound Noun",
    explanation: "'Benefits packages' (gói phúc lợi). Dùng danh từ ghép.",
    translation:
      "Chúng tôi cung cấp mức lương cạnh tranh và các gói phúc lợi tuyệt vời.",
  },
  {
    id: 26,
    question:
      "The loan application process is quite _______ and time-consuming.",
    options: ["length", "lengthy", "lengthen", "lengthily"],
    correct: "B",
    type: "Adjective",
    explanation: "Sau 'is' cần tính từ. 'Lengthy' (dài dòng).",
    translation: "Quy trình đăng ký khoản vay khá dài dòng và tốn thời gian.",
  },
  {
    id: 27,
    question: "Investors should diversify their portfolios to _______ risk.",
    options: ["mitigation", "mitigating", "mitigate", "mitigated"],
    correct: "C",
    type: "Infinitive of Purpose",
    explanation: "'To + V' chỉ mục đích. 'Mitigate' (giảm nhẹ/giảm thiểu).",
    translation:
      "Các nhà đầu tư nên đa dạng hóa danh mục đầu tư để giảm thiểu rủi ro.",
  },
  {
    id: 28,
    question: "The finance minister announced a cut _______ corporate taxes.",
    options: ["on", "at", "to", "in"],
    correct: "D",
    type: "Prepositions",
    explanation: "'A cut in' (sự cắt giảm về cái gì).",
    translation: "Bộ trưởng tài chính tuyên bố cắt giảm thuế doanh nghiệp.",
  },
  {
    id: 29,
    question: "_______ fiscal year, we exceeded our sales targets.",
    options: ["Last", "Ago", "Yesterday", "Past"],
    correct: "A",
    type: "Adjective/Time",
    explanation: "'Last fiscal year' (năm tài chính trước).",
    translation: "Năm tài chính trước, chúng tôi đã vượt mục tiêu doanh số.",
  },
  {
    id: 30,
    question: "Many small businesses struggle _______ cash flow problems.",
    options: ["for", "with", "about", "at"],
    correct: "B",
    type: "Collocation",
    explanation: "'Struggle with' (vật lộn với vấn đề gì).",
    translation: "Nhiều doanh nghiệp nhỏ vật lộn với các vấn đề về dòng tiền.",
  },
  {
    id: 31,
    question: "The invoice must be paid in _______ upon receipt.",
    options: ["fully", "fullness", "full", "filled"],
    correct: "C",
    type: "Idiom",
    explanation: "Cụm 'paid in full' (thanh toán đủ/toàn bộ).",
    translation: "Hóa đơn phải được thanh toán đủ ngay khi nhận được.",
  },
  {
    id: 32,
    question:
      "We are looking for a candidate with a strong _______ in finance.",
    options: ["backyard", "backing", "backer", "background"],
    correct: "D",
    type: "Vocabulary",
    explanation: "'Background in finance' (nền tảng/kinh nghiệm về tài chính).",
    translation:
      "Chúng tôi đang tìm kiếm một ứng viên có nền tảng vững chắc về tài chính.",
  },
  {
    id: 33,
    question:
      "_______ inflation continues to rise, purchasing power will decrease.",
    options: ["If", "Unless", "Without", "However"],
    correct: "A",
    type: "Conditional",
    explanation: "Câu điều kiện loại 1.",
    translation: "Nếu lạm phát tiếp tục tăng, sức mua sẽ giảm.",
  },
  {
    id: 34,
    question: "The funds will be allocated _______ the different departments.",
    options: ["between", "among", "through", "into"],
    correct: "B",
    type: "Prepositions",
    explanation: "'Among' dùng khi chia sẻ cho nhiều đối tượng (>2).",
    translation: "Tiền quỹ sẽ được phân bổ giữa các phòng ban khác nhau.",
  },
  {
    id: 35,
    question: "He is responsible for managing the company's _______ assets.",
    options: ["finance", "finances", "financial", "financially"],
    correct: "C",
    type: "Adjective",
    explanation: "Tính từ 'financial' bổ nghĩa cho danh từ 'assets'.",
    translation:
      "Anh ấy chịu trách nhiệm quản lý tài sản tài chính của công ty.",
  },
  {
    id: 36,
    question: "The bank requires two forms of _______ to cash the check.",
    options: ["identify", "identifying", "identified", "identification"],
    correct: "D",
    type: "Noun",
    explanation:
      "Cần danh từ sau 'forms of'. 'Identification' (giấy tờ tùy thân).",
    translation:
      "Ngân hàng yêu cầu hai loại giấy tờ tùy thân để đổi séc thành tiền mặt.",
  },
  {
    id: 37,
    question:
      "Stock prices fell sharply _______ the announcement of the trade war.",
    options: ["following", "followed", "follow", "follows"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Following' = After (Sau khi/Tiếp theo).",
    translation:
      "Giá cổ phiếu giảm mạnh sau thông báo về cuộc chiến thương mại.",
  },
  {
    id: 38,
    question: "It is essential that we _______ within the budget.",
    options: ["stayed", "stay", "staying", "to stay"],
    correct: "B",
    type: "Subjunctive Mode",
    explanation: "Giả định cách: 'essential that + S + V(nguyên thể)'.",
    translation: "Điều cốt yếu là chúng ta phải nằm trong ngân sách.",
  },
  {
    id: 39,
    question: "The audit revealed several _______ in the accounts.",
    options: ["discrepant", "discrepantly", "discrepancies", "discrepancy"],
    correct: "C",
    type: "Noun",
    explanation:
      "Sau 'several' cần danh từ số nhiều. 'Discrepancies' (sự sai lệch).",
    translation:
      "Cuộc kiểm toán đã tiết lộ một số sự sai lệch trong các tài khoản.",
  },
  {
    id: 40,
    question: "_______ analysts predict a recovery by next year.",
    options: ["Economy", "Economics", "Economize", "Economic"],
    correct: "D",
    type: "Adjective",
    explanation:
      "Tính từ 'Economic' bổ nghĩa cho 'analysts' (Các nhà phân tích kinh tế).",
    translation: "Các nhà phân tích kinh tế dự đoán sự phục hồi vào năm tới.",
  },
  {
    id: 41,
    question: "You can check your account balance _______ our mobile app.",
    options: ["via", "per", "into", "onto"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Via' (thông qua).",
    translation:
      "Bạn có thể kiểm tra số dư tài khoản thông qua ứng dụng di động của chúng tôi.",
  },
  {
    id: 42,
    question: "The project was cancelled because it was not _______ feasible.",
    options: ["finance", "financially", "financial", "finances"],
    correct: "B",
    type: "Adverb",
    explanation:
      "Trạng từ bổ nghĩa cho tính từ 'feasible' (khả thi). 'Financially feasible' (khả thi về tài chính).",
    translation: "Dự án bị hủy bỏ vì nó không khả thi về mặt tài chính.",
  },
  {
    id: 43,
    question: "Tax _______ are available for charitable donations.",
    options: ["deduct", "deducted", "deductions", "deducting"],
    correct: "C",
    type: "Noun",
    explanation: "'Tax deductions' (các khoản khấu trừ thuế).",
    translation:
      "Các khoản khấu trừ thuế được áp dụng cho các khoản quyên góp từ thiện.",
  },
  {
    id: 44,
    question: "The board of directors _______ the quarterly dividends.",
    options: ["declaration", "declarative", "declared", "declaredly"],
    correct: "C",
    type: "Verb (Past Tense)",
    explanation: "Cần động từ chính cho câu. 'Declared' (đã tuyên bố/công bố).",
    translation: "Hội đồng quản trị đã công bố cổ tức hàng quý.",
  },
  {
    id: 45,
    question: "We need to _______ our spending to avoid going into debt.",
    options: ["monitor", "monitored", "monitoring", "monitors"],
    correct: "A",
    type: "Infinitive",
    explanation: "Sau 'need to' cần động từ nguyên thể.",
    translation: "Chúng ta cần giám sát chi tiêu để tránh rơi vào nợ nần.",
  },
  {
    id: 46,
    question: "The new tax laws will come into _______ next month.",
    options: ["affect", "effect", "effective", "effectively"],
    correct: "B",
    type: "Idiom",
    explanation: "'Come into effect' (có hiệu lực).",
    translation: "Luật thuế mới sẽ có hiệu lực vào tháng tới.",
  },
  {
    id: 47,
    question: "Any business expenses must be supported by _______ receipts.",
    options: ["validate", "validity", "valid", "validly"],
    correct: "C",
    type: "Adjective",
    explanation: "Tính từ 'valid' (hợp lệ) bổ nghĩa cho 'receipts'.",
    translation:
      "Mọi chi phí kinh doanh phải được hỗ trợ bởi các biên lai hợp lệ.",
  },
  {
    id: 48,
    question: "Rising fuel prices have negatively _______ our profit margins.",
    options: ["effect", "effective", "affect", "affected"],
    correct: "D",
    type: "Present Perfect",
    explanation:
      "Thì hiện tại hoàn thành 'have + V3/ed'. 'Affected' (ảnh hưởng).",
    translation:
      "Giá nhiên liệu tăng đã ảnh hưởng tiêu cực đến biên lợi nhuận của chúng tôi.",
  },
  {
    id: 49,
    question: "The merger creates the world's _______ banking institution.",
    options: ["largest", "larger", "large", "largely"],
    correct: "A",
    type: "Superlative",
    explanation: "So sánh nhất 'the largest'.",
    translation: "Việc sáp nhập tạo ra tổ chức ngân hàng lớn nhất thế giới.",
  },
  {
    id: 50,
    question: "Please transfer the funds _______ to the supplier's account.",
    options: ["direct", "directly", "direction", "director"],
    correct: "B",
    type: "Adverb",
    explanation: "Cần trạng từ bổ nghĩa cho động từ 'transfer'.",
    translation:
      "Vui lòng chuyển tiền trực tiếp vào tài khoản của nhà cung cấp.",
  },
];

export default set6;
