import React from "react";

const PokeCard = ({ pokemon, isEnemy }) => {
  // Hitung persentase nyawa untuk lebar bar
  // Rumus: (Nyawa Sekarang / Nyawa Full) * 100
  const hpPercentage = (pokemon.hp / pokemon.maxHp) * 100;

  return (
    <div className="card">
      {/* Tampilkan Nama (Huruf kapital di awal) */}
      <h2>{pokemon.name.toUpperCase()}</h2>

      {/* Tampilkan Gambar */}
      <img 
        src={pokemon.image} 
        alt={pokemon.name} 
        className="pokemon-img"
      />

      {/* Tampilkan Angka HP */}
      <p className="hp-text">{pokemon.hp} / {pokemon.maxHp} HP</p>

      {/* Tampilkan Bar Merah (Health Bar) */}
      <div className="hp-bar-container">
        <div 
          className="hp-bar-fill" 
          style={{ width: `${hpPercentage}%`, backgroundColor: hpPercentage > 50 ? "green" : hpPercentage > 20 ? "orange" : "red" }} // <--- Ini logika visualnya!
        ></div>
      </div>
    </div>
  );
};

export default PokeCard;