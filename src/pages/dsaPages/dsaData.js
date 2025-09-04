// src/data/dsaData.js
export const dsaData = [
  // =================================================================
  // 1. Mảng (Arrays)
  // =================================================================
  {
    id: "arrays",
    title: "Mảng (Arrays)",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Mảng là gì?</h3>
      <p>Mảng là một cấu trúc dữ liệu cơ bản, dùng để lưu trữ một tập hợp các phần tử có cùng kiểu dữ liệu trong các vị trí bộ nhớ liền kề. Mỗi phần tử được truy cập thông qua một chỉ số (index), thường bắt đầu từ 0.</p>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">2. Đặc điểm chính</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Vị trí bộ nhớ liền kề:</strong> Các phần tử của mảng được lưu trữ ngay cạnh nhau trong bộ nhớ, giúp tối ưu hóa việc truy cập của CPU.</li>
        <li><strong>Truy cập ngẫu nhiên (Random Access):</strong> Có thể truy cập bất kỳ phần tử nào ngay lập tức bằng chỉ số của nó với độ phức tạp thời gian là O(1). Ví dụ: <code>array[5]</code>.</li>
        <li><strong>Kích thước cố định (trong nhiều ngôn ngữ):</strong> Trong các ngôn ngữ như C++ hay Java, kích thước của mảng phải được xác định khi khai báo và không thể thay đổi. Trong các ngôn ngữ kịch bản như JavaScript hay Python, mảng (thường được gọi là list) có kích thước động.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">3. Các phép toán cơ bản và độ phức tạp</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Truy cập (Access):</strong> <code>O(1)</code> - Rất nhanh.</li>
        <li><strong>Tìm kiếm (Search):</strong> <code>O(n)</code> - Phải duyệt qua từng phần tử trong trường hợp xấu nhất. Nếu mảng đã được sắp xếp, có thể dùng tìm kiếm nhị phân (Binary Search) với độ phức tạp <code>O(log n)</code>.</li>
        <li><strong>Chèn (Insertion):</strong> <code>O(n)</code> - Khi chèn vào giữa, tất cả các phần tử phía sau phải được dịch chuyển sang phải. Chèn vào cuối nếu mảng chưa đầy có thể là <code>O(1)</code>.</li>
        <li><strong>Xóa (Deletion):</strong> <code>O(n)</code> - Tương tự như chèn, khi xóa một phần tử, các phần tử phía sau phải được dịch chuyển sang trái để lấp đầy khoảng trống.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">4. Ưu và Nhược điểm</h3>
      <p><strong>Ưu điểm:</strong> Truy cập nhanh, cấu trúc đơn giản, dễ sử dụng.</p>
      <p><strong>Nhược điểm:</strong> Kích thước cố định (trong nhiều trường hợp), chi phí chèn/xóa cao.</p>
    `,
    quiz: [
      {
        question:
          "Độ phức tạp thời gian để truy cập một phần tử trong mảng bằng chỉ số là gì?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctAnswer: "O(1)",
      },
      {
        question:
          "Thao tác nào sau đây thường có độ phức tạp thời gian là O(n) đối với mảng?",
        options: [
          "Truy cập phần tử đầu tiên",
          "Truy cập phần tử cuối cùng",
          "Chèn một phần tử vào giữa",
          "Lấy kích thước của mảng",
        ],
        correctAnswer: "Chèn một phần tử vào giữa",
      },
      {
        question:
          "Trong trường hợp nào việc tìm kiếm trong mảng có độ phức tạp O(log n)?",
        options: [
          "Khi mảng rỗng",
          "Khi mảng đã được sắp xếp",
          "Không có trường hợp nào",
          "Khi mảng chứa các số âm",
        ],
        correctAnswer: "Khi mảng đã được sắp xếp",
      },
    ],
  },
  // =================================================================
  // 2. Danh sách liên kết (Linked Lists)
  // =================================================================
  {
    id: "linked-list",
    title: "Danh sách liên kết (Linked Lists)",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Danh sách liên kết là gì?</h3>
      <p>Danh sách liên kết là một cấu trúc dữ liệu tuyến tính, nhưng không giống như mảng, các phần tử của nó không được lưu trữ tại các vị trí bộ nhớ liền kề. Thay vào đó, mỗi phần tử (gọi là một <strong>nút</strong> - node) chứa dữ liệu và một con trỏ (pointer) trỏ đến nút tiếp theo trong chuỗi.</p>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">2. Các loại danh sách liên kết</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Danh sách liên kết đơn (Singly Linked List):</strong> Mỗi nút chỉ có một con trỏ trỏ đến nút kế tiếp.</li>
        <li><strong>Danh sách liên kết đôi (Doubly Linked List):</strong> Mỗi nút có hai con trỏ, một trỏ đến nút kế tiếp và một trỏ đến nút phía trước. Điều này cho phép duyệt danh sách theo cả hai chiều.</li>
        <li><strong>Danh sách liên kết vòng (Circular Linked List):</strong> Nút cuối cùng của danh sách trỏ ngược lại nút đầu tiên, tạo thành một vòng tròn.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">3. Các phép toán cơ bản và độ phức tạp</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Truy cập/Tìm kiếm (Access/Search):</strong> <code>O(n)</code> - Phải bắt đầu từ đầu (head) và duyệt qua từng nút.</li>
        <li><strong>Chèn vào đầu (Insertion at beginning):</strong> <code>O(1)</code> - Rất nhanh, chỉ cần cập nhật con trỏ của nút đầu tiên.</li>
        <li><strong>Chèn vào cuối (Insertion at end):</strong> <code>O(n)</code> - Phải duyệt đến cuối để tìm nút cuối cùng. (Có thể là <code>O(1)</code> nếu ta giữ một con trỏ đến nút cuối).</li>
        <li><strong>Xóa ở đầu (Deletion at beginning):</strong> <code>O(1)</code> - Tương tự chèn vào đầu.</li>
        <li><strong>Xóa ở giữa/cuối:</strong> <code>O(n)</code> - Vì cần tìm nút trước nút cần xóa.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">4. So sánh với Mảng</h3>
      <p><strong>Ưu điểm so với mảng:</strong> Kích thước động, chèn/xóa (đặc biệt là ở đầu) rất hiệu quả.</p>
      <p><strong>Nhược điểm so với mảng:</strong> Không hỗ trợ truy cập ngẫu nhiên (phải duyệt tuần tự), tốn thêm bộ nhớ cho các con trỏ.</p>
    `,
    quiz: [
      {
        question: "Ưu điểm chính của Danh sách liên kết so với Mảng là gì?",
        options: [
          "Truy cập ngẫu nhiên nhanh hơn",
          "Kích thước động và chèn/xóa hiệu quả",
          "Sử dụng bộ nhớ hiệu quả hơn",
          "Dễ dàng sắp xếp hơn",
        ],
        correctAnswer: "Kích thước động và chèn/xóa hiệu quả",
      },
      {
        question:
          "Độ phức tạp để truy cập phần tử thứ k trong danh sách liên kết đơn là gì?",
        options: ["O(1)", "O(log k)", "O(k)", "O(n)"],
        correctAnswer: "O(k)",
      },
      {
        question:
          "Loại danh sách liên kết nào cho phép duyệt theo cả hai chiều tiến và lùi?",
        options: [
          "Danh sách liên kết đơn",
          "Danh sách liên kết vòng",
          "Danh sách liên kết đôi",
          "Tất cả các loại trên",
        ],
        correctAnswer: "Danh sách liên kết đôi",
      },
    ],
  },
  // =================================================================
  // 3. Ngăn xếp (Stack)
  // =================================================================
  {
    id: "stack",
    title: "Ngăn xếp (Stack)",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Stack là gì?</h3>
      <p>Stack là một cấu trúc dữ liệu tuyến tính tuân theo nguyên tắc <strong>LIFO (Last-In, First-Out)</strong>, nghĩa là phần tử được thêm vào cuối cùng sẽ là phần tử được lấy ra đầu tiên. Hãy tưởng tượng một chồng đĩa: bạn chỉ có thể thêm một đĩa lên trên cùng và chỉ có thể lấy đĩa trên cùng ra.</p>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">2. Các phép toán cơ bản</h3>
      Tất cả các phép toán chính của Stack đều có độ phức tạp là <code>O(1)</code>.
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Push:</strong> Thêm một phần tử vào đỉnh của stack.</li>
        <li><strong>Pop:</strong> Lấy và xóa phần tử ở đỉnh của stack.</li>
        <li><strong>Peek (hoặc Top):</strong> Xem giá trị của phần tử ở đỉnh stack mà không xóa nó.</li>
        <li><strong>isEmpty:</strong> Kiểm tra xem stack có rỗng hay không.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">3. Cài đặt Stack</h3>
      <p>Stack có thể được cài đặt dễ dàng bằng cách sử dụng:</p>
      <ul class="list-disc list-inside">
          <li><strong>Mảng (Array):</strong> Sử dụng một mảng và một biến để theo dõi chỉ số của đỉnh.</li>
          <li><strong>Danh sách liên kết (Linked List):</strong> Thêm và xóa các nút ở đầu danh sách.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">4. Ứng dụng thực tế</h3>
       <ul class="list-disc list-inside space-y-2">
        <li><strong>Quản lý lời gọi hàm (Function Call Stack):</strong> Khi một hàm được gọi, nó được đẩy vào call stack. Khi hàm kết thúc, nó được lấy ra.</li>
        <li><strong>Chức năng Undo/Redo:</strong> Mỗi hành động của người dùng được đẩy vào một stack. Khi nhấn Undo, hành động cuối cùng được pop ra.</li>
        <li><strong>Kiểm tra dấu ngoặc hợp lệ:</strong> Dùng stack để kiểm tra các cặp ngoặc <code>()</code>, <code>{}</code>, <code>[]</code> có khớp nhau không.</li>
        <li><strong>Duyệt đồ thị theo chiều sâu (DFS).</li>
      </ul>
    `,
    quiz: [
      {
        question: "Stack hoạt động theo nguyên tắc nào?",
        options: [
          "FIFO (First-In, First-Out)",
          "LILO (Last-In, Last-Out)",
          "LIFO (Last-In, First-Out)",
          "Cả A và B",
        ],
        correctAnswer: "LIFO (Last-In, First-Out)",
      },
      {
        question:
          "Phép toán nào dùng để xem phần tử trên cùng của stack mà không xóa nó?",
        options: ["Pop", "Push", "View", "Peek"],
        correctAnswer: "Peek",
      },
      {
        question: "Ứng dụng nào sau đây là một ví dụ điển hình của Stack?",
        options: [
          "Hàng đợi in ấn",
          "Hệ thống bán vé",
          "Chức năng Undo trong trình soạn thảo",
          "Quản lý các tiến trình CPU",
        ],
        correctAnswer: "Chức năng Undo trong trình soạn thảo",
      },
    ],
  },
  // =================================================================
  // 4. Hàng đợi (Queue)
  // =================================================================
  {
    id: "queue",
    title: "Hàng đợi (Queue)",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Queue là gì?</h3>
      <p>Queue là một cấu trúc dữ liệu tuyến tính tuân theo nguyên tắc <strong>FIFO (First-In, First-Out)</strong>, nghĩa là phần tử được thêm vào đầu tiên sẽ là phần tử được lấy ra đầu tiên. Tương tự như một hàng người đang xếp hàng chờ mua vé.</p>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">2. Các phép toán cơ bản</h3>
      Tất cả các phép toán chính của Queue đều có độ phức tạp là <code>O(1)</code>.
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Enqueue:</strong> Thêm một phần tử vào cuối hàng đợi (rear).</li>
        <li><strong>Dequeue:</strong> Lấy và xóa phần tử ở đầu hàng đợi (front).</li>
        <li><strong>Front (hoặc Peek):</strong> Xem giá trị của phần tử ở đầu hàng đợi mà không xóa nó.</li>
        <li><strong>isEmpty:</strong> Kiểm tra xem hàng đợi có rỗng hay không.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">3. Cài đặt Queue</h3>
       <ul class="list-disc list-inside">
          <li><strong>Mảng (Array):</strong> Có thể dùng mảng vòng (circular array) để cài đặt hiệu quả.</li>
          <li><strong>Danh sách liên kết (Linked List):</strong> Thêm nút vào cuối và xóa nút ở đầu.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">4. Ứng dụng thực tế</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Quản lý tài nguyên chia sẻ:</strong> Hàng đợi in, quản lý các yêu cầu đến CPU.</li>
        <li><strong>Truyền dữ liệu không đồng bộ:</strong> Dữ liệu được đặt vào một hàng đợi và được xử lý tuần tự.</li>
        <li><strong>Duyệt đồ thị theo chiều rộng (BFS).</li>
        <li><strong>Hệ thống bán vé, hàng chờ hỗ trợ khách hàng.</li>
      </ul>
    `,
    quiz: [
      {
        question: "Queue hoạt động theo nguyên tắc nào?",
        options: [
          "LIFO (Last-In, First-Out)",
          "FIFO (First-In, First-Out)",
          "Cả hai",
          "Không theo nguyên tắc nào",
        ],
        correctAnswer: "FIFO (First-In, First-Out)",
      },
      {
        question: "Phép toán nào dùng để thêm một phần tử vào cuối hàng đợi?",
        options: ["Push", "Pop", "Enqueue", "Dequeue"],
        correctAnswer: "Enqueue",
      },
      {
        question:
          "Thuật toán nào sau đây sử dụng Queue làm cấu trúc dữ liệu cốt lõi?",
        options: [
          "Duyệt theo chiều sâu (DFS)",
          "Sắp xếp nhanh (Quick Sort)",
          "Tìm kiếm nhị phân (Binary Search)",
          "Duyệt theo chiều rộng (BFS)",
        ],
        correctAnswer: "Duyệt theo chiều rộng (BFS)",
      },
    ],
  },
  // =================================================================
  // 5. Bảng băm (Hash Table)
  // =================================================================
  {
    id: "hash-table",
    title: "Bảng băm (Hash Table)",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Hash Table là gì?</h3>
      <p>Bảng băm là một cấu trúc dữ liệu dùng để lưu trữ các cặp <strong>(key, value)</strong>. Nó sử dụng một <strong>hàm băm (hash function)</strong> để tính toán một chỉ số (index) từ key, và lưu trữ value tại chỉ số đó trong một mảng. Mục tiêu là cho phép chèn, xóa, và tìm kiếm với độ phức tạp trung bình là <code>O(1)</code>.</p>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">2. Các thành phần chính</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Hàm băm (Hash Function):</strong> Một hàm nhận đầu vào là key và trả về một chỉ số trong mảng. Một hàm băm tốt sẽ phân bố các key một cách đồng đều.</li>
        <li><strong>Bảng (Table):</strong> Một mảng để lưu trữ dữ liệu.</li>
        <li><strong>Xử lý va chạm (Collision Handling):</strong> Va chạm xảy ra khi hai key khác nhau được băm ra cùng một chỉ số. Có hai cách chính để xử lý:
            <ul class="list-circle list-inside ml-5">
                <li><strong>Nối kết riêng (Separate Chaining):</strong> Mỗi vị trí trong mảng là một danh sách liên kết. Khi va chạm, value mới được thêm vào danh sách liên kết tại vị trí đó.</li>
                <li><strong>Địa chỉ mở (Open Addressing):</strong> Khi va chạm, tìm một vị trí trống khác trong bảng theo một quy tắc nhất định (ví dụ: dò tuyến tính - linear probing).</li>
            </ul>
        </li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">3. Độ phức tạp</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Trung bình:</strong> Chèn (Insert), Xóa (Delete), Tìm kiếm (Search) đều là <code>O(1)</code>.</li>
        <li><strong>Trường hợp xấu nhất:</strong> Khi tất cả các key đều băm ra cùng một chỉ số, độ phức tạp trở thành <code>O(n)</code>, tương tự như danh sách liên kết.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">4. Ứng dụng</h3>
      <p>Hash Table được sử dụng cực kỳ rộng rãi, ví dụ như: đối tượng (object) trong JavaScript, từ điển (dictionary) trong Python, cơ sở dữ liệu, bộ nhớ đệm (cache)...</p>
    `,
    quiz: [
      {
        question: "Mục tiêu chính của việc sử dụng Hash Table là gì?",
        options: [
          "Sắp xếp dữ liệu hiệu quả",
          "Tiết kiệm bộ nhớ tối đa",
          "Thực hiện chèn, xóa, tìm kiếm với thời gian trung bình O(1)",
          "Duyệt dữ liệu theo thứ tự",
        ],
        correctAnswer:
          "Thực hiện chèn, xóa, tìm kiếm với thời gian trung bình O(1)",
      },
      {
        question:
          "Hiện tượng hai key khác nhau tạo ra cùng một chỉ số trong bảng băm được gọi là gì?",
        options: [
          "Xung đột (Conflict)",
          "Va chạm (Collision)",
          "Trùng lặp (Duplicate)",
          "Lỗi (Error)",
        ],
        correctAnswer: "Va chạm (Collision)",
      },
      {
        question:
          "Phương pháp 'Separate Chaining' giải quyết va chạm bằng cách nào?",
        options: [
          "Tìm một ô trống khác trong bảng",
          "Sử dụng một hàm băm khác",
          "Lưu các phần tử va chạm vào một danh sách liên kết tại ô đó",
          "Tính toán lại kích thước bảng",
        ],
        correctAnswer:
          "Lưu các phần tử va chạm vào một danh sách liên kết tại ô đó",
      },
    ],
  },
  // =================================================================
  // 6. Cây (Trees) - Cây tìm kiếm nhị phân
  // =================================================================
  {
    id: "trees",
    title: "Cây Tìm kiếm Nhị phân (BST)",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Cây là gì?</h3>
      <p>Cây là một cấu trúc dữ liệu phi tuyến, được sử dụng để biểu diễn các mối quan hệ phân cấp. Nó bao gồm các nút (nodes) được kết nối bởi các cạnh (edges). Nút trên cùng được gọi là gốc (root). Mỗi nút có thể có các nút con (children).</p>

      <h3 class="text-xl font-semibold mt-4 mb-2">2. Cây Tìm kiếm Nhị phân (Binary Search Tree - BST)</h3>
      <p>BST là một loại cây nhị phân (mỗi nút có tối đa 2 con) với các thuộc tính đặc biệt:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Tất cả các giá trị trong cây con <strong>trái</strong> của một nút đều <strong>nhỏ hơn</strong> giá trị của nút đó.</li>
        <li>Tất cả các giá trị trong cây con <strong>phải</strong> của một nút đều <strong>lớn hơn</strong> giá trị của nút đó.</li>
        <li>Cả hai cây con trái và phải cũng đều là cây tìm kiếm nhị phân.</li>
      </ul>
      <p>Thuộc tính này giúp cho việc tìm kiếm, chèn, xóa trở nên rất hiệu quả.</p>

      <h3 class="text-xl font-semibold mt-4 mb-2">3. Độ phức tạp (cho một cây cân bằng)</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Tìm kiếm (Search), Chèn (Insert), Xóa (Delete):</strong> Trung bình là <code>O(log n)</code>.</li>
        <li><strong>Trường hợp xấu nhất:</strong> Nếu cây bị suy biến thành một danh sách liên kết (ví dụ: chèn các số theo thứ tự tăng dần), độ phức tạp sẽ là <code>O(n)</code>. Các cấu trúc như cây AVL hoặc cây Đỏ-Đen được tạo ra để giữ cho cây luôn cân bằng.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">4. Các phép duyệt cây (Tree Traversal)</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>In-Order (Trái - Gốc - Phải):</strong> Duyệt BST theo thứ tự này sẽ cho ra các phần tử được sắp xếp tăng dần.</li>
        <li><strong>Pre-Order (Gốc - Trái - Phải):</strong> Hữu ích để sao chép cây.</li>
        <li><strong>Post-Order (Trái - Phải - Gốc):</strong> Hữu ích để xóa cây.</li>
      </ul>
    `,
    quiz: [
      {
        question:
          "Trong một Cây Tìm kiếm Nhị phân, giá trị của các nút trong cây con trái so với nút cha như thế nào?",
        options: ["Lớn hơn", "Nhỏ hơn", "Bằng", "Không xác định"],
        correctAnswer: "Nhỏ hơn",
      },
      {
        question:
          "Độ phức tạp thời gian trung bình cho thao tác tìm kiếm trong một BST cân bằng là gì?",
        options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
        correctAnswer: "O(log n)",
      },
      {
        question:
          "Phép duyệt cây nào trên BST sẽ cho ra một dãy các phần tử đã được sắp xếp?",
        options: ["Pre-Order", "Post-Order", "In-Order", "Level-Order"],
        correctAnswer: "In-Order",
      },
    ],
  },
  // =================================================================
  // 7. Đồ thị (Graphs)
  // =================================================================
  {
    id: "graphs",
    title: "Đồ thị (Graphs)",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Đồ thị là gì?</h3>
      <p>Đồ thị là một cấu trúc dữ liệu phi tuyến bao gồm một tập hợp các <strong>đỉnh (vertices/nodes)</strong> và một tập hợp các <strong>cạnh (edges)</strong> nối các đỉnh đó. Đồ thị được dùng để mô hình hóa các mối quan hệ phức tạp.</p>

      <h3 class="text-xl font-semibold mt-4 mb-2">2. Các loại đồ thị</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Đồ thị vô hướng (Undirected Graph):</strong> Các cạnh không có hướng (ví dụ: quan hệ bạn bè trên Facebook).</li>
        <li><strong>Đồ thị có hướng (Directed Graph):</strong> Các cạnh có hướng (ví dụ: a -> b, người A theo dõi người B trên Twitter).</li>
        <li><strong>Đồ thị có trọng số (Weighted Graph):</strong> Mỗi cạnh có một giá trị (trọng số) liên quan, ví dụ như khoảng cách giữa hai thành phố.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4 mb-2">3. Biểu diễn đồ thị</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Ma trận kề (Adjacency Matrix):</strong> Một ma trận vuông VxV, trong đó <code>matrix[i][j] = 1</code> nếu có cạnh nối đỉnh i và j. Tốn bộ nhớ <code>O(V^2)</code> nhưng kiểm tra cạnh nhanh (<code>O(1)</code>).</li>
        <li><strong>Danh sách kề (Adjacency List):</strong> Một mảng các danh sách liên kết. <code>adj[i]</code> chứa danh sách các đỉnh kề với đỉnh i. Tiết kiệm bộ nhớ cho đồ thị thưa (<code>O(V+E)</code>).</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">4. Các thuật toán duyệt đồ thị</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Duyệt theo chiều rộng (Breadth-First Search - BFS):</strong> Duyệt các đỉnh theo từng lớp, bắt đầu từ một đỉnh nguồn. Sử dụng cấu trúc dữ liệu Queue. Hữu ích để tìm đường đi ngắn nhất trong đồ thị không trọng số.</li>
        <li><strong>Duyệt theo chiều sâu (Depth-First Search - DFS):</strong> Đi sâu nhất có thể theo một nhánh trước khi quay lui. Sử dụng cấu trúc dữ liệu Stack (hoặc đệ quy). Hữu ích để kiểm tra tính liên thông, tìm chu trình.</li>
      </ul>
    `,
    quiz: [
      {
        question:
          "Cấu trúc dữ liệu nào thường được sử dụng trong thuật toán BFS?",
        options: ["Stack", "Queue", "Hash Table", "Array"],
        correctAnswer: "Queue",
      },
      {
        question:
          "Phương pháp biểu diễn đồ thị nào hiệu quả hơn về bộ nhớ cho các đồ thị thưa (ít cạnh)?",
        options: [
          "Ma trận kề",
          "Danh sách kề",
          "Cả hai như nhau",
          "Mảng 2 chiều",
        ],
        correctAnswer: "Danh sách kề",
      },
      {
        question:
          "Để tìm đường đi ngắn nhất (về số cạnh) giữa hai đỉnh trong một đồ thị không trọng số, thuật toán nào là lựa chọn tốt nhất?",
        options: [
          "DFS",
          "BFS",
          "Thuật toán Dijkstra",
          "Thuật toán Bellman-Ford",
        ],
        correctAnswer: "BFS",
      },
    ],
  },
  // =================================================================
  // 8. Thuật toán Sắp xếp (Sorting Algorithms)
  // =================================================================
  {
    id: "sorting-algorithms",
    title: "Thuật toán Sắp xếp",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Sắp xếp là gì?</h3>
      <p>Sắp xếp là quá trình sắp đặt lại các phần tử của một danh sách (hoặc mảng) theo một thứ tự nhất định (tăng dần hoặc giảm dần). Có nhiều thuật toán sắp xếp khác nhau, mỗi loại có ưu và nhược điểm riêng.</p>

      <h3 class="text-xl font-semibold mt-4 mb-2">2. Một số thuật toán phổ biến</h3>
      <ul class="list-disc list-inside space-y-4">
        <li><strong>Bubble Sort (Sắp xếp nổi bọt):</strong>
          <p class="ml-5">Lặp đi lặp lại qua danh sách, so sánh hai phần tử liền kề và đổi chỗ nếu chúng sai thứ tự. Đơn giản nhưng không hiệu quả.</p>
          <p class="ml-5">Độ phức tạp: <code>O(n^2)</code> trong mọi trường hợp.</p>
        </li>
        <li><strong>Selection Sort (Sắp xếp chọn):</strong>
          <p class="ml-5">Tìm phần tử nhỏ nhất trong phần chưa được sắp xếp và đổi chỗ nó với phần tử đầu tiên của phần đó. Lặp lại cho đến khi toàn bộ danh sách được sắp xếp.</p>
          <p class="ml-5">Độ phức tạp: <code>O(n^2)</code> trong mọi trường hợp.</p>
        </li>
        <li><strong>Insertion Sort (Sắp xếp chèn):</strong>
          <p class="ml-5">Xây dựng danh sách đã sắp xếp cuối cùng tại một thời điểm. Lấy từng phần tử từ phần chưa sắp xếp và chèn nó vào đúng vị trí trong phần đã sắp xếp.</p>
          <p class="ml-5">Độ phức tạp: <code>O(n^2)</code>. Hiệu quả với các danh sách gần như đã được sắp xếp.</p>
        </li>
        <li><strong>Merge Sort (Sắp xếp trộn):</strong>
          <p class="ml-5">Theo tư tưởng "Chia để trị". Chia danh sách thành hai nửa, sắp xếp đệ quy từng nửa, sau đó trộn (merge) hai nửa đã sắp xếp lại với nhau.</p>
          <p class="ml-5">Độ phức tạp: <code>O(n log n)</code> trong mọi trường hợp. Cần thêm không gian bộ nhớ.</p>
        </li>
        <li><strong>Quick Sort (Sắp xếp nhanh):</strong>
          <p class="ml-5">Cũng theo tư tưởng "Chia để trị". Chọn một phần tử làm "chốt" (pivot), sau đó phân hoạch các phần tử khác vào hai mảng con, tùy theo chúng nhỏ hơn hay lớn hơn chốt. Sắp xếp đệ quy các mảng con.</p>
          <p class="ml-5">Độ phức tạp: Trung bình <code>O(n log n)</code>, trường hợp xấu nhất <code>O(n^2)</code>.</p>
        </li>
      </ul>
    `,
    quiz: [
      {
        question:
          "Thuật toán sắp xếp nào có độ phức tạp thời gian trong trường hợp xấu nhất là O(n^2)?",
        options: ["Merge Sort", "Heap Sort", "Quick Sort", "Timsort"],
        correctAnswer: "Quick Sort",
      },
      {
        question: "Thuật toán nào hoạt động theo nguyên tắc 'Chia để trị'?",
        options: [
          "Bubble Sort",
          "Insertion Sort",
          "Merge Sort",
          "Selection Sort",
        ],
        correctAnswer: "Merge Sort",
      },
      {
        question:
          "Đối với một danh sách gần như đã được sắp xếp, thuật toán nào thường cho hiệu suất tốt nhất?",
        options: [
          "Quick Sort",
          "Insertion Sort",
          "Selection Sort",
          "Merge Sort",
        ],
        correctAnswer: "Insertion Sort",
      },
    ],
  },
  // =================================================================
  // 9. Thuật toán Tìm kiếm (Searching Algorithms)
  // =================================================================
  {
    id: "searching-algorithms",
    title: "Thuật toán Tìm kiếm",
    theory: `
      <h3 class="text-xl font-semibold mb-2">1. Tìm kiếm là gì?</h3>
      <p>Tìm kiếm là quá trình tìm một phần tử cụ thể (target) trong một tập hợp dữ liệu. Kết quả thường là vị trí của phần tử hoặc thông báo không tìm thấy.</p>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">2. Tìm kiếm tuần tự (Linear Search)</h3>
      <p>Đây là thuật toán đơn giản nhất: duyệt qua từng phần tử của danh sách từ đầu đến cuối và so sánh với giá trị cần tìm. Dừng lại khi tìm thấy hoặc đã duyệt hết danh sách.</p>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Ưu điểm:</strong> Đơn giản, hoạt động trên cả dữ liệu đã sắp xếp và chưa sắp xếp.</li>
        <li><strong>Nhược điểm:</strong> Chậm với dữ liệu lớn.</li>
        <li><strong>Độ phức tạp:</strong> <code>O(n)</code>.</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-4 mb-2">3. Tìm kiếm nhị phân (Binary Search)</h3>
      <p>Thuật toán này hiệu quả hơn nhiều nhưng <strong>yêu cầu dữ liệu phải được sắp xếp trước</strong>. Nó hoạt động bằng cách liên tục chia đôi khoảng tìm kiếm.</p>
      <p>Các bước:</p>
      <ol class="list-decimal list-inside space-y-2">
        <li>So sánh giá trị cần tìm với phần tử ở giữa khoảng tìm kiếm.</li>
        <li>Nếu bằng nhau, đã tìm thấy.</li>
        <li>Nếu nhỏ hơn, lặp lại tìm kiếm ở nửa bên trái.</li>
        <li>Nếu lớn hơn, lặp lại tìm kiếm ở nửa bên phải.</li>
      </ol>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Ưu điểm:</strong> Rất nhanh.</li>
        <li><strong>Nhược điểm:</strong> Yêu cầu dữ liệu phải được sắp xếp.</li>
        <li><strong>Độ phức tạp:</strong> <code>O(log n)</code>.</li>
      </ul>
    `,
    quiz: [
      {
        question:
          "Điều kiện tiên quyết để áp dụng thuật toán Tìm kiếm nhị phân là gì?",
        options: [
          "Dữ liệu phải là số nguyên",
          "Dữ liệu không được có phần tử trùng lặp",
          "Dữ liệu phải được sắp xếp",
          "Dữ liệu phải được lưu trong mảng",
        ],
        correctAnswer: "Dữ liệu phải được sắp xếp",
      },
      {
        question:
          "Độ phức tạp thời gian của Tìm kiếm tuần tự trong trường hợp xấu nhất là gì?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        correctAnswer: "O(n)",
      },
      {
        question:
          "Với một danh sách 1.000.000 phần tử đã sắp xếp, Tìm kiếm nhị phân cần khoảng bao nhiêu lần so sánh trong trường hợp xấu nhất?",
        options: [
          "Khoảng 1.000.000",
          "Khoảng 500.000",
          "Khoảng 100",
          "Khoảng 20",
        ],
        correctAnswer: "Khoảng 20",
      },
    ],
  },
];
