import React from 'react';
import './founderPage.css';
import { Link } from 'react-router-dom';


const FounderPage = () => (
    <div>
    <Link to="/posts">
      <button>Posts</button>
    </Link>
  </div>
);

export default FounderPage;
