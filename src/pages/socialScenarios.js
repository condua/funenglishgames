// src/socialScenarios.js

export const scenarios = [
  // 5 tình huống gốc
  {
    id: 1,
    title: "The Spilled Coffee",
    scenario:
      "Bạn đang đi trên một con đường đông đúc và vô tình va vào ai đó, làm đổ cà phê của họ. Bạn sẽ nói gì?",
    options: [
      { text: "Oh, I'm so sorry! Let me buy you another one.", correct: true },
      { text: "It was an accident.", correct: false },
      { text: "You should watch where you're going.", correct: false },
    ],
    feedback:
      "Trong văn hóa phương Tây, việc nhận lỗi và đề nghị đền bù (mua một ly khác) được xem là rất lịch sự và có trách nhiệm, ngay cả khi đó chỉ là tai nạn nhỏ.",
  },
  {
    id: 2,
    title: "A Friend's Invitation",
    scenario:
      "Một người bạn mời bạn đi xem phim tối nay, nhưng bạn đã có kế hoạch khác. Bạn từ chối như thế nào?",
    options: [
      { text: "No, I can't.", correct: false },
      {
        text: "That sounds fun, but I already have other plans. Maybe next time?",
        correct: true,
      },
      { text: "I'm busy.", correct: false },
    ],
    feedback:
      "Khi từ chối một lời mời, nên bắt đầu bằng một lời khen ('That sounds fun'), sau đó đưa ra lý do một cách lịch sự và gợi ý cho lần sau ('Maybe next time?'). Nói 'No' hoặc 'I'm busy' có thể bị coi là cộc lốc.",
  },
  {
    id: 3,
    title: "Receiving a Compliment",
    scenario:
      "Đồng nghiệp khen chiếc áo mới của bạn: 'I love your shirt!'. Bạn đáp lại ra sao?",
    options: [
      { text: "It's old.", correct: false },
      { text: "Thanks! I just got it on sale.", correct: true },
      { text: "Do you really think so?", correct: false },
    ],
    feedback:
      "Cách đáp lại một lời khen phổ biến nhất là cảm ơn và có thể chia sẻ một thông tin nhỏ (ví dụ: 'I just got it...'). Khiêm tốn bằng cách chê món đồ của mình có thể làm người đối diện cảm thấy khó xử.",
  },
  {
    id: 4,
    title: "Asking for Help",
    scenario:
      "Bạn cần nhờ một người lạ chụp giúp một bức ảnh. Bạn sẽ bắt đầu câu nói như thế nào?",
    options: [
      {
        text: "Excuse me, could you please take a picture for us?",
        correct: true,
      },
      { text: "Hey, take a picture!", correct: false },
      { text: "Can you use a camera?", correct: false },
    ],
    feedback:
      "Luôn bắt đầu bằng 'Excuse me' để thu hút sự chú ý một cách lịch sự. Sử dụng các cấu trúc câu hỏi như 'Could you...?' hoặc 'Would you mind...?' sẽ trang trọng và lịch sự hơn là các câu mệnh lệnh.",
  },
  {
    id: 5,
    title: "Understanding an Idiom",
    scenario:
      "Một người bạn nói: 'I'm feeling a bit under the weather today.' Câu này có nghĩa là gì?",
    options: [
      { text: "Họ đang cảm thấy hơi mệt hoặc không khỏe.", correct: true },
      { text: "Họ không thích thời tiết hôm nay.", correct: false },
      { text: "Họ đang đứng dưới một đám mây.", correct: false },
    ],
    feedback:
      "'To be under the weather' là một thành ngữ (idiom) rất phổ biến, có nghĩa là cảm thấy không được khỏe trong người, hơi mệt mỏi hoặc chớm bệnh.",
  },
  // Tình huống mới
  {
    id: 6,
    title: "Responding to a Sneeze",
    scenario: "Một người bên cạnh bạn hắt xì. Bạn nên nói gì?",
    options: [
      { text: "Bless you!", correct: true },
      { text: "Are you okay?", correct: false },
      { text: "Be quiet.", correct: false },
    ],
    feedback:
      "Theo thông lệ, khi ai đó hắt xì, người nói tiếng Anh thường nói 'Bless you!'. Đây là một phản xạ xã hội lịch sự.",
  },
  {
    id: 7,
    title: "Holding the Door",
    scenario:
      "Bạn đang đi vào một tòa nhà và thấy có người đi ngay sau. Bạn làm gì?",
    options: [
      { text: "Đi vào và để cửa tự đóng lại.", correct: false },
      { text: "Giữ cửa mở cho họ và mỉm cười.", correct: true },
      { text: "Đi nhanh hơn để không phải giữ cửa.", correct: false },
    ],
    feedback:
      "Giữ cửa cho người đi ngay sau là một hành động lịch sự và được đánh giá cao trong nhiều nền văn hóa.",
  },
  {
    id: 8,
    title: "Joining a Conversation",
    scenario:
      "Bạn muốn tham gia vào cuộc trò chuyện của một nhóm người. Bạn nên nói gì?",
    options: [
      { text: "Excuse me, do you mind if I join you?", correct: true },
      { text: "What are you talking about?", correct: false },
      { text: "(Chỉ đứng đó và bắt đầu nói)", correct: false },
    ],
    feedback:
      "Xin phép một cách lịch sự ('Do you mind if I join?') là cách tốt nhất để tham gia một cuộc trò chuyện mà không làm gián đoạn hay tỏ ra thô lỗ.",
  },
  {
    id: 9,
    title: "Ending a Conversation",
    scenario: "Bạn cần kết thúc cuộc trò chuyện để đi nơi khác. Bạn nói gì?",
    options: [
      { text: "I have to go now. Bye.", correct: false },
      {
        text: "Well, it was great talking to you! I should get going.",
        correct: true,
      },
      { text: "(Lặng lẽ bỏ đi)", correct: false },
    ],
    feedback:
      "Để kết thúc cuộc trò chuyện một cách lịch sự, hãy bắt đầu bằng một câu tích cực ('It was great talking to you!'), sau đó nêu lý do bạn phải đi ('I should get going').",
  },
  {
    id: 10,
    title: "Idiom: Break a Leg",
    scenario:
      "Bạn của bạn sắp có một buổi biểu diễn. Bạn nói 'Break a leg!'. Điều đó có nghĩa là gì?",
    options: [
      { text: "Bạn hy vọng họ bị gãy chân.", correct: false },
      { text: "Bạn đang chúc họ may mắn.", correct: true },
      { text: "Bạn đang cảnh báo họ về một mối nguy hiểm.", correct: false },
    ],
    feedback:
      "'Break a leg!' là một thành ngữ độc đáo trong giới nghệ thuật, được dùng để chúc may mắn mà không nói trực tiếp từ 'good luck' (vì bị cho là xui xẻo).",
  },
  {
    id: 11,
    title: "Arriving Late",
    scenario: "Bạn đến muộn 10 phút trong một cuộc họp. Bạn nên làm gì?",
    options: [
      { text: "Lặng lẽ ngồi xuống và không nói gì.", correct: false },
      {
        text: "Xin lỗi ngắn gọn vì đã đến muộn và nhanh chóng hòa nhập.",
        correct: true,
      },
      {
        text: "Giải thích dài dòng lý do tại sao bạn đến muộn.",
        correct: false,
      },
    ],
    feedback:
      "Khi đến muộn, một lời xin lỗi ngắn gọn và chân thành ('Sorry I'm late') là đủ. Việc giải thích dài dòng sẽ làm gián đoạn cuộc họp hơn nữa.",
  },
  {
    id: 12,
    title: "Disagreeing Politely",
    scenario:
      "Trong một cuộc thảo luận, bạn không đồng ý với ý kiến của đồng nghiệp. Bạn nói gì?",
    options: [
      { text: "That's a bad idea.", correct: false },
      {
        text: "I see your point, but I have a different perspective.",
        correct: true,
      },
      { text: "You're wrong.", correct: false },
    ],
    feedback:
      "Để phản đối một cách lịch sự, hãy công nhận ý kiến của người khác trước ('I see your point'), sau đó trình bày quan điểm của bạn một cách nhẹ nhàng ('I have a different perspective').",
  },
  {
    id: 13,
    title: "Offering Food",
    scenario: "Bạn đang ăn snack và muốn mời người bạn bên cạnh. Bạn nói gì?",
    options: [
      { text: "Would you like some?", correct: true },
      { text: "Do you want this?", correct: false },
      { text: "Here, eat.", correct: false },
    ],
    feedback:
      "'Would you like...?' là cấu trúc câu mời lịch sự và phổ biến nhất trong tiếng Anh.",
  },
  {
    id: 14,
    title: "Asking for the Bill",
    scenario:
      "Bạn đã ăn xong tại một nhà hàng và muốn thanh toán. Bạn ra hiệu cho nhân viên và nói gì?",
    options: [
      { text: "Give me the bill.", correct: false },
      { text: "Excuse me, could we have the check, please?", correct: true },
      { text: "We're finished.", correct: false },
    ],
    feedback:
      "Sử dụng 'check' hoặc 'bill' đều được, nhưng cấu trúc câu hỏi lịch sự 'Could we have...?' là cách nói phù hợp nhất.",
  },
  {
    id: 15,
    title: "Idiom: Piece of Cake",
    scenario:
      "Bạn của bạn hỏi bài kiểm tra có khó không, bạn trả lời 'It was a piece of cake!'. Ý bạn là gì?",
    options: [
      { text: "Bài kiểm tra rất dễ.", correct: true },
      { text: "Bài kiểm tra có liên quan đến bánh ngọt.", correct: false },
      { text: "Bạn đã ăn bánh trong lúc làm bài.", correct: false },
    ],
    feedback:
      "'A piece of cake' là thành ngữ có nghĩa là một việc gì đó rất dễ dàng để làm.",
  },
  // Thêm 85 tình huống nữa...
  {
    id: 16,
    title: "Introducing People",
    scenario:
      "Bạn đang đi cùng bạn A và gặp bạn B. Bạn giới thiệu họ với nhau như thế nào?",
    options: [
      { text: "A, this is B. B, this is A.", correct: true },
      { text: "This is B.", correct: false },
      { text: "You two should talk.", correct: false },
    ],
    feedback:
      "Cách giới thiệu chuẩn là nói tên của người này với người kia và ngược lại. Ví dụ: 'Mary, this is Tom. Tom, this is Mary.'",
  },
  {
    id: 17,
    title: "Forgetting Someone's Name",
    scenario:
      "Bạn gặp lại một người quen nhưng không thể nhớ tên họ. Bạn nói gì?",
    options: [
      { text: "What's your name again?", correct: false },
      {
        text: "I'm so sorry, your name has just slipped my mind.",
        correct: true,
      },
      { text: "(Tránh gọi tên họ)", correct: false },
    ],
    feedback:
      "Thừa nhận một cách lịch sự rằng bạn đã quên tên ('slipped my mind') là cách tốt hơn là hỏi thẳng 'What's your name again?', vốn có thể hơi sỗ sàng.",
  },
  {
    id: 18,
    title: "Giving Bad News",
    scenario:
      "Bạn cần báo một tin không vui cho sếp (ví dụ: một dự án bị trễ). Bạn nên bắt đầu như thế nào?",
    options: [
      { text: "We have a problem.", correct: false },
      { text: "I'm afraid I have some bad news.", correct: true },
      { text: "The project is delayed.", correct: false },
    ],
    feedback:
      "Sử dụng các cụm từ làm nhẹ đi thông báo như 'I'm afraid...' hoặc 'Unfortunately...' là một cách chuyên nghiệp để truyền đạt tin xấu.",
  },
  {
    id: 19,
    title: "Comforting a Friend",
    scenario: "Bạn của bạn đang buồn. Bạn muốn an ủi họ. Bạn nói gì?",
    options: [
      { text: "Don't be sad.", correct: false },
      { text: "I'm here for you if you need anything.", correct: true },
      { text: "You'll get over it.", correct: false },
    ],
    feedback:
      "Thay vì ra lệnh cho cảm xúc của họ, hãy cho họ biết bạn luôn ở bên cạnh và sẵn sàng lắng nghe ('I'm here for you'). Điều này thể hiện sự đồng cảm.",
  },
  {
    id: 20,
    title: "Idiom: Spill the Beans",
    scenario:
      "Một người bạn nói 'Come on, spill the beans!'. Họ muốn bạn làm gì?",
    options: [
      { text: "Làm đổ hạt đậu ra ngoài.", correct: false },
      { text: "Kể cho họ nghe một bí mật hoặc một câu chuyện.", correct: true },
      { text: "Nấu ăn cùng họ.", correct: false },
    ],
    feedback:
      "'Spill the beans' là một thành ngữ có nghĩa là tiết lộ một thông tin bí mật.",
  },
  // ... tiếp tục thêm các tình huống ...
  {
    id: 21,
    title: "Asking for Clarification",
    scenario:
      "Bạn không hiểu điều giáo viên vừa giải thích. Bạn giơ tay và nói gì?",
    options: [
      { text: "I don't get it.", correct: false },
      {
        text: "Could you please explain that again in a different way?",
        correct: true,
      },
      { text: "What?", correct: false },
    ],
    feedback:
      "Yêu cầu giải thích lại một cách lịch sự ('Could you please explain...') và gợi ý một cách khác ('in a different way') cho thấy bạn đang nỗ lực để hiểu.",
  },
  {
    id: 22,
    title: "Interrupting Politely",
    scenario:
      "Bạn cần ngắt lời một người đang nói trong cuộc họp. Bạn nên nói gì?",
    options: [
      { text: "Excuse me for interrupting, but...", correct: true },
      { text: "Wait, I want to say something.", correct: false },
      { text: "(Bắt đầu nói chen vào)", correct: false },
    ],
    feedback:
      "Luôn xin lỗi trước khi ngắt lời ('Excuse me for interrupting') để giảm thiểu sự bất lịch sự.",
  },
  {
    id: 23,
    title: "Receiving a Gift",
    scenario:
      "Bạn nhận được một món quà sinh nhật mà bạn không thực sự thích. Bạn nói gì?",
    options: [
      { text: "I don't like this.", correct: false },
      {
        text: "Thank you so much! That's so thoughtful of you.",
        correct: true,
      },
      { text: "Oh, you shouldn't have.", correct: false },
    ],
    feedback:
      "Khi nhận quà, điều quan trọng là phải cảm ơn và ghi nhận sự chu đáo của người tặng, bất kể bạn có thích món quà đó hay không. 'Thoughtful' là một từ rất hay để dùng trong trường hợp này.",
  },
  {
    id: 24,
    title: "Ordering Food",
    scenario: "Nhân viên phục vụ hỏi bạn muốn dùng gì. Bạn trả lời:",
    options: [
      { text: "I want the steak.", correct: false },
      { text: "I'd like the steak, please.", correct: true },
      { text: "Give me the steak.", correct: false },
    ],
    feedback:
      "Sử dụng 'I'd like...' (viết tắt của I would like) là cách gọi món ăn lịch sự và phổ biến nhất.",
  },
  {
    id: 25,
    title: "Idiom: Costs an Arm and a Leg",
    scenario:
      "Bạn của bạn nói về chiếc điện thoại mới của anh ấy: 'It cost me an arm and a leg!'. Ý anh ấy là gì?",
    options: [
      { text: "Chiếc điện thoại rất đắt.", correct: true },
      {
        text: "Anh ấy đã phải bán một cánh tay và một cái chân để mua nó.",
        correct: false,
      },
      {
        text: "Chiếc điện thoại có hình dạng giống tay và chân.",
        correct: false,
      },
    ],
    feedback:
      "'To cost an arm and a leg' là một thành ngữ có nghĩa là một thứ gì đó cực kỳ đắt đỏ.",
  },
  // ... và cứ thế tiếp tục cho đến khi đủ 100+
  {
    id: 26,
    title: "Answering the Phone",
    scenario: "Bạn trả lời một cuộc gọi công việc. Bạn nên nói gì đầu tiên?",
    options: [
      { text: "Hello?", correct: false },
      {
        text: "Good morning, [Your Company Name], [Your Name] speaking. How can I help you?",
        correct: true,
      },
      { text: "Who's this?", correct: false },
    ],
    feedback:
      "Trong môi trường công sở, trả lời điện thoại một cách chuyên nghiệp bao gồm lời chào, tên công ty, tên bạn và một lời đề nghị giúp đỡ.",
  },
  {
    id: 27,
    title: "Expressing Sympathy",
    scenario:
      "Bạn nghe tin thú cưng của một người bạn vừa qua đời. Bạn nói gì?",
    options: [
      { text: "That's too bad.", correct: false },
      { text: "I'm so sorry for your loss.", correct: true },
      { text: "You can always get a new one.", correct: false },
    ],
    feedback:
      "'I'm sorry for your loss' là cách nói trang trọng và chân thành nhất để chia buồn với ai đó.",
  },
  {
    id: 28,
    title: "Making Small Talk",
    scenario:
      "Bạn đang ở trong thang máy với một người lạ. Để bắt đầu một cuộc nói chuyện ngắn, bạn có thể nói gì?",
    options: [
      { text: "Nice weather we're having, isn't it?", correct: true },
      { text: "What floor are you going to?", correct: false },
      { text: "(Im lặng)", correct: false },
    ],
    feedback:
      "Nói về thời tiết là một cách an toàn và phổ biến để bắt đầu một cuộc 'small talk' (nói chuyện phiếm) với người lạ.",
  },
  {
    id: 29,
    title: "Asking for Directions",
    scenario: "Bạn bị lạc và cần hỏi đường đến ga tàu. Bạn nói gì?",
    options: [
      { text: "Where is the train station?", correct: false },
      {
        text: "Excuse me, could you tell me how to get to the train station?",
        correct: true,
      },
      { text: "Train station?", correct: false },
    ],
    feedback:
      "Một lần nữa, 'Excuse me' và cấu trúc câu hỏi lịch sự 'Could you tell me...?' là cách tốt nhất để tiếp cận và nhờ sự giúp đỡ từ người lạ.",
  },
  {
    id: 30,
    title: "Idiom: Hit the Books",
    scenario:
      "Bạn của bạn nói 'I have a big exam tomorrow, so I need to hit the books tonight.' Anh ấy sẽ làm gì?",
    options: [
      { text: "Anh ấy sẽ đánh những cuốn sách của mình.", correct: false },
      { text: "Anh ấy sẽ học bài một cách chăm chỉ.", correct: true },
      { text: "Anh ấy sẽ bán sách của mình.", correct: false },
    ],
    feedback:
      "'To hit the books' là một thành ngữ có nghĩa là học tập, nghiên cứu một cách nghiêm túc, đặc biệt là cho một kỳ thi.",
  },
  // ... và cứ thế tiếp tục
  {
    id: 31,
    title: "At a Job Interview",
    scenario:
      "Người phỏng vấn hỏi: 'Do you have any questions for us?'. Câu trả lời nào là tốt nhất?",
    options: [
      { text: "No, I think you've covered everything.", correct: false },
      {
        text: "Yes, could you tell me more about the day-to-day responsibilities of this role?",
        correct: true,
      },
      { text: "How much does this job pay?", correct: false },
    ],
    feedback:
      "Luôn chuẩn bị sẵn một vài câu hỏi để hỏi nhà tuyển dụng. Điều này cho thấy bạn thực sự quan tâm đến vị trí. Hỏi về trách nhiệm hàng ngày là một câu hỏi thông minh và an toàn.",
  },
  {
    id: 32,
    title: "Giving a Toast",
    scenario:
      "Tại một bữa tiệc, bạn được yêu cầu nâng ly chúc mừng. Bạn nên nói gì?",
    options: [
      { text: "Let's drink!", correct: false },
      {
        text: "I'd like to propose a toast to our hosts for a wonderful evening!",
        correct: true,
      },
      { text: "Everyone, be quiet and listen to me.", correct: false },
    ],
    feedback:
      "'I'd like to propose a toast to...' là cách nói trang trọng và lịch sự để bắt đầu một lời chúc mừng.",
  },
  {
    id: 33,
    title: "Dealing with a Crying Baby",
    scenario:
      "Bạn đang trên máy bay và em bé ngồi sau bạn khóc rất to. Bạn nên làm gì?",
    options: [
      { text: "Yêu cầu bố mẹ em bé im lặng.", correct: false },
      { text: "Đeo tai nghe và cố gắng thông cảm.", correct: true },
      { text: "Lườm bố mẹ em bé một cách giận dữ.", correct: false },
    ],
    feedback:
      "Đây là một tình huống khó xử. Cách tốt nhất là thể hiện sự kiên nhẫn và thông cảm. Hầu hết các bậc cha mẹ đã rất căng thẳng khi con họ khóc ở nơi công cộng.",
  },
  {
    id: 34,
    title: "Receiving Criticism",
    scenario:
      "Sếp của bạn chỉ ra một lỗi trong báo cáo của bạn. Bạn nên phản ứng thế nào?",
    options: [
      { text: "It's not my fault.", correct: false },
      {
        text: "Thank you for pointing that out. I'll fix it right away.",
        correct: true,
      },
      { text: "But I worked really hard on it.", correct: false },
    ],
    feedback:
      "Khi nhận được những lời phê bình mang tính xây dựng, hãy cảm ơn người góp ý và thể hiện thái độ cầu tiến. Điều này cho thấy sự chuyên nghiệp của bạn.",
  },
  {
    id: 35,
    title: "Idiom: When Pigs Fly",
    scenario:
      "Bạn hỏi liệu bạn của bạn có dọn dẹp phòng của anh ấy không, và anh ấy trả lời 'Yeah, when pigs fly!'. Ý anh ấy là gì?",
    options: [
      { text: "Anh ấy sẽ không bao giờ làm điều đó.", correct: true },
      {
        text: "Anh ấy sẽ làm điều đó khi nhìn thấy một con lợn bay.",
        correct: false,
      },
      { text: "Anh ấy đang nuôi một con lợn biết bay.", correct: false },
    ],
    feedback:
      "'When pigs fly' là một thành ngữ được dùng để nói về một điều gì đó sẽ không bao giờ xảy ra.",
  },
];
