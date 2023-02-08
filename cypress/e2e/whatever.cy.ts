describe('dodawanie serii', () => {
  it('powinno stworzyć nową zakładke z serią', () => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:4200/series/add');
    // visiting tested website
    cy.get('[formcontrolname="titleEn"]').type('Bleach');
    // test of english title
    cy.get('[formcontrolname="titleJpRom"]').type('Burīchi');
    // test of japanese rom title
    cy.get('[formcontrolname="titleJp"]').type('ブリーチ ');
    // test of japanese title
    cy.get('[ng-reflect-name=0]').type('Black');
    // test of alternative title for series
    cy.contains('button', 'Dodaj tytuł alternatywny').click({ force: true });
    // test of adding new page for alternative title
    cy.get('[ng-reflect-name=1]').type('White');
    // test of second alternative title
    cy.contains('button', 'Kolejny krok').click({ force: true });
    // test of button that move us to the next page ?

    cy.get('[formcontrolname="synopsis"]').type('1.\n' +
      'Gotowanie ziemniaków: obieramy je i myjemy, kroimy na połówki i zalewamy wodą z płaską łyżką soli (10 g). Gotujemy, aż będą miękkie, odcedzamy i przeciskamy przez praskę. Odstawiamy do przestygnięcia (czas podany w przepisie nie uwzględnia czas studzenia).', { delay: 0 });
    //test of script for series
    cy.get('[formcontrolname="tags"]').get(':nth-child(1) > .w-80 > .ng-select-container > .ng-arrow-wrapper').click({ force: true }).wait(200);
    cy.get('span').contains('Drama').click({ force: true });
    cy.get('span').contains('Fantasy').click({ force: true });
    cy.get('span').contains('Romance').click({ force: true });
    //test of declaring source
    cy.get('[formcontrolname="studio"]').type('Pierrot');
    // test of adding name of anime's studio
  });
});

