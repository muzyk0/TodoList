import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
    addTask: (taskID: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const setAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
    const setActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
    const setCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    const tasks = props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
            const changeTaskTitle = (newTitle: string) => {
                props.changeTaskTitle(task.id, newTitle, props.todoListID)
            }
            return (
                <li style={task.isDone ? {opacity: '0.5'} : {}} key={task.id}>
                    <Checkbox
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton>
                        <Delete onClick={removeTask}>X</Delete>
                    </IconButton>
                </li>
            )
        }
    )
    return (
        <div className={'task'}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton>
                    <Delete onClick={removeTodoList}>X</Delete>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: 0}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    size={'small'}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={'secondary'}
                    size={'small'}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={'primary'}
                    size={'small'}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList