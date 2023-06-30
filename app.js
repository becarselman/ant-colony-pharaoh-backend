const express = require('express');
const cors = require("cors");
const env = require("./configuration/env");
const loginRoutes = require("./routes/login");
const bodyParser = require('body-parser');
const sendMailRouter = require('./routes/sendemail');
const registerRoutes = require("./routes/register");
const projectRoutes = require('./routes/projects');
const forgotPasswordRoute = require('./routes/forgotPassword');
const resetPasswordRoute = require('./routes/resetPassword.js');
const usersRoutes = require('./routes/users');
const employeeRoutes = require('./routes/employee');
const tokenRoutes = require('./routes/validateToken');

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(cors({
  origin: env.FRONTEND_URL,
  optionsSuccessStatus: 200
}));

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use('/projects', projectRoutes);
app.use('/users', usersRoutes);
app.use('/employee', employeeRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/sendmail', sendMailRouter);
app.use('/forgot-password', forgotPasswordRoute);
app.use('/reset-password', resetPasswordRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(tokenRoutes);

app.listen(port, async () => {
  console.log(`Express application is running on ${port}`);
});
