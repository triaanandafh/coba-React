import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const products = [
  {
    id: 1,
    name: "Sepatu Running Keren",
    price: 500000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    description: "Sepatu ringan untuk lari pagi, bahan breathable."
  },
  {
    id: 2,
    name: "Headphone Bluetooth",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Suara bass nendang, baterai tahan 24 jam."
  },
  {
    id: 3,
    name: "Jam Tangan Klasik",
    price: 850000,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
    description: "Tampil elegan dengan desain minimalis."
  },
  {
    id: 4,
    name: "Kamera Analog",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    description: "Tangkap momen vintage dengan hasil estetik."
  },
  {
    id: 5,
    name: "Kacamata Hitam",
    price: 150000,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    description: "Pelindung UV maksimal untuk liburan pantai."
  },
  {
    id: 6,
    name: "Tas Ransel Laptop",
    price: 450000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    description: "Muat laptop 15 inch, anti air dan kuat."
  },
];
export default function ProductList({ onAddToCart }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

  return (
    <Grid container spacing={4}>
        {products.map((product) => (
            <Grid key={product.id} size={{ xs:12, sm:6, md:4 }}>
                <Card sx={{ height:'100%', display:'flex', flexDirection: 'column'}}>
                    <CardMedia 
                    image={product.image}
                    component="img"
                    height="200"
                    alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" gutterBottom>{product.name}</Typography>
                        <Typography variant="body2" color='primary'>{formatRupiah(product.price)}</Typography>
                        <Typography variant="body2" color='text.secondary' paragraph>{product.description}</Typography>
                    </CardContent>
                    <CardActions  sx={{ mb:2 }}>
                        <Button size="small" variant='contained' startIcon={<AddShoppingCartIcon />} onClick={() => onAddToCart(product)} sx={{px: 3, py:1, borderRadius:8}}>Beli</Button>
                        <Button size="small" color='primary'>Detail</Button>
                    </CardActions>
                </Card>
        </Grid>
        ))}
    </Grid>
  );
}

