const assert = require('assert');
const axios = require('axios');
    
    describe('API Test suite for Getting Delayed users Response', function(){
    // Test case for GET - Delayed Response
    it('should fetch delayed user response', async function() {
        const response = await axios.get('/api/users?delay=3');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.page, 1);
        assert.strictEqual(response.data.data.length, 6);
    });
    // Test CasE for Delayed Response with Invalid Delay Parameter
    it('should handle invalid delay parameter', async function() {
        try {
            await axios.get('/api/users?delay=invalid');
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid delay parameter");
        }
    });
    // Test Case For Delayed Response Timeout
    it('should handle delayed response timeout', async function() {
        try {
            // Set the delay to a smaller value (e.g., 1 second) to force a timeout
            await axios.get('/api/users?delay=5');
        } catch (error) {
            assert.strictEqual(error.code, 'ECONNABORTED');
            assert.strictEqual(error.message, 'timeout of 5000ms exceeded');
        }
    });
})
    