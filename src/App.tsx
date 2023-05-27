import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ReposCard from './pages/ReposCard';
import Navigation from './components/Navigation';

function App() {
  return (<>
      <Navigation/>
      <Routes>
        <Route path="git-app/" element={<MainPage/>}/>
        <Route path="git-app/*" element={<ReposCard />}/>
      </Routes>
    </>);
}

export default App;
