import type { Process, GanttEntry, SchedulingResult, Algorithm } from "@/types/scheduling"

export function runSchedulingAlgorithm(processes: Process[], algorithm: Algorithm, timeQuantum = 2): SchedulingResult {
  const processesCopy = processes.map((p) => ({ ...p, remainingTime: p.burstTime }))

  let result: SchedulingResult

  switch (algorithm) {
    case "FIFO":
      result = fifoScheduling(processesCopy)
      break
    case "RR":
      result = roundRobinScheduling(processesCopy, timeQuantum)
      break
    case "SJF":
      result = sjfScheduling(processesCopy)
      break
    case "SRJF":
      result = srjfScheduling(processesCopy)
      break
    case "PP":
      result = preemptivePriorityScheduling(processesCopy)
      break
    case "NPP":
      result = nonPreemptivePriorityScheduling(processesCopy)
      break
    default:
      result = fifoScheduling(processesCopy)
  }

  return result
}

function fifoScheduling(processes: Process[]): SchedulingResult {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
  const ganttChart: GanttEntry[] = []
  let currentTime = 0

  sortedProcesses.forEach((process) => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime
    }

    const startTime = currentTime
    const endTime = currentTime + process.burstTime

    ganttChart.push({
      processId: process.id,
      startTime,
      endTime,
    })

    process.completionTime = endTime
    process.turnaroundTime = process.completionTime - process.arrivalTime
    process.waitingTime = process.turnaroundTime - process.burstTime

    currentTime = endTime
  })

  return {
    algorithm: "FIFO",
    processes: sortedProcesses,
    ganttChart,
    averages: calculateAverages(sortedProcesses),
  }
}

function roundRobinScheduling(processes: Process[], timeQuantum: number): SchedulingResult {
  const queue: Process[] = []
  const ganttChart: GanttEntry[] = []
  let currentTime = 0
  let processIndex = 0
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
  const completed: Process[] = []

  // Initialize remaining time for all processes
  sortedProcesses.forEach((p) => (p.remainingTime = p.burstTime))

  while (completed.length < sortedProcesses.length) {
    // Add newly arrived processes to queue
    while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrivalTime <= currentTime) {
      queue.push(sortedProcesses[processIndex])
      processIndex++
    }

    if (queue.length === 0) {
      // No process in queue, jump to next arrival time
      if (processIndex < sortedProcesses.length) {
        currentTime = sortedProcesses[processIndex].arrivalTime
        queue.push(sortedProcesses[processIndex])
        processIndex++
      }
    }

    if (queue.length > 0) {
      const currentProcess = queue.shift()!
      const startTime = currentTime
      const executionTime = Math.min(timeQuantum, currentProcess.remainingTime!)

      currentTime += executionTime
      currentProcess.remainingTime! -= executionTime

      ganttChart.push({
        processId: currentProcess.id,
        startTime,
        endTime: currentTime,
      })

      // Add newly arrived processes to queue (after current process execution)
      while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrivalTime <= currentTime) {
        queue.push(sortedProcesses[processIndex])
        processIndex++
      }

      if (currentProcess.remainingTime! > 0) {
        // Process not finished, add back to queue
        queue.push(currentProcess)
      } else {
        // Process completed
        currentProcess.completionTime = currentTime
        currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime
        currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime
        completed.push(currentProcess)
      }
    }
  }

  return {
    algorithm: "Round Robin",
    processes: completed,
    ganttChart,
    averages: calculateAverages(completed),
  }
}

function sjfScheduling(processes: Process[]): SchedulingResult {
  const ganttChart: GanttEntry[] = []
  const completed: Process[] = []
  const remaining = [...processes]
  let currentTime = 0

  while (remaining.length > 0) {
    const available = remaining.filter((p) => p.arrivalTime <= currentTime)

    if (available.length === 0) {
      currentTime = Math.min(...remaining.map((p) => p.arrivalTime))
      continue
    }

    const shortest = available.reduce((min, p) => (p.burstTime < min.burstTime ? p : min))

    const startTime = currentTime
    const endTime = currentTime + shortest.burstTime

    ganttChart.push({
      processId: shortest.id,
      startTime,
      endTime,
    })

    shortest.completionTime = endTime
    shortest.turnaroundTime = shortest.completionTime - shortest.arrivalTime
    shortest.waitingTime = shortest.turnaroundTime - shortest.burstTime

    completed.push(shortest)
    remaining.splice(remaining.indexOf(shortest), 1)
    currentTime = endTime
  }

  return {
    algorithm: "SJF (Non-preemptive)",
    processes: completed,
    ganttChart,
    averages: calculateAverages(completed),
  }
}

