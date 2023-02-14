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
  useSearchParams,
} from 'react-router-dom';
import './App.css';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const list = [alphabet, numbers];

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
      {list.map((characters) => (
        <div className='container'>
          {characters.map((character, i) => <Link className='index' key={character} to={{ pathname: '/' + character, search: character !== characters[0] ? '?random' : undefined }}>{character}</Link>)}
        </div>
      ))}
    </>
  );
}

const Character = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const random = searchParams.has('random');
  const character = params.character ?? 'A';
  const characters = list.find(element => element.includes(character)) ?? alphabet;
  const nextCharacter = characters[(characters.findIndex((element) => element === character) + (random ? Math.floor(Math.random() * (characters.length - 1)) + 1 : 1)) % characters.length];
  return (
    <>
      <Link className='fullscreen' to={{ pathname: '/' }} />
      <Link className='character' to={{ pathname: '/' + nextCharacter, search: random ? '?random' : undefined }}>{params.character}</Link>
    </>
  );
};

export default App;
