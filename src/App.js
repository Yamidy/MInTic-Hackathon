import './App.css';
import HideAppBar from './components/HideAppBar';
import { SessionProvider } from './context/sessionContext'

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <HideAppBar>
          Aquí el contenido
        </HideAppBar>
      </SessionProvider>

    </div>
  );
}

export default App;
