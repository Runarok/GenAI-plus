"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [display, setDisplay] = useState("")

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        // Basic calculation logic would go here
        setDisplay(display)
      } catch (error) {
        setDisplay("Error")
      }
    } else if (value === "C") {
      setDisplay("")
    } else {
      setDisplay(display + value)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 border border-gray-300 rounded-lg p-4">
      {/* Display */}
      <div className="mb-4">
        <Input
          value={display}
          readOnly
          className="h-20 text-right text-lg font-mono bg-white border-2 border-blue-400"
          placeholder="|"
        />
      </div>

      {/* Function Row */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        <Button variant="outline" size="sm" className="h-8 text-xs bg-gray-100">
          main
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-gray-100">
          abc
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-gray-100">
          func
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-gray-200 border-gray-400">
          RAD
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-blue-100 border-blue-400">
          DEG
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-gray-100">
          ⚙
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs bg-gray-100">
          ✏️
        </Button>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-5 gap-1">
        {/* Row 1 */}
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("^2")}>
          x²
        </Button>
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("^3")}>
          x³
        </Button>
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("abs")}>
          |x|
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("7")}>
          7
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("8")}>
          8
        </Button>

        {/* Row 1 continued */}
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("9")}>
          9
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("/")}>
          ÷
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("%")}>
          %
        </Button>
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("sqrt")}>
          √
        </Button>
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("cbrt")}>
          ∛
        </Button>

        {/* Row 2 */}
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("pi")}>
          π
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("4")}>
          4
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("5")}>
          5
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("6")}>
          6
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("*")}>
          ×
        </Button>

        {/* Row 2 continued */}
        <Button variant="outline" className="h-10 text-lg bg-gray-400" onClick={() => handleButtonClick("-")}>
          −
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-400" onClick={() => handleButtonClick("-")}>
          −
        </Button>
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("sin")}>
          sin
        </Button>
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("cos")}>
          cos
        </Button>
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("tan")}>
          tan
        </Button>

        {/* Row 3 */}
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("1")}>
          1
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("2")}>
          2
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("3")}>
          3
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("-")}>
          −
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-400" onClick={() => handleButtonClick("C")}>
          ⌫
        </Button>

        {/* Row 4 */}
        <Button variant="outline" className="h-10 text-lg bg-gray-200" onClick={() => handleButtonClick("(")}>
          (
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-200" onClick={() => handleButtonClick(")")}>
          )
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-200" onClick={() => handleButtonClick(".")}>
          .
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("0")}>
          0
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-200" onClick={() => handleButtonClick(".")}>
          .
        </Button>

        {/* Row 4 continued */}
        <Button variant="outline" className="h-10 text-sm bg-gray-200" onClick={() => handleButtonClick("ans")}>
          ans
        </Button>
        <Button variant="outline" className="h-10 text-lg bg-gray-300" onClick={() => handleButtonClick("+")}>
          +
        </Button>
        <div className="col-span-3">
          <Button
            className="w-full h-10 text-lg bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleButtonClick("=")}
          >
            ⏎ =
          </Button>
        </div>
      </div>
    </div>
  )
}
