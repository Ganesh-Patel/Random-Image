import express from 'express';
import axios from 'axios';

const app = express();
const port = 3002;


const helper = async () => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data.value; 
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    throw new Error('Failed to fetch joke from API');
  }
};

app.get('/', async (req, res) => {
  try {
    const joke = await helper(); 
    res.json({ joke }); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching joke. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
