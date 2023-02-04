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

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/:character' element={<Character />} />
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
  return (
    <>
      {alphabet.map((character) => <Link className='index' key={character} to={{ pathname: '/' + character }}>{character}</Link>)}
    </>
  );
}

const Character = () => {
  const params = useParams();
  const character = params.character ?? 'A';
  const nextCharacter = alphabet[(alphabet.findIndex((element) => element === character) + 1) % alphabet.length];
  return (
    <>
      <Link className='fullscreen' to={{ pathname: '/' }} />
      <Link className='character' to={{ pathname: '/' + nextCharacter }}>{params.character}</Link>
    </>
  );
};

export default App;
