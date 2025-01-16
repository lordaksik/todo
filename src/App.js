import './App.css';
import {useState} from "react";
import deleteIkon from './delete.png';
import editIkon from './edit.png';

const lists = [{
    id: 0,
    text: 'Планы на завтра'
}];

var nameTable = 'Список задач'

export default function App() {

    const [todos, setTodos] = useState(lists);
    const [text, setText] = useState('');
    let nextId = todos.length

    function deleteElement(todoId) {
        setTodos(
            todos.filter(t => t.id !== todoId)
        );
    }


    function ElementList({todos}) {

        const liElement = todos.map(list => (
            <li key={list.id}>
                <ElementButton element={list}/>
            </li>
        ))
        return (<ol reversed>{liElement}</ol>)
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
            liText = textLi
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

    return (
        <div className='toDoList'>
            <h1>{nameTable}</h1>
            <div className='addInList'><input alt='' value={text}
                                              onChange={e => setText(e.target.value)}
                                              className='inputField' type='text'/>
                <button  onClick={() => {
                    setText('');
                    setTodos([{
                        id: nextId++,
                        text: text
                    }, ...todos]);
                }} className='inputFieldButton'>Создать
                </button>
            </div>
            <ElementList todos={todos}/>
        </div>
    );
}



