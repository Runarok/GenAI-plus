"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GanttEntry } from "@/types/scheduling"

interface GanttChartProps {
  ganttData: GanttEntry[]
}

export function GanttChart({ ganttData }: GanttChartProps) {
  const colors = [
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-lime-500",
  ]

  const processColors: { [key: string]: string } = {}
  let colorIndex = 0

  // Assign colors to processes
  ganttData.forEach((entry) => {
    if (!processColors[entry.processId]) {
      processColors[entry.processId] = colors[colorIndex % colors.length]
      colorIndex++
    }
  })

  const maxTime = Math.max(...ganttData.map((entry) => entry.endTime))
  const minTime = Math.min(...ganttData.map((entry) => entry.startTime))

  // Limit chart width and calculate proportional sizing
  const maxChartWidth = 600
  const cellWidth = Math.min(40, maxChartWidth / (maxTime - minTime + 1))
  const totalWidth = (maxTime - minTime) * cellWidth

  // Get unique time points (start and end times only)
  const timePoints = Array.from(
    new Set([minTime, ...ganttData.flatMap((entry) => [entry.startTime, entry.endTime]), maxTime]),
  ).sort((a, b) => a - b)

  return (
    <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
        <CardTitle className="text-cyan-400 text-xl font-semibold text-center">Gantt Chart</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Process Legend */}
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(processColors).map(([processId, color]) => (
              <div key={processId} className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                <div className={`w-4 h-4 rounded ${color} shadow-sm`}></div>
                <span className="text-sm text-slate-300 font-medium">{processId}</span>
              </div>
            ))}
          </div>

          {/* Gantt Chart */}
          <div className="flex justify-center">
            <div style={{ width: Math.min(totalWidth, maxChartWidth) }} className="relative">
              {/* Start and End Time Markers */}
              <div className="flex justify-between mb-2 px-2">
                <div className="text-sm text-slate-400 font-medium">{minTime}</div>
                <div className="text-sm text-slate-400 font-medium">{maxTime}</div>
              </div>

              {/* Process execution timeline */}
              <div className="relative h-16 bg-slate-700/30 rounded-lg border border-slate-600 overflow-hidden">
                {ganttData.map((entry, index) => {
                  const startPos = ((entry.startTime - minTime) / (maxTime - minTime)) * 100
                  const width = ((entry.endTime - entry.startTime) / (maxTime - minTime)) * 100

                  return (
                    <div
                      key={index}
                      className={`absolute h-full ${processColors[entry.processId]} flex items-center justify-center text-white text-sm font-semibold border-r border-slate-800 shadow-sm transition-all hover:brightness-110`}
                      style={{
                        left: `${startPos}%`,
                        width: `${width}%`,
                      }}
                      title={`${entry.processId}: ${entry.startTime} - ${entry.endTime}`}
                    >
                      {width > 8 ? entry.processId : ""}
                    </div>
                  )
                })}
              </div>

              {/* Time markers for key points */}
              <div className="relative mt-2 h-6">
                {timePoints.map((time, index) => (
                  <div
                    key={index}
                    className="absolute text-xs text-slate-400 font-medium"
                    style={{
                      left: `${((time - minTime) / (maxTime - minTime)) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Execution sequence */}
          <div className="text-center">
            <div className="inline-block bg-slate-700/50 px-4 py-3 rounded-lg border border-slate-600">
              <span className="text-sm text-slate-300 font-medium">Execution Sequence: </span>
              <span className="text-white font-semibold">
                {ganttData.map((entry, index) => (
                  <span key={index} className="text-cyan-400">
                    {entry.processId}
                    {index < ganttData.length - 1 ? <span className="text-slate-400 mx-1">→</span> : ""}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* Timeline details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ganttData.map((entry, index) => (
              <div key={index} className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/50 text-center">
                <div className={`inline-block w-3 h-3 rounded ${processColors[entry.processId]} mr-2`}></div>
                <span className="text-white font-medium">{entry.processId}</span>
                <span className="text-slate-400 text-sm ml-2">
                  ({entry.startTime} - {entry.endTime})
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
