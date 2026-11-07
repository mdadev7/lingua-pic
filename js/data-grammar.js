window.GRAMMAR = [
  // ========== A1 ==========
  {level:"A1", title:"Présent simple (be)", rule:"I am / You are / He-She-It is / We are / They are", examples:["I am happy.","She is a teacher.","They are at home."]},
  {level:"A1", title:"Articles a / an / the", rule:"a + consonne, an + voyelle, the = défini", examples:["a cat","an apple","the sun"]},
  {level:"A1", title:"Pluriel simple", rule:"Ajouter -s à la plupart des noms", examples:["cat → cats","book → books","door → doors"]},
  {level:"A1", title:"Pronoms personnels", rule:"I, you, he, she, it, we, they", examples:["I speak English.","She likes coffee.","They live here."]},
  {level:"A1", title:"Adjectifs possessifs", rule:"my, your, his, her, its, our, their", examples:["my house","your car","their dog"]},
  {level:"A1", title:"There is / There are", rule:"There is + singulier, There are + pluriel", examples:["There is a book.","There are two cats."]},
  {level:"A1", title:"Can / Can't", rule:"Capacité ou permission", examples:["I can swim.","She can't drive."]},
  {level:"A1", title:"Impératif", rule:"Base verbale, sans sujet", examples:["Sit down!","Open the door!","Don't run!"]},
  {level:"A1", title:"Questions avec do/does", rule:"Do/Does + sujet + verbe", examples:["Do you like tea?","Does she work here?"]},
  {level:"A1", title:"This / That / These / Those", rule:"Démonstratifs proches vs lointains", examples:["This book (ici)","That car (là-bas)","These shoes","Those houses"]},

  // ========== A2 ==========
  {level:"A2", title:"Passé simple régulier", rule:"Verbe + -ed", examples:["play → played","work → worked","visit → visited"]},
  {level:"A2", title:"Passé simple irrégulier", rule:"Formes à mémoriser", examples:["go → went","eat → ate","see → saw"]},
  {level:"A2", title:"Comparatifs", rule:"-er pour courts, more + adj pour longs", examples:["tall → taller","interesting → more interesting"]},
  {level:"A2", title:"Superlatifs", rule:"-est ou most", examples:["tall → tallest","interesting → most interesting"]},
  {level:"A2", title:"Présent continu", rule:"be + verbe-ing (action en cours)", examples:["I am eating.","She is reading.","They are playing."]},
  {level:"A2", title:"Past continuous", rule:"was/were + -ing", examples:["I was reading.","They were sleeping."]},
  {level:"A2", title:"Will / Going to", rule:"Will = décision, going to = intention", examples:["I will help you.","I'm going to travel."]},
  {level:"A2", title:"Must / Have to", rule:"Obligation", examples:["I must go.","You have to study."]},
  {level:"A2", title:"Should / Shouldn't", rule:"Conseil", examples:["You should rest.","You shouldn't smoke."]},
  {level:"A2", title:"Adverbes de fréquence", rule:"always, often, sometimes, never", examples:["I always eat breakfast.","She never smokes."]},

  // ========== B1 ==========
  {level:"B1", title:"Present Perfect", rule:"have/has + participe passé — action passée liée au présent", examples:["I have lived here for 5 years.","She has just arrived."]},
  {level:"B1", title:"Past Perfect", rule:"had + participe passé — action antérieure au passé", examples:["He had already left.","She had studied before."]},
  {level:"B1", title:"Conditionnel (type 2)", rule:"If + past, would + infinitif", examples:["If I were rich, I would travel.","If she knew, she would come."]},
  {level:"B1", title:"Modaux de déduction", rule:"must / might / could + infinitif", examples:["He must be tired.","She might come."]},
  {level:"B1", title:"Reflexive pronouns", rule:"myself, yourself, himself, herself, itself, ourselves, themselves", examples:["I did it myself.","She hurt herself."]},
  {level:"B1", title:"Gerund vs infinitive", rule:"Certains verbes + -ing, d'autres + to", examples:["I enjoy reading.","I want to go."]},
  {level:"B1", title:"Relative clauses", rule:"who, which, that, where, whose", examples:["The man who called is my friend.","The book that I read."]},
  {level:"B1", title:"Present Perfect vs Past Simple", rule:"PP = lien avec présent; PS = terminé", examples:["I have eaten (je n'ai plus faim).","I ate at noon."]},
  {level:"B1", title:"Reported speech (base)", rule:"Décalage des temps", examples:['He said he was tired.','She told me she would come.']},
  {level:"B1", title:"Phrasal verbs courants", rule:"Verbe + préposition/adverbe", examples:["get up","turn off","look after","give up"]},

  // ========== B2 ==========
  {level:"B2", title:"Third conditional", rule:"If + had + PP, would have + PP", examples:["If I had known, I would have come.","If she had studied, she would have passed."]},
  {level:"B2", title:"Passif (tous temps)", rule:"be + participe passé", examples:["The book was written by him.","The house is being built."]},
  {level:"B2", title:"Reported speech avancé", rule:"Décalage des temps et des pronoms", examples:['He said he would come tomorrow.','She told me she had finished.']},
  {level:"B2", title:"Wish / If only", rule:"Souhait irréel", examples:["I wish I were taller.","If only I had more time."]},
  {level:"B2", title:"Modaux + perfect", rule:"must/could/might + have + PP", examples:["She must have forgotten.","He could have won."]},
  {level:"B2", title:"Used to / Would", rule:"Habitudes passées", examples:["I used to play football.","We would go every summer."]},
  {level:"B2", title:"Causative (have/get something done)", rule:"Faire faire", examples:["I had my hair cut.","She got her car repaired."]},
  {level:"B2", title:"Question tags", rule:"N'est-ce pas ?", examples:["You're coming, aren't you?","She doesn't know, does she?"]},
  {level:"B2", title:"Advanced conditionals", rule:"Mixed, unless, provided that", examples:["If I had studied, I would be a doctor now.","Unless it rains, we'll go."]},
  {level:"B2", title:"Inversion (base)", rule:"Adverbe négatif → inversion", examples:["Never have I seen such beauty.","Rarely does she complain."]},

  // ========== C1 ==========
  {level:"C1", title:"Inversions stylistiques", rule:"Adverbe négatif en début → inversion sujet-verbe", examples:["Never have I seen such a thing.","Rarely does she complain.","Little did he know."]},
  {level:"C1", title:"Modaux + perfect avancés", rule:"must/could/might/should + have + PP", examples:["She must have forgotten.","You should have told me.","He might have left."]},
  {level:"C1", title:"Subjunctive (formes)", rule:"Suggestions, exigences", examples:["I suggest that he be informed.","It's essential that she attend."]},
  {level:"C1", title:"Cleft sentences", rule:"Mise en relief", examples:["It was John who called.","What I need is rest."]},
  {level:"C1", title:"Ellipsis", rule:"Omission élégante", examples:["If possible, call me.","When in Rome, do as Romans do."]},
  {level:"C1", title:"Nominalization", rule:"Transformer verbes en noms", examples:["decide → decision","arrive → arrival","perform → performance"]},
  {level:"C1", title:"Discourse markers", rule:"however, therefore, furthermore, nevertheless", examples:["However, I disagree.","Therefore, we must act.","Furthermore, this is important."]},
  {level:"C1", title:"Advanced passive", rule:"It is said that... / He is believed to...", examples:["It is said that he left.","He is believed to be abroad."]},
  {level:"C1", title:"Mixed conditionals", rule:"Combiner 2nd et 3rd conditional", examples:["If I had studied (past), I would be a doctor now (present)."]},
  {level:"C1", title:"Participle clauses", rule:"-ing ou -ed pour réduire", examples:["Walking down the street, I saw him.","Built in 1900, the house is historic."]},

  // ========== C2 ==========
  {level:"C2", title:"Subjonctif figé", rule:"Structures soutenues", examples:["Were I you, I would wait.","Be that as it may,..."]},
  {level:"C2", title:"Ellipse et structures clivées", rule:"Omission élégante / mise en relief", examples:["It was John who called.","The one thing I fear is silence."]},
  {level:"C2", title:"Inversion après 'nor/neither/so'", rule:"Accord stylistique", examples:["Nor did he apologize.","So great was his anger that..."]},
  {level:"C2", title:"Fronting", rule:"Déplacer élément en début", examples:["This book, I have read twice.","Off went the alarm."]},
  {level:"C2", title:"Absolute constructions", rule:"Groupes nominaux autonomes", examples:["Weather permitting, we'll go.","All things considered, it's fine."]},
  {level:"C2", title:"Asyndeton / Polysyndeton", rule:"Style littéraire", examples:["I came, I saw, I conquered.","Neither food nor water nor shelter."]},
  {level:"C2", title:"Litotes", rule:"Négation du contraire", examples:["Not bad (= quite good)","Not uncommon (= fairly common)"]},
  {level:"C2", title:"Zeugma", rule:"Verbe commun à plusieurs sens", examples:["He lost his keys and his temper."]},
  {level:"C2", title:"Hendiadys", rule:"Deux termes pour un concept", examples:["Nice and warm (= pleasantly warm)"]},
  {level:"C2", title:"Anacoluthon", rule:"Rupture syntaxique volontaire", examples:["You know what—never mind."]}
];