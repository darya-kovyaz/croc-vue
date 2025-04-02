export enum ECategory {
  WORK = "Работа",
  HOME = "Дом",
  STUDY = "Учеба",
  PERSONAL = "Личное",
  HEALTH = "Здоровье",
}

export enum EPriority {
  HIGH = "Высокий",
  MEDIUM = "Средний",
  LOW = "Низкий",
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  completed: boolean;
  category: string;
  tags: string[];
}

export interface IFilter {
  priority: string[];
  category: string[];
  completed: boolean[];
}

export interface IState {
  tasks: ITask[];
  filteredTasks: ITask[];
  filtersApplied: IFilter;
}

function state(): IState {
  return {
    tasks: [],
    filteredTasks: [],
    filtersApplied: {
      priority: [],
      category: [],
      completed: [],
    },
  };
}

export default state;
