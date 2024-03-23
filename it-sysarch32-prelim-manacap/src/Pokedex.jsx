// Pokedex.jsx
import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [language, setLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Back</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
      <p>Page {currentPage} of {totalPages}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {pokemonList.map(pokemon => (
            <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
