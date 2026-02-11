// DATA: SET 2 (Focus: Contracts & Meetings)
const set2 = [
  // --- USER PROVIDED QUESTIONS (1-5) ---
  {
    id: 1,
    question:
      "The contract must be signed _______ the end of the business day.",
    options: ["by", "at", "on", "in"],
    correct: "A",
    type: "Prepositions",
    explanation: "'By' + mốc thời gian mang nghĩa 'trước hoặc muộn nhất là'.",
    translation: "Hợp đồng phải được ký trước cuối ngày làm việc.",
  },
  {
    id: 2,
    question:
      "All participants in the seminar are required to _______ at the registration desk.",
    options: ["sign in", "sign out", "sign up", "sign off"],
    correct: "A",
    type: "Phrasal Verbs",
    explanation: "'Sign in' nghĩa là ký tên điểm danh/đăng nhập khi đến nơi.",
    translation:
      "Tất cả người tham gia hội thảo được yêu cầu ký tên tại bàn đăng ký.",
  },
  {
    id: 3,
    question: "We need to reach a _______ regarding the budget distribution.",
    options: ["consensus", "consent", "consequence", "conservation"],
    correct: "A",
    type: "Vocabulary",
    explanation:
      "'Reach a consensus' là cụm cố định nghĩa là đạt được sự đồng thuận.",
    translation:
      "Chúng ta cần đạt được sự đồng thuận về việc phân bổ ngân sách.",
  },
  {
    id: 4,
    question: "_______ the CEO nor the CFO was available for comments.",
    options: ["Either", "Neither", "Both", "Not"],
    correct: "B",
    type: "Conjunctions",
    explanation: "Cấu trúc 'Neither... nor...' (Cả... đều không...).",
    translation: "Cả CEO lẫn CFO đều không có mặt để bình luận.",
  },
  {
    id: 5,
    question: "The merger will be beneficial _______ both companies involved.",
    options: ["at", "to", "with", "from"],
    correct: "B",
    type: "Prepositions",
    explanation: "Tính từ 'beneficial' đi với giới từ 'to'.",
    translation: "Vụ sáp nhập sẽ có lợi cho cả hai công ty liên quan.",
  },

  // --- ADDED QUESTIONS (6-50) ---
  {
    id: 6,
    question:
      "The board members finally came to an _______ after hours of negotiation.",
    options: ["agree", "agreed", "agreement", "agreeable"],
    correct: "C",
    type: "Word Form (Noun)",
    explanation: "Sau mạo từ 'an' cần một danh từ. 'Agreement' (thỏa thuận).",
    translation:
      "Các thành viên hội đồng cuối cùng đã đi đến thỏa thuận sau nhiều giờ đàm phán.",
  },
  {
    id: 7,
    question:
      "Unless the terms are modified, we will have to _______ the offer.",
    options: ["reject", "rejecting", "rejection", "rejected"],
    correct: "A",
    type: "Verb Form",
    explanation: "Sau 'have to' cần động từ nguyên thể.",
    translation:
      "Trừ khi các điều khoản được sửa đổi, chúng tôi sẽ phải từ chối lời đề nghị.",
  },
  {
    id: 8,
    question:
      "Please ensure that you read every _______ in the contract carefully.",
    options: ["close", "closet", "clause", "cause"],
    correct: "C",
    type: "Vocabulary",
    explanation: "'Clause' (điều khoản) là từ vựng thường gặp trong hợp đồng.",
    translation:
      "Vui lòng đảm bảo rằng bạn đọc kỹ mọi điều khoản trong hợp đồng.",
  },
  {
    id: 9,
    question: "The meeting is scheduled to take place _______ Room 304.",
    options: ["on", "at", "to", "in"],
    correct: "D",
    type: "Prepositions",
    explanation: "Dùng 'in' cho không gian kín/phòng ốc (in Room 304).",
    translation: "Cuộc họp được lên lịch diễn ra tại Phòng 304.",
  },
  {
    id: 10,
    question:
      "Mr. Roberts _______ the meeting minutes to all attendees yesterday.",
    options: ["distributed", "distribute", "distributes", "distribution"],
    correct: "A",
    type: "Past Tense",
    explanation: "Dấu hiệu 'yesterday' -> thì quá khứ đơn.",
    translation:
      "Ông Roberts đã phân phát biên bản cuộc họp cho tất cả người tham dự vào hôm qua.",
  },
  {
    id: 11,
    question: "Both parties agreed to _______ the contract for another year.",
    options: ["renewal", "renew", "renewable", "renewing"],
    correct: "B",
    type: "To-Infinitive",
    explanation: "Cấu trúc 'agree to V' (đồng ý làm gì).",
    translation: "Cả hai bên đã đồng ý gia hạn hợp đồng thêm một năm nữa.",
  },
  {
    id: 12,
    question:
      "The keynote speaker gave a very _______ presentation on market trends.",
    options: ["persuade", "persuasion", "persuasive", "persuasively"],
    correct: "C",
    type: "Adjective",
    explanation: "Cần tính từ đứng trước danh từ 'presentation'.",
    translation:
      "Diễn giả chính đã có bài thuyết trình rất thuyết phục về xu hướng thị trường.",
  },
  {
    id: 13,
    question:
      "The contract will be null and void _______ signed by both directors.",
    options: ["without", "except", "unless", "if"],
    correct: "C",
    type: "Conjunctions",
    explanation: "'Unless' = If not (Trừ khi/Nếu không).",
    translation: "Hợp đồng sẽ vô hiệu trừ khi được ký bởi cả hai giám đốc.",
  },
  {
    id: 14,
    question: "We are currently _______ the possibility of a partnership.",
    options: ["discuss", "discussion", "discussed", "discussing"],
    correct: "D",
    type: "Present Continuous",
    explanation: "Hiện tại tiếp diễn: 'are + V-ing'.",
    translation: "Chúng tôi hiện đang thảo luận về khả năng hợp tác.",
  },
  {
    id: 15,
    question:
      "_______ the meeting was long, we managed to cover all the topics.",
    options: ["Although", "Despite", "Because", "However"],
    correct: "A",
    type: "Conjunctions",
    explanation:
      "'Although' + mệnh đề (S+V) chỉ sự nhượng bộ. 'Despite' + Noun.",
    translation:
      "Mặc dù cuộc họp kéo dài, chúng tôi đã giải quyết hết các chủ đề.",
  },
  {
    id: 16,
    question:
      "Before _______ the agreement, please consult with our legal department.",
    options: ["final", "finalize", "finalizing", "finalized"],
    correct: "C",
    type: "Gerund",
    explanation: "Sau giới từ 'Before' dùng V-ing.",
    translation:
      "Trước khi chốt thỏa thuận, vui lòng tham khảo ý kiến bộ phận pháp lý.",
  },
  {
    id: 17,
    question:
      "The negotiations were halted because the two parties could not agree _______ the price.",
    options: ["on", "with", "to", "for"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Agree on' something: đồng ý về vấn đề gì đó.",
    translation:
      "Các cuộc đàm phán bị tạm dừng vì hai bên không thể thống nhất về giá cả.",
  },
  {
    id: 18,
    question:
      "It is _______ that all employees attend the briefing regarding the new policy.",
    options: ["mandate", "mandatory", "mandated", "mandatorily"],
    correct: "B",
    type: "Adjective",
    explanation: "Cấu trúc 'It is + adj + that...'. 'Mandatory' (bắt buộc).",
    translation:
      "Việc tất cả nhân viên tham dự buổi tóm tắt về chính sách mới là bắt buộc.",
  },
  {
    id: 19,
    question:
      "Any changes to the schedule must be approved _______ the manager.",
    options: ["from", "on", "of", "by"],
    correct: "D",
    type: "Passive Voice",
    explanation: "Câu bị động: 'be + V3/ed + by + O' (bởi ai).",
    translation:
      "Mọi thay đổi về lịch trình phải được phê duyệt bởi người quản lý.",
  },
  {
    id: 20,
    question:
      "The client asked for an _______ to the deadline due to unforeseen delays.",
    options: ["extend", "extensive", "extension", "extending"],
    correct: "C",
    type: "Word Form (Noun)",
    explanation: "Sau mạo từ 'an' cần danh từ. 'Extension' (sự gia hạn).",
    translation:
      "Khách hàng đã yêu cầu gia hạn thời hạn do sự chậm trễ không lường trước.",
  },
  {
    id: 21,
    question:
      "The conference room is equipped _______ a state-of-the-art sound system.",
    options: ["with", "for", "in", "by"],
    correct: "A",
    type: "Collocations",
    explanation: "'Equipped with' = được trang bị cái gì.",
    translation: "Phòng hội nghị được trang bị hệ thống âm thanh hiện đại.",
  },
  {
    id: 22,
    question: "We regret _______ you that your proposal has been declined.",
    options: ["inform", "to inform", "informing", "informed"],
    correct: "B",
    type: "To-Infinitive",
    explanation:
      "'Regret to V': Lấy làm tiếc khi phải làm gì (thông báo tin xấu).",
    translation:
      "Chúng tôi rất tiếc phải thông báo rằng đề xuất của bạn đã bị từ chối.",
  },
  {
    id: 23,
    question: "The agenda for next week's meeting is still _______.",
    options: ["tentative", "tentatively", "tentativeness", "content"],
    correct: "A",
    type: "Adjective",
    explanation:
      "Sau động từ 'is' cần tính từ. 'Tentative' (dự kiến/chưa chốt).",
    translation:
      "Chương trình nghị sự cho cuộc họp tuần tới vẫn chỉ là dự kiến.",
  },
  {
    id: 24,
    question:
      "Neither the manager _______ the assistant knew about the cancellation.",
    options: ["or", "nor", "and", "but"],
    correct: "B",
    type: "Correlative Conjunctions",
    explanation: "Cặp từ 'Neither... nor...'.",
    translation: "Cả người quản lý lẫn trợ lý đều không biết về việc hủy bỏ.",
  },
  {
    id: 25,
    question:
      "Please _______ the attached contract, sign it, and return it to us.",
    options: ["review", "reviewer", "reviewing", "reviewed"],
    correct: "A",
    type: "Imperative Verb",
    explanation: "Câu mệnh lệnh bắt đầu bằng động từ nguyên thể.",
    translation:
      "Vui lòng xem lại hợp đồng đính kèm, ký tên và gửi lại cho chúng tôi.",
  },
  {
    id: 26,
    question: "The project will commence as soon as the contract is _______.",
    options: ["sign", "signing", "signed", "signs"],
    correct: "C",
    type: "Passive Voice",
    explanation: "Bị động: 'contract is signed' (hợp đồng được ký).",
    translation: "Dự án sẽ bắt đầu ngay khi hợp đồng được ký kết.",
  },
  {
    id: 27,
    question:
      "We need to verify the _______ of the signatures on the document.",
    options: ["authentic", "authenticate", "authentically", "authenticity"],
    correct: "D",
    type: "Word Form (Noun)",
    explanation: "Sau 'the' cần danh từ. 'Authenticity' (tính xác thực).",
    translation:
      "Chúng ta cần xác minh tính xác thực của các chữ ký trên tài liệu.",
  },
  {
    id: 28,
    question: "_______ you have any objections, please speak up now.",
    options: ["Should", "Had", "Were", "Did"],
    correct: "A",
    type: "Inversion (Conditional)",
    explanation:
      "Đảo ngữ câu điều kiện loại 1: 'Should + S + V' = 'If + S + V'.",
    translation:
      "Nếu bạn có bất kỳ sự phản đối nào, vui lòng lên tiếng ngay bây giờ.",
  },
  {
    id: 29,
    question:
      "The lawyer advised us not to sign the contract _______ its current form.",
    options: ["at", "in", "on", "with"],
    correct: "B",
    type: "Prepositions",
    explanation: "'In its current form': dưới hình thức hiện tại của nó.",
    translation:
      "Luật sư khuyên chúng tôi không nên ký hợp đồng dưới hình thức hiện tại.",
  },
  {
    id: 30,
    question: "The decision was made _______ without consulting the staff.",
    options: ["unanimous", "unanimously", "unanimity", "unanimousness"],
    correct: "B",
    type: "Adverb",
    explanation:
      "Cần trạng từ bổ nghĩa cho động từ 'made' (được đưa ra một cách nhất trí).",
    translation:
      "Quyết định đã được đưa ra một cách nhất trí mà không cần hỏi ý kiến nhân viên.",
  },
  {
    id: 31,
    question:
      "Ms. Green requested that the meeting _______ postponed until Friday.",
    options: ["is", "was", "be", "been"],
    correct: "C",
    type: "Subjunctive Mode",
    explanation: "Giả định cách: 'request that + S + V(nguyên thể)'.",
    translation: "Cô Green yêu cầu cuộc họp được hoãn lại cho đến thứ Sáu.",
  },
  {
    id: 32,
    question: "This agreement is binding _______ all parties involved.",
    options: ["to", "for", "with", "on"],
    correct: "D",
    type: "Prepositions",
    explanation: "'Binding on' (có tính ràng buộc đối với ai).",
    translation:
      "Thỏa thuận này có tính ràng buộc đối với tất cả các bên liên quan.",
  },
  {
    id: 33,
    question:
      "We apologize for the short _______ regarding the meeting time change.",
    options: ["notice", "notification", "noting", "notable"],
    correct: "A",
    type: "Vocabulary",
    explanation: "'Short notice': thông báo gấp.",
    translation:
      "Chúng tôi xin lỗi vì thông báo gấp liên quan đến việc thay đổi giờ họp.",
  },
  {
    id: 34,
    question: "The partnership will create new _______ for growth.",
    options: ["opportune", "opportunities", "opportunity", "opportunists"],
    correct: "B",
    type: "Noun (Plural)",
    explanation: "'New opportunities' (những cơ hội mới).",
    translation: "Sự hợp tác sẽ tạo ra những cơ hội mới để phát triển.",
  },
  {
    id: 35,
    question: "He is responsible for _______ the terms of the lease.",
    options: ["negotiate", "negotiated", "negotiating", "negotiation"],
    correct: "C",
    type: "Gerund",
    explanation: "Sau giới từ 'for' dùng V-ing.",
    translation:
      "Anh ấy chịu trách nhiệm đàm phán các điều khoản của hợp đồng thuê.",
  },
  {
    id: 36,
    question: "Please keep these documents _______ until the deal is public.",
    options: ["confidence", "confidently", "confide", "confidential"],
    correct: "D",
    type: "Adjective",
    explanation:
      "Cấu trúc 'keep something + adj' (giữ cái gì ở trạng thái nào).",
    translation:
      "Vui lòng giữ bí mật các tài liệu này cho đến khi thỏa thuận được công khai.",
  },
  {
    id: 37,
    question:
      "The chairman will address the stakeholders _______ the annual meeting.",
    options: ["during", "while", "when", "as"],
    correct: "A",
    type: "Prepositions",
    explanation: "'During' + danh từ (during the meeting). 'While' + mệnh đề.",
    translation:
      "Chủ tịch sẽ phát biểu trước các bên liên quan trong cuộc họp thường niên.",
  },
  {
    id: 38,
    question: "_______ of the attendees received a copy of the report.",
    options: ["Every", "Each", "Much", "Another"],
    correct: "B",
    type: "Quantifiers",
    explanation:
      "'Each of' + danh từ số nhiều. 'Every' không đi trực tiếp với 'of'.",
    translation: "Mỗi người tham dự đều nhận được một bản sao của báo cáo.",
  },
  {
    id: 39,
    question: "The contract _______ explicitly that overtime work is unpaid.",
    options: ["state", "stating", "states", "statement"],
    correct: "C",
    type: "Subject-Verb Agreement",
    explanation: "Chủ ngữ số ít 'The contract' -> Động từ chia số ít 'states'.",
    translation: "Hợp đồng nêu rõ ràng rằng làm thêm giờ không được trả lương.",
  },
  {
    id: 40,
    question: "We need to _______ a date for the follow-up meeting.",
    options: ["settle", "meet", "do", "set"],
    correct: "D",
    type: "Collocations",
    explanation: "'Set a date': ấn định ngày.",
    translation: "Chúng ta cần ấn định ngày cho cuộc họp tiếp theo.",
  },
  {
    id: 41,
    question:
      "If you have questions about the contract, please consult your _______ advisor.",
    options: ["legal", "legally", "legalize", "legality"],
    correct: "A",
    type: "Adjective",
    explanation:
      "Tính từ bổ nghĩa cho danh từ 'advisor'. 'Legal advisor' (cố vấn pháp lý).",
    translation:
      "Nếu bạn có thắc mắc về hợp đồng, vui lòng tham khảo ý kiến cố vấn pháp lý của bạn.",
  },
  {
    id: 42,
    question:
      "The proposal was rejected _______ it lacked detailed financial projections.",
    options: ["due to", "because", "owing to", "despite"],
    correct: "B",
    type: "Conjunctions",
    explanation: "'Because' + mệnh đề (S + V). 'Due to/Owing to' + danh từ.",
    translation:
      "Đề xuất bị từ chối vì nó thiếu các dự báo tài chính chi tiết.",
  },
  {
    id: 43,
    question:
      "Participants are reminded to _______ their cell phones during the session.",
    options: ["silent", "silence", "silencing", "silently"],
    correct: "B",
    type: "Verb Form",
    explanation:
      "Cấu trúc 'to + V'. Ở đây dùng động từ 'silence' (làm im lặng/tắt tiếng).",
    translation:
      "Những người tham gia được nhắc nhở tắt tiếng điện thoại trong phiên họp.",
  },
  {
    id: 44,
    question: "The outcome of the meeting was _______ than we expected.",
    options: ["good", "best", "well", "better"],
    correct: "D",
    type: "Comparisons",
    explanation: "So sánh hơn của 'good' là 'better'.",
    translation: "Kết quả cuộc họp tốt hơn chúng tôi mong đợi.",
  },
  {
    id: 45,
    question: "Upon _______ of the signed contract, we will begin the work.",
    options: ["receipt", "receive", "reception", "receiving"],
    correct: "A",
    type: "Noun",
    explanation: "'Upon receipt of': ngay khi nhận được.",
    translation:
      "Ngay khi nhận được hợp đồng đã ký, chúng tôi sẽ bắt đầu công việc.",
  },
  {
    id: 46,
    question: "Can we meet _______ Tuesday or Wednesday next week?",
    options: ["neither", "either", "both", "not"],
    correct: "B",
    type: "Conjunctions",
    explanation: "Cấu trúc 'Either... or...' (Hoặc... hoặc...).",
    translation:
      "Chúng ta có thể gặp nhau vào thứ Ba hoặc thứ Tư tuần tới không?",
  },
  {
    id: 47,
    question: "All valid contracts must contain a _______ date.",
    options: ["terminate", "terminating", "termination", "terminated"],
    correct: "C",
    type: "Noun Adjunct",
    explanation: "Danh từ ghép: 'Termination date' (ngày chấm dứt hợp đồng).",
    translation: "Tất cả các hợp đồng hợp lệ phải chứa ngày chấm dứt.",
  },
  {
    id: 48,
    question:
      "The director wants the report on his desk _______ 9 AM tomorrow.",
    options: ["until", "for", "on", "by"],
    correct: "D",
    type: "Prepositions",
    explanation:
      "'By' chỉ deadline (trước 9 giờ). 'Until' chỉ sự kéo dài liên tục.",
    translation:
      "Giám đốc muốn báo cáo có trên bàn làm việc trước 9 giờ sáng mai.",
  },
  {
    id: 49,
    question:
      "_______ the initial disagreement, the two firms signed the deal.",
    options: ["Despite", "Although", "Even", "Unless"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Despite' + Noun Phrase (the initial disagreement).",
    translation: "Bất chấp sự bất đồng ban đầu, hai công ty đã ký thỏa thuận.",
  },
  {
    id: 50,
    question: "Discussions regarding the merger are still _______ progress.",
    options: ["on", "in", "at", "with"],
    correct: "B",
    type: "Idiom",
    explanation: "Cụm 'in progress' (đang diễn ra/đang tiến hành).",
    translation: "Các cuộc thảo luận về việc sáp nhập vẫn đang được tiến hành.",
  },
];

export default set2;