function srjfScheduling(processes: Process[]): SchedulingResult {
  const ganttChart: GanttEntry[] = []
  const completed: Process[] = []
  const remaining = [...processes]
  let currentTime = 0

  while (remaining.length > 0) {
    const available = remaining.filter((p) => p.arrivalTime <= currentTime)

    if (available.length === 0) {
      currentTime = Math.min(...remaining.map((p) => p.arrivalTime))
      continue
    }

    const shortest = available.reduce((min, p) => (p.remainingTime! < min.remainingTime! ? p : min))

    const startTime = currentTime
    currentTime++
    shortest.remainingTime!--

    // Check if this is a continuation or new execution
    if (
      ganttChart.length > 0 &&
      ganttChart[ganttChart.length - 1].processId === shortest.id &&
      ganttChart[ganttChart.length - 1].endTime === startTime
    ) {
      ganttChart[ganttChart.length - 1].endTime = currentTime
    } else {
      ganttChart.push({
        processId: shortest.id,
        startTime,
        endTime: currentTime,
      })
    }

    if (shortest.remainingTime === 0) {
      shortest.completionTime = currentTime
      shortest.turnaroundTime = shortest.completionTime - shortest.arrivalTime
      shortest.waitingTime = shortest.turnaroundTime - shortest.burstTime
      completed.push(shortest)
      remaining.splice(remaining.indexOf(shortest), 1)
    }
  }

  return {
    algorithm: "SRJF (Preemptive)",
    processes: completed,
    ganttChart,
    averages: calculateAverages(completed),
  }
}

function preemptivePriorityScheduling(processes: Process[]): SchedulingResult {
  const ganttChart: GanttEntry[] = []
  const completed: Process[] = []
  const remaining = [...processes]
  let currentTime = 0

  while (remaining.length > 0) {
    const available = remaining.filter((p) => p.arrivalTime <= currentTime)

    if (available.length === 0) {
      currentTime = Math.min(...remaining.map((p) => p.arrivalTime))
      continue
    }

    const highest = available.reduce((max, p) => (p.priority > max.priority ? p : max))

    const startTime = currentTime
    currentTime++
    highest.remainingTime!--

    // Check if this is a continuation or new execution
    if (
      ganttChart.length > 0 &&
      ganttChart[ganttChart.length - 1].processId === highest.id &&
      ganttChart[ganttChart.length - 1].endTime === startTime
    ) {
      ganttChart[ganttChart.length - 1].endTime = currentTime
    } else {
      ganttChart.push({
        processId: highest.id,
        startTime,
        endTime: currentTime,
      })
    }

    if (highest.remainingTime === 0) {
      highest.completionTime = currentTime
      highest.turnaroundTime = highest.completionTime - highest.arrivalTime
      highest.waitingTime = highest.turnaroundTime - highest.burstTime
      completed.push(highest)
      remaining.splice(remaining.indexOf(highest), 1)
    }
  }

  return {
    algorithm: "Preemptive Priority",
    processes: completed,
    ganttChart,
    averages: calculateAverages(completed),
  }
}

function nonPreemptivePriorityScheduling(processes: Process[]): SchedulingResult {
  const ganttChart: GanttEntry[] = []
  const completed: Process[] = []
  const remaining = [...processes]
  let currentTime = 0

  while (remaining.length > 0) {
    const available = remaining.filter((p) => p.arrivalTime <= currentTime)

    if (available.length === 0) {
      currentTime = Math.min(...remaining.map((p) => p.arrivalTime))
      continue
    }

    const highest = available.reduce((max, p) => (p.priority > max.priority ? p : max))

    const startTime = currentTime
    const endTime = currentTime + highest.burstTime

    ganttChart.push({
      processId: highest.id,
      startTime,
      endTime,
    })

    highest.completionTime = endTime
    highest.turnaroundTime = highest.completionTime - highest.arrivalTime
    highest.waitingTime = highest.turnaroundTime - highest.burstTime

    completed.push(highest)
    remaining.splice(remaining.indexOf(highest), 1)
    currentTime = endTime
  }

  return {
    algorithm: "Non-preemptive Priority",
    processes: completed,
    ganttChart,
    averages: calculateAverages(completed),
  }
}

function calculateAverages(processes: Process[]) {
  const n = processes.length
  const avgCompletionTime = processes.reduce((sum, p) => sum + p.completionTime!, 0) / n
  const avgTurnaroundTime = processes.reduce((sum, p) => sum + p.turnaroundTime!, 0) / n
  const avgWaitingTime = processes.reduce((sum, p) => sum + p.waitingTime!, 0) / n

  return {
    avgCompletionTime,
    avgTurnaroundTime,
    avgWaitingTime,
  }
}
