import './App.css';
import {useState} from "react";
import deleteIkon from './delete.png';
import editIkon from './edit.png';

const lists = [{
    id: 0,
    text: 'Планы на завтра',
    list: [{
        id: 0,
        text: 'Завтрак',
    }]
}];

let nameTable = 'Список задач'

export default function App() {

    const [todos, setTodos] = useState(lists);
    const [text, setText] = useState('');
    const [listState, setListState] = useState(true);
    const [list, setList] = useState('');
    const [listName, setListName] = useState('');
    let nextId = todos.length

    function deleteElement(todoId) {
        setTodos(
            todos.filter(t => t.id !== todoId)
        );
    }


    function ElementList({todos}) {
        console.log(todos)
        const liElement = todos.map(list => (
            <li key={list.id}>
                <ElementButton element={list}/>
            </li>
        ))
        return (<ol reversed>{liElement}</ol>)
    }

    function List() {
        return (<div className='toDoList'>
                <h1>{listName}</h1>
                <button onClick={() => setListState(true)}>Назад</button>
                <ElementList todos={list}/>
            </div>
        )
    }

    function ElementButton({element}) {
        const [isEditing, setIsEditing] = useState(false);
        const [textLi, setTextLi] = useState(element.text);
        let todoContent, liText;

        if (isEditing) {
            liText = (
                <input value={textLi}
                       onChange={e => setTextLi(e.target.value)}
                       className='inputLiElement' type='text'/>
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
                    setListState(false)
                    setListName(textLi)
                    setList(element.list)
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
                <div className='addInList'><input alt='' value={text}
                                                  onChange={e => setText(e.target.value)}
                                                  className='inputField' type='text'/>
                    <button onClick={() => {
                        setText('');
                        if (text !== '') {
                            setTodos([{
                                id: nextId++,
                                text: text,
                                list: [{}]
                            }, ...todos]);
                        }
                    }} className='inputFieldButton'>Создать
                    </button>
                </div>
                <ElementList todos={todos}/>
            </div>
        );
    } else {
        return (
            <List/>
        )
    }
}



