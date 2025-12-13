// ============================================
    // DOM BUILDER - Generate all HTML from JS
    // ============================================
    function buildDOM() {
        const root = document.getElementById('root');
        
        // Header HTML
        const headerHTML = `
            <div class="container">
                <div class="header">
                    <h1>📚 Network Programming</h1>
                    <p>Master 10 Programs: 5 TCL/AWK + 5 C Programs with Memory Aids & Interactive Learning</p>
                    <div class="header-controls">
                        <button class="icon-btn" onclick="toggleTheme()" title="Toggle Theme (Ctrl+T)">🌙</button>
                        <button class="icon-btn" onclick="toggleToolsPanel()" title="Tools (Ctrl+K)">⚙️</button>
                    </div>
                </div>
                <div class="section" id="content-section"></div>
            </div>
        `;
        
        // Tools Panel HTML
        const toolsPanelHTML = `
            <div class="panel-overlay" id="panelOverlay" onclick="toggleToolsPanel()"></div>
            <div class="tools-panel" id="toolsPanel">
                <button class="panel-close-btn" onclick="toggleToolsPanel()">✕</button>
                <h3>Display Options</h3>
                <div class="tools-section">
                    <h4>Content View</h4>
                    <div class="toggle-option">
                        <label>Show Code</label>
                        <input type="checkbox" id="showCode" checked onchange="applyDisplayOptions()">
                        <label for="showCode" class="toggle-switch"></label>
                    </div>
                    <div class="toggle-option">
                        <label>Show Explanations</label>
                        <input type="checkbox" id="showExplanations" checked onchange="applyDisplayOptions()">
                        <label for="showExplanations" class="toggle-switch"></label>
                    </div>
                    <div class="toggle-option">
                        <label>Show Questions</label>
                        <input type="checkbox" id="showQuestions" checked onchange="applyDisplayOptions()">
                        <label for="showQuestions" class="toggle-switch"></label>
                    </div>
                </div>
                <div class="tools-section">
                    <h4>Viva Mode</h4>
                    <div class="toggle-option">
                        <label>Show Answers</label>
                        <input type="checkbox" id="showVivaAnswers" onchange="applyVivaOptions()">
                        <label for="showVivaAnswers" class="toggle-switch"></label>
                    </div>
                </div>
            </div>
        `;
        
        root.innerHTML = headerHTML + toolsPanelHTML;
    }
    


