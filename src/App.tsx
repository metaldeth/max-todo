import { Route, Routes } from "react-router";
import Timer from "./components/timer";
import CreateTimer from "./components/createTimer";

function App() {
  return (
    <Routes>
      <Route path={`/timer/:codeTxt`} element={<Timer />} />
      <Route path="/createTimer" element={<CreateTimer />} />
    </Routes>
  );
}

export default App;
