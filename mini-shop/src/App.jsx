import { useState } from 'react'
import { Container, Box, Typography, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'; // <--- 1. Import ini
import Navbar from './components/Navbar.jsx'
import ProductList from './components/ProductList.jsx'
import CartDrawer from './components/CartDrawer.jsx' 

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5', // Warna Indigo/Ungu 
    },
    background: {
      default: '#F9FAFB', // Latar belakang abu-abu 
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827', // Hitam 
      secondary: '#6B7280', // 
    },
  },
  shape: {
    borderRadius: 16, 
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', 
    h6: {
      fontWeight: 700, 
    },
    button: {
      textTransform: 'none', 
      fontWeight: 600,
    }
  }
});

function App() {

  // const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Array barang di keranjang
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Apakah laci terbuka?

  // Hitung nambah barang di keranjang
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsDrawerOpen(true); // Buka laci setiap kali tambah barang
  }

  const handleRemoveFromCart = (indexToRemove) => {
    const newCartItems = cartItems.filter((_, index) => index != indexToRemove);
    setCartItems(newCartItems);
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />   {/* Ini buat reset CSS biar backgroundnya ngikut tema */}
    <Navbar cartCount={cartItems.length}
    onCartClick={() => setIsDrawerOpen(true)} />   {/* Mengapa tidak pakai onCardClick={handleCartClick}? Karena tujuannya bukan untuk menambah barang, tapi membuka laci. */}
      
      {/* Drawer/Sidebar */}
      <CartDrawer cartItems={cartItems} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onRemoveItem={handleRemoveFromCart} />
      
      <Container sx={{ marginTop: 6, marginBottom: 8 }}>
        {/* Header Teks */}
        <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#111827' }}>
            Katalog Produk Spesial 🔥
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'normal' }}>
            Temukan barang impianmu dengan harga terbaik hari ini.
          </Typography>
        </Box>

        {/* 2. Pasang Komponen ProductList di sini */}
        <ProductList onAddToCart={handleAddToCart} />

      </Container>
      
    </ThemeProvider>
  )
}

export default App



// install MUI
// npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/icons-material


//PENJELASAN BBRP FITUR MUI YG DIGUNAKAN:
// 1. Container: Komponen ini digunakan untuk membungkus konten utama aplikasi. Ini memberikan padding dan margin otomatis sehingga konten tidak menempel ke tepi layar, membuat tampilan lebih rapi dan terstruktur.
// 2. Box: Komponen Box adalah elemen serbaguna yang dapat digunakan untuk mengatur tata letak dan gaya. Dalam kode ini, Box digunakan untuk membungkus header teks dan memberikan properti gaya seperti textAlign dan marginBottom.
// 3. Typography: Komponen Typography digunakan untuk menampilkan teks dengan berbagai gaya dan ukuran. Dalam kode ini, Typography digunakan untuk menampilkan judul utama (variant="h4") dan deskripsi (variant="body1") dengan gaya yang konsisten sesuai dengan tema MUI.
// 4. Button: Meskipun tidak langsung terlihat dalam kode utama, Button adalah komponen yang digunakan untuk membuat tombol interaktif. Dalam konteks aplikasi toko online, tombol ini kemungkinan besar digunakan di komponen ProductList untuk menambahkan produk ke keranjang belanja. 
// 5. ShoppingCartIcon: Ini adalah ikon yang diimpor dari paket ikon MUI. Ikon ini biasanya digunakan untuk mewakili keranjang belanja dalam antarmuka pengguna, memberikan indikasi visual kepada pengguna tentang fungsi keranjang belanja.
// 6. gutterbottom: Properti ini digunakan dalam komponen Typography untuk menambahkan margin bawah otomatis, yang membantu memberikan jarak antara elemen teks dan elemen berikutnya di bawahnya, meningkatkan keterbacaan dan tata letak visual.

