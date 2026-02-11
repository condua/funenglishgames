const set1 = [
  // --- ORIGINAL QUESTIONS (1-3) ---
  {
    id: 1,
    question:
      "Ms. Hopkins is _______ to announce that the sales goal for the quarter has been met.",
    options: ["please", "pleased", "pleasing", "pleasure"],
    correct: "B",
    type: "Part of Speech (Adjective)",
    explanation:
      "Cấu trúc 'be + adj + to V'. Ở đây cần tính từ chỉ cảm xúc của người (Ms. Hopkins) nên dùng dạng -ed.",
    translation:
      "Cô Hopkins rất vui mừng thông báo rằng mục tiêu doanh số quý này đã đạt được.",
  },
  {
    id: 2,
    question:
      "The new computer system is _______ efficiently than the old one.",
    options: ["operate", "operating", "operation", "operational"],
    correct: "B",
    type: "Verb Forms",
    explanation:
      "Cấu trúc thì hiện tại tiếp diễn 'is + V-ing'. Trạng từ 'efficiently' bổ nghĩa cho động từ 'operating'.",
    translation: "Hệ thống máy tính mới đang hoạt động hiệu quả hơn cái cũ.",
  },
  {
    id: 3,
    question:
      "All employees are required to attend the safety workshop _______ begins at 9:00 A.M.",
    options: ["who", "what", "whose", "which"],
    correct: "D",
    type: "Relative Clause",
    explanation:
      "Cần đại từ quan hệ thay thế cho vật/sự việc ('safety workshop'). 'Which' là đáp án đúng.",
    translation:
      "Tất cả nhân viên được yêu cầu tham dự hội thảo an toàn, cái mà bắt đầu lúc 9:00 sáng.",
  },

  // --- ADDED QUESTIONS (4-50) ---
  {
    id: 4,
    question:
      "Dr. Arayama will _______ the research team in receiving the award at the ceremony tonight.",
    options: ["joint", "join", "joining", "joins"],
    correct: "B",
    type: "Modal Verb",
    explanation:
      "Sau động từ khuyết thiếu 'will' cần động từ nguyên thể (V-inf).",
    translation:
      "Tiến sĩ Arayama sẽ cùng nhóm nghiên cứu nhận giải thưởng tại buổi lễ tối nay.",
  },
  {
    id: 5,
    question:
      "Please review the attached documents _______ before signing the contract.",
    options: ["careful", "carefully", "care", "caring"],
    correct: "B",
    type: "Adverb",
    explanation:
      "Cần một trạng từ bổ nghĩa cho động từ 'review'. 'Carefully' là trạng từ.",
    translation:
      "Vui lòng xem lại các tài liệu đính kèm một cách cẩn thận trước khi ký hợp đồng.",
  },
  {
    id: 6,
    question:
      "_______ the bad weather, the construction project was completed on schedule.",
    options: ["Although", "Despite", "Because", "Even"],
    correct: "B",
    type: "Preposition/Connector",
    explanation: "'Despite' + Cụm danh từ (Noun Phrase). 'Although' + Mệnh đề.",
    translation:
      "Mặc dù thời tiết xấu, dự án xây dựng đã hoàn thành đúng tiến độ.",
  },
  {
    id: 7,
    question:
      "Customers who purchase two items will receive a _______ item for free.",
    options: ["third", "three", "triple", "thirdly"],
    correct: "A",
    type: "Ordinal Number",
    explanation:
      "Cần số thứ tự đóng vai trò tính từ bổ nghĩa cho 'item' để chỉ vật thứ ba.",
    translation: "Khách hàng mua hai món đồ sẽ nhận được món thứ ba miễn phí.",
  },
  {
    id: 8,
    question:
      "The keynote speaker arrived late _______ heavy traffic on the highway.",
    options: ["due to", "because", "since", "as"],
    correct: "A",
    type: "Preposition of Cause",
    explanation:
      "'Due to' + Cụm danh từ (nguyên nhân). Các từ còn lại thường đi với mệnh đề.",
    translation:
      "Diễn giả chính đã đến muộn do giao thông ùn tắc trên đường cao tốc.",
  },
  {
    id: 9,
    question:
      "Employees are reminded to turn off lights _______ leaving the office.",
    options: ["during", "while", "upon", "before"],
    correct: "D",
    type: "Preposition/Time",
    explanation:
      "'Before' + V-ing: trước khi làm gì đó. Ngữ cảnh nhắc nhở tắt đèn trước khi về.",
    translation: "Nhân viên được nhắc nhở tắt đèn trước khi rời văn phòng.",
  },
  {
    id: 10,
    question:
      "We are looking forward to _______ from you regarding the proposal.",
    options: ["hear", "hearing", "heard", "hears"],
    correct: "B",
    type: "Gerund",
    explanation: "Cấu trúc 'look forward to + V-ing' (mong chờ điều gì).",
    translation: "Chúng tôi rất mong nhận được phản hồi từ bạn về bản đề xuất.",
  },
  {
    id: 11,
    question:
      "The updated software is _______ compatible with older operating systems.",
    options: ["full", "fully", "fullness", "filled"],
    correct: "B",
    type: "Adverb",
    explanation: "Cần trạng từ 'fully' bổ nghĩa cho tính từ 'compatible'.",
    translation:
      "Phần mềm đã cập nhật hoàn toàn tương thích với các hệ điều hành cũ hơn.",
  },
  {
    id: 12,
    question:
      "Any requests for time off must be submitted to Mr. Henderson _______ approval.",
    options: ["for", "to", "with", "on"],
    correct: "A",
    type: "Preposition",
    explanation:
      "'Submit something for approval': nộp cái gì để được phê duyệt.",
    translation:
      "Mọi yêu cầu nghỉ phép phải được nộp cho ông Henderson để phê duyệt.",
  },
  {
    id: 13,
    question:
      "Of the two candidates, Ms. Le seems _______ for the managerial position.",
    options: ["qualified", "more qualified", "most qualified", "qualification"],
    correct: "B",
    type: "Comparisons",
    explanation:
      "So sánh giữa 2 đối tượng ('Of the two...'), dùng so sánh hơn 'more qualified'.",
    translation:
      "Trong hai ứng viên, cô Lê có vẻ đủ điều kiện hơn cho vị trí quản lý.",
  },
  {
    id: 14,
    question:
      "The factory has implemented strict measures to ensure the _______ of all workers.",
    options: ["safe", "safely", "safety", "save"],
    correct: "C",
    type: "Word Form (Noun)",
    explanation: "Sau mạo từ 'the' cần một danh từ. 'Safety' là danh từ.",
    translation:
      "Nhà máy đã thực hiện các biện pháp nghiêm ngặt để đảm bảo an toàn cho tất cả công nhân.",
  },
  {
    id: 15,
    question:
      "Should you _______ any technical difficulties, please contact the IT support desk.",
    options: ["experience", "experiences", "experienced", "experiencing"],
    correct: "A",
    type: "Inversion (Conditional)",
    explanation:
      "Đảo ngữ câu điều kiện loại 1: 'Should + S + V-inf' thay cho 'If + S + V'.",
    translation:
      "Nếu bạn gặp bất kỳ khó khăn kỹ thuật nào, vui lòng liên hệ bàn hỗ trợ CNTT.",
  },
  {
    id: 16,
    question: "Mr. Davis decided to handle the client negotiations by _______.",
    options: ["him", "his", "himself", "he"],
    correct: "C",
    type: "Reflexive Pronoun",
    explanation: "'By himself' = alone (tự mình). Cần đại từ phản thân.",
    translation:
      "Ông Davis đã quyết định tự mình xử lý các cuộc đàm phán với khách hàng.",
  },
  {
    id: 17,
    question:
      "The marketing team has suggested _______ the campaign launch date.",
    options: ["postpone", "postponing", "postponed", "postpones"],
    correct: "B",
    type: "Gerund",
    explanation: "Sau động từ 'suggest' là V-ing (đề nghị làm gì).",
    translation: "Đội ngũ marketing đã đề nghị hoãn ngày ra mắt chiến dịch.",
  },
  {
    id: 18,
    question:
      "Access to the server room is restricted to _______ personnel only.",
    options: ["author", "authority", "authorization", "authorized"],
    correct: "D",
    type: "Participle Adjective",
    explanation:
      "Cần tính từ bổ nghĩa cho 'personnel'. 'Authorized' (được ủy quyền).",
    translation:
      "Quyền truy cập vào phòng máy chủ chỉ giới hạn cho nhân viên được ủy quyền.",
  },
  {
    id: 19,
    question:
      "_______ the seminar was informative, many attendees felt it was too long.",
    options: ["Since", "Once", "While", "Despite"],
    correct: "C",
    type: "Conjunction",
    explanation: "'While' dùng để chỉ sự tương phản (Mặc dù... nhưng...).",
    translation:
      "Mặc dù hội thảo rất nhiều thông tin, nhiều người tham dự cảm thấy nó quá dài.",
  },
  {
    id: 20,
    question:
      "Production will cease _______ unless the new materials arrive by Friday.",
    options: ["temp", "temporary", "temporarily", "temporariness"],
    correct: "C",
    type: "Adverb",
    explanation: "Cần trạng từ bổ nghĩa cho động từ 'cease' (ngừng).",
    translation:
      "Việc sản xuất sẽ tạm ngừng trừ khi vật liệu mới đến trước thứ Sáu.",
  },
  {
    id: 21,
    question:
      "The director _______ a statement regarding the merger yesterday afternoon.",
    options: ["issue", "issued", "issues", "issuing"],
    correct: "B",
    type: "Past Tense",
    explanation: "Dấu hiệu 'yesterday afternoon' chỉ quá khứ đơn -> 'issued'.",
    translation:
      "Giám đốc đã đưa ra một tuyên bố liên quan đến việc sáp nhập vào chiều hôm qua.",
  },
  {
    id: 22,
    question:
      "We offer a wide _______ of services to meet the needs of our diverse clients.",
    options: ["vary", "variety", "various", "variable"],
    correct: "B",
    type: "Collocation/Noun",
    explanation: "Cụm 'a wide variety of' (nhiều loại đa dạng).",
    translation:
      "Chúng tôi cung cấp đa dạng các dịch vụ để đáp ứng nhu cầu của các khách hàng khác nhau.",
  },
  {
    id: 23,
    question:
      "Those _______ wish to participate in the training must register online.",
    options: ["who", "which", "whose", "whom"],
    correct: "A",
    type: "Relative Pronoun",
    explanation:
      "'Those' chỉ người (những người mà), cần đại từ quan hệ 'who' làm chủ ngữ.",
    translation: "Những ai muốn tham gia khóa đào tạo phải đăng ký trực tuyến.",
  },
  {
    id: 24,
    question:
      "The hotel is _______ located near the airport and the city center.",
    options: ["convenient", "convenience", "conveniently", "convene"],
    correct: "C",
    type: "Adverb",
    explanation:
      "Cần trạng từ bổ nghĩa cho tính từ 'located' (được toạ lạc một cách thuận tiện).",
    translation:
      "Khách sạn toạ lạc thuận tiện gần sân bay và trung tâm thành phố.",
  },
  {
    id: 25,
    question:
      "All travel expenses must be reimbursed _______ 30 days of the trip.",
    options: ["within", "among", "between", "inside"],
    correct: "A",
    type: "Preposition",
    explanation: "'Within + khoảng thời gian': trong vòng bao lâu.",
    translation:
      "Tất cả chi phí đi lại phải được hoàn trả trong vòng 30 ngày sau chuyến đi.",
  },
  {
    id: 26,
    question: "Most employees bring _______ own lunch to the office.",
    options: ["they", "them", "their", "theirs"],
    correct: "C",
    type: "Possessive Adjective",
    explanation: "Cần tính từ sở hữu đứng trước danh từ 'own lunch'.",
    translation: "Hầu hết nhân viên tự mang bữa trưa của họ đến văn phòng.",
  },
  {
    id: 27,
    question: "The meeting has been postponed _______ the manager is ill.",
    options: ["so that", "because", "therefore", "due to"],
    correct: "B",
    type: "Conjunction",
    explanation:
      "'Because' + mệnh đề (S + V) chỉ nguyên nhân. 'Due to' + Noun.",
    translation: "Cuộc họp đã bị hoãn lại vì người quản lý bị ốm.",
  },
  {
    id: 28,
    question:
      "To remain _______ in the market, companies must innovate constantly.",
    options: ["competition", "competitive", "competitively", "compete"],
    correct: "B",
    type: "Adjective",
    explanation: "Sau động từ nối 'remain' cần một tính từ.",
    translation:
      "Để duy trì tính cạnh tranh trên thị trường, các công ty phải đổi mới liên tục.",
  },
  {
    id: 29,
    question: "Mr. Kim _______ in the accounting department for ten years now.",
    options: ["works", "is working", "has been working", "worked"],
    correct: "C",
    type: "Present Perfect Continuous",
    explanation:
      "Dấu hiệu 'for ten years now' chỉ hành động bắt đầu trong quá khứ và kéo dài đến hiện tại.",
    translation:
      "Ông Kim đã và đang làm việc tại phòng kế toán được mười năm nay.",
  },
  {
    id: 30,
    question:
      "The annual conference will _______ at the Grand Hotel next month.",
    options: ["hold", "held", "be held", "holding"],
    correct: "C",
    type: "Passive Voice",
    explanation:
      "Hội nghị (vật) phải 'được tổ chức' -> Câu bị động tương lai đơn: will + be + V3/ed.",
    translation:
      "Hội nghị thường niên sẽ được tổ chức tại khách sạn Grand vào tháng tới.",
  },
  {
    id: 31,
    question: "_______ you need further assistance, do not hesitate to ask.",
    options: ["Unless", "If", "Had", "Were"],
    correct: "B",
    type: "Conditional",
    explanation: "Câu điều kiện loại 1 cơ bản: If + S + V.",
    translation: "Nếu bạn cần hỗ trợ thêm, đừng ngần ngại yêu cầu.",
  },
  {
    id: 32,
    question: "This is the laboratory _______ the new vaccine was developed.",
    options: ["which", "that", "where", "when"],
    correct: "C",
    type: "Relative Adverb",
    explanation:
      "Thay thế cho địa điểm ('laboratory') và đóng vai trò trạng ngữ nơi chốn -> dùng 'where'.",
    translation:
      "Đây là phòng thí nghiệm nơi loại vắc-xin mới được phát triển.",
  },
  {
    id: 33,
    question: "The new printer is not _______ reliable as the previous model.",
    options: ["as", "so", "more", "very"],
    correct: "A",
    type: "Comparisons",
    explanation:
      "So sánh bằng: 'as + adj + as'. Trong câu phủ định có thể dùng 'so...as' nhưng 'as...as' phổ biến hơn.",
    translation: "Máy in mới không đáng tin cậy bằng mẫu trước đó.",
  },
  {
    id: 34,
    question:
      "The elevators are currently _______ maintenance and are out of service.",
    options: ["undergoing", "underscoring", "understanding", "undertaking"],
    correct: "A",
    type: "Vocabulary",
    explanation: "'Undergo maintenance': trải qua bảo trì (cụm từ cố định).",
    translation: "Thang máy hiện đang được bảo trì và ngừng hoạt động.",
  },
  {
    id: 35,
    question: "Ms. Garcia is in _______ of the international sales division.",
    options: ["charge", "control", "responsibility", "direction"],
    correct: "A",
    type: "Idiom/Preposition",
    explanation: "Cụm 'in charge of': chịu trách nhiệm quản lý.",
    translation: "Cô Garcia chịu trách nhiệm về bộ phận kinh doanh quốc tế.",
  },
  {
    id: 36,
    question: "The financial results for the quarter were _______.",
    options: ["disappoint", "disappointed", "disappointing", "disappointment"],
    correct: "C",
    type: "Participle Adjective",
    explanation:
      "Kết quả tài chính (vật) gây ra cảm giác thất vọng -> dùng tính từ đuôi -ing.",
    translation: "Kết quả tài chính cho quý vừa qua thật đáng thất vọng.",
  },
  {
    id: 37,
    question: "_______ only is the product affordable, but it is also durable.",
    options: ["Not", "No", "None", "Never"],
    correct: "A",
    type: "Correlative Conjunction",
    explanation:
      "Cấu trúc 'Not only... but also...' (Không những... mà còn...).",
    translation: "Sản phẩm này không chỉ giá cả phải chăng mà còn bền.",
  },
  {
    id: 38,
    question:
      "The training program is designed _______ employees improve their skills.",
    options: ["help", "to help", "helping", "helped"],
    correct: "B",
    type: "Infinitive of Purpose",
    explanation: "Chỉ mục đích: 'designed to V' (được thiết kế để làm gì).",
    translation:
      "Chương trình đào tạo được thiết kế để giúp nhân viên cải thiện kỹ năng của họ.",
  },
  {
    id: 39,
    question:
      "We need to attract more _______ customers to expand our business.",
    options: ["potential", "potentially", "potentiality", "potency"],
    correct: "A",
    type: "Adjective",
    explanation: "Cần tính từ bổ nghĩa cho danh từ 'customers'.",
    translation:
      "Chúng ta cần thu hút nhiều khách hàng tiềm năng hơn để mở rộng kinh doanh.",
  },
  {
    id: 40,
    question:
      "The rent is high; _______, the location is perfect for our shop.",
    options: ["therefore", "however", "moreover", "otherwise"],
    correct: "B",
    type: "Connector",
    explanation:
      "Hai mệnh đề đối lập nhau (giá cao - vị trí đẹp) -> dùng 'however' (tuy nhiên).",
    translation:
      "Giá thuê cao; tuy nhiên, vị trí lại hoàn hảo cho cửa hàng của chúng tôi.",
  },
  {
    id: 41,
    question:
      "The manager spoke _______ to the press about the company's future plans.",
    options: ["strategy", "strategic", "strategically", "strategies"],
    correct: "C",
    type: "Adverb",
    explanation: "Cần trạng từ bổ nghĩa cho động từ 'spoke'.",
    translation:
      "Người quản lý đã nói chuyện một cách chiến lược với báo chí về kế hoạch tương lai của công ty.",
  },
  {
    id: 42,
    question:
      "A number of employees _______ complaining about the new uniform policy.",
    options: ["is", "are", "was", "has"],
    correct: "B",
    type: "Subject-Verb Agreement",
    explanation:
      "'A number of + N(số nhiều)' đi với động từ số nhiều. 'The number of' đi với động từ số ít.",
    translation: "Một số nhân viên đang phàn nàn về chính sách đồng phục mới.",
  },
  {
    id: 43,
    question:
      "All staff must _______ with the safety regulations at all times.",
    options: ["comply", "adhere", "observe", "follow"],
    correct: "A",
    type: "Collocation/Verb",
    explanation:
      "'Comply with' = tuân thủ. 'Adhere' đi với 'to'. 'Observe/Follow' không đi với giới từ.",
    translation: "Tất cả nhân viên phải tuân thủ các quy định an toàn mọi lúc.",
  },
  {
    id: 44,
    question: "Their proposal was much more detailed than _______.",
    options: ["us", "our", "ours", "we"],
    correct: "C",
    type: "Possessive Pronoun",
    explanation:
      "Cần đại từ sở hữu thay thế cho 'our proposal' để tránh lặp từ -> dùng 'ours'.",
    translation:
      "Đề xuất của họ chi tiết hơn nhiều so với đề xuất của chúng tôi.",
  },
  {
    id: 45,
    question: "By the time the CEO arrives, we _______ the presentation.",
    options: ["finish", "will finish", "have finished", "will have finished"],
    correct: "D",
    type: "Future Perfect",
    explanation:
      "Cấu trúc 'By the time + hiện tại, S + will have V3/ed' (Tương lai hoàn thành).",
    translation:
      "Vào lúc CEO đến, chúng tôi sẽ đã hoàn thành bài thuyết trình.",
  },
  {
    id: 46,
    question: "It is essential that every employee _______ the meeting.",
    options: ["attend", "attends", "attending", "attended"],
    correct: "A",
    type: "Subjunctive Mode",
    explanation:
      "Cấu trúc giả định: It is essential/important/necessary that S + V(nguyên thể không chia).",
    translation: "Việc mọi nhân viên tham dự cuộc họp là rất cần thiết.",
  },
  {
    id: 47,
    question:
      "Smoke detectors are installed _______ the building for maximum safety.",
    options: ["throughout", "among", "between", "thorough"],
    correct: "A",
    type: "Preposition",
    explanation: "'Throughout the building': khắp tòa nhà.",
    translation:
      "Máy dò khói được lắp đặt khắp tòa nhà để đảm bảo an toàn tối đa.",
  },
  {
    id: 48,
    question: "Please submit the report by Friday at the _______.",
    options: ["latest", "later", "late", "lately"],
    correct: "A",
    type: "Superlative/Expression",
    explanation: "Cụm từ 'at the latest': muộn nhất là.",
    translation: "Vui lòng nộp báo cáo muộn nhất là vào thứ Sáu.",
  },
  {
    id: 49,
    question:
      "_______ the flight is delayed, we will miss our connecting flight.",
    options: ["Whether", "If", "Unless", "Due to"],
    correct: "B",
    type: "Conditional",
    explanation: "Câu điều kiện loại 1: 'If' (Nếu).",
    translation:
      "Nếu chuyến bay bị hoãn, chúng tôi sẽ lỡ chuyến bay nối chuyến.",
  },
  {
    id: 50,
    question:
      "Ms. White was recognized for her _______ to the company's success.",
    options: ["dedicate", "dedicated", "dedication", "dedicating"],
    correct: "C",
    type: "Word Form (Noun)",
    explanation:
      "Sau tính từ sở hữu 'her' cần danh từ. 'Dedication' (sự cống hiến).",
    translation:
      "Cô White đã được công nhận vì sự cống hiến của cô cho thành công của công ty.",
  },
];

export default set1;
