import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Landing from "./components/Landing";
import Game from "./features/Game";
import SongList from "./features/SongList";

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
