import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEmployee from './components/CreateEmployee.jsx';
import EmployeeList from './components/EmployeeList';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;