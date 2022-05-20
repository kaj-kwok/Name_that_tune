import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import DashboardProvider from './providers/DashboardProvider';

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  return (
    <DashboardProvider>
      {code ? <Dashboard /> : <Login />}
    </DashboardProvider>
  );
}

export default App;
