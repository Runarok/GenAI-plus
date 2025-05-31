"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState("")
  const [operation, setOperation] = useState("")
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG")
  const [memory, setMemory] = useState(0)

  // Convert degrees to radians if needed
  const toRadians = (value: number) => {
    return angleMode === "DEG" ? (value * Math.PI) / 180 : value
  }

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === "") {
      setPreviousValue(String(inputValue))
    } else if (operation) {
      const currentValue = Number.parseFloat(previousValue)
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(String(newValue))
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : "Error"
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== "" && operation) {
      const currentValue = Number.parseFloat(previousValue)
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue("")
      setOperation("")
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue("")
    setOperation("")
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const toggleAngleMode = () => {
    setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")
  }

  const performScientificOperation = (op: string) => {
    const value = Number.parseFloat(display)
    let result: number | string

    try {
      switch (op) {
        case "sin":
          result = Math.sin(toRadians(value))
          break
        case "cos":
          result = Math.cos(toRadians(value))
          break
        case "tan":
          result = Math.tan(toRadians(value))
          break
        case "ln":
          result = Math.log(value)
          break
        case "log":
          result = Math.log10(value)
          break
        case "sqrt":
          result = Math.sqrt(value)
          break
        case "square":
          result = value * value
          break
        case "cube":
          result = value * value * value
          break
        case "1/x":
          result = 1 / value
          break
        case "pi":
          result = Math.PI
          break
        case "e":
          result = Math.E
          break
        case "%":
          result = value / 100
          break
        default:
          result = value
      }

      // Format the result to avoid extremely small numbers
      if (typeof result === "number") {
        if (Math.abs(result) < 1e-10) {
          result = 0
        }
        result = Number.parseFloat(result.toPrecision(10)).toString()
      }

      setDisplay(String(result))
      setWaitingForOperand(true)
    } catch (error) {
      setDisplay("Error")
      setWaitingForOperand(true)
    }
  }

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay("0")
    }
  }

  // Memory functions
  const memoryAdd = () => {
    setMemory(memory + Number.parseFloat(display))
  }

  const memorySubtract = () => {
    setMemory(memory - Number.parseFloat(display))
  }

  const memoryRecall = () => {
    setDisplay(String(memory))
    setWaitingForOperand(true)
  }

  const memoryClear = () => {
    setMemory(0)
  }

  // Button component for consistent styling
  const CalcButton = ({
    children,
    onClick,
    className,
    variant = "default",
  }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: "default" | "number" | "operation" | "function" | "memory" | "equals"
  }) => {
    const baseStyles = "h-14 text-center font-medium transition-all duration-150 active:scale-95"

    const variantStyles = {
      default: "bg-gray-800 text-gray-200 hover:bg-gray-700",
      number: "bg-gray-700 text-white hover:bg-gray-600",
      operation: "bg-amber-800/70 text-amber-100 hover:bg-amber-700/80",
      function: "bg-indigo-900/60 text-indigo-100 hover:bg-indigo-800/70",
      memory: "bg-teal-900/60 text-teal-100 hover:bg-teal-800/70",
      equals: "bg-blue-600 text-white hover:bg-blue-500",
    }

    return (
      <Button variant="ghost" onClick={onClick} className={cn(baseStyles, variantStyles[variant], className)}>
        {children}
      </Button>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black border border-gray-700/50 rounded-2xl p-5 shadow-2xl">
        {/* Display */}
        <div className="mb-4">
          <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-4">
            <div className="text-right">
              <div className="text-gray-400 text-xs h-4 mb-1 flex justify-between items-center">
                <span className="text-teal-400">{memory !== 0 && "M"}</span>
                <span>{previousValue && operation && `${previousValue} ${operation}`}</span>
              </div>
              <div className="text-white text-3xl font-mono tracking-wider break-all overflow-hidden">{display}</div>
            </div>
          </div>
        </div>

        {/* Mode and Clear Row */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <CalcButton
            variant="function"
            className={cn("text-sm", angleMode === "RAD" ? "bg-indigo-700/80 border border-indigo-500/50" : "")}
            onClick={toggleAngleMode}
          >
            RAD
          </CalcButton>
          <CalcButton
            variant="function"
            className={cn("text-sm", angleMode === "DEG" ? "bg-indigo-700/80 border border-indigo-500/50" : "")}
            onClick={toggleAngleMode}
          >
            DEG
          </CalcButton>
          <CalcButton variant="operation" className="text-sm" onClick={clear}>
            AC
          </CalcButton>
          <CalcButton variant="operation" className="text-sm" onClick={backspace}>
            ⌫
          </CalcButton>
        </div>

        {/* Memory Row */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <CalcButton variant="memory" className="text-sm" onClick={memoryClear}>
            MC
          </CalcButton>
          <CalcButton variant="memory" className="text-sm" onClick={memoryRecall}>
            MR
          </CalcButton>
          <CalcButton variant="memory" className="text-sm" onClick={memoryAdd}>
            M+
          </CalcButton>
          <CalcButton variant="memory" className="text-sm" onClick={memorySubtract}>
            M-
          </CalcButton>
        </div>

        {/* Scientific Functions Row 1 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("square")}>
            x²
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("cube")}>
            x³
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("1/x")}>
            1/x
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("sqrt")}>
            √
          </CalcButton>
        </div>

        {/* Scientific Functions Row 2 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("sin")}>
            sin
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("cos")}>
            cos
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("tan")}>
            tan
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("%")}>
            %
          </CalcButton>
        </div>

        {/* Scientific Functions Row 3 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("ln")}>
            ln
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("log")}>
            log
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("pi")}>
            π
          </CalcButton>
          <CalcButton variant="function" className="text-sm" onClick={() => performScientificOperation("e")}>
            e
          </CalcButton>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <CalcButton variant="number" onClick={() => inputNumber("7")}>
            7
          </CalcButton>
          <CalcButton variant="number" onClick={() => inputNumber("8")}>
            8
          </CalcButton>
          <CalcButton variant="number" onClick={() => inputNumber("9")}>
            9
          </CalcButton>
          <CalcButton variant="operation" onClick={() => inputOperation("÷")}>
            ÷
          </CalcButton>

          {/* Row 2 */}
          <CalcButton variant="number" onClick={() => inputNumber("4")}>
            4
          </CalcButton>
          <CalcButton variant="number" onClick={() => inputNumber("5")}>
            5
          </CalcButton>
          <CalcButton variant="number" onClick={() => inputNumber("6")}>
            6
          </CalcButton>
          <CalcButton variant="operation" onClick={() => inputOperation("×")}>
            ×
          </CalcButton>

          {/* Row 3 */}
          <CalcButton variant="number" onClick={() => inputNumber("1")}>
            1
          </CalcButton>
          <CalcButton variant="number" onClick={() => inputNumber("2")}>
            2
          </CalcButton>
          <CalcButton variant="number" onClick={() => inputNumber("3")}>
            3
          </CalcButton>
          <CalcButton variant="operation" onClick={() => inputOperation("-")}>
            −
          </CalcButton>

          {/* Row 4 */}
          <CalcButton variant="number" onClick={() => inputNumber("0")}>
            0
          </CalcButton>
          <CalcButton variant="number" onClick={inputDecimal}>
            .
          </CalcButton>
          <CalcButton variant="operation" onClick={() => inputOperation("+")}>
            +
          </CalcButton>
          <CalcButton variant="equals" onClick={performCalculation}>
            =
          </CalcButton>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs">Scientific Calculator v3.0</p>
        </div>
      </div>
    </div>
  )
}
