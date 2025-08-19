"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Calendar, ArrowRight, User, Edit2 } from "lucide-react"
import { Task } from "./kanban-board"
import { TaskDialog } from "./task-dialog"
import { assignees, getAssigneeByName } from "@/lib/assignees"

interface TaskCardProps {
  task: Task
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void
  onUpdateAssignee: (taskId: string, assignee: string) => void
  onUpdateTask?: (taskId: string, taskData: { title: string; description: string; assignee?: string }) => void
}

export function TaskCard({ task, onMoveTask, onUpdateAssignee, onUpdateTask }: TaskCardProps) {
  const [isEditingAssignee, setIsEditingAssignee] = useState(false)



  const getNextStatus = (currentStatus: Task["status"]): Task["status"] | null => {
    switch (currentStatus) {
      case "todo":
        return "in-progress"
      case "in-progress":
        return "done"
      default:
        return null
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const nextStatus = getNextStatus(task.status)

  const handleAssigneeChange = (assignee: string) => {
    onUpdateAssignee(task.id, assignee)
    setIsEditingAssignee(false)
  }

  return (
         <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
       <CardContent className="p-3">
         <div className="space-y-2">
          {/* Header with Title and Actions */}
          <div className="flex items-start justify-between">
                         <h3 className="font-semibold text-base leading-tight line-clamp-1 text-gray-900 dark:text-gray-100">
               {task.title}
             </h3>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onUpdateTask && (
                <TaskDialog 
                  task={task}
                  onSave={(taskData) => onUpdateTask(task.id, taskData)}
                  trigger={
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  }
                />
              )}
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>

                     {/* Description */}
           <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 leading-relaxed">
             {task.description}
           </p>

          {/* Move to next status button */}
          <div className="flex items-center justify-end">
            {nextStatus && (
              <Button
                variant="ghost"
                size="sm"
                                 className="h-7 px-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveTask(task.id, nextStatus)
                }}
              >
                <ArrowRight className="h-3 w-3 mr-1" />
                Move
              </Button>
            )}
          </div>

                     {/* Assignee Section */}
           <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 text-gray-400" />
                             <span className="text-sm text-gray-500 dark:text-gray-400">Assignee:</span>
              
              {isEditingAssignee ? (
                <Select
                  value={task.assignee || ""}
                  onValueChange={handleAssigneeChange}
                  onOpenChange={(open: boolean) => !open && setIsEditingAssignee(false)}
                >
                                     <SelectTrigger className="h-7 w-32 text-sm">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignees.map((assignee) => (
                                             <SelectItem key={assignee.id} value={assignee.name} className="text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                            <AvatarFallback className="text-sm">
                              {getInitials(assignee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{assignee.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2">
                  {task.assignee ? (
                    <>
                      <Avatar className="h-5 w-5">
                        <AvatarImage 
                          src={getAssigneeByName(task.assignee)?.avatar} 
                          alt={task.assignee} 
                        />
                                                 <AvatarFallback className="text-sm bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
                          {getInitials(task.assignee)}
                        </AvatarFallback>
                      </Avatar>
                                             <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                         {task.assignee}
                       </span>
                    </>
                  ) : (
                                         <span className="text-sm text-gray-400 italic">Unassigned</span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsEditingAssignee(true)
                    }}
                  >
                    <Edit2 className="h-2.5 w-2.5" />
                  </Button>
                </div>
              )}
            </div>

                         {/* Date */}
             <div className="flex items-center text-sm text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />
              {task.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
