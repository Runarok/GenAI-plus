"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play } from "lucide-react"
import type { Algorithm } from "@/types/scheduling"

interface AlgorithmSelectorProps {
  selectedAlgorithm: Algorithm
  onAlgorithmChange: (algorithm: Algorithm) => void
  timeQuantum: number
  onTimeQuantumChange: (quantum: number) => void
  onRunAlgorithm: () => void
  disabled: boolean
}

export function AlgorithmSelector({
  selectedAlgorithm,
  onAlgorithmChange,
  timeQuantum,
  onTimeQuantumChange,
  onRunAlgorithm,
  disabled,
}: AlgorithmSelectorProps) {
  const algorithms: { value: Algorithm; label: string }[] = [
    { value: "FIFO", label: "FIFO (First In First Out)" },
    { value: "RR", label: "Round Robin" },
    { value: "SJF", label: "SJF (Shortest Job First)" },
    { value: "SRJF", label: "SRJF (Shortest Remaining Job First)" },
    { value: "PP", label: "Preemptive Priority" },
    { value: "NPP", label: "Non-preemptive Priority" },
  ]

  return (
    <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
        <CardTitle className="text-cyan-400 text-xl font-semibold">Algorithm Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Scheduling Algorithm</label>
          <Select value={selectedAlgorithm} onValueChange={onAlgorithmChange}>
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {algorithms.map((algo) => (
                <SelectItem
                  key={algo.value}
                  value={algo.value}
                  className="text-white hover:bg-slate-700 focus:bg-slate-700"
                >
                  {algo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAlgorithm === "RR" && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Time Quantum</label>
            <Input
              type="number"
              min="1"
              value={timeQuantum}
              onChange={(e) => onTimeQuantumChange(Number.parseInt(e.target.value) || 1)}
              className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>
        )}

        <Button
          onClick={onRunAlgorithm}
          disabled={disabled}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 shadow-lg"
        >
          <Play className="w-4 h-4 mr-2" />
          Run Algorithm
        </Button>
      </CardContent>
    </Card>
  )
}
