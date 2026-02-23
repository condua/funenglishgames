import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Volume2,
  Settings2,
  Eye,
  EyeOff,
  Play,
  Sparkles,
  Flag,
  LayoutGrid,
  X,
} from "lucide-react";

// Dữ liệu 100 câu hỏi gốc
const rawQuizData = [
  // --- WHERE (1-10) ---
  {
    q: "1. Where is the new fax machine?",
    ipa: "/wɛr ɪz ðə nuː fæks məˈʃiːn/",
    meaning: "Máy fax mới ở đâu?",
    options: [
      "A. Next to the water cooler.",
      "B. By tomorrow morning.",
      "C. Yes, it's a new machine.",
    ],
    optionsMeaning: [
      "A. Cạnh cây nước lọc.",
      "B. Trước sáng ngày mai.",
      "C. Vâng, nó là một chiếc máy mới.",
    ],
    answer: "A. Next to the water cooler.",
    explanation:
      "Câu hỏi 'Where' (Ở đâu) cần đáp án chỉ nơi chốn. Đáp án A là địa điểm. B trả lời cho When, C dính bẫy lặp từ 'machine'.",
  },
  {
    q: "2. Where did you leave the client files?",
    ipa: "/wɛr dɪd ju liːv ðə ˈklaɪənt faɪlz/",
    meaning: "Bạn đã để hồ sơ khách hàng ở đâu?",
    options: ["A. He left early.", "B. On your desk.", "C. About 50 pages."],
    optionsMeaning: [
      "A. Anh ấy đã rời đi sớm.",
      "B. Trên bàn làm việc của bạn.",
      "C. Khoảng 50 trang.",
    ],
    answer: "B. On your desk.",
    explanation:
      "Câu hỏi 'Where'. Đáp án B (Trên bàn) chỉ nơi chốn. A bẫy lặp từ 'leave/left', C trả lời cho 'How many/How long'.",
  },
  {
    q: "3. Where are the application forms?",
    ipa: "/wɛr ɑr ði ˌæpləˈkeɪʃən fɔrmz/",
    meaning: "Các mẫu đơn xin việc ở đâu?",
    options: [
      "A. Please fill it out.",
      "B. In the filing cabinet.",
      "C. To apply for a job.",
    ],
    optionsMeaning: [
      "A. Vui lòng điền vào nó.",
      "B. Trong tủ đựng hồ sơ.",
      "C. Để ứng tuyển công việc.",
    ],
    answer: "B. In the filing cabinet.",
    explanation:
      "Câu hỏi 'Where'. 'In the filing cabinet' (Trong tủ hồ sơ) là đáp án đúng. A và C là bẫy từ vựng liên quan đến 'application'.",
  },
  {
    q: "4. Where can I buy a train ticket?",
    ipa: "/wɛr kæn aɪ baɪ ə treɪn ˈtɪkɪt/",
    meaning: "Tôi có thể mua vé tàu ở đâu?",
    options: [
      "A. At the counter over there.",
      "B. It costs 50 dollars.",
      "C. Yes, I train every day.",
    ],
    optionsMeaning: [
      "A. Tại quầy đằng kia.",
      "B. Nó giá 50 đô la.",
      "C. Vâng, tôi tập luyện mỗi ngày.",
    ],
    answer: "A. At the counter over there.",
    explanation:
      "Câu hỏi 'Where'. A chỉ địa điểm (tại quầy). B trả lời 'How much'. C bẫy từ đồng âm/nhiều nghĩa 'train'.",
  },
  {
    q: "5. Where should we have the staff lunch?",
    ipa: "/wɛr ʃʊd wi hæv ðə stæf lʌnʧ/",
    meaning: "Chúng ta nên ăn trưa cùng nhân viên ở đâu?",
    options: [
      "A. It was a great meal.",
      "B. At the new Italian restaurant.",
      "C. A group of 12 people.",
    ],
    optionsMeaning: [
      "A. Đó là một bữa ăn tuyệt vời.",
      "B. Tại nhà hàng Ý mới mở.",
      "C. Một nhóm 12 người.",
    ],
    answer: "B. At the new Italian restaurant.",
    explanation:
      "Câu hỏi 'Where'. B đưa ra một địa điểm cụ thể. A bẫy thì quá khứ, C trả lời cho 'How many'.",
  },
  {
    q: "6. Where is the manager's office?",
    ipa: "/wɛr ɪz ðə ˈmænəʤərz ˈɔfɪs/",
    meaning: "Văn phòng của quản lý ở đâu?",
    options: [
      "A. On the second floor.",
      "B. To manage the team.",
      "C. He is an officer.",
    ],
    optionsMeaning: [
      "A. Ở trên tầng hai.",
      "B. Để quản lý nhóm.",
      "C. Anh ấy là một sĩ quan.",
    ],
    answer: "A. On the second floor.",
    explanation:
      "Câu hỏi 'Where'. 'On the second floor' (tầng 2) là nơi chốn. B và C bẫy từ vựng 'manage' và 'office/officer'.",
  },
  {
    q: "7. Where did you park your car?",
    ipa: "/wɛr dɪd ju pɑrk jʊr kɑr/",
    meaning: "Bạn đã đỗ xe ở đâu?",
    options: [
      "A. In the underground garage.",
      "B. It's a public park.",
      "C. Around 8 o'clock.",
    ],
    optionsMeaning: [
      "A. Trong gara tầng hầm.",
      "B. Đó là một công viên công cộng.",
      "C. Khoảng 8 giờ.",
    ],
    answer: "A. In the underground garage.",
    explanation:
      "Câu hỏi 'Where'. A chỉ địa điểm (bãi xe ngầm). B bẫy từ 'park' (công viên/đỗ xe). C trả lời cho 'When'.",
  },
  {
    q: "8. Where do you store the extra office supplies?",
    ipa: "/wɛr du ju stɔr ði ˈɛkstrə ˈɔfɪs səˈplaɪz/",
    meaning: "Bạn cất giữ đồ dùng văn phòng thừa ở đâu?",
    options: [
      "A. We need more paper.",
      "B. In the supply closet.",
      "C. I bought it at the store.",
    ],
    optionsMeaning: [
      "A. Chúng ta cần thêm giấy.",
      "B. Trong tủ đựng đồ tiếp liệu.",
      "C. Tôi đã mua nó ở cửa hàng.",
    ],
    answer: "B. In the supply closet.",
    explanation:
      "Câu hỏi 'Where'. B chỉ nơi chốn. A là câu trần thuật không liên quan, C bẫy lặp từ 'store'.",
  },
  {
    q: "9. Where will the conference be held this year?",
    ipa: "/wɛr wɪl ðə ˈkɑnfərəns bi hɛld ðɪs jɪr/",
    meaning: "Hội nghị sẽ được tổ chức ở đâu trong năm nay?",
    options: [
      "A. It was held in Tokyo.",
      "B. Probably in London.",
      "C. To discuss the budget.",
    ],
    optionsMeaning: [
      "A. Nó đã được tổ chức ở Tokyo.",
      "B. Có lẽ là ở London.",
      "C. Để thảo luận về ngân sách.",
    ],
    answer: "B. Probably in London.",
    explanation:
      "Câu hỏi 'Where' + tương lai (will). B chỉ địa điểm. A bẫy thì quá khứ (was held). C trả lời cho 'Why'.",
  },
  {
    q: "10. Where is the closest ATM?",
    ipa: "/wɛr ɪz ðə ˈkloʊsəst eɪ-ti-ɛm/",
    meaning: "Máy ATM gần nhất ở đâu?",
    options: [
      "A. Just across the street.",
      "B. I need some cash.",
      "C. It closes at 5 PM.",
    ],
    optionsMeaning: [
      "A. Ngay bên kia đường.",
      "B. Tôi cần một ít tiền mặt.",
      "C. Nó đóng cửa lúc 5 giờ chiều.",
    ],
    answer: "A. Just across the street.",
    explanation:
      "Câu hỏi 'Where'. A chỉ vị trí (ngay bên kia đường). B là một câu nói bâng quơ, C bẫy từ phát âm giống 'closest/closes'.",
  },

  // --- WHEN (11-20) ---
  {
    q: "11. When is the project deadline?",
    ipa: "/wɛn ɪz ðə ˈprɑʤɛkt ˈdɛdˌlaɪn/",
    meaning: "Hạn chót của dự án là khi nào?",
    options: [
      "A. By the end of the week.",
      "B. It's on the top shelf.",
      "C. Yes, the line is busy.",
    ],
    optionsMeaning: [
      "A. Trước cuối tuần này.",
      "B. Nó ở trên kệ trên cùng.",
      "C. Vâng, đường dây đang bận.",
    ],
    answer: "A. By the end of the week.",
    explanation:
      "Câu hỏi 'When' (Khi nào). A chỉ thời gian. B trả lời cho 'Where'. C bẫy lặp từ 'line/deadline'.",
  },
  {
    q: "12. When will the repairs be finished?",
    ipa: "/wɛn wɪl ðə rɪˈpɛrz bi ˈfɪnɪʃt/",
    meaning: "Khi nào việc sửa chữa sẽ hoàn thành?",
    options: [
      "A. A pair of shoes.",
      "B. By Tuesday at the latest.",
      "C. The mechanic is here.",
    ],
    optionsMeaning: [
      "A. Một đôi giày.",
      "B. Muộn nhất là vào thứ Ba.",
      "C. Thợ máy đang ở đây.",
    ],
    answer: "B. By Tuesday at the latest.",
    explanation:
      "Câu hỏi 'When'. B chỉ thời gian (Muộn nhất là thứ Ba). A bẫy phát âm 'repairs/pair'. C không trả lời trực tiếp thời gian.",
  },
  {
    q: "13. When did the shipment arrive?",
    ipa: "/wɛn dɪd ðə ˈʃɪpmənt əˈraɪv/",
    meaning: "Lô hàng đã đến khi nào?",
    options: ["A. By ship.", "B. Yesterday afternoon.", "C. It's very heavy."],
    optionsMeaning: [
      "A. Bằng tàu thủy.",
      "B. Chiều hôm qua.",
      "C. Nó rất nặng.",
    ],
    answer: "B. Yesterday afternoon.",
    explanation:
      "Câu hỏi 'When' thì quá khứ. B là thời điểm trong quá khứ. A bẫy lặp gốc từ 'ship/shipment'. C miêu tả tính chất.",
  },
  {
    q: "14. When are you taking your vacation?",
    ipa: "/wɛn ɑr ju ˈteɪkɪŋ jʊr veɪˈkeɪʃən/",
    meaning: "Khi nào bạn sẽ đi nghỉ mát?",
    options: ["A. Sometime in August.", "B. To Hawaii.", "C. Yes, I am."],
    optionsMeaning: [
      "A. Một lúc nào đó trong tháng 8.",
      "B. Tới Hawaii.",
      "C. Vâng, tôi đang làm thế.",
    ],
    answer: "A. Sometime in August.",
    explanation:
      "Câu hỏi 'When'. A chỉ thời gian (Vào tháng 8). B trả lời cho 'Where'. C bẫy Yes/No (không dùng Yes/No cho câu hỏi Wh-).",
  },
  {
    q: "15. When does the movie start?",
    ipa: "/wɛn dʌz ðə ˈmuvi stɑrt/",
    meaning: "Khi nào bộ phim bắt đầu?",
    options: [
      "A. In about ten minutes.",
      "B. It's a comedy.",
      "C. At the downtown cinema.",
    ],
    optionsMeaning: [
      "A. Trong khoảng mười phút nữa.",
      "B. Đó là một bộ phim hài.",
      "C. Tại rạp chiếu phim trung tâm thành phố.",
    ],
    answer: "A. In about ten minutes.",
    explanation:
      "Câu hỏi 'When'. A chỉ khoảng thời gian sắp tới (Khoảng 10 phút nữa). B trả lời 'What kind'. C trả lời 'Where'.",
  },
  {
    q: "16. When was the company founded?",
    ipa: "/wɛn wʌz ðə ˈkʌmpəni ˈfaʊndəd/",
    meaning: "Công ty được thành lập khi nào?",
    options: [
      "A. I found it online.",
      "B. More than 20 years ago.",
      "C. He is the founder.",
    ],
    optionsMeaning: [
      "A. Tôi đã tìm thấy nó trên mạng.",
      "B. Hơn 20 năm trước.",
      "C. Anh ấy là người sáng lập.",
    ],
    answer: "B. More than 20 years ago.",
    explanation:
      "Câu hỏi 'When'. B chỉ mốc thời gian quá khứ. A bẫy từ 'founded/found'. C bẫy từ 'founded/founder'.",
  },
  {
    q: "17. When is the next bus to the airport?",
    ipa: "/wɛn ɪz ðə nɛkst bʌs tʊ ði ˈɛrˌpɔrt/",
    meaning: "Khi nào có chuyến xe buýt tiếp theo đến sân bay?",
    options: [
      "A. There's one at 3:15.",
      "B. It's a comfortable ride.",
      "C. Gate number 4.",
    ],
    optionsMeaning: [
      "A. Có một chuyến lúc 3:15.",
      "B. Đó là một chuyến đi thoải mái.",
      "C. Cổng số 4.",
    ],
    answer: "A. There's one at 3:15.",
    explanation:
      "Câu hỏi 'When'. A chỉ thời gian cụ thể. B mô tả chuyến đi, C trả lời cho 'Where'.",
  },
  {
    q: "18. When will the manager return from his business trip?",
    ipa: "/wɛn wɪl ðə ˈmænəʤər rɪˈtɜrn frʌm hɪz ˈbɪznəs trɪp/",
    meaning: "Khi nào người quản lý sẽ trở về từ chuyến công tác?",
    options: [
      "A. A round-trip ticket.",
      "B. Not until Friday.",
      "C. To meet a client.",
    ],
    optionsMeaning: [
      "A. Một vé khứ hồi.",
      "B. Mãi cho đến thứ Sáu.",
      "C. Để gặp một khách hàng.",
    ],
    answer: "B. Not until Friday.",
    explanation:
      "Câu hỏi 'When'. B chỉ mốc thời gian (Mãi cho đến thứ Sáu). A bẫy từ 'trip'. C trả lời 'Why'.",
  },
  {
    q: "19. When is the rent due?",
    ipa: "/wɛn ɪz ðə rɛnt du/",
    meaning: "Khi nào đến hạn trả tiền thuê nhà?",
    options: [
      "A. On the first of every month.",
      "B. It's 500 dollars.",
      "C. I rented a car.",
    ],
    optionsMeaning: [
      "A. Vào ngày đầu tiên của mỗi tháng.",
      "B. Nó giá 500 đô la.",
      "C. Tôi đã thuê một chiếc ô tô.",
    ],
    answer: "A. On the first of every month.",
    explanation:
      "Câu hỏi 'When'. A chỉ thời điểm (Ngày đầu tiên mỗi tháng). B trả lời 'How much'. C bẫy từ 'rent/rented'.",
  },
  {
    q: "20. When do you usually go to the gym?",
    ipa: "/wɛn du ju ˈjuʒəwəli goʊ tʊ ðə ʤɪm/",
    meaning: "Bạn thường đi tập gym khi nào?",
    options: ["A. Near my office.", "B. Right after work.", "C. No, I don't."],
    optionsMeaning: [
      "A. Gần văn phòng của tôi.",
      "B. Ngay sau giờ làm việc.",
      "C. Không, tôi không đi.",
    ],
    answer: "B. Right after work.",
    explanation:
      "Câu hỏi 'When'. B chỉ thời gian thường xuyên (Ngay sau giờ làm). A trả lời 'Where'. C sai vì dùng Yes/No cho câu hỏi Wh-.",
  },

  // --- WHO (21-30) ---
  {
    q: "21. Who is the new branch manager?",
    ipa: "/hu ɪz ðə nu brænʧ ˈmænəʤər/",
    meaning: "Giám đốc chi nhánh mới là ai?",
    options: [
      "A. Her name is Sarah.",
      "B. In the main office.",
      "C. Yes, it's very new.",
    ],
    optionsMeaning: [
      "A. Tên cô ấy là Sarah.",
      "B. Trong văn phòng chính.",
      "C. Vâng, nó rất mới.",
    ],
    answer: "A. Her name is Sarah.",
    explanation:
      "Câu hỏi 'Who' (Ai). A chỉ tên người. B trả lời 'Where'. C sai vì dùng Yes/No cho câu Wh-.",
  },
  {
    q: "22. Who left this package on my desk?",
    ipa: "/hu lɛft ðɪs ˈpækəʤ ɑn maɪ dɛsk/",
    meaning: "Ai đã để gói hàng này trên bàn của tôi?",
    options: [
      "A. The delivery guy brought it.",
      "B. It's a small box.",
      "C. Turn right at the desk.",
    ],
    optionsMeaning: [
      "A. Anh giao hàng đã mang nó tới.",
      "B. Nó là một cái hộp nhỏ.",
      "C. Rẽ phải ở chỗ cái bàn.",
    ],
    answer: "A. The delivery guy brought it.",
    explanation:
      "Câu hỏi 'Who'. A chỉ đối tượng (người giao hàng). B miêu tả gói hàng. C bẫy từ 'desk'.",
  },
  {
    q: "23. Who is responsible for organizing the event?",
    ipa: "/hu ɪz rɪˈspɑnsəbəl fɔr ˈɔrgəˌnaɪzɪŋ ði ɪˈvɛnt/",
    meaning: "Ai chịu trách nhiệm tổ chức sự kiện?",
    options: [
      "A. The marketing department.",
      "B. It was a great success.",
      "C. Next weekend.",
    ],
    optionsMeaning: [
      "A. Bộ phận tiếp thị.",
      "B. Nó là một thành công lớn.",
      "C. Cuối tuần tới.",
    ],
    answer: "A. The marketing department.",
    explanation:
      "Câu hỏi 'Who'. A chỉ bộ phận phụ trách (một nhóm người). B là nhận xét. C trả lời 'When'.",
  },
  {
    q: "24. Who holds the key to the supply closet?",
    ipa: "/hu hoʊldz ðə ki tʊ ðə səˈplaɪ ˈklɑzət/",
    meaning: "Ai giữ chìa khóa của tủ đựng đồ dùng?",
    options: [
      "A. Please close the door.",
      "B. The security guard has it.",
      "C. No, it's not locked.",
    ],
    optionsMeaning: [
      "A. Vui lòng đóng cửa lại.",
      "B. Nhân viên bảo vệ đang giữ nó.",
      "C. Không, nó không bị khóa.",
    ],
    answer: "B. The security guard has it.",
    explanation:
      "Câu hỏi 'Who'. B chỉ người (nhân viên bảo vệ). A bẫy phát âm 'closet/close'. C dùng Yes/No sai luật.",
  },
  {
    q: "25. Who should I contact if I have a problem?",
    ipa: "/hu ʃʊd aɪ ˈkɑntækt ɪf aɪ hæv ə ˈprɑbləm/",
    meaning: "Tôi nên liên hệ với ai nếu gặp sự cố?",
    options: [
      "A. The contract is signed.",
      "B. Call the IT helpdesk.",
      "C. It's not a big problem.",
    ],
    optionsMeaning: [
      "A. Hợp đồng đã được ký.",
      "B. Hãy gọi cho bộ phận hỗ trợ IT.",
      "C. Đó không phải là một vấn đề lớn.",
    ],
    answer: "B. Call the IT helpdesk.",
    explanation:
      "Câu hỏi 'Who'. B đưa ra giải pháp liên hệ một bộ phận (IT helpdesk). A bẫy phát âm 'contact/contract'. C lặp từ 'problem'.",
  },
  {
    q: "26. Who wrote this report?",
    ipa: "/hu roʊt ðɪs rɪˈpɔrt/",
    meaning: "Ai đã viết bản báo cáo này?",
    options: [
      "A. It's about sales.",
      "B. Mr. Johnson did.",
      "C. I need to report a problem.",
    ],
    optionsMeaning: [
      "A. Nó nói về doanh số.",
      "B. Ông Johnson đã viết.",
      "C. Tôi cần báo cáo một vấn đề.",
    ],
    answer: "B. Mr. Johnson did.",
    explanation:
      "Câu hỏi 'Who'. B chỉ người cụ thể. A trả lời 'What'. C bẫy lặp từ 'report' với nghĩa động từ.",
  },
  {
    q: "27. Who is going to pick up the client at the airport?",
    ipa: "/hu ɪz ˈgoʊɪŋ tʊ pɪk ʌp ðə ˈklaɪənt æt ði ˈɛrˌpɔrt/",
    meaning: "Ai sẽ đón khách hàng tại sân bay?",
    options: [
      "A. A taxi driver.",
      "B. My flight is delayed.",
      "C. I'll do it.",
    ],
    optionsMeaning: [
      "A. Một tài xế taxi.",
      "B. Chuyến bay của tôi bị hoãn.",
      "C. Tôi sẽ làm việc đó.",
    ],
    answer: "C. I'll do it.",
    explanation:
      "Câu hỏi 'Who'. C là đáp án đúng (Tôi sẽ làm). A bẫy từ vựng liên quan nhưng không hợp ngữ cảnh nội bộ. B bẫy từ 'flight'.",
  },
  {
    q: "28. Who won the Employee of the Month award?",
    ipa: "/hu wʌn ði ɛmˈplɔɪi ʌv ðə mʌnθ əˈwɔrd/",
    meaning: "Ai đã giành giải Nhân viên của Tháng?",
    options: [
      "A. Every month.",
      "B. A cash prize.",
      "C. David from accounting.",
    ],
    optionsMeaning: [
      "A. Mỗi tháng.",
      "B. Một giải thưởng tiền mặt.",
      "C. David từ phòng kế toán.",
    ],
    answer: "C. David from accounting.",
    explanation:
      "Câu hỏi 'Who'. C chỉ tên người cụ thể. A bẫy lặp từ 'month'. B trả lời 'What'.",
  },
  {
    q: "29. Who designed the company's new logo?",
    ipa: "/hu dɪˈzaɪnd ðə ˈkʌmpəniz nu ˈloʊgoʊ/",
    meaning: "Ai đã thiết kế logo mới của công ty?",
    options: [
      "A. A local graphic designer.",
      "B. It looks very modern.",
      "C. On the website.",
    ],
    optionsMeaning: [
      "A. Một nhà thiết kế đồ họa địa phương.",
      "B. Nó trông rất hiện đại.",
      "C. Trên trang web.",
    ],
    answer: "A. A local graphic designer.",
    explanation:
      "Câu hỏi 'Who'. A chỉ người (nhà thiết kế đồ họa). B là nhận xét. C trả lời 'Where'.",
  },
  {
    q: "30. Who has the copy of the agenda?",
    ipa: "/hu hæz ðə ˈkɑpi ʌv ði əˈʤɛndə/",
    meaning: "Ai giữ bản sao của chương trình nghị sự?",
    options: [
      "A. I made 10 copies.",
      "B. I believe Lisa has it.",
      "C. At the meeting.",
    ],
    optionsMeaning: [
      "A. Tôi đã tạo 10 bản sao.",
      "B. Tôi tin là Lisa đang giữ nó.",
      "C. Tại cuộc họp.",
    ],
    answer: "B. I believe Lisa has it.",
    explanation:
      "Câu hỏi 'Who'. B chỉ người. A bẫy lặp từ 'copy'. C trả lời 'Where/When'.",
  },

  // --- WHY (31-40) ---
  {
    q: "31. Why is the street closed?",
    ipa: "/waɪ ɪz ðə strit kloʊzd/",
    meaning: "Tại sao con đường lại bị rào lại/đóng?",
    options: [
      "A. They are repairing the road.",
      "B. A clothing store.",
      "C. Because it's too far.",
    ],
    optionsMeaning: [
      "A. Họ đang sửa chữa con đường.",
      "B. Một cửa hàng quần áo.",
      "C. Bởi vì nó quá xa.",
    ],
    answer: "A. They are repairing the road.",
    explanation:
      "Câu hỏi 'Why' (Tại sao). A đưa ra lý do hợp lý (sửa đường). B bẫy phát âm 'closed/clothing'. C dùng 'Because' nhưng lý do vô lý.",
  },
  {
    q: "32. Why did you cancel the meeting?",
    ipa: "/waɪ dɪd ju ˈkænsəl ðə ˈmitɪŋ/",
    meaning: "Tại sao bạn lại hủy cuộc họp?",
    options: [
      "A. I'll meet you there.",
      "B. The client was sick.",
      "C. At 2 PM.",
    ],
    optionsMeaning: [
      "A. Tôi sẽ gặp bạn ở đó.",
      "B. Khách hàng bị ốm.",
      "C. Lúc 2 giờ chiều.",
    ],
    answer: "B. The client was sick.",
    explanation:
      "Câu hỏi 'Why'. B đưa ra lý do (khách hàng bị ốm). A bẫy lặp từ 'meet'. C trả lời 'When'.",
  },
  {
    q: "33. Why is everyone leaving so early?",
    ipa: "/waɪ ɪz ˈɛvriˌwʌn ˈlivɪŋ soʊ ˈɜrli/",
    meaning: "Tại sao mọi người lại về sớm như vậy?",
    options: [
      "A. There's a severe snowstorm warning.",
      "B. He left yesterday.",
      "C. Very early in the morning.",
    ],
    optionsMeaning: [
      "A. Có một cảnh báo bão tuyết nghiêm trọng.",
      "B. Anh ấy đã rời đi ngày hôm qua.",
      "C. Rất sớm vào buổi sáng.",
    ],
    answer: "A. There's a severe snowstorm warning.",
    explanation:
      "Câu hỏi 'Why'. A đưa ra lý do (cảnh báo bão tuyết). B và C lặp các từ trong câu hỏi.",
  },
  {
    q: "34. Why wasn't I informed about the schedule change?",
    ipa: "/waɪ ˈwɑzənt aɪ ɪnˈfɔrmd əˈbaʊt ðə ˈskɛʤʊl ʧeɪnʤ/",
    meaning: "Tại sao tôi không được thông báo về việc thay đổi lịch trình?",
    options: [
      "A. We sent you an email this morning.",
      "B. I need to change my clothes.",
      "C. A busy schedule.",
    ],
    optionsMeaning: [
      "A. Chúng tôi đã gửi email cho bạn sáng nay.",
      "B. Tôi cần thay quần áo.",
      "C. Một lịch trình bận rộn.",
    ],
    answer: "A. We sent you an email this morning.",
    explanation:
      "Câu hỏi 'Why'. A giải thích rằng đã có thông báo rồi. B bẫy lặp từ 'change'. C lặp từ 'schedule'.",
  },
  {
    q: "35. Why are office supplies so low?",
    ipa: "/waɪ ɑr ˈɔfɪs səˈplaɪz soʊ loʊ/",
    meaning: "Tại sao đồ dùng văn phòng lại còn ít như vậy?",
    options: [
      "A. On the bottom shelf.",
      "B. We haven't ordered any recently.",
      "C. A surprise party.",
    ],
    optionsMeaning: [
      "A. Ở trên kệ dưới cùng.",
      "B. Gần đây chúng tôi chưa đặt thêm gì cả.",
      "C. Một bữa tiệc bất ngờ.",
    ],
    answer: "B. We haven't ordered any recently.",
    explanation:
      "Câu hỏi 'Why'. B đưa ra lý do (chưa đặt hàng). A bẫy nghĩa từ 'low' (bottom shelf).",
  },
  {
    q: "36. Why did the alarm go off?",
    ipa: "/waɪ dɪd ði əˈlɑrm goʊ ɔf/",
    meaning: "Tại sao chuông báo động lại reo?",
    options: [
      "A. I turned it off.",
      "B. It goes off at 6 AM.",
      "C. Someone burnt their toast in the breakroom.",
    ],
    optionsMeaning: [
      "A. Tôi đã tắt nó đi.",
      "B. Nó reo lúc 6 giờ sáng.",
      "C. Ai đó đã làm cháy bánh mì nướng của họ trong phòng nghỉ.",
    ],
    answer: "C. Someone burnt their toast in the breakroom.",
    explanation:
      "Câu hỏi 'Why'. C đưa ra nguyên nhân (ai đó làm cháy bánh mì). A và B bẫy lặp cụm 'go off/turn off'.",
  },
  {
    q: "37. Why is the internet so slow today?",
    ipa: "/waɪ ɪz ði ˈɪntərˌnɛt soʊ sloʊ təˈdeɪ/",
    meaning: "Tại sao hôm nay mạng internet lại chậm thế?",
    options: [
      "A. The IT team is updating the server.",
      "B. I don't know him.",
      "C. Walk slowly.",
    ],
    optionsMeaning: [
      "A. Đội ngũ IT đang cập nhật máy chủ.",
      "B. Tôi không biết anh ấy.",
      "C. Đi bộ chậm thôi.",
    ],
    answer: "A. The IT team is updating the server.",
    explanation:
      "Câu hỏi 'Why'. A đưa lý do kỹ thuật (đang cập nhật máy chủ). C bẫy phát âm 'slow/slowly'.",
  },
  {
    q: "38. Why didn't you attend the workshop?",
    ipa: "/waɪ ˈdɪdənt ju əˈtɛnd ðə ˈwɜrkˌʃɑp/",
    meaning: "Tại sao bạn không tham gia buổi hội thảo?",
    options: [
      "A. It was a great shop.",
      "B. I had an urgent deadline.",
      "C. Ten attendees.",
    ],
    optionsMeaning: [
      "A. Đó là một cửa hàng tuyệt vời.",
      "B. Tôi có một hạn chót khẩn cấp.",
      "C. Mười người tham dự.",
    ],
    answer: "B. I had an urgent deadline.",
    explanation:
      "Câu hỏi 'Why'. B đưa ra lý do cá nhân (có deadline gấp). A bẫy từ 'workshop/shop'.",
  },
  {
    q: "39. Why are we painting the lobby?",
    ipa: "/waɪ ɑr wi ˈpeɪntɪŋ ðə ˈlɑbi/",
    meaning: "Tại sao chúng ta lại sơn lại sảnh chờ?",
    options: [
      "A. A famous painter.",
      "B. It hasn't been done in 10 years.",
      "C. The painting is beautiful.",
    ],
    optionsMeaning: [
      "A. Một họa sĩ nổi tiếng.",
      "B. Việc này chưa được làm trong 10 năm qua.",
      "C. Bức tranh này thật đẹp.",
    ],
    answer: "B. It hasn't been done in 10 years.",
    explanation:
      "Câu hỏi 'Why'. B đưa ra lý do hợp lý (10 năm chưa làm). A và C bẫy lặp từ 'paint/painter/painting'.",
  },
  {
    q: "40. Why did she get a promotion?",
    ipa: "/waɪ dɪd ʃi gɛt ə prəˈmoʊʃən/",
    meaning: "Tại sao cô ấy lại được thăng chức?",
    options: [
      "A. She exceeded her sales targets.",
      "B. To promote a new product.",
      "C. The motion sensor.",
    ],
    optionsMeaning: [
      "A. Cô ấy đã vượt qua các mục tiêu bán hàng của mình.",
      "B. Để quảng bá một sản phẩm mới.",
      "C. Cảm biến chuyển động.",
    ],
    answer: "A. She exceeded her sales targets.",
    explanation:
      "Câu hỏi 'Why'. A đưa ra lý do (vượt chỉ tiêu). B và C bẫy từ vựng 'promote' và 'motion'.",
  },

  // --- HOW (41-50) ---
  {
    q: "41. How long does the flight take?",
    ipa: "/haʊ lɔŋ dʌz ðə flaɪt teɪk/",
    meaning: "Chuyến bay kéo dài bao lâu?",
    options: [
      "A. About three hours.",
      "B. It's a long way.",
      "C. By airplane.",
    ],
    optionsMeaning: [
      "A. Khoảng ba giờ.",
      "B. Đó là một chặng đường dài.",
      "C. Bằng máy bay.",
    ],
    answer: "A. About three hours.",
    explanation:
      "Câu hỏi 'How long' (Bao lâu). A chỉ khoảng thời gian. B là nhận xét. C trả lời cho 'How' (phương tiện).",
  },
  {
    q: "42. How much is the entrance fee?",
    ipa: "/haʊ mʌʧ ɪz ði ˈɛntrəns fi/",
    meaning: "Phí vào cửa là bao nhiêu?",
    options: [
      "A. The entrance is over there.",
      "B. It's 15 dollars per person.",
      "C. Yes, it's free.",
    ],
    optionsMeaning: [
      "A. Lối vào ở đằng kia.",
      "B. Nó là 15 đô la mỗi người.",
      "C. Vâng, nó miễn phí.",
    ],
    answer: "B. It's 15 dollars per person.",
    explanation:
      "Câu hỏi 'How much' (Bao nhiêu tiền). B chỉ giá tiền. A bẫy từ 'entrance'. C bẫy từ đồng âm 'fee/free'.",
  },
  {
    q: "43. How do you commute to work?",
    ipa: "/haʊ du ju kəˈmjut tʊ wɜrk/",
    meaning: "Bạn đi làm bằng phương tiện gì?",
    options: [
      "A. Usually by subway.",
      "B. I work in a bank.",
      "C. The commute is long.",
    ],
    optionsMeaning: [
      "A. Thường là bằng tàu điện ngầm.",
      "B. Tôi làm việc trong một ngân hàng.",
      "C. Quãng đường đi làm khá xa.",
    ],
    answer: "A. Usually by subway.",
    explanation:
      "Câu hỏi 'How' (Đi bằng phương tiện gì). A chỉ phương tiện giao thông. B trả lời 'Where'. C lặp từ 'commute'.",
  },
  {
    q: "44. How can I fix this printer?",
    ipa: "/haʊ kæn aɪ fɪks ðɪs ˈprɪntər/",
    meaning: "Làm thế nào tôi có thể sửa máy in này?",
    options: [
      "A. You should call the technician.",
      "B. It's fixed to the wall.",
      "C. Fifty copies, please.",
    ],
    optionsMeaning: [
      "A. Bạn nên gọi cho kỹ thuật viên.",
      "B. Nó được gắn cố định vào tường.",
      "C. Làm ơn cho năm mươi bản sao.",
    ],
    answer: "A. You should call the technician.",
    explanation:
      "Câu hỏi 'How can I' (Xin giải pháp). A đưa ra lời khuyên. B bẫy từ 'fixed'. C trả lời 'How many'.",
  },
  {
    q: "45. How often do you check your email?",
    ipa: "/haʊ ˈɔfən du ju ʧɛk jʊr iˈmeɪl/",
    meaning: "Bạn thường xuyên kiểm tra email bao lâu một lần?",
    options: [
      "A. Every hour.",
      "B. I sent it yesterday.",
      "C. No, I don't check it.",
    ],
    optionsMeaning: [
      "A. Mỗi giờ một lần.",
      "B. Tôi đã gửi nó ngày hôm qua.",
      "C. Không, tôi không kiểm tra nó.",
    ],
    answer: "A. Every hour.",
    explanation:
      "Câu hỏi 'How often' (Bao lâu một lần). A chỉ tần suất. B trả lời 'When'. C dùng Yes/No sai.",
  },
  {
    q: "46. How many chairs do we need for the meeting?",
    ipa: "/haʊ ˈmɛni ʧɛrz du wi nid fɔr ðə ˈmitɪŋ/",
    meaning: "Chúng ta cần bao nhiêu chiếc ghế cho cuộc họp?",
    options: [
      "A. The chairman is here.",
      "B. At least twenty.",
      "C. Please have a seat.",
    ],
    optionsMeaning: [
      "A. Ngài chủ tịch ở đây.",
      "B. Ít nhất là hai mươi chiếc.",
      "C. Vui lòng ngồi xuống.",
    ],
    answer: "B. At least twenty.",
    explanation:
      "Câu hỏi 'How many' (Bao nhiêu - số lượng). B chỉ số lượng. A bẫy từ 'chair/chairman'. C là một lời mời.",
  },
  {
    q: "47. How did the presentation go?",
    ipa: "/haʊ dɪd ðə ˌprɛzənˈteɪʃən goʊ/",
    meaning: "Buổi thuyết trình diễn ra như thế nào?",
    options: [
      "A. It went very well.",
      "B. Present it tomorrow.",
      "C. He went to the store.",
    ],
    optionsMeaning: [
      "A. Nó đã diễn ra rất tốt.",
      "B. Hãy trình bày nó vào ngày mai.",
      "C. Anh ấy đã đi đến cửa hàng.",
    ],
    answer: "A. It went very well.",
    explanation:
      "Câu hỏi 'How did ... go?' (Diễn ra thế nào). A là đánh giá tình hình. B và C bẫy lặp từ 'present' và 'went'.",
  },
  {
    q: "48. How far is the hotel from the airport?",
    ipa: "/haʊ fɑr ɪz ðə hoʊˈtɛl frʌm ði ˈɛrˌpɔrt/",
    meaning: "Khách sạn cách sân bay bao xa?",
    options: [
      "A. A nice hotel.",
      "B. It's just a 10-minute drive.",
      "C. Very far away from here.",
    ],
    optionsMeaning: [
      "A. Một khách sạn đẹp.",
      "B. Chỉ mất 10 phút lái xe.",
      "C. Rất xa khỏi đây.",
    ],
    answer: "B. It's just a 10-minute drive.",
    explanation:
      "Câu hỏi 'How far' (Bao xa). B chỉ khoảng cách bằng thời gian lái xe. C có từ 'far' nhưng trả lời chung chung không phù hợp bằng B.",
  },
  {
    q: "49. How about going out for dinner tonight?",
    ipa: "/haʊ əˈbaʊt ˈgoʊɪŋ aʊt fɔr ˈdɪnər təˈnaɪt/",
    meaning: "Tối nay ra ngoài ăn tối thì sao nhỉ?",
    options: [
      "A. That sounds like a great idea.",
      "B. I have dinner at 7.",
      "C. The diner is closed.",
    ],
    optionsMeaning: [
      "A. Nghe có vẻ là một ý tưởng tuyệt vời đấy.",
      "B. Tôi ăn tối lúc 7 giờ.",
      "C. Quán ăn đã đóng cửa.",
    ],
    answer: "A. That sounds like a great idea.",
    explanation:
      "Câu hỏi 'How about...' (Lời đề nghị). A là lời đồng ý. B chỉ thói quen. C bẫy phát âm 'dinner/diner'.",
  },
  {
    q: "50. How soon can you finish this report?",
    ipa: "/haʊ sun kæn ju ˈfɪnɪʃ ðɪs rɪˈpɔrt/",
    meaning: "Bao lâu nữa bạn có thể hoàn thành báo cáo này?",
    options: [
      "A. I'll have it done by noon.",
      "B. It's a financial report.",
      "C. Very fast.",
    ],
    optionsMeaning: [
      "A. Tôi sẽ làm xong trước buổi trưa.",
      "B. Đó là một báo cáo tài chính.",
      "C. Rất nhanh.",
    ],
    answer: "A. I'll have it done by noon.",
    explanation:
      "Câu hỏi 'How soon' (Sớm nhất là khi nào). A đưa ra mốc thời gian hoàn thành cụ thể. B trả lời 'What'. C không cụ thể.",
  },

  // --- WHAT (51-60) ---
  {
    q: "51. What time is the conference call?",
    ipa: "/wʌt taɪm ɪz ðə ˈkɑnfərəns kɔl/",
    meaning: "Cuộc gọi hội nghị diễn ra lúc mấy giờ?",
    options: [
      "A. At 3 PM sharp.",
      "B. Yes, I'll call you.",
      "C. In the conference room.",
    ],
    optionsMeaning: [
      "A. Đúng 3 giờ chiều.",
      "B. Vâng, tôi sẽ gọi cho bạn.",
      "C. Trong phòng hội nghị.",
    ],
    answer: "A. At 3 PM sharp.",
    explanation:
      "Câu hỏi 'What time'. A chỉ giờ giấc cụ thể. B bẫy Yes/No. C trả lời 'Where'.",
  },
  {
    q: "52. What is the topic of today's meeting?",
    ipa: "/wʌt ɪz ðə ˈtɑpɪk ʌv təˈdeɪz ˈmitɪŋ/",
    meaning: "Chủ đề của cuộc họp hôm nay là gì?",
    options: [
      "A. It's at noon.",
      "B. The new marketing strategy.",
      "C. I'll meet you there.",
    ],
    optionsMeaning: [
      "A. Nó diễn ra vào buổi trưa.",
      "B. Chiến lược tiếp thị mới.",
      "C. Tôi sẽ gặp bạn ở đó.",
    ],
    answer: "B. The new marketing strategy.",
    explanation:
      "Câu hỏi 'What is the topic' (Chủ đề là gì). B nêu chủ đề. A trả lời 'When'. C bẫy từ 'meet/meeting'.",
  },
  {
    q: "53. What did the manager say about the budget?",
    ipa: "/wʌt dɪd ðə ˈmænəʤər seɪ əˈbaʊt ðə ˈbʌʤət/",
    meaning: "Người quản lý đã nói gì về ngân sách?",
    options: [
      "A. It needs to be reduced.",
      "B. He is the manager.",
      "C. A budget hotel.",
    ],
    optionsMeaning: [
      "A. Nó cần phải được cắt giảm.",
      "B. Anh ấy là người quản lý.",
      "C. Một khách sạn giá rẻ.",
    ],
    answer: "A. It needs to be reduced.",
    explanation:
      "Câu hỏi 'What did ... say' (Nói gì). A nêu nội dung (Cần phải cắt giảm). B và C lặp từ.",
  },
  {
    q: "54. What are you doing this weekend?",
    ipa: "/wʌt ɑr ju ˈduɪŋ ðɪs ˈwikˌɛnd/",
    meaning: "Bạn sẽ làm gì vào cuối tuần này?",
    options: [
      "A. I'm visiting my parents.",
      "B. Last weekend was fun.",
      "C. It ends on Sunday.",
    ],
    optionsMeaning: [
      "A. Tôi sẽ đi thăm bố mẹ.",
      "B. Cuối tuần trước thật vui.",
      "C. Nó kết thúc vào Chủ nhật.",
    ],
    answer: "A. I'm visiting my parents.",
    explanation:
      "Câu hỏi 'What are you doing' (Kế hoạch làm gì). A nêu kế hoạch. B trả lời cho quá khứ. C bẫy từ 'end/weekend'.",
  },
  {
    q: "55. What flavor of cake would you like?",
    ipa: "/wʌt ˈfleɪvər ʌv keɪk wʊd ju laɪk/",
    meaning: "Bạn thích bánh vị gì?",
    options: [
      "A. It's my birthday.",
      "B. Chocolate, please.",
      "C. A piece of cake.",
    ],
    optionsMeaning: [
      "A. Hôm nay là sinh nhật tôi.",
      "B. Cho vị sô-cô-la nhé.",
      "C. Dễ như ăn bánh/Một miếng bánh.",
    ],
    answer: "B. Chocolate, please.",
    explanation:
      "Câu hỏi 'What flavor' (Hương vị gì). B nêu hương vị cụ thể. A và C không trả lời trực tiếp.",
  },
  {
    q: "56. What should I do with these empty boxes?",
    ipa: "/wʌt ʃʊd aɪ du wɪθ ðiz ˈɛmpti ˈbɑksəz/",
    meaning: "Tôi nên làm gì với những chiếc hộp trống này?",
    options: [
      "A. They are very heavy.",
      "B. Please recycle them.",
      "C. I packed the box.",
    ],
    optionsMeaning: [
      "A. Chúng rất nặng.",
      "B. Hãy tái chế chúng.",
      "C. Tôi đã đóng gói cái hộp.",
    ],
    answer: "B. Please recycle them.",
    explanation:
      "Câu hỏi 'What should I do' (Nên làm gì). B đưa ra hướng dẫn (Hãy tái chế chúng). A và C lặp từ/ngữ cảnh.",
  },
  {
    q: "57. What kind of car does he drive?",
    ipa: "/wʌt kaɪnd ʌv kɑr dʌz hi draɪv/",
    meaning: "Anh ấy lái loại xe ô tô nào?",
    options: [
      "A. A black sedan.",
      "B. He drove to work.",
      "C. A very good driver.",
    ],
    optionsMeaning: [
      "A. Một chiếc sedan màu đen.",
      "B. Anh ấy đã lái xe đi làm.",
      "C. Một người lái xe rất giỏi.",
    ],
    answer: "A. A black sedan.",
    explanation:
      "Câu hỏi 'What kind of car' (Loại xe gì). A nêu loại xe cụ thể. B và C bẫy từ 'drive/driver'.",
  },
  {
    q: "58. What is the weather forecast for tomorrow?",
    ipa: "/wʌt ɪz ðə ˈwɛðər ˈfɔrˌkæst fɔr təˈmɑˌroʊ/",
    meaning: "Dự báo thời tiết cho ngày mai là gì?",
    options: [
      "A. Heavy rain in the afternoon.",
      "B. Whether or not to go.",
      "C. Yesterday was sunny.",
    ],
    optionsMeaning: [
      "A. Mưa lớn vào buổi chiều.",
      "B. Dù có đi hay không.",
      "C. Hôm qua trời nắng.",
    ],
    answer: "A. Heavy rain in the afternoon.",
    explanation:
      "Câu hỏi 'What is the weather' (Thời tiết thế nào). A miêu tả thời tiết. B bẫy phát âm 'weather/whether'. C nói về quá khứ.",
  },
  {
    q: "59. What caused the power outage?",
    ipa: "/wʌt kɑzd ðə ˈpaʊər ˈaʊtɪʤ/",
    meaning: "Điều gì đã gây ra sự cố mất điện?",
    options: [
      "A. A fallen tree hit the lines.",
      "B. Pay the power bill.",
      "C. It's out of order.",
    ],
    optionsMeaning: [
      "A. Một cái cây đổ trúng đường dây.",
      "B. Hãy thanh toán hóa đơn tiền điện.",
      "C. Nó bị hỏng rồi.",
    ],
    answer: "A. A fallen tree hit the lines.",
    explanation:
      "Câu hỏi 'What caused...' (Cái gì gây ra). A chỉ nguyên nhân (Cây đổ). B và C bẫy lặp từ 'power' và 'out/outage'.",
  },
  {
    q: "60. What is your flight number?",
    ipa: "/wʌt ɪz jʊr flaɪt ˈnʌmbər/",
    meaning: "Số hiệu chuyến bay của bạn là gì?",
    options: [
      "A. I am flying to Paris.",
      "B. It's UA452.",
      "C. Flight delays are common.",
    ],
    optionsMeaning: [
      "A. Tôi đang bay đến Paris.",
      "B. Đó là chuyến UA452.",
      "C. Việc chuyến bay bị hoãn là rất phổ biến.",
    ],
    answer: "B. It's UA452.",
    explanation:
      "Câu hỏi 'What is your flight number'. B cung cấp một mã số. A và C là câu bình thường liên quan đến chuyến bay.",
  },

  // --- YES/NO QUESTIONS (61-70) ---
  {
    q: "61. Are you attending the seminar tomorrow?",
    ipa: "/ɑr ju əˈtɛndɪŋ ðə ˈsɛməˌnɑr təˈmɑˌroʊ/",
    meaning: "Ngày mai bạn có tham dự buổi hội thảo không?",
    options: [
      "A. No, I have a schedule conflict.",
      "B. The seminar was great.",
      "C. Yes, it is tomorrow.",
    ],
    optionsMeaning: [
      "A. Không, tôi bị kịch lịch trình.",
      "B. Hội thảo rất tuyệt.",
      "C. Vâng, nó diễn ra vào ngày mai.",
    ],
    answer: "A. No, I have a schedule conflict.",
    explanation:
      "Câu hỏi Yes/No. A trả lời trực tiếp và đưa lý do. B trả lời thì quá khứ. C lặp từ nhưng cụt lủn.",
  },
  {
    q: "62. Did you remember to lock the door?",
    ipa: "/dɪd ju rɪˈmɛmbər tʊ lɑk ðə dɔr/",
    meaning: "Bạn có nhớ khóa cửa không đấy?",
    options: [
      "A. It's a combination lock.",
      "B. Yes, I double-checked it.",
      "C. The door is made of wood.",
    ],
    optionsMeaning: [
      "A. Nó là ổ khóa số.",
      "B. Vâng, tôi đã kiểm tra lại hai lần rồi.",
      "C. Cánh cửa được làm bằng gỗ.",
    ],
    answer: "B. Yes, I double-checked it.",
    explanation:
      "Câu hỏi Yes/No quá khứ. B xác nhận đã khóa. A và C bẫy lặp từ 'lock' và 'door'.",
  },
  {
    q: "63. Is there a pharmacy near here?",
    ipa: "/ɪz ðɛr ə ˈfɑrməsi nɪr hir/",
    meaning: "Có hiệu thuốc nào gần đây không?",
    options: [
      "A. Yes, right next to the bank.",
      "B. A farmer's market.",
      "C. Medicine is expensive.",
    ],
    optionsMeaning: [
      "A. Có, ngay cạnh ngân hàng.",
      "B. Một chợ nông sản.",
      "C. Thuốc men rất đắt đỏ.",
    ],
    answer: "A. Yes, right next to the bank.",
    explanation:
      "Câu hỏi 'Is there...'. A xác nhận có và chỉ vị trí. B bẫy âm 'pharmacy/farmer'. C giải thích từ vựng.",
  },
  {
    q: "64. Have you seen my glasses anywhere?",
    ipa: "/hæv ju sin maɪ ˈglæsəz ˈɛniˌwɛr/",
    meaning: "Bạn có thấy kính của tôi ở đâu không?",
    options: [
      "A. A glass of water.",
      "B. They are on the kitchen counter.",
      "C. Yes, I saw a movie.",
    ],
    optionsMeaning: [
      "A. Một cốc nước.",
      "B. Chúng ở trên quầy bếp.",
      "C. Vâng, tôi đã xem một bộ phim.",
    ],
    answer: "B. They are on the kitchen counter.",
    explanation:
      "Câu hỏi Yes/No. B chỉ vị trí đồ vật (Trả lời ẩn Yes). A bẫy nghĩa 'glasses' (cốc nước). C bẫy từ 'saw/seen'.",
  },
  {
    q: "65. Can you help me carry these boxes?",
    ipa: "/kæn ju hɛlp mi ˈkæri ðiz ˈbɑksəz/",
    meaning: "Bạn có thể giúp tôi mang những chiếc hộp này không?",
    options: [
      "A. Sure, let me give you a hand.",
      "B. A cardboard box.",
      "C. They are heavy.",
    ],
    optionsMeaning: [
      "A. Chắc chắn rồi, để tôi giúp bạn một tay.",
      "B. Một chiếc hộp các tông.",
      "C. Chúng rất nặng.",
    ],
    answer: "A. Sure, let me give you a hand.",
    explanation:
      "Câu hỏi nhờ vả (Can you help). A đồng ý giúp đỡ. B và C là bình luận không phải câu trả lời.",
  },
  {
    q: "66. Do we have enough paper for the printer?",
    ipa: "/du wi hæv ɪˈnʌf ˈpeɪpər fɔr ðə ˈprɪntər/",
    meaning: "Chúng ta có đủ giấy cho máy in không?",
    options: [
      "A. Print it out.",
      "B. I'll go buy another ream.",
      "C. The daily paper.",
    ],
    optionsMeaning: [
      "A. Hãy in nó ra.",
      "B. Tôi sẽ đi mua thêm một ram giấy nữa.",
      "C. Tờ báo hàng ngày.",
    ],
    answer: "B. I'll go buy another ream.",
    explanation:
      "Câu hỏi Yes/No kiểm tra. B đáp án gián tiếp (Tôi sẽ đi mua thêm), ngầm hiểu là 'không đủ'. A và C bẫy lặp từ.",
  },
  {
    q: "67. Will Mr. Smith join us for lunch?",
    ipa: "/wɪl ˈmɪstər smɪθ ʤɔɪn ʌs fɔr lʌnʧ/",
    meaning: "Ông Smith có tham gia ăn trưa cùng chúng ta không?",
    options: [
      "A. He has another appointment.",
      "B. It's a nice restaurant.",
      "C. Join the club.",
    ],
    optionsMeaning: [
      "A. Ông ấy có một cuộc hẹn khác rồi.",
      "B. Đó là một nhà hàng đẹp.",
      "C. Tham gia câu lạc bộ đi.",
    ],
    answer: "A. He has another appointment.",
    explanation:
      "Câu hỏi tương lai. A từ chối khéo giùm (Anh ấy bận lịch khác). B và C lặp từ vựng.",
  },
  {
    q: "68. Was the training session useful?",
    ipa: "/wʌz ðə ˈtreɪnɪŋ ˈsɛʃən ˈjusfəl/",
    meaning: "Buổi đào tạo có hữu ích không?",
    options: [
      "A. Yes, I learned a lot.",
      "B. The train is arriving.",
      "C. At the training center.",
    ],
    optionsMeaning: [
      "A. Có, tôi đã học được rất nhiều điều.",
      "B. Tàu đang tới.",
      "C. Tại trung tâm đào tạo.",
    ],
    answer: "A. Yes, I learned a lot.",
    explanation:
      "Câu hỏi Yes/No hỏi ý kiến. A xác nhận và thêm chi tiết. B bẫy từ 'train' (tàu hỏa). C trả lời 'Where'.",
  },
  {
    q: "69. Are we hiring a new assistant?",
    ipa: "/ɑr wi ˈhaɪərɪŋ ə nu əˈsɪstənt/",
    meaning: "Chúng ta có đang tuyển trợ lý mới không?",
    options: [
      "A. Yes, interviews start next week.",
      "B. I assisted him yesterday.",
      "C. The new office is big.",
    ],
    optionsMeaning: [
      "A. Có, các cuộc phỏng vấn bắt đầu vào tuần tới.",
      "B. Hôm qua tôi đã hỗ trợ anh ấy.",
      "C. Văn phòng mới rất lớn.",
    ],
    answer: "A. Yes, interviews start next week.",
    explanation:
      "Câu hỏi Yes/No. A xác nhận và thêm thông tin. B bẫy thì quá khứ và lặp từ. C bẫy từ 'new'.",
  },
  {
    q: "70. Has the mail been delivered yet?",
    ipa: "/hæz ðə meɪl bɪn dɪˈlɪvərd jɛt/",
    meaning: "Thư đã được giao chưa?",
    options: [
      "A. An email address.",
      "B. Not that I know of.",
      "C. Deliver to the front door.",
    ],
    optionsMeaning: [
      "A. Một địa chỉ email.",
      "B. Theo tôi biết thì chưa.",
      "C. Giao đến cửa trước.",
    ],
    answer: "B. Not that I know of.",
    explanation:
      "Câu hỏi thì hiện tại hoàn thành. B là cách trả lời phổ biến 'Theo tôi biết thì chưa'. A và C bẫy từ vựng.",
  },

  // --- CHOICE QUESTIONS & STATEMENTS (71-80) ---
  {
    q: "71. Would you like coffee or tea?",
    ipa: "/wʊd ju laɪk ˈkɑfi ɔr ti/",
    meaning: "Bạn muốn uống cà phê hay trà?",
    options: ["A. Yes, please.", "B. I'd prefer tea.", "C. A coffee shop."],
    optionsMeaning: [
      "A. Vâng, làm ơn.",
      "B. Tôi thích trà hơn.",
      "C. Một quán cà phê.",
    ],
    answer: "B. I'd prefer tea.",
    explanation:
      "Câu hỏi lựa chọn (A or B). B chọn 1 phương án. Lưu ý: Câu hỏi lựa chọn KHÔNG trả lời bằng Yes/No.",
  },
  {
    q: "72. Are we meeting in room A or room B?",
    ipa: "/ɑr wi ˈmitɪŋ ɪn rum eɪ ɔr rum bi/",
    meaning: "Chúng ta sẽ họp ở phòng A hay phòng B?",
    options: [
      "A. Room B is currently occupied.",
      "B. Nice to meet you.",
      "C. Yes, we are.",
    ],
    optionsMeaning: [
      "A. Phòng B hiện đang có người sử dụng rồi.",
      "B. Rất vui được gặp bạn.",
      "C. Vâng, chúng ta đang họp.",
    ],
    answer: "A. Room B is currently occupied.",
    explanation:
      "Câu hỏi lựa chọn. A ngụ ý chọn Room A bằng cách nói Room B đã có người. B và C sai logic.",
  },
  {
    q: "73. Do you want to sit inside or outside?",
    ipa: "/du ju wɑnt tʊ sɪt ɪnˈsaɪd ɔr ˈaʊtˈsaɪd/",
    meaning: "Bạn muốn ngồi bên trong hay bên ngoài?",
    options: [
      "A. The weather is nice, let's sit on the patio.",
      "B. Yes, I do.",
      "C. Put it inside.",
    ],
    optionsMeaning: [
      "A. Thời tiết rất đẹp, hãy ngồi ở ngoài hiên đi.",
      "B. Vâng, tôi muốn.",
      "C. Đặt nó vào bên trong.",
    ],
    answer: "A. The weather is nice, let's sit on the patio.",
    explanation:
      "Câu hỏi lựa chọn. A chọn 'outside' bằng cách dùng từ đồng nghĩa 'patio' (hiên ngoài). B bẫy Yes/No.",
  },
  {
    q: "74. Should we drive or take the train?",
    ipa: "/ʃʊd wi draɪv ɔr teɪk ðə treɪn/",
    meaning: "Chúng ta nên lái xe hay đi tàu?",
    options: [
      "A. The train is faster.",
      "B. I drove a car.",
      "C. Yes, we should.",
    ],
    optionsMeaning: [
      "A. Đi tàu thì nhanh hơn.",
      "B. Tôi đã lái một chiếc ô tô.",
      "C. Vâng, chúng ta nên như vậy.",
    ],
    answer: "A. The train is faster.",
    explanation:
      "Câu hỏi lựa chọn. A nghiêng về đi tàu vì nó nhanh hơn. C bẫy Yes/No.",
  },
  {
    q: "75. Is your flight direct, or do you have a layover?",
    ipa: "/ɪz jʊr flaɪt dɪˈrɛkt, ɔr du ju hæv ə ˈleɪˌoʊvər/",
    meaning: "Chuyến bay của bạn là bay thẳng hay có điểm dừng nghỉ?",
    options: [
      "A. Directing traffic.",
      "B. I have a brief stop in Chicago.",
      "C. Yes, it's direct.",
    ],
    optionsMeaning: [
      "A. Điều phối giao thông.",
      "B. Tôi có một điểm dừng ngắn ở Chicago.",
      "C. Vâng, nó bay thẳng.",
    ],
    answer: "B. I have a brief stop in Chicago.",
    explanation:
      "Câu hỏi lựa chọn. B trả lời cách thứ 2 bằng cụm từ 'stop' = layover. C bẫy Yes/No.",
  },
  {
    q: "76. The air conditioning isn't working.",
    ipa: "/ði ɛr kənˈdɪʃənɪŋ ˈɪzənt ˈwɜrkɪŋ/",
    meaning: "Máy điều hòa không hoạt động.",
    options: [
      "A. I work in the marketing department.",
      "B. I'll call maintenance.",
      "C. It's a good condition.",
    ],
    optionsMeaning: [
      "A. Tôi làm việc trong bộ phận tiếp thị.",
      "B. Tôi sẽ gọi bộ phận bảo trì.",
      "C. Đó là một điều kiện tốt.",
    ],
    answer: "B. I'll call maintenance.",
    explanation:
      "Đây là một Statement (Câu trần thuật) nêu vấn đề. B đưa ra giải pháp giải quyết. A và C bẫy lặp từ.",
  },
  {
    q: "77. I think we need to update our software.",
    ipa: "/aɪ θɪŋk wi nid tʊ əpˈdeɪt ˈaʊər ˈsɔfˌtwɛr/",
    meaning: "Tôi nghĩ chúng ta cần cập nhật phần mềm.",
    options: [
      "A. It was updated yesterday.",
      "B. A software company.",
      "C. The date is wrong.",
    ],
    optionsMeaning: [
      "A. Nó đã được cập nhật ngày hôm qua.",
      "B. Một công ty phần mềm.",
      "C. Ngày bị sai.",
    ],
    answer: "A. It was updated yesterday.",
    explanation:
      "Statement (đưa ý kiến). A phản hồi lại bằng thông tin mới (mới update hôm qua rồi). B và C lặp từ.",
  },
  {
    q: "78. We are almost out of printer ink.",
    ipa: "/wi ɑr ˈɔlˌmoʊst aʊt ʌv ˈprɪntər ɪŋk/",
    meaning: "Chúng ta sắp hết mực máy in rồi.",
    options: [
      "A. I'll order some more today.",
      "B. A pink dress.",
      "C. I printed the document.",
    ],
    optionsMeaning: [
      "A. Hôm nay tôi sẽ đặt mua thêm.",
      "B. Một chiếc váy màu hồng.",
      "C. Tôi đã in tài liệu.",
    ],
    answer: "A. I'll order some more today.",
    explanation:
      "Statement báo hết mực. A đưa ra cách xử lý (Sẽ đặt mua). B bẫy phát âm 'ink/pink'.",
  },
  {
    q: "79. The traffic is really heavy today.",
    ipa: "/ðə ˈtræfɪk ɪz ˈrɪli ˈhɛvi təˈdeɪ/",
    meaning: "Hôm nay giao thông thực sự rất đông đúc.",
    options: [
      "A. A heavy box.",
      "B. That's why I'm late.",
      "C. Green traffic light.",
    ],
    optionsMeaning: [
      "A. Một cái hộp nặng.",
      "B. Đó là lý do tại sao tôi đến muộn.",
      "C. Đèn giao thông màu xanh.",
    ],
    answer: "B. That's why I'm late.",
    explanation:
      "Statement than phiền kẹt xe. B đưa ra hệ quả (Đó là lý do tôi trễ). A bẫy từ 'heavy'.",
  },
  {
    q: "80. I can't find my ID badge.",
    ipa: "/aɪ kænt faɪnd maɪ aɪ-di bæʤ/",
    meaning: "Tôi không thể tìm thấy thẻ tên/thẻ ID của mình.",
    options: [
      "A. A badger is an animal.",
      "B. You can get a temporary one at the front desk.",
      "C. Yes, I found it.",
    ],
    optionsMeaning: [
      "A. Con lửng là một loài động vật.",
      "B. Bạn có thể lấy thẻ tạm thời ở quầy lễ tân.",
      "C. Vâng, tôi đã tìm thấy nó.",
    ],
    answer: "B. You can get a temporary one at the front desk.",
    explanation:
      "Statement báo mất đồ. B đưa ra giải pháp thay thế. A bẫy phát âm 'badge/badger'.",
  },

  // --- TAG QUESTIONS & MIXED (81-100) ---
  {
    q: "81. You sent the invitations, didn't you?",
    ipa: "/ju sɛnt ði ˌɪnvɪˈteɪʃənz, ˈdɪdənt ju/",
    meaning: "Bạn đã gửi thiệp mời rồi, phải không?",
    options: [
      "A. Yes, they went out yesterday.",
      "B. An invitation card.",
      "C. No, I didn't see it.",
    ],
    optionsMeaning: [
      "A. Có, chúng đã được gửi đi vào ngày hôm qua.",
      "B. Một tấm thiệp mời.",
      "C. Không, tôi không nhìn thấy nó.",
    ],
    answer: "A. Yes, they went out yesterday.",
    explanation:
      "Câu hỏi đuôi (Tag question) xác nhận. A đồng ý và nói rõ thời gian gửi.",
  },
  {
    q: "82. The restaurant is closed on Mondays, isn't it?",
    ipa: "/ðə ˈrɛstəˌrɑnt ɪz kloʊzd ɑn ˈmʌndeɪz, ˈɪzənt ɪt/",
    meaning: "Nhà hàng đóng cửa vào thứ Hai, phải không?",
    options: [
      "A. Yes, they open on Tuesday.",
      "B. It's close to here.",
      "C. A delicious meal.",
    ],
    optionsMeaning: [
      "A. Đúng vậy, họ mở cửa vào thứ Ba.",
      "B. Nó ở gần đây.",
      "C. Một bữa ăn ngon.",
    ],
    answer: "A. Yes, they open on Tuesday.",
    explanation:
      "Câu hỏi đuôi. A xác nhận và bổ sung thông tin. B bẫy từ 'close' (gần/đóng cửa).",
  },
  {
    q: "83. She is the new HR director, right?",
    ipa: "/ʃi ɪz ðə nu eɪʧ-ɑr dɪˈrɛktər, raɪt/",
    meaning: "Cô ấy là giám đốc nhân sự mới, đúng không?",
    options: [
      "A. Yes, she started last week.",
      "B. Go in that direction.",
      "C. No, it's not new.",
    ],
    optionsMeaning: [
      "A. Có, cô ấy đã bắt đầu làm từ tuần trước.",
      "B. Hãy đi theo hướng đó.",
      "C. Không, nó không mới.",
    ],
    answer: "A. Yes, she started last week.",
    explanation:
      "Câu hỏi xác nhận. A đồng ý và thêm chi tiết. B bẫy từ 'director/direction'.",
  },
  {
    q: "84. We don't have a meeting today, do we?",
    ipa: "/wi doʊnt hæv ə ˈmitɪŋ təˈdeɪ, du wi/",
    meaning: "Hôm nay chúng ta không có cuộc họp nào, đúng không?",
    options: [
      "A. To meet a friend.",
      "B. Actually, there's a brief one at 4.",
      "C. Yes, we do not.",
    ],
    optionsMeaning: [
      "A. Để đi gặp một người bạn.",
      "B. Thực ra, có một cuộc họp ngắn lúc 4 giờ.",
      "C. Vâng, chúng ta không có.",
    ],
    answer: "B. Actually, there's a brief one at 4.",
    explanation:
      "Câu hỏi đuôi phủ định. B đính chính lại thông tin (Thực ra có 1 cuộc họp ngắn lúc 4h). C ngữ pháp 'Yes, we do not' là sai.",
  },
  {
    q: "85. That was a wonderful presentation, wasn't it?",
    ipa: "/ðæt wʌz ə ˈwʌndərfəl ˌprɛzənˈteɪʃən, ˈwɑzənt ɪt/",
    meaning: "Đó là một bài thuyết trình tuyệt vời, phải không?",
    options: [
      "A. A present for you.",
      "B. Yes, very informative.",
      "C. He was absent.",
    ],
    optionsMeaning: [
      "A. Một món quà cho bạn.",
      "B. Vâng, rất nhiều thông tin hữu ích.",
      "C. Anh ấy đã vắng mặt.",
    ],
    answer: "B. Yes, very informative.",
    explanation:
      "Câu hỏi đuôi khen ngợi. B đồng tình. A bẫy từ 'presentation/present'.",
  },
  {
    q: "86. Who left the lights on in the warehouse?",
    ipa: "/hu lɛft ðə laɪts ɑn ɪn ðə ˈwɛrˌhaʊs/",
    meaning: "Ai đã để đèn sáng trong nhà kho vậy?",
    options: [
      "A. A light jacket.",
      "B. Probably the night shift workers.",
      "C. On the left side.",
    ],
    optionsMeaning: [
      "A. Một chiếc áo khoác mỏng/nhẹ.",
      "B. Có lẽ là các công nhân làm ca đêm.",
      "C. Ở phía bên trái.",
    ],
    answer: "B. Probably the night shift workers.",
    explanation:
      "Câu hỏi Who. B đoán là công nhân ca đêm. A và C bẫy lặp từ 'light' và 'left'.",
  },
  {
    q: "87. Where can I find a good place to eat?",
    ipa: "/wɛr kæn aɪ faɪnd ə gʊd pleɪs tʊ it/",
    meaning: "Tôi có thể tìm một nơi ăn uống ngon ở đâu?",
    options: [
      "A. A piece of cake.",
      "B. There's a nice cafe on the corner.",
      "C. At 12 PM.",
    ],
    optionsMeaning: [
      "A. Dễ như ăn bánh/Một miếng bánh.",
      "B. Có một quán cà phê đẹp ở góc phố.",
      "C. Lúc 12 giờ trưa.",
    ],
    answer: "B. There's a nice cafe on the corner.",
    explanation: "Câu hỏi Where. B giới thiệu một quán ở góc đường.",
  },
  {
    q: "88. When will the contract be ready to sign?",
    ipa: "/wɛn wɪl ðə ˈkɑntrækt bi ˈrɛdi tʊ saɪn/",
    meaning: "Khi nào hợp đồng sẽ sẵn sàng để ký?",
    options: [
      "A. It requires your signature.",
      "B. The legal team is reviewing it now.",
      "C. A new contractor.",
    ],
    optionsMeaning: [
      "A. Nó yêu cầu chữ ký của bạn.",
      "B. Đội pháp lý đang xem xét nó ngay bây giờ.",
      "C. Một nhà thầu mới.",
    ],
    answer: "B. The legal team is reviewing it now.",
    explanation:
      "Câu hỏi When. B trả lời gián tiếp (Đội pháp lý đang xem xét -> Chưa sẵn sàng). A bẫy từ 'sign/signature'.",
  },
  {
    q: "89. Why is the store closing early today?",
    ipa: "/waɪ ɪz ðə stɔr ˈkloʊzɪŋ ˈɜrli təˈdeɪ/",
    meaning: "Tại sao hôm nay cửa hàng lại đóng cửa sớm?",
    options: [
      "A. It's a national holiday.",
      "B. Close the window.",
      "C. Early in the morning.",
    ],
    optionsMeaning: [
      "A. Hôm nay là ngày lễ quốc gia.",
      "B. Hãy đóng cửa sổ lại.",
      "C. Rất sớm vào buổi sáng.",
    ],
    answer: "A. It's a national holiday.",
    explanation: "Câu hỏi Why. A đưa ra lý do chính đáng (Ngày lễ quốc gia).",
  },
  {
    q: "90. How can we improve our customer service?",
    ipa: "/haʊ kæn wi ɪmˈpruv ˈaʊər ˈkʌstəmər ˈsɜrvəs/",
    meaning: "Làm thế nào chúng ta có thể cải thiện dịch vụ khách hàng?",
    options: [
      "A. The service is fast.",
      "B. By providing more staff training.",
      "C. A new customer.",
    ],
    optionsMeaning: [
      "A. Dịch vụ rất nhanh chóng.",
      "B. Bằng cách cung cấp thêm các khóa đào tạo nhân viên.",
      "C. Một khách hàng mới.",
    ],
    answer: "B. By providing more staff training.",
    explanation: "Câu hỏi How (Bằng cách nào). B đưa ra phương pháp cụ thể.",
  },
  {
    q: "91. What is the access code for the wifi?",
    ipa: "/wʌt ɪz ði ˈæksɛs koʊd fɔr ðə ˈwaɪˌfaɪ/",
    meaning: "Mã truy cập wifi là gì?",
    options: [
      "A. It's written on the whiteboard.",
      "B. A cold winter.",
      "C. Access is denied.",
    ],
    optionsMeaning: [
      "A. Nó được viết trên bảng trắng.",
      "B. Một mùa đông lạnh giá.",
      "C. Truy cập bị từ chối.",
    ],
    answer: "A. It's written on the whiteboard.",
    explanation:
      "Câu hỏi What (hỏi mã wifi). A chỉ nơi ghi mật khẩu thay vì đọc trực tiếp. B bẫy âm 'code/cold'.",
  },
  {
    q: "92. Are there any seats left for the concert?",
    ipa: "/ɑr ðɛr ˈɛni sits lɛft fɔr ðə ˈkɑnsɜrt/",
    meaning: "Còn chỗ ngồi nào cho buổi hòa nhạc không?",
    options: [
      "A. A musical concert.",
      "B. Sit down, please.",
      "C. No, it's completely sold out.",
    ],
    optionsMeaning: [
      "A. Một buổi hòa nhạc.",
      "B. Làm ơn ngồi xuống.",
      "C. Không, vé đã được bán hết sạch.",
    ],
    answer: "C. No, it's completely sold out.",
    explanation: "Câu hỏi Yes/No. C trả lời rõ là đã hết vé.",
  },
  {
    q: "93. Didn't you receive my text message?",
    ipa: "/ˈdɪdənt ju rɪˈsiv maɪ tɛkst ˈmɛsəʤ/",
    meaning: "Bạn không nhận được tin nhắn văn bản của tôi à?",
    options: [
      "A. My phone battery died.",
      "B. A textbook.",
      "C. Yes, I didn't.",
    ],
    optionsMeaning: [
      "A. Điện thoại của tôi bị hết pin.",
      "B. Một cuốn sách giáo khoa.",
      "C. Vâng, tôi đã không nhận được.",
    ],
    answer: "A. My phone battery died.",
    explanation:
      "Câu hỏi phủ định. A trả lời gián tiếp đưa lý do (Điện thoại hết pin -> Nên không nhận được).",
  },
  {
    q: "94. Is Mr. Gomez in his office?",
    ipa: "/ɪz ˈmɪstər goʊˈmɛz ɪn hɪz ˈɔfɪs/",
    meaning: "Ông Gomez có trong văn phòng không?",
    options: [
      "A. An office chair.",
      "B. He stepped out for lunch.",
      "C. Yes, he isn't.",
    ],
    optionsMeaning: [
      "A. Một chiếc ghế văn phòng.",
      "B. Ông ấy đã ra ngoài ăn trưa rồi.",
      "C. Vâng, ông ấy không có ở đó.",
    ],
    answer: "B. He stepped out for lunch.",
    explanation:
      "Câu hỏi Yes/No kiểm tra vị trí. B thông báo người đó đã ra ngoài.",
  },
  {
    q: "95. You've reviewed the budget report, haven't you?",
    ipa: "/juv rɪˈvjud ðə ˈbʌʤət rɪˈpɔrt, ˈhævənt ju/",
    meaning: "Bạn đã xem xét báo cáo ngân sách rồi, phải không?",
    options: [
      "A. A beautiful view.",
      "B. Yes, everything looks fine.",
      "C. The budget is low.",
    ],
    optionsMeaning: [
      "A. Một góc nhìn đẹp.",
      "B. Có, mọi thứ đều có vẻ ổn.",
      "C. Ngân sách rất thấp.",
    ],
    answer: "B. Yes, everything looks fine.",
    explanation: "Câu hỏi đuôi. B xác nhận và bình luận thêm.",
  },
  {
    q: "96. Whose car is parked blocking the entrance?",
    ipa: "/huz kɑr ɪz pɑrkt ˈblɑkɪŋ ði ˈɛntrəns/",
    meaning: "Chiếc xe của ai đang đậu chắn lối vào vậy?",
    options: [
      "A. A park ranger.",
      "B. It belongs to the regional director.",
      "C. Enter from the back.",
    ],
    optionsMeaning: [
      "A. Một kiểm lâm viên.",
      "B. Nó thuộc về giám đốc khu vực.",
      "C. Hãy đi vào từ phía sau.",
    ],
    answer: "B. It belongs to the regional director.",
    explanation:
      "Câu hỏi Whose (Của ai). B trả lời thuộc về ai đó. A bẫy lặp từ 'park'.",
  },
  {
    q: "97. Which color do you prefer for the walls?",
    ipa: "/wɪʧ ˈkʌlər du ju prɪˈfɜr fɔr ðə wɔlz/",
    meaning: "Bạn thích màu nào hơn cho các bức tường?",
    options: [
      "A. Colorful flowers.",
      "B. A brick wall.",
      "C. I think light blue is nice.",
    ],
    optionsMeaning: [
      "A. Những bông hoa đầy màu sắc.",
      "B. Một bức tường gạch.",
      "C. Tôi nghĩ màu xanh nhạt là đẹp.",
    ],
    answer: "C. I think light blue is nice.",
    explanation: "Câu hỏi Which (Lựa chọn). C chọn màu xanh nhạt.",
  },
  {
    q: "98. Do you know where the nearest subway station is?",
    ipa: "/du ju noʊ wɛr ðə ˈnɪrəst ˈsʌbˌweɪ ˈsteɪʃən ɪz/",
    meaning: "Bạn có biết ga tàu điện ngầm gần nhất ở đâu không?",
    options: [
      "A. A subway sandwich.",
      "B. Just two blocks down this street.",
      "C. At the train station.",
    ],
    optionsMeaning: [
      "A. Một chiếc bánh mì kẹp subway.",
      "B. Chỉ cách con đường này hai dãy nhà.",
      "C. Tại ga xe lửa.",
    ],
    answer: "B. Just two blocks down this street.",
    explanation: "Câu hỏi Do you know Where. B chỉ đường cụ thể.",
  },
  {
    q: "99. Let's schedule a meeting for next Monday.",
    ipa: "/lɛts ˈskɛʤʊl ə ˈmitɪŋ fɔr nɛkst ˈmʌndeɪ/",
    meaning: "Hãy lên lịch họp vào thứ Hai tới nhé.",
    options: [
      "A. My calendar is open that day.",
      "B. A meeting room.",
      "C. Yesterday was Monday.",
    ],
    optionsMeaning: [
      "A. Lịch trình của tôi đang trống vào ngày hôm đó.",
      "B. Một phòng họp.",
      "C. Hôm qua là thứ Hai.",
    ],
    answer: "A. My calendar is open that day.",
    explanation:
      "Đề nghị (Let's). A đồng ý bằng cách nói lịch trống. B và C lặp từ.",
  },
  {
    q: "100. Could you pass me the salt, please?",
    ipa: "/kʊd ju pæs mi ðə sɔlt, pliz/",
    meaning: "Bạn có thể đưa cho tôi lọ muối được không?",
    options: ["A. Passed the exam.", "B. Here you go.", "C. It's too salty."],
    optionsMeaning: [
      "A. Đã vượt qua kỳ thi.",
      "B. Của bạn đây.",
      "C. Nó quá mặn.",
    ],
    answer: "B. Here you go.",
    explanation:
      "Câu yêu cầu lịch sự (Could you pass). B là câu nói quen thuộc khi đưa đồ cho người khác (Của bạn đây).",
  },
];

