// describe('JWT Session Test', () => {
//   it('it is logged in through local storage', () => {
//     cy.LoginAPI().then(() => {
//       cy.visit('https://rahulshettyacademy.com/client', {
//         onBeforeLoad: (window) => {
//           window.localStorage.setItem('token', Cypress.env('token'));
//         }
//       });
//     });
//   });
// });
