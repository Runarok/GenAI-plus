// ============ COMPLETE CONTENT DATA STRUCTURE ============
const contentData = [
  {
    id: "design-overview",
    title: "Software Design Overview",
    section: "Fundamentals",
    content: `
      <h3>What is Design?</h3>
      <p>Design involves creating a detailed plan of how a software system will be structured and how it will function. It bridges the gap between requirements and implementation.</p>
      <div class="definition-box"><strong>Definition:</strong> Software design is the process of creating an architecture and detailed design that meets the specified requirements, considering constraints such as performance, scalability, maintainability, and user experience.</div>
      
      <h3>Importance of Software Design</h3>
      <ul>
        <li><strong>Visibility:</strong> Makes the invisible visible - helps teams understand complex systems</li>
        <li><strong>Quality Assurance:</strong> Ensures adherence to quality standards from the beginning</li>
        <li><strong>Cost Reduction:</strong> Catching design flaws early reduces development and maintenance costs</li>
        <li><strong>Communication:</strong> Provides a common understanding among team members and stakeholders</li>
        <li><strong>Reusability:</strong> Well-designed components can be reused across projects</li>
      </ul>
      
      <h3>Levels of Design</h3>
      <ul>
        <li><strong>Architecture Design:</strong> High-level system structure and component organization</li>
        <li><strong>Detailed Design:</strong> Low-level design of individual components and modules</li>
      </ul>
      
      <h3>Goals of Software Design</h3>
      <ul>
        <li><strong>Correctness:</strong> Design must satisfy all functional and non-functional requirements</li>
        <li><strong>Completeness:</strong> Design should address all aspects of the system requirements</li>
        <li><strong>Feasibility:</strong> Design should be implementable within time and resource constraints</li>
        <li><strong>Consistency:</strong> Design elements should be consistent with each other and established standards</li>
        <li><strong>Clarity:</strong> Design documentation should be clear and understandable to all stakeholders</li>
        <li><strong>Efficiency:</strong> Design should optimize resource usage and system performance</li>
      </ul>
      
      <h3>Design Constraints and Considerations</h3>
      <ul>
        <li><strong>Performance Constraints:</strong> System must meet response time and throughput requirements</li>
        <li><strong>Security Constraints:</strong> Design must incorporate security measures to protect data and systems</li>
        <li><strong>Scalability Requirements:</strong> System should handle growth in data, users, and transactions</li>
        <li><strong>Availability Requirements:</strong> System must maintain uptime and reliability targets (e.g., 99.9%)</li>
        <li><strong>Compliance and Standards:</strong> Must adhere to industry standards and regulatory requirements</li>
        <li><strong>Technology Stack:</strong> Design must consider available technologies and team expertise</li>
      </ul>
      
      <h3>Design Concepts</h3>
      <ul>
        <li><strong>Coupling:</strong> Measure of how dependent components are on each other. Low coupling is desirable.</li>
        <li><strong>Cohesion:</strong> Measure of how closely related functions within a module are. High cohesion is desirable.</li>
        <li><strong>Information Hiding:</strong> Encapsulation of internal details to reduce dependencies</li>
        <li><strong>Abstraction:</strong> Simplification of complex systems by hiding unnecessary details</li>
        <li><strong>Modularity:</strong> Division of system into independent, self-contained modules</li>
        <li><strong>Hierarchy:</strong> Organization of components in a structured hierarchy (e.g., tree structure)</li>
      </ul>
      
      <h3>Design Documentation</h3>
      <p>Design documentation should include:</p>
      <ul>
        <li><strong>System Architecture Diagram:</strong> Overview of system components and their relationships</li>
        <li><strong>Component Diagrams:</strong> Details of individual components and their interfaces</li>
        <li><strong>Data Flow Diagrams:</strong> Flow of data through the system</li>
        <li><strong>Entity-Relationship Diagrams:</strong> Database schema and data relationships</li>
        <li><strong>Sequence Diagrams:</strong> Interactions between components over time</li>
        <li><strong>State Diagrams:</strong> State transitions in the system</li>
      </ul>
    `
  },
  {
    id: "design-process",
    title: "Software Design Process",
    section: "Fundamentals",
    content: `
      <h3>Design Process Steps</h3>
      <ul>
        <li><strong>Requirements Analysis:</strong> Understand and analyze functional and non-functional requirements</li>
        <li><strong>Architectural Design:</strong> Define the overall system structure and components</li>
        <li><strong>Detailed Design:</strong> Design individual modules and their interactions</li>
        <li><strong>Design Documentation:</strong> Create comprehensive design documentation</li>
        <li><strong>Design Review:</strong> Review design against requirements and standards</li>
        <li><strong>Design Validation:</strong> Ensure design can be implemented and meets requirements</li>
      </ul>
      
      <h3>Design Principles</h3>
      <ul>
        <li><strong>Modularity:</strong> Divide system into independent, manageable modules</li>
        <li><strong>Abstraction:</strong> Hide complexity and expose only necessary interfaces</li>
        <li><strong>Cohesion:</strong> Elements within a module should be closely related</li>
        <li><strong>Coupling:</strong> Minimize dependencies between modules</li>
        <li><strong>Separation of Concerns:</strong> Each module should have a single, well-defined responsibility</li>
      </ul>
      <div class="example-box"><strong>Key Principle:</strong> High cohesion and low coupling lead to maintainable and flexible designs.</div>
      
      <h3>Architectural Design vs Detailed Design</h3>
      <table class="comparison-table">
        <tr>
          <th>Aspect</th>
          <th>Architectural Design</th>
          <th>Detailed Design</th>
        </tr>
        <tr>
          <td>Focus</td>
          <td>System-level structure</td>
          <td>Component-level details</td>
        </tr>
        <tr>
          <td>Scope</td>
          <td>Overall system organization</td>
          <td>Individual modules/classes</td>
        </tr>
        <tr>
          <td>Participants</td>
          <td>Senior architects, domain experts</td>
          <td>Developers, technical leads</td>
        </tr>
        <tr>
          <td>Concerns</td>
          <td>System partitioning, interfaces, data flow</td>
          <td>Algorithms, data structures, control flow</td>
        </tr>
        <tr>
          <td>Documentation</td>
          <td>Architecture diagrams, component specs</td>
          <td>Class diagrams, method specifications</td>
        </tr>
      </table>
      
      <h3>Design Methodologies</h3>
      <ul>
        <li><strong>Top-Down Design:</strong> Start with overall system structure, decompose into smaller modules. Good for understanding system as a whole.</li>
        <li><strong>Bottom-Up Design:</strong> Start with individual modules, combine into larger systems. Good for reusing existing components.</li>
        <li><strong>Incremental Design:</strong> Design and implement features incrementally. Allows feedback and adjustments during development.</li>
        <li><strong>Model-Driven Design:</strong> Create models (UML) that guide implementation. Promotes consistency and documentation.</li>
      </ul>
      
      <h3>Design Patterns and Best Practices</h3>
      <ul>
        <li><strong>DRY (Don't Repeat Yourself):</strong> Avoid code duplication; extract common functionality into reusable modules</li>
        <li><strong>KISS (Keep It Simple, Stupid):</strong> Prefer simple designs over complex ones</li>
        <li><strong>YAGNI (You Aren't Gonna Need It):</strong> Don't add features that aren't currently needed</li>
        <li><strong>Design for Change:</strong> Anticipate future changes and design for flexibility</li>
        <li><strong>Error Handling:</strong> Design robust error handling and recovery mechanisms</li>
        <li><strong>Concurrency Control:</strong> Design for thread safety if system uses multithreading</li>
      </ul>
      
      <h3>Design Artifacts and Outputs</h3>
      <ul>
        <li><strong>Design Document:</strong> Comprehensive documentation of design decisions and rationale</li>
        <li><strong>Architecture Models:</strong> UML diagrams showing system structure and relationships</li>
        <li><strong>Data Models:</strong> Entity-relationship diagrams and database schema</li>
        <li><strong>Interface Specifications:</strong> Details of component interfaces and contracts</li>
        <li><strong>Design Reviews:</strong> Feedback and approval from reviewers</li>
        <li><strong>Risk Assessment:</strong> Identification of design risks and mitigation strategies</li>
      </ul>
      
      <h3>Common Design Challenges</h3>
      <ul>
        <li><strong>Requirement Ambiguity:</strong> Unclear or conflicting requirements affect design decisions</li>
        <li><strong>Scalability Planning:</strong> Designing for unknown future scale and load requirements</li>
        <li><strong>Legacy System Integration:</strong> Designing new systems to work with existing legacy systems</li>
        <li><strong>Technology Evolution:</strong> Designing for technologies that may change during development</li>
        <li><strong>Cost vs Quality Trade-offs:</strong> Balancing design quality with budget and time constraints</li>
        <li><strong>Team Coordination:</strong> Ensuring all team members follow design guidelines and decisions</li>
      </ul>
    `
  },
  {
    id: "architectural-styles",
    title: "Architectural Styles",
    section: "Architecture",
    content: `
      <h3>1. Layered (N-tier) Architecture</h3>
      <p><strong>Description:</strong> Organizes the system into horizontal layers, each with a specific role (presentation, business logic, data access). Each layer only communicates with adjacent layers.</p>
      <div class="definition-box"><strong>Typical Layers:</strong> Presentation Layer → Business Logic Layer → Persistence Layer → Database Layer</div>
      <ul>
        <li><strong>Advantages:</strong> Easy to organize teams, clear separation of concerns, simple to understand, good for standard business applications</li>
        <li><strong>Disadvantages:</strong> Can become monolithic, performance overhead from layer traversal, horizontal scaling difficulties, single point of failure</li>
      </ul>
      <p><strong>Example:</strong> E-commerce platform with presentation layer (web UI), business layer (order processing, inventory), and data layer (database).</p>
      
      <h3>2. Event-Driven Architecture</h3>
      <p><strong>Description:</strong> Components interact through events. An event source generates events that are consumed by event subscribers. Components are loosely coupled through an event mediator or broker.</p>
      <ul>
        <li><strong>Two Models:</strong> Mediator pattern (central event mediator) and Broker pattern (distributed event broker)</li>
        <li><strong>Advantages:</strong> Decoupled components, highly responsive, scales well for high-volume events, real-time processing capability</li>
        <li><strong>Disadvantages:</strong> Complex testing, difficult to trace execution flow, potential event ordering issues, requires robust event handling</li>
      </ul>
      <p><strong>Example:</strong> Stock trading system where price changes trigger automatic trades, notifications, and database updates through event streams.</p>
      
      <h3>3. Microservices Architecture</h3>
      <p><strong>Description:</strong> Large applications are composed of small, independent services that can be developed, deployed, and scaled separately. Each service has its own database and communicates via APIs.</p>
      <ul>
        <li><strong>Key Characteristics:</strong> Service independence, bounded contexts, API-based communication, independent deployment, technology heterogeneity</li>
        <li><strong>Advantages:</strong> Independent deployment and scaling, technology diversity, fault isolation, faster time to market, team autonomy</li>
        <li><strong>Disadvantages:</strong> Distributed system complexity, network latency, data consistency challenges, operational complexity, testing difficulties</li>
      </ul>
      <p><strong>Example:</strong> Netflix uses microservices for user management, recommendation engine, billing, and streaming services, each independently scalable.</p>
      
      <h3>4. Model-View-Controller (MVC)</h3>
      <p><strong>Description:</strong> Separates application into three components: Model (data and business logic), View (user interface), and Controller (request handling and logic orchestration).</p>
      <div class="definition-box"><strong>Interaction Flow:</strong> User → Controller → Model → View → User</div>
      <ul>
        <li><strong>Advantages:</strong> Separation of concerns, parallel development possible, easier unit testing, multiple views for same model</li>
        <li><strong>Disadvantages:</strong> More complexity for simple applications, potential for view and controller coupling, initial setup complexity</li>
      </ul>
      <p><strong>Example:</strong> Spring MVC web application where Controller handles requests, Model manages business logic and data, View renders HTML responses.</p>
      
      <h3>5. Service-Oriented Architecture (SOA)</h3>
      <p><strong>Description:</strong> Services are modular business capabilities exposed through standardized interfaces, typically using web services (SOAP, REST). Services are coarser-grained than microservices and often share databases.</p>
      <ul>
        <li><strong>Key Components:</strong> Service Provider, Service Consumer, Service Registry, Message Bus</li>
        <li><strong>Advantages:</strong> Reusability across applications, interoperability between systems, flexibility and agility, alignment with business processes</li>
        <li><strong>Disadvantages:</strong> Performance overhead, complexity in orchestration, requires mature governance, difficult version management</li>
      </ul>
      <p><strong>Example:</strong> Enterprise bank exposing services for account management, loan processing, credit checks through web services consumed by web and mobile applications.</p>
      
      <h3>6. Pipeline/Pipe-and-Filter Architecture</h3>
      <p><strong>Description:</strong> Data flows through a series of independent components (filters) connected by pipes. Each filter processes data and passes it to the next filter.</p>
      <ul>
        <li><strong>Advantages:</strong> Simple and elegant, high reusability, easy testing, natural for data processing pipelines</li>
        <li><strong>Disadvantages:</strong> Limited by pipe bandwidth, error handling complexity, difficult scalability, filter dependencies</li>
      </ul>
      
      <h3>Comparison Table</h3>
      <table class="comparison-table">
        <tr>
          <th>Architecture</th>
          <th>Best For</th>
          <th>Scalability</th>
          <th>Complexity</th>
          <th>Team Size</th>
        </tr>
        <tr>
          <td>Layered</td>
          <td>Traditional web apps, CRUD applications</td>
          <td>Moderate</td>
          <td>Low-Moderate</td>
          <td>Small-Medium</td>
        </tr>
        <tr>
          <td>Event-Driven</td>
          <td>Real-time systems, reactive apps</td>
          <td>High</td>
          <td>High</td>
          <td>Medium-Large</td>
        </tr>
        <tr>
          <td>Microservices</td>
          <td>Large, complex, independently scalable apps</td>
          <td>Very High</td>
          <td>Very High</td>
          <td>Large</td>
        </tr>
        <tr>
          <td>MVC</td>
          <td>Web applications, UI-centric apps</td>
          <td>Moderate</td>
          <td>Moderate</td>
          <td>Small-Medium</td>
        </tr>
        <tr>
          <td>SOA</td>
          <td>Enterprise systems, cross-functional apps</td>
          <td>High</td>
          <td>High</td>
          <td>Large</td>
        </tr>
        <tr>
          <td>Pipeline</td>
          <td>Data processing, ETL, batch systems</td>
          <td>Moderate</td>
          <td>Low</td>
          <td>Small</td>
        </tr>
      </table>
      
      <h3>Choosing an Architecture</h3>
      <ul>
        <li><strong>Project Scale:</strong> Simple projects favor layered; complex systems favor microservices</li>
        <li><strong>Performance Requirements:</strong> Event-driven for real-time; microservices for independent scaling</li>
        <li><strong>Team Structure:</strong> Team size and expertise influence architecture choice (Conway's Law)</li>
        <li><strong>Deployment Strategy:</strong> Frequency of deployments affects architecture (microservices enable frequent deploys)</li>
        <li><strong>Technology Diversity:</strong> Multiple languages needed? Consider microservices or SOA</li>
        <li><strong>Data Consistency:</strong> Tight consistency needs? Avoid microservices; event-driven needs eventual consistency handling</li>
      </ul>
    `
  },
  {
    id: "solid-principles",
    title: "SOLID Principles",
    section: "Design Patterns",
    content: `
      <h3>1. Single Responsibility Principle (SRP)</h3>
      <p><strong>Definition:</strong> A class should have one, and only one, reason to change. Each class should have a single, well-defined responsibility.</p>
      <div class="definition-box"><strong>Example:</strong> A User class should only handle user data (name, email). User authentication should be in a separate UserAuthenticator class. User validation should be in a UserValidator class.</div>
      <ul>
        <li><strong>Benefits:</strong> Easier to test, understand, and maintain; reduced coupling</li>
        <li><strong>Violation Example:</strong> A PaymentProcessor class handling payments, sending emails, and logging would violate SRP</li>
      </ul>
      
      <h3>2. Open/Closed Principle (OCP)</h3>
      <p><strong>Definition:</strong> Classes should be open for extension but closed for modification. You should be able to add new functionality without changing existing code.</p>
      <div class="definition-box"><strong>Example:</strong> Use an abstract PaymentMethod class with concrete implementations (CreditCard, PayPal, Bitcoin) instead of modifying PaymentProcessor class each time a new payment method is added.</div>
      <ul>
        <li><strong>Benefits:</strong> Reduces risk of breaking existing code; supports multiple implementations</li>
        <li><strong>Implementation:</strong> Use inheritance, interfaces, and polymorphism</li>
      </ul>
      
      <h3>3. Liskov Substitution Principle (LSP)</h3>
      <p><strong>Definition:</strong> Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. Subtypes must be substitutable for their base types.</p>
      <div class="definition-box"><strong>Example:</strong> If Bird is a superclass with a fly() method, then Penguin (subclass) should also have a meaningful fly() implementation, not throw an exception.</div>
      <ul>
        <li><strong>Violation Example:</strong> A Square subclass of Rectangle that overrides setWidth/setHeight inconsistently</li>
        <li><strong>Benefits:</strong> Ensures reliability; enables safe polymorphism</li>
      </ul>
      
      <h3>4. Interface Segregation Principle (ISP)</h3>
      <p><strong>Definition:</strong> Clients should not be forced to depend on interfaces they do not use. Create specific, focused interfaces rather than large, general-purpose ones.</p>
      <div class="definition-box"><strong>Example:</strong> Instead of a large Worker interface with work() and eat() methods, create separate Worker and Eater interfaces. Robots can implement Worker without Eater.</div>
      <ul>
        <li><strong>Benefits:</strong> Reduces dependencies; improves flexibility; easier testing with mocks</li>
        <li><strong>Violation Example:</strong> A Shape interface with draw() and getArea() when some shapes can't be drawn</li>
      </ul>
      
      <h3>5. Dependency Inversion Principle (DIP)</h3>
      <p><strong>Definition:</strong> High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces or abstract classes).</p>
      <div class="definition-box"><strong>Example:</strong> OrderService depends on OrderRepository interface, not specific MySQLOrderRepository. This allows swapping implementations without changing OrderService.</div>
      <ul>
        <li><strong>Benefits:</strong> Loose coupling; enables easy testing with mocks; supports technology changes</li>
        <li><strong>Implementation:</strong> Use dependency injection, interfaces, and abstract classes</li>
      </ul>
    `
  },
  {
    id: "testing-overview",
    title: "Software Testing Overview",
    section: "Testing",
    content: `
      <h3>What is Software Testing?</h3>
      <div class="definition-box"><strong>Definition:</strong> Software testing is the process of executing a software application or system with the intent of finding and reporting defects, and validating that it performs according to specifications.</div>
      
      <h3>Objectives of Testing</h3>
      <ul>
        <li>Identify defects and errors in the software</li>
        <li>Verify that the software meets specified requirements</li>
        <li>Validate that the software is fit for use</li>
        <li>Ensure quality and reliability of the system</li>
        <li>Build confidence in the software system</li>
      </ul>
      
      <h3>Testing Levels</h3>
      <ul>
        <li><strong>Unit Testing:</strong> Testing individual units or components in isolation</li>
        <li><strong>Integration Testing:</strong> Testing how different components work together</li>
        <li><strong>System Testing:</strong> Testing the complete integrated system</li>
        <li><strong>Acceptance Testing:</strong> Testing whether the system meets user requirements and acceptance criteria</li>
      </ul>
      
      <h3>Testing Types</h3>
      <ul>
        <li><strong>Functional Testing:</strong> Verifies that functions work as intended</li>
        <li><strong>Non-functional Testing:</strong> Tests performance, security, usability, reliability, etc.</li>
        <li><strong>Regression Testing:</strong> Ensures that changes don't break existing functionality</li>
        <li><strong>Smoke Testing:</strong> Quick sanity check that critical functionality works</li>
      </ul>
    `
  },
  {
    id: "white-box-testing",
    title: "White Box Testing",
    section: "Testing",
    content: `
      <h3>Definition and Scope</h3>
      <div class="definition-box"><strong>White Box Testing:</strong> Also called structural, glass box, or clear box testing. The tester examines the internal code structure, logic, and implementation details to design test cases. The objective is to test all possible code paths and logic branches.</div>
      
      <h3>Key Characteristics</h3>
      <ul>
        <li>Tests are based on internal code structure and logic flow</li>
        <li>Requires knowledge of programming languages and code implementation</li>
        <li>Testers have access to source code and design documents</li>
        <li>Focuses on testing all code paths, branches, loops, and conditions</li>
        <li>Typically performed by developers or technical QA engineers</li>
        <li>Can be performed at unit, integration, or system level</li>
      </ul>
      
      <h3>White Box Testing Techniques</h3>
      
      <h4>1. Statement Coverage</h4>
      <p><strong>Definition:</strong> Ensuring every statement in the code is executed at least once during testing.</p>
      <ul>
        <li><strong>Example:</strong> Code with 100 statements requires test cases that execute all 100 statements. If coverage is 95%, then 5 statements remain untested.</li>
        <li><strong>Coverage %:</strong> (Statements executed / Total statements) × 100</li>
        <li><strong>Goal:</strong> 100% statement coverage is recommended</li>
        <li><strong>Limitation:</strong> Doesn't guarantee all paths are tested</li>
      </ul>
      
      <h4>2. Branch Coverage (Decision Coverage)</h4>
      <p><strong>Definition:</strong> Ensuring every branch (if/else, switch cases, loops) is executed at least once.</p>
      <ul>
        <li><strong>Example:</strong> For if-else statement: if(age > 18) { ... } else { ... }, test both conditions (age > 18 = true and age > 18 = false).</li>
        <li><strong>Coverage %:</strong> (Branches executed / Total branches) × 100</li>
        <li><strong>More thorough than:</strong> Statement coverage</li>
        <li><strong>Example scenario:</strong> Testing with age = 20 (true branch) and age = 15 (false branch)</li>
      </ul>
      
      <h4>3. Path Coverage</h4>
      <p><strong>Definition:</strong> Ensuring every possible path through the code is executed. A path is a unique sequence of statements and branches.</p>
      <ul>
        <li><strong>Example:</strong> Code with two if statements has 4 possible paths: (T,T), (T,F), (F,T), (F,F).</li>
        <li><strong>Complexity:</strong> Number of paths can grow exponentially with nested conditions</li>
        <li><strong>Feasibility:</strong> May be infeasible for complex code; often covered by a representative subset</li>
        <li><strong>Most thorough:</strong> Requires most test cases</li>
      </ul>
      
      <h4>4. Condition Coverage</h4>
      <p><strong>Definition:</strong> Ensuring every condition in decision statements evaluates to both true and false at least once.</p>
      <ul>
        <li><strong>Example:</strong> if(a > 5 AND b < 10), test when (a > 5 is true, b < 10 is true), (a > 5 is true, b < 10 is false), etc.</li>
      </ul>
      
      <h4>5. Loop Coverage</h4>
      <p><strong>Definition:</strong> Testing loops by executing zero iterations, one iteration, and multiple iterations.</p>
      <ul>
        <li><strong>Zero iterations:</strong> Loop condition initially false; loop body never executes</li>
        <li><strong>One iteration:</strong> Loop body executes exactly once</li>
        <li><strong>Multiple iterations:</strong> Loop body executes multiple times</li>
      </ul>
      
      <h4>6. Data Flow Testing</h4>
      <p><strong>Definition:</strong> Testing the flow of data from definition to use. Tracks how variables are defined and used.</p>
      <ul>
        <li><strong>Definition (def):</strong> Point where variable is assigned a value</li>
        <li><strong>Use (use):</strong> Point where variable value is read</li>
        <li><strong>Objective:</strong> Ensure data flows correctly from definition to use</li>
      </ul>
      
      <h3>Advantages of White Box Testing</h3>
      <ul>
        <li>Thorough testing of code logic and structure; high code coverage</li>
        <li>Identifies unused code, dead paths, and unreachable statements</li>
        <li>Tests internal logic, algorithms, and edge cases</li>
        <li>Can be automated using code coverage tools</li>
        <li>Detects errors in implementation logic early</li>
        <li>Helps optimize code by identifying inefficient logic</li>
        <li>Performed by developers with code understanding</li>
      </ul>
      
      <h3>Disadvantages of White Box Testing</h3>
      <ul>
        <li>Requires deep knowledge of programming languages and implementation</li>
        <li>Time-consuming to design, write, and maintain test cases</li>
        <li>May miss user-centric and integration issues</li>
        <li>Cannot test non-functional requirements easily (performance, usability)</li>
        <li>Focuses on "how" not "what" - may miss requirements not implemented</li>
        <li>Requires access to source code; not possible for third-party software</li>
        <li>Test bias: testers may replicate developer logic errors</li>
      </ul>
      
      <h3>Coverage Metrics and Goals</h3>
      <table class="comparison-table">
        <tr>
          <th>Coverage Type</th>
          <th>Definition</th>
          <th>Recommended Goal</th>
          <th>Difficulty</th>
        </tr>
        <tr>
          <td>Statement Coverage</td>
          <td>% of statements executed</td>
          <td>80-90%</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td>Branch Coverage</td>
          <td>% of branches executed</td>
          <td>70-80%</td>
          <td>Medium</td>
        </tr>
        <tr>
          <td>Path Coverage</td>
          <td>% of paths executed</td>
          <td>50-70%</td>
          <td>Hard</td>
        </tr>
        <tr>
          <td>Condition Coverage</td>
          <td>% of conditions true/false</td>
          <td>70-80%</td>
          <td>Medium</td>
        </tr>
      </table>
    `
  },
  {
    id: "black-box-testing",
    title: "Black Box Testing",
    section: "Testing",
    content: `
      <h3>Definition and Scope</h3>
      <div class="definition-box"><strong>Black Box Testing:</strong> Also called functional or behavioral testing. The tester examines inputs and outputs without knowledge of internal implementation. Tests are designed to verify that the system meets functional requirements and specifications.</div>
      
      <h3>Key Characteristics</h3>
      <ul>
        <li>Tests are based on specifications, requirements, and use cases</li>
        <li>No knowledge of internal code structure or implementation required</li>
        <li>Tester focuses on inputs provided and outputs expected</li>
        <li>Tests complete end-to-end user functionality</li>
        <li>Can be performed by non-technical testers (QA engineers, business analysts)</li>
        <li>Tests what the system does, not how it does it</li>
      </ul>
      
      <h3>Black Box Testing Techniques</h3>
      
      <h4>1. Equivalence Partitioning</h4>
      <p><strong>Definition:</strong> Dividing input data into groups (equivalence classes) that are expected to behave similarly. One representative value from each class is tested.</p>
      <ul>
        <li><strong>Example:</strong> Age input field (valid: 1-100, invalid: &lt;1 or &gt;100). Classes: Invalid (negative), Valid (1-100), Invalid (&gt;100). Test with: -5, 50, 150.</li>
        <li><strong>Benefit:</strong> Reduces number of test cases while maintaining coverage</li>
        <li><strong>Classes:</strong> Valid inputs, invalid inputs, boundary values</li>
        <li><strong>Assumption:</strong> All values in a class behave identically</li>
      </ul>
      
      <h4>2. Boundary Value Analysis (BVA)</h4>
      <p><strong>Definition:</strong> Testing values at the boundaries of input domains. Errors often occur at boundaries.</p>
      <ul>
        <li><strong>Example:</strong> For age input 1-100, test boundary values: 0 (below), 1 (lower boundary), 100 (upper boundary), 101 (above).</li>
        <li><strong>Boundary Values:</strong> Values just inside and just outside the boundary</li>
        <li><strong>Test Cases:</strong> For range [a, b], test: a-1, a, a+1, b-1, b, b+1</li>
        <li><strong>Rationale:</strong> Off-by-one errors commonly occur at boundaries</li>
      </ul>
      
      <h4>3. Decision Table Testing (Cause-Effect Graphing)</h4>
      <p><strong>Definition:</strong> Creating test cases based on combinations of conditions and their effects.</p>
      <ul>
        <li><strong>Example:</strong> Loan approval system: Salary &gt; $50K, Credit score &gt; 700, No debt. Each combination determines approval/rejection.</li>
        <li><strong>Process:</strong> Identify conditions, identify effects, create decision table, derive test cases</li>
        <li><strong>Coverage:</strong> Tests all meaningful combinations of conditions</li>
        <li><strong>Advantage:</strong> Identifies inconsistencies and missing requirements</li>
      </ul>
      
      <h4>4. State Transition Testing</h4>
      <p><strong>Definition:</strong> Testing transitions between different states of the system. Tests valid and invalid state transitions.</p>
      <ul>
        <li><strong>Example:</strong> ATM system states: Idle → CardInserted → PINEntered → MenuDisplayed → TransactionComplete → CardEjected → Idle.</li>
        <li><strong>States:</strong> Different conditions or modes the system can be in</li>
        <li><strong>Transitions:</strong> Valid and invalid moves between states</li>
        <li><strong>Test Cases:</strong> Test all valid transitions and attempt invalid transitions</li>
      </ul>
      
      <h4>5. Error Guessing</h4>
      <p><strong>Definition:</strong> Based on experience and intuition, testers guess where errors are likely and design tests accordingly.</p>
      <ul>
        <li><strong>Common Errors:</strong> Null values, empty strings, very large/small numbers, special characters</li>
        <li><strong>Approach:</strong> Informal but effective; relies on tester experience</li>
        <li><strong>Use Case:</strong> Supplement to other techniques</li>
      </ul>
      
      <h4>6. Use Case Testing</h4>
      <p><strong>Definition:</strong> Designing test cases based on use cases describing user interactions with the system.</p>
      <ul>
        <li><strong>Coverage:</strong> Main flows (happy paths) and alternative flows (exceptions)</li>
        <li><strong>Advantage:</strong> Ensures tested functionality is valuable to users</li>
        <li><strong>Example:</strong> Use case "Online Purchase" with variations like "Apply Coupon", "Out of Stock", etc.</li>
      </ul>
      
      <h3>Advantages of Black Box Testing</h3>
      <ul>
        <li>Tests from genuine user perspective; focuses on actual functionality</li>
        <li>No programming knowledge required; performed by domain experts</li>
        <li>Identifies missing or incomplete functionality</li>
        <li>Tests complete end-to-end system integration and workflows</li>
        <li>Can be performed independently of implementation (parallel development possible)</li>
        <li>Unbiased: testers don't replicate developer assumptions</li>
        <li>Detects user experience and usability issues</li>
      </ul>
      
      <h3>Disadvantages of Black Box Testing</h3>
      <ul>
        <li>May not cover all code paths; some paths may never be tested</li>
        <li>Test cases often redundant due to lack of code visibility</li>
        <li>Cannot identify specific internal errors or logic bugs</li>
        <li>May not test all boundary conditions or edge cases</li>
        <li>Difficult to test internal error handling mechanisms</li>
        <li>Less efficient for finding root causes of defects</li>
        <li>May require extensive test cases to achieve coverage</li>
      </ul>
      
      <h3>Comparison: White Box vs Black Box Testing</h3>
      <table class="comparison-table">
        <tr>
          <th>Aspect</th>
          <th>White Box Testing</th>
          <th>Black Box Testing</th>
        </tr>
        <tr>
          <td>Code Knowledge</td>
          <td>Required (Full)</td>
          <td>Not Required</td>
        </tr>
        <tr>
          <td>Testing Approach</td>
          <td>Structure/Logic-based</td>
          <td>Behavior/Requirement-based</td>
        </tr>
        <tr>
          <td>Testers</td>
          <td>Developers, Technical QA</td>
          <td>QA Engineers, Business Analysts</td>
        </tr>
        <tr>
          <td>Test Basis</td>
          <td>Code paths, algorithms</td>
          <td>Specifications, requirements</td>
        </tr>
        <tr>
          <td>Coverage Focus</td>
          <td>Code/Statement coverage</td>
          <td>Functional/Requirement coverage</td>
        </tr>
        <tr>
          <td>Execution Time</td>
          <td>Early in development</td>
          <td>After integration/deployment</td>
        </tr>
        <tr>
          <td>Defect Detection</td>
          <td>Internal logic errors, edge cases</td>
          <td>Missing functionality, usability issues</td>
        </tr>
        <tr>
          <td>Automation</td>
          <td>Relatively easy with coverage tools</td>
          <td>Automated at UI/API level</td>
        </tr>
      </table>
      
      <h3>When to Use Each Approach</h3>
      <ul>
        <li><strong>Use White Box:</strong> Unit testing, code reviews, early development stage, critical algorithms</li>
        <li><strong>Use Black Box:</strong> System testing, integration testing, user acceptance testing, third-party software</li>
        <li><strong>Best Practice:</strong> Use both approaches in combination (complement each other)</li>
      </ul>
    `
  },
  {
    id: "quality-assurance",
    title: "Quality Assurance",
    section: "Quality",
    content: `
      <h3>Verification and Validation (V&V)</h3>
      <p>Two critical concepts in software quality assurance that are often confused but have different meanings.</p>
      
      <h4>Verification</h4>
      <ul>
        <li><strong>Definition:</strong> Verification is the process of evaluating whether the software product meets the specifications that were used to design it.</li>
        <li><strong>Question:</strong> "Are we building the product right?"</li>
        <li><strong>Focus:</strong> Internal correctness</li>
        <li><strong>Activities:</strong> Reviews, inspections, unit testing, integration testing</li>
        <li><strong>Timing:</strong> During development</li>
      </ul>
      
      <h4>Validation</h4>
      <ul>
        <li><strong>Definition:</strong> Validation is the process of establishing whether the completed software product satisfies user requirements.</li>
        <li><strong>Question:</strong> "Are we building the right product?"</li>
        <li><strong>Focus:</strong> Meeting user needs</li>
        <li><strong>Activities:</strong> User acceptance testing, system testing, beta testing</li>
        <li><strong>Timing:</strong> After development, before release</li>
      </ul>
      
      <h3>V&V Process</h3>
      <ul>
        <li><strong>Requirements Review:</strong> Verify requirements are clear and complete</li>
        <li><strong>Design Review:</strong> Verify design satisfies requirements</li>
        <li><strong>Code Review:</strong> Verify code implements design correctly</li>
        <li><strong>Unit Testing:</strong> Verify individual units work correctly</li>
        <li><strong>Integration Testing:</strong> Verify components work together</li>
        <li><strong>System Testing:</strong> Validate system meets requirements</li>
        <li><strong>User Acceptance Testing:</strong> Validate system meets user needs</li>
      </ul>
      <div class="example-box"><strong>Key Point:</strong> Verification ensures the development process is correct; Validation ensures the final product is correct for the intended use.</div>
      
      <h3>Reliability and Quality Metrics</h3>
      
      <h4>What is Reliability?</h4>
      <p><strong>Definition:</strong> Reliability is the probability that a system will perform its intended function without failure for a specified period of time under specified conditions.</p>
      
      <h4>Key Reliability Metrics</h4>
      <ul>
        <li><strong>Mean Time Between Failures (MTBF):</strong> Average time elapsed between system failures. Calculated as: Total service time / Number of failures.</li>
        <li><strong>Mean Time To Repair (MTTR):</strong> Average time taken to fix a failure and restore the system to operation.</li>
        <li><strong>Availability:</strong> Percentage of time a system is available and usable. Calculated as: MTBF / (MTBF + MTTR)</li>
        <li><strong>Failure Rate:</strong> Number of failures per unit time. Used to track system stability.</li>
        <li><strong>Defect Density:</strong> Number of defects per unit size (e.g., defects per 1000 lines of code - KLOC).</li>
      </ul>
      
      <h3>Quality Models</h3>
      
      <h4>McCall's Quality Model</h4>
      <p><strong>Overview:</strong> McCall defined quality in terms of three high-level parameters and eleven quality factors.</p>
      <ul>
        <li><strong>Three Parameters:</strong> Operational Characteristics, Maintenance Characteristics, Transition Characteristics</li>
        <li><strong>Factors:</strong> Correctness, Reliability, Efficiency, Integrity, Usability, Maintainability, Flexibility, Testability, Portability, Reusability, Interoperability</li>
      </ul>
      
      <h4>Boehm's Quality Model</h4>
      <p><strong>Overview:</strong> Boehm suggested quality based on three high-level characteristics important to users.</p>
      <ul>
        <li><strong>Characteristics:</strong> As-is Utility, Maintainability, Portability</li>
      </ul>
      
      <h4>ISO 9126 Quality Model</h4>
      <p><strong>Overview:</strong> International standard for software quality characteristics.</p>
      <ul>
        <li><strong>Six Characteristics:</strong> Functionality, Reliability, Usability, Efficiency, Maintainability, Portability</li>
      </ul>
      
      <h3>Reviews and Inspections</h3>
      <p><strong>Definition:</strong> Reviews and inspections are static testing techniques where software artifacts (documents, code, design) are examined without execution to identify defects and ensure compliance with standards.</p>
      
      <h4>Types of Reviews</h4>
      <ul>
        <li><strong>Formal Inspection:</strong> Rigorous, structured review process with defined roles (Moderator, Author, Reviewers, Recorder)</li>
        <li><strong>Walk-through:</strong> Informal review where the author explains the artifact to reviewers. Good for knowledge transfer.</li>
        <li><strong>Code Review:</strong> Systematic examination of source code by peers to identify coding errors and violations.</li>
      </ul>
      
      <h4>Inspection Process Steps</h4>
      <ul>
        <li><strong>Planning:</strong> Prepare for inspection, identify participants</li>
        <li><strong>Overview:</strong> Introduce the artifact and inspection procedures</li>
        <li><strong>Preparation:</strong> Participants review artifact individually</li>
        <li><strong>Meeting:</strong> Group discussion to identify and record defects</li>
        <li><strong>Rework:</strong> Author fixes defects found</li>
        <li><strong>Follow-up:</strong> Verify rework and close inspection</li>
      </ul>
      
      <h4>Benefits of Reviews and Inspections</h4>
      <ul>
        <li>Find defects early in development (before testing)</li>
        <li>Cost-effective: cheaper to fix defects earlier</li>
        <li>Improve code quality and maintainability</li>
        <li>Promote knowledge sharing among team members</li>
        <li>Establish coding standards and best practices</li>
        <li>Build team morale and collaboration</li>
      </ul>
    `
  }
];

