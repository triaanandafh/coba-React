import { useState, useEffect } from "react";

export const useGameLogic = (initialCardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // Menyimpan ID kartu yang sedang terbuka
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  // Fungsi untuk mengacak dan inisialisasi game
  const initializeGame = () => {
    const shuffledCards = [...initialCardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setIsGameComplete(false);
  };

  // Jalankan init saat pertama kali load
  useEffect(() => {
    initializeGame();
  }, []); // Dependency kosong: jalan sekali saat mount

  // Cek apakah game selesai setiap kali 'cards' berubah
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameComplete(true);
    }
  }, [cards]);

  const handleCardClick = (clickedCard) => {
    // Validasi:
    // 1. Jangan proses jika sedang ada 2 kartu terbuka (tunggu animasi selesai)
    // 2. Jangan proses jika kartu sudah terbuka atau sudah matched
    if (
      flippedCards.length >= 2 ||
      clickedCard.isFlipped ||
      clickedCard.isMatched
    ) {
      return;
    }

    // Flip kartu visual
    const newCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    // Simpan kartu ke penampung sementara
    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Jika sudah ada 2 kartu terbuka, cek kecocokan
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1); // Tambah move count
      checkForMatch(newFlippedCards, newCards);
    }
  };

  const checkForMatch = (currentFlipped, currentCards) => {
    const [card1, card2] = currentFlipped;

    if (card1.value === card2.value) {
      // --- MATCH ---
      setScore((prev) => prev + 10); // Tambah skor
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === card1.id || card.id === card2.id
            ? { ...card, isMatched: true, isFlipped: true }
            : card
        )
      );
      // Reset penampung langsung
      setFlippedCards([]);
    } else {
      // --- NOT MATCH ---
      // Tunggu 1 detik sebelum menutup kembali
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        // Reset penampung setelah animasi selesai
        setFlippedCards([]);
      }, 1000);
    }
  };

  return {
    cards,
    score,
    moves,
    isGameComplete,
    handleCardClick,
    initializeGame,
  };
};