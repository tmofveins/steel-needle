import { Routes, Route } from "react-router-dom";

import Layout from "./views/Layout";
import Landing from "./views/Landing";
import Game from "./views/Game";
import SongList from "./views/SongList";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Landing/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/songs" element={<SongList/>}/>
      </Route>
    </Routes>
  );
}

export default App;
