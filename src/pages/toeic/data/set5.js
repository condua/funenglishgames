// DATA: SET 5 (Focus: Shopping, Dining & Entertainment)
const set5 = [
  {
    id: 1,
    question: "We offer a 10% discount _______ all orders over $50.",
    options: ["on", "in", "at", "to"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Discount on' (giảm giá trên cái gì/mặt hàng nào).",
    translation:
      "Chúng tôi giảm giá 10% cho tất cả các đơn hàng trên 50 đô la.",
  },
  {
    id: 2,
    question: "The restaurant is _______ booked for the entire evening.",
    options: ["full", "fully", "fullness", "fill"],
    correct: "B",
    type: "Adverb",
    explanation:
      "Cần trạng từ bổ nghĩa cho tính từ/phân từ 'booked'. 'Fully booked' (được đặt kín chỗ).",
    translation: "Nhà hàng đã được đặt kín chỗ cho cả buổi tối.",
  },
  {
    id: 3,
    question:
      "Please keep your receipt as proof of purchase in case you need a _______.",
    options: ["refund", "fund", "found", "funding"],
    correct: "A",
    type: "Vocabulary",
    explanation:
      "'Refund' (tiền hoàn lại). Ngữ cảnh: giữ biên lai để được hoàn tiền.",
    translation:
      "Vui lòng giữ biên lai làm bằng chứng mua hàng trong trường hợp bạn cần hoàn tiền.",
  },
  {
    id: 4,
    question:
      "The new shopping mall is accessible _______ public transportation.",
    options: ["by", "with", "on", "in"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Accessible by' (có thể tiếp cận bằng phương tiện gì).",
    translation:
      "Trung tâm mua sắm mới có thể đi đến bằng phương tiện giao thông công cộng.",
  },
  {
    id: 5,
    question:
      "Customers are advised to _______ the expiration date on the coupon.",
    options: ["check", "checks", "checking", "checked"],
    correct: "A",
    type: "Infinitive",
    explanation: "Cấu trúc 'advise someone to V' (khuyên ai làm gì).",
    translation:
      "Khách hàng được khuyên nên kiểm tra ngày hết hạn trên phiếu giảm giá.",
  },
  {
    id: 6,
    question: "This jacket is available in _______ sizes and colors.",
    options: ["vary", "variety", "various", "variable"],
    correct: "C",
    type: "Adjective",
    explanation:
      "Cần tính từ bổ nghĩa cho danh từ 'sizes'. 'Various' (đa dạng/nhiều khác nhau).",
    translation:
      "Chiếc áo khoác này có sẵn với nhiều kích cỡ và màu sắc khác nhau.",
  },
  {
    id: 7,
    question: "The chef prepares every meal _______ to ensure high quality.",
    options: ["care", "careful", "carefully", "caring"],
    correct: "C",
    type: "Adverb",
    explanation: "Cần trạng từ bổ nghĩa cho động từ 'prepares'.",
    translation:
      "Đầu bếp chuẩn bị mọi bữa ăn một cách cẩn thận để đảm bảo chất lượng cao.",
  },
  {
    id: 8,
    question:
      "If you are not satisfied with the product, you can return it _______ 30 days.",
    options: ["within", "during", "inside", "among"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Within + khoảng thời gian' (trong vòng).",
    translation:
      "Nếu bạn không hài lòng với sản phẩm, bạn có thể trả lại trong vòng 30 ngày.",
  },
  {
    id: 9,
    question: "The concert tickets sold out _______ than we expected.",
    options: ["fast", "fastly", "faster", "fastest"],
    correct: "C",
    type: "Comparisons",
    explanation:
      "So sánh hơn của trạng từ 'fast' là 'faster'. (Lưu ý: không có 'fastly').",
    translation: "Vé buổi hòa nhạc đã bán hết nhanh hơn chúng tôi mong đợi.",
  },
  {
    id: 10,
    question: "_______ the high prices, the cafe is always crowded.",
    options: ["Although", "However", "Despite", "Even"],
    correct: "C",
    type: "Prepositions",
    explanation:
      "'Despite' + Noun Phrase (the high prices). 'Although' + Clause.",
    translation: "Mặc dù giá cao, quán cà phê luôn đông khách.",
  },
  {
    id: 11,
    question:
      "We specialize in _______ organic ingredients from local farmers.",
    options: ["source", "sourced", "sourcing", "sources"],
    correct: "C",
    type: "Gerund",
    explanation:
      "Sau giới từ 'in' dùng V-ing. 'Sourcing' (tìm nguồn cung ứng).",
    translation:
      "Chúng tôi chuyên tìm nguồn nguyên liệu hữu cơ từ nông dân địa phương.",
  },
  {
    id: 12,
    question: "The store hours are _______ 9:00 AM to 9:00 PM daily.",
    options: ["between", "from", "at", "on"],
    correct: "B",
    type: "Prepositions",
    explanation: "Cấu trúc 'from... to...' (từ... đến...).",
    translation:
      "Giờ mở cửa của cửa hàng là từ 9:00 sáng đến 9:00 tối hàng ngày.",
  },
  {
    id: 13,
    question: "Would you like your receipt in the bag _______ with you?",
    options: ["nor", "and", "but", "or"],
    correct: "D",
    type: "Conjunctions",
    explanation: "Lựa chọn A hay B -> dùng 'or'.",
    translation: "Bạn muốn để biên lai trong túi hay mang theo người?",
  },
  {
    id: 14,
    question:
      "The waiter recommended the seafood pasta, _______ is the specialty of the house.",
    options: ["who", "which", "whose", "where"],
    correct: "B",
    type: "Relative Pronoun",
    explanation: "Thay thế cho vật 'seafood pasta' -> dùng 'which'.",
    translation:
      "Người phục vụ giới thiệu món mì hải sản, món đặc sản của nhà hàng.",
  },
  {
    id: 15,
    question:
      "Our customer service team is available to assist you _______ the clock.",
    options: ["round", "around", "over", "above"],
    correct: "A",
    type: "Idiom",
    explanation: "Cụm 'round the clock' (suốt ngày đêm/24h).",
    translation:
      "Đội ngũ dịch vụ khách hàng của chúng tôi sẵn sàng hỗ trợ bạn suốt ngày đêm.",
  },
  {
    id: 16,
    question:
      "_______ you buy two pairs of shoes, you get the third one for half price.",
    options: ["If", "Unless", "Whether", "Whereas"],
    correct: "A",
    type: "Conditional",
    explanation: "Câu điều kiện loại 1: 'If' (Nếu).",
    translation:
      "Nếu bạn mua hai đôi giày, bạn sẽ được mua đôi thứ ba với nửa giá.",
  },
  {
    id: 17,
    question: "The gallery features a collection of _______ paintings.",
    options: ["impress", "impression", "impressive", "impressively"],
    correct: "C",
    type: "Adjective",
    explanation:
      "Cần tính từ bổ nghĩa cho danh từ 'paintings'. 'Impressive' (ấn tượng).",
    translation: "Phòng trưng bày có một bộ sưu tập các bức tranh ấn tượng.",
  },
  {
    id: 18,
    question:
      "Please present this voucher _______ checkout to receive your gift.",
    options: ["in", "on", "to", "at"],
    correct: "D",
    type: "Prepositions",
    explanation: "'At checkout': tại quầy thanh toán.",
    translation:
      "Vui lòng xuất trình phiếu này tại quầy thanh toán để nhận quà.",
  },
  {
    id: 19,
    question: "The promotional event will include free food _______.",
    options: ["tasting", "taste", "tasted", "tasty"],
    correct: "A",
    type: "Compound Noun",
    explanation: "'Food tasting' (nếm thử đồ ăn).",
    translation: "Sự kiện quảng bá sẽ bao gồm việc nếm thử đồ ăn miễn phí.",
  },
  {
    id: 20,
    question: "We have received many _______ reviews from satisfied diners.",
    options: ["positive", "positively", "position", "positivity"],
    correct: "A",
    type: "Adjective",
    explanation: "Cần tính từ bổ nghĩa cho 'reviews'. 'Positive' (tích cực).",
    translation:
      "Chúng tôi đã nhận được nhiều đánh giá tích cực từ những thực khách hài lòng.",
  },
  {
    id: 21,
    question:
      "The item is currently out of stock, but we can _______ it for you.",
    options: ["order", "ordering", "ordered", "orders"],
    correct: "A",
    type: "Verb Form",
    explanation: "Sau động từ khuyết thiếu 'can' cần động từ nguyên thể.",
    translation:
      "Mặt hàng này hiện đã hết hàng, nhưng chúng tôi có thể đặt hàng cho bạn.",
  },
  {
    id: 22,
    question:
      "_______ entering the theater, please turn off your mobile phones.",
    options: ["Before", "During", "While", "Since"],
    correct: "A",
    type: "Conjunction/Preposition",
    explanation: "'Before + V-ing' (Trước khi làm gì).",
    translation: "Trước khi vào rạp hát, vui lòng tắt điện thoại di động.",
  },
  {
    id: 23,
    question:
      "This membership card entitles you _______ free entry to the club.",
    options: ["for", "to", "with", "at"],
    correct: "B",
    type: "Collocation",
    explanation:
      "'Entitle someone to something' (cho phép ai hưởng quyền lợi gì).",
    translation: "Thẻ thành viên này cho phép bạn vào câu lạc bộ miễn phí.",
  },
  {
    id: 24,
    question: "The grand opening of the boutique will be _______ on Saturday.",
    options: ["hold", "held", "holding", "holds"],
    correct: "B",
    type: "Passive Voice",
    explanation:
      "Sự kiện (grand opening) được tổ chức -> Bị động: 'will be held'.",
    translation: "Lễ khai trương cửa hàng sẽ được tổ chức vào thứ Bảy.",
  },
  {
    id: 25,
    question: "This brand is known for its _______ and durability.",
    options: ["rely", "reliable", "reliably", "reliability"],
    correct: "D",
    type: "Noun",
    explanation:
      "Sau tính từ sở hữu 'its' cần danh từ. 'Reliability' (độ tin cậy).",
    translation: "Thương hiệu này được biết đến với độ tin cậy và độ bền.",
  },
  {
    id: 26,
    question: "We aim to provide the _______ possible service to our guests.",
    options: ["good", "better", "best", "well"],
    correct: "C",
    type: "Superlative",
    explanation:
      "So sánh nhất 'the best possible service' (dịch vụ tốt nhất có thể).",
    translation:
      "Chúng tôi hướng tới việc cung cấp dịch vụ tốt nhất có thể cho khách hàng.",
  },
  {
    id: 27,
    question: "Items purchased on clearance are not eligible _______ return.",
    options: ["to", "for", "with", "in"],
    correct: "B",
    type: "Adjective Collocation",
    explanation: "'Eligible for' (đủ điều kiện cho cái gì).",
    translation:
      "Các mặt hàng mua trong đợt xả kho không đủ điều kiện để trả lại.",
  },
  {
    id: 28,
    question: "The manager dealt with the customer's complaint _______.",
    options: [
      "professional",
      "profession",
      "professionally",
      "professionalism",
    ],
    correct: "C",
    type: "Adverb",
    explanation: "Cần trạng từ bổ nghĩa cho động từ 'dealt with' (xử lý).",
    translation:
      "Người quản lý đã xử lý khiếu nại của khách hàng một cách chuyên nghiệp.",
  },
  {
    id: 29,
    question: "_______ make a reservation, please call our hotline.",
    options: ["For", "To", "With", "By"],
    correct: "B",
    type: "Infinitive of Purpose",
    explanation: "Chỉ mục đích: 'To + V' (Để làm gì).",
    translation: "Để đặt chỗ, vui lòng gọi vào đường dây nóng của chúng tôi.",
  },
  {
    id: 30,
    question:
      "The department store is located _______ the street from the bank.",
    options: ["cross", "across", "crossing", "crossed"],
    correct: "B",
    type: "Prepositions",
    explanation: "'Across the street from' (bên kia đường so với).",
    translation: "Cửa hàng bách hóa nằm ở bên kia đường so với ngân hàng.",
  },
  {
    id: 31,
    question: "We only accept payment _______ cash or credit card.",
    options: ["by", "in", "with", "on"],
    correct: "A",
    type: "Prepositions",
    explanation:
      "'By' + phương thức (by cash/by credit card). Đôi khi dùng 'in cash', nhưng 'by' phổ biến cho cả hai.",
    translation:
      "Chúng tôi chỉ chấp nhận thanh toán bằng tiền mặt hoặc thẻ tín dụng.",
  },
  {
    id: 32,
    question: "The warranty covers any defects in materials or _______.",
    options: ["work", "worker", "workman", "workmanship"],
    correct: "D",
    type: "Vocabulary",
    explanation:
      "'Workmanship' (tay nghề/gia công). Cụm thường gặp: 'materials or workmanship'.",
    translation: "Bảo hành bao gồm mọi khiếm khuyết về vật liệu hoặc gia công.",
  },
  {
    id: 33,
    question: "_______ it rains, the outdoor concert will be moved indoors.",
    options: ["Unless", "If", "However", "Therefore"],
    correct: "B",
    type: "Conditional",
    explanation: "Câu điều kiện loại 1: 'If' (Nếu).",
    translation:
      "Nếu trời mưa, buổi hòa nhạc ngoài trời sẽ được chuyển vào trong nhà.",
  },
  {
    id: 34,
    question: "The selection of wines at this restaurant is _______.",
    options: ["exception", "except", "exceptional", "exceptionally"],
    correct: "C",
    type: "Adjective",
    explanation:
      "Sau động từ 'is' cần tính từ. 'Exceptional' (đặc biệt/xuất sắc).",
    translation: "Sự lựa chọn rượu vang tại nhà hàng này thật xuất sắc.",
  },
  {
    id: 35,
    question: "Customers can find the restroom _______ the end of the hall.",
    options: ["in", "on", "to", "at"],
    correct: "D",
    type: "Prepositions",
    explanation: "'At the end of' (ở cuối...).",
    translation: "Khách hàng có thể tìm thấy nhà vệ sinh ở cuối hành lang.",
  },
  {
    id: 36,
    question:
      "The sales associate was very _______ in helping me find the right size.",
    options: ["help", "helping", "helpful", "helpfully"],
    correct: "C",
    type: "Adjective",
    explanation: "Sau 'was' cần tính từ. 'Helpful' (nhiệt tình/có ích).",
    translation:
      "Nhân viên bán hàng rất nhiệt tình giúp tôi tìm kích cỡ phù hợp.",
  },
  {
    id: 37,
    question: "We strive to meet the _______ of all our customers.",
    options: ["expect", "expectant", "expectations", "expected"],
    correct: "C",
    type: "Noun",
    explanation: "'Meet the expectations' (đáp ứng kỳ vọng).",
    translation: "Chúng tôi cố gắng đáp ứng kỳ vọng của tất cả khách hàng.",
  },
  {
    id: 38,
    question:
      "The movie starts at 7:00, so let's meet _______ the theater at 6:45.",
    options: ["front", "in front of", "front of", "ahead"],
    correct: "B",
    type: "Prepositions",
    explanation: "'In front of' (phía trước).",
    translation:
      "Phim bắt đầu lúc 7:00, vì vậy hãy gặp nhau trước rạp lúc 6:45.",
  },
  {
    id: 39,
    question: "Do you offer any vegetarian _______ on the menu?",
    options: ["opt", "optional", "options", "optionally"],
    correct: "C",
    type: "Noun",
    explanation: "Cần danh từ số nhiều sau 'any'. 'Options' (lựa chọn).",
    translation:
      "Bạn có cung cấp bất kỳ lựa chọn chay nào trong thực đơn không?",
  },
  {
    id: 40,
    question:
      "Please sign up for our newsletter to receive _______ on new arrivals.",
    options: ["dates", "updated", "updates", "dating"],
    correct: "C",
    type: "Noun",
    explanation: "'Receive updates' (nhận cập nhật/thông tin mới).",
    translation:
      "Vui lòng đăng ký nhận bản tin để nhận thông tin cập nhật về hàng mới về.",
  },
  {
    id: 41,
    question: "The soup was too salty, _______ I couldn't finish it.",
    options: ["because", "so", "but", "although"],
    correct: "B",
    type: "Conjunctions",
    explanation: "Chỉ kết quả: 'so' (vì vậy/nên).",
    translation: "Món súp quá mặn, nên tôi không thể ăn hết.",
  },
  {
    id: 42,
    question: "Are there _______ tables available for a party of six?",
    options: ["some", "much", "any", "little"],
    correct: "C",
    type: "Quantifiers",
    explanation:
      "Câu nghi vấn dùng 'any'. 'Tables' đếm được nên không dùng 'much/little'.",
    translation: "Có bàn nào trống cho nhóm sáu người không?",
  },
  {
    id: 43,
    question:
      "The store is closed for renovations and will _______ next month.",
    options: ["reopen", "reopening", "opened", "opening"],
    correct: "A",
    type: "Verb Form",
    explanation: "Sau 'will' cần động từ nguyên thể. 'Reopen' (mở cửa lại).",
    translation:
      "Cửa hàng đang đóng cửa để sửa chữa và sẽ mở cửa lại vào tháng tới.",
  },
  {
    id: 44,
    question: "Your satisfaction is our top _______.",
    options: ["prior", "priority", "prioritize", "prioritized"],
    correct: "B",
    type: "Noun",
    explanation:
      "Cần danh từ sau tính từ 'top'. 'Top priority' (ưu tiên hàng đầu).",
    translation: "Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.",
  },
  {
    id: 45,
    question: "_______ you prefer tea or coffee with your dessert?",
    options: ["Will", "Did", "Do", "Would"],
    correct: "D",
    type: "Modal Verb",
    explanation:
      "Cấu trúc 'Would you prefer...?' (Bạn có muốn/thích... hơn không?).",
    translation: "Bạn thích dùng trà hay cà phê với món tráng miệng?",
  },
  {
    id: 46,
    question:
      "The grocery store is located _______ the post office and the bank.",
    options: ["among", "between", "next", "near"],
    correct: "B",
    type: "Prepositions",
    explanation: "'Between... and...' (ở giữa... và...).",
    translation: "Cửa hàng tạp hóa nằm giữa bưu điện và ngân hàng.",
  },
  {
    id: 47,
    question: "We apologize _______ any inconvenience this may cause.",
    options: ["to", "of", "with", "for"],
    correct: "D",
    type: "Prepositions",
    explanation: "'Apologize for' (xin lỗi vì cái gì).",
    translation:
      "Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào điều này có thể gây ra.",
  },
  {
    id: 48,
    question: "A service charge of 10% is _______ to the bill.",
    options: ["add", "added", "adding", "addition"],
    correct: "B",
    type: "Passive Voice",
    explanation: "Bị động: 'is added' (được cộng vào).",
    translation: "Phí dịch vụ 10% được cộng vào hóa đơn.",
  },
  {
    id: 49,
    question: "This coupon is _______ only at participating locations.",
    options: ["value", "valid", "validity", "validation"],
    correct: "B",
    type: "Adjective",
    explanation: "Cần tính từ sau 'is'. 'Valid' (có hiệu lực).",
    translation:
      "Phiếu giảm giá này chỉ có hiệu lực tại các địa điểm tham gia.",
  },
  {
    id: 50,
    question: "The chef is known for creating _______ desserts.",
    options: ["innovate", "innovator", "innovative", "innovation"],
    correct: "C",
    type: "Adjective",
    explanation:
      "Cần tính từ bổ nghĩa cho 'desserts'. 'Innovative' (sáng tạo/đổi mới).",
    translation:
      "Đầu bếp này nổi tiếng với việc tạo ra các món tráng miệng sáng tạo.",
  },
];

export default set5;
