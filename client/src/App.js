import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './components/Routing';
import { getAllTrailsFromServer } from './api/trailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTrails } from './fetaurs/trailsPages/trailsSlice';
import { useEffect } from 'react';
import { Footer } from './components/footer';
import { getHotTrailsFromServer } from './api/favoritesApi';

function App() {
  const trails = useSelector(state => state.trails.trails);
  const dispatch = useDispatch();

  const getTrailsFromServerAsync = async () => {
    const allTrails = await getAllTrailsFromServer();
    dispatch(setAllTrails(allTrails));
  }
  //שליפת הטיולים והמשתמשים מהשרת ועדכון בסטור
  useEffect(() => {
    if (!trails) {
      getTrailsFromServerAsync();
    }
  }, []);

  return <>
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: "80vh", backgroundColor: "rgb(255 254 237 / 65%)" }}>
        <Routing />
      </div>
      <Footer />
    </BrowserRouter>
  </>
}

export default App;
