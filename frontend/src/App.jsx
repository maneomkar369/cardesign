import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DesignDetail from './pages/DesignDetail';
import CreateDesign from './pages/CreateDesign';
import EditDesign from './pages/EditDesign';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/designs/:slug" element={<DesignDetail />} />
          <Route path="/create" element={<CreateDesign />} />
          <Route path="/designs/:slug/edit" element={<EditDesign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
