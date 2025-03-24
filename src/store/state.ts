export enum ECategory {
  WORK = "Работа",
  HOME = "Дом",
  STUDY = "Учеба",
  PERSONAL = "Личное",
  HEALTH = "Здоровье",
}

export enum EPriority {
  LOW = "Низкий",
  MEDIUM = "Средний",
  HIGH = "Высокий",
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

export interface IState {
  tasks: ITask[];
}

function state(): IState {
  return {
    tasks: [],
  };
}

export default state;
