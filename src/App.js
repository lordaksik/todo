import './App.css';
import {useState} from "react";

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
                {list.text}
                <span className='elementButton'>
                <button className='editElement'>
                    Ред.
                </button>
                <button className='deliteElement' onClick={() => deleteElement(list.id)}>
                    X
                </button>
            </span>
            </li>
        ))
        return (<ol reversed>{liElement}</ol>)
    }

    return (
        <div className='toDoList'>
            <h1>{nameTable}</h1>
            <div className='addInList'><input value={text}
                                              onChange={e => setText(e.target.value)}
                                              className='inputField' type='text'/>
                <button onClick={() => {
                    console.log(todos)
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



