import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontIcon from '@mui/icons-material/StorefrontTwoTone'; //icon toko

export default function Navbar({ cartCount, onCartClick }) {
    return (
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #E5E7EB', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
            <Toolbar sx={{ height: 80 }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="logo"
                    sx={{ mr: 1 }}
                >
                    <StorefrontIcon fontSize="large" />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: '-0.5px', color: '#111827' }}>
                    Mini Shop
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="default"
                    aria-label="show cart items"
                    onClick={onCartClick}
                    sx={{ 
              backgroundColor: '#F3F4F6', 
              '&:hover': { backgroundColor: '#E5E7EB' } // Efek hover bulat
            }}
                >
                    <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}



// AppBar itu seperti tag header/navbar (alasnya)
// Toolbar itu container di dalam AppBar
    // Toolbar adalah komponen yang membuat isi di dalamnya (Logo, Teks, Keranjang) jadi rapi berjejer ke samping (horizontal) dan punya jarak (padding) yang pas di kiri-kanannya.
// Typography itu untuk teks
// IconButton itu tombol yang berisi icon
// Badge itu untuk menampilkan notifikasi angka di pojok icon

//ATTRIBUTE EXPLANATION:
//1. color="inherit": Artinya warnanya ngikutin induknya. Karena AppBar warnanya biru dan teksnya putih, maka ikon ini otomatis jadi putih.
//2. sx={{ mr: 2 }}: Ini adalah cara MUI untuk menambahkan style custom. "mr" itu singkatan dari "margin right" 16px
//3. Typography: Ini komponen MUI untuk Teks. Jangan pakai <p> atau <h1> biasa kalau pakai MUI, pakailah Typography biar font-nya otomatis bagus (Roboto).
//4. variant="h6": Tolong tampilkan teks ini dengan gaya Heading 6
//5. component="div": "Secara tampilan memang H6, tapi secara struktur HTML anggap saja ini div biasa". (Ini untuk SEO dan struktur semantik).
//6. sx={{ flexGrow: 1 }}: Karena teks ini mengembang memenuhi tengah navbar, dia otomatis mendorong elemen di sebelahnya (Tombol Keranjang) sampai mentok ke pojok kanan. Ini konsep Flexbox.
//7. Badge: Ini komponen "Stiker Merah" kecil itu. 
//8. badgeContent={4}: Angka yang mau ditampilkan di stiker merah itu adalah 4. Biasanya ini diambil dari state atau props, misal: jumlah barang di keranjang.
//9  color="error": Warna stiker merah itu pakai warna "error" dari tema MUI (biasanya merah).