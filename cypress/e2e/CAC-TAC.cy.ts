describe('central de atendimento ao cliente CAC-TAC', () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('verifica o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat("testando 123", 20);
        cy.get('#firstName').type('João');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('email@testando.com')
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    })

    it('tipo de atendimento, elogio', () => {
        const longText = Cypress._.repeat("testando 123", 20);
        cy.get('#firstName').type('João');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('email@testando.com')
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.get('input[name="atendimento-tat"][value="elogio"]').check();
        cy.get('input[name="atendimento-tat"][value="elogio"]').should('be.checked');
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    })

    it('tipo de atendimento, feedback', () => {
        const longText = Cypress._.repeat("testando 123", 20);
        cy.get('#firstName').type('João');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('email@testando.com')
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.get('input[name="atendimento-tat"][value="feedback"]').check();
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    })

    it('exibe mensagem de erro ao submeter o formulário com email inválido', () => {
        cy.get('#firstName').type('João');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('email@inválidovirgula,com')
        cy.get('#open-text-area').type('testando 123');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', () => {
        cy.get('#firstName').type('João');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('email@testando.com')
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('testando 123');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('João')
            .should('have.value', 'João')
            .clear()
            .should('have.value', '');
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '');
        cy.get('#email')
            .type('email@testando.com')
            .should('have.value', 'email@testando.com')
            .clear()
            .should('have.value', '');
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '');
    })

    it('exibe mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
        const longText = Cypress._.repeat("testando 123", 20);
        const data = {
            firstName: 'João',
            lastName: 'Silva',
            email: 'email@teste.com',
            message: longText
        };

        cy.fillMandatoryFields(data);

        cy.contains('button[type="submit"]', /enviar/i).click();

        cy.get('.success').should('be.visible');
    })

    it('seleciona um produto por texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto por value', () => {
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto por indice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/fern.jpg')
            .should(input => {
                expect((input[0] as HTMLInputElement).files![0].name).to.equal('fern.jpg');
            })
    });
    it('seleciona um arquivo da pasta fixtures com drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/fern.jpg', { action: 'drag-drop' })
            .should(input => {
                expect((input[0] as HTMLInputElement).files![0].name).to.equal('fern.jpg');
            })
    });

    it.only('verifica que a política de privacidade abre em outra aba sem perder a aba original', () => {
        cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href', 'privacy.html')
    })

    it.only('acessa a pagina da politica de privacidade removendo o target e então clicando', () => {
        cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href', 'privacy.html')
            .invoke('removeAttr', 'target', '_blank')
            .click();
    })
})