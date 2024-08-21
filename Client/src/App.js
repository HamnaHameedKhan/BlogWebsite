import './App.css';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import axios from '../src/axios'
import CreateBlog from './components/Blogs/CreateBlog';
import UserBlogsPage from './components/Blogs/UserBlogPage';
import BlogDetailPage from './components/Blogs/BlogDetailsPage';
import EditBlogPage from './components/Blogs/EditBlogPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
        try {
          await axios.get('/api/users/verify', {
            headers: {
              'x-auth-token': token
            }
          });
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Token validation failed:', err.response.data);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      }
    };

    checkAuthStatus();
  }, []);

  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };
  return (
    <BrowserRouter>
          <ToastContainer />

      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/' element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path="/createBlog"  element={isAuthenticated ? <CreateBlog /> : <Navigate to="/login" />}/>
        <Route
          path="/userblogs"
          element={isAuthenticated ? <UserBlogsPage /> : <Navigate to="/login" />}
        />
        <Route path='/blogsDetail/:id' element={<BlogDetailPage />} />
        <Route path="/editBlog/:id" element={<EditBlogPage/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