// ============ RENDER FUNCTIONS ============
function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sections = {};

  contentData.forEach(item => {
    if (!sections[item.section]) {
      sections[item.section] = [];
    }
    sections[item.section].push(item);
  });

  let isFirstItem = true;
  Object.entries(sections).forEach(([sectionName, items]) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'sidebar-section';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'sidebar-title';
    titleDiv.textContent = sectionName;
    sectionDiv.appendChild(titleDiv);

    items.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'sidebar-item';
      if (isFirstItem) {
        itemDiv.classList.add('active');
        isFirstItem = false;
      }
      itemDiv.setAttribute('data-content', item.id);
      itemDiv.textContent = item.title;
      itemDiv.addEventListener('click', () => selectContent(item.id));
      sectionDiv.appendChild(itemDiv);
    });

    sidebar.appendChild(sectionDiv);
  });
}

function renderContent(contentId) {
  const contentArea = document.getElementById('content');
  const item = contentData.find(c => c.id === contentId);

  if (!item) return;

  contentArea.innerHTML = '';
  const mainCard = document.createElement('div');
  mainCard.className = 'content-card';

  const title = document.createElement('h2');
  title.textContent = item.title;
  mainCard.appendChild(title);

  mainCard.innerHTML += item.content;
  contentArea.appendChild(mainCard);
}

function selectContent(contentId) {
  const items = document.querySelectorAll('.sidebar-item');
  items.forEach(item => item.classList.remove('active'));
  const activeItem = document.querySelector(`[data-content="${contentId}"]`);
  if (activeItem) activeItem.classList.add('active');
  renderContent(contentId);
  window.scrollTo(0, 0);
}

// ============ THEME TOGGLE ============
function setupTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';

  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeButton();

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton();
  });

  function updateThemeButton() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    themeToggle.textContent = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

// ============ SCROLL TO TOP ============
function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderContent(contentData[0].id);
  setupTheme();
  setupScrollToTop();
});