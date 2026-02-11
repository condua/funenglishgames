// DATA: SET 3 (Focus: Traveling & Tourism)
const set3 = [
  {
    id: 1,
    question:
      "Passengers are required to show their boarding _______ at the gate.",
    options: ["pass", "passed", "passing", "passage"],
    correct: "A",
    type: "Compound Noun",
    explanation:
      "'Boarding pass' (thẻ lên máy bay) là danh từ ghép phổ biến trong du lịch.",
    translation: "Hành khách được yêu cầu xuất trình thẻ lên máy bay tại cổng.",
  },
  {
    id: 2,
    question: "The flight was delayed _______ severe weather conditions.",
    options: ["because", "due to", "since", "as"],
    correct: "B",
    type: "Prepositions",
    explanation:
      "'Due to' + Noun Phrase (nguyên nhân). 'Because/Since/As' + Mệnh đề.",
    translation: "Chuyến bay bị hoãn do điều kiện thời tiết khắc nghiệt.",
  },
  {
    id: 3,
    question:
      "We offer a complimentary shuttle service _______ the airport and the hotel.",
    options: ["among", "with", "between", "from"],
    correct: "C",
    type: "Prepositions",
    explanation: "Cấu trúc 'between... and...' (giữa... và...).",
    translation:
      "Chúng tôi cung cấp dịch vụ xe đưa đón miễn phí giữa sân bay và khách sạn.",
  },
  {
    id: 4,
    question: "Please ensure your seatbelt is _______ fastened during takeoff.",
    options: ["secure", "security", "securing", "securely"],
    correct: "D",
    type: "Adverb",
    explanation:
      "Cần trạng từ bổ nghĩa cho động từ 'fastened' (được thắt chặt một cách an toàn).",
    translation:
      "Vui lòng đảm bảo dây an toàn của bạn được thắt chặt trong quá trình cất cánh.",
  },
  {
    id: 5,
    question: "The tour guide suggested _______ at the museum for two hours.",
    options: ["stay", "staying", "stayed", "to stay"],
    correct: "B",
    type: "Gerund",
    explanation: "Sau động từ 'suggest' dùng V-ing.",
    translation: "Hướng dẫn viên gợi ý ở lại bảo tàng trong hai giờ.",
  },
  {
    id: 6,
    question: "All guests must check _______ before 11:00 AM.",
    options: ["out", "in", "up", "off"],
    correct: "A",
    type: "Phrasal Verbs",
    explanation: "'Check out': làm thủ tục trả phòng.",
    translation: "Tất cả khách phải trả phòng trước 11:00 sáng.",
  },
  {
    id: 7,
    question:
      "This travel package includes airfare, accommodation, and _______.",
    options: ["transport", "transporting", "transportation", "transported"],
    correct: "C",
    type: "Parallel Structure",
    explanation: "Cần danh từ để song song với 'airfare' và 'accommodation'.",
    translation:
      "Gói du lịch này bao gồm vé máy bay, chỗ ở và phương tiện đi lại.",
  },
  {
    id: 8,
    question: "_______ you book your tickets early, you will get a discount.",
    options: ["Unless", "If", "However", "Therefore"],
    correct: "B",
    type: "Conditional",
    explanation: "Câu điều kiện loại 1: 'If' (Nếu).",
    translation: "Nếu bạn đặt vé sớm, bạn sẽ được giảm giá.",
  },
  {
    id: 9,
    question: "The hotel is located _______ walking distance of the beach.",
    options: ["at", "on", "to", "within"],
    correct: "D",
    type: "Prepositions",
    explanation:
      "Cụm 'within walking distance' (trong khoảng cách có thể đi bộ).",
    translation: "Khách sạn nằm trong khoảng cách đi bộ đến bãi biển.",
  },
  {
    id: 10,
    question:
      "Ms. Tanaka is looking for a reliable travel _______ to plan her trip.",
    options: ["agency", "agent", "agenda", "acting"],
    correct: "B",
    type: "Vocabulary",
    explanation:
      "'Travel agent' (nhân viên đại lý du lịch - người) phù hợp ngữ cảnh Ms. Tanaka tìm người giúp.",
    translation:
      "Cô Tanaka đang tìm kiếm một nhân viên du lịch đáng tin cậy để lên kế hoạch cho chuyến đi.",
  },
  {
    id: 11,
    question:
      "Upon _______ at the destination, please contact our local representative.",
    options: ["arrive", "arrived", "arrival", "arrives"],
    correct: "C",
    type: "Word Form (Noun)",
    explanation:
      "Sau giới từ 'Upon' cần danh từ hoặc V-ing. 'Arrival' là danh từ (khi đến nơi).",
    translation:
      "Ngay khi đến nơi, vui lòng liên hệ với đại diện địa phương của chúng tôi.",
  },
  {
    id: 12,
    question: "The train to London departs _______ Platform 5.",
    options: ["from", "at", "in", "on"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Depart from' (khởi hành từ).",
    translation: "Tàu đi London khởi hành từ Sân ga số 5.",
  },
  {
    id: 13,
    question:
      "Luggage exceeding the weight limit is subject to an _______ fee.",
    options: ["addition", "additionally", "additional", "add"],
    correct: "C",
    type: "Adjective",
    explanation:
      "Cần tính từ bổ nghĩa cho danh từ 'fee'. 'Additional' (bổ sung/phụ thu).",
    translation: "Hành lý vượt quá giới hạn trọng lượng sẽ phải chịu thêm phí.",
  },
  {
    id: 14,
    question:
      "Travelers are advised to keep their passports in a _______ place.",
    options: ["safe", "safely", "safety", "save"],
    correct: "A",
    type: "Adjective",
    explanation: "Cần tính từ bổ nghĩa cho danh từ 'place'. 'Safe' (an toàn).",
    translation: "Du khách được khuyên nên giữ hộ chiếu ở một nơi an toàn.",
  },
  {
    id: 15,
    question:
      "Neither the flight attendants _______ the pilot knew about the technical issue.",
    options: ["or", "nor", "and", "but"],
    correct: "B",
    type: "Correlative Conjunctions",
    explanation: "Cấu trúc 'Neither... nor...'.",
    translation:
      "Cả tiếp viên hàng không lẫn phi công đều không biết về vấn đề kỹ thuật.",
  },
  {
    id: 16,
    question: "The resort offers a wide _______ of recreational activities.",
    options: ["vary", "various", "variety", "variable"],
    correct: "C",
    type: "Collocation",
    explanation: "'A wide variety of' (nhiều loại đa dạng).",
    translation: "Khu nghỉ dưỡng cung cấp đa dạng các hoạt động giải trí.",
  },
  {
    id: 17,
    question: "It is essential that every passenger _______ a valid visa.",
    options: ["has", "have", "having", "had"],
    correct: "B",
    type: "Subjunctive Mode",
    explanation: "Giả định cách: 'essential that + S + V(nguyên thể)'.",
    translation: "Điều cần thiết là mọi hành khách phải có thị thực hợp lệ.",
  },
  {
    id: 18,
    question:
      "The itinerary includes a visit to the historic _______ in the city center.",
    options: ["sight", "site", "cite", "sightseeing"],
    correct: "B",
    type: "Vocabulary",
    explanation: "'Historic site' (di tích lịch sử). 'Sight' là tầm nhìn/cảnh.",
    translation:
      "Hành trình bao gồm chuyến thăm di tích lịch sử ở trung tâm thành phố.",
  },
  {
    id: 19,
    question:
      "We enjoyed the _______ scenery during our train ride through the Alps.",
    options: ["speculate", "spectator", "spectacular", "spectacle"],
    correct: "C",
    type: "Adjective",
    explanation:
      "Cần tính từ bổ nghĩa cho 'scenery'. 'Spectacular' (hùng vĩ/ngoạn mục).",
    translation:
      "Chúng tôi đã thưởng ngoạn phong cảnh hùng vĩ trong chuyến đi tàu qua dãy Alps.",
  },
  {
    id: 20,
    question:
      "Please confirm your reservation _______ least 24 hours in advance.",
    options: ["in", "on", "by", "at"],
    correct: "D",
    type: "Idiom",
    explanation: "Cụm 'at least' (ít nhất).",
    translation: "Vui lòng xác nhận đặt chỗ của bạn trước ít nhất 24 giờ.",
  },
  {
    id: 21,
    question:
      "The concierge can provide recommendations _______ local restaurants.",
    options: ["for", "to", "with", "about"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Recommendations for' (gợi ý cho cái gì).",
    translation:
      "Nhân viên hỗ trợ khách hàng có thể cung cấp gợi ý cho các nhà hàng địa phương.",
  },
  {
    id: 22,
    question: "Mr. Lee is accumulating miles to qualify _______ elite status.",
    options: ["of", "for", "in", "to"],
    correct: "B",
    type: "Collocation",
    explanation: "'Qualify for' (đủ điều kiện cho cái gì).",
    translation:
      "Ông Lee đang tích lũy dặm bay để đủ điều kiện cho trạng thái thành viên cao cấp.",
  },
  {
    id: 23,
    question:
      "The airline apologized for the _______ caused by the cancellation.",
    options: ["inconvenient", "inconvenience", "inconveniently", "convenience"],
    correct: "B",
    type: "Word Form (Noun)",
    explanation: "Sau 'the' cần danh từ. 'Inconvenience' (sự bất tiện).",
    translation:
      "Hãng hàng không xin lỗi vì sự bất tiện gây ra do việc hủy chuyến.",
  },
  {
    id: 24,
    question: "_______ you prefer a window or an aisle seat?",
    options: ["Will", "Do", "Would", "Are"],
    correct: "C",
    type: "Modal Verb",
    explanation:
      "Cấu trúc lịch sự 'Would you prefer...?' (Bạn có thích... hơn không?).",
    translation: "Bạn thích ghế gần cửa sổ hay ghế gần lối đi hơn?",
  },
  {
    id: 25,
    question: "Guests are requested to vacate their rooms _______ noon.",
    options: ["until", "for", "on", "by"],
    correct: "D",
    type: "Prepositions",
    explanation: "'By noon' (trước 12 giờ trưa/muộn nhất là 12 giờ).",
    translation: "Khách được yêu cầu rời phòng trước 12 giờ trưa.",
  },
  {
    id: 26,
    question:
      "The new terminal is _______ constructed to handle more passengers.",
    options: ["be", "been", "being", "to be"],
    correct: "C",
    type: "Passive Voice (Continuous)",
    explanation: "Bị động tiếp diễn: 'is being + V3/ed' (đang được xây dựng).",
    translation: "Nhà ga mới đang được xây dựng để xử lý nhiều hành khách hơn.",
  },
  {
    id: 27,
    question:
      "We decided to extend our vacation _______ we were having such a great time.",
    options: ["because", "due to", "so", "therefore"],
    correct: "A",
    type: "Conjunctions",
    explanation: "'Because' + mệnh đề (chúng tôi đang vui vẻ).",
    translation:
      "Chúng tôi quyết định kéo dài kỳ nghỉ vì chúng tôi đang có khoảng thời gian tuyệt vời.",
  },
  {
    id: 28,
    question:
      "The travel insurance covers medical expenses incurred _______ abroad.",
    options: ["during", "while", "through", "when"],
    correct: "B",
    type: "Conjunction (Reduction)",
    explanation:
      "Rút gọn mệnh đề: 'while (you are) abroad'. 'During' cần danh từ.",
    translation:
      "Bảo hiểm du lịch chi trả các chi phí y tế phát sinh trong khi ở nước ngoài.",
  },
  {
    id: 29,
    question:
      "Many tourists visit the city specifically to _______ its architecture.",
    options: ["admiration", "admiring", "admire", "admired"],
    correct: "C",
    type: "Infinitive of Purpose",
    explanation: "Chỉ mục đích: 'to + V-inf' (để chiêm ngưỡng).",
    translation:
      "Nhiều du khách đến thăm thành phố đặc biệt để chiêm ngưỡng kiến trúc của nó.",
  },
  {
    id: 30,
    question: "Please hold on to the handrail _______ the bus is in motion.",
    options: ["during", "pending", "despite", "while"],
    correct: "D",
    type: "Conjunctions",
    explanation: "'While' + mệnh đề (xe buýt đang di chuyển).",
    translation: "Vui lòng giữ tay vịn trong khi xe buýt đang di chuyển.",
  },
  {
    id: 31,
    question: "The flight attendant asked us to turn off all _______ devices.",
    options: ["electric", "electricity", "electronic", "electronically"],
    correct: "C",
    type: "Adjective",
    explanation:
      "'Electronic devices' (thiết bị điện tử). 'Electric' thường chỉ thiết bị chạy bằng điện mạnh (quạt, đèn).",
    translation:
      "Tiếp viên hàng không yêu cầu chúng tôi tắt tất cả các thiết bị điện tử.",
  },
  {
    id: 32,
    question: "_______ having a valid ticket, he was denied boarding.",
    options: ["Despite", "Although", "Even", "However"],
    correct: "A",
    type: "Conjunctions",
    explanation: "'Despite' + V-ing/Noun Phrase (Mặc dù có vé...).",
    translation: "Mặc dù có vé hợp lệ, anh ấy vẫn bị từ chối lên máy bay.",
  },
  {
    id: 33,
    question: "This map shows the _______ of all major tourist attractions.",
    options: ["locate", "locations", "locating", "local"],
    correct: "B",
    type: "Word Form (Noun)",
    explanation: "Cần danh từ số nhiều sau 'the'. 'Locations' (các vị trí).",
    translation:
      "Bản đồ này hiển thị vị trí của tất cả các điểm du lịch chính.",
  },
  {
    id: 34,
    question: "Would you like to pay by credit card _______ cash?",
    options: ["and", "nor", "or", "with"],
    correct: "C",
    type: "Conjunctions",
    explanation: "Lựa chọn giữa A hoặc B -> dùng 'or'.",
    translation: "Bạn muốn thanh toán bằng thẻ tín dụng hay tiền mặt?",
  },
  {
    id: 35,
    question: "The view from the mountain top was truly _______.",
    options: ["breathed", "breathing", "breath", "breathtaking"],
    correct: "D",
    type: "Adjective",
    explanation: "Tính từ 'breathtaking' (đẹp ngoạn mục/đến mức nín thở).",
    translation: "Cảnh quan từ đỉnh núi thực sự ngoạn mục.",
  },
  {
    id: 36,
    question:
      "Passengers can check their flight status _______ the airline's website.",
    options: ["via", "along", "into", "onto"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Via' (thông qua/qua).",
    translation:
      "Hành khách có thể kiểm tra tình trạng chuyến bay thông qua trang web của hãng hàng không.",
  },
  {
    id: 37,
    question: "We have arranged for a car to _______ you up at the airport.",
    options: ["take", "pick", "get", "bring"],
    correct: "B",
    type: "Phrasal Verbs",
    explanation: "'Pick someone up' (đón ai đó).",
    translation: "Chúng tôi đã sắp xếp xe để đón bạn tại sân bay.",
  },
  {
    id: 38,
    question: "The cruise ship offers entertainment suitable _______ all ages.",
    options: ["with", "to", "for", "by"],
    correct: "C",
    type: "Adjective Collocation",
    explanation: "'Suitable for' (phù hợp cho).",
    translation:
      "Du thuyền cung cấp các chương trình giải trí phù hợp cho mọi lứa tuổi.",
  },
  {
    id: 39,
    question: "Please fill out the customs declaration form _______.",
    options: ["complete", "completed", "completion", "completely"],
    correct: "D",
    type: "Adverb",
    explanation: "Cần trạng từ bổ nghĩa cho động từ 'fill out'.",
    translation: "Vui lòng điền hoàn chỉnh vào tờ khai hải quan.",
  },
  {
    id: 40,
    question:
      "_______ frequent delays, the train is still the most popular mode of transport.",
    options: ["Despite", "Although", "Even if", "Unless"],
    correct: "A",
    type: "Prepositions",
    explanation: "'Despite' + Noun Phrase (những sự chậm trễ thường xuyên).",
    translation:
      "Mặc dù thường xuyên bị chậm trễ, tàu hỏa vẫn là phương tiện giao thông phổ biến nhất.",
  },
  {
    id: 41,
    question: "The souvenir shop is located _______ the hotel lobby.",
    options: ["next", "near", "nearly", "nearing"],
    correct: "B",
    type: "Prepositions",
    explanation: "'Near' (gần). 'Next' phải đi với 'to' (next to).",
    translation: "Cửa hàng lưu niệm nằm gần sảnh khách sạn.",
  },
  {
    id: 42,
    question: "Travelers are reminded to _______ their belongings unattended.",
    options: ["not leave", "do not leave", "no leaving", "not left"],
    correct: "A",
    type: "Infinitive (Negative)",
    explanation:
      "Cấu trúc 'remind someone to V'. Phủ định là 'remind someone not to V'. Ở đây 'leave' là V chính.",
    translation:
      "Du khách được nhắc nhở không để đồ đạc của mình mà không có người trông coi.",
  },
  {
    id: 43,
    question:
      "This ticket is valid for three days _______ the date of purchase.",
    options: ["since", "until", "from", "at"],
    correct: "C",
    type: "Prepositions",
    explanation: "'From the date of...' (tính từ ngày...).",
    translation: "Vé này có giá trị trong ba ngày kể từ ngày mua.",
  },
  {
    id: 44,
    question: "The hotel staff was very _______ in arranging our tours.",
    options: ["help", "helper", "helpfully", "helpful"],
    correct: "D",
    type: "Adjective",
    explanation: "Sau 'was' cần tính từ. 'Helpful' (hữu ích/nhiệt tình).",
    translation:
      "Nhân viên khách sạn rất nhiệt tình trong việc sắp xếp các chuyến tham quan của chúng tôi.",
  },
  {
    id: 45,
    question: "You should carry your valuables in your _______ luggage.",
    options: ["hand", "handle", "handling", "handed"],
    correct: "A",
    type: "Compound Noun",
    explanation: "'Hand luggage' (hành lý xách tay).",
    translation: "Bạn nên mang theo đồ có giá trị trong hành lý xách tay.",
  },
  {
    id: 46,
    question:
      "The flight to Paris has been cancelled; _______, passengers will be refunded.",
    options: ["because", "therefore", "although", "but"],
    correct: "B",
    type: "Connectors",
    explanation:
      "Dấu chấm phẩy ngăn cách hai mệnh đề kết quả -> dùng 'therefore' (do đó).",
    translation:
      "Chuyến bay đến Paris đã bị hủy; do đó, hành khách sẽ được hoàn tiền.",
  },
  {
    id: 47,
    question: "It is advisable to check the weather forecast _______ packing.",
    options: ["after", "then", "before", "during"],
    correct: "C",
    type: "Prepositions/Time",
    explanation: "Nên kiểm tra thời tiết 'trước khi' đóng gói hành lý.",
    translation:
      "Bạn nên kiểm tra dự báo thời tiết trước khi đóng gói hành lý.",
  },
  {
    id: 48,
    question: "The museum offers discounted tickets for _______ citizens.",
    options: ["senator", "senior", "superior", "junior"],
    correct: "B",
    type: "Collocation",
    explanation: "'Senior citizens' (người cao tuổi).",
    translation: "Bảo tàng cung cấp vé giảm giá cho người cao tuổi.",
  },
  {
    id: 49,
    question: "We are looking forward to _______ you on board soon.",
    options: ["welcome", "welcomed", "will welcome", "welcoming"],
    correct: "D",
    type: "Gerund",
    explanation: "'Look forward to + V-ing'.",
    translation: "Chúng tôi rất mong được chào đón bạn trên tàu bay sớm.",
  },
  {
    id: 50,
    question: "Make sure to _______ your booking reference number.",
    options: ["retain", "remained", "return", "reservation"],
    correct: "A",
    type: "Vocabulary",
    explanation: "'Retain' (giữ lại/lưu giữ).",
    translation: "Hãy chắc chắn giữ lại mã số đặt chỗ của bạn.",
  },
];

export default set3;
