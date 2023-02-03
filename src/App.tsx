import {
  useEffect
} from 'react';
import {
  HashRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import './App.css';

const charCodeA = 'A'.charCodeAt(0);
const charCodeZ = 'Z'.charCodeAt(0);

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/:character' element={<Character />} />
        <Route path='/' element={<Index />} />
      </Routes>
    </HashRouter>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Index = () => {
  const links: JSX.Element[] = (() => {
    const list: JSX.Element[] = [];
    for (let charCode = charCodeA; charCode <= charCodeZ; charCode++) {
      const character = String.fromCharCode(charCode);
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
    <>
      <Link className='fullscreen' to={'/'} />
      <Link className='character' to={nextCharacter}>{params.character}</Link>
    </>
  );
};

export default App;
