import './App.css';
import { useState } from "react";
import deleteIkon from './delete.png';
import editIkon from './edit.png';

const lists = [{
    id: 0,
    text: 'Планы на завтра',
    list: [{
        id: 0,
        text: 'Завтрак',
    }],
    lastIdList: 1
}];

let nameTable = 'Список задач'

export default function App() {

    const [todos, setTodos] = useState(lists);
    const [textTodo, setTextTodo] = useState('');
    const [listState, setListState] = useState(true);
    const [list, setList] = useState('');
    const [textList, setTextList] = useState('');
    const [listName, setListName] = useState('');
    const [listIdNow, setListIdNow] = useState('');
    const [listId, setListId] = useState(1);
    const [todoId, setTodoId] = useState(1);

    let nextId = list.length
    let nextIdTodo = 1

    function deleteElement(todoId) {
        if (listState) {
            setTodos(
                todos.filter(t => t.id !== todoId)
            );
        } else {
            setList(list.filter(t => t.id !== todoId));
        }
    }


    function ElementTodo({ todos }) {

        const liElement = todos.map(list => (
            <li key={list.id}>
                <ElementButton element={list} />
            </li>
        ))
        return (<ol>{liElement}</ol>)
    }

    function ElementButton({ element }) {
        const [isEditing, setIsEditing] = useState(false);
        const [textLi, setTextLi] = useState(element.text);
        let todoContent, liText;

        if (isEditing) {
            liText = (
                <input value={textLi}
                    onChange={e => setTextLi(e.target.value)}
                    className='inputLiElement' type='text' />
            )
            todoContent = (
                <button className='editElement' onClick={() => {
                    setIsEditing(false)
                    element.text = textLi
                }
                }>
                    Сохранить
                </button>
            );

        } else {
            todoContent = (
                <button className='editElement' onClick={() => setIsEditing(true)}>
                    <img alt='edit Ikon' src={editIkon}></img>
                </button>
            );

            liText = (
                <span className='notEditElement' onClick={() => {
                    if (listState) {
                        setListState(false)
                        setListName(textLi)
                        setList(element.list)
                        setListIdNow(element.id)
                        setListId(element.lastIdList)

                    }
                }}>{textLi}</span>)
        }
        return (
            <>
                {liText}
                <span className='elementButton'>
                    {todoContent}
                    <button className='deleteElement' onClick={() => deleteElement(element.id)}>
                        <img alt='delete Ikon' src={deleteIkon}></img>
                    </button>
                </span>
            </>
        );
    }

    if (listState) {
        return (
            <div className='toDoList'>
                <h1>{nameTable}</h1>
                <div className='addInList'><input alt='' value={textTodo}
                    onChange={e => setTextTodo(e.target.value)}
                    className='inputField' type='text' />
                    <button onClick={() => {
                        setTextTodo('');
                        if (textTodo !== '') {
                            setTodos([...todos, {
                                id: todoId,
                                text: textTodo,
                                list: [],
                                lastIdList: 1
                            }]);
                            setTodoId(todoId + 1)
                        }
                    }} className='inputFieldButton'>Создать
                    </button>
                </div>
                <ElementTodo todos={todos} />
            </div>
        );
    } else {

        return (
            <div className='toDoList'>
                <h1>{listName}</h1>
                <div className='addInList'><input alt='' value={textList}
                    onChange={e => setTextList(e.target.value)}
                    className='inputField' type='text' />
                    <button onClick={() => {
                        setTextList('');
                        if (textList !== '') {
                            setList([...list, {
                                id: listId,
                                text: textList,
                            }]);
                            setListId(listId + 1)
                        }
                    }} className='inputFieldButton'>Создать
                    </button>
                </div>
                <button onClick={() => {
                    setListState(true)
                    todos[listIdNow].list = list
                    todos[listIdNow].lastIdList = listId

                }}>Назад</button>
                <ElementTodo todos={list} />
            </div>
        )
    }
}



