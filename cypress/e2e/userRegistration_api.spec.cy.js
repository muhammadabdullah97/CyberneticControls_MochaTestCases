const assert = require('assert');
const axios = require('axios');

describe('API Test Suite For Registration', function() {
    let token = null;

    // Test case for POST - Register Successful
    it('should successfully register a user', async function() {
        const requestData = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        };

        const response = await axios.post('/api/register', requestData);
        assert.strictEqual(response.status, 200);
        assert.ok(response.data.id);
        assert.ok(response.data.token);
        token = response.data.token;
    });

    // Test case for POST - Register Unsuccessful
    it('should handle unsuccessful registration', async function() {
        const requestDataOne = {
            "email": "sydney@fife"
        };

        try {
            await axios.post('/api/register', requestDataOne);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Missing password");
        }
        // Test Case 2: Incorrect email format and correct password
    const requestDataTwo= {
        "email": "invalidemailformat",
        "password": "Test123"
    };

    try {
        await axios.post('/api/register', requestDataTwo);
    } catch (error) {
        assert.strictEqual(error.response.status, 400);
        assert.strictEqual(error.response.data.error, "Invalid email format");
    }

    // Test Case 3: Weak password
    const requestDataThree = {
        "email": "validemail@example.com",
        "password": "weak"
    };

    try {
        await axios.post('/api/register', requestDataThree);
    } catch (error) {
        assert.strictEqual(error.response.status, 400);
        assert.strictEqual(error.response.data.error, "Weak password");
    }
    });

    // Test case for POST - Login Successful
    it('should successfully login', async function() {
        const requestData = {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        };

        const response = await axios.post('/api/login', requestData);
        assert.strictEqual(response.status, 200);
        assert.ok(response.data.token);
        token = response.data.token;
    });

    // Test case for POST - Login Unsuccessful
    it('should handle unsuccessful login', async function() {
        const requestDataOne = {
            "email": "peter@klaven"
        };

        try {
            await axios.post('/api/login', requestDataOne);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Missing password");
        }
        // Test Case 2: Incorrect password
    const requestDataTwo = {
        "email": "peter@klaven",
        "password": "Test123"
    };

    try {
        await axios.post('/api/login', requestDataTwo);
    } catch (error) {
        assert.strictEqual(error.response.status, 401);
        assert.strictEqual(error.response.data.error, "Invalid credentials");
    }

    // Test Case 3: Incorrect email and correct password
    const requestDataThree = {
        "email": "peter@klaven.com",
        "password": "correctpassword"
    };

    try {
        await axios.post('/api/login', requestDataThree);
    } catch (error) {
        assert.strictEqual(error.response.status, 401);
        assert.strictEqual(error.response.data.error, "Invalid credentials");
    }
    });
});
