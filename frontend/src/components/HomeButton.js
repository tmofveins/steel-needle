import React from 'react';

const HomeButton = () => {
  return (
    <button className="home-button" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
      Home
    </button>
  );
}

export default HomeButton;
