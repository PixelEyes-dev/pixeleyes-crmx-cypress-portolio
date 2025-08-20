describe('Basic Login API Test', () => {
  const SUPABASE_URL = Cypress.env('SUPABASE_URL');
  const SUPABASE_ANON_KEY = Cypress.env('SUPABASE_ANON_KEY');
  const testCredentials = {
    email: Cypress.env('USER_EMAIL'),
    password: Cypress.env('USER_PASSWORD'),
  };

  it('should login successfully with valid credentials', () => {
    const startTime = Date.now();

    cy.request({
      method: 'POST',
      url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: {
        email: testCredentials.email,
        password: testCredentials.password,
      },
    }).then(response => {
      const responseTime = Date.now() - startTime;

      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');

      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('application/json');

      expect(responseTime).to.be.lessThan(5000);

      const responseBody = response.body;

      expect(responseBody).to.be.an('object');
      expect(responseBody).to.have.property('access_token');
      expect(responseBody).to.have.property('refresh_token');
      expect(responseBody).to.have.property('user');

      expect(responseBody.access_token).to.be.a('string');
      expect(responseBody.access_token.length).to.be.greaterThan(0);
      expect(responseBody.refresh_token).to.be.a('string');
      expect(responseBody.refresh_token.length).to.be.greaterThan(0);

      expect(responseBody.user).to.be.an('object');
      expect(responseBody.user).to.have.property('email', testCredentials.email);
      expect(responseBody.user).to.have.property('id');
      expect(responseBody.user.id).to.be.a('string');
      expect(responseBody.user.id.length).to.be.greaterThan(0);

      expect(responseBody).to.have.property('token_type', 'bearer');
      expect(responseBody).to.have.property('expires_in');
      expect(responseBody.expires_in).to.be.a('number');
      expect(responseBody.expires_in).to.be.greaterThan(0);
    });
  });

  it('should reject wrong password for valid email', () => {
    const startTime = Date.now();

    cy.request({
      method: 'POST',
      url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: {
        email: testCredentials.email,
        password: 'wrongpassword',
      },
      failOnStatusCode: false,
    }).then(response => {
      const responseTime = Date.now() - startTime;

      expect(response.status).to.equal(400);
      expect(response.statusText).to.equal('Bad Request');

      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('application/json');

      expect(responseTime).to.be.lessThan(5000);

      const responseBody = response.body;

      expect(responseBody).to.be.an('object');
      expect(responseBody).to.satisfy(body => {
        return body.error || body.error_description || body.message || body.code || body.error_code;
      });

      if (responseBody.error) {
        expect(responseBody.error).to.be.a('string');
        expect(responseBody.error.length).to.be.greaterThan(0);
      }

      if (responseBody.error_description) {
        expect(responseBody.error_description).to.be.a('string');
        expect(responseBody.error_description.length).to.be.greaterThan(0);
      }
    });
  });

  it('should verify user session after login', () => {
    cy.request({
      method: 'POST',
      url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: {
        email: testCredentials.email,
        password: testCredentials.password,
      },
    }).then(loginResponse => {
      const accessToken = loginResponse.body.access_token;

      cy.request({
        method: 'GET',
        url: `${SUPABASE_URL}/auth/v1/user`,
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(sessionResponse => {
        expect(sessionResponse.status).to.equal(200);
        expect(sessionResponse.statusText).to.equal('OK');

        expect(sessionResponse.headers).to.have.property('content-type');
        expect(sessionResponse.headers['content-type']).to.include('application/json');

        const sessionBody = sessionResponse.body;

        expect(sessionBody).to.be.an('object');

        if (sessionBody.user) {
          expect(sessionBody.user).to.be.an('object');
          expect(sessionBody.user).to.have.property('email', testCredentials.email);
          expect(sessionBody.user).to.have.property('id');
          expect(sessionBody.user.id).to.be.a('string');
          expect(sessionBody.user.id.length).to.be.greaterThan(0);

          if (sessionBody.user.aud) {
            expect(sessionBody.user.aud).to.be.a('string');
          }

          if (sessionBody.user.created_at) {
            expect(sessionBody.user.created_at).to.be.a('string');
            expect(new Date(sessionBody.user.created_at)).to.be.instanceOf(Date);
          }
        } else {
          expect(sessionBody).to.satisfy(body => {
            return body.user || (body.id && body.email) || (body.aud && body.id);
          });

          if (sessionBody.id && sessionBody.email) {
            expect(sessionBody.email).to.equal(testCredentials.email);
            expect(sessionBody.id).to.be.a('string');
            expect(sessionBody.id.length).to.be.greaterThan(0);

            if (sessionBody.aud) {
              expect(sessionBody.aud).to.be.a('string');
            }
          }
        }
      });
    });
  });
});
