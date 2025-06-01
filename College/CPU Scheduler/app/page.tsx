"use client"

import { useState } from "react"
import { ProcessForm } from "@/components/process-form"
import { AlgorithmSelector } from "@/components/algorithm-selector"
import { ResultsTable } from "@/components/results-table"
import { GanttChart } from "@/components/gantt-chart"
import type { Process, SchedulingResult, Algorithm } from "@/types/scheduling"
import { runSchedulingAlgorithm } from "@/lib/scheduling-algorithms"

export default function CPUScheduler() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>("FIFO")
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [results, setResults] = useState<SchedulingResult | null>(null)

  const handleProcessesChange = (newProcesses: Process[]) => {
    setProcesses(newProcesses)
    if (newProcesses.length === 0) {
      setResults(null)
    } else if (results) {
      // Recalculate if we already have results
      const newResult = runSchedulingAlgorithm(newProcesses, selectedAlgorithm, timeQuantum)
      setResults(newResult)
    }
  }

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm)
    if (processes.length > 0 && results) {
      // Automatically recalculate when algorithm changes
      const newResult = runSchedulingAlgorithm(processes, algorithm, timeQuantum)
      setResults(newResult)
    }
  }

  const handleTimeQuantumChange = (quantum: number) => {
    setTimeQuantum(quantum)
    if (processes.length > 0 && results && selectedAlgorithm === "RR") {
      // Recalculate for Round Robin when time quantum changes
      const newResult = runSchedulingAlgorithm(processes, selectedAlgorithm, quantum)
      setResults(newResult)
    }
  }

  const handleRunAlgorithm = () => {
    if (processes.length === 0) return

    const result = runSchedulingAlgorithm(processes, selectedAlgorithm, timeQuantum)
    setResults(result)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
            CPU Scheduling Simulator
          </h1>
          <p className="text-slate-300 text-lg">Simulate and visualize different CPU scheduling algorithms</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <ProcessForm processes={processes} onProcessesChange={handleProcessesChange} />

            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={handleAlgorithmChange}
              timeQuantum={timeQuantum}
              onTimeQuantumChange={handleTimeQuantumChange}
              onRunAlgorithm={handleRunAlgorithm}
              disabled={processes.length === 0}
            />
          </div>

          <div className="space-y-6">
            {results && (
              <div className="space-y-6">
                <ResultsTable results={results} />
                <GanttChart ganttData={results.ganttChart} />
              </div>
            )}
            {!results && processes.length > 0 && (
              <div className="flex items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-lg">Click "Run Algorithm" to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
