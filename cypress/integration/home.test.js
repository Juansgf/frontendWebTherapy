describe('Uso Plataforma',()=>{
    it('Hace login exitoso', () =>{
        cy.visit('http://localhost:4200/login');
        
        cy.request('POST', 'http://localhost:3000/user/authenticate', {
            email: 'j@gmail.com',
            password: "juan",
          })

    })
    it('successfully make a post', () => {
        // this.currentUser will now point to the response
        // body of the cy.request() that we could use
        // to log in or work with in some way
    
        cy.visit('http://localhost:4200/dashboard')
        cy.request('POST', 'http://localhost:3000/user/newPost', {
            title: 'Prueba Cypress',
            content: "exitosa",
          })
        })

    it('successfully shows all posts', () => {      
        cy.request('POST', 'http://localhost:3000/user/allPosts', {

          })

      })

})