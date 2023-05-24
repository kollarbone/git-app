import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import ReposCard from './pages/ReposCard';
import Navigation from './components/Navigation';

function App() {
  return (<>
      <Navigation/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/:repo_id" element={<ReposCard/>}/>
      </Routes>
    </>);
}

export default App;
