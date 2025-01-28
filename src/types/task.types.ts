export enum TaskStatus {
  TODO = "To-Do",
  DOING = "Doing",
  DONE = "Done",
}

export interface Task {
  created: string; // ISO timestamp
  name: string;
  due?: string; // ISO date
  important: boolean;
  status: TaskStatus;
}
