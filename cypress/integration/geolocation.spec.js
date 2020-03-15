/// <reference types="Cypress" />

describe("Stab geoLocation", function() {
  it("Visit", function() {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        const mockGeoLocation = {
          coords: {
            longitude: 9.80292,
            latitude: 54.91556
          }
        };
        const testRoute = [
          { lat: 54.91556, lon: 9.80292 },
          { lat: 54.91552, lon: 9.80286 },
          { lat: 54.91549, lon: 9.80282 },
          { lat: 54.91546, lon: 9.80281 },
          { lat: 54.91539, lon: 9.80277 },
          { lat: 54.91535, lon: 9.80266 },
          { lat: 54.91531, lon: 9.80261 },
          { lat: 54.9153, lon: 9.80261 },
          { lat: 54.91525, lon: 9.80256 },
          { lat: 54.91522, lon: 9.80253 },
          { lat: 54.91518, lon: 9.80246 },
          { lat: 54.91517, lon: 9.80239 },
          { lat: 54.91517, lon: 9.80233 },
          { lat: 54.91531, lon: 9.80222 },
          { lat: 54.91527, lon: 9.80223 },
          { lat: 54.91545, lon: 9.80214 },
          { lat: 54.91558, lon: 9.80202 },
          { lat: 54.91575, lon: 9.80193 },
          { lat: 54.91572, lon: 9.80195 },
          { lat: 54.91556, lon: 9.80205 },
          { lat: 54.91585, lon: 9.80184 },
          { lat: 54.91596, lon: 9.80175 },
          { lat: 54.91611, lon: 9.80165 },
          { lat: 54.91623, lon: 9.80153 },
          { lat: 54.91638, lon: 9.80143 },
          { lat: 54.9163, lon: 9.80125 },
          { lat: 54.91636, lon: 9.80091 },
          { lat: 54.91636, lon: 9.80081 },
          { lat: 54.91632, lon: 9.80077 },
          { lat: 54.91625, lon: 9.80065 },
          { lat: 54.91621, lon: 9.80056 },
          { lat: 54.91627, lon: 9.80038 },
          { lat: 54.91633, lon: 9.80024 }
        ];
        win.navigator.geolocation.getCurrentPosition = (
          success,
          error,
          options
        ) => {
          success(mockGeoLocation);
        };
        win.navigator.geolocation.watchPosition = (success, error, options) => {
          let cnt = 0;
          let id = setInterval(() => {
            success({
              coords: {
                latitude: testRoute[cnt].lat,
                longitude: testRoute[cnt].lon
              }
            });
            cnt++;
            if (cnt === testRoute.length) {
              clearInterval(id);
            }
          }, 500);
        };
      }
    });
    cy.get("[data-testid=button-start]").click();
    cy.window().then($window => {
      cy.stub($window.navigator.geolocation, "getCurrentPosition", callback => {
        return callback({ coords: { latitude: 22, longitude: 22 } });
      });
      cy.get("[data-testid=button-get]").click();
    });
  });
});
