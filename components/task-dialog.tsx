"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit } from "lucide-react"
import { Task } from "./kanban-board"
import { assignees } from "@/lib/assignees"

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  assignee: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskFormSchema>

interface TaskDialogProps {
  task?: Task
  onSave: (taskData: TaskFormValues) => void
  trigger?: React.ReactNode
}

export function TaskDialog({ task, onSave, trigger }: TaskDialogProps) {
  const [open, setOpen] = useState(false)
  const isEditing = !!task

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      assignee: task?.assignee || "unassigned",
    },
  })

  const onSubmit = (values: TaskFormValues) => {
    // Convert "unassigned" to undefined for the assignee field
    const processedValues = {
      ...values,
      assignee: values.assignee === "unassigned" ? undefined : values.assignee
    }
    onSave(processedValues)
    setOpen(false)
    form.reset()
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      form.reset()
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

  const defaultTrigger = isEditing ? (
    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
      <Edit className="h-3 w-3" />
    </Button>
  ) : (
    <Button size="sm" className="h-8">
      <Plus className="h-3 w-3 mr-1" />
      Add Task
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Task" : "Create New Task"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Make changes to your task here." : "Add a new task to your kanban board."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter task description..." 
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {assignees.map((assignee) => (
                        <SelectItem key={assignee.id} value={assignee.name}>
                          <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-6 w-6 flex-shrink-0">
                              <AvatarImage src={assignee.avatar} alt={assignee.name} />
                              <AvatarFallback className="text-xs">
                                {getInitials(assignee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="text-sm font-medium truncate">{assignee.name}</span>
                              <span className="text-xs text-muted-foreground truncate">{assignee.role}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
