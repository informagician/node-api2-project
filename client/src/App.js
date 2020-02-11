import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        console.log(res)
        setPosts(res.data)
      })
      .catch(err => console.log(err))
  },[])
  return (
    <>
      <div>
        {posts.map(post => (
          <>
          <h3>{post.title}</h3>
          <p>{post.contents}</p>
          <p>{post.created_at}</p>
          <span>[Delete]</span><span>[Edit]</span>
          <hr/>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
