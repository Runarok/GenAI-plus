export interface Process {
  id: string
  burstTime: number
  arrivalTime: number
  priority: number
  completionTime?: number
  turnaroundTime?: number
  waitingTime?: number
  remainingTime?: number
}

export interface GanttEntry {
  processId: string
  startTime: number
  endTime: number
}

export interface SchedulingResult {
  algorithm: string
  processes: Process[]
  ganttChart: GanttEntry[]
  averages: {
    avgCompletionTime: number
    avgTurnaroundTime: number
    avgWaitingTime: number
  }
}

export type Algorithm = "FIFO" | "RR" | "SJF" | "SRJF" | "PP" | "NPP"