// ============================================
// PROGRAM DATA - All content driven by JS
// ============================================
const programs = [
  {
    id: 'p1',
    title: 'P1: Packet Drops in Bottleneck',
    type: 'TCL',
    icon: '📡',
    explanation: 'Four nodes connected in a line. Two sources (n0, n1) send data through a bottleneck (n2) to destination (n3). Small queue + high traffic = packet drops. AWK counts dropped packets.',
    tclCode: `# Create simulator instance
set ns [new Simulator]

# Open trace and NAM files
set tf [open p1.tr w]
$ns trace-all $tf

# Create four nodes
set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]
set n3 [$ns node]

# Duplex links with different bandwidths
$ns duplex-link $n0 $n2 20Mb 10ms DropTail
$ns duplex-link $n1 $n2 10Mb 10ms DropTail
$ns duplex-link $n2 $n3 0.7Mb 10ms DropTail  # Bottleneck!

# Set queue limits (small queues = more drops)
$ns set queue-limit $n0 $n2 10
$ns set queue-limit $n2 $n3 5

# Attach UDP agents and CBR traffic
set udp0 [new Agent/UDP]
set cbr0 [new Application/Traffic/CBR]
$ns attach-agent $n0 $udp0
$cbr0 attach-agent $udp0

# Configure CBR parameters
$cbr0 set packetsize_ 512
$cbr0 set interval_ 0.001  # Very frequent!

# Schedule traffic events
$ns at 0.0 "$cbr0 start"
$ns at 10.0 "$cbr0 stop"
$ns at 13.0 "finish"

# Run simulation
$ns run`,
    awkCode: `BEGIN { 
  count=0; 
}

{ 
  # Check if first column is "d" (dropped packet)
  if ($1=="d") count++; 
}

END { 
  printf("Number of packets dropped: %d\\n", count); 
}`,
    question: 'What causes packet drops in this program?',
    answer: 'The bottleneck link (n2→n3) has limited bandwidth (0.7Mb) compared to upstream (20Mb), causing queue overflow. When packets arrive faster than they can be transmitted, the small queue (limit=5) fills up and excess packets are dropped.'
  },

  {
    id: 'p2',
    title: 'P2: TCP vs UDP Performance',
    type: 'TCL',
    icon: '🔄',
    explanation: 'Same topology as P1, but compare TCP (reliable, uses FTP) vs UDP (unreliable, uses CBR). TCP sends fewer packets due to congestion control. UDP sends more but loses more.',
    tclCode: `# Create simulator
set ns [new Simulator]
set tf [open p2.tr w]
$ns trace-all $tf

# Create 4-node topology
set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]
set n3 [$ns node]

# Links: Same as P1
$ns duplex-link $n0 $n2 20Mb 10ms DropTail
$ns duplex-link $n1 $n2 10Mb 10ms DropTail
$ns duplex-link $n2 $n3 0.7Mb 10ms DropTail  # Bottleneck

$ns set queue-limit $n0 $n2 10
$ns set queue-limit $n2 $n3 5

# TCP setup (Reliable)
set tcp [new Agent/TCP]
set ftp [new Application/FTP]
$ns attach-agent $n0 $tcp
$ftp attach-agent $tcp

# Connect TCP agent to sink
set sink [new Agent/TCPSink]
$ns attach-agent $n3 $sink
$ns connect $tcp $sink

# UDP setup (Unreliable)
set udp [new Agent/UDP]
set cbr [new Application/Traffic/CBR]
$ns attach-agent $n1 $udp
$cbr attach-agent $udp

set nullAgent [new Agent/Null]
$ns attach-agent $n3 $nullAgent
$ns connect $udp $nullAgent

# Schedule both flows
$ns at 0.0 "$ftp start"    # TCP starts
$ns at 2.0 "$cbr start"    # UDP starts later (less competition)
$ns at 13.0 "finish"

$ns run`,
    awkCode: `BEGIN { 
  tcp=0; 
  cbr=0; 
}

{ 
  # Count TCP packets sent (column 1 = "-", column 5 = "tcp")
  if ($1=="-" && $5=="tcp") tcp++; 
  
  # Count UDP packets sent (column 5 = "cbr")
  if ($1=="-" && $5=="cbr") cbr++; 
}

END { 
  printf("TCP packets sent: %d\\n", tcp); 
  printf("UDP packets sent: %d\\n", cbr); 
}`,
    question: 'Why does TCP typically send fewer packets than UDP in congested networks?',
    answer: 'TCP uses congestion control mechanisms (like AIMD - Additive Increase Multiplicative Decrease). When packet loss is detected, TCP reduces its sending rate significantly. UDP has no congestion control, so it keeps sending at the same rate regardless of network conditions.'
  },

  {
    id: 'p3',
    title: 'P3: LAN Throughput Analysis',
    type: 'TCL',
    icon: '🌐',
    explanation: 'Create two separate LANs (5 nodes each) connected via a bridge link. Simulate TCP traffic between LANs. Add error model. AWK calculates throughput = (total_bytes × 8) / time / 1,000,000 Mbps.',
    tclCode: `# Create simulator
set ns [new Simulator]
set tf [open p3.tr w]
$ns trace-all $tf

# Create 10 nodes for two LANs
for {set i 0} {$i < 10} {incr i} {
  set n($i) [$ns node]
}

# Create two Ethernet LANs using make-lan
$ns make-lan "$n(0) $n(1) $n(2) $n(3) $n(4)" 10Mb 10ms LL Queue/DropTail Mac/802_3
$ns make-lan "$n(5) $n(6) $n(7) $n(8) $n(9)" 10Mb 10ms LL Queue/DropTail Mac/802_3

# Connect LANs via bridge link (bottleneck)
$ns duplex-link $n(4) $n(5) 1Mb 3ms DropTail

# Error model to simulate packet loss
set err [new ErrorModel]
$ns lossmodel $err $n(4) $n(5)
$err set rate_ 0.01  # 1% packet loss

# Setup TCP connection from LAN1 to LAN2
set tcp [new Agent/TCP]
set ftp [new Application/FTP]
$ns attach-agent $n(0) $tcp
$ftp attach-agent $tcp

set sink [new Agent/TCPSink]
$ns attach-agent $n(9) $sink
$ns connect $tcp $sink

# Configure traffic
$ftp set type_ FTP
$tcp set maxcwnd_ 16

# Schedule
$ns at 0.5 "$ftp start"
$ns at 15.0 "$ftp stop"
$ns at 15.5 "finish"

$ns run`,
    awkCode: `BEGIN { 
  rpacketsize_tcp = 0; 
  rtimeinterval_tcp = 0; 
}

{ 
  # Track TCP received packets (r = received, $4 = destination node 9)
  if ($1=="r" && $5=="tcp" && $4=="9") { 
    rpacketsize_tcp += $6;        # Accumulate packet sizes
    rtimeinterval_tcp = $2;       # Update time
  } 
}

END { 
  # Throughput = (total bytes * 8) / time / 1,000,000 for Mbps
  if (rtimeinterval_tcp > 0)
    printf("Throughput for TCP = %f Mbps\\n", (rpacketsize_tcp * 8) / rtimeinterval_tcp / 1000000); 
  else
    printf("No data received\\n");
}`,
    question: 'What does the "make-lan" command create in NS2?',
    answer: 'The make-lan command creates an Ethernet LAN segment with multiple nodes connected via a shared medium. It automatically sets up MAC layer communication, queue management, and link-layer protocols for local area network simulation.'
  },

  {
    id: 'p4',
    title: 'P4: Congestion Window Tracing',
    type: 'TCL',
    icon: '📊',
    explanation: 'Two TCP flows compete on same LAN. Each TCP has different max cwnd (10 vs 5). Trace congestion window changes over time using "trace cwnd_". AWK extracts cwnd values for plotting with xgraph.',
    tclCode: `# Create simulator
set ns [new Simulator]
set tf [open p4.tr w]
$ns trace-all $tf

# Create 4-node LAN
set n(0) [$ns node]
set n(1) [$ns node]
set n(2) [$ns node]
set n(3) [$ns node]

$ns make-lan "$n(0) $n(1) $n(2) $n(3)" 10Mb 10ms LL Queue/DropTail Mac/802_3

# First TCP flow
set tcp0 [new Agent/TCP]
set ftp0 [new Application/FTP]
$ns attach-agent $n(0) $tcp0
$ftp0 attach-agent $tcp0

# Congestion window tracing for TCP0
set file0 [open file0.tr w]
$tcp0 attach $file0
$tcp0 trace cwnd_
$tcp0 set maxcwnd_ 10    # Max window size

# Sink for TCP0
set sink0 [new Agent/TCPSink]
$ns attach-agent $n(1) $sink0
$ns connect $tcp0 $sink0

# Second TCP flow
set tcp1 [new Agent/TCP]
set ftp1 [new Application/FTP]
$ns attach-agent $n(2) $tcp1
$ftp1 attach-agent $tcp1

# Trace TCP1
set file1 [open file1.tr w]
$tcp1 attach $file1
$tcp1 trace cwnd_
$tcp1 set maxcwnd_ 5     # Smaller window

# Sink for TCP1
set sink1 [new Agent/TCPSink]
$ns attach-agent $n(3) $sink1
$ns connect $tcp1 $sink1

# Schedule with overlapping times
$ns at 0.1 "$ftp0 start"
$ns at 1.5 "$ftp0 stop"
$ns at 0.2 "$ftp1 start"   # Starts slightly after
$ns at 2.0 "$ftp1 stop"
$ns at 2.5 "finish"

$ns run`,
    awkCode: `BEGIN { 
  # Initialize nothing special for this trace
}

{ 
  # Extract cwnd values (column 6 = "cwnd_", column 7 = value)
  if ($6=="cwnd_") 
    printf("%f\\t%f\\n", $1, $7);  # time, cwnd value
}

END { 
  # End of trace processing
}

# Usage: 
# awk -f p4.awk file0.tr > file0.data
# xgraph -x "time" -y "congestion_window" file0.data file1.data`,
    question: 'What does the congestion window (cwnd) represent in TCP?',
    answer: 'The congestion window is the maximum amount of unacknowledged data (in bytes/segments) that a TCP sender is allowed to transmit without waiting for acknowledgment. It starts small, increases additively on success (AI), but drops multiplicatively on loss (MD), preventing network congestion.'
  },

  {
    id: 'p5',
    title: 'P5: Link State Routing Protocol',
    type: 'TCL',
    icon: '🛰️',
    explanation: 'Create 12-node network with Link State (LS) routing protocol. Simulate link failures (rtmodel-at down/up). Routers recalculate shortest paths using Dijkstra. AWK measures PDR (Packet Delivery Ratio) and routing overhead.',
    tclCode: `# Create simulator
set ns [new Simulator]
set tf [open p5.tr w]
$ns trace-all $tf

$ns rtproto LS

for {set i 0} {$i < 12} {incr i} {
  set n($i) [$ns node]
}

$ns duplex-link $n(0) $n(1) 1Mb 10ms DropTail
$ns duplex-link $n(1) $n(2) 1Mb 10ms DropTail
$ns duplex-link $n(2) $n(3) 1Mb 10ms DropTail
$ns duplex-link $n(3) $n(4) 1Mb 10ms DropTail
$ns duplex-link $n(4) $n(5) 1Mb 10ms DropTail
$ns duplex-link $n(5) $n(6) 1Mb 10ms DropTail
$ns duplex-link $n(6) $n(7) 1Mb 10ms DropTail
$ns duplex-link $n(7) $n(8) 1Mb 10ms DropTail
$ns duplex-link $n(8) $n(9) 1Mb 10ms DropTail
$ns duplex-link $n(9) $n(10) 1Mb 10ms DropTail
$ns duplex-link $n(10) $n(11) 1Mb 10ms DropTail
$ns duplex-link $n(11) $n(0) 1Mb 10ms DropTail

$ns duplex-link $n(0) $n(5) 1Mb 10ms DropTail
$ns duplex-link $n(3) $n(8) 1Mb 10ms DropTail

$ns rtmodel-at 10.0 down $n(4) $n(5)
$ns rtmodel-at 30.0 up $n(4) $n(5)

set udp0 [new Agent/UDP]
set cbr0 [new Application/Traffic/CBR]
$ns attach-agent $n(0) $udp0
$cbr0 attach-agent $udp0

set nullAgent [new Agent/Null]
$ns attach-agent $n(5) $nullAgent
$ns connect $udp0 $nullAgent

$ns at 5.0 "$cbr0 start"
$ns at 45.0 "$cbr0 stop"
$ns at 45.5 "finish"

$ns run`,
    awkCode: `BEGIN { 
  pksend = 0
  pkreceive = 0
  pkdrop = 0
}

{
  if ($1=="-" && $3=="0" && $5=="cbr") 
    pksend += 1
  
  if ($1=="r" && $4=="5" && $5=="cbr") 
    pkreceive += 1
  
  if ($1=="d") 
    pkdrop += 1
}

END { 
  printf("Packets sent: %d\\n", pksend)
  printf("Packets received: %d\\n", pkreceive)
  printf("Packets dropped: %d\\n", pkdrop)
  if (pksend > 0)
    printf("PDR (Packet Delivery Ratio): %.2f%%\\n", (pkreceive/pksend)*100)
}`,
    question: 'What happens when a link fails in Link State routing?',
    answer: 'When a link fails, the Link State protocol floods a Link State Advertisement (LSA) to all routers. Each router updates its topology database and recalculates shortest paths using Dijkstra\'s algorithm. Traffic reroutes through alternate paths. The PDR may drop temporarily during convergence, but recovers once all routers learn the new topology.'
  },

  {
    id: 'c1',
    title: 'C1: Bit Stuffing Protocol',
    type: 'C',
    icon: '🔧',
    explanation: 'Data Link Layer framing technique. After five consecutive 1s, automatically insert a 0 to prevent data patterns from being mistaken for frame delimiters (01111110).',
    cCode: `#include <stdio.h>
#include <string.h>

int main() {
    char ch, array[100] = "01111110";  // Start with flag
    int counter = 0;                   // Count consecutive 1s
    int i = 8;                         // Start after flag (8 bits)
    
    printf("===== BIT STUFFING PROTOCOL =====\\n\\n");
    printf("Enter data stream (0s and 1s):\\n");
    
    while ((ch = getchar()) != '\\n') {
        if (ch != '0' && ch != '1') continue;
        
        // Count consecutive 1s
        if (ch == '1') {
            ++counter;
        } else {
            counter = 0;
        }
        
        array[i++] = ch;
        
        // Bit stuffing: after 5 consecutive 1s, stuff a 0
        if (counter == 5) {
            array[i++] = '0';
            counter = 0;
        }
    }
    
    strcat(array, "01111110");
    
    printf("\\n===== RESULT =====\\n");
    printf("Original header: 01111110\\n");
    printf("Stuffed stream: %s\\n", array);
    printf("Frame trailer: 01111110\\n");
    
    return 0;
}`,
    question: 'Why is bit stuffing necessary in HDLC protocols?',
    answer: 'HDLC uses the bit pattern 01111110 as a frame delimiter (flag). If user data contains this pattern, the receiver might incorrectly identify it as a frame boundary. Bit stuffing ensures no sequence of five consecutive 1s appears in data, making the flag pattern unique and unambiguous.'
  },

  {
    id: 'c2',
    title: 'C2: Stop-and-Wait Protocol',
    type: 'C',
    icon: '⏸️',
    explanation: 'ARQ (Automatic Repeat reQuest) protocol. Sender sends one frame and waits for ACK. If timeout, resend. Low throughput but simple. Flow control ensures receiver is not overwhelmed.',
    cCode: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>

#define RTT 4
#define TIMEOUT 4
#define TOTAL_FRAMES 7

int main() {
    int wait_time, i = 1;
    int ack_received = 1;
    int timeout_count = 0;
    
    srand(time(NULL));
    
    printf("===== STOP-AND-WAIT ARQ PROTOCOL =====\\n\\n");
    printf("Total frames to send: %d\\n\\n", TOTAL_FRAMES);
    printf("Sequence | Status\\n");
    printf("------------------------------------------\\n");
    
    while (i <= TOTAL_FRAMES) {
        if (ack_received && i != 1) {
            printf("Frame %d | ACK received, moving to next\\n", i - 1);
        }
        
        printf("Frame %d | Sending frame...\\n", i);
        ack_received = 0;
        
        // Simulate random delay/timeout
        wait_time = rand() % 6 + 1;
        
        if (wait_time > TIMEOUT) {
            timeout_count++;
            printf("Frame %d | TIMEOUT! Retransmitting...\\n", i);
        } else {
            sleep(RTT / 2);
            printf("Frame %d | ACK received\\n", i);
            printf("------------------------------------------\\n");
            ack_received = 1;
            sleep(RTT / 2);
            i++;
        }
    }
    
    printf("\\n✓ All frames transmitted successfully!\\n");
    printf("Total timeouts: %d\\n", timeout_count);
    printf("\\nNote: Efficiency = 1/(1 + 2*a) where a = RTT/Transmission_Time\\n");
    
    return 0;
}`,
    question: 'What is the main disadvantage of Stop-and-Wait protocol?',
    answer: 'Low throughput/efficiency. The sender must wait for ACK before sending the next frame, causing long idle periods. For long RTT (Round Trip Time) links, the sender is idle for most of the time. Efficiency = 1/(1 + 2*a) where a is the ratio of propagation delay to transmission time.'
  },

  {
    id: 'c3',
    title: 'C3: Sliding Window Protocol',
    type: 'C',
    icon: '🪟',
    explanation: 'Flow control protocol. Sender can transmit multiple frames (window size) before waiting for ACK. Receiver acknowledges frames after receiving all frames in window. Higher throughput than Stop-and-Wait.',
    cCode: `#include <stdio.h>
#include <unistd.h>

#define RTT 5
#define WINDOW_SIZE 4

int main() {
    int window_size, num_frames, i, j;
    int frames[50];
    
    printf("===== SLIDING WINDOW PROTOCOL =====\\n\\n");
    printf("Enter window size (default=%d): ", WINDOW_SIZE);
    scanf("%d", &window_size);
    printf("Enter number of frames to send: ");
    scanf("%d", &num_frames);
    
    printf("Enter frame numbers:\\n");
    for (i = 1; i <= num_frames; i++) {
        printf("Frame %d: ", i);
        scanf("%d", &frames[i]);
    }
    
    printf("\\n===== TRANSMISSION PROCESS =====\\n\\n");
    printf("Sending %d frames with window size %d\\n", num_frames, window_size);
    printf("Window can hold: ");
    
    for (i = 1; i <= num_frames; i++) {
        if (i % window_size != 0) {
            printf(" %d", frames[i]);
        } else {
            printf(" %d\\n", frames[i]);
            printf("\\nSender: Waiting for ACK from receiver...\\n");
            sleep(RTT / 2);
            printf("Receiver: Frames received, ACK sent\\n");
            printf("--------------------------------------\\n");
            sleep(RTT / 2);
            printf("Sender: ACK received, sliding window...\\n");
            if (i < num_frames) {
                printf("Sending next window: ");
            }
        }
    }
    
    // Handle remaining frames
    if (num_frames % window_size != 0) {
        printf("\\nSender: Waiting for ACK...\\n");
        sleep(RTT / 2);
        printf("Receiver: Frames received, ACK sent\\n");
        printf("--------------------------------------\\n");
        sleep(RTT / 2);
        printf("Sender: ACK received.\\n");
    }
    
    printf("\\n✓ All frames transmitted successfully!\\n");
    printf("\\nAdvantages over Stop-and-Wait:\\n");
    printf("1. Better throughput (can send multiple frames)\\n");
    printf("2. Pipelining reduces idle time\\n");
    printf("3. Efficiency ≈ 1 (for window_size > 2*a)\\n");
    
    return 0;
}`,
    question: 'What is the main advantage of Sliding Window over Stop-and-Wait?',
    answer: 'Better throughput and efficiency. The sender can transmit multiple frames (up to window size) before waiting for acknowledgment. This pipelining reduces idle time significantly. Efficiency approaches 1 when window size is large enough (window_size > 2*a, where a is propagation delay ratio).'
  },

  {
    id: 'c4',
    title: 'C4: CRC Calculation',
    type: 'C',
    icon: '✓',
    explanation: 'Cyclic Redundancy Check for error detection. Append N-1 zeros to data. Perform polynomial division using XOR. Remainder is CRC checksum.',
    cCode: `#include <stdio.h>
#include <string.h>

#define N strlen(g)

char t[28], cs[28];
char g[] = "1101";
int a, e, c;

void xor_op() {
    for (c = 1; c < (int)N; c++) {
        cs[c] = (cs[c] == g[c]) ? '0' : '1';
    }
}

void crc() {
    for (e = 0; e < (int)N; e++) cs[e] = t[e];
    
    do {
        if (cs[0] == '1') {
            xor_op();
        }
        
        for (c = 0; c < (int)N - 1; c++) {
            cs[c] = cs[c + 1];
        }
        cs[c] = t[e++];
        
    } while (e <= a + (int)N - 1);
    
    cs[c] = '\\0';
}

int main() {
    printf("===== CRC (CYCLIC REDUNDANCY CHECK) CALCULATOR =====\\n\\n");
    
    printf("Enter Data (binary string): ");
    scanf("%s", t);
    printf("Generator Polynomial: %s (length %d)\\n", g, (int)N);
    
    a = strlen(t);
    
    // Append (N-1) zeros
    for (e = a; e < a + (int)N - 1; e++) {
        t[e] = '0';
    }
    t[e] = '\\0';
    
    printf("\\n===== STEP 1: Append %d zeros =====\\n", (int)(N-1));
    printf("Modified data: %s\\n", t);
    
    crc();
    printf("\\n===== STEP 2: Polynomial Division =====\\n");
    printf("Checksum (remainder): %s\\n", cs);
    
    // Append checksum
    for (e = a; e < a + (int)N - 1; e++) {
        t[e] = cs[e - a];
    }
    t[e] = '\\0';
    
    printf("\\n===== STEP 3: Final Codeword =====\\n");
    printf("Data + CRC: %s\\n\\n", t);
    
    int test;
    printf("Test Error Detection? (0=YES, 1=NO): ");
    scanf("%d", &test);
    
    if (test == 0) {
        printf("Enter bit position to flip (1-indexed): ");
        scanf("%d", &e);
        
        if (e > 0 && e <= (int)strlen(t)) {
            t[e - 1] = (t[e - 1] == '0') ? '1' : '0';
            printf("\\n===== STEP 4: Error Injection =====\\n");
            printf("Erroneous Data: %s\\n", t);
            
            crc();
            printf("\\n===== STEP 5: Error Detection =====\\n");
            printf("Checksum at receiver: %s\\n", cs);
            
            int error_detected = 0;
            for (e = 0; e < (int)N - 1; e++) {
                if (cs[e] != '0') {
                    error_detected = 1;
                    break;
                }
            }
            
            if (error_detected) {
                printf("Result: ✗ ERROR DETECTED (non-zero checksum)\\n");
            } else {
                printf("Result: ✓ NO ERROR\\n");
            }
        }
    }
    
    return 0;
}`,
    question: 'How many zeros are appended to data before CRC calculation?',
    answer: 'N-1 zeros are appended, where N is the length of the generator polynomial. For generator "1101" (length 4), append 3 zeros. This allows polynomial division to produce remainder of N-1 bits, which becomes the CRC.'
  },

  {
    id: 'c5',
    title: 'C5: Leaky Bucket Algorithm',
    type: 'C',
    icon: '💧',
    explanation: 'Token-based rate limiter. Packets arrive at variable rates. Bucket has fixed capacity. Packets leak out at fixed rate. Excess packets dropped. Smooths bursty traffic.',
    cCode: `#include <stdio.h>

int min(int x, int y) {
    return (x < y) ? x : y;
}

int main() {
    int imp[25], drop = 0, count = 0, process, mini, cap, nsec, i;
    
    printf("===== LEAKY BUCKET ALGORITHM (TRAFFIC SHAPING) =====\\n\\n");
    printf("Enter bucket capacity (max packets): ");
    scanf("%d", &cap);
    printf("Enter processing rate (packets/second): ");
    scanf("%d", &process);
    printf("Enter number of seconds: ");
    scanf("%d", &nsec);
    
    printf("\\nEnter incoming packets for each second:\\n");
    for (i = 0; i < nsec; i++) {
        printf("Packets at second %d: ", i + 1);
        scanf("%d", &imp[i]);
    }
    
    printf("\\n");
    printf("Second | Received | Sent | In Bucket | Dropped\\n");
    printf("--------------------------------------------------\\n");
    
    for (i = 0; i < nsec; i++) {
        drop = 0;
        
        // Add incoming packets
        count += imp[i];
        
        // Check overflow
        if (count > cap) {
            drop = count - cap;
            count = cap;
        }
        
        // Process packets
        mini = min(count, process);
        count -= mini;
        
        printf("%6d | %8d | %4d | %9d | %7d\\n", 
               i + 1, imp[i], mini, count, drop);
    }
    
    printf("\\nContinue draining bucket...\\n");
    printf("--------------------------------------------------\\n");
    for (; count != 0; i++) {
        drop = 0;
        
        if (count > cap) {
            drop = count - cap;
            count = cap;
        }
        
        mini = min(count, process);
        count -= mini;
        
        printf("%6d | %8d | %4d | %9d | %7d\\n", 
               i + 1, 0, mini, count, drop);
    }
    
    printf("\\n✓ All packets processed!\\n");
    printf("\\nKey Points:\\n");
    printf("- Enforces maximum rate\\n");
    printf("- Smooths bursty traffic\\n");
    printf("- Drops excess packets when bucket overflows\\n");
    
    return 0;
}`,
    question: 'What happens when packets arrive faster than processing rate?',
    answer: 'Packets accumulate in the bucket. If accumulation exceeds bucket capacity, excess packets are dropped. The output maintains constant processing rate, smoothing bursty input into uniform traffic flow. This is ideal for traffic shaping and congestion avoidance.'
  }
];



// ============================================
// RENDERING AND DOM MANIPULATION
// ============================================

function renderContent() {
    const section = document.getElementById('content-section');
    
    const tclPrograms = programs.filter(p => p.type === 'TCL');
    const cPrograms = programs.filter(p => p.type === 'C');
    
    let html = '';
    
    // TCL Section
    html += `<div class="section-header"><span class="section-icon">📡</span><h2>TCL/NS-2 Programs (5 Programs)</h2></div>`;
    tclPrograms.forEach(prog => {
        html += createProgramCard(prog);
    });
    
    // C Section
    html += `<div class="section-header c-section"><span class="section-icon">⚙️</span><h2>C Programs (5 Programs)</h2></div>`;
    cPrograms.forEach(prog => {
        html += createProgramCard(prog);
    });
    
    section.innerHTML = html;
}

function createProgramCard(prog) {
    const cardClass = prog.type === 'TCL' ? 'tcl-card' : 'c-card';
    const labelClass = prog.type === 'TCL' ? 'tcl-label' : 'c-label';
    
    let codeContent = '';
    
    if (prog.type === 'TCL') {
        codeContent = `
            <div class="code-container">
                <div class="code-header">
                    <div class="code-type">TCL Code</div>
                </div>
                <div class="code-box">
                    <pre>${escapeHtml(prog.tclCode)}</pre>
                </div>
            </div>
            <div class="code-container">
                <div class="code-header">
                    <div class="code-type">AWK Code</div>
                </div>
                <div class="code-box">
                    <pre>${escapeHtml(prog.awkCode)}</pre>
                </div>
            </div>
        `;
    } else {
        codeContent = `
            <div class="code-container">
                <div class="code-header">
                    <div class="code-type">C Code</div>
                </div>
                <div class="code-box">
                    <pre>${escapeHtml(prog.cCode)}</pre>
                </div>
            </div>
        `;
    }
    
    return `
    <div class="program-card ${cardClass}" id="card-${prog.id}">
        <div class="program-header" onclick="toggleProgram('${prog.id}')">
            <div class="program-title">
                <h3>${prog.title}</h3>
                <span class="program-label ${labelClass}">${prog.type}</span>
            </div>
            <span class="expand-icon">▼</span>
        </div>
        <div class="program-content" id="${prog.id}">
            <div class="explanation">
                <h4>💡 Concept</h4>
                <p>${prog.explanation}</p>
            </div>
            ${codeContent}
            <div class="quiz-section">
                <h4>❓ Quick Check</h4>
                <p class="quiz-question">${prog.question}</p>
                <button class="btn btn-primary" onclick="toggleHint('hint-${prog.id}')">Show Answer</button>
                <div class="quiz-hint" id="hint-${prog.id}">
                    <strong>Answer:</strong> ${prog.answer}
                </div>
            </div>
        </div>
    </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// EVENT HANDLERS
// ============================================

function toggleProgram(id) {
    const content = document.getElementById(id);
    const card = document.getElementById(`card-${id}`);
    content.classList.toggle('show');
    card.classList.toggle('expanded');
}

function toggleHint(id) {
    document.getElementById(id).classList.toggle('show');
}

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'dark';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('[onclick="toggleTheme()"]').textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

function toggleToolsPanel() {
    document.getElementById('toolsPanel').classList.toggle('open');
    document.getElementById('panelOverlay').classList.toggle('active');
}

function applyDisplayOptions() {
    const showCode = document.getElementById('showCode').checked;
    const showExplanations = document.getElementById('showExplanations').checked;
    const showQuestions = document.getElementById('showQuestions').checked;
    
    document.querySelectorAll('.code-container').forEach(el => {
        el.style.display = showCode ? 'block' : 'none';
    });
    
    document.querySelectorAll('.explanation').forEach(el => {
        el.style.display = showExplanations ? 'block' : 'none';
    });
    
    document.querySelectorAll('.quiz-section').forEach(el => {
        el.style.display = showQuestions ? 'block' : 'none';
    });
}

function applyVivaOptions() {
    const showAnswers = document.getElementById('showVivaAnswers').checked;
    document.querySelectorAll('.quiz-hint').forEach(hint => {
        showAnswers ? hint.classList.add('show') : hint.classList.remove('show');
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: Toggle Tools Panel
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleToolsPanel();
    }
    
    // Esc: Close Tools Panel
    if (e.key === 'Escape') {
        const panel = document.getElementById('toolsPanel');
        if (panel.classList.contains('open')) {
            toggleToolsPanel();
        }
    }
    
    // Ctrl/Cmd + T: Toggle Theme
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
});

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    console.log('Network Programming Study Companion loaded successfully!');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelector('[onclick="toggleTheme()"]').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    // Render all content from JS data
    renderContent();
    
    // Initialize display options
    applyDisplayOptions();
    applyVivaOptions();
});