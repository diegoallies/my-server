const express = require('express');
const cors = require('cors')
const projectRoutes = require('./Routes/projectRoutes');
const contactRoutes = require("./Routes/contactRoutes");
    
const app = express();

app.set('port', process.env.PORT || 3000)

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({msg:"welcome to Diegos server backend"});
});


app.use("/projects", projectRoutes);
app.use("/contact", contactRoutes);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')} ...`));