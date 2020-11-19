describe('Perfil de Admin', () => {
  context('Muestra tab de perfil si se incia como admin', () => {
    it('Debe ingresar como admin', () => {
        cy.visit('http://localhost:4200/login');
        
        cy.get('#mailC').type('juan@gmail.com');
        cy.get('#passwordC').type('juan');
        cy.get('#loginC').click();

        /*cy.request('POST', 'http://localhost:3000/user/authenticate', {
            email: 'juan@gmail.com',
            password: "juan",

          }) */
    });
    it('Hace un post y checa si es admin', () => {
        
        cy.get('#postC').click();
        cy.get('#tituloC').type('juan@gmail.com');
        cy.get('#contenidoC').type('juan');
        cy.get('#publicarC').click();

        cy.contains("li", "PERFIL");
        cy.get('#perfilC').click();
    });
    
    it('Actualiza nombre admin', () => {
        cy.get('#editarPC').click();
        cy.get('#nombrePC').type('Cypress');
        cy.get('#guardarC').click();
    });
        
  });
});