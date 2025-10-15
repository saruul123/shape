"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCw, Trash2, Sparkles, Target, Play, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Shape = {
  id: number
  pattern: number[][]
  color: string
  rotation: number
}

type PlacedShape = Shape & {
  x: number
  y: number
}

type Challenge = {
  id: number
  name: string
  difficulty: "Хялбар" | "Дунд" | "Хүнд"
  targetGrid: number[][]
  description: string
}

const SHAPES: Omit<Shape, "id" | "rotation">[] = [
  {
    pattern: [[1], [1], [1], [1], [1]],
    color: "bg-yellow-400",
  },
  {
    pattern: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    color: "bg-red-400",
  },
  {
    pattern: [
      [1, 1],
      [1, 1],
      [1, 0],
    ],
    color: "bg-blue-400",
  },
  {
    pattern: [
      [1, 1, 1],
      [1, 0, 1],
    ],
    color: "bg-green-400",
  },
  {
    pattern: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    color: "bg-orange-400",
  },
  {
    pattern: [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    color: "bg-cyan-400",
  },
  {
    pattern: [
      [1, 1, 1],
      [1, 1, 1],
    ],
    color: "bg-lime-400",
  },
  {
    pattern: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "bg-rose-400",
  },
  {
    pattern: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-gray-400",
  },
  {
    pattern: [[1], [1], [1], [1]],
    color: "bg-emerald-400",
  },
  {
    pattern: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    color: "bg-fuchsia-400",
  },
  {
    pattern: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    color: "bg-amber-400",
  },
]

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    name: "Жижиг Дөрвөлжин",
    difficulty: "Хялбар",
    description: "4x4 дөрвөлжин үүсгэ",
    targetGrid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    id: 2,
    name: "Шат",
    difficulty: "Дунд",
    description: "Шат хэлбэр үүсгэ",
    targetGrid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    id: 3,
    name: "Загвар",
    difficulty: "Хүнд",
    description: "Нарийн төвөгтэй загвар үүсгэ",
    targetGrid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
]

const GRID_SIZE = 20
const CELL_SIZE = 30

