it("Ingresando credenciales incorrectas", () => {
    // Abrir la página que tiene el formulario de login
    cy.visit("http://localhost:4200/login");
  
    // Escribir el email del usuario
    cy.get("input#email-input").type("fake@email.com");
  
    // Escribir una contraseña incorrecta
    cy.get("input#pass-input").type("theFakePass123");
  
    // Click sobre el botón **Submit**
    cy.get("button#btn-login").click();
  
    // Verificar que aparezca el mensaje indicando el error.
    cy.contains("p", "Así no se puede, credenciales incorrectas");
  });