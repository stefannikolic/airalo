describe('Airalo API Automation Tests', () => {

    let accessToken;
    let iccidList = [];
    let orderID;

    before(() => {
      cy.apiLogin().then((token) => {
        accessToken = token;
      });
    });

    it('POST an order for 6 merhaba-7days-1gb eSIMs and save ICCIDs', () => {
        cy.request({
            method: 'POST',
            url: 'https://sandbox-partners-api.airalo.com/v2/orders',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`
            },
            form: true,
            body: {
                quantity: 6,
                package_id: "merhaba-7days-1gb",
                type: "sim",
                description: "Automated test order - Cypress"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.quantity).to.eq(6);
            expect(response.body.data.package_id).to.eq('merhaba-7days-1gb');
            expect(response.body.meta.message).to.eq('success');
    
            // Extract ICCIDs and store them
            orderID = response.body.data.id;
            iccidList = response.body.data.sims.map(sim => sim.iccid);
            expect(iccidList).to.have.length(6);
        });
    });

    it('GET eSIMs details for the saved ICCIDs and validate package_id "merhaba-7days-1gb"', () => {
        cy.wrap(iccidList).each((iccid) => {
            cy.request({
                method: 'GET',
                url: `https://sandbox-partners-api.airalo.com/v2/sims/${iccid}?include=${orderID}`,
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data).to.have.property('iccid', iccid);
                expect(response.body.data.simable).to.have.property('package_id', 'merhaba-7days-1gb');
            });
        });
    });

});