// --- HÀM CÂN BẰNG ĐÁP ÁN ---
const generateBalancedData = () => {
  const balanced = [];
  rawQuizData.forEach((item, index) => {
    const targetIndex = index % 3;
    const pureOptions = item.options.map((opt) => opt.substring(3));
    const pureMeanings = item.optionsMeaning.map((opt) => opt.substring(3));
    const pureAnswerText = item.answer.substring(3);
    const currentCorrectIndex = pureOptions.indexOf(pureAnswerText);

    if (currentCorrectIndex !== targetIndex) {
      let tempOpt = pureOptions[targetIndex];
      pureOptions[targetIndex] = pureOptions[currentCorrectIndex];
      pureOptions[currentCorrectIndex] = tempOpt;

      let tempMean = pureMeanings[targetIndex];
      pureMeanings[targetIndex] = pureMeanings[currentCorrectIndex];
      pureMeanings[currentCorrectIndex] = tempMean;
    }

    const prefixes = ["A", "B", "C"];
    const newOptions = pureOptions.map((opt, i) => `${prefixes[i]}. ${opt}`);
    const newMeanings = pureMeanings.map(
      (mean, i) => `${prefixes[i]}. ${mean}`,
    );
    const newAnswer = newOptions[targetIndex];

    balanced.push({
      ...item,
      options: newOptions,
      optionsMeaning: newMeanings,
      answer: newAnswer,
    });
  });
  return balanced;
};

