import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const handleChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedJson = JSON.parse(jsonInput);
            console.log('Parsed JSON:', parsedJson); 
            const response = await axios.post('http://localhost:3000/bfhl', parsedJson);
            console.log('API Response:', response.data); 
            setResponseData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error:', err); 
            setError('Invalid JSON format or API call failed');
        }
    };
    
    const handleDropdownChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const renderResponse = () => {
        if (!responseData) return null;
        return (
            <div>
                {selectedOptions.includes('Alphabets') && (
                    <div>
                        <h3>Alphabets:</h3>
                        <p>{responseData.alphabets.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Numbers') && (
                    <div>
                        <h3>Numbers:</h3>
                        <p>{responseData.numbers.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div>
                        <h3>Highest Lowercase Alphabet:</h3>
                        <p>{responseData.highest_lowercase_alphabet.join(', ')}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={handleChange}
                    placeholder='Enter JSON here...'
                    rows='4'
                    cols='50'
                ></textarea>
                <br />
                <button type='submit'>Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseData && (
                <>
                    <label>Filter Options:</label>
                    <select multiple onChange={handleDropdownChange}>
                        <option value='Alphabets'>Alphabets</option>
                        <option value='Numbers'>Numbers</option>
                        <option value='Highest lowercase alphabet'>Highest lowercase alphabet</option>
                    </select>
                    {renderResponse()}
                </>
            )}
        </div>
    );
};

export default FormComponent;
