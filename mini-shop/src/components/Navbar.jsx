import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront'; //icon toko

export default function Navbar({ cartCount, onCartClick }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="logo"
                    sx={{ mr: 2 }}
                >
                    <StorefrontIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mini Shop
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="show cart items"
                    onClick={onCartClick
                    }
                >
                    <Badge badgeContent={cartCount} color="error">
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