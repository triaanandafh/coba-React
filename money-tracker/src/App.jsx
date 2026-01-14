import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // --- STATE ---
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');
  const [isExpense, setIsExpense] = useState(true); 

  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem("my-money-data");
    try {
      // Validasi ekstra: pastikan yang diambil adalah Array
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData)) {
        return parsedData.filter(item => item.id && item.category);
      }
      
      return [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("my-money-data", JSON.stringify(transactions));
  }, [transactions]);

  // --- HELPER FUNCTIONS ---
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Fungsi baru untuk mendapatkan emoji berdasarkan kategori
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Food': return '🍔';
      case 'Transport': return '🚗';
      case 'Shopping': return '🛒';
      case 'Salary': return '💰';
      case 'Entertainment': return '🎬';
      default: return '📝';
    }
  };

  // --- LOGIC ---
  const addTransaction = (e) => {
    e.preventDefault();
    if (!amount || !category) {
      alert("Please fill in amount and category!");
      return;
    }

    let finalAmount = +amount;
    if (isExpense) finalAmount = -1 * Math.abs(finalAmount);
    else finalAmount = Math.abs(finalAmount);

    const newTransaction = { 
       id: Math.floor(Math.random() * 1000000),
       date: date,
       category: category,
       note: note || category, // Kalau note kosong, pakai nama kategori aja
       amount: finalAmount
    }

    setTransactions([newTransaction, ...transactions]);
    setAmount('');
    setNote('');
  }

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
  }

  return (
    // Container Utama sekarang menggunakan Flexbox (kiri-kanan)
    <div className="main-container">
      
      {/* --- KOLOM KIRI: FORM TRANSAKSI --- */}
      <div className="form-section">
        <h2>New Transaction</h2>
        <form onSubmit={addTransaction}>
          {/* Toggle Income/Expense */}
          <div className="toggle-wrapper">
            <button type="button" className={`toggle-btn ${!isExpense ? 'active' : ''}`} onClick={() => setIsExpense(false)}>Income</button>
            <button type="button" className={`toggle-btn ${isExpense ? 'active' : ''}`} onClick={() => setIsExpense(true)}>Expenses</button>
          </div>

          {/* Inputs */}
          <div className="form-group">
            <label>Date</label>
            <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Amount (Rp)</label>
            <input type="number" className="input-field" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <input type="text" className="input-field" placeholder="Enter notes (e.g. Nasi Padang)" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          <button type="submit" className="save-btn">Save Transaction</button>
        </form>
      </div>

      {/* --- KOLOM KANAN: HISTORY --- */}
      {transactions.length > 0 && (
      <div className="history-section">
        <h3>Recent History</h3>
        
        {transactions.length === 0 ? (
          <p style={{color: '#aaa', textAlign: 'center'}}>No transactions yet.</p>
        ) : (
          <ul className="history-list">
            {transactions.map((t) => {
              // --- PERBAIKAN PENTING ---
              // Cek apakah datanya lengkap. Jika rusak (tidak punya ID atau Category), jangan dirender.
              // Ini akan menghilangkan item hantu (-300, +500) yang rusak.
              if (!t || !t.id || !t.category) return null;

              return (
                <li key={t.id} className="history-item">
                  {/* Tombol Hapus Kecil */}
                  <button className="delete-btn-small" onClick={() => deleteTransaction(t.id)}>X</button>
                  
                  {/* Ikon Kategori */}
                  <div className="history-icon">{getCategoryIcon(t.category)}</div>
                  
                  {/* Detail Teks */}
                  <div className="history-details">
                    <h4>{t.category}</h4>
                    <p>{t.date} • {t.note}</p>
                  </div>
                  
                  {/* Nominal */}
                  <div className={`history-amount ${t.amount < 0 ? 'minus' : 'plus'}`}>
                    {formatRupiah(t.amount)}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      )}
    </div>
  )
}

export default App