describe("Run Mocha Tests", function(){
    it('should run Mocha tests', async function(){
        cypress.visit('/mocha-runner.html');
    })
})