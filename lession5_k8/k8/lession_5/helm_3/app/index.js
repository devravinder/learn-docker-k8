const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log(" get /")
    res.send('Hello World from Express! v2');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
