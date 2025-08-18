"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"
import { TaskCard } from "./task-card"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  assignee?: string
  createdAt: Date
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new landing page",
      description: "Create wireframes and mockups for the new landing page design",
      status: "todo",
      priority: "high",
      assignee: "Sarah Johnson",
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up JWT authentication with login and registration",
      status: "in-progress",
      priority: "high",
      assignee: "Mike Chen",
      createdAt: new Date("2024-01-14")
    },
    {
      id: "3",
      title: "Write API documentation",
      description: "Document all API endpoints with examples",
      status: "done",
      priority: "medium",
      assignee: "Alex Rodriguez",
      createdAt: new Date("2024-01-13")
    },
    {
      id: "4",
      title: "Fix responsive layout issues",
      description: "Address mobile responsiveness problems in the dashboard",
      status: "todo",
      priority: "medium",
      assignee: "Emma Wilson",
      createdAt: new Date("2024-01-16")
    },
    {
      id: "5",
      title: "Add unit tests",
      description: "Write comprehensive unit tests for core functionality",
      status: "in-progress",
      priority: "low",
      assignee: "David Kim",
      createdAt: new Date("2024-01-12")
    },
    {
      id: "6",
      title: "Review code changes",
      description: "Review pull requests and provide feedback",
      status: "todo",
      priority: "medium",
      createdAt: new Date("2024-01-17")
    }
  ])

  const columns = [
    {
      id: "todo",
      title: "Todo",
      color: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-yellow-50 dark:bg-yellow-950/20",
      borderColor: "border-yellow-200 dark:border-yellow-800"
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-800"
    }
  ]

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status)
  }

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const updateAssignee = (taskId: string, assignee: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, assignee } : task
    ))
  }

  return (
    <div className="flex gap-6 h-full min-h-[600px]">
      {columns.map((column) => (
        <div key={column.id} className="flex-1 min-w-0">
          <Card className={`h-full ${column.color} ${column.borderColor} border-2`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {column.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full">
                    {getTasksByStatus(column.id as Task["status"]).length}
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
                             {getTasksByStatus(column.id as Task["status"]).map((task) => (
                 <TaskCard
                   key={task.id}
                   task={task}
                   onMoveTask={moveTask}
                   onUpdateAssignee={updateAssignee}
                 />
               ))}
              {getTasksByStatus(column.id as Task["status"]).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No tasks yet</p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
