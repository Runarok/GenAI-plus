const ALGORITHM_CONTENT = {
  fifo: {
    title: 'FIFO (First In First Out)',
    strategy: 'FIFO replaces the page that has been in memory the longest, regardless of how recently or frequently it has been used. It maintains a simple queue structure where pages are added to the rear and removed from the front.',
    howItWorks: [
      'When a page fault occurs and all frames are occupied, remove the page at the front of the queue',
      'Add the new page to the rear of the queue',
      'The queue maintains the order in which pages were loaded into memory'
    ],
    example: {
      referenceString: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1',
      frames: 3,
      steps: [
        { step: 1, page: 7, frame1: 7, frame2: '-', frame3: '-', status: 'FAULT', explanation: 'First page, goes to empty frame 1' },
        { step: 2, page: 0, frame1: 7, frame2: 0, frame3: '-', status: 'FAULT', explanation: 'Second page, goes to empty frame 2' },
        { step: 3, page: 1, frame1: 7, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Third page, goes to empty frame 3' },
        { step: 4, page: 2, frame1: 2, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Replace page 7 (oldest in queue) with page 2' },
        { step: 5, page: 0, frame1: 2, frame2: 0, frame3: 1, status: 'HIT', explanation: 'Page 0 already in memory' },
        { step: 6, page: 3, frame1: 2, frame2: 3, frame3: 1, status: 'FAULT', explanation: 'Replace page 0 (oldest in queue) with page 3' },
        { step: 7, page: 0, frame1: 2, frame2: 3, frame3: 0, status: 'FAULT', explanation: 'Replace page 1 (oldest in queue) with page 0' },
        { step: 8, page: 4, frame1: 4, frame2: 3, frame3: 0, status: 'FAULT', explanation: 'Replace page 2 (oldest in queue) with page 4' },
        { step: 9, page: 2, frame1: 4, frame2: 2, frame3: 0, status: 'FAULT', explanation: 'Replace page 3 (oldest in queue) with page 2' },
        { step: 10, page: 3, frame1: 4, frame2: 2, frame3: 3, status: 'FAULT', explanation: 'Replace page 0 (oldest in queue) with page 3' }
      ]
    },
    advantages: [
      'Simple to implement and understand',
      'Low overhead - only requires tracking insertion order',
      'Fair allocation - each page gets equal time in memory'
    ],
    disadvantages: [
      'Suffers from Belady\'s Anomaly (more frames can lead to more page faults)',
      'Ignores page usage patterns and frequency',
      'May remove frequently used pages simply because they\'re old',
      'Generally poor performance compared to other algorithms'
    ]
  },
  lru: {
    title: 'LRU (Least Recently Used)',
    strategy: 'LRU replaces the page that hasn\'t been accessed for the longest time. It\'s based on the principle of temporal locality - if a page was recently accessed, it\'s likely to be accessed again soon.',
    howItWorks: [
      'Track the last access time for each page in memory',
      'When a page is accessed (hit), update its access time to current',
      'When a page fault occurs, replace the page with the oldest access time',
      'Add the new page with current access time'
    ],
    example: {
      referenceString: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1',
      frames: 3,
      steps: [
        { step: 1, page: 7, frame1: 7, frame2: '-', frame3: '-', status: 'FAULT', explanation: 'First page, goes to empty frame 1' },
        { step: 2, page: 0, frame1: 7, frame2: 0, frame3: '-', status: 'FAULT', explanation: 'Second page, goes to empty frame 2' },
        { step: 3, page: 1, frame1: 7, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Third page, goes to empty frame 3' },
        { step: 4, page: 2, frame1: 2, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Replace page 7 (least recently used) with page 2' },
        { step: 5, page: 0, frame1: 2, frame2: 0, frame3: 1, status: 'HIT', explanation: 'Page 0 found, update its access time' },
        { step: 6, page: 3, frame1: 2, frame2: 0, frame3: 3, status: 'FAULT', explanation: 'Replace page 1 (least recently used) with page 3' },
        { step: 7, page: 0, frame1: 2, frame2: 0, frame3: 3, status: 'HIT', explanation: 'Page 0 found, update its access time' },
        { step: 8, page: 4, frame1: 4, frame2: 0, frame3: 3, status: 'FAULT', explanation: 'Replace page 2 (least recently used) with page 4' },
        { step: 9, page: 2, frame1: 4, frame2: 2, frame3: 3, status: 'FAULT', explanation: 'Replace page 0 (least recently used) with page 2' },
        { step: 10, page: 3, frame1: 4, frame2: 2, frame3: 3, status: 'HIT', explanation: 'Page 3 found, update its access time' }
      ]
    },
    implementationMethods: [
      'Counter Method: Each page has a counter incremented on access',
      'Stack Method: Maintain a stack of page numbers, move accessed page to top',
      'Matrix Method: Use a matrix to track relative access order'
    ],
    advantages: [
      'Good approximation of optimal algorithm',
      'Exploits temporal locality effectively',
      'Generally performs well in practice',
      'No Belady\'s Anomaly'
    ],
    disadvantages: [
      'Higher implementation complexity',
      'Requires additional hardware support or software overhead',
      'May need to update access information on every memory reference'
    ]
  },
  optimal: {
    title: 'Optimal Algorithm (Belady\'s Algorithm)',
    strategy: 'The Optimal algorithm replaces the page that will not be used for the longest period in the future. It provides the theoretical minimum number of page faults for any given reference string.',
    howItWorks: [
      'When a page fault occurs, examine all pages currently in memory',
      'For each page, find when it will next be referenced in the future',
      'Replace the page that will be referenced furthest in the future',
      'If a page is never referenced again, replace it immediately'
    ],
    example: {
      referenceString: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1',
      frames: 3,
      steps: [
        { step: 1, page: 7, frame1: 7, frame2: '-', frame3: '-', status: 'FAULT', explanation: 'First page, goes to empty frame 1' },
        { step: 2, page: 0, frame1: 7, frame2: 0, frame3: '-', status: 'FAULT', explanation: 'Second page, goes to empty frame 2' },
        { step: 3, page: 1, frame1: 7, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Third page, goes to empty frame 3' },
        { step: 4, page: 2, frame1: 2, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Replace page 7 (next used at step 18, distance: 14) with page 2' },
        { step: 5, page: 0, frame1: 2, frame2: 0, frame3: 1, status: 'HIT', explanation: 'Page 0 already in memory' },
        { step: 6, page: 3, frame1: 2, frame2: 0, frame3: 3, status: 'FAULT', explanation: 'Replace page 1 (next used at step 14, distance: 8) with page 3' },
        { step: 7, page: 0, frame1: 2, frame2: 0, frame3: 3, status: 'HIT', explanation: 'Page 0 already in memory' },
        { step: 8, page: 4, frame1: 2, frame2: 4, frame3: 3, status: 'FAULT', explanation: 'Replace page 0 (next used at step 11, distance: 3) with page 4' },
        { step: 9, page: 2, frame1: 2, frame2: 4, frame3: 3, status: 'HIT', explanation: 'Page 2 already in memory' },
        { step: 10, page: 3, frame1: 2, frame2: 4, frame3: 3, status: 'HIT', explanation: 'Page 3 already in memory' }
      ]
    },
    lookaheadAnalysis: 'At each replacement decision, the algorithm analyzes future references: For example, at step 6 when page 3 needs to be loaded, it examines when pages 2, 0, and 1 will next be used. Page 2 is next used at step 9 (distance: 3), page 0 at step 7 (distance: 1), and page 1 at step 14 (distance: 8). Since page 1 has the longest future distance, it gets replaced.',
    advantages: [
      'Guarantees minimum number of page faults',
      'Provides theoretical benchmark for other algorithms',
      'Useful for algorithm analysis and comparison',
      'No Belady\'s Anomaly'
    ],
    disadvantages: [
      'Impossible to implement in practice (requires future knowledge)',
      'Only useful for theoretical analysis and simulation',
      'Cannot predict future page references in real systems'
    ],
    practicalApplications: [
      'Benchmark for evaluating other algorithms',
      'Theoretical analysis of memory management',
      'Algorithm research and development',
      'Performance upper bound estimation'
    ]
  }
};