require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

import routes from './src/routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
routes(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
