import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Task {
  id?: number
  title: string
  description: string
  isCompleted: boolean
  date: string
}

export const useTaskStore = defineStore('task', () => {
  const selectedTask = ref<Task | null>(null)
  const tasks = ref<Task[]>([
    {
      id: 1,
      title: 'Create a new design',
      description: 'lorem ipsum dolor sit amet',
      isCompleted: false,
      date: '2024-08-31'
    },
    {
      id: 2,
      title: 'Develop a new feature',
      description: 'lorem ipsum dolor sit amet',
      isCompleted: false,
      date: '2024-08-30'
    },
    {
      id: 3,
      title: 'Fix the bugs',
      description: 'lorem ipsum dolor sit amet',
      isCompleted: false,
      date: '2024-08-29'
    },
    {
      id: 4,
      title: 'Deploy the app',
      description: 'lorem ipsum dolor sit amet',
      isCompleted: false,
      date: '2024-08-28'
    },
    {
      id: 5,
      title: 'Review the code',
      description: 'lorem ipsum dolor sit amet',
      isCompleted: false,
      date: '2024-08-19'
    }
  ])

  function addTask(task: Task) {
    tasks.value.push({
      id: tasks.value.length + 1,
      ...task
    })
  }

  function removeTask(taskId?: number) {
    if (!taskId) return
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
  }

  return {
    tasks,
    selectedTask,
    addTask,
    removeTask
  }
})
