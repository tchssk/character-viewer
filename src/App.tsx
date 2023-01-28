import {
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/:character' element={<Character />} />
        <Route path='/' element={<Navigate to='A' />} />
      </Routes>
    </HashRouter>
  );
}

const Character = () => {
  const params = useParams();
  const character = params.character ?? 'A';
  const nextCharacter = (() => {
    const charCodeA = 'A'.charCodeAt(0);
    const charCodeZ = 'Z'.charCodeAt(0);
    let charCode = character.charCodeAt(0) + 1;
    if (charCode < charCodeA) {
      charCode = charCodeZ
    }
    if (charCode > charCodeZ) {
      charCode = charCodeA
    }
    return '/' + String.fromCharCode(charCode);
  })();
  return (
    <Link to={nextCharacter}>{params.character}</Link>
  );
};

export default App;
