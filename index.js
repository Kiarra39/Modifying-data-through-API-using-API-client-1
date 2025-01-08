const express = require('express');
require('dotenv').config();
const { resolve } = require('path');
const mongoose= require('mongoose');
const MenuItem= require ('./schema.js');

const app = express();

const port = 3010;

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.post('/menu', async(req,res)=>{
  try{
    const {name, description, price}= req.body;
    if (!name || price == null) {
      return res.status(400).json({ error: 'Name and price are required.' });
  }
  const newItem=new MenuItem({name,description,price});
  const createdItem= await newItem.save();
  res.status(201).json({ message: 'Menu item created successfully.', item: createdItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create menu item.' });
  }
})
app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