export default function ShapeBuilder() {
  const [availableShapes, setAvailableShapes] = useState<Shape[]>(
    SHAPES.map((shape, index) => ({
      ...shape,
      id: index,
      rotation: 0,
    })),
  )
  const [placedShapes, setPlacedShapes] = useState<PlacedShape[]>([])
  const [draggedShape, setDraggedShape] = useState<Shape | null>(null)
  const [draggedPlacedShapeId, setDraggedPlacedShapeId] = useState<number | null>(null)
  const [hoveredShapeId, setHoveredShapeId] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const [gameMode, setGameMode] = useState<"free" | "challenge" | "menu">("menu")
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const rotatePattern = (pattern: number[][]): number[][] => {
    const rows = pattern.length
    const cols = pattern[0].length
    const rotated: number[][] = Array(cols)
      .fill(0)
      .map(() => Array(rows).fill(0))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotated[j][rows - 1 - i] = pattern[i][j]
      }
    }

    return rotated
  }

  const rotateShape = (shapeId: number) => {
    setAvailableShapes((shapes) =>
      shapes.map((shape) => {
        if (shape.id === shapeId) {
          return {
            ...shape,
            pattern: rotatePattern(shape.pattern),
            rotation: (shape.rotation + 90) % 360,
          }
        }
        return shape
      }),
    )
  }

  const rotatePlacedShape = (shapeId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setPlacedShapes((shapes) =>
      shapes.map((shape) => {
        if (shape.id === shapeId) {
          return {
            ...shape,
            pattern: rotatePattern(shape.pattern),
            rotation: (shape.rotation + 90) % 360,
          }
        }
        return shape
      }),
    )
  }

  const handleDragStart = (shape: Shape, e: React.DragEvent) => {
    setDraggedShape(shape)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("shapeId", shape.id.toString())
    e.dataTransfer.setData("type", "new")
  }

  const handlePlacedShapeDragStart = (shape: PlacedShape, e: React.DragEvent) => {
    e.stopPropagation()
    setDraggedPlacedShapeId(shape.id)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("shapeId", shape.id.toString())
    e.dataTransfer.setData("type", "placed")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE)
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE)

    const type = e.dataTransfer.getData("type")
    const shapeId = Number.parseInt(e.dataTransfer.getData("shapeId"))

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      if (type === "placed" && draggedPlacedShapeId !== null) {
        // Moving an existing placed shape
        setPlacedShapes((shapes) => shapes.map((s) => (s.id === draggedPlacedShapeId ? { ...s, x, y } : s)))
      } else if (type === "new" && draggedShape) {
        // Placing a new shape from available shapes
        setPlacedShapes([...placedShapes, { ...draggedShape, x, y }])
        setAvailableShapes(availableShapes.filter((s) => s.id !== draggedShape.id))
      }
    }

    // Clean up drag state
    setDraggedPlacedShapeId(null)
    setDraggedShape(null)
  }

  const handleDragEnd = () => {
    setDraggedPlacedShapeId(null)
    setDraggedShape(null)
  }

  const clearGrid = () => {
    setAvailableShapes(
      SHAPES.map((shape, index) => ({
        ...shape,
        id: index,
        rotation: 0,
      })),
    )
    setPlacedShapes([])
  }

  const removeShape = (shapeId: number) => {
    const shape = placedShapes.find((s) => s.id === shapeId)
    if (shape) {
      setPlacedShapes(placedShapes.filter((s) => s.id !== shapeId))
      setAvailableShapes([...availableShapes, { ...shape, x: undefined, y: undefined } as Shape])
    }
  }

  const createCurrentGrid = (): number[][] => {
    const grid: number[][] = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(0))

    placedShapes.forEach((shape) => {
      shape.pattern.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell && shape.y + i < GRID_SIZE && shape.x + j < GRID_SIZE) {
            grid[shape.y + i][shape.x + j] = cell
          }
        })
      })
    })

    return grid
  }

  const checkChallengeCompletion = () => {
    if (!currentChallenge || gameMode !== "challenge") return

    const currentGrid = createCurrentGrid()
    let matches = true

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (currentGrid[i][j] !== currentChallenge.targetGrid[i][j]) {
          matches = false
          break
        }
      }
      if (!matches) break
    }

    if (matches && !isCompleted) {
      setIsCompleted(true)
    } else if (!matches && isCompleted) {
      setIsCompleted(false)
    }
  }

  useEffect(() => {
    if (gameMode === "challenge") {
      checkChallengeCompletion()
    }
  }, [placedShapes, gameMode])

  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge)
    setGameMode("challenge")
    setIsCompleted(false)
    clearGrid()
  }

  const returnToMenu = () => {
    setGameMode("menu")
    setCurrentChallenge(null)
    setIsCompleted(false)
    clearGrid()
  }

  const startFreeMode = () => {
    setGameMode("free")
    setCurrentChallenge(null)
    setIsCompleted(false)
    clearGrid()
  }

  if (gameMode === "menu") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-sans text-5xl font-bold text-balance bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Дүрс Үүсгэгч Тоглоом
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">Өнгөт хэсгүүдийг ашиглан дүрс үүсгэ</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8 shadow-2xl border-2 hover:border-primary transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="font-sans text-2xl font-bold">Чөлөөт Горим</h2>
                <p className="text-muted-foreground">Өөрийн санаачлагаар дүрс үүсгэ</p>
              </div>
            </div>
            <Button onClick={startFreeMode} size="lg" className="w-full">
              <Play className="mr-2 h-5 w-5" />
              Эхлэх
            </Button>
          </Card>

          <div>
            <h2 className="font-sans text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Даалгаврууд
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CHALLENGES.map((challenge) => (
                <Card
                  key={challenge.id}
                  className="p-6 shadow-xl border-2 hover:border-primary transition-all hover:shadow-2xl cursor-pointer"
                  onClick={() => startChallenge(challenge)}
                >
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-sans text-lg font-bold">{challenge.name}</h3>
                      <Badge
                        variant={
                          challenge.difficulty === "Хялбар"
                            ? "default"
                            : challenge.difficulty === "Дунд"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <Button className="w-full" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Тоглох
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-sans text-4xl font-bold text-balance bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          {gameMode === "challenge" && currentChallenge
            ? `Даалгавар: ${currentChallenge.name}`
            : "Дүрс Үүсгэгч Тоглоом"}
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          {gameMode === "challenge" && currentChallenge
            ? currentChallenge.description
            : "Өнгөт хэсгүүдийг чирж, эргүүлж, хавтан дээр байрлуулаарай"}
        </p>
        {isCompleted && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
            <p className="text-xl font-bold text-green-700 dark:text-green-400">
              🎉 Баяр хүргэе! Та даалгаврыг амжилттай гүйцэтгэлээ! 🎉
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <Card className="p-6 shadow-2xl border-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-sans text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {gameMode === "challenge" ? "Таны Шийдэл" : "Таны Бүтээл"}
              </h2>
              <div className="flex gap-2">
                <Button onClick={clearGrid} variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                  Цэвэрлэх
                </Button>
                <Button onClick={returnToMenu} variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Home className="h-4 w-4" />
                  Цэс
                </Button>
              </div>
            </div>

            <div
              ref={gridRef}
              className="relative mx-auto rounded-xl border-4 border-primary/20 bg-white shadow-inner"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {gameMode === "challenge" && currentChallenge && (
                <div className="absolute inset-0 pointer-events-none z-0">
                  {currentChallenge.targetGrid.map((row, i) =>
                    row.map(
                      (cell, j) =>
                        cell === 1 && (
                          <div
                            key={`target-${i}-${j}`}
                            className="absolute bg-blue-100/60 dark:bg-blue-900/30 border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-sm"
                            style={{
                              left: j * CELL_SIZE,
                              top: i * CELL_SIZE,
                              width: CELL_SIZE - 2,
                              height: CELL_SIZE - 2,
                            }}
                          />
                        ),
                    ),
                  )}
                </div>
              )}

              <div className="absolute inset-0 pointer-events-none z-10">
                {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: i * CELL_SIZE }}
                  />
                ))}
                {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full border-l border-gray-200"
                    style={{ left: i * CELL_SIZE }}
                  />
                ))}
              </div>

              {placedShapes.map((shape) => (
                <div
                  key={`placed-${shape.id}`}
                  className={`absolute group cursor-move z-20 ${draggedPlacedShapeId === shape.id ? "opacity-50" : ""}`}
                  style={{
                    left: shape.x * CELL_SIZE,
                    top: shape.y * CELL_SIZE,
                  }}
                  onMouseEnter={() => setHoveredShapeId(shape.id)}
                  onMouseLeave={() => setHoveredShapeId(null)}
                  draggable
                  onDragStart={(e) => handlePlacedShapeDragStart(shape, e)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="relative transition-transform hover:scale-105">
                    {shape.pattern.map((row, i) => (
                      <div key={i} className="flex">
                        {row.map((cell, j) =>
                          cell ? (
                            <div
                              key={j}
                              className={`${shape.color} opacity-90 border-2 border-gray-800 shadow-md rounded-sm`}
                              style={{
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                              }}
                            />
                          ) : (
                            <div
                              key={j}
                              style={{
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                              }}
                            />
                          ),
                        )}
                      </div>
                    ))}

                    {hoveredShapeId === shape.id && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 bg-background border-2 border-primary rounded-lg p-1 shadow-lg z-10">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => rotatePlacedShape(shape.id, e)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                          title="Эргүүлэх"
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeShape(shape.id)}
                          className="h-8 w-8 p-0 hover:bg-destructive/10"
                          title="Устгах"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 shadow-xl border-2">
            <h2 className="mb-4 font-sans text-xl font-semibold">Боломжит Хэсгүүд</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {availableShapes.map((shape) => (
                <div
                  key={shape.id}
                  className="group relative rounded-lg border-2 border-border bg-card p-4 transition-all hover:border-primary hover:shadow-lg cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(shape, e)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Хэсэг #{shape.id + 1}</span>
                    <Button size="sm" variant="ghost" onClick={() => rotateShape(shape.id)} className="h-8 w-8 p-0">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <div className="inline-block">
                      {shape.pattern.map((row, i) => (
                        <div key={i} className="flex">
                          {row.map((cell, j) =>
                            cell ? (
                              <div
                                key={j}
                                className={`${shape.color} border-2 border-gray-800 shadow-sm rounded-sm`}
                                style={{
                                  width: 24,
                                  height: 24,
                                }}
                              />
                            ) : (
                              <div
                                key={j}
                                style={{
                                  width: 24,
                                  height: 24,
                                }}
                              />
                            ),
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
