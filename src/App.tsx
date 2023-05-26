import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ReposCard from './pages/ReposCard';
import Navigation from './components/Navigation';

function App() {
  return (<>
      <Navigation/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/*" element={<ReposCard />}/>
      </Routes>
    </>);
}

export default App;
