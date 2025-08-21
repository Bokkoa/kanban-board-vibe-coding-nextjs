export interface Assignee {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

export const assignees: Assignee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: "Product Manager"
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "Frontend Developer"
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "Backend Developer"
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.wilson@company.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "UX Designer"
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@company.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    role: "DevOps Engineer"
  },
  {
    id: "6",
    name: "Lisa Park",
    email: "lisa.park@company.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    role: "QA Engineer"
  },
  {
    id: "7",
    name: "Tom Anderson",
    email: "tom.anderson@company.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    role: "Team Lead"
  },
  {
    id: "8",
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    role: "Full Stack Developer"
  }
]

export const getAssigneeById = (id: string): Assignee | undefined => {
  return assignees.find(assignee => assignee.id === id)
}

export const getAssigneeByName = (name: string): Assignee | undefined => {
  return assignees.find(assignee => assignee.name === name)
}
