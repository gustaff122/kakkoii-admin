describe('empty spec', () => {
  it('Should create an anime', () => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:4200/series/add');
    cy.get('[formcontrolname="titleEn"]').type('WorldEnd: What do you do at the end of the world? Are you busy? Will you save us?, SukaSuka, What are you doing at the end? Are you busy? Can you save me?');
    cy.get('[formcontrolname="titleJpRom"').type('Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?');
    cy.get('[formcontrolname="titleJp"]').type('終末なにしてますか? 忙しいですか? 救ってもらっていいですか?');
    cy.get('[ng-reflect-name=0]').type('Co zrobisz na końcu świata? Będziesz zajęty? Ocalisz nas?');
    cy.contains('button', 'Dodaj tytuł alternatywny').click({ force: true });
    cy.get('[ng-reflect-name=1]').type('Co zrobisz na końcu świata?');
    cy.contains('button', 'Kolejny krok').click({ force: true });

    cy.get('[formcontrolname="synopsis"]').type(`Minęło pięćset lat odkąd ludzie wyginęli przez straszliwe i tajemnicze Bestie. Reszta ras żyje teraz na pływających po niebie wyspach, poza zasięgiem wszystkich Bestii. Istnieje tylko mała grupa dziewcząt, Leprechaunów, która może wykorzystać starożytną broń potrzebną do wyeliminowania Bestii.
    W ulotnym życiu dziewcząt, które w każdej chwili mogą otrzymać wezwanie do pewnej śmierci, pojawia się młody człowiek, który stracił wszystko w swojej ostatniej bitwie pięćset lat temu. Ostatni żyjący człowiek. Willem staje się ojcem dla dziewcząt, którego nigdy nie miały, dbając o nie i pielęgnując je, nawet gdy zmaga się z bólem bezradnego czekania na powrót bliskich do domu.`, { delay: 0 });
    cy.get('[formcontrolname="tags"]').get(':nth-child(1) > .w-80 > .ng-select-container > .ng-arrow-wrapper').click({ force: true }).wait(200);
    cy.get('span').contains('Drama').click({ force: true });
    cy.get('span').contains('Fantasy').click({ force: true });
    cy.get('span').contains('Romance').click({ force: true });
    cy.get('[formcontrolname="nsfw"]').get(':nth-child(2) > .w-80 > .ng-select-container > .ng-arrow-wrapper').click({ force: true }).wait(200);
    cy.get('span').contains('Nie').click({ force: true });
    cy.contains('button', 'Kolejny krok').click({ force: true });

    cy.get('[formcontrolname="startDate"]').type('2017-04-11');
    cy.get('[formcontrolname="endDate"]').type('2017-06-27');
    //cy.get('[for="Satelight"]').click({ force: true });
    cy.get(':nth-child(1) > div > .w-full > .ng-select-container > .ng-arrow-wrapper').click({ force: true }).wait(200);
    cy.get('span').contains('finished').click({ force: true });

    //cy.get('[for="tv"]').click({ force: true });
    //cy.contains('light novel').click({ force: true });
    cy.get(':nth-child(2) > div > .w-full > .ng-select-container > .ng-arrow-wrapper').click({ force: true }).wait(200);
    cy.get('span').contains('PG').click({ force: true });
    cy.contains('button', 'Dodaj serię').click({ force: true });

  });
});