const balancedQuizData = generateBalancedData();

export default function ToeicPartTwo() {
  // Khởi tạo state từ localStorage nếu có, nếu không thì dùng giá trị mặc định
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem("toeic_part2_current_index");
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem("toeic_part2_answers");
    return saved
      ? JSON.parse(saved)
      : Array(balancedQuizData.length).fill(null);
  });

  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem("toeic_part2_flags");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Lưu state vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem(
      "toeic_part2_current_index",
      currentQuestionIndex.toString(),
    );
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem("toeic_part2_answers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem(
      "toeic_part2_flags",
      JSON.stringify(Array.from(flags)),
    );
  }, [flags]);

  // Modal trạng thái lưới câu hỏi
  const [isListOpen, setIsListOpen] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  const currentQuestion = balancedQuizData[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];
  const isAnswered = selectedOption !== null;

  // TTS States
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    const populateVoices = () => {
      const availableVoices = synth.getVoices();
      const englishVoices = availableVoices.filter((voice) =>
        voice.lang.startsWith("en"),
      );
      setVoices(englishVoices);
      if (englishVoices.length > 0 && !selectedVoiceURI) {
        setSelectedVoiceURI(englishVoices[0].voiceURI);
      }
    };
    populateVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoices;
    }
  }, [selectedVoiceURI]);

  const playAudio = (textToSpeak = "") => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();

    let finalText = textToSpeak;
    if (!finalText) {
      finalText = currentQuestion.q.replace(/^\d+\.\s*/, "");
    } else {
      finalText = finalText.replace(/^[A-C]\.\s*/, "");
    }

    const utterance = new SpeechSynthesisUtterance(finalText);
    if (selectedVoiceURI) {
      const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    synth.speak(utterance);
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [currentQuestionIndex]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < balancedQuizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const toggleFlag = () => {
    const newFlags = new Set(flags);
    if (newFlags.has(currentQuestionIndex)) {
      newFlags.delete(currentQuestionIndex);
    } else {
      newFlags.add(currentQuestionIndex);
    }
    setFlags(newFlags);
  };

  const calculateScore = () => {
    return userAnswers.filter(
      (ans, idx) => ans === balancedQuizData[idx].answer,
    ).length;
  };

  const restartQuiz = () => {
    // Xóa dữ liệu cũ khỏi localStorage và đặt lại state
    localStorage.removeItem("toeic_part2_current_index");
    localStorage.removeItem("toeic_part2_answers");
    localStorage.removeItem("toeic_part2_flags");

    setCurrentQuestionIndex(0);
    setUserAnswers(Array(balancedQuizData.length).fill(null));
    setFlags(new Set());
    setShowResult(false);
  };

  const handleOptionAudioClick = (e, optionText) => {
    e.stopPropagation();
    playAudio(optionText);
  };

  const progressPercentage =
    (userAnswers.filter((ans) => ans !== null).length /
      balancedQuizData.length) *
    100;

  // --- MÀN HÌNH KẾT QUẢ ---
  if (showResult) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="bg-white max-w-lg w-full rounded-[2rem] shadow-xl border border-slate-100 p-10 text-center">
          <div className="relative mx-auto w-24 h-24 mb-6 bg-amber-50 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-amber-500" />
            <Sparkles className="absolute top-0 right-0 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-slate-800">
            Hoàn Thành!
          </h2>
          <p className="text-slate-500 mb-8 text-base">
            Bạn đã nộp bài kiểm tra TOEIC Part 2.
          </p>

          <div className="bg-indigo-50/50 rounded-3xl p-6 mb-8 border border-indigo-100">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-1">
              Kết quả của bạn
            </p>
            <p className="text-6xl font-black text-indigo-600">
              {score}{" "}
              <span className="text-3xl font-bold text-indigo-300">/ 100</span>
            </p>
          </div>

          <button
            onClick={restartQuiz}
            className="flex items-center justify-center w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Làm lại từ đầu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 font-sans flex justify-center pb-20 sm:pb-0">
      {/* --- DANH SÁCH CÂU HỎI OVERLAY --- */}
      {isListOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsListOpen(false)}
          ></div>
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  Danh sách câu hỏi
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Đã làm: {userAnswers.filter((a) => a !== null).length}/100
                </p>
              </div>
              <button
                onClick={() => setIsListOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid grid-cols-5 gap-3">
                {balancedQuizData.map((_, idx) => {
                  const hasAnswered = userAnswers[idx] !== null;
                  const isCorrect =
                    userAnswers[idx] === balancedQuizData[idx].answer;
                  const isCurrent = idx === currentQuestionIndex;
                  const isFlagged = flags.has(idx);

                  let cellStyle =
                    "bg-white border-slate-200 text-slate-600 hover:border-indigo-400";
                  if (hasAnswered) {
                    cellStyle = isCorrect
                      ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                      : "bg-rose-50 border-rose-400 text-rose-700";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setIsListOpen(false);
                      }}
                      className={`relative aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all ${cellStyle} ${isCurrent ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <Flag className="w-3.5 h-3.5 text-rose-500 absolute -top-1.5 -right-1.5 fill-current filter drop-shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setShowResult(true)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex justify-center items-center"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" /> Nộp Bài Sớm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- GIAO DIỆN CHÍNH --- */}
      <div className="w-full max-w-3xl flex flex-col sm:my-8 bg-white sm:rounded-[2rem] shadow-sm sm:shadow-xl sm:border border-slate-200 overflow-hidden relative">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 sticky top-0">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Tiến độ: {userAnswers.filter((a) => a !== null).length}/100
            </span>
            <div className="w-32 sm:w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${showMeaning ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
            >
              {showMeaning ? (
                <EyeOff className="w-4 h-4 sm:mr-1.5" />
              ) : (
                <Eye className="w-4 h-4 sm:mr-1.5" />
              )}
              <span className="hidden sm:inline">
                {showMeaning ? "Ẩn Dịch" : "Dịch Nghĩa"}
              </span>
            </button>

            <button
              onClick={() => setIsListOpen(true)}
              className="flex items-center px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold transition-colors"
            >
              <LayoutGrid className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Danh Sách</span>
            </button>
          </div>
        </div>

        {/* Cấu hình giọng đọc (Nhỏ gọn) */}
        {voices.length > 0 && (
          <div className="px-5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-end">
            <Settings2 className="w-3 h-3 mr-1.5 text-slate-400" />
            <select
              value={selectedVoiceURI}
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="bg-transparent text-slate-500 text-xs font-medium outline-none cursor-pointer max-w-[150px] truncate"
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nội dung câu hỏi */}
        <div className="p-6 sm:p-10 flex-1 bg-white flex flex-col">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div className="flex gap-4">
              {/* Nút Nghe Câu Hỏi */}
              <button
                onClick={() => playAudio()}
                className={`mt-1 shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${isPlaying ? "bg-indigo-100 border-indigo-200 text-indigo-600 scale-95" : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"}`}
              >
                <Volume2
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${isPlaying ? "animate-pulse" : ""}`}
                />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-md uppercase tracking-wider">
                    Câu hỏi {currentQuestionIndex + 1}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                  {currentQuestion.q.replace(/^\d+\.\s*/, "")}
                </h2>
                <p className="text-slate-400 font-serif italic mt-1.5 text-[1.05rem]">
                  {currentQuestion.ipa}
                </p>

                {showMeaning && (
                  <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3 inline-block">
                    <p className="text-slate-600 font-medium text-sm flex items-start">
                      <span className="mr-2 text-base leading-none">🇻🇳</span>
                      {currentQuestion.meaning}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Nút Đánh Cờ */}
            <button
              onClick={toggleFlag}
              className={`shrink-0 p-2.5 rounded-xl border transition-colors ${flags.has(currentQuestionIndex) ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600"}`}
              title="Đánh dấu xem lại"
            >
              <Flag
                className={`w-5 h-5 ${flags.has(currentQuestionIndex) ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Danh sách Đáp án */}
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => {
              const letterMatch = option.match(/^([A-C])\.\s*(.*)$/);
              const letter = letterMatch ? letterMatch[1] : "";
              const optionText = letterMatch ? letterMatch[2] : option;

              let cardStyles =
                "bg-white border-slate-200 hover:border-indigo-300 text-slate-700";
              let letterStyles =
                "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600";
              let icon = null;

              if (isAnswered) {
                if (option === currentQuestion.answer) {
                  cardStyles =
                    "bg-[#F0FDF4] border-[#4ADE80] text-[#166534] shadow-sm";
                  letterStyles = "bg-[#22C55E] text-white";
                  icon = <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />;
                } else if (option === selectedOption) {
                  cardStyles =
                    "bg-[#FFF1F2] border-[#FB7185] text-[#9F1239] shadow-sm";
                  letterStyles = "bg-[#F43F5E] text-white";
                  icon = <XCircle className="w-6 h-6 text-[#F43F5E]" />;
                } else {
                  cardStyles =
                    "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                  letterStyles = "bg-slate-100 text-slate-300";
                }
              }

              return (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 flex items-center ${cardStyles} ${!isAnswered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"}`}
                >
                  <div
                    className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-colors mr-4 ${letterStyles}`}
                  >
                    {letter}
                  </div>

                  <div className="flex-1">
                    <span className="text-[1.05rem] sm:text-[1.1rem] font-semibold block leading-tight">
                      {optionText}
                    </span>

                    {showMeaning && (
                      <div
                        className={`mt-1 font-medium text-[0.9rem] ${isAnswered && option === currentQuestion.answer ? "text-emerald-700/80" : isAnswered && option === selectedOption ? "text-rose-700/80" : "text-slate-500"}`}
                      >
                        {currentQuestion.optionsMeaning[index].replace(
                          /^[A-C]\.\s*/,
                          "",
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <button
                      onClick={(e) => handleOptionAudioClick(e, option)}
                      className={`p-2.5 rounded-full transition-all focus:outline-none ${isAnswered ? "bg-white hover:bg-slate-100 text-slate-400" : "bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 sm:opacity-0 group-hover:opacity-100 opacity-100"} `}
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                    {icon && <div className="animate-in zoom-in">{icon}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Giải thích */}
          {isAnswered && (
            <div className="mt-6 bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-2">
              <h4 className="flex items-center text-[#0369A1] font-bold text-[0.95rem] mb-1.5">
                <BookOpen className="w-4 h-4 mr-2" />
                Giải thích đáp án
              </h4>
              <p className="text-[#075985] text-[0.95rem] leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Thanh Điều Hướng (Bottom Bar) */}
        <div className="fixed sm:static bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 sm:p-6 sm:px-10 flex items-center justify-between z-40 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] sm:shadow-none">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center justify-center px-4 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Câu Trước</span>
          </button>

          <div className="flex gap-3">
            {currentQuestionIndex === balancedQuizData.length - 1 ? (
              <button
                onClick={() => setShowResult(true)}
                className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" /> Nộp Bài
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className={`flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${isAnswered ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"}`}
              >
                <span className="hidden sm:inline">Câu Tiếp</span>
                <span className="sm:hidden">Tiếp</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
