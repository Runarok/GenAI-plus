"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import type { Process } from "@/types/scheduling"

interface ProcessFormProps {
  processes: Process[]
  onProcessesChange: (processes: Process[]) => void
}

export function ProcessForm({ processes, onProcessesChange }: ProcessFormProps) {
  const [newProcess, setNewProcess] = useState({
    burstTime: "",
    arrivalTime: "",
    priority: "",
  })

  const addProcess = () => {
    if (!newProcess.burstTime || !newProcess.arrivalTime || !newProcess.priority) {
      return
    }

    const process: Process = {
      id: `P${processes.length + 1}`,
      burstTime: Number.parseInt(newProcess.burstTime),
      arrivalTime: Number.parseInt(newProcess.arrivalTime),
      priority: Number.parseInt(newProcess.priority),
    }

    onProcessesChange([...processes, process])
    setNewProcess({ burstTime: "", arrivalTime: "", priority: "" })
  }

  const removeProcess = (index: number) => {
    const updatedProcesses = processes.filter((_, i) => i !== index)
    onProcessesChange(updatedProcesses)
  }

  const clearAll = () => {
    onProcessesChange([])
  }

  return (
    <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
        <CardTitle className="text-cyan-400 text-xl font-semibold">Process Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Burst Time</label>
            <Input
              type="number"
              min="1"
              value={newProcess.burstTime}
              onChange={(e) => setNewProcess((prev) => ({ ...prev, burstTime: e.target.value }))}
              className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
              placeholder="BT"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Arrival Time</label>
            <Input
              type="number"
              min="0"
              value={newProcess.arrivalTime}
              onChange={(e) => setNewProcess((prev) => ({ ...prev, arrivalTime: e.target.value }))}
              className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
              placeholder="AT"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
            <Input
              type="number"
              min="1"
              value={newProcess.priority}
              onChange={(e) => setNewProcess((prev) => ({ ...prev, priority: e.target.value }))}
              className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
              placeholder="Priority"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={addProcess}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 flex-1 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Process
          </Button>
          {processes.length > 0 && (
            <Button
              onClick={clearAll}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              Clear All
            </Button>
          )}
        </div>

        {processes.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-300">Current Processes:</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {processes.map((process, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg border border-slate-600/50"
                >
                  <div className="flex gap-6 text-sm">
                    <span className="font-semibold text-cyan-400 min-w-[2rem]">{process.id}</span>
                    <span className="text-slate-300">
                      BT: <span className="text-white font-medium">{process.burstTime}</span>
                    </span>
                    <span className="text-slate-300">
                      AT: <span className="text-white font-medium">{process.arrivalTime}</span>
                    </span>
                    <span className="text-slate-300">
                      Priority: <span className="text-white font-medium">{process.priority}</span>
                    </span>
                  </div>
                  <Button
                    onClick={() => removeProcess(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
