// Application State
const AppState = {
    showAdditionalInfo: false,
    autoExpand: false,
    currentTheme: 'dark',
    lineNumbers: true
};

// Code Data Structure
const codeData = {
    question: {
        title: 'Question Class',
        icon: 'fas fa-question-circle',
        description: 'Foundation class for individual questions with multiple types and difficulty levels',
        code: `class Question:
def __init__(self, question_id, text, question_type, difficulty_level):
self.question_id = question_id
self.text = text
self.question_type = question_type  # 'multiple_choice', 'true_false', 'short_answer'
self.difficulty_level = difficulty_level  # 1-5 (1=easy, 5=hard)
self.options = []
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
return False

def update_statistics(self, was_correct):
"""Update question usage statistics"""
self.usage_count += 1

if self.usage_count == 1:
self.success_rate = 1.0 if was_correct else 0.0
else:
weight = 0.1
self.success_rate = (1 - weight) * self.success_rate + weight * (1.0 if was_correct else 0.0)`,
        features: [{
            icon: 'fas fa-list',
            title: 'Multiple Question Types',
            desc: 'Support for multiple choice, true/false, and short answer'
        }, {
            icon: 'fas fa-signal',
            title: 'Difficulty Levels',
            desc: '5-level difficulty system with point multipliers'
        }, {
            icon: 'fas fa-chart-line',
            title: 'Statistics Tracking',
            desc: 'Usage count and success rate monitoring'
        }, {
            icon: 'fas fa-search',
            title: 'Smart Answer Checking',
            desc: 'Text similarity for flexible short answers'
        }],
        complexity: ['add_option(): O(1)', 'check_answer(): O(1) for MC, O(n) for short answer', 'update_statistics(): O(1)'],
        usage: `# Create a multiple choice question
question = Question(1, "What is Python?", "multiple_choice", 2)
question.add_option("A snake", False)
question.add_option("A programming language", True)
question.add_option("A movie", False)

# Check user answer
is_correct = question.check_answer(1)  # True
question.update_statistics(True)
print(f"Success rate: {question.success_rate}")`
    },
    quiz: {
        title: 'Quiz Class',
        icon: 'fas fa-clipboard-list',
        description: 'Manages collections of questions with comprehensive quiz functionality',
        code: `class Quiz:
def __init__(self, quiz_id, title, description, creator_id):
self.quiz_id = quiz_id
self.title = title
self.description = description
self.creator_id = creator_id
self.questions = QuestionLinkedList()
self.time_limit = None
self.max_attempts = 1
self.passing_score = 70
self.shuffle_questions = False
self.shuffle_options = False
self.is_published = False
self.created_at = datetime.now()
self.total_points = 0

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

questions = self.questions.to_list()

for i, question in enumerate(questions):
question_points = question.points * question.get_difficulty_multiplier()
total_points += question_points

if i < len(user_answers) and question.check_answer(user_answers[i]):
earned_points += question_points
correct_count += 1

percentage = (earned_points / total_points * 100) if total_points > 0 else 0

return {
'earned_points': earned_points,
'total_points': total_points,
'percentage': percentage,
'correct_count': correct_count,
'passed': percentage >= self.passing_score
}`,
        features: [{
            icon: 'fas fa-cogs',
            title: 'Quiz Configuration',
            desc: 'Time limits, attempts, passing scores, shuffling'
        }, {
            icon: 'fas fa-calculator',
            title: 'Advanced Scoring',
            desc: 'Multiple scoring methods with difficulty multipliers'
        }, {
            icon: 'fas fa-certificate',
            title: 'Certification',
            desc: 'Automatic certificate generation for passed quizzes'
        }, {
            icon: 'fas fa-eye',
            title: 'Publishing Control',
            desc: 'Quiz validation and access control'
        }],
        complexity: ['add_question(): O(1)', 'calculate_score(): O(n)', 'publish(): O(1)'],
        usage: `# Create and configure quiz
quiz = Quiz(1, "Python Basics", "Test your knowledge", "teacher_123")
quiz.time_limit = 30  # minutes
quiz.passing_score = 75

# Add questions
quiz.add_question(question1)
quiz.add_question(question2)

# Calculate score
user_answers = [1, True, "Python"]
score = quiz.calculate_score(user_answers)
print(f"Score: {score['percentage']:.1f}%")`
    },
    result: {
        title: 'Quiz Result Class',
        icon: 'fas fa-chart-bar',
        description: 'Tracks quiz attempts with timing, cheating detection, and detailed analysis',
        code: `class QuizResult:
def __init__(self, result_id, user_id, quiz_id, attempt_number):
self.result_id = result_id
self.user_id = user_id
self.quiz_id = quiz_id
self.attempt_number = attempt_number
self.start_time = datetime.now()
self.end_time = None
self.user_answers = []
self.score_data = None
self.time_taken = None
self.is_completed = False
self.cheating_flags = []

def record_answer(self, question_index, answer, time_spent):
"""Record user answer for a question"""
answer_data = {
'question_index': question_index,
'answer': answer,
'time_spent': time_spent,
'timestamp': datetime.now()
}

while len(self.user_answers) <= question_index:
self.user_answers.append(None)

self.user_answers[question_index] = answer_data

def complete_quiz(self, quiz):
"""Complete quiz and calculate final score"""
self.end_time = datetime.now()
self.time_taken = (self.end_time - self.start_time).total_seconds()

answers_only = [data['answer'] if data else None for data in self.user_answers]
self.score_data = quiz.calculate_score(answers_only)
self.is_completed = True

self.detect_cheating_patterns(quiz)
return self.score_data

def detect_cheating_patterns(self, quiz):
"""Detect potential cheating based on patterns"""
questions = quiz.questions.to_list()
min_expected_time = len(questions) * 30

if self.time_taken < min_expected_time:
self.cheating_flags.append("Completed too quickly")`,
        features: [{
            icon: 'fas fa-stopwatch',
            title: 'Time Tracking',
            desc: 'Precise timing for quiz and individual questions'
        }, {
            icon: 'fas fa-shield-alt',
            title: 'Cheating Detection',
            desc: 'Pattern analysis for suspicious behavior'
        }, {
            icon: 'fas fa-list-alt',
            title: 'Detailed Results',
            desc: 'Question-by-question breakdown with explanations'
        }, {
            icon: 'fas fa-database',
            title: 'Session Management',
            desc: 'IP tracking and user agent information'
        }],
        complexity: ['record_answer(): O(1)', 'complete_quiz(): O(n)', 'detect_cheating(): O(n)'],
        usage: `# Track quiz attempt
result = QuizResult("r001", "user123", "quiz456", 1)

# Record answers as user progresses
result.record_answer(0, 1, 45)  # Question 0, answer 1, 45 seconds
result.record_answer(1, True, 30)

# Complete and analyze
final_score = result.complete_quiz(quiz)
if result.cheating_flags:
print("Potential cheating detected:", result.cheating_flags)`
    },
    linkedlist: {
        title: 'Question Linked List',
        icon: 'fas fa-link',
        description: 'Doubly-linked list for efficient question ordering and management',
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

def append(self, question):
"""Add question to end - O(1)"""
new_node = QuestionNode(question)

if not self.head:
self.head = self.tail = new_node
else:
new_node.prev = self.tail
self.tail.next = new_node
self.tail = new_node

self.size += 1

def insert_at_position(self, position, question):
"""Insert at specific position - O(n)"""
if position <= 0:
self.prepend(question)
return

if position >= self.size:
self.append(question)
return

new_node = QuestionNode(question)
current = self.head

for _ in range(position):
current = current.next

new_node.next = current
new_node.prev = current.prev
current.prev.next = new_node
current.prev = new_node

self.size += 1

def remove_by_id(self, question_id):
"""Remove question by ID - O(n)"""
current = self.head

while current:
if current.question.question_id == question_id:
if current.prev:
current.prev.next = current.next
else:
self.head = current.next

if current.next:
current.next.prev = current.prev
else:
self.tail = current.prev

self.size -= 1
return current.question

current = current.next
return None`,
        features: [{
            icon: 'fas fa-arrows-alt-h',
            title: 'Bidirectional Traversal',
            desc: 'Forward and backward navigation through questions'
        }, {
            icon: 'fas fa-sort',
            title: 'Position Operations',
            desc: 'Insert, move, and reorder questions efficiently'
        }, {
            icon: 'fas fa-random',
            title: 'Shuffling Support',
            desc: 'Built-in question randomization capabilities'
        }, {
            icon: 'fas fa-trash',
            title: 'Dynamic Management',
            desc: 'Add, remove, and modify questions on-the-fly'
        }],
        complexity: ['append(): O(1)', 'insert_at_position(): O(n)', 'remove_by_id(): O(n)', 'shuffle(): O(n)'],
        usage: `# Create question list
question_list = QuestionLinkedList()

# Add questions
question_list.append(question1)
question_list.append(question2)
question_list.insert_at_position(1, question3)

# Reorder questions
question_list.move_question(0, 2)

# Convert to regular list
questions = question_list.to_list()`
    },
    hashmap: {
        title: 'User Score HashMap',
        icon: 'fas fa-hashtag',
        description: 'Custom hash map for efficient score storage and retrieval with dynamic resizing',
        code: `class UserScoreHashMap:
def __init__(self, initial_capacity=64):
self.capacity = initial_capacity
self.size = 0
self.buckets = [[] for _ in range(self.capacity)]
self.load_factor_threshold = 0.75

def _hash(self, key):
"""Hash function - O(1)"""
return hash(key) % self.capacity

def _make_key(self, user_id, quiz_id):
"""Create composite key"""
return f"{user_id}_{quiz_id}"

def store_score(self, user_id, quiz_id, score_data):
"""Store user score - O(1) average"""
key = self._make_key(user_id, quiz_id)

if self.size >= self.capacity * self.load_factor_threshold:
self._resize()

index = self._hash(key)
bucket = self.buckets[index]

# Check if score exists (update)
for i, (stored_key, value) in enumerate(bucket):
if stored_key == key:
bucket[i] = (key, score_data)
return

# Add new score
bucket.append((key, score_data))
self.size += 1

def get_score(self, user_id, quiz_id):
"""Get user score - O(1) average"""
key = self._make_key(user_id, quiz_id)
index = self._hash(key)
bucket = self.buckets[index]

for stored_key, value in bucket:
if stored_key == key:
return value
return None

def get_top_scores(self, quiz_id, limit=10):
"""Get top scores for quiz - O(n log n)"""
quiz_scores = self.get_quiz_scores(quiz_id)
sorted_scores = sorted(quiz_scores,
key=lambda x: x['score_data']['percentage'],
reverse=True)
return sorted_scores[:limit]`,
        features: [{
            icon: 'fas fa-key',
            title: 'Composite Keys',
            desc: 'User-quiz combination keys for unique identification'
        }, {
            icon: 'fas fa-expand-arrows-alt',
            title: 'Dynamic Resizing',
            desc: 'Automatic capacity expansion with load factor management'
        }, {
            icon: 'fas fa-chart-line',
            title: 'Statistical Analysis',
            desc: 'User performance aggregation and leaderboards'
        }, {
            icon: 'fas fa-tachometer-alt',
            title: 'Fast Retrieval',
            desc: 'O(1) average time complexity for operations'
        }],
        complexity: ['store_score(): O(1) avg', 'get_score(): O(1) avg', 'resize(): O(n)', 'get_top_scores(): O(n log n)'],
        usage: `# Create score storage
score_map = UserScoreHashMap()

# Store scores
score_data = {'percentage': 85.5, 'points': 17, 'passed': True}
score_map.store_score("user123", "quiz001", score_data)

# Retrieve score
user_score = score_map.get_score("user123", "quiz001")

# Get leaderboard
top_scores = score_map.get_top_scores("quiz001", 10)`
    },
    queue: {
        title: 'Exam Flow Queue',
        icon: 'fas fa-layer-group',
        description: 'Queue-based system for managing concurrent exam sessions with capacity control',
        code: `class ExamFlowQueue:
def __init__(self):
self.waiting_queue = deque()
self.active_exams = {}
self.completed_exams = []
self.exam_sessions = {}
self.max_concurrent_exams = 100

def enqueue_user(self, user_id, quiz_id, priority=0):
"""Add user to waiting queue - O(1)"""
exam_request = {
'user_id': user_id,
'quiz_id': quiz_id,
'priority': priority,
'enqueue_time': datetime.now(),
'estimated_start_time': self.calculate_estimated_start_time()
}

self.waiting_queue.append(exam_request)
return exam_request

def start_next_exam(self):
"""Start exam for next user - O(1)"""
if (len(self.active_exams) >= self.max_concurrent_exams or
not self.waiting_queue):
return None

exam_request = self.waiting_queue.popleft()
session_id = self.create_exam_session(exam_request)

if session_id:
self.active_exams[session_id] = {
'user_id': exam_request['user_id'],
'quiz_id': exam_request['quiz_id'],
'start_time': datetime.now(),
'current_question': 0,
'answers': []
}

return session_id
return None

def get_queue_status(self):
"""Get current queue status - O(1)"""
return {
'waiting_count': len(self.waiting_queue),
'active_exams': len(self.active_exams),
'capacity_utilization': len(self.active_exams) / self.max_concurrent_exams
}`,
        features: [{
            icon: 'fas fa-users',
            title: 'Concurrent Management',
            desc: 'Handle multiple simultaneous exam sessions'
        }, {
            icon: 'fas fa-clock',
            title: 'Session Tracking',
            desc: 'Comprehensive lifecycle management with expiration'
        }, {
            icon: 'fas fa-chart-pie',
            title: 'Queue Analytics',
            desc: 'Real-time status monitoring and metrics'
        }, {
            icon: 'fas fa-hourglass-half',
            title: 'Wait Time Estimation',
            desc: 'Intelligent queue time calculations'
        }],
        complexity: ['enqueue_user(): O(1)', 'start_next_exam(): O(1)', 'complete_exam(): O(1)', 'get_status(): O(1)'],
        usage: `# Create exam queue manager
exam_queue = ExamFlowQueue()

# Add users to queue
request = exam_queue.enqueue_user("user123", "quiz001")
print(f"Estimated start: {request['estimated_start_time']}")

# Start exam
session_id = exam_queue.start_next_exam()

# Submit answers
exam_queue.submit_answer(session_id, 0, "A")

# Complete exam
exam_queue.complete_exam(session_id, final_score)`
    },
    algorithms: {
        title: 'Scoring Algorithms',
        icon: 'fas fa-calculator',
        description: 'Multiple sophisticated scoring methods for different assessment needs',
        code: `def calculate_weighted_score(answers, questions, scoring_method='standard'):
"""Calculate score using various methods - O(n)"""
if scoring_method == 'standard':
return calculate_standard_score(answers, questions)
elif scoring_method == 'weighted_difficulty':
return calculate_difficulty_weighted_score(answers, questions)
elif scoring_method == 'negative_marking':
return calculate_negative_marking_score(answers, questions)
elif scoring_method == 'adaptive':
return calculate_adaptive_score(answers, questions)

def calculate_standard_score(answers, questions):
"""Standard: 1 point per correct answer"""
correct_count = 0
total_count = len(questions)

for i, question in enumerate(questions):
if i < len(answers) and answers[i] is not None:
if question.check_answer(answers[i]):
correct_count += 1

percentage = (correct_count / total_count * 100) if total_count > 0 else 0
return {
'correct_count': correct_count,
'percentage': percentage,
'scoring_method': 'standard'
}

def calculate_negative_marking_score(answers, questions, penalty_factor=0.25):
"""Negative marking: deduct points for wrong answers"""
earned_points = 0
max_points = 0

for i, question in enumerate(questions):
question_points = question.points * question.get_difficulty_multiplier()
max_points += question_points

if i < len(answers) and answers[i] is not None:
if question.check_answer(answers[i]):
earned_points += question_points
else:
earned_points -= question_points * penalty_factor

earned_points = max(0, earned_points)
percentage = (earned_points / max_points * 100) if max_points > 0 else 0

return {
'total_points': earned_points,
'percentage': percentage,
'scoring_method': 'negative_marking'
}`,
        features: [{
            icon: 'fas fa-equals',
            title: 'Standard Scoring',
            desc: '1 point per correct answer for simple assessments'
        }, {
            icon: 'fas fa-weight-hanging',
            title: 'Weighted Difficulty',
            desc: 'Points multiplied by question difficulty level'
        }, {
            icon: 'fas fa-minus-circle',
            title: 'Negative Marking',
            desc: 'Penalty deduction for incorrect answers'
        }, {
            icon: 'fas fa-brain',
            title: 'Adaptive Scoring',
            desc: 'Dynamic scoring based on question performance history'
        }],
        complexity: ['All methods: O(n) where n = number of questions', 'Standard: Simple iteration', 'Weighted: With difficulty calculations', 'Adaptive: With statistical analysis'],
        usage: `# Test different scoring methods
questions = [q1, q2, q3]  # Sample questions
user_answers = [0, 1, 2]  # User responses

# Standard scoring
standard = calculate_weighted_score(user_answers, questions, 'standard')
print(f"Standard: {standard['percentage']:.1f}%")

# Negative marking
negative = calculate_weighted_score(user_answers, questions, 'negative_marking')
print(f"With penalties: {negative['percentage']:.1f}%")

# Adaptive scoring
adaptive = calculate_weighted_score(user_answers, questions, 'adaptive')
print(f"Adaptive: {adaptive['percentage']:.1f}%")`
    },
    generation: {
        title: 'Question Generation',
        icon: 'fas fa-random',
        description: 'Advanced algorithms for creating personalized quizzes based on difficulty and performance',
        code: `def generate_random_quiz(question_pool, num_questions, difficulty_distribution=None):
"""Generate random quiz with difficulty distribution - O(n log n)"""
if difficulty_distribution is None:
difficulty_distribution = {1: 0.1, 2: 0.2, 3: 0.4, 4: 0.2, 5: 0.1}

# Group questions by difficulty
questions_by_difficulty = {}
for question in question_pool:
difficulty = question.difficulty_level
if difficulty not in questions_by_difficulty:
questions_by_difficulty[difficulty] = []
questions_by_difficulty[difficulty].append(question)

selected_questions = []

for difficulty, proportion in difficulty_distribution.items():
if difficulty in questions_by_difficulty:
questions_needed = int(num_questions * proportion)
available_questions = questions_by_difficulty[difficulty]

if len(available_questions) >= questions_needed:
selected = random.sample(available_questions, questions_needed)
else:
selected = available_questions.copy()

selected_questions.extend(selected)

random.shuffle(selected_questions)
return selected_questions[:num_questions]

def generate_adaptive_quiz(question_pool, user_performance_history, target_difficulty=3):
"""Generate personalized quiz based on performance - O(n)"""
user_weak_topics = analyze_user_weaknesses(user_performance_history)
user_avg_performance = calculate_average_performance(user_performance_history)

# Adjust target difficulty
if user_avg_performance > 80:
target_difficulty = min(5, target_difficulty + 1)
elif user_avg_performance < 60:
target_difficulty = max(1, target_difficulty - 1)

# Score questions based on relevance
scored_questions = []

for question in question_pool:
score = 0

# Prefer weak topics
if question.category in user_weak_topics:
score += 3

# Prefer target difficulty
difficulty_diff = abs(question.difficulty_level - target_difficulty)
score += (5 - difficulty_diff)

# Prefer unseen questions
if not recently_answered(question, user_performance_history):
score += 2

scored_questions.append((question, score))

# Select top-scored questions
scored_questions.sort(key=lambda x: x[1], reverse=True)
top_half = scored_questions[:len(scored_questions)//2]
selected = [q[0] for q in random.sample(top_half, min(20, len(top_half)))]

return selected`,
        features: [{
            icon: 'fas fa-dice',
            title: 'Random Generation',
            desc: 'Stratified sampling by difficulty with balanced selection'
        }, {
            icon: 'fas fa-user-cog',
            title: 'Adaptive Generation',
            desc: 'Performance-based question selection and difficulty adjustment'
        }, {
            icon: 'fas fa-chart-area',
            title: 'Weakness Analysis',
            desc: 'Identify user weak topics for targeted practice'
        }, {
            icon: 'fas fa-shuffle',
            title: 'Option Shuffling',
            desc: 'Randomize multiple choice options to prevent memorization'
        }],
        complexity: ['generate_random_quiz(): O(n log n)', 'generate_adaptive_quiz(): O(n)', 'analyze_weaknesses(): O(m) where m = history size', 'shuffle_options(): O(n × k) where k = avg options'],
        usage: `# Random quiz generation
difficulty_dist = {1: 0.2, 2: 0.3, 3: 0.3, 4: 0.15, 5: 0.05}
random_quiz = generate_random_quiz(question_pool, 20, difficulty_dist)

# Adaptive quiz based on user history
user_history = [
{'percentage': 65, 'question_results': [...]},
{'percentage': 78, 'question_results': [...]}
]
adaptive_quiz = generate_adaptive_quiz(question_pool, user_history)

# Analyze user performance
weak_topics = analyze_user_weaknesses(user_history)
print(f"Focus on: {weak_topics}")

# Shuffle question options
shuffled_quiz = shuffle_question_options(adaptive_quiz)`
    }
};

// DOM Manipulation Functions
function createSection(key, data) {
    const section = document.createElement('div');
    section.className = 'section';
    section.id = key;

    section.innerHTML = `
<div class="section-header" onclick="toggleSection('${key}')">
<div class="section-title">
<i class="${data.icon}"></i>
${data.title}
</div>
<button class="expand-btn" id="expand-${key}">
<i class="fas fa-chevron-down"></i>
</button>
</div>

<div class="code-container">
<div class="code-header">
<span class="code-title">
<i class="fas fa-code"></i>
${data.title} Implementation
</span>
<button class="copy-btn" onclick="copyCode('${key}-code', event)">
<i class="fas fa-copy"></i> Copy Code
</button>
</div>
<pre><code id="${key}-code" class="language-python">${data.code}</code></pre>
</div>

<div class="additional-info" id="info-${key}">
<div class="info-tabs">
<div class="info-tab active" onclick="switchInfoTab('${key}', 'features')">
<i class="fas fa-star"></i> Features
</div>
<div class="info-tab" onclick="switchInfoTab('${key}', 'complexity')">
<i class="fas fa-clock"></i> Complexity
</div>
<div class="info-tab" onclick="switchInfoTab('${key}', 'usage')">
<i class="fas fa-play"></i> Usage
</div>
</div>

<div class="info-content active" id="${key}-features">
<div class="feature-grid">
${data.features.map(feature => `
<div class="feature-card">
<h4><i class="${feature.icon}"></i> ${feature.title}</h4>
<p>${feature.desc}</p>
</div>
`).join('')}
</div>
</div>

<div class="info-content" id="${key}-complexity">
<h4><i class="fas fa-tachometer-alt"></i> Time Complexity Analysis</h4>
<div style="margin-top: 1rem;">
${data.complexity.map(item => `<div class="complexity-badge">${item}</div>`).join('')}
</div>
</div>

<div class="info-content" id="${key}-usage">
<h4><i class="fas fa-code"></i> Usage Example</h4>
<div class="code-container" style="margin-top: 1rem;">
<div class="code-header">
<span class="code-title">
<i class="fas fa-terminal"></i>
Example Usage
</span>
<button class="copy-btn" onclick="copyCode('${key}-usage-code', event)">
<i class="fas fa-copy"></i> Copy
</button>
</div>
<pre><code id="${key}-usage-code" class="language-python">${data.usage}</code></pre>
</div>
</div>
</div>
`;

    return section;
}

function renderContent() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = '';

    Object.keys(codeData).forEach(key => {
        const section = createSection(key, codeData[key]);
        contentArea.appendChild(section);
    });

    // Apply current settings
    updateAdditionalInfoVisibility();
    if (AppState.autoExpand) {
        Object.keys(codeData).forEach(key => expandSection(key));
    }

    // Re-highlight code
    setTimeout(() => Prism.highlightAll(), 100);
}

// Settings Functions
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    const overlay = document.getElementById('overlay');

    panel.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeSettings() {
    document.getElementById('settings-panel').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
}

function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    AppState.currentTheme = theme;

    // Update active theme option
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');

    // Update Prism theme
    const prismTheme = document.getElementById('prism-theme');
    if (theme === 'light') {
        prismTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
    } else {
        prismTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    }
}

function toggleAdditionalInfo() {
    AppState.showAdditionalInfo = document.getElementById('show-info-toggle').checked;
    updateAdditionalInfoVisibility();
}

function updateAdditionalInfoVisibility() {
    const infoElements = document.querySelectorAll('.additional-info');
    infoElements.forEach(element => {
        if (AppState.showAdditionalInfo) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
}

function toggleAutoExpand() {
    AppState.autoExpand = document.getElementById('auto-expand-toggle').checked;

    if (AppState.autoExpand) {
        Object.keys(codeData).forEach(key => expandSection(key));
    } else {
        Object.keys(codeData).forEach(key => collapseSection(key));
    }
}

function toggleLineNumbers() {
    AppState.lineNumbers = document.getElementById('line-numbers-toggle').checked;
    // Implementation for line numbers would go here
}

// Section Management
function toggleSection(key) {
    const infoElement = document.getElementById(`info-${key}`);
    const expandBtn = document.getElementById(`expand-${key}`);

    if (infoElement.classList.contains('show')) {
        collapseSection(key);
    } else {
        expandSection(key);
    }
}

function expandSection(key) {
    const infoElement = document.getElementById(`info-${key}`);
    const expandBtn = document.getElementById(`expand-${key}`);

    if (AppState.showAdditionalInfo) {
        infoElement.classList.add('show');
    }
    expandBtn.classList.add('expanded');
}

function collapseSection(key) {
    const infoElement = document.getElementById(`info-${key}`);
    const expandBtn = document.getElementById(`expand-${key}`);

    infoElement.classList.remove('show');
    expandBtn.classList.remove('expanded');
}

function switchInfoTab(sectionKey, tabName) {
    // Update tab buttons
    const tabContainer = document.querySelector(`#info-${sectionKey} .info-tabs`);
    tabContainer.querySelectorAll('.info-tab').forEach(tab => tab.classList.remove('active'));
    event.target.closest('.info-tab').classList.add('active');

    // Update content
    const contentContainer = document.getElementById(`info-${sectionKey}`);
    contentContainer.querySelectorAll('.info-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${sectionKey}-${tabName}`).classList.add('active');
}

// Utility Functions
function copyCode(elementId, event) {
    const codeElement = document.getElementById(elementId);
    const text = codeElement.textContent;

    navigator.clipboard.writeText(text).then(() => {
        showToast();

        if (event && event.target) {
            const button = event.target.closest('.copy-btn');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.classList.add('copied');

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copied');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Error copying code!', 'error');
    });
}

function showToast(message = 'Code copied to clipboard!', type = 'success') {
    const toast = document.getElementById('toast');
    const icon = type === 'success' ? 'fas fa-check' : 'fas fa-exclamation-triangle';
    const bgColor = type === 'success' ? 'var(--success-color)' : 'var(--error-color)';

    toast.innerHTML = `<i class="${icon}"></i> ${message}`;
    toast.style.background = bgColor;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    renderContent();

    // Theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            changeTheme(this.dataset.theme);
        });
    });

    // Close settings on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSettings();
        }
    });
});

// Initialize
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});