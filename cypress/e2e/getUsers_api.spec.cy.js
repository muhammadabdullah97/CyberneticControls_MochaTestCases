const assert = require('assert');
const axios = require('axios');

describe('API Test Suite For Get All list users', function() {
    // Test case for "Get List Users" endpoint
    it('should fetch a list of users', async function() {
        const response = await axios.get('/api/users?page=2');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.page, 2);
        assert.strictEqual(response.data.data.length, 6);
    });
    // Test Case for Request for Non-existing Page
    it('should handle non-existing page request', async function() {
        try {
            await axios.get('/api/users?page=999');
        } catch (error) {
            assert.strictEqual(error.response.status, 404);
            assert.strictEqual(error.response.data.error, "Page not found");
        }
    });
        //Test Case Fpr Request with Invalid Page Parameter    
        it('should handle invalid page parameter', async function() {
            try {
                await axios.get('/api/users?page=invalid');
            } catch (error) {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(error.response.data.error, "Invalid page parameter");
            }
        });
     //Test Case For Request with Page Parameter Out of Range
     it('should handle page parameter out of range', async function() {
        try {
            await axios.get('/api/users?page=0');
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid page number");
        }
    });
    // Test Case For Request with Negative Page Parameter
    it('should handle negative page parameter', async function() {
        try {
            await axios.get('/api/users?page=-1');
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid page number");
        }
    });
});
describe('Test suite for Get Single Users by Id ', function(){       
    // Test case for "Get Single User" endpoint
    it('should fetch a single user by ID', async function() {
        const userId = 2;
        const response = await axios.get(`/api/users/${userId}`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.data.id, userId);
    });
    // Test Case for Request for Non-existing User
    it('should handle non-existing user request', async function() {
        const nonExistingUserId = 999;
        try {
            await axios.get(`/api/users/${nonExistingUserId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 404);
            assert.strictEqual(error.response.data.error, "User not found");
        }
    });
    // Test Case For Request with Invalid User ID
    it('should handle invalid user ID', async function() {
        const invalidUserId = "invalid";
        try {
            await axios.get(`/api/users/${invalidUserId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid user ID");
        }
    });
    // Test Case For Request with Negative User ID  
    it('should handle negative user ID', async function() {
        const negativeUserId = -1;
        try {
            await axios.get(`/api/users/${negativeUserId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid user ID");
        }
    });
});
describe("Test Suite for Single Users Not found",function(){
    // Test Case For Successful Request for an Existing User
    it('should fetch a single user by ID', async function() {
        const existingUserId = 2;
        const response = await axios.get(`/api/users/${existingUserId}`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.data.id, existingUserId);
    });
    // Test Case For Request for Non-existing User    
    it('should handle not found single user request', async function() {
        const nonExistingUserId = 23;
        try {
            await axios.get(`/api/users/${nonExistingUserId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 404);
            assert.strictEqual(error.response.data.error, "User not found");
        }
    });
    // Test Case For Request with Invalid User ID  
    it('should handle invalid user ID', async function() {
        const invalidUserId = "invalid";
        try {
            await axios.get(`/api/users/${invalidUserId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid user ID");
        }
    });
    // Test Case For Request with Negative User ID      
    it('should handle negative user ID', async function() {
        const negativeUserId = -1;
        try {
            await axios.get(`/api/users/${negativeUserId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid user ID");
        }
    });    

})    

describe("Test Suite for List Resource",function(){
        // Test case for "List Resource" endpoint
        it('should fetch a list of resources', async function() {
            const response = await axios.get('/api/unknown');
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.page, 1);
            assert.strictEqual(response.data.data.length, 6);
        });
        // Test Case for Request for Non-existing Resource
        it('should handle non-existing resource request', async function() {
            try {
                await axios.get('/api/non_existing_resource');
            } catch (error) {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(error.response.data.error, "Resource not found");
            }
        });
    // Test Case For Request with Invalid Query Parameters 
    it('should handle invalid query parameters', async function() {
        try {
            await axios.get('/api/unknown?invalid=param');
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid query parameter");
        }
    });
    // Test Case For Request with Additional Query Parameters
    it('should handle additional query parameters', async function() {
        try {
            await axios.get('/api/unknown?sort=desc&filter=active');
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Unknown query parameter");
        }
    });
});
describe("Test suite for Single Resource",function(){
    // Test Case for Successful Request for an Existing Resource
    it('should fetch a single resource by ID', async function() {
        const existingResourceId = 2;
        const response = await axios.get(`/api/unknown/${existingResourceId}`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.data.id, existingResourceId);
    });
    // Test Case for Request for Non-existing Resource  
    it('should handle non-existing resource request', async function() {
        const nonExistingResourceId = 23;
        try {
            await axios.get(`/api/unknown/${nonExistingResourceId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 404);
            assert.strictEqual(error.response.data.error, "Resource not found");
        }
    });
    // Test Case for Request with Invalid Resource ID   
    it('should handle invalid resource ID', async function() {
        const invalidResourceId = "invalid";
        try {
            await axios.get(`/api/unknown/${invalidResourceId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid resource ID");
        }
    });
    // Test case for "Single Resource" endpoint
    it('should fetch a single resource by ID', async function() {
        const resourceId = 2;
        const response = await axios.get(`/api/unknown/${resourceId}`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.data.id, resourceId);
    });

})     
describe("Test suite for resource not found",function(){
    // Test Case For Successful Request for an Existing Resource
    it('should fetch a single resource by ID', async function() {
        const existingResourceId = 2;
        const response = await axios.get(`/api/unknown/${existingResourceId}`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.data.id, existingResourceId);
    });
    // Test Case For Request for Non-existing Resource
    it('should handle not found single resource request', async function() {
        const nonExistingResourceId = 23;
        try {
            await axios.get(`/api/unknown/${nonExistingResourceId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 404);
            assert.strictEqual(error.response.data.error, "Resource not found");
        }
    });
    // Test Case For Request with Invalid Resource ID  
    it('should handle invalid resource ID', async function() {
        const invalidResourceId = "invalid";
        try {
            await axios.get(`/api/unknown/${invalidResourceId}`);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.error, "Invalid resource ID");
        }
    });
});
