export const dsaData = [
  // --- CÁC CẤU TRÚC DỮ LIỆU CƠ BẢN ---
  {
    id: "array",
    title: "Mảng (Array)",
    content: {
      description:
        "Mảng là một cấu trúc dữ liệu lưu trữ một tập hợp các phần tử có cùng kiểu dữ liệu trong các vị trí bộ nhớ liền kề. Mỗi phần tử được truy cập thông qua một chỉ số (index). Mảng có kích thước cố định hoặc động.",
      complexity: {
        access: "O(1)",
        search: "O(n)",
        insertion: "O(n)",
        deletion: "O(n)",
      },
      codeExample: {
        language: "javascript",
        code: `// Khai báo và khởi tạo một mảng
let fruits = ["Apple", "Banana", "Cherry"];

// Truy cập phần tử
console.log(fruits[0]); // Output: Apple

// Thêm phần tử vào cuối mảng
fruits.push("Orange");

// Xóa phần tử cuối mảng
fruits.pop();

// Lặp qua các phần tử
fruits.forEach(function(item, index) {
  console.log(item, index);
});`,
      },
    },
  },
  {
    id: "linked-list",
    title: "Danh sách liên kết (Linked List)",
    content: {
      description:
        "Danh sách liên kết là một cấu trúc dữ liệu tuyến tính bao gồm một chuỗi các nút (node). Mỗi nút chứa dữ liệu và một con trỏ (tham chiếu) đến nút tiếp theo trong chuỗi. Khác với mảng, các phần tử không được lưu trữ ở các vị trí bộ nhớ liền kề.",
      complexity: {
        access: "O(n)",
        search: "O(n)",
        insertion: "O(1) (đầu) / O(n)",
        deletion: "O(1) (đầu) / O(n)",
      },
      codeExample: {
        language: "javascript",
        code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Thêm một node vào cuối danh sách
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  
  // In danh sách
  printList() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }
}

const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.printList(); // Output: 10 -> 20 -> 30`,
      },
    },
  },
  {
    id: "stack",
    title: "Ngăn xếp (Stack)",
    content: {
      description:
        "Ngăn xếp là một cấu trúc dữ liệu hoạt động theo nguyên tắc LIFO (Last-In, First-Out), nghĩa là phần tử được thêm vào cuối cùng sẽ là phần tử được lấy ra đầu tiên. Các hoạt động chính là push (thêm vào đỉnh) và pop (lấy ra từ đỉnh).",
      complexity: {
        access: "O(n)",
        search: "O(n)",
        insertion: "O(1)",
        deletion: "O(1)",
      },
      codeExample: {
        language: "javascript",
        code: `class Stack {
    constructor() {
        this.items = [];
    }

    // Thêm phần tử vào đỉnh stack
    push(element) {
        this.items.push(element);
    }

    // Lấy phần tử khỏi đỉnh stack
    pop() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.pop();
    }

    // Xem phần tử ở đỉnh
    peek() {
        return this.items[this.items.length - 1];
    }

    // Kiểm tra stack rỗng
    isEmpty() {
        return this.items.length === 0;
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop());  // 3
console.log(stack.items);  // [1, 2]`,
      },
    },
  },
  {
    id: "queue",
    title: "Hàng đợi (Queue)",
    content: {
      description:
        "Hàng đợi là một cấu trúc dữ liệu hoạt động theo nguyên tắc FIFO (First-In, First-Out), tương tự như hàng đợi trong đời thực. Phần tử được thêm vào cuối (enqueue) và được lấy ra từ đầu (dequeue).",
      complexity: {
        access: "O(n)",
        search: "O(n)",
        insertion: "O(1)",
        deletion: "O(1)",
      },
      codeExample: {
        language: "javascript",
        code: `class Queue {
    constructor() {
        this.items = [];
    }

    // Thêm phần tử vào cuối hàng đợi
    enqueue(element) {
        this.items.push(element);
    }

    // Lấy phần tử khỏi đầu hàng đợi
    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    // Xem phần tử ở đầu
    front() {
        if (this.isEmpty()) {
            return "No elements in Queue";
        }
        return this.items[0];
    }

    // Kiểm tra hàng đợi rỗng
    isEmpty() {
        return this.items.length === 0;
    }
}

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.front()); // 10
console.log(queue.dequeue()); // 10
console.log(queue.items);   // [20, 30]`,
      },
    },
  },
  {
    id: "hash-table",
    title: "Bảng băm (Hash Table)",
    content: {
      description:
        "Bảng băm là một cấu trúc dữ liệu ánh xạ các khóa (key) tới các giá trị (value) để có thể truy xuất hiệu quả. Nó sử dụng một hàm băm để tính toán một chỉ số (index) trong một mảng, từ đó có thể tìm kiếm, chèn, xóa giá trị một cách nhanh chóng. Trong JavaScript, Object và Map là các dạng triển khai của bảng băm.",
      complexity: {
        access: "O(1) (trung bình)",
        search: "O(1) (trung bình)",
        insertion: "O(1) (trung bình)",
        deletion: "O(1) (trung bình)",
      },
      codeExample: {
        language: "javascript",
        code: `// Sử dụng Map trong JavaScript
const map = new Map();

// Thêm cặp key-value
map.set('name', 'John Doe');
map.set('age', 30);
map.set('city', 'New York');

// Lấy giá trị theo key
console.log(map.get('name')); // Output: John Doe

// Kiểm tra sự tồn tại của key
console.log(map.has('age')); // Output: true

// Xóa một cặp key-value
map.delete('city');

// Lặp qua Map
map.forEach((value, key) => {
    console.log(key, value);
});`,
      },
    },
  },
  // --- CÁC CẤU TRÚC DỮ LIỆU PHI TUYẾN TÍNH ---
  {
    id: "binary-search-tree",
    title: "Cây tìm kiếm nhị phân (BST)",
    content: {
      description:
        "Cây tìm kiếm nhị phân là một cấu trúc dữ liệu dạng cây, trong đó mỗi nút có tối đa hai con. Giá trị của mọi nút trong cây con bên trái luôn nhỏ hơn giá trị của nút cha, và giá trị của mọi nút trong cây con bên phải luôn lớn hơn. Điều này giúp cho việc tìm kiếm, chèn, xóa rất hiệu quả.",
      complexity: {
        access: "O(log n) (trung bình)",
        search: "O(log n) (trung bình)",
        insertion: "O(log n) (trung bình)",
        deletion: "O(log n) (trung bình)",
      },
      codeExample: {
        language: "javascript",
        code: `class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            if (node.right === null) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }
    
    // Duyệt cây theo thứ tự giữa (in-order traversal) -> cho ra mảng đã sắp xếp
    inOrder(node, result = []) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.data);
            this.inOrder(node.right, result);
        }
        return result;
    }
}

const bst = new BinarySearchTree();
bst.insert(15);
bst.insert(25);
bst.insert(10);
bst.insert(7);
bst.insert(22);
console.log(bst.inOrder(bst.root)); // [7, 10, 15, 22, 25]`,
      },
    },
  },
  {
    id: "graph",
    title: "Đồ thị (Graph)",
    content: {
      description:
        "Đồ thị là một cấu trúc dữ liệu bao gồm một tập hợp các đỉnh (vertices) và một tập hợp các cạnh (edges) nối các đỉnh này. Đồ thị được sử dụng để mô hình hóa các mối quan hệ. Có hai loại chính: đồ thị vô hướng (undirected) và đồ thị có hướng (directed).",
      complexity: {
        access: "Thêm đỉnh: O(1)",
        search: "Thêm cạnh: O(1)",
        insertion: "Duyệt (BFS/DFS): O(V+E)",
        deletion: "V: số đỉnh, E: số cạnh",
      },
      codeExample: {
        language: "javascript",
        code: `class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList.get(vertex1).push(vertex2);
        // Với đồ thị vô hướng, thêm cạnh ngược lại
        this.adjacencyList.get(vertex2).push(vertex1);
    }
    
    // Duyệt theo chiều rộng (Breadth-First Search)
    bfs(startNode) {
      const visited = new Set();
      const queue = [startNode];
      visited.add(startNode);
      
      while(queue.length > 0) {
        const vertex = queue.shift();
        console.log(vertex);
        
        const neighbors = this.adjacencyList.get(vertex);
        for(const neighbor of neighbors) {
          if(!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.bfs('A'); // A, B, C`,
      },
    },
  },
  // --- CÁC GIẢI THUẬT QUAN TRỌNG ---
  {
    id: "binary-search",
    title: "Tìm kiếm nhị phân (Binary Search)",
    content: {
      description:
        "Tìm kiếm nhị phân là một thuật toán hiệu quả để tìm một phần tử trong một mảng ĐÃ ĐƯỢC SẮP XẾP. Thuật toán hoạt động bằng cách liên tục chia đôi khoảng tìm kiếm cho đến khi tìm thấy phần tử hoặc khoảng tìm kiếm rỗng.",
      complexity: {
        access: "Độ phức tạp thời gian",
        search: "O(log n)",
        insertion: "Độ phức tạp không gian",
        deletion: "O(1)",
      },
      codeExample: {
        language: "javascript",
        code: `function binarySearch(sortedArray, key) {
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle] === key) {
            // tìm thấy key
            return middle;
        } else if (sortedArray[middle] < key) {
            // tiếp tục tìm ở nửa bên phải
            start = middle + 1;
        } else {
            // tiếp tục tìm ở nửa bên trái
            end = middle - 1;
        }
    }
    // không tìm thấy key
    return -1;
}

const arr = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(arr, 9)); // Output: 4
console.log(binarySearch(arr, 8)); // Output: -1`,
      },
    },
  },
  {
    id: "merge-sort",
    title: "Sắp xếp trộn (Merge Sort)",
    content: {
      description:
        "Sắp xếp trộn là một thuật toán sắp xếp theo kiểu \"chia để trị\" (divide and conquer). Nó chia mảng thành hai nửa, đệ quy sắp xếp từng nửa, sau đó trộn (merge) hai nửa đã sắp xếp lại với nhau để tạo thành một mảng hoàn chỉnh đã được sắp xếp.",
      complexity: {
        access: "Trường hợp tốt nhất",
        search: "O(n log n)",
        insertion: "Trường hợp xấu nhất",
        deletion: "O(n log n)",
      },
      codeExample: {
        language: "javascript",
        code: `function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
}

const unsortedArr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(unsortedArr)); // [3, 9, 10, 27, 38, 43, 82]`,
      },
    },
  },
];