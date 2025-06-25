import './App.css';
import ReadingChart from './components/ReadingChart.tsx';

function App() {
  return (
    <div className='App'>      
      <h1>Live Temperature Readings</h1>
      <div className="chartWrapper">
        <ReadingChart />
      </div>
    </div>
  );
}

export default App;
