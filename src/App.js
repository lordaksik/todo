import './App.css';
import {useState} from "react";

const lists = [];
var nameTable = 'Список задач'

function ElementList({todos}) {
    const liElement = todos.map(list => (
        <li key={list.id}>
            {list.text}
        </li>
    ))
    return (<ol>{liElement}</ol>)
}

function ButtonAddElemnt({setText}, {setTodos}, {todos}, {text}) {
    return (<button onClick={() => {
        setText('');
        setTodos([{
            id: todos.length,
            text: text
        }, ...todos]);
    }} className='inputFieldButton'>Создать
    </button>)
}

export default function App() {

    const [todos, setTodos] = useState(lists);
    const [text, setText] = useState('');

    return (
        <div className='toDoList'>
            <h1>{nameTable}</h1>
            <div className='addInList'><input value={text}
                                              onChange={e => setText(e.target.value)}
                                              className='inputField' type='text'/>
                <button onClick={() => {
                    setText('');
                    setTodos([{
                        id: todos.length,
                        text: text
                    }, ...todos]);
                }} className='inputFieldButton'>Создать
                </button>
            </div>
            <ElementList todos={todos}/>
        </div>
    );
}



