describe('Rick and Morty Character List', () => {


  beforeEach(() => {
    cy.visit('/')
  }); 

  it('Happy path', () => {

    // No user, user badge should not exist.     
    cy.findByTestId("user-badge").should("not.exist");
    
    // Fill the modal 
    cy.findByText("Enter your name").should('exist'); 
    cy.findByRole("textbox", {name: "Name"}).should("exist").type("Joe Bloggs");
    cy.findByRole("button", {name: "Next"}).click(); 

    cy.findByText("Enter your name").should('not.exist'); 
    cy.findByText("Enter your job title").should('exist'); 
    cy.findByRole("textbox", {name: "Title"}).should("exist").type("Tester");
    cy.findByRole("button", {name: "Submit"}).click(); 


    // User now exists
    cy.findByTestId("user-badge").should("exist").within(() => {
      cy.findByText("Joe Bloggs").should('exist'); 
      cy.findByText("Tester").should('exist')
    });

    // Check that characters exist
    cy.findByText("Rick Sanchez").should('exist'); 
    cy.findByText("Morty Smith").should('exist');

    cy.findByRole("link", {name: "Rick Sanchez"}).click(); 

    // At first the modal will open, but the data is not ready
    cy.findByTestId("character-modal").should('exist'); 
    cy.findByRole("heading", {name: "Rick Sanchez"}).should("not.exist");
    cy.findByRole("heading", {name: "Rick Sanchez"}).should("exist");


    // Warn: 
    // Because these tests use a real API, the data may change and these test can potentially break
    cy.findByText("Species").should("exist");
    cy.findByText("Human").should("exist");


    // Close the modal
    cy.findByRole("button", {name: "Close"}).click(); 
    cy.findByTestId("character-modal").should('not.exist'); 


    // Check reload - user should still exist
    cy.reload();
    cy.findByText("Rick Sanchez").should('exist'); 
    cy.findByText("Morty Smith").should('exist');


  })

  it("Welcome modal - validations work", () => {
        // No user, user badge should not exist.     
        cy.findByTestId("user-badge").should("not.exist");
    
        // Fill the modal 
        cy.findByText("Enter your name").should('exist'); 
        cy.findByRole("textbox", {name: "Name"}).should("exist");

        // Click next without filling 
        cy.findByRole("button", {name: "Next"}).click(); 

        // Assert validation error
        cy.findByRole("textbox", {name: "Name"}).then(($input) => {
            expect(($input[0] as HTMLInputElement).validationMessage).to.eq('Please fill in this field.'); 
        });

        // Fill and continue
        cy.findByRole("textbox", {name: "Name"}).type("Joe Bloggs");
        cy.findByRole("button", {name: "Next"}).click(); 


        // Repeat validation test for job title
        cy.findByText("Enter your name").should('not.exist'); 
        cy.findByText("Enter your job title").should('exist'); 
        cy.findByRole("textbox", {name: "Title"}).should("exist");
        cy.findByRole("button", {name: "Submit"}).click(); 

        cy.findByRole("textbox", {name: "Title"}).then(($input) => {
          expect(($input[0] as HTMLInputElement).validationMessage).to.eq('Please fill in this field.'); 
        });

  })

  it("Welcome modal - editing works", () => {
    cy.findByTestId("user-badge").should("not.exist");
    
    // Fill the modal 
    cy.findByText("Enter your name").should('exist'); 
    cy.findByRole("textbox", {name: "Name"}).should("exist").type("Joe Bloggs");
    cy.findByRole("button", {name: "Next"}).click(); 

    cy.findByText("Enter your name").should('not.exist'); 
    cy.findByText("Enter your job title").should('exist'); 
    cy.findByRole("textbox", {name: "Title"}).should("exist").type("Tester");

    // When creating a user the escape button shouldn't close the modal
    cy.get("body").type("{esc}"); 
    cy.findByText("Enter your job title").should('exist'); 
    cy.findByRole("button", {name: "Submit"}).click(); 


    // User now exists
    cy.findByTestId("user-badge").should("exist").within(() => {
      cy.findByText("Joe Bloggs").should('exist'); 
      cy.findByText("Tester").should('exist')
    });

    cy.findByRole("button", {name: "Edit"}).click(); 
    cy.findByText("Enter your name").should('exist'); 

    // When editing, the escape button should close the modal.
    cy.get("body").type("{esc}"); 
    cy.findByText("Enter your name").should('not.exist'); 

    cy.findByRole("button", {name: "Edit"}).click(); 
    cy.findByRole("button", {name: "Next"}).click(); 
    cy.findByRole("textbox", {name: "Title"}).should("exist").clear().type("Software Developer");
    cy.findByRole("button", {name: "Submit"}).click(); 

    cy.findByTestId("user-badge").should("exist").within(() => {
      cy.findByText("Joe Bloggs").should('exist'); 
      cy.findByText("Software Developer").should('exist')
    });

})
})