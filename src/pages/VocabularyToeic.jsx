import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  CheckCircle,
  BookOpen,
  Shuffle,
  Filter,
  RefreshCw,
  Volume2,
} from "lucide-react";

// --- DỮ LIỆU TỪ VỰNG (300 TỪ) ---
const INITIAL_VOCABULARY = [
  // 1. CONTRACTS (HỢP ĐỒNG)
  {
    id: 1,
    word: "Abide by",
    ipa: "/ə'baid bai/",
    type: "v",
    meaning: "Tuân thủ",
    example: "Parties must abide by the terms.",
    topic: "Contracts",
  },
  {
    id: 2,
    word: "Agreement",
    ipa: "/ə'gri:mənt/",
    type: "n",
    meaning: "Hợp đồng, sự thỏa thuận",
    example: "We signed the agreement yesterday.",
    topic: "Contracts",
  },
  {
    id: 3,
    word: "Assurance",
    ipa: "/ə'ʃuərəns/",
    type: "n",
    meaning: "Sự cam đoan",
    example: "He gave his assurance.",
    topic: "Contracts",
  },
  {
    id: 4,
    word: "Cancellation",
    ipa: "/,kænse'leiʃn/",
    type: "n",
    meaning: "Sự hủy bỏ",
    example: "Cancellation charges apply.",
    topic: "Contracts",
  },
  {
    id: 5,
    word: "Determine",
    ipa: "/di'tə:min/",
    type: "v",
    meaning: "Quyết định, xác định",
    example: "We must determine the cause.",
    topic: "Contracts",
  },
  {
    id: 6,
    word: "Engage",
    ipa: "/in'geidʤ/",
    type: "v",
    meaning: "Tham gia, cam kết",
    example: "He engaged in a dispute.",
    topic: "Contracts",
  },
  {
    id: 7,
    word: "Establish",
    ipa: "/is'tæbliʃ/",
    type: "v",
    meaning: "Thành lập, thiết lập",
    example: "Let's establish a rule.",
    topic: "Contracts",
  },
  {
    id: 8,
    word: "Obligate",
    ipa: "/'ɔbligeit/",
    type: "v",
    meaning: "Bắt buộc",
    example: "The contract obligates us.",
    topic: "Contracts",
  },
  {
    id: 9,
    word: "Party",
    ipa: "/'pɑ:ti/",
    type: "n",
    meaning: "Bên (trong hợp đồng)",
    example: "Both parties agreed.",
    topic: "Contracts",
  },
  {
    id: 10,
    word: "Provision",
    ipa: "/prə'viʒn/",
    type: "n",
    meaning: "Điều khoản",
    example: "A provision for delays.",
    topic: "Contracts",
  },
  {
    id: 11,
    word: "Resolve",
    ipa: "/ri'zɔlv/",
    type: "v",
    meaning: "Giải quyết",
    example: "Resolve the conflict.",
    topic: "Contracts",
  },
  {
    id: 12,
    word: "Specific",
    ipa: "/spi'sifik/",
    type: "adj",
    meaning: "Cụ thể",
    example: "Be specific about details.",
    topic: "Contracts",
  },

  // 2. MARKETING (TIẾP THỊ)
  {
    id: 13,
    word: "Attract",
    ipa: "/ə'trækt/",
    type: "v",
    meaning: "Thu hút",
    example: "Attract more customers.",
    topic: "Marketing",
  },
  {
    id: 14,
    word: "Compare",
    ipa: "/kəm'peə/",
    type: "v",
    meaning: "So sánh",
    example: "Compare our prices.",
    topic: "Marketing",
  },
  {
    id: 15,
    word: "Competition",
    ipa: "/,kɔmpi'tiʃn/",
    type: "n",
    meaning: "Sự cạnh tranh",
    example: "Fierce competition.",
    topic: "Marketing",
  },
  {
    id: 16,
    word: "Consume",
    ipa: "/kən'sju:m/",
    type: "v",
    meaning: "Tiêu thụ",
    example: "Consume less energy.",
    topic: "Marketing",
  },
  {
    id: 17,
    word: "Convince",
    ipa: "/kən'vins/",
    type: "v",
    meaning: "Thuyết phục",
    example: "Convince the buyer.",
    topic: "Marketing",
  },
  {
    id: 18,
    word: "Current",
    ipa: "/'kʌrənt/",
    type: "adj",
    meaning: "Hiện tại",
    example: "Current market trends.",
    topic: "Marketing",
  },
  {
    id: 19,
    word: "Fad",
    ipa: "/fæd/",
    type: "n",
    meaning: "Mốt nhất thời",
    example: "It's just a fad.",
    topic: "Marketing",
  },
  {
    id: 20,
    word: "Inspiration",
    ipa: "/,inspə'reiʃn/",
    type: "n",
    meaning: "Cảm hứng",
    example: "Source of inspiration.",
    topic: "Marketing",
  },
  {
    id: 21,
    word: "Market",
    ipa: "/'mɑ:kit/",
    type: "v",
    meaning: "Tiếp thị, quảng bá",
    example: "Market the new product.",
    topic: "Marketing",
  },
  {
    id: 22,
    word: "Persuasion",
    ipa: "/pə'sweiʒn/",
    type: "n",
    meaning: "Sự thuyết phục",
    example: "Power of persuasion.",
    topic: "Marketing",
  },
  {
    id: 23,
    word: "Productive",
    ipa: "/prə'dʌktiv/",
    type: "adj",
    meaning: "Năng suất",
    example: "A productive meeting.",
    topic: "Marketing",
  },
  {
    id: 24,
    word: "Satisfaction",
    ipa: "/,sætis'fækʃn/",
    type: "n",
    meaning: "Sự thỏa mãn",
    example: "Customer satisfaction.",
    topic: "Marketing",
  },

  // 3. WARRANTIES (BẢO HÀNH)
  {
    id: 25,
    word: "Characteristic",
    ipa: "/,kærəktə'ristik/",
    type: "n",
    meaning: "Đặc tính",
    example: "Product characteristic.",
    topic: "Warranties",
  },
  {
    id: 26,
    word: "Consequence",
    ipa: "/'kɔnsikwəns/",
    type: "n",
    meaning: "Hậu quả",
    example: "Serious consequences.",
    topic: "Warranties",
  },
  {
    id: 27,
    word: "Consider",
    ipa: "/kən'sidə/",
    type: "v",
    meaning: "Cân nhắc",
    example: "Consider the warranty.",
    topic: "Warranties",
  },
  {
    id: 28,
    word: "Cover",
    ipa: "/'kʌvə/",
    type: "v",
    meaning: "Bao gồm, bảo hiểm",
    example: "Warranty covers repairs.",
    topic: "Warranties",
  },
  {
    id: 29,
    word: "Expiration",
    ipa: "/,ekspaiə'reiʃn/",
    type: "n",
    meaning: "Sự hết hạn",
    example: "Expiration date.",
    topic: "Warranties",
  },
  {
    id: 30,
    word: "Frequently",
    ipa: "/'fri:kwəntli/",
    type: "adv",
    meaning: "Thường xuyên",
    example: "Break down frequently.",
    topic: "Warranties",
  },
  {
    id: 31,
    word: "Imply",
    ipa: "/im'plai/",
    type: "v",
    meaning: "Ngụ ý",
    example: "The guarantee implies...",
    topic: "Warranties",
  },
  {
    id: 32,
    word: "Promise",
    ipa: "/'prɔmis/",
    type: "v",
    meaning: "Hứa, cam kết",
    example: "Promise to replace.",
    topic: "Warranties",
  },
  {
    id: 33,
    word: "Protect",
    ipa: "/prə'tekt/",
    type: "v",
    meaning: "Bảo vệ",
    example: "Protect consumers.",
    topic: "Warranties",
  },
  {
    id: 34,
    word: "Reputation",
    ipa: "/,repju:'teiʃn/",
    type: "n",
    meaning: "Danh tiếng",
    example: "Good reputation.",
    topic: "Warranties",
  },
  {
    id: 35,
    word: "Require",
    ipa: "/ri'kwaiə/",
    type: "v",
    meaning: "Yêu cầu",
    example: "Proof required.",
    topic: "Warranties",
  },
  {
    id: 36,
    word: "Variety",
    ipa: "/və'raiəti/",
    type: "n",
    meaning: "Sự đa dạng",
    example: "Variety of options.",
    topic: "Warranties",
  },

  // 4. BUSINESS PLANNING (KẾ HOẠCH KINH DOANH)
  {
    id: 37,
    word: "Address",
    ipa: "/ə'dres/",
    type: "v",
    meaning: "Giải quyết, nhắm tới",
    example: "Address the issue.",
    topic: "Planning",
  },
  {
    id: 38,
    word: "Avoid",
    ipa: "/ə'vɔid/",
    type: "v",
    meaning: "Tránh",
    example: "Avoid mistakes.",
    topic: "Planning",
  },
  {
    id: 39,
    word: "Demonstrate",
    ipa: "/'demənstreit/",
    type: "v",
    meaning: "Chứng minh",
    example: "Demonstrate success.",
    topic: "Planning",
  },
  {
    id: 40,
    word: "Develop",
    ipa: "/di'veləp/",
    type: "v",
    meaning: "Phát triển",
    example: "Develop a plan.",
    topic: "Planning",
  },
  {
    id: 41,
    word: "Evaluate",
    ipa: "/i'væljueit/",
    type: "v",
    meaning: "Đánh giá",
    example: "Evaluate performance.",
    topic: "Planning",
  },
  {
    id: 42,
    word: "Gather",
    ipa: "/'gæðə/",
    type: "v",
    meaning: "Thu thập",
    example: "Gather data.",
    topic: "Planning",
  },
  {
    id: 43,
    word: "Offer",
    ipa: "/'ɔfə/",
    type: "v",
    meaning: "Đề nghị, cung cấp",
    example: "Offer a solution.",
    topic: "Planning",
  },
  {
    id: 44,
    word: "Primarily",
    ipa: "/'praimərili/",
    type: "adv",
    meaning: "Chủ yếu",
    example: "Primarily responsible.",
    topic: "Planning",
  },
  {
    id: 45,
    word: "Risk",
    ipa: "/risk/",
    type: "n",
    meaning: "Rủi ro",
    example: "Calculate the risk.",
    topic: "Planning",
  },
  {
    id: 46,
    word: "Strategy",
    ipa: "/'strætidʤi/",
    type: "n",
    meaning: "Chiến lược",
    example: "Marketing strategy.",
    topic: "Planning",
  },
  {
    id: 47,
    word: "Strong",
    ipa: "/strɔɳ/",
    type: "adj",
    meaning: "Mạnh mẽ",
    example: "Strong economy.",
    topic: "Planning",
  },
  {
    id: 48,
    word: "Substitution",
    ipa: "/,sʌbsti'tju:ʃn/",
    type: "n",
    meaning: "Sự thay thế",
    example: "Product substitution.",
    topic: "Planning",
  },

  // 5. CONFERENCES (HỘI NGHỊ)
  {
    id: 49,
    word: "Accommodate",
    ipa: "/ə'kɔmədeit/",
    type: "v",
    meaning: "Cung cấp, đáp ứng",
    example: "Accommodate guests.",
    topic: "Conferences",
  },
  {
    id: 50,
    word: "Arrangement",
    ipa: "/ə'reindʤmənt/",
    type: "n",
    meaning: "Sự sắp xếp",
    example: "Make arrangements.",
    topic: "Conferences",
  },
  {
    id: 51,
    word: "Association",
    ipa: "/ə,sousi'eiʃn/",
    type: "n",
    meaning: "Hiệp hội",
    example: "Trade association.",
    topic: "Conferences",
  },
  {
    id: 52,
    word: "Attend",
    ipa: "/ə'tend/",
    type: "v",
    meaning: "Tham dự",
    example: "Attend the meeting.",
    topic: "Conferences",
  },
  {
    id: 53,
    word: "Get in touch",
    ipa: "/get in tʌtʃ/",
    type: "v",
    meaning: "Liên lạc",
    example: "Get in touch with us.",
    topic: "Conferences",
  },
  {
    id: 54,
    word: "Hold",
    ipa: "/hould/",
    type: "v",
    meaning: "Tổ chức",
    example: "Hold a conference.",
    topic: "Conferences",
  },
  {
    id: 55,
    word: "Location",
    ipa: "/lou'keiʃn/",
    type: "n",
    meaning: "Địa điểm",
    example: "Conference location.",
    topic: "Conferences",
  },
  {
    id: 56,
    word: "Overcrowded",
    ipa: "/,ouvə'kraudid/",
    type: "adj",
    meaning: "Quá đông",
    example: "The room was overcrowded.",
    topic: "Conferences",
  },
  {
    id: 57,
    word: "Register",
    ipa: "/'redʤistə/",
    type: "v",
    meaning: "Đăng ký",
    example: "Register for the event.",
    topic: "Conferences",
  },
  {
    id: 58,
    word: "Select",
    ipa: "/si'lekt/",
    type: "v",
    meaning: "Chọn lựa",
    example: "Select a venue.",
    topic: "Conferences",
  },
  {
    id: 59,
    word: "Session",
    ipa: "/'seʃn/",
    type: "n",
    meaning: "Phiên họp",
    example: "Morning session.",
    topic: "Conferences",
  },
  {
    id: 60,
    word: "Take part in",
    ipa: "/teik pɑ:t in/",
    type: "v",
    meaning: "Tham gia",
    example: "Take part in discussions.",
    topic: "Conferences",
  },

  // 6. COMPUTERS & TECH (MÁY TÍNH)
  {
    id: 61,
    word: "Access",
    ipa: "/'ækses/",
    type: "v",
    meaning: "Truy cập",
    example: "Access the database.",
    topic: "Computers",
  },
  {
    id: 62,
    word: "Allocate",
    ipa: "/'æləkeit/",
    type: "v",
    meaning: "Phân bổ",
    example: "Allocate resources.",
    topic: "Computers",
  },
  {
    id: 63,
    word: "Compatible",
    ipa: "/kəm'pætəbl/",
    type: "adj",
    meaning: "Tương thích",
    example: "Compatible software.",
    topic: "Computers",
  },
  {
    id: 64,
    word: "Delete",
    ipa: "/di'li:t/",
    type: "v",
    meaning: "Xóa",
    example: "Delete the file.",
    topic: "Computers",
  },
  {
    id: 65,
    word: "Display",
    ipa: "/dis'plei/",
    type: "n",
    meaning: "Màn hình, hiển thị",
    example: "Video display.",
    topic: "Computers",
  },
  {
    id: 66,
    word: "Duplicate",
    ipa: "/'dju:plikit/",
    type: "v",
    meaning: "Sao chép",
    example: "Duplicate the record.",
    topic: "Computers",
  },
  {
    id: 67,
    word: "Failure",
    ipa: "/'feiljə/",
    type: "n",
    meaning: "Sự thất bại, hỏng",
    example: "System failure.",
    topic: "Computers",
  },
  {
    id: 68,
    word: "Figure out",
    ipa: "/'figjə aut/",
    type: "v",
    meaning: "Tìm ra, hiểu",
    example: "Figure out the problem.",
    topic: "Computers",
  },
  {
    id: 69,
    word: "Ignore",
    ipa: "/ig'nɔ:/",
    type: "v",
    meaning: "Phớt lờ",
    example: "Ignore the warning.",
    topic: "Computers",
  },
  {
    id: 70,
    word: "Search",
    ipa: "/sə:tʃ/",
    type: "v",
    meaning: "Tìm kiếm",
    example: "Search for info.",
    topic: "Computers",
  },
  {
    id: 71,
    word: "Shut down",
    ipa: "/ʃʌt daun/",
    type: "v",
    meaning: "Tắt máy",
    example: "Shut down the PC.",
    topic: "Computers",
  },
  {
    id: 72,
    word: "Warning",
    ipa: "/'wɔ:niɳ/",
    type: "n",
    meaning: "Cảnh báo",
    example: "Virus warning.",
    topic: "Computers",
  },

  // 7. OFFICE TECHNOLOGY (CÔNG NGHỆ VĂN PHÒNG)
  {
    id: 73,
    word: "Affordable",
    ipa: "/ə'fɔ:dəbl/",
    type: "adj",
    meaning: "Giá phải chăng",
    example: "Affordable price.",
    topic: "Office Tech",
  },
  {
    id: 74,
    word: "As needed",
    ipa: "/æz 'ni:did/",
    type: "adv",
    meaning: "Khi cần",
    example: "Update as needed.",
    topic: "Office Tech",
  },
  {
    id: 75,
    word: "Capacity",
    ipa: "/kə'pæsiti/",
    type: "n",
    meaning: "Sức chứa",
    example: "Storage capacity.",
    topic: "Office Tech",
  },
  {
    id: 76,
    word: "Durable",
    ipa: "/'djuərəbl/",
    type: "adj",
    meaning: "Bền",
    example: "Durable equipment.",
    topic: "Office Tech",
  },
  {
    id: 77,
    word: "Initiative",
    ipa: "/i'niʃiətiv/",
    type: "n",
    meaning: "Sáng kiến",
    example: "Take initiative.",
    topic: "Office Tech",
  },
  {
    id: 78,
    word: "Physical",
    ipa: "/'fizikəl/",
    type: "adj",
    meaning: "Vật lý",
    example: "Physical size.",
    topic: "Office Tech",
  },
  {
    id: 79,
    word: "Provider",
    ipa: "/prə'vaidə/",
    type: "n",
    meaning: "Nhà cung cấp",
    example: "Service provider.",
    topic: "Office Tech",
  },
  {
    id: 80,
    word: "Recur",
    ipa: "/ri'kə:/",
    type: "v",
    meaning: "Tái diễn",
    example: "Problem recurs.",
    topic: "Office Tech",
  },
  {
    id: 81,
    word: "Reduction",
    ipa: "/ri'dʌkʃn/",
    type: "n",
    meaning: "Sự giảm bớt",
    example: "Cost reduction.",
    topic: "Office Tech",
  },
  {
    id: 82,
    word: "Stay on top of",
    ipa: "/.../",
    type: "v",
    meaning: "Cập nhật, nắm bắt",
    example: "Stay on top of news.",
    topic: "Office Tech",
  },
  {
    id: 83,
    word: "Stock",
    ipa: "/stɔk/",
    type: "v",
    meaning: "Dự trữ, kho",
    example: "In stock.",
    topic: "Office Tech",
  },
  {
    id: 84,
    word: "Appreciation",
    ipa: "/ə,pri:ʃi'eiʃn/",
    type: "n",
    meaning: "Sự đánh giá cao",
    example: "Show appreciation.",
    topic: "Office Tech",
  },

  // 8. OFFICE PROCEDURES (QUY TRÌNH VĂN PHÒNG)
  {
    id: 85,
    word: "Casual",
    ipa: "/'kæʒjuəl/",
    type: "adj",
    meaning: "Bình thường (không trang trọng)",
    example: "Casual dress code.",
    topic: "Procedures",
  },
  {
    id: 86,
    word: "Code",
    ipa: "/koud/",
    type: "n",
    meaning: "Bộ quy tắc",
    example: "Code of conduct.",
    topic: "Procedures",
  },
  {
    id: 87,
    word: "Expose",
    ipa: "/iks'pouz/",
    type: "v",
    meaning: "Phơi bày",
    example: "Expose the truth.",
    topic: "Procedures",
  },
  {
    id: 88,
    word: "Glimpse",
    ipa: "/glimps/",
    type: "n",
    meaning: "Cái nhìn thoáng qua",
    example: "A glimpse of the future.",
    topic: "Procedures",
  },
  {
    id: 89,
    word: "Made of",
    ipa: "/meid əv/",
    type: "v",
    meaning: "Làm từ",
    example: "Made of plastic.",
    topic: "Procedures",
  },
  {
    id: 90,
    word: "Out of",
    ipa: "/aut əv/",
    type: "adj",
    meaning: "Hết",
    example: "Out of paper.",
    topic: "Procedures",
  },
  {
    id: 91,
    word: "Outdated",
    ipa: "/aut'deitid/",
    type: "adj",
    meaning: "Lỗi thời",
    example: "Outdated method.",
    topic: "Procedures",
  },
  {
    id: 92,
    word: "Practice",
    ipa: "/'præktis/",
    type: "n",
    meaning: "Thực tiễn, thói quen",
    example: "Standard practice.",
    topic: "Procedures",
  },
  {
    id: 93,
    word: "Reinforce",
    ipa: "/,ri:in'fɔ:s/",
    type: "v",
    meaning: "Củng cố",
    example: "Reinforce rules.",
    topic: "Procedures",
  },
  {
    id: 94,
    word: "Verbally",
    ipa: "/'və:bəli/",
    type: "adv",
    meaning: "Bằng lời nói",
    example: "Communicate verbally.",
    topic: "Procedures",
  },
  {
    id: 95,
    word: "Device",
    ipa: "/di'vais/",
    type: "n",
    meaning: "Thiết bị",
    example: "Electronic device.",
    topic: "Procedures",
  },
  {
    id: 96,
    word: "Facilitate",
    ipa: "/fə'siliteit/",
    type: "v",
    meaning: "Tạo điều kiện",
    example: "Facilitate work.",
    topic: "Procedures",
  },

  // 9. ELECTRONICS (ĐIỆN TỬ)
  {
    id: 97,
    word: "Disk",
    ipa: "/disk/",
    type: "n",
    meaning: "Đĩa",
    example: "Hard disk.",
    topic: "Electronics",
  },
  {
    id: 98,
    word: "Facilitate",
    ipa: "/fə'siliteit/",
    type: "v",
    meaning: "Làm cho dễ dàng",
    example: "Facilitate usage.",
    topic: "Electronics",
  },
  {
    id: 99,
    word: "Network",
    ipa: "/'netwə:k/",
    type: "n",
    meaning: "Mạng lưới",
    example: "Computer network.",
    topic: "Electronics",
  },
  {
    id: 100,
    word: "Popularity",
    ipa: "/,pɔpju'læriti/",
    type: "n",
    meaning: "Sự phổ biến",
    example: "Growing popularity.",
    topic: "Electronics",
  },
  {
    id: 101,
    word: "Process",
    ipa: "/'prouses/",
    type: "v",
    meaning: "Xử lý",
    example: "Process data.",
    topic: "Electronics",
  },
  {
    id: 102,
    word: "Replace",
    ipa: "/ri'pleis/",
    type: "v",
    meaning: "Thay thế",
    example: "Replace the battery.",
    topic: "Electronics",
  },
  {
    id: 103,
    word: "Revolution",
    ipa: "/,revə'lu:ʃn/",
    type: "n",
    meaning: "Cuộc cách mạng",
    example: "Tech revolution.",
    topic: "Electronics",
  },
  {
    id: 104,
    word: "Sharp",
    ipa: "/ʃɑ:p/",
    type: "adj",
    meaning: "Sắc nét, thông minh",
    example: "Sharp image.",
    topic: "Electronics",
  },
  {
    id: 105,
    word: "Skill",
    ipa: "/skil/",
    type: "n",
    meaning: "Kỹ năng",
    example: "Technical skill.",
    topic: "Electronics",
  },
  {
    id: 106,
    word: "Software",
    ipa: "/'sɔftweə/",
    type: "n",
    meaning: "Phần mềm",
    example: "Install software.",
    topic: "Electronics",
  },
  {
    id: 107,
    word: "Store",
    ipa: "/stɔ:/",
    type: "v",
    meaning: "Lưu trữ",
    example: "Store data.",
    topic: "Electronics",
  },
  {
    id: 108,
    word: "Technical",
    ipa: "/'teknikəl/",
    type: "adj",
    meaning: "Kỹ thuật",
    example: "Technical support.",
    topic: "Electronics",
  },

  // 10. CORRESPONDENCE (THƯ TÍN)
  {
    id: 109,
    word: "Assemble",
    ipa: "/ə'sembl/",
    type: "v",
    meaning: "Tập hợp",
    example: "Assemble documents.",
    topic: "Correspondence",
  },
  {
    id: 110,
    word: "Beforehand",
    ipa: "/bi'fɔ:hænd/",
    type: "adv",
    meaning: "Trước",
    example: "Know beforehand.",
    topic: "Correspondence",
  },
  {
    id: 111,
    word: "Complication",
    ipa: "/,kɔmpli'keiʃn/",
    type: "n",
    meaning: "Sự phức tạp",
    example: "Avoid complications.",
    topic: "Correspondence",
  },
  {
    id: 112,
    word: "Courier",
    ipa: "/'kuriə/",
    type: "n",
    meaning: "Người chuyển phát",
    example: "Send by courier.",
    topic: "Correspondence",
  },
  {
    id: 113,
    word: "Express",
    ipa: "/iks'pres/",
    type: "adj",
    meaning: "Nhanh, tốc hành",
    example: "Express mail.",
    topic: "Correspondence",
  },
  {
    id: 114,
    word: "Fold",
    ipa: "/fould/",
    type: "v",
    meaning: "Gấp",
    example: "Fold the letter.",
    topic: "Correspondence",
  },
  {
    id: 115,
    word: "Layout",
    ipa: "/'leiaut/",
    type: "n",
    meaning: "Bố cục",
    example: "Letter layout.",
    topic: "Correspondence",
  },
  {
    id: 116,
    word: "Mention",
    ipa: "/'menʃn/",
    type: "v",
    meaning: "Đề cập",
    example: "Mention the date.",
    topic: "Correspondence",
  },
  {
    id: 117,
    word: "Petition",
    ipa: "/pi'tiʃn/",
    type: "n",
    meaning: "Kiến nghị",
    example: "Sign a petition.",
    topic: "Correspondence",
  },
  {
    id: 118,
    word: "Proof",
    ipa: "/pru:f/",
    type: "n",
    meaning: "Bằng chứng",
    example: "Proof of delivery.",
    topic: "Correspondence",
  },
  {
    id: 119,
    word: "Registered",
    ipa: "/'redʤistəd/",
    type: "adj",
    meaning: "Đã đăng ký (gửi bảo đảm)",
    example: "Registered mail.",
    topic: "Correspondence",
  },
  {
    id: 120,
    word: "Revise",
    ipa: "/ri'vaiz/",
    type: "v",
    meaning: "Sửa lại, xem lại",
    example: "Revise the draft.",
    topic: "Correspondence",
  },

  // 11. JOB ADVERTISING (QUẢNG CÁO VIỆC LÀM)
  {
    id: 121,
    word: "Abundant",
    ipa: "/ə'bʌndənt/",
    type: "adj",
    meaning: "Phong phú",
    example: "Abundant opportunities.",
    topic: "Job Ads",
  },
  {
    id: 122,
    word: "Accomplishment",
    ipa: "/ə'kɔmpliʃmənt/",
    type: "n",
    meaning: "Thành tựu",
    example: "List your accomplishments.",
    topic: "Job Ads",
  },
  {
    id: 123,
    word: "Bring together",
    ipa: "/.../",
    type: "v",
    meaning: "Tập hợp",
    example: "Bring people together.",
    topic: "Job Ads",
  },
  {
    id: 124,
    word: "Candidate",
    ipa: "/'kændidit/",
    type: "n",
    meaning: "Ứng viên",
    example: "Best candidate.",
    topic: "Job Ads",
  },
  {
    id: 125,
    word: "Come up with",
    ipa: "/.../",
    type: "v",
    meaning: "Nghĩ ra",
    example: "Come up with ideas.",
    topic: "Job Ads",
  },
  {
    id: 126,
    word: "Commensurate",
    ipa: "/kə'menʃərit/",
    type: "adj",
    meaning: "Tương xứng",
    example: "Salary commensurate with exp.",
    topic: "Job Ads",
  },
  {
    id: 127,
    word: "Match",
    ipa: "/mætʃ/",
    type: "v",
    meaning: "Phù hợp, khớp",
    example: "Match skills to job.",
    topic: "Job Ads",
  },
  {
    id: 128,
    word: "Profile",
    ipa: "/'proufail/",
    type: "n",
    meaning: "Hồ sơ năng lực",
    example: "Company profile.",
    topic: "Job Ads",
  },
  {
    id: 129,
    word: "Qualification",
    ipa: "/,kwɔlifi'keiʃn/",
    type: "n",
    meaning: "Trình độ chuyên môn",
    example: "Required qualifications.",
    topic: "Job Ads",
  },
  {
    id: 130,
    word: "Recruit",
    ipa: "/ri'kru:t/",
    type: "v",
    meaning: "Tuyển dụng",
    example: "Recruit new staff.",
    topic: "Job Ads",
  },
  {
    id: 131,
    word: "Submit",
    ipa: "/səb'mit/",
    type: "v",
    meaning: "Nộp",
    example: "Submit resume.",
    topic: "Job Ads",
  },
  {
    id: 132,
    word: "Time-consuming",
    ipa: "/.../",
    type: "adj",
    meaning: "Tốn thời gian",
    example: "It is time-consuming.",
    topic: "Job Ads",
  },

  // 12. HIRING & TRAINING (TUYỂN DỤNG & ĐÀO TẠO)
  {
    id: 133,
    word: "Ability",
    ipa: "/ə'biliti/",
    type: "n",
    meaning: "Khả năng",
    example: "Ability to learn.",
    topic: "Hiring",
  },
  {
    id: 134,
    word: "Apply",
    ipa: "/ə'plai/",
    type: "v",
    meaning: "Ứng tuyển",
    example: "Apply for a job.",
    topic: "Hiring",
  },
  {
    id: 135,
    word: "Background",
    ipa: "/'bækgraund/",
    type: "n",
    meaning: "Nền tảng, lý lịch",
    example: "Educational background.",
    topic: "Hiring",
  },
  {
    id: 136,
    word: "Be ready for",
    ipa: "/.../",
    type: "v",
    meaning: "Sẵn sàng cho",
    example: "Ready for interview.",
    topic: "Hiring",
  },
  {
    id: 137,
    word: "Confidence",
    ipa: "/'kɔnfidəns/",
    type: "n",
    meaning: "Sự tự tin",
    example: "Show confidence.",
    topic: "Hiring",
  },
  {
    id: 138,
    word: "Constantly",
    ipa: "/'kɔnstəntli/",
    type: "adv",
    meaning: "Liên tục",
    example: "Learn constantly.",
    topic: "Hiring",
  },
  {
    id: 139,
    word: "Expert",
    ipa: "/'ekspə:t/",
    type: "n",
    meaning: "Chuyên gia",
    example: "Industry expert.",
    topic: "Hiring",
  },
  {
    id: 140,
    word: "Follow up",
    ipa: "/.../",
    type: "v",
    meaning: "Theo dõi, tiếp nối",
    example: "Follow up call.",
    topic: "Hiring",
  },
  {
    id: 141,
    word: "Hesitant",
    ipa: "/'hezitənt/",
    type: "adj",
    meaning: "Do dự",
    example: "Don't be hesitant.",
    topic: "Hiring",
  },
  {
    id: 142,
    word: "Present",
    ipa: "/pri'zent/",
    type: "v",
    meaning: "Trình bày",
    example: "Present your skills.",
    topic: "Hiring",
  },
  {
    id: 143,
    word: "Weakly",
    ipa: "/'wi:kli/",
    type: "adv",
    meaning: "Một cách yếu ớt",
    example: "Answered weakly.",
    topic: "Hiring",
  },
  {
    id: 144,
    word: "Conduct",
    ipa: "/kən'dʌkt/",
    type: "v",
    meaning: "Tiến hành",
    example: "Conduct an interview.",
    topic: "Hiring",
  },

  // 13. SALARIES & BENEFITS (LƯƠNG & PHÚC LỢI)
  {
    id: 145,
    word: "Basis",
    ipa: "/'beisis/",
    type: "n",
    meaning: "Cơ sở, nền tảng",
    example: "On a daily basis.",
    topic: "Salaries",
  },
  {
    id: 146,
    word: "Benefit",
    ipa: "/'benifit/",
    type: "n",
    meaning: "Phúc lợi, lợi ích",
    example: "Employee benefits.",
    topic: "Salaries",
  },
  {
    id: 147,
    word: "Compensate",
    ipa: "/'kɔmpenseit/",
    type: "v",
    meaning: "Đền bù, trả công",
    example: "Compensate for overtime.",
    topic: "Salaries",
  },
  {
    id: 148,
    word: "Delicately",
    ipa: "/'delikitli/",
    type: "adv",
    meaning: "Một cách tế nhị",
    example: "Handle delicately.",
    topic: "Salaries",
  },
  {
    id: 149,
    word: "Eligible",
    ipa: "/'elidʤəbl/",
    type: "adj",
    meaning: "Đủ tư cách, thích hợp",
    example: "Eligible for bonus.",
    topic: "Salaries",
  },
  {
    id: 150,
    word: "Flexibly",
    ipa: "/'fleksəbli/",
    type: "adv",
    meaning: "Linh hoạt",
    example: "Work flexibly.",
    topic: "Salaries",
  },
  {
    id: 151,
    word: "Negotiate",
    ipa: "/ni'gouʃieit/",
    type: "v",
    meaning: "Thương lượng",
    example: "Negotiate salary.",
    topic: "Salaries",
  },
  {
    id: 152,
    word: "Raise",
    ipa: "/reiz/",
    type: "n",
    meaning: "Sự tăng lương",
    example: "Ask for a raise.",
    topic: "Salaries",
  },
  {
    id: 153,
    word: "Retire",
    ipa: "/ri'taiə/",
    type: "v",
    meaning: "Nghỉ hưu",
    example: "Retire at 60.",
    topic: "Salaries",
  },
  {
    id: 154,
    word: "Vested",
    ipa: "/'vestid/",
    type: "adj",
    meaning: "Được quyền, được trao",
    example: "Vested interest.",
    topic: "Salaries",
  },
  {
    id: 155,
    word: "Wage",
    ipa: "/weidʤ/",
    type: "n",
    meaning: "Tiền công (theo giờ)",
    example: "Minimum wage.",
    topic: "Salaries",
  },
  {
    id: 156,
    word: "Achievement",
    ipa: "/ə'tʃi:vmənt/",
    type: "n",
    meaning: "Thành tích",
    example: "Great achievement.",
    topic: "Salaries",
  },

  // 14. BANKING (NGÂN HÀNG)
  {
    id: 157,
    word: "Accept",
    ipa: "/ək'sept/",
    type: "v",
    meaning: "Chấp nhận",
    example: "Accept checks.",
    topic: "Banking",
  },
  {
    id: 158,
    word: "Balance",
    ipa: "/'bæləns/",
    type: "n",
    meaning: "Số dư",
    example: "Check account balance.",
    topic: "Banking",
  },
  {
    id: 159,
    word: "Borrow",
    ipa: "/'bɔrou/",
    type: "v",
    meaning: "Vay, mượn",
    example: "Borrow money.",
    topic: "Banking",
  },
  {
    id: 160,
    word: "Cautiously",
    ipa: "/'kɔ:ʃəsli/",
    type: "adv",
    meaning: "Cẩn trọng",
    example: "Invest cautiously.",
    topic: "Banking",
  },
  {
    id: 161,
    word: "Deduct",
    ipa: "/di'dʌkt/",
    type: "v",
    meaning: "Khấu trừ",
    example: "Deduct tax.",
    topic: "Banking",
  },
  {
    id: 162,
    word: "Dividend",
    ipa: "/'dividend/",
    type: "n",
    meaning: "Cổ tức",
    example: "Pay dividends.",
    topic: "Banking",
  },
  {
    id: 163,
    word: "Down payment",
    ipa: "/.../",
    type: "n",
    meaning: "Tiền đặt cọc",
    example: "Make a down payment.",
    topic: "Banking",
  },
  {
    id: 164,
    word: "Interest",
    ipa: "/'intrist/",
    type: "n",
    meaning: "Lãi suất",
    example: "Interest rate.",
    topic: "Banking",
  },
  {
    id: 165,
    word: "Mortgage",
    ipa: "/'mɔ:gidʤ/",
    type: "n",
    meaning: "Thế chấp",
    example: "Apply for a mortgage.",
    topic: "Banking",
  },
  {
    id: 166,
    word: "Restricted",
    ipa: "/ris'triktid/",
    type: "adj",
    meaning: "Bị hạn chế",
    example: "Restricted access.",
    topic: "Banking",
  },
  {
    id: 167,
    word: "Signature",
    ipa: "/'signitʃə/",
    type: "n",
    meaning: "Chữ ký",
    example: "Need your signature.",
    topic: "Banking",
  },
  {
    id: 168,
    word: "Transaction",
    ipa: "/træn'zækʃn/",
    type: "n",
    meaning: "Giao dịch",
    example: "Banking transaction.",
    topic: "Banking",
  },

  // 15. ACCOUNTING (KẾ TOÁN)
  {
    id: 169,
    word: "Accounting",
    ipa: "/ə'kauntiɳ/",
    type: "n",
    meaning: "Kế toán",
    example: "Accounting department.",
    topic: "Accounting",
  },
  {
    id: 170,
    word: "Accumulate",
    ipa: "/ə'kju:mjuleit/",
    type: "v",
    meaning: "Tích lũy",
    example: "Accumulate debt.",
    topic: "Accounting",
  },
  {
    id: 171,
    word: "Asset",
    ipa: "/'æset/",
    type: "n",
    meaning: "Tài sản",
    example: "Company assets.",
    topic: "Accounting",
  },
  {
    id: 172,
    word: "Audit",
    ipa: "/'ɔ:dit/",
    type: "n",
    meaning: "Kiểm toán",
    example: "Annual audit.",
    topic: "Accounting",
  },
  {
    id: 173,
    word: "Budget",
    ipa: "/'bʌdʤit/",
    type: "n",
    meaning: "Ngân sách",
    example: "Tight budget.",
    topic: "Accounting",
  },
  {
    id: 174,
    word: "Build up",
    ipa: "/.../",
    type: "v",
    meaning: "Xây dựng, tăng lên",
    example: "Build up savings.",
    topic: "Accounting",
  },
  {
    id: 175,
    word: "Client",
    ipa: "/'klaiənt/",
    type: "n",
    meaning: "Khách hàng",
    example: "Meeting a client.",
    topic: "Accounting",
  },
  {
    id: 176,
    word: "Debt",
    ipa: "/det/",
    type: "n",
    meaning: "Nợ",
    example: "Clear the debt.",
    topic: "Accounting",
  },
  {
    id: 177,
    word: "Outstanding",
    ipa: "/aut'stændiɳ/",
    type: "adj",
    meaning: "Chưa thanh toán (nợ)",
    example: "Outstanding bill.",
    topic: "Accounting",
  },
  {
    id: 178,
    word: "Profitable",
    ipa: "/'prɔfitəbl/",
    type: "adj",
    meaning: "Có lời",
    example: "Profitable business.",
    topic: "Accounting",
  },
  {
    id: 179,
    word: "Reconcile",
    ipa: "/'rekənsail/",
    type: "v",
    meaning: "Đối chiếu",
    example: "Reconcile accounts.",
    topic: "Accounting",
  },
  {
    id: 180,
    word: "Turnover",
    ipa: "/'tə:n,ouvə/",
    type: "n",
    meaning: "Doanh số, luân chuyển",
    example: "High turnover.",
    topic: "Accounting",
  },

  // 16. INVESTMENTS (ĐẦU TƯ)
  {
    id: 181,
    word: "Aggressive",
    ipa: "/ə'gresiv/",
    type: "adj",
    meaning: "Quyết liệt, táo bạo",
    example: "Aggressive growth.",
    topic: "Investments",
  },
  {
    id: 182,
    word: "Attitude",
    ipa: "/'ætitju:d/",
    type: "n",
    meaning: "Thái độ",
    example: "Positive attitude.",
    topic: "Investments",
  },
  {
    id: 183,
    word: "Commit",
    ipa: "/kə'mit/",
    type: "v",
    meaning: "Cam kết",
    example: "Commit funds.",
    topic: "Investments",
  },
  {
    id: 184,
    word: "Conservative",
    ipa: "/kən'sə:vətiv/",
    type: "adj",
    meaning: "Bảo thủ",
    example: "Conservative estimate.",
    topic: "Investments",
  },
  {
    id: 185,
    word: "Fund",
    ipa: "/fʌnd/",
    type: "n",
    meaning: "Quỹ",
    example: "Investment fund.",
    topic: "Investments",
  },
  {
    id: 186,
    word: "Invest",
    ipa: "/in'vest/",
    type: "v",
    meaning: "Đầu tư",
    example: "Invest in stocks.",
    topic: "Investments",
  },
  {
    id: 187,
    word: "Long-term",
    ipa: "/.../",
    type: "adj",
    meaning: "Dài hạn",
    example: "Long-term goal.",
    topic: "Investments",
  },
  {
    id: 188,
    word: "Portfolio",
    ipa: "/pɔ:t'fouljou/",
    type: "n",
    meaning: "Danh mục đầu tư",
    example: "Diverse portfolio.",
    topic: "Investments",
  },
  {
    id: 189,
    word: "Pull out",
    ipa: "/.../",
    type: "v",
    meaning: "Rút lui",
    example: "Pull out of deal.",
    topic: "Investments",
  },
  {
    id: 190,
    word: "Resource",
    ipa: "/ri'sɔ:s/",
    type: "n",
    meaning: "Tài nguyên",
    example: "Natural resources.",
    topic: "Investments",
  },
  {
    id: 191,
    word: "Return",
    ipa: "/ri'tə:n/",
    type: "n",
    meaning: "Lợi nhuận (trả về)",
    example: "Return on investment.",
    topic: "Investments",
  },
  {
    id: 192,
    word: "Wisely",
    ipa: "/'waizli/",
    type: "adv",
    meaning: "Khôn ngoan",
    example: "Spend wisely.",
    topic: "Investments",
  },

  // 17. TAXES (THUẾ)
  {
    id: 193,
    word: "Calculation",
    ipa: "/,kælkju'leiʃn/",
    type: "n",
    meaning: "Sự tính toán",
    example: "Tax calculation.",
    topic: "Taxes",
  },
  {
    id: 194,
    word: "Deadline",
    ipa: "/'dedlain/",
    type: "n",
    meaning: "Hạn chót",
    example: "Meet the deadline.",
    topic: "Taxes",
  },
  {
    id: 195,
    word: "File",
    ipa: "/fail/",
    type: "v",
    meaning: "Nộp (hồ sơ)",
    example: "File taxes.",
    topic: "Taxes",
  },
  {
    id: 196,
    word: "Fill out",
    ipa: "/.../",
    type: "v",
    meaning: "Điền vào",
    example: "Fill out forms.",
    topic: "Taxes",
  },
  {
    id: 197,
    word: "Give up",
    ipa: "/.../",
    type: "v",
    meaning: "Từ bỏ",
    example: "Don't give up.",
    topic: "Taxes",
  },
  {
    id: 198,
    word: "Joint",
    ipa: "/dʤɔint/",
    type: "adj",
    meaning: "Chung",
    example: "Joint account.",
    topic: "Taxes",
  },
  {
    id: 199,
    word: "Owe",
    ipa: "/ou/",
    type: "v",
    meaning: "Nợ",
    example: "Owe money.",
    topic: "Taxes",
  },
  {
    id: 200,
    word: "Penalty",
    ipa: "/'penəlti/",
    type: "n",
    meaning: "Hình phạt",
    example: "Pay a penalty.",
    topic: "Taxes",
  },
  {
    id: 201,
    word: "Preparation",
    ipa: "/,prepə'reiʃn/",
    type: "n",
    meaning: "Sự chuẩn bị",
    example: "Tax preparation.",
    topic: "Taxes",
  },
  {
    id: 202,
    word: "Refund",
    ipa: "/ri:fʌnd/",
    type: "n",
    meaning: "Tiền hoàn lại",
    example: "Tax refund.",
    topic: "Taxes",
  },
  {
    id: 203,
    word: "Spouse",
    ipa: "/spauz/",
    type: "n",
    meaning: "Vợ/chồng",
    example: "Name of spouse.",
    topic: "Taxes",
  },
  {
    id: 204,
    word: "Withhold",
    ipa: "/wið'hould/",
    type: "v",
    meaning: "Giữ lại",
    example: "Withhold tax.",
    topic: "Taxes",
  },

  // 18. FINANCIAL STATEMENTS (BÁO CÁO TÀI CHÍNH)
  {
    id: 205,
    word: "Desired",
    ipa: "/di'zaiəd/",
    type: "adj",
    meaning: "Mong muốn",
    example: "Desired result.",
    topic: "Financials",
  },
  {
    id: 206,
    word: "Detail",
    ipa: "/'di:teil/",
    type: "n",
    meaning: "Chi tiết",
    example: "In detail.",
    topic: "Financials",
  },
  {
    id: 207,
    word: "Forecast",
    ipa: "/'fɔ:kɑ:st/",
    type: "n",
    meaning: "Dự báo",
    example: "Sales forecast.",
    topic: "Financials",
  },
  {
    id: 208,
    word: "Level",
    ipa: "/'levl/",
    type: "n",
    meaning: "Mức độ",
    example: "High level.",
    topic: "Financials",
  },
  {
    id: 209,
    word: "Overall",
    ipa: "/'ouvərɔ:l/",
    type: "adj",
    meaning: "Tổng thể",
    example: "Overall performance.",
    topic: "Financials",
  },
  {
    id: 210,
    word: "Perspective",
    ipa: "/pə'spektiv/",
    type: "n",
    meaning: "Góc nhìn",
    example: "Financial perspective.",
    topic: "Financials",
  },
  {
    id: 211,
    word: "Projected",
    ipa: "/prə'dʤektid/",
    type: "adj",
    meaning: "Được dự kiến",
    example: "Projected earnings.",
    topic: "Financials",
  },
  {
    id: 212,
    word: "Realistic",
    ipa: "/riə'listik/",
    type: "adj",
    meaning: "Thực tế",
    example: "Realistic goal.",
    topic: "Financials",
  },
  {
    id: 213,
    word: "Target",
    ipa: "/'tɑ:git/",
    type: "n",
    meaning: "Mục tiêu",
    example: "Sales target.",
    topic: "Financials",
  },
  {
    id: 214,
    word: "Translation",
    ipa: "/træns'leiʃn/",
    type: "n",
    meaning: "Sự chuyển đổi/dịch",
    example: "Currency translation.",
    topic: "Financials",
  },
  {
    id: 215,
    word: "Typical",
    ipa: "/'tipikəl/",
    type: "adj",
    meaning: "Điển hình",
    example: "Typical month.",
    topic: "Financials",
  },
  {
    id: 216,
    word: "Yield",
    ipa: "/ji:ld/",
    type: "v",
    meaning: "Mang lại (lợi nhuận)",
    example: "Yield profit.",
    topic: "Financials",
  },

  // 19. PROPERTY (BẤT ĐỘNG SẢN)
  {
    id: 217,
    word: "Adjacent",
    ipa: "/ə'dʤeizənt/",
    type: "adj",
    meaning: "Liền kề",
    example: "Adjacent building.",
    topic: "Property",
  },
  {
    id: 218,
    word: "Collaboration",
    ipa: "/kə,læbə'reiʃn/",
    type: "n",
    meaning: "Sự cộng tác",
    example: "Close collaboration.",
    topic: "Property",
  },
  {
    id: 219,
    word: "Concentrate",
    ipa: "/'kɔnsəntreit/",
    type: "v",
    meaning: "Tập trung",
    example: "Concentrate on work.",
    topic: "Property",
  },
  {
    id: 220,
    word: "Conducive",
    ipa: "/kən'dju:siv/",
    type: "adj",
    meaning: "Có lợi",
    example: "Conducive to sleep.",
    topic: "Property",
  },
  {
    id: 221,
    word: "Disrupt",
    ipa: "/dis'rʌpt/",
    type: "v",
    meaning: "Làm gián đoạn",
    example: "Disrupt the meeting.",
    topic: "Property",
  },
  {
    id: 222,
    word: "Hamper",
    ipa: "/'hæmpə/",
    type: "v",
    meaning: "Cản trở",
    example: "Hamper progress.",
    topic: "Property",
  },
  {
    id: 223,
    word: "Inconsiderately",
    ipa: "/.../",
    type: "adv",
    meaning: "Thiếu suy nghĩ",
    example: "Act inconsiderately.",
    topic: "Property",
  },
  {
    id: 224,
    word: "Lobby",
    ipa: "/'lɔbi/",
    type: "n",
    meaning: "Sảnh",
    example: "Hotel lobby.",
    topic: "Property",
  },
  {
    id: 225,
    word: "Move up",
    ipa: "/.../",
    type: "v",
    meaning: "Thăng tiến, dời lên",
    example: "Move up the date.",
    topic: "Property",
  },
  {
    id: 226,
    word: "Open to",
    ipa: "/.../",
    type: "adj",
    meaning: "Cởi mở với",
    example: "Open to suggestions.",
    topic: "Property",
  },
  {
    id: 227,
    word: "Opt",
    ipa: "/ɔpt/",
    type: "v",
    meaning: "Chọn",
    example: "Opt for the best.",
    topic: "Property",
  },
  {
    id: 228,
    word: "Scrutiny",
    ipa: "/'skru:tini/",
    type: "n",
    meaning: "Sự xem xét kỹ lưỡng",
    example: "Under scrutiny.",
    topic: "Property",
  },

  // 20. BOARD MEETINGS (HỌP HỘI ĐỒNG)
  {
    id: 229,
    word: "Adjourn",
    ipa: "/ə'dʤə:n/",
    type: "v",
    meaning: "Dời lại, hoãn",
    example: "Adjourn the meeting.",
    topic: "Meetings",
  },
  {
    id: 230,
    word: "Agenda",
    ipa: "/ə'dʤendə/",
    type: "n",
    meaning: "Chương trình nghị sự",
    example: "Meeting agenda.",
    topic: "Meetings",
  },
  {
    id: 231,
    word: "Chairperson",
    ipa: "/'tʃeə,pə:sn/",
    type: "n",
    meaning: "Chủ tịch",
    example: "Madam Chairperson.",
    topic: "Meetings",
  },
  {
    id: 232,
    word: "Consensus",
    ipa: "/kən'sensəs/",
    type: "n",
    meaning: "Sự đồng thuận",
    example: "Reach a consensus.",
    topic: "Meetings",
  },
  {
    id: 233,
    word: "Constraint",
    ipa: "/kən'streint/",
    type: "n",
    meaning: "Sự ràng buộc",
    example: "Time constraints.",
    topic: "Meetings",
  },
  {
    id: 234,
    word: "Minutes",
    ipa: "/'minits/",
    type: "n",
    meaning: "Biên bản cuộc họp",
    example: "Take minutes.",
    topic: "Meetings",
  },
  {
    id: 235,
    word: "Motion",
    ipa: "/'mouʃn/",
    type: "n",
    meaning: "Kiến nghị",
    example: "Second the motion.",
    topic: "Meetings",
  },
  {
    id: 236,
    word: "Recess",
    ipa: "/ri'ses/",
    type: "n",
    meaning: "Giờ giải lao",
    example: "Take a recess.",
    topic: "Meetings",
  },
  {
    id: 237,
    word: "Unanimous",
    ipa: "/ju:'næniməs/",
    type: "adj",
    meaning: "Nhất trí",
    example: "Unanimous vote.",
    topic: "Meetings",
  },
  {
    id: 238,
    word: "Vote",
    ipa: "/vout/",
    type: "v",
    meaning: "Bỏ phiếu",
    example: "Vote for the plan.",
    topic: "Meetings",
  },
  {
    id: 239,
    word: "Discuss",
    ipa: "/dis'kʌs/",
    type: "v",
    meaning: "Thảo luận",
    example: "Discuss the issue.",
    topic: "Meetings",
  },
  {
    id: 240,
    word: "Comment",
    ipa: "/'kɔment/",
    type: "n",
    meaning: "Bình luận",
    example: "No comment.",
    topic: "Meetings",
  },

  // 21. QUALITY CONTROL (KIỂM SOÁT CHẤT LƯỢNG)
  {
    id: 241,
    word: "Brand",
    ipa: "/brænd/",
    type: "n",
    meaning: "Thương hiệu",
    example: "Famous brand.",
    topic: "Quality",
  },
  {
    id: 242,
    word: "Conform",
    ipa: "/kən'fɔ:m/",
    type: "v",
    meaning: "Tuân thủ, phù hợp",
    example: "Conform to standards.",
    topic: "Quality",
  },
  {
    id: 243,
    word: "Defect",
    ipa: "/di'fekt/",
    type: "n",
    meaning: "Lỗi, khuyết điểm",
    example: "Product defect.",
    topic: "Quality",
  },
  {
    id: 244,
    word: "Enhance",
    ipa: "/in'hɑ:ns/",
    type: "v",
    meaning: "Nâng cao",
    example: "Enhance quality.",
    topic: "Quality",
  },
  {
    id: 245,
    word: "Garment",
    ipa: "/'gɑ:mənt/",
    type: "n",
    meaning: "Quần áo",
    example: "Garment factory.",
    topic: "Quality",
  },
  {
    id: 246,
    word: "Inspect",
    ipa: "/in'spekt/",
    type: "v",
    meaning: "Thanh tra, kiểm tra",
    example: "Inspect the goods.",
    topic: "Quality",
  },
  {
    id: 247,
    word: "Perceive",
    ipa: "/pə'si:v/",
    type: "v",
    meaning: "Nhận thức",
    example: "Perceive value.",
    topic: "Quality",
  },
  {
    id: 248,
    word: "Repel",
    ipa: "/ri'pel/",
    type: "v",
    meaning: "Đẩy lùi",
    example: "Repel water.",
    topic: "Quality",
  },
  {
    id: 249,
    word: "Take back",
    ipa: "/.../",
    type: "v",
    meaning: "Nhận lại, rút lại",
    example: "Take back items.",
    topic: "Quality",
  },
  {
    id: 250,
    word: "Throw out",
    ipa: "/.../",
    type: "v",
    meaning: "Vứt bỏ",
    example: "Throw out trash.",
    topic: "Quality",
  },
  {
    id: 251,
    word: "Uniform",
    ipa: "/'ju:nifɔ:m/",
    type: "adj",
    meaning: "Đồng phục, đồng nhất",
    example: "Uniform size.",
    topic: "Quality",
  },
  {
    id: 252,
    word: "Wrinkle",
    ipa: "/'riɳkl/",
    type: "n",
    meaning: "Nếp nhăn",
    example: "Wrinkle-free.",
    topic: "Quality",
  },

  // 22. PRODUCT DEVELOPMENT (PHÁT TRIỂN SẢN PHẨM)
  {
    id: 253,
    word: "Anxious",
    ipa: "/'æɳkʃəs/",
    type: "adj",
    meaning: "Lo lắng",
    example: "Anxious about launch.",
    topic: "Product Dev",
  },
  {
    id: 254,
    word: "Ascertain",
    ipa: "/,æsə'tein/",
    type: "v",
    meaning: "Xác minh",
    example: "Ascertain the facts.",
    topic: "Product Dev",
  },
  {
    id: 255,
    word: "Assume",
    ipa: "/ə'sju:m/",
    type: "v",
    meaning: "Giả định, đảm đương",
    example: "Assume responsibility.",
    topic: "Product Dev",
  },
  {
    id: 256,
    word: "Decade",
    ipa: "/'dekeid/",
    type: "n",
    meaning: "Thập kỷ",
    example: "Over a decade.",
    topic: "Product Dev",
  },
  {
    id: 257,
    word: "Examine",
    ipa: "/ig'zæmin/",
    type: "v",
    meaning: "Kiểm tra",
    example: "Examine the sample.",
    topic: "Product Dev",
  },
  {
    id: 258,
    word: "Experiment",
    ipa: "/iks'periment/",
    type: "n",
    meaning: "Thí nghiệm",
    example: "Scientific experiment.",
    topic: "Product Dev",
  },
  {
    id: 259,
    word: "Logical",
    ipa: "/'lɔdʤikəl/",
    type: "adj",
    meaning: "Hợp lý",
    example: "Logical step.",
    topic: "Product Dev",
  },
  {
    id: 260,
    word: "Research",
    ipa: "/ri'sə:tʃ/",
    type: "n",
    meaning: "Nghiên cứu",
    example: "Market research.",
    topic: "Product Dev",
  },
  {
    id: 261,
    word: "Responsibility",
    ipa: "/ris,pɔnsə'biliti/",
    type: "n",
    meaning: "Trách nhiệm",
    example: "Take responsibility.",
    topic: "Product Dev",
  },
  {
    id: 262,
    word: "Solve",
    ipa: "/sɔlv/",
    type: "v",
    meaning: "Giải quyết",
    example: "Solve the puzzle.",
    topic: "Product Dev",
  },
  {
    id: 263,
    word: "Supervisor",
    ipa: "/'sju:pəvaizə/",
    type: "n",
    meaning: "Người giám sát",
    example: "Ask your supervisor.",
    topic: "Product Dev",
  },
  {
    id: 264,
    word: "Systematic",
    ipa: "/,sisti'mætik/",
    type: "adj",
    meaning: "Có hệ thống",
    example: "Systematic approach.",
    topic: "Product Dev",
  },

  // 23. RESTAURANTS & EVENTS (NHÀ HÀNG & SỰ KIỆN)
  {
    id: 265,
    word: "Appetizer",
    ipa: "/'æpitaizə/",
    type: "n",
    meaning: "Món khai vị",
    example: "Order appetizers.",
    topic: "Restaurants",
  },
  {
    id: 266,
    word: "Beverage",
    ipa: "/'bəvəridʤ/",
    type: "n",
    meaning: "Đồ uống",
    example: "Food and beverage.",
    topic: "Restaurants",
  },
  {
    id: 267,
    word: "Cater",
    ipa: "/'keitə/",
    type: "v",
    meaning: "Phục vụ ăn uống",
    example: "Cater a wedding.",
    topic: "Restaurants",
  },
  {
    id: 268,
    word: "Complimentary",
    ipa: "/,kɔmpli'mentəri/",
    type: "adj",
    meaning: "Miễn phí (mời)",
    example: "Complimentary water.",
    topic: "Restaurants",
  },
  {
    id: 269,
    word: "Culinary",
    ipa: "/'kʌlinəri/",
    type: "adj",
    meaning: "Thuộc về nấu nướng",
    example: "Culinary arts.",
    topic: "Restaurants",
  },
  {
    id: 270,
    word: "Flavor",
    ipa: "/'fleivə/",
    type: "n",
    meaning: "Hương vị",
    example: "Rich flavor.",
    topic: "Restaurants",
  },
  {
    id: 271,
    word: "Ingredient",
    ipa: "/in'gri:djənt/",
    type: "n",
    meaning: "Nguyên liệu",
    example: "Fresh ingredients.",
    topic: "Restaurants",
  },
  {
    id: 272,
    word: "Reception",
    ipa: "/ri'sepʃn/",
    type: "n",
    meaning: "Tiệc chiêu đãi",
    example: "Wedding reception.",
    topic: "Restaurants",
  },
  {
    id: 273,
    word: "Refreshments",
    ipa: "/ri'freʃmənts/",
    type: "n",
    meaning: "Đồ ăn nhẹ",
    example: "Serve refreshments.",
    topic: "Restaurants",
  },
  {
    id: 274,
    word: "Suggestion",
    ipa: "/sə'dʤestʃn/",
    type: "n",
    meaning: "Sự gợi ý",
    example: "Chef's suggestion.",
    topic: "Restaurants",
  },
  {
    id: 275,
    word: "Venue",
    ipa: "/'venju:/",
    type: "n",
    meaning: "Địa điểm tổ chức",
    example: "Event venue.",
    topic: "Restaurants",
  },
  {
    id: 276,
    word: "Reservation",
    ipa: "/,rezə'veiʃn/",
    type: "n",
    meaning: "Sự đặt chỗ",
    example: "Make a reservation.",
    topic: "Restaurants",
  },

  // 24. TRAVEL (DU LỊCH)
  {
    id: 277,
    word: "Board",
    ipa: "/bɔ:d/",
    type: "v",
    meaning: "Lên tàu/xe",
    example: "Board the plane.",
    topic: "Travel",
  },
  {
    id: 278,
    word: "Claim",
    ipa: "/kleim/",
    type: "v",
    meaning: "Lấy lại (hành lý)",
    example: "Baggage claim.",
    topic: "Travel",
  },
  {
    id: 279,
    word: "Delay",
    ipa: "/di'lei/",
    type: "v",
    meaning: "Trì hoãn",
    example: "Flight delayed.",
    topic: "Travel",
  },
  {
    id: 280,
    word: "Depart",
    ipa: "/di'pɑ:t/",
    type: "v",
    meaning: "Khởi hành",
    example: "Train departs at 5.",
    topic: "Travel",
  },
  {
    id: 281,
    word: "Embarkation",
    ipa: "/em'bɑ:keiʃn/",
    type: "n",
    meaning: "Sự lên tàu",
    example: "Embarkation card.",
    topic: "Travel",
  },
  {
    id: 282,
    word: "Itinerary",
    ipa: "/ai'tinərəri/",
    type: "n",
    meaning: "Lịch trình",
    example: "Travel itinerary.",
    topic: "Travel",
  },
  {
    id: 283,
    word: "Luggage",
    ipa: "/'lʌgidʤ/",
    type: "n",
    meaning: "Hành lý",
    example: "Lost luggage.",
    topic: "Travel",
  },
  {
    id: 284,
    word: "Valid",
    ipa: "/'vælid/",
    type: "adj",
    meaning: "Có hiệu lực",
    example: "Valid passport.",
    topic: "Travel",
  },
  {
    id: 285,
    word: "Destination",
    ipa: "/,desti'neiʃn/",
    type: "n",
    meaning: "Điểm đến",
    example: "Final destination.",
    topic: "Travel",
  },
  {
    id: 286,
    word: "Excursion",
    ipa: "/iks'kə:ʃn/",
    type: "n",
    meaning: "Chuyến tham quan",
    example: "Day excursion.",
    topic: "Travel",
  },
  {
    id: 287,
    word: "Prohibit",
    ipa: "/prə'hibit/",
    type: "v",
    meaning: "Cấm",
    example: "Smoking prohibited.",
    topic: "Travel",
  },
  {
    id: 288,
    word: "Punctual",
    ipa: "/'pʌɳktjuəl/",
    type: "adj",
    meaning: "Đúng giờ",
    example: "Be punctual.",
    topic: "Travel",
  },

  // 25. HEALTH (SỨC KHỎE)
  {
    id: 289,
    word: "Annual",
    ipa: "/'ænjuəl/",
    type: "adj",
    meaning: "Hàng năm",
    example: "Annual check-up.",
    topic: "Health",
  },
  {
    id: 290,
    word: "Appointment",
    ipa: "/ə'pɔintmənt/",
    type: "n",
    meaning: "Cuộc hẹn",
    example: "Doctor appointment.",
    topic: "Health",
  },
  {
    id: 291,
    word: "Assess",
    ipa: "/ə'ses/",
    type: "v",
    meaning: "Đánh giá",
    example: "Assess health.",
    topic: "Health",
  },
  {
    id: 292,
    word: "Diagnose",
    ipa: "/'daiəgnouz/",
    type: "v",
    meaning: "Chẩn đoán",
    example: "Diagnose illness.",
    topic: "Health",
  },
  {
    id: 293,
    word: "Instrument",
    ipa: "/'instrumənt/",
    type: "n",
    meaning: "Dụng cụ",
    example: "Surgical instrument.",
    topic: "Health",
  },
  {
    id: 294,
    word: "Prevent",
    ipa: "/pri'vent/",
    type: "v",
    meaning: "Ngăn ngừa",
    example: "Prevent disease.",
    topic: "Health",
  },
  {
    id: 295,
    word: "Recommend",
    ipa: "/rekə'mend/",
    type: "v",
    meaning: "Khuyên, đề nghị",
    example: "Doctor recommends.",
    topic: "Health",
  },
  {
    id: 296,
    word: "Recovery",
    ipa: "/ri'kʌvəri/",
    type: "n",
    meaning: "Sự hồi phục",
    example: "Speedy recovery.",
    topic: "Health",
  },
  {
    id: 297,
    word: "Restore",
    ipa: "/ris'tɔ:/",
    type: "v",
    meaning: "Khôi phục",
    example: "Restore health.",
    topic: "Health",
  },
  {
    id: 298,
    word: "Serious",
    ipa: "/'siəriəs/",
    type: "adj",
    meaning: "Nghiêm trọng",
    example: "Serious condition.",
    topic: "Health",
  },
  {
    id: 299,
    word: "Symptom",
    ipa: "/'simptəm/",
    type: "n",
    meaning: "Triệu chứng",
    example: "Flu symptoms.",
    topic: "Health",
  },
  {
    id: 300,
    word: "Treatment",
    ipa: "/'tri:tmənt/",
    type: "n",
    meaning: "Sự điều trị",
    example: "Medical treatment.",
    topic: "Health",
  },
];

