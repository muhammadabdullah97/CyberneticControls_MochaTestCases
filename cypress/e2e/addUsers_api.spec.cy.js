const assert = require('assert');
const axios = require('axios');

describe('API Test Suite', function() {
    let createdUserId = null;

    // Test case for POST - Create
    it('should create a new user', async function() {
        const requestData = {
            "name": "morpheus",
            "job": "leader"
        };

        const response = await axios.post('/api/users', requestData);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.data.name, requestData.name);
        assert.strictEqual(response.data.job, requestData.job);
        assert.ok(response.data.id);
        assert.ok(response.data.createdAt);
        createdUserId = response.data.id;
    });

    // Test case for PUT - Update
    it('should update user information using PUT', async function() {
        const requestData = {
            "name": "morpheus",
            "job": "zion resident"
        };

        const response = await axios.put(`/api/users/${createdUserId}`, requestData);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.name, requestData.name);
        assert.strictEqual(response.data.job, requestData.job);
        assert.ok(response.data.updatedAt);
    });

    // Test case for PATCH - Update
    it('should update user information using PATCH', async function() {
        const requestData = {
            "name": "morpheus",
            "job": "zion resident"
        };

        const response = await axios.patch(`/api/users/${createdUserId}`, requestData);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.name, requestData.name);
        assert.strictEqual(response.data.job, requestData.job);
        assert.ok(response.data.updatedAt);
    });

    // Test case for DELETE
    it('should delete a user', async function() {
        const response = await axios.delete(`/api/users/${createdUserId}`);
        assert.strictEqual(response.status, 204);
    });
});
