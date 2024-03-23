// Pokemon.jsx
import React from 'react';

function Pokemon({ pokemon, language }) {
  return (
    <div className='pokemon-card'>
      <img src={pokemon.image} alt={pokemon.name.english} className="pokemon-image"/>
      <p> "[{pokemon.id}] {pokemon.name[language]}"</p>
    </div>
  );
}

export default Pokemon;
