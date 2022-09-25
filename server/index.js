const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => (
        user.email === email &&
        user.password === password
    ));

    if (!user) {
        res.status(404).send({ message: 'User with this email and password does not exist' });
    }

    const accessToken = jwt.sign(user, 'mysecret101');
    res.send({ accessToken });
});

app.post('/signup', (req, res) => {
    const { email } = req.body;
    const user = users.find(user => user.email === email);

    if (user) {
        res.status(409).send({ message: 'User with this email already exists' });
    }

    users.push(req.body);
    res.send({ Success: 'User created successfully!' });
});

app.listen(9000, () => {
    console.log('server started on http://localhost:9000');
});