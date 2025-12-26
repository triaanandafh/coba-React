import React, { useState } from 'react'

export default function LiveTyping() {
  const [text, setText] = useState('');

  const handleChange = (typing) => {
    const userTyping = typing.target.value;  //typing:laporannya, .target:pelakunya, .value:isinya apa sekarang
    setText(userTyping);  //biar state text diupdate sesuai input user
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", textAlign: "center", marginTop: "0", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <h1 style={{ color: text.length > 20 ? "red" : "black" }}>{text ? text : "Type something..."}</h1>

        <input 
        type="text" 
        value={text}
        placeholder='Type something...'
        onChange={handleChange}
        style={{ padding: "10px", fontSize: "16px", width: "300px" }}
        //onchange event to capture user input and update state
        />
        <p>Jumlah huruf: {text.length}</p>
        {text.length > 20 && <p style={{ color: "red" }}>Kepanjangan woi!</p>}

        <div style={{ marginTop: "10px", gap: "10px", display: "flex" }}>
          <button onClick={() => setText(text.toUpperCase())}>
            CAPSLOCK
          </button>

          <button onClick={() => setText("")}>
            Hapus
          </button>
        </div>
        
      </div>
    </>
  )
}


