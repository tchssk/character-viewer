import {
  HashRouter,
  Link,
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
        <Route path='/' element={<Index />} />
      </Routes>
    </HashRouter>
  );
}

const Index = () => {
  const charCodeA = 'A'.charCodeAt(0);
  const charCodeZ = 'Z'.charCodeAt(0);
  const links: JSX.Element[] = (() => {
    const list: JSX.Element[] = [];
    for (let charCode = charCodeA; charCode <= charCodeZ; charCode++) {
      const character = String.fromCharCode(charCode);
      console.log(character);
      list.push(<Link className='index' key={character} to={'/' + character}>{character}</Link>);
    }
    return list;
  })();
  return (
    <>
      {links}
    </>
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
    <Link className='character' to={nextCharacter}>{params.character}</Link>
  );
};

export default App;
