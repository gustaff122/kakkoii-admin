describe('testy', () => {
  it('should add new series', () => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:4200/series/add');
    cy.get('[formcontrolname="titleEn"] > .flex > .w-80').type('1234567890 ^%%&!!#12');
    cy.get('[formcontrolname="titleJpRom"] > .flex > .w-80').type('123456789,.,.,.,.,.');
    cy.get('.ng-invalid > .flex > .w-80').type('jebanie kajetana do potęgi 2');
    cy.get('.items-center > kk-input.ng-untouched > .flex > .w-80').type('walenie w chuja');
    cy.get(':nth-child(2) > .mdc-button > .mdc-button__label').click({ force: true });
    cy.get('.flex.ng-pristine > kk-input.ng-untouched > .flex > .w-80').type('kocham disa)');
    cy.get('.flex-col.ng-untouched > :nth-child(3) > .mdc-button > .mdc-button__label').click({ force: true });
    cy.get('.flex.ng-pristine > kk-input.ng-untouched > .flex > .w-80').type('Błażej to totalny kosk');
    cy.contains('button', 'Kolejny krok').click({ force: true });

    cy.get('.grid > :nth-child(1) > :nth-child(1) > .ng-invalid > .flex > .w-80').type('Składniki:\n' +
      '500 g mąki pszennej np. typ 500\n' +
      'pół łyżeczki soli\n' +
      '4 łyżki oleju - 50 ml\n' +
      'szklanka gorącej wody - 250 ml\n' +
      'Przepis na pierogi\n' +
      'Szklanka ma u mnie pojemność 250 ml. \n' +
      'Z przepisy wychodzi około 50 - 60 pierogów. ');
    cy.get('.w-full > .ng-select-container > .ng-value-container > .ng-input > input').type('Light Novel');
    cy.get('span').contains('Light Novel').click({ force: true });
    cy.get(':nth-child(1) > .w-80 > .ng-select-container > .ng-value-container > .ng-input > input').click();
    cy.get('span').contains('Action').click();
    cy.get('span').contains('Slice of Life').click();
    cy.get('span').contains('Drama').click();
    cy.get('.bg-glass').click();
    cy.get(':nth-child(2) > .w-80 > .ng-select-container > .ng-value-container > .ng-input').click();
    cy.get('span').contains('Tak').click();
    cy.get('[formcontrolname="studio"]').type('Pierrot');
    cy.get('button').contains('Kolejny krok').click();
    cy.get('[formcontrolname="startDate"]').type('2017-04-11');
    cy.get('[formcontrolname="endDate"]').type('2018-04-11');
    cy.get('[formcontrolname="episodesCount"]').type('24');
  });
});