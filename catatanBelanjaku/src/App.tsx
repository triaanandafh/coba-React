import { useState } from 'react'
import Headers from './components/Header';

const gorceryItems = [
  { id: 1, name: "Kopi", quantity: 1, checked: true },
  { id: 2, name: "Gula Pasir", quantity: 5, checked: true },
  { id: 3, name: "Air Mineral", quantity: 3, checked: false },
  { id: 4, name: "Air Soda", quantity: 3, checked: false },
]

function App() {
  const [count, setCount] = useState(0)     //ini juga state
  const [items, setItems] = useState(gorceryItems);  //ini namanya state

  function handleAddItem(item) {
    setItems([...items, item]);
  }
  
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item));
  }

  function handlerClearItem() {
    setItems([]);
  }

  return (
    <>
    <div className="app">
      
      <Headers />    
      <Form onAddItem={handleAddItem} />
      <GroceryList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handlerClearItem} />
      <Footer items={items} /> 
      
    </div>

    </>
  )
}





function GroceryList({ items, onDeleteItem, onToggleItem, onClearItems }) {

  const [sortBy, setSortBy] = useState('input');
  let sortedItems;

  // if (sortBy === 'input') {
  //   sortedItems = items;
  // } 
  // if(sortBy === 'name') {
  //   sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  // }
  // if(sortBy === 'checked') {
  //   sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
  // }
  if (sortBy === 'name') {
    sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'checked') {
    sortedItems = [...items].sort((a, b) => a.checked - b.checked);
  } else {
    sortedItems = items;
  }
  return (
    <>  {/* fragment */}
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
           <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} onClearItems={onClearItems} />
          //  butuh props item untuk dikirimm ke function Item dibawah
          ))}
          
          
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  )
}

function Item({ item, onDeleteItem, onToggleItem, onClearItems }) {
  return (
     <li key={item.id}>
            <input type="checkbox" checked={item.checked} readOnly onClick={() => onToggleItem(item.id)} />
            <span style={item.checked ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.name}</span>
            <button onClick={() => onDeleteItem(item.id)}>&times;</button>
          </li>
  )
}

function Footer({ items }) {
  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  return (<footer className="stats">Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah dibeli ({percentage}%)</footer>
)}


export default App