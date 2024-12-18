import './App.css';

var nameTable = 'Список задач'
export default function App() {
    return (
        <div className='toDoList'>
            <h1>{nameTable}</h1>
            <ol>
                <ListName/>
            </ol>
        </div>
    );
}

//  <MyButton info='правду'/>
function ListName() {
    var list = {
        id: 1,
        title: 'Сделать сегодня'
    }
    return (
        <li key={list.id}>{list.title} </li>
    );
}


