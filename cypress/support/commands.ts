declare namespace Cypress {
    interface Chainable {
        fillMandatoryFields(form: CacTacForm): Chainable<void>;
    }
}

type CacTacForm = {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    phone?: string;
    isPhoneRequired?: boolean;
};

Cypress.Commands.add('fillMandatoryFields', ({ firstName, lastName, email, message }: CacTacForm) => {
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#open-text-area').type(message);
}
);