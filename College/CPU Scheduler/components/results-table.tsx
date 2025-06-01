"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SchedulingResult } from "@/types/scheduling"

interface ResultsTableProps {
  results: SchedulingResult
}

export function ResultsTable({ results }: ResultsTableProps) {
  const { processes, averages } = results

  return (
    <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
        <CardTitle className="text-cyan-400 text-xl font-semibold text-center">Results - {results.algorithm}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-center p-3 text-slate-300 font-semibold">Process</th>
                <th className="text-center p-3 text-slate-300 font-semibold">AT</th>
                <th className="text-center p-3 text-slate-300 font-semibold">BT</th>
                <th className="text-center p-3 text-slate-300 font-semibold">Priority</th>
                <th className="text-center p-3 text-slate-300 font-semibold">CT</th>
                <th className="text-center p-3 text-slate-300 font-semibold">TAT</th>
                <th className="text-center p-3 text-slate-300 font-semibold">WT</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="p-3 font-semibold text-cyan-400 text-center">{process.id}</td>
                  <td className="p-3 text-center text-white">{process.arrivalTime}</td>
                  <td className="p-3 text-center text-white">{process.burstTime}</td>
                  <td className="p-3 text-center text-white">{process.priority}</td>
                  <td className="p-3 text-center text-white font-medium">{process.completionTime}</td>
                  <td className="p-3 text-center text-white font-medium">{process.turnaroundTime}</td>
                  <td className="p-3 text-center text-white font-medium">{process.waitingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border border-emerald-500/30 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">{averages.avgCompletionTime.toFixed(2)}</div>
            <div className="text-sm text-slate-300 font-medium">Avg Completion Time</div>
          </div>
          <div className="bg-gradient-to-br from-amber-600/20 to-amber-700/20 border border-amber-500/30 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-amber-400 mb-1">{averages.avgTurnaroundTime.toFixed(2)}</div>
            <div className="text-sm text-slate-300 font-medium">Avg Turnaround Time</div>
          </div>
          <div className="bg-gradient-to-br from-rose-600/20 to-rose-700/20 border border-rose-500/30 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-rose-400 mb-1">{averages.avgWaitingTime.toFixed(2)}</div>
            <div className="text-sm text-slate-300 font-medium">Avg Waiting Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
