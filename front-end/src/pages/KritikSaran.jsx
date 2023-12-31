import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Rating,
  Button,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

// mandi
// potong kuku
// basmi kutu
// potong bulu
// grooming (semua)

const reviews = [
  { id: 1, name: 'John Doe', rating: 3, kritik: 'Great product, highly recommended!', saran: 'ini saran', category: 'Mandi' },
  { id: 2, name: 'Jane Smith', rating: 4, kritik: 'Excellent service and quality.', saran: 'ini saran', category: 'Mandi' },
  { id: 3, name: 'Jane a', rating: 4, kritik: 'Excellent service and quality.', saran: 'ini saran', category: 'Potong Bulu' },
  { id: 4, name: 'Jane b', rating: 4, kritik: 'Excellent service and quality.', saran: 'ini saran', category: 'Basmi Kutu' },
  { id: 5, name: 'Jane c', rating: 5, kritik: 'Excellent service and quality.', saran: 'ini saran', category: 'Grooming' },
  { id: 6, name: 'Jane d', rating: 5, kritik: 'Excellent service and quality.', saran: 'ini saran', category: 'Mandi' },
  { id: 7, name: 'Jane e', rating: 5, kritik: 'Excellent service and quality.', saran: 'ini saran', category: 'Potong kuku' },
];

const KritikSaran = () => {
  const [sortBy, setSortBy] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [jumlahDisplay, setJumlahDisplay] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: '',
    kritik: '',
    saran: '',
    category: 'Grooming', // Default category for new reviews
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSort = (order) => {
    setSortBy(order);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmitReview = () => {
    // Handle submitting the new review (e.g., send it to an API)
    console.log('Submitting review:', newReview);
    // Reset the form after submission
    setNewReview({
      name: '',
      rating: '',
      kritik: '',
      saran: '',
      category: 'Grooming',
    });
    // Hide the form after submission
    setShowForm(false);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'lowest') {
      return a.rating - b.rating;
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lastAdded') {
        return b.id - a.id;
    }
    return 0;
  });

  const filteredReviews = selectedCategory === 'All'
    ? sortedReviews
    : sortedReviews.filter(review => review.category === selectedCategory);

  const displayedReviews =
    showAllReviews || filteredReviews.length <= jumlahDisplay
      ? filteredReviews
      : filteredReviews.slice(0, jumlahDisplay);

  const categories = Array.from(new Set(reviews.map(review => review.category)));
  categories.unshift('All');

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Kritik dan Saran</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        {/* BUTTON SORT-------- */}
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          Sort : 
          <Button onClick={() => handleSort('lowest')}>by Lowest</Button>
          <Button onClick={() => handleSort('highest')}>by Highest</Button>
          <Button onClick={() => handleSort('lastAdded')}>by Recent added</Button>
        </Box>
        {/* ----------------- */}

        {/* CATEGORY SELECT */}
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Select
            label="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {/* ----------------- */}

        <Grid container spacing={3}>
          {displayedReviews.map((review) => (
            <Grid item key={review.id} xs={12} md={6} lg={4}>
              <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6">{review.name}</Typography>
                <Box sx={{ display: 'flex',  mb: 1, alignItems:"center"}}>
                {/* <Typography variant="body1" sx={{ mr: 1, color: 'text.secondary' }}>
                    {review.rating}.0
                  </Typography>
                  <Rating value={review.rating} readOnly precision={0.5} icon={<StarIcon fontSize="inherit" />} /> */}
                </Box>
                <Typography variant="body1"> Kritik : {review.kritik}</Typography>
                <Typography variant="body1"> Saran : {review.saran}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* BUTTON SHOW ALL */}
        {filteredReviews.length > jumlahDisplay && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            {showAllReviews ? (
              <Button onClick={() => setShowAllReviews(false)}>Show Less Reviews</Button>
            ) : (
              <Button onClick={() => setShowAllReviews(true)}>
                {showAllReviews ? 'Show Less Reviews' : 'Show More Reviews'}
              </Button>
            )}
          </Box>
        )}
        
        {/* BUTTON SHOW FORM */}
        {!showForm && (
          <Box sx={{ my: 3, textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={()=>setShowForm(true)}>
              Buat Kritik dan Saran?
            </Button>
          </Box>
        )}

        {showForm && (
        <Box sx={{ my: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                 Kritik dan Saran
            </Typography>
            <form>
                <TextField
                label="Your Name"
                name="name"
                value={newReview.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                />
                <TextField
                label="Rating"
                name="rating"
                value={newReview.rating}
                onChange={handleChange}
                fullWidth
                margin="normal"
                />
                <TextField
                label="Kritik"
                name="kritik"
                value={newReview.kritik}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                />
                <TextField
                label="Saran"
                name="saran"
                value={newReview.saran}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSubmitReview}>
                Submit
                </Button>
            </form>
            </Box>
        )}
        </Container>
    </React.Fragment>
  );
};

export default KritikSaran;
