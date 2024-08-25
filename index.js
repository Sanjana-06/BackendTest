const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use(express.json());


    
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    if (!Array.isArray(data)) {
        return res.status(400).json({ "is_success": false, "message": "Invalid input, data should be an array" });
    }
    const userId = "john_doe_17091999"; 
    const email = "john@xyz.com"; 
    const rollNumber = "ABCD123"; 

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    res.json({
        "is_success": true,
        "user_id": userId,
        "email": email,
        "roll_number": rollNumber,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet
    });
});
    

