const express = require('express');
const cors = require('cors');
require('dotenv').config();
const crud = require('./Crud/crud')
const path = require('path')

const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(cors());
app.use('/api',crud);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
