import React from 'react';

const SearchButton = ({ openModal }) => (
  <button
    className="navbar-item searchButton"
    onClick={openModal}
    aria-label="Open search modal"
    type="button"
  >
    <span className="icon searchIcon" aria-label="Magnifying glass icon">
      <i className="fas fa-search" />
    </span>
    Search
  </button>
);

export default SearchButton;
