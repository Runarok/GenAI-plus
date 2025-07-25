// Project data structure
const projectsData = [
  {
    id: "project1",
    title: "Hospital Patient Queue System",
    description: "Priority-based patient management with triage and appointment scheduling",
    icon: "fas fa-hospital",
    sections: {
      oop: {
        title: "Object-Oriented Programming Classes",
        icon: "fas fa-cube",
        codeBlocks: [
          {
            title: "Patient Class",
            language: "python",
            code: `class Patient:
    def __init__(self, patient_id, name, age, condition, priority):
        self.patient_id = patient_id
        self.name = name
        self.age = age
        self.condition = condition
        self.priority = priority  # 1-5 (1 = Critical, 5 = Minor)
        self.arrival_time = datetime.now()
        self.status = "waiting"
    
    def __lt__(self, other):
        return self.priority < other.priority
    
    def update_status(self, new_status):
        self.status = new_status
        
    def get_waiting_time(self):
        return datetime.now() - self.arrival_time`,
          },
          {
            title: "Doctor Class",
            language: "python",
            code: `class Doctor:
    def __init__(self, doctor_id, name, specialization, availability=True):
        self.doctor_id = doctor_id
        self.name = name
        self.specialization = specialization
        self.availability = availability
        self.current_patient = None
        self.patients_treated = 0
    
    def assign_patient(self, patient):
        if self.availability:
            self.current_patient = patient
            self.availability = False
            patient.update_status("in_treatment")
            return True
        return False
    
    def finish_treatment(self):
        if self.current_patient:
            self.current_patient.update_status("treated")
            self.current_patient = None
            self.availability = True
            self.patients_treated += 1`,
          },
          {
            title: "QueueManager Class",
            language: "python",
            code: `class QueueManager:
    def __init__(self):
        self.priority_queue = PriorityQueue()
        self.patient_records = {}  # HashMap for O(1) lookup
        self.doctors = {}
        self.appointments = Queue()
    
    def register_patient(self, patient):
        self.priority_queue.put(patient)
        self.patient_records[patient.patient_id] = patient
        
    def assign_next_patient(self):
        if not self.priority_queue.empty():
            patient = self.priority_queue.get()
            available_doctor = self.find_available_doctor()
            if available_doctor:
                available_doctor.assign_patient(patient)
                return True
        return False
    
    def find_available_doctor(self):
        for doctor in self.doctors.values():
            if doctor.availability:
                return doctor
        return None`,
          },
        ],
      },
      dsa: {
        title: "Data Structures Implementation",
        icon: "fas fa-sitemap",
        codeBlocks: [
          {
            title: "Priority Queue for Triage",
            language: "python",
            code: `import heapq
from collections import deque

class TriagePriorityQueue:
    def __init__(self):
        self.heap = []
        self.entry_finder = {}
        self.counter = 0
    
    def add_patient(self, patient):
        """Add patient with priority (1=Critical, 5=Minor)"""
        if patient.patient_id in self.entry_finder:
            self.remove_patient(patient.patient_id)
        
        entry = [patient.priority, self.counter, patient]
        self.entry_finder[patient.patient_id] = entry
        heapq.heappush(self.heap, entry)
        self.counter += 1
    
    def remove_patient(self, patient_id):
        """Mark patient as removed"""
        entry = self.entry_finder.pop(patient_id)
        entry[-1] = 'REMOVED'
    
    def get_next_patient(self):
        """Get highest priority patient"""
        while self.heap:
            priority, count, patient = heapq.heappop(self.heap)
            if patient != 'REMOVED':
                del self.entry_finder[patient.patient_id]
                return patient
        return None`,
          },
          {
            title: "HashMap for Patient Records",
            language: "python",
            code: `class PatientHashMap:
    def __init__(self, initial_capacity=16):
        self.capacity = initial_capacity
        self.size = 0
        self.buckets = [[] for _ in range(self.capacity)]
    
    def _hash(self, key):
        """Simple hash function"""
        return hash(key) % self.capacity
    
    def put(self, patient_id, patient):
        """Store patient record"""
        index = self._hash(patient_id)
        bucket = self.buckets[index]
        
        for i, (key, value) in enumerate(bucket):
            if key == patient_id:
                bucket[i] = (patient_id, patient)
                return
        
        bucket.append((patient_id, patient))
        self.size += 1
        
        if self.size > self.capacity * 0.7:
            self._resize()
    
    def get(self, patient_id):
        """Retrieve patient record in O(1) average time"""
        index = self._hash(patient_id)
        bucket = self.buckets[index]
        
        for key, value in bucket:
            if key == patient_id:
                return value
        return None`,
          },
        ],
      },
      algo: {
        title: "Core Algorithms",
        icon: "fas fa-cogs",
        codeBlocks: [
          {
            title: "Triage Sorting Algorithm",
            language: "python",
            code: `def triage_sort_patients(patients):
    """
    Sort patients by priority using a stable sorting algorithm
    Time Complexity: O(n log n)
    Space Complexity: O(n)
    """
    def get_triage_score(patient):
        # Calculate composite score based on multiple factors
        base_priority = patient.priority
        age_factor = 0.1 if patient.age > 65 else 0
        waiting_time = patient.get_waiting_time().total_seconds() / 3600
        
        # Lower score = higher priority
        return base_priority - age_factor - (waiting_time * 0.01)
    
    # Use merge sort for stable sorting
    return merge_sort(patients, key=get_triage_score)

def merge_sort(arr, key):
    """Merge sort implementation for stable sorting"""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid], key)
    right = merge_sort(arr[mid:], key)
    
    return merge(left, right, key)`,
          },
          {
            title: "Appointment Scheduling Algorithm",
            language: "python",
            code: `def schedule_appointments(patients, doctors, time_slots):
    """
    Optimize appointment scheduling using greedy algorithm
    Time Complexity: O(n * m) where n = patients, m = doctors
    """
    scheduled = []
    available_slots = {doctor.doctor_id: time_slots.copy() for doctor in doctors}
    
    # Sort patients by priority
    sorted_patients = sorted(patients, key=lambda p: p.priority)
    
    for patient in sorted_patients:
        best_doctor = None
        best_time = None
        
        # Find best doctor-time combination
        for doctor in doctors:
            if doctor.specialization_matches(patient.condition):
                slots = available_slots[doctor.doctor_id]
                if slots:
                    # Choose earliest available slot
                    best_time = min(slots)
                    best_doctor = doctor
                    break
        
        if best_doctor and best_time:
            # Schedule the appointment
            appointment = Appointment(patient, best_doctor, best_time)
            scheduled.append(appointment)
            available_slots[best_doctor.doctor_id].remove(best_time)
    
    return scheduled`,
          },
        ],
      },
    },
  },
  {
    id: "project2",
    title: "Student Course Management System",
    description: "Academic management with course prerequisites and grade tracking",
    icon: "fas fa-graduation-cap",
    sections: {
      oop: {
        title: "Object-Oriented Programming Classes",
        icon: "fas fa-cube",
        codeBlocks: [
          {
            title: "Student Class",
            language: "python",
            code: `class Student:
    def __init__(self, student_id, name, email, major):
        self.student_id = student_id
        self.name = name
        self.email = email
        self.major = major
        self.enrolled_courses = LinkedList()
        self.grades = {}
        self.gpa = 0.0
        self.credit_hours = 0
        
    def enroll_in_course(self, course):
        if self.check_prerequisites(course):
            self.enrolled_courses.append(course)
            course.add_student(self)
            return True
        return False
    
    def check_prerequisites(self, course):
        completed_courses = {course_id for course_id in self.grades.keys() 
                           if self.grades[course_id] >= 'D'}
        return course.prerequisites.issubset(completed_courses)
    
    def add_grade(self, course_id, grade):
        self.grades[course_id] = grade
        self.calculate_gpa()
    
    def calculate_gpa(self):
        if not self.grades:
            return 0.0
        
        grade_points = {'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0}
        total_points = sum(grade_points.get(grade, 0) for grade in self.grades.values())
        self.gpa = total_points / len(self.grades)
        return self.gpa`,
          },
          {
            title: "Course Class",
            language: "python",
            code: `class Course:
    def __init__(self, course_id, name, instructor, credits, max_capacity):
        self.course_id = course_id
        self.name = name
        self.instructor = instructor
        self.credits = credits
        self.max_capacity = max_capacity
        self.enrolled_students = []
        self.prerequisites = set()
        self.schedule = None
        self.syllabus = ""
    
    def add_student(self, student):
        if len(self.enrolled_students) < self.max_capacity:
            self.enrolled_students.append(student)
            return True
        return False
    
    def remove_student(self, student):
        if student in self.enrolled_students:
            self.enrolled_students.remove(student)
            return True
        return False
    
    def add_prerequisite(self, course_id):
        self.prerequisites.add(course_id)
    
    def get_enrollment_count(self):
        return len(self.enrolled_students)
    
    def is_full(self):
        return len(self.enrolled_students) >= self.max_capacity`,
          },
        ],
      },
      dsa: {
        title: "Data Structures Implementation",
        icon: "fas fa-sitemap",
        codeBlocks: [
          {
            title: "Graph for Course Prerequisites",
            language: "python",
            code: `class CoursePrerequisiteGraph:
    def __init__(self):
        self.graph = {}  # Adjacency list representation
        self.courses = {}  # Course objects storage
    
    def add_course(self, course):
        """Add course to the graph"""
        self.courses[course.course_id] = course
        if course.course_id not in self.graph:
            self.graph[course.course_id] = []
    
    def add_prerequisite(self, course_id, prerequisite_id):
        """Add prerequisite relationship (prerequisite -> course)"""
        if prerequisite_id not in self.graph:
            self.graph[prerequisite_id] = []
        if course_id not in self.graph:
            self.graph[course_id] = []
        
        self.graph[prerequisite_id].append(course_id)
    
    def get_course_sequence(self, target_course_id):
        """Get optimal course sequence using topological sort"""
        visited = set()
        rec_stack = set()
        result = []
        
        def dfs(course_id):
            if course_id in rec_stack:
                raise ValueError(f"Circular dependency detected involving {course_id}")
            if course_id in visited:
                return
            
            visited.add(course_id)
            rec_stack.add(course_id)
            
            # Visit all prerequisites first
            prerequisites = self.get_prerequisites(course_id)
            for prereq in prerequisites:
                dfs(prereq)
            
            rec_stack.remove(course_id)
            result.append(course_id)
        
        dfs(target_course_id)
        return result`,
          },
        ],
      },
      algo: {
        title: "Core Algorithms",
        icon: "fas fa-cogs",
        codeBlocks: [
          {
            title: "Grade Sorting Algorithm",
            language: "python",
            code: `def quick_sort_students_by_gpa(students, low=0, high=None):
    """
    Sort students by GPA using quicksort
    Time Complexity: O(n log n) average, O(n²) worst case
    Space Complexity: O(log n)
    """
    if high is None:
        high = len(students) - 1
    
    if low < high:
        pivot_index = partition_by_gpa(students, low, high)
        quick_sort_students_by_gpa(students, low, pivot_index - 1)
        quick_sort_students_by_gpa(students, pivot_index + 1, high)
    
    return students

def partition_by_gpa(students, low, high):
    """Partition function for quicksort"""
    pivot = students[high].gpa
    i = low - 1
    
    for j in range(low, high):
        if students[j].gpa >= pivot:  # Descending order (highest GPA first)
            i += 1
            students[i], students[j] = students[j], students[i]
    
    students[i + 1], students[high] = students[high], students[i + 1]
    return i + 1`,
          },
        ],
      },
    },
  },
  {
    id: "project3",
    title: "E-commerce Cart & Order System",
    description: "Shopping cart management with inventory tracking and order processing",
    icon: "fas fa-shopping-cart",
    sections: {
      oop: {
        title: "Object-Oriented Programming Classes",
        icon: "fas fa-cube",
        codeBlocks: [
          {
            title: "Product Class",
            language: "python",
            code: `class Product:
    def __init__(self, product_id, name, price, category, stock_quantity):
        self.product_id = product_id
        self.name = name
        self.price = price
        self.category = category
        self.stock_quantity = stock_quantity
        self.description = ""
        self.images = []
        self.reviews = []
        self.average_rating = 0.0
        self.created_at = datetime.now()
    
    def update_stock(self, quantity_change):
        """Update stock quantity (positive for restock, negative for purchase)"""
        new_quantity = self.stock_quantity + quantity_change
        if new_quantity >= 0:
            self.stock_quantity = new_quantity
            return True
        return False
    
    def add_review(self, customer_id, rating, comment):
        """Add customer review and update average rating"""
        review = {
            'customer_id': customer_id,
            'rating': rating,
            'comment': comment,
            'date': datetime.now()
        }
        self.reviews.append(review)
        self.calculate_average_rating()
    
    def is_in_stock(self, requested_quantity=1):
        """Check if requested quantity is available"""
        return self.stock_quantity >= requested_quantity`,
          },
          {
            title: "ShoppingCart Class",
            language: "python",
            code: `class ShoppingCart:
    def __init__(self, customer_id):
        self.customer_id = customer_id
        self.items = []  # List of cart items
        self.undo_stack = Stack()  # For undo operations
        self.created_at = datetime.now()
        self.last_modified = datetime.now()
    
    def add_item(self, product, quantity):
        """Add item to cart with undo support"""
        # Save state for undo
        self.undo_stack.push(('add', product.product_id, quantity))
        
        # Check if item already exists in cart
        for item in self.items:
            if item['product'].product_id == product.product_id:
                item['quantity'] += quantity
                self.last_modified = datetime.now()
                return True
        
        # Add new item
        cart_item = {
            'product': product,
            'quantity': quantity,
            'added_at': datetime.now()
        }
        self.items.append(cart_item)
        self.last_modified = datetime.now()
        return True
    
    def calculate_total(self):
        """Calculate total cart value"""
        total = 0
        for item in self.items:
            total += item['product'].price * item['quantity']
        return total`,
          },
        ],
      },
      dsa: {
        title: "Data Structures Implementation",
        icon: "fas fa-sitemap",
        codeBlocks: [
          {
            title: "Stack for Undo Operations",
            language: "python",
            code: `class UndoStack:
    def __init__(self, max_size=50):
        self.stack = []
        self.max_size = max_size
    
    def push(self, action):
        """Push action onto stack for undo functionality"""
        if len(self.stack) >= self.max_size:
            # Remove oldest action if stack is full
            self.stack.pop(0)
        
        self.stack.append(action)
    
    def pop(self):
        """Pop most recent action from stack"""
        if not self.is_empty():
            return self.stack.pop()
        return None
    
    def peek(self):
        """Look at top action without removing it"""
        if not self.is_empty():
            return self.stack[-1]
        return None
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.stack) == 0
    
    def size(self):
        """Get current stack size"""
        return len(self.stack)`,
          },
        ],
      },
      algo: {
        title: "Core Algorithms",
        icon: "fas fa-cogs",
        codeBlocks: [
          {
            title: "Product Search Algorithm",
            language: "python",
            code: `def advanced_product_filter(products, filters):
    """
    Filter products based on multiple criteria
    Time Complexity: O(n) where n is number of products
    """
    def matches_filters(product):
        # Price range filter
        if 'min_price' in filters and product.price < filters['min_price']:
            return False
        if 'max_price' in filters and product.price > filters['max_price']:
            return False
        
        # Category filter
        if 'category' in filters and product.category != filters['category']:
            return False
        
        # Rating filter
        if 'min_rating' in filters and product.average_rating < filters['min_rating']:
            return False
        
        # Stock availability filter
        if 'in_stock_only' in filters and filters['in_stock_only']:
            if product.stock_quantity <= 0:
                return False
        
        # Search term filter (name and description)
        if 'search_term' in filters:
            term = filters['search_term'].lower()
            if (term not in product.name.lower() and 
                term not in product.description.lower()):
                return False
        
        return True
    
    return [product for product in products if matches_filters(product)]`,
          },
        ],
      },
    },
  },
  {
    id: "project4",
    title: "Library Management System",
    description: "Book lending system with member management and overdue tracking",
    icon: "fas fa-book",
    sections: {
      oop: {
        title: "Object-Oriented Programming Classes",
        icon: "fas fa-cube",
        codeBlocks: [
          {
            title: "Book Class",
            language: "python",
            code: `class Book:
    def __init__(self, isbn, title, author, publisher, year_published):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.publisher = publisher
        self.year_published = year_published
        self.genre = ""
        self.description = ""
        self.total_copies = 1
        self.available_copies = 1
        self.location = ""  # Shelf location
        self.added_date = datetime.now()
        self.borrowed_count = 0
    
    def checkout(self):
        """Check out a copy of the book"""
        if self.available_copies > 0:
            self.available_copies -= 1
            self.borrowed_count += 1
            return True
        return False
    
    def checkin(self):
        """Return a copy of the book"""
        if self.available_copies < self.total_copies:
            self.available_copies += 1
            return True
        return False
    
    def is_available(self):
        """Check if book is available for checkout"""
        return self.available_copies > 0`,
          },
          {
            title: "Member Class",
            language: "python",
            code: `class Member:
    def __init__(self, member_id, name, email, phone, address):
        self.member_id = member_id
        self.name = name
        self.email = email
        self.phone = phone
        self.address = address
        self.membership_date = datetime.now()
        self.membership_type = "regular"  # regular, premium, student
        self.borrowed_books = []
        self.borrowing_history = LinkedList()
        self.outstanding_fines = 0.0
        self.max_books_allowed = 5
        self.is_active = True
    
    def can_borrow_book(self):
        """Check if member can borrow more books"""
        return (len(self.borrowed_books) < self.max_books_allowed and 
                self.outstanding_fines < 10.0 and 
                self.is_active)
    
    def borrow_book(self, book, due_date):
        """Borrow a book"""
        if self.can_borrow_book() and book.is_available():
            loan = Loan(self.member_id, book.isbn, due_date)
            self.borrowed_books.append(loan)
            self.borrowing_history.append(loan)
            book.checkout()
            return loan
        return None`,
          },
        ],
      },
      dsa: {
        title: "Data Structures Implementation",
        icon: "fas fa-sitemap",
        codeBlocks: [
          {
            title: "HashMap for Book Catalog",
            language: "python",
            code: `class BookCatalogHashMap:
    def __init__(self, initial_capacity=128):
        self.capacity = initial_capacity
        self.size = 0
        self.buckets = [[] for _ in range(self.capacity)]
        self.load_factor_threshold = 0.75
    
    def _hash(self, isbn):
        """Hash function for ISBN"""
        return hash(isbn) % self.capacity
    
    def add_book(self, book):
        """Add book to catalog"""
        if self.size >= self.capacity * self.load_factor_threshold:
            self._resize()
        
        index = self._hash(book.isbn)
        bucket = self.buckets[index]
        
        # Check if book already exists
        for i, (key, value) in enumerate(bucket):
            if key == book.isbn:
                # Update existing book
                bucket[i] = (book.isbn, book)
                return
        
        # Add new book
        bucket.append((book.isbn, book))
        self.size += 1
    
    def find_book(self, isbn):
        """Find book by ISBN in O(1) average time"""
        index = self._hash(isbn)
        bucket = self.buckets[index]
        
        for key, value in bucket:
            if key == isbn:
                return value
        return None`,
          },
        ],
      },
      algo: {
        title: "Core Algorithms",
        icon: "fas fa-cogs",
        codeBlocks: [
          {
            title: "Book Search Algorithm",
            language: "python",
            code: `def advanced_book_search(catalog, query, search_fields=['title', 'author', 'isbn']):
    """
    Multi-field book search with ranking
    Time Complexity: O(n) where n is number of books
    """
    results = []
    query_lower = query.lower()
    
    for book in catalog.get_all_books():
        score = 0
        matches = []
        
        # Search in title
        if 'title' in search_fields:
            title_score = calculate_text_relevance(book.title.lower(), query_lower)
            if title_score > 0:
                score += title_score * 3  # Title matches weighted higher
                matches.append('title')
        
        # Search in author
        if 'author' in search_fields:
            author_score = calculate_text_relevance(book.author.lower(), query_lower)
            if author_score > 0:
                score += author_score * 2  # Author matches weighted medium
                matches.append('author')
        
        if score > 0:
            results.append({
                'book': book,
                'score': score,
                'matches': matches,
                'availability': book.available_copies
            })
    
    # Sort by score (highest first), then by availability
    results.sort(key=lambda x: (x['score'], x['availability']), reverse=True)
    return results`,
          },
        ],
      },
    },
  },
  {
    id: "project5",
    title: "Banking System with Transaction Manager",
    description: "Secure banking operations with transaction validation and balance management",
    icon: "fas fa-university",
    sections: {
      oop: {
        title: "Object-Oriented Programming Classes",
        icon: "fas fa-cube",
        codeBlocks: [
          {
            title: "Account Class",
            language: "python",
            code: `from decimal import Decimal
import uuid

class Account:
    def __init__(self, account_number, customer_id, account_type, initial_balance=0):
        self.account_number = account_number
        self.customer_id = customer_id
        self.account_type = account_type  # 'checking', 'savings', 'business'
        self.balance = Decimal(str(initial_balance))
        self.created_date = datetime.now()
        self.is_active = True
        self.is_frozen = False
        self.daily_limit = Decimal('1000.00')
        self.daily_withdrawn = Decimal('0.00')
        self.last_transaction_date = None
        self.transaction_count = 0
        
    def deposit(self, amount, transaction_id=None):
        """Deposit money into account"""
        if not self.is_active or amount <= 0:
            return False
        
        amount = Decimal(str(amount))
        self.balance += amount
        self.last_transaction_date = datetime.now()
        self.transaction_count += 1
        return True
    
    def withdraw(self, amount, transaction_id=None):
        """Withdraw money from account"""
        if not self.is_active or self.is_frozen or amount <= 0:
            return False
        
        amount = Decimal(str(amount))
        
        # Check sufficient balance
        if self.balance < amount:
            return False
        
        # Check daily limit
        if self.daily_withdrawn + amount > self.daily_limit:
            return False
        
        self.balance -= amount
        self.daily_withdrawn += amount
        self.last_transaction_date = datetime.now()
        self.transaction_count += 1
        return True`,
          },
          {
            title: "Transaction Class",
            language: "python",
            code: `class Transaction:
    def __init__(self, from_account, to_account, amount, transaction_type):
        self.transaction_id = str(uuid.uuid4())
        self.from_account = from_account
        self.to_account = to_account
        self.amount = Decimal(str(amount))
        self.transaction_type = transaction_type  # 'transfer', 'deposit', 'withdrawal'
        self.status = 'pending'
        self.created_at = datetime.now()
        self.processed_at = None
        self.description = ""
        self.fee = Decimal('0.00')
        self.validation_errors = []
    
    def validate(self):
        """Validate transaction before processing"""
        self.validation_errors = []
        
        # Check amount validity
        if self.amount <= 0:
            self.validation_errors.append("Amount must be positive")
        
        # Check account validity
        if self.from_account and not self.from_account.is_active:
            self.validation_errors.append("Source account is inactive")
        
        if self.to_account and not self.to_account.is_active:
            self.validation_errors.append("Destination account is inactive")
        
        # Check sufficient funds for withdrawals/transfers
        if self.transaction_type in ['withdrawal', 'transfer']:
            if self.from_account.balance < self.amount:
                self.validation_errors.append("Insufficient funds")
        
        return len(self.validation_errors) == 0`,
          },
        ],
      },
      dsa: {
        title: "Data Structures Implementation",
        icon: "fas fa-sitemap",
        codeBlocks: [
          {
            title: "Queue for Pending Transactions",
            language: "python",
            code: `from collections import deque
import threading
import time

class TransactionQueue:
    def __init__(self, max_size=10000):
        self.queue = deque(maxlen=max_size)
        self.processing_queue = deque()
        self.completed_transactions = []
        self.failed_transactions = []
        self.lock = threading.Lock()
        self.is_processing = False
    
    def enqueue_transaction(self, transaction):
        """Add transaction to processing queue"""
        with self.lock:
            if len(self.queue) < self.queue.maxlen:
                self.queue.append(transaction)
                transaction.status = 'queued'
                return True
            return False  # Queue is full
    
    def dequeue_transaction(self):
        """Get next transaction for processing"""
        with self.lock:
            if self.queue:
                transaction = self.queue.popleft()
                self.processing_queue.append(transaction)
                transaction.status = 'processing'
                return transaction
        return None
    
    def complete_transaction(self, transaction, success=True):
        """Mark transaction as completed or failed"""
        with self.lock:
            if transaction in self.processing_queue:
                self.processing_queue.remove(transaction)
                
                if success:
                    transaction.status = 'completed'
                    transaction.processed_at = datetime.now()
                    self.completed_transactions.append(transaction)
                else:
                    transaction.status = 'failed'
                    self.failed_transactions.append(transaction)
                
                return True
        return False`,
          },
        ],
      },
      algo: {
        title: "Core Algorithms",
        icon: "fas fa-cogs",
        codeBlocks: [
          {
            title: "Transaction Validation Algorithm",
            language: "python",
            code: `def validate_transaction_comprehensive(transaction, fraud_detection=True):
    """
    Comprehensive transaction validation with fraud detection
    Time Complexity: O(1) for basic validation, O(log n) with fraud detection
    """
    validation_result = {
        'is_valid': True,
        'errors': [],
        'warnings': [],
        'risk_score': 0
    }
    
    # Basic validation
    if transaction.amount <= 0:
        validation_result['errors'].append("Amount must be positive")
        validation_result['is_valid'] = False
    
    if transaction.amount > Decimal('10000'):
        validation_result['warnings'].append("Large transaction amount")
        validation_result['risk_score'] += 2
    
    # Account validation
    if transaction.from_account:
        if not transaction.from_account.is_active:
            validation_result['errors'].append("Source account is inactive")
            validation_result['is_valid'] = False
        
        if transaction.from_account.is_frozen:
            validation_result['errors'].append("Source account is frozen")
            validation_result['is_valid'] = False
        
        if transaction.from_account.balance < transaction.amount:
            validation_result['errors'].append("Insufficient funds")
            validation_result['is_valid'] = False
    
    # Fraud detection
    if fraud_detection:
        fraud_score = detect_fraudulent_transaction(transaction)
        validation_result['risk_score'] += fraud_score
        
        if fraud_score > 5:
            validation_result['warnings'].append("High fraud risk detected")
        
        if fraud_score > 8:
            validation_result['errors'].append("Transaction blocked due to fraud risk")
            validation_result['is_valid'] = False
    
    return validation_result`,
          },
        ],
      },
    },
  },
  {
    id: "project6",
    title: "Online Quiz/Exam Platform",
    description: "Interactive quiz system with question management and scoring algorithms",
    icon: "fas fa-clipboard-list",
    sections: {
      oop: {
        title: "Object-Oriented Programming Classes",
        icon: "fas fa-cube",
        codeBlocks: [
          {
            title: "Question Class",
            language: "python",
            code: `class Question:
    def __init__(self, question_id, text, question_type, difficulty_level):
        self.question_id = question_id
        self.text = text
        self.question_type = question_type  # 'multiple_choice', 'true_false', 'short_answer'
        self.difficulty_level = difficulty_level  # 1-5 (1=easy, 5=hard)
        self.options = []  # For multiple choice questions
        self.correct_answer = None
        self.explanation = ""
        self.points = 1
        self.category = ""
        self.tags = []
        self.created_at = datetime.now()
        self.usage_count = 0
        self.success_rate = 0.0
    
    def add_option(self, option_text, is_correct=False):
        """Add option for multiple choice questions"""
        option = {
            'text': option_text,
            'is_correct': is_correct,
            'option_id': len(self.options)
        }
        self.options.append(option)
        
        if is_correct:
            self.correct_answer = option['option_id']
    
    def check_answer(self, user_answer):
        """Check if user answer is correct"""
        if self.question_type == 'multiple_choice':
            return user_answer == self.correct_answer
        elif self.question_type == 'true_false':
            return user_answer == self.correct_answer
        elif self.question_type == 'short_answer':
            return self.check_short_answer(user_answer)
        return False`,
          },
          {
            title: "Quiz Class",
            language: "python",
            code: `class Quiz:
    def __init__(self, quiz_id, title, description, creator_id):
        self.quiz_id = quiz_id
        self.title = title
        self.description = description
        self.creator_id = creator_id
        self.questions = QuestionLinkedList()
        self.time_limit = None  # in minutes
        self.max_attempts = 1
        self.passing_score = 70  # percentage
        self.shuffle_questions = False
        self.shuffle_options = False
        self.is_published = False
        self.created_at = datetime.now()
        self.last_modified = datetime.now()
        self.total_points = 0
        self.category = ""
        self.difficulty_level = "medium"
    
    def add_question(self, question):
        """Add question to quiz"""
        self.questions.append(question)
        self.total_points += question.points * question.get_difficulty_multiplier()
        self.last_modified = datetime.now()
    
    def calculate_score(self, user_answers):
        """Calculate quiz score based on user answers"""
        total_points = 0
        earned_points = 0
        correct_count = 0
        total_count = 0
        
        questions = self.questions.to_list()
        
        for i, question in enumerate(questions):
            total_count += 1
            question_points = question.points * question.get_difficulty_multiplier()
            total_points += question_points
            
            if i < len(user_answers):
                user_answer = user_answers[i]
                if question.check_answer(user_answer):
                    earned_points += question_points
                    correct_count += 1
        
        percentage = (earned_points / total_points * 100) if total_points > 0 else 0
        
        return {
            'earned_points': earned_points,
            'total_points': total_points,
            'percentage': percentage,
            'correct_count': correct_count,
            'total_count': total_count,
            'passed': percentage >= self.passing_score
        }`,
          },
        ],
      },
      dsa: {
        title: "Data Structures Implementation",
        icon: "fas fa-sitemap",
        codeBlocks: [
          {
            title: "Linked List for Question Sequence",
            language: "python",
            code: `class QuestionNode:
    def __init__(self, question):
        self.question = question
        self.next = None
        self.prev = None

class QuestionLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
        self.current_position = 0
    
    def append(self, question):
        """Add question to end of list"""
        new_node = QuestionNode(question)
        
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        
        self.size += 1
    
    def get_question_at_position(self, position):
        """Get question at specific position"""
        if position < 0 or position >= self.size:
            return None
        
        current = self.head
        for _ in range(position):
            current = current.next
        
        return current.question
    
    def to_list(self):
        """Convert linked list to Python list"""
        result = []
        current = self.head
        
        while current:
            result.append(current.question)
            current = current.next
        
        return result`,
          },
        ],
      },
      algo: {
        title: "Core Algorithms",
        icon: "fas fa-cogs",
        codeBlocks: [
          {
            title: "Score Computation Algorithm",
            language: "python",
            code: `def calculate_weighted_score(answers, questions, scoring_method='standard'):
    """
    Calculate quiz score using various scoring methods
    Time Complexity: O(n) where n is number of questions
    """
    if scoring_method == 'standard':
        return calculate_standard_score(answers, questions)
    elif scoring_method == 'weighted_difficulty':
        return calculate_difficulty_weighted_score(answers, questions)
    elif scoring_method == 'negative_marking':
        return calculate_negative_marking_score(answers, questions)

def calculate_standard_score(answers, questions):
    """Standard scoring: 1 point per correct answer"""
    correct_count = 0
    total_count = len(questions)
    
    for i, question in enumerate(questions):
        if i < len(answers) and answers[i] is not None:
            if question.check_answer(answers[i]):
                correct_count += 1
    
    percentage = (correct_count / total_count * 100) if total_count > 0 else 0
    
    return {
        'correct_count': correct_count,
        'total_count': total_count,
        'percentage': percentage,
        'total_points': correct_count,
        'max_points': total_count,
        'scoring_method': 'standard'
    }

def calculate_difficulty_weighted_score(answers, questions):
    """Difficulty-weighted scoring: harder questions worth more points"""
    earned_points = 0
    max_points = 0
    correct_count = 0
    
    for i, question in enumerate(questions):
        question_points = question.points * question.get_difficulty_multiplier()
        max_points += question_points
        
        if i < len(answers) and answers[i] is not None:
            if question.check_answer(answers[i]):
                earned_points += question_points
                correct_count += 1
    
    percentage = (earned_points / max_points * 100) if max_points > 0 else 0
    
    return {
        'correct_count': correct_count,
        'total_count': len(questions),
        'percentage': percentage,
        'total_points': earned_points,
        'max_points': max_points,
        'scoring_method': 'weighted_difficulty'
    }`,
          },
        ],
      },
    },
  },
]

const statsData = {
  systems: 6,
  classes: "18+",
  dataStructures: "12+",
  algorithms: "15+",
}
