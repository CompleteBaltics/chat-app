const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicPath));
app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});


console.log(__dirname + '/../public');
console.log(publicPath);
