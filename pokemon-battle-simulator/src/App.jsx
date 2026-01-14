import { useState, useEffect } from "react";
import PokeCard from "./components/PokeCard";
import "./App.css";

function App() {
  // --- 1. STATE (MEMORI) ---
  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Mulai Pertarungan!");
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // --- 2. FUNGSI AMBIL DATA (API) ---
  const getPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    return {
      name: data.name,
      image: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      maxHp: data.stats[0].base_stat,
    };
  };

  // --- 3. MULAI GAME ---
  const startGame = async () => {
    setLoading(true);
    setMessage("Sedang mencari Pokemon liar...");

    const randomId1 = Math.floor(Math.random() * 151) + 1;
    const randomId2 = Math.floor(Math.random() * 151) + 1;

    const p1 = await getPokemon(randomId1);
    const p2 = await getPokemon(randomId2);

    setPlayer(p1);
    setEnemy(p2);
    setLoading(false);
    setMessage("Giliranmu menyerang!");
    setIsPlayerTurn(true);
  };

  useEffect(() => {
    startGame();
  }, []);

  // --- 4. LOGIKA SERANG ---
  const attack = () => {
    // A. Player Menyerang
    let damage = Math.floor(Math.random() * 10) + 10;
    let isCritical = Math.random() < 0.2; // Peluang 20%

    // --- PERBAIKAN 1: Logic Pesan & Damage ---
    if (isCritical) {
      damage *= 2; // Kali 2
      setMessage(`💥 CRITICAL HIT! Musuh kena ${damage} damage!`);
    } else {
      setMessage(`Kamu menyerang! Musuh kena ${damage} damage!`);
    }

    // --- PERBAIKAN 2: setEnemy ditaruh LUAR if-else ---
    // (Supaya mau critical atau enggak, darah tetap berkurang)
    setEnemy((prev) => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
    
    setIsPlayerTurn(false); // Ganti giliran

    // Cek Menang? (Harus pakai damage yg baru)
    if (enemy.hp - damage <= 0) {
      setMessage("🏆 KAMU MENANG! Musuh pingsan.");
      return;
    }

    // B. Musuh Balas Menyerang
    setTimeout(() => {
      const enemyDamage = Math.floor(Math.random() * 10) + 10;

      setPlayer((prev) => ({ ...prev, hp: Math.max(0, prev.hp - enemyDamage) }));
      setMessage(`Musuh membalas! Kamu kena ${enemyDamage} damage!`);
      setIsPlayerTurn(true);

      if (player.hp - enemyDamage <= 0) {
        setMessage("💀 KAMU KALAH! Pokemonmu pingsan.");
      }
    }, 1500);
  };

  // --- 5. LOGIKA HEAL ---
  const heal = () => {
    if (isPlayerTurn && player.hp > 0 && enemy.hp > 0) {
      const healAmount = Math.floor(Math.random() * 10) + 10;
      
      setPlayer((prev) => ({
        ...prev,
        hp: Math.min(prev.maxHp, prev.hp + healAmount),
      }));
      
      setMessage(`Kamu minum obat! HP bertambah ${healAmount}.`);
      setIsPlayerTurn(false); // Ganti giliran

      // --- PERBAIKAN 3: Jangan lupa panggil Musuh buat nyerang balik! ---
      setTimeout(() => {
        const enemyDamage = Math.floor(Math.random() * 10) + 10;
        setPlayer((prev) => ({ ...prev, hp: Math.max(0, prev.hp - enemyDamage) }));
        setMessage(`Musuh tidak peduli! Kamu kena ${enemyDamage} damage!`);
        setIsPlayerTurn(true);
  
        if (player.hp - enemyDamage <= 0) {
          setMessage("💀 KAMU KALAH! Pokemonmu pingsan.");
        }
      }, 1500);
    }
  }; // <--- INI KURUNG KURAWAL PENUTUP HEAL YANG HILANG TADI

  // --- TAMPILAN (RETURN) ---
  return (
    <div className="app-container">
      <h1>⚡ Pokémon Battle ⚡</h1>

      {loading ? (
        <h2>Mencari Pokemon... 🔍</h2>
      ) : (
        <>
          <div className="battle-arena">
            <div className="player-area">
              <h3>YOU</h3>
              {/* Pastikan player tidak null sebelum dirender */}
              {player && <PokeCard pokemon={player} />}
            </div>
            <div className="vs">VS</div>
            <div className="enemy-area">
              <h3>ENEMY</h3>
              {enemy && <PokeCard pokemon={enemy} />}
            </div>
          </div>

          <div className="controls">
            <h2 className="message-box">{message}</h2>

            {/* Logika Tombol: Kalau Game Masih Jalan */}
            {player.hp > 0 && enemy.hp > 0 ? (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  className="attack-btn"
                  onClick={attack}
                  disabled={!isPlayerTurn}
                >
                  {isPlayerTurn ? "🔥 ATTACK" : "Menunggu..."}
                </button>
                
                <button 
                    className="heal-btn" // Pastikan ada style heal-btn di CSS
                    onClick={heal} 
                    disabled={!isPlayerTurn}
                    style={{ backgroundColor: '#2196F3', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem'}}
                >
                    ❤️‍🩹 HEAL
                </button>
              </div>
            ) : (
              <button className="reset-btn" onClick={startGame}>
                Main Lagi 🔄
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;