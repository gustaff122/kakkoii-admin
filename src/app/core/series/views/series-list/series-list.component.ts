import { Component } from '@angular/core';

@Component({
  selector: 'kk-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [ './series-list.component.scss' ],
})
export class SeriesListComponent {
  public readonly placeholder: any = [
    {
      'thumbnail': './assets/placeholders/op.jpg',
      'titleEn': 'One Punch Man',
      'titleJpRom': 'ワンパンマン',
      'ongoing': true,
      'rating': 7.71,
      'tags': [ 'action', 'comedy', 'superhero' ],
      'description': 'Saitama po kolejnej nieudanej próbie znalezienia pracy postanowił coś zmienić w swoim nudnym i przeciętnym życiu. Rozpoczął on trening, aby stać się super bohaterem. Po trzech latach stał się na tyle potężny, że jest w stanie pokonać każdego przeciwnika jednym ciosem. Okazuje się jednak, że to dopiero początek zmagań herosa, bowiem nikt o nim jeszcze nie słyszał. Natomiast sam Saitama poszukuje godnego siebie przeciwnika, który mógłby go trochę zabawić podczas walki. ',
    },
    {
      'thumbnail': './assets/placeholders/bnha.jpg',
      'titleEn': 'My Hero Academia',
      'titleJpRom': '僕のヒーローアカデミア',
      'ongoing': true,
      'rating': 7.77,
      'tags': [ 'action', 'comedy', 'school', 'superhero' ],
      'description': 'W niedalekiej przyszłości w ludziach obudziły się nadnaturalne zdolności. Od tej pory u kolejnych pokoleń moc pojawiała się częściej i była silniejsza. W tym momencie już ponad 80% populacji posiada swój własny dar. Z reguły ukazuje się on w okolicach czwartego roku życia. Izuku Midoriya jest wyjątkiem w tym świecie - choć ma już 14 lat, to nie posiada żadnych zdolności specjalnych. Co więcej, lekarz stwierdził, że takowe się w nim nigdy nie przebudzą. Nadal jednak marzy on o zostaniu bohaterem. Pewnego dnia zostaje zaatakowany przez potwora i w ostatniej chwili ratuje go jego idol, najsilniejszy z bohaterów zwany "All Mightem". Czy to spotkanie odmieni życie naszego młodego protagonisty? Czy uda mu się spełnić swoje największe marzenie pomimo przeszkód stojących mu na drodze?',
    },
    {
      'thumbnail': './assets/placeholders/aot.jpg',
      'titleEn': 'Attack on Titan',
      'titleJpRom': '進撃の巨人',
      'ongoing': false,
      'rating': 9.01,
      'tags': [ 'action', 'drama', 'fantasy', 'post-apocalyptic' ],
      'description': 'Alternatywny świat w klimacie średniowiecznego fantasy. Bezbronna ludzkość na skraju wyginięcia chowa się za olbrzymimi, zesłanymi przez samych bogów murami. Wrogiem są nieśmiertelne, mięsożerne, gigantyczne istoty o ludzkich kształtach – tytułowi tytani. Nie posiadają one inteligencji, niczym ruchome zwłoki tłoczą się pod murami, wabione ludzkim zapachem. Nigdy nie udałoby im się zagrozić ludziom jeszcze raz, gdyby nie pewne wydarzenie, w skutek którego boska ochrona zostaje naruszona, a w murze pojawia się wyłom pozwalający naturalnym wrogom ludzi wedrzeć się do środka. W tak niespokojnych czasach przebiega młodość trójki głównych bohaterów: Erena – żyjącego nienawiścią do tytanów młodzieńca o wielkich ambicjach i gwałtownym usposobieniu, Mikasy – przybranej siostry Erena, cichej, spokojnej, zawsze opanowanej dziewczyny, pałającej siostrzaną miłością do brata, a kiedy trzeba - szybkiej, precyzyjnej i zabójczej, oraz Armina – tchórzliwego, aczkolwiek bystrego nastolatka o niebywałej zdolności oceny sytuacji i znajdowania wyjścia z wszelkich tarapatów.',
    },
    {
      'thumbnail': './assets/placeholders/dn.jpg',
      'titleEn': 'Death Note',
      'titleJpRom': 'デスノート',
      'ongoing': false,
      'rating': 8.32,
      'tags': [ 'crime', 'drama', 'mystery', 'psychological', 'thriller' ],
      'description': 'Yagami Light, nastoletni licealista będący prymusem w każdym przedmiocie szkolnym, znajduje nietypowy notatnik z napisanym na nim tytułem „Death Note”. Według zapisanych w nim zasad, wpisując imię i nazwisko wybranej osoby (znając jej wygląd) można sprawić, by ta osoba zmarła na zawał serca lub w inny określony przez użytkownika notesu sposób.\n' +
        'Light początkowo myśli, że to żart, jednak z ciekawości wpisuje dane kryminalisty pokazanego w telewizji. Jak się po chwili okazuje, ów notatnik działa, a, co więcej, należy on do jednego z Shinigami o imieniu Ryuuk. Według zasad obowiązujących w świecie Shinigami, Ryuuk musi zostać z Lightem aż do jego śmierci. Jest on widoczny tylko dla osób, które dotknęły notatnika.\n' +
        'Chłopak szybko oswaja się z obecnością boga śmierci oraz zabójczą mocą, którą posiadł. Co więcej, postanawia ją wykorzystać, by stworzyć świat idealny, bez przemocy, i być jego panem. Od czasu, gdy zaczął zabijać najgroźniejszych kryminalistów, zyskał rzesze fanów nazywających go Kirą, jak i wrogów. Light sam staje się zabójcą.\n' +
        'Znając sytuację, w jakiej świat się aktualnie znajduje, akcję podejmuje FBI, japońska policja oraz słynny anonimowy detektyw L stojący na czele grupy zadaniowej, a u jego boku także ojciec Lighta. Zaczyna się wielki pościg, by zatrzymać ogromną serię zabójstw popełnianych przez Kirę. Tak właśnie powstaje walka między Yagamim Lightem (Kirą) i L\'em.',
    },
    {
      'thumbnail': './assets/placeholders/fm.jpg',
      'titleEn': 'Fullmetal Alchemist',
      'titleJpRom': '鋼の錬金術師',
      'ongoing': false,
      'rating': 8.56,
      'tags': [ 'adventure', 'drama', 'fantasy', 'magic', 'military' ],
      'description': 'Anime opowiada o równoległym świecie, w którym zamiast techniki rozwinięto alchemię. Żyje tam dwójka braci, Edward oraz Alphonse Elric, których ojcem jest jeden z najlepszych alchemików w całym państwie. Wkrótce ich ojciec zostawia rodzinę i wyrusza w podróż, z której już nie wraca. Chłopcy dorastają ucząc się alchemii i są w tym całkiem nieźli. Ich mama, Trisha, po kilku latach zapada jednak na tajemnicza chorobę i umiera. Chłopcy zdesperowani i samotni postanawiają złamać odwieczną zasadę Alchemii i wskrzesić swoją matkę. Niestety okazuje się to katastrofalnym błędem, a bohaterowie muszą ponieść konsekwencje - Al traci ciało, a Ed lewą nogę i prócz tego prawe ramię, którą poświęca w zamian za zamknięcie duszy brata w starej zbroi. Po tych wydarzeniach bliska przyjaciółka rodziny pomaga naszym bohaterom w tej trudnej dla nich sytuacji, a Ed otrzymuje mechaniczne kończyny. Gdy wszystko wraca do „normy”, bracia wyruszają w pełną niebezpieczeństw i tajemnic wyprawę - aby odzyskać ciała, postanawiają odnaleźć słynny kamień filozoficzny.',
    },
  ];
}
