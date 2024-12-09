//const app = require('./app');
import  app from "./app.js";
import PORT from "./config/env.js"
//const { PORT } = require('./config/env');

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});