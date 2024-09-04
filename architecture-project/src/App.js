import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserLogin } from './components/UserLogin';
import { Welcome } from './components/Welcome';
import { TaskList } from './components/TaskList';
import api from './utils/api';

function App() {
    const [jwt, setJwt] = useState('');

    function onLogin(name, password) {
        setJwt(api.login(name, password));
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                Лабораторная работа по микрофронтендам
            </header>
            <section className='App-content'>
                {jwt ? (
                    <>
                        <Welcome jwt={jwt} />
                        <TaskList jwt={jwt} />
                    </>
                ) : (
                    <UserLogin onLogin={(name, password) => onLogin(name, password)} />
                )}
            </section>
        </div>
    );
}

export default App;
