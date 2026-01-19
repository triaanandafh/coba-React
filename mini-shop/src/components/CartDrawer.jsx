import React from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Menerima 3 Props dari Bos (App.jsx):
// 1. isOpen: Apakah laci terbuka? (true/false)
// 2. onClose: Fungsi buat nutup laci
// 3. cartItems: Data barang yang sudah dibeli (Array)
export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };
  //buat fitur total harga
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    // anchor="right" artinya muncul dari kanan
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      
      {/* Box ini buat ngatur lebar Drawer */}
      <Box sx={{ width: 350, padding: 2 }} role="presentation">
        
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Keranjang Belanja ({cartItems.length})
        </Typography>
        <Divider />

        {/* LIST BARANG */}
        <List>
          {cartItems.map((item, index) => (
            // Kita pakai index sebagai key sementara karena barang bisa duplikat
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start"
              secondaryAction={ 
              <IconButton edge="end" aria-label='delete' onClick={() => onRemoveItem(index)}> <DeleteIcon /> </IconButton>
              } >
                {/* Foto Kecil (Avatar) */}
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.image} variant="square" />
                </ListItemAvatar>
                
                {/* Teks Nama & Harga */}
                <ListItemText
                  primary={item.name}
                  secondary={
                    <Typography component="span" variant="body2" color="text.primary">
                      {formatRupiah(item.price)}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>

        {/* Kalau kosong, kasih pesan */}
        {cartItems.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', marginTop: 4 }}>
            Keranjang masih kosong nih...
          </Typography>
        )}

        {/* Tombol Checkout */}
        {cartItems.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant='h6' fontWeight="bold">Total:</Typography>
                <Typography variant='h6' fontWeight="bold" color="primary">
                  {formatRupiah(totalPrice)}
                  </Typography>
            </Box>
            <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>
                Checkout Sekarang
            </Button>
          </Box>
        )}

      </Box>
    </Drawer>
  );
}


// React.Fragment digunakan sebagai pembungkus saja, karena bisa diberi key.