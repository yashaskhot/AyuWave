import React, { useState } from 'react';
import "../Styles/Menu.css";

const Menu = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex === activeButton ? null : buttonIndex);
  };

  return (
    <>
      <div className="overflow-hidden">
        <hr className="mt-5" />
        <div className="d-flex flex-row">
          <button
            className={`menutag ${
              activeButton === 0 ? 'text-success' : ''
            }`}
            onClick={() => handleClick(0)}
          >
            Home
          </button>
          <button
            className={`menutag ${
              activeButton === 1 ? 'text-success' : ''
            }`}
            onClick={() => handleClick(1)}
          >
            About
          </button>
          <button
            className={`menutag ${
              activeButton === 2 ? 'text-success' : ''
            }`}
            onClick={() => handleClick(2)}
          >
            Projects
          </button>
          <button
            className={`menutag ${
              activeButton === 3 ? 'text-success' : ''
            }`}
            onClick={() => handleClick(3)}
          >
            Posts
          </button>
          <button
            className={`menutag ${
              activeButton === 4 ? 'text-success' : ''
            }`}
            onClick={() => handleClick(4)}
          >
                Liked      </button>
          <button
            className={`menutag ${
              activeButton === 5 ? 'text-success' : ''
            }`}
            onClick={() => handleClick(5)}
          >
            Tagged
          </button>
          <button
            className={`menutag ${
              activeButton === 6 ? 'text-success' : ''
            }`}
            onClick={() => handleClick(6)}
          >
            Videos
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