// Lấy danh sách Topic duy nhất
const TOPICS = [
  "All",
  ...new Set(INITIAL_VOCABULARY.map((item) => item.topic)),
];

export default function ToeicFlashcards() {
  // --- STATE ---
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [vocabulary, setVocabulary] = useState(INITIAL_VOCABULARY);
  const [displayList, setDisplayList] = useState(INITIAL_VOCABULARY);

  // Load từ đã học từ LocalStorage
  const [learnedIds, setLearnedIds] = useState(() => {
    const saved = localStorage.getItem("toeic_learned_ids");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // --- EFFECT ---

  // Xử lý khi đổi Topic hoặc danh sách learned thay đổi
  useEffect(() => {
    let filtered = vocabulary;

    // Lọc theo topic
    if (selectedTopic !== "All") {
      filtered = filtered.filter((item) => item.topic === selectedTopic);
    }

    setDisplayList(filtered);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, vocabulary]);

  // Lưu trạng thái đã học
  useEffect(() => {
    localStorage.setItem("toeic_learned_ids", JSON.stringify([...learnedIds]));
  }, [learnedIds]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " " || e.key === "Enter") handleFlip();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentCardIndex, displayList, isFlipped]);

  // --- HANDLERS ---

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % displayList.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex(
        (prev) => (prev - 1 + displayList.length) % displayList.length,
      );
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...displayList].sort(() => Math.random() - 0.5);
    setDisplayList(shuffled);
    setCurrentCardIndex(0);
  };

  const toggleLearned = (id) => {
    const newLearned = new Set(learnedIds);
    if (newLearned.has(id)) {
      newLearned.delete(id);
    } else {
      newLearned.add(id);
    }
    setLearnedIds(newLearned);
  };

  const handleResetProgress = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ tiến độ học tập?")) {
      setLearnedIds(new Set());
    }
  };

  const speakWord = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // --- RENDER HELPERS ---

  if (displayList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans text-gray-600">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Không tìm thấy từ vựng</h2>
          <p>Hãy thử chọn chủ đề khác.</p>
          <button
            onClick={() => setSelectedTopic("All")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Về tất cả chủ đề
          </button>
        </div>
      </div>
    );
  }

  const currentCard = displayList[currentCardIndex];
  const isLearned = learnedIds.has(currentCard.id);
  const progress = Math.round(
    (learnedIds.size / INITIAL_VOCABULARY.length) * 100,
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center py-6 px-4">
      {/* HEADER */}
      <header className="w-full max-w-2xl mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            TOEIC Flashcards (300 Words)
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleResetProgress}
              className="text-xs text-red-500 hover:text-red-700 underline"
            >
              Reset Tiến độ
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden shadow-inner">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
            Đã thuộc: {learnedIds.size} / {INITIAL_VOCABULARY.length} (
            {progress}%)
          </div>
        </div>
      </header>

      {/* CONTROLS */}
      <div className="w-full max-w-2xl flex flex-wrap justify-between items-center gap-3 mb-6">
        {/* Filter Dropdown */}
        <div className="relative group">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm cursor-pointer hover:border-blue-500">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="appearance-none bg-transparent outline-none pr-4 cursor-pointer text-sm font-medium"
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic === "All" ? "Tất cả chủ đề" : topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Shuffle Button */}
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm font-medium"
        >
          <Shuffle className="w-4 h-4" />
          Xáo trộn
        </button>
      </div>

      {/* FLASHCARD AREA */}
      <div className="w-full max-w-md h-80 relative perspective-1000 group mb-8">
        <div
          className={`relative w-full h-full duration-500 transform-style-3d cursor-pointer transition-transform ${isFlipped ? "rotate-y-180" : ""}`}
          onClick={handleFlip}
        >
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl border-b-4 border-blue-200 p-6 flex flex-col items-center justify-center backface-hidden">
            <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {currentCard.topic}
            </span>
            <div className="absolute top-4 right-4">
              {isLearned ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              )}
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
              {currentCard.word}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <p className="text-gray-500 font-mono text-lg">
                {currentCard.ipa}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(currentCard.word);
                }}
                className="p-1 rounded-full hover:bg-gray-100 text-blue-600 transition"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <span className="text-gray-400 italic font-serif">
              ({currentCard.type})
            </span>

            <div className="mt-8 text-sm text-gray-400 flex items-center gap-1 animate-pulse">
              <RotateCw className="w-3 h-3" />
              Chạm để xem nghĩa
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full bg-blue-50 rounded-2xl shadow-xl border-b-4 border-blue-300 p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180">
            <span className="absolute top-4 left-4 bg-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded">
              Meaning & Example
            </span>

            <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              {currentCard.meaning}
            </h3>

            <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <p className="text-gray-600 italic text-center">
                "{currentCard.example}"
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLearned(currentCard.id);
              }}
              className={`mt-6 flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md ${
                isLearned
                  ? "bg-gray-200 text-gray-500 hover:bg-gray-300"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {isLearned ? "Đã thuộc (Bỏ đánh dấu)" : "Đánh dấu đã thuộc"}
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 text-gray-700 transition active:scale-95"
          aria-label="Previous card"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <span className="text-gray-500 font-medium font-mono">
          {currentCardIndex + 1} / {displayList.length}
        </span>

        <button
          onClick={handleNext}
          className="p-4 bg-blue-600 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 text-white transition active:scale-95"
          aria-label="Next card"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-8 text-xs text-gray-400">
        Mẹo: Sử dụng phím mũi tên Trái/Phải để chuyển thẻ, Space để lật.
      </div>

      {/* GLOBAL STYLES FOR FLIP EFFECT */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
