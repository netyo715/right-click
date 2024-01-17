import './App.css';
import { useRef, useState } from 'react';

const TARGET_AREA_HEIGHT = 400;
const TARGET_AREA_WIDTH = 600;

const getRandomHW = (size, prevHW) => {
  while (true){
    const hw = [Math.random()*(TARGET_AREA_HEIGHT-size+1), Math.random()*(TARGET_AREA_WIDTH-size+1)];
    if (Math.abs(hw[0]-prevHW[0]) > size || Math.abs(hw[1]-prevHW[1]) > size){
      return hw
    }
  }
}

function App() {
  const [goal, setGoal] = useState(10);
  const [targetSize, setTargetSize] = useState(50);
  const [targetHW, setTargetHW] = useState([0, 0]);
  const [nextTargetHW, setNextTargetHW] = useState([0, 0]);
  const [gameState, setGameState] = useState(0);
  const clickCountRef = useRef(0);

  const start = () => {
    setGameState(1);
    setTargetHW(getRandomHW(targetSize, nextTargetHW));
    setNextTargetHW(getRandomHW(targetSize, targetHW));
    clickCountRef.current = 0;
  }

  const clickTarget = (e) => {
    clickCountRef.current++;
    if (clickCountRef.current === goal){
      setGameState(0);
      return;
    }
    setTargetHW(nextTargetHW);
    setNextTargetHW(getRandomHW(targetSize, nextTargetHW));
    e.preventDefault();
  }

  const boxStyle = {
    position:"absolute",
    height: targetSize,
    width: targetSize,
  }

  return (
    <div style={{padding: 40}} onContextMenu={(e) => {e.preventDefault();}}>
      <div style={{height: TARGET_AREA_HEIGHT, width: TARGET_AREA_WIDTH, border: "1px solid black", display: gameState===0?"none":"block", position: "relative"}}>
        <div style={{top: nextTargetHW[0], left: nextTargetHW[1], border: "2px black solid", boxSizing: "borderBox", ...boxStyle}}></div>
        <div onContextMenu={clickTarget} style={{top: targetHW[0], left: targetHW[1], background: "red", ...boxStyle}}></div>
      </div>
      <div>
        <label>回数</label>
        <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} disabled={gameState===1}/>
      </div>
      <div>
        <label>サイズ</label>
        <input type="number" value={targetSize} onChange={(e) => setTargetSize(Number(e.target.value))} disabled={gameState===1}/>
      </div>
      <div>
        <button onClick={start} disabled={gameState===1}>開始</button>
      </div>
    </div>
  );
}

export default App;