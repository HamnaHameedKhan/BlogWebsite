import React,{useState,useEffect} from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Blogs from '../components/Blogs/Blogs'
import axios from '../axios'


const HomePage = ({ isAuthenticated }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs/all_blogs');
        setBlogs(response.data);
        
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    window.location.hash = '#blogs';
  };
  return (
    <>
   <Categories categories={['All', 'Technology', 'Health', 'Travel', 'Lifestyle', 'Education', 'Food', 'Entertainment', 'Politics', 'Social']} onCategoryClick={handleCategoryClick} />
   <Hero isAuthenticated={isAuthenticated}/>
   <Blogs blogs={blogs} selectedCategory={selectedCategory} />

   
   
     
      
    </>
  )
}

export default HomePage
