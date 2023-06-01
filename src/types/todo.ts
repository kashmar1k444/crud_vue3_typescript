export interface ITodo {
    readonly id: number
    readonly userId: number
    title: string
    completed: boolean 
}

export interface IUpdateTodo {
    id: number,
    title: string
}

export enum Sort {
    All = 'All',
    Completed = 'Completed',
    Uncompleted = 'Uncompleted'
}

export type TodoType = Array<ITodo>

