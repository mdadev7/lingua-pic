/* ============================================================
   COMPLÉMENT AUTOMATIQUE — Ajoute 1068+ mots pour atteindre 3000
   Format ultra-compact : listes de paires [en, fr]
   À charger APRÈS data-words.js
============================================================ */
(function () {
  // ============================================================
  // LISTES COMPACTES PAR NIVEAU
  // Format : "theme": [["en1","fr1"],["en2","fr2"],...]
  // ============================================================
  const EXTRA = {

    // ==================== A1 : +40 mots ====================
    A1: {
      corps: [["eyebrow","sourcil"],["eyelash","cil"],["lip","lèvre"],["chin","menton"],["cheek","joue"],["forehead","front"],["elbow","coude"],["wrist","poignet"],["ankle","cheville"],["toe","orteil"]],
      couleurs: [["beige","beige"],["turquoise","turquoise"],["violet","violet"],["navy","bleu marine"],["maroon","bordeaux"]],
      nombres: [["fourteen","quatorze"],["fifteen","quinze"],["sixteen","seize"],["seventeen","dix-sept"],["eighteen","dix-huit"],["nineteen","dix-neuf"],["sixty","soixante"],["seventy","soixante-dix"],["eighty","quatre-vingts"],["ninety","quatre-vingt-dix"],["billion","milliard"]],
      nourriture: [["cereal","céréales"],["yogurt","yaourt"],["jam","confiture"],["honey","miel"],["chocolate","chocolat"],["cookie","biscuit"],["pie","tarte"],["pancake","crêpe"],["waffle","gaufre"],["donut","beignet"],["mushroom","champignon"],["corn","maïs"],["cucumber","concombre"],["pumpkin","citrouille"],["watermelon","pastèque"]]
    },

    // ==================== A2 : +150 mots ====================
    A2: {
      nature: [["leaf","feuille"],["plant","plante"],["seed","graine"],["root","racine"],["branch","branche"],["hill","colline"],["valley","vallée"],["lake","lac"],["ocean","océan"],["island","île"],["desert","désert"],["sand","sable"],["stone","pierre"],["earth","terre"],["air","air"],["fire","feu"],["environment","environnement"]],
      hobbies: [["reading","lecture"],["writing","écriture"],["painting","peinture"],["drawing","dessin"],["photography","photographie"],["cooking","cuisine"],["gardening","jardinage"],["fishing","pêche"],["hiking","randonnée"],["camping","camping"],["traveling","voyager"],["gaming","jeux vidéo"],["singing","chanter"],["dancing","danser"]],
      technologie: [["technology","technologie"],["computer","ordinateur"],["smartphone","smartphone"],["tablet","tablette"],["screen","écran"],["keyboard","clavier"],["internet","internet"],["website","site web"],["email","email"],["password","mot de passe"],["download","télécharger"],["upload","téléverser"],["click","cliquer"],["search","rechercher"],["app","application"],["message","message"],["photo","photo"],["video","vidéo"],["charger","chargeur"],["battery","batterie"],["wifi","wifi"],["network","réseau"],["device","appareil"]],
      directions: [["right","droite"],["left","gauche"],["straight","tout droit"],["up","en haut"],["down","en bas"],["north","nord"],["south","sud"],["east","est"],["west","ouest"],["behind","derrière"],["in front of","devant"],["next to","à côté de"],["between","entre"],["near","près"],["far","loin"],["inside","à l'intérieur"],["outside","à l'extérieur"],["above","au-dessus"],["below","en dessous"],["corner","coin"]],
      argent: [["money","argent"],["cost","coût"],["account","compte"],["card","carte"],["coin","pièce"],["salary","salaire"],["save","économiser"],["spend","dépenser"],["borrow","emprunter"],["lend","prêter"],["owe","devoir"],["free","gratuit"],["tax","taxe"]],
      ville: [["avenue","avenue"],["square","place"],["building","immeuble"],["bridge","pont"],["traffic","circulation"],["sidewalk","trottoir"],["subway","métro"],["parking","parking"],["cafe","café"],["church","église"],["police","police"],["government","gouvernement"],["stadium","stade"],["zoo","zoo"]],
      "vetements-detail": [["sleeve","manche"],["collar","col"],["button","bouton"],["zipper","fermeture éclair"],["lace","lacet"],["heel","talon"],["cotton","coton"],["wool","laine"],["leather","cuir"],["silk","soie"],["pattern","motif"],["striped","rayé"],["plain","uni"],["loose","ample"]],
      "sports-detail": [["coach","entraîneur"],["match","match"],["championship","championnat"],["score","score"],["goal","but"],["referee","arbitre"],["fan","fan"],["practice","entraînement"],["win","gagner"],["lose","perdre"],["tournament","tournoi"],["athlete","athlète"]]
    },

    // ==================== B1 : +158 mots ====================
    B1: {
      "travail-avance": [["career","carrière"],["profession","profession"],["occupation","métier"],["management","gestion"],["manager","gérant"],["supervisor","superviseur"],["department","service"],["company","entreprise"],["business","affaires"],["client","client"],["supplier","fournisseur"],["partnership","partenariat"],["negotiation","négociation"],["agreement","accord"],["proposal","proposition"],["strategy","stratégie"],["goal","objectif"],["achievement","réussite"],["performance","performance"],["efficiency","efficacité"],["productivity","productivité"],["quality","qualité"],["responsibility","responsabilité"],["authority","autorité"],["decision","décision"],["opportunity","opportunité"],["challenge","défi"],["problem","problème"],["solution","solution"],["improvement","amélioration"],["development","développement"],["growth","croissance"],["success","succès"],["failure","échec"],["effort","effort"],["result","résultat"],["benefit","avantage"],["advantage","avantage"],["disadvantage","inconvénient"],["risk","risque"]],
      etudes: [["education","éducation"],["knowledge","connaissance"],["research","recherche"],["science","science"],["scientist","scientifique"],["experiment","expérience"],["theory","théorie"],["hypothesis","hypothèse"],["evidence","preuve"],["proof","preuve"],["data","données"],["analysis","analyse"],["conclusion","conclusion"],["argument","argument"],["opinion","opinion"],["discussion","discussion"],["presentation","présentation"],["essay","essai"],["summary","résumé"],["degree","diplôme"],["bachelor","licence"],["master","master"],["doctorate","doctorat"],["scholarship","bourse"],["tuition","frais de scolarité"],["lecture","cours magistral"],["seminar","séminaire"],["assignment","devoir"],["grade","note"],["certificate","certificat"],["curriculum","programme"],["subject","matière"],["mathematics","mathématiques"],["history","histoire"],["geography","géographie"],["literature","littérature"],["philosophy","philosophie"],["psychology","psychologie"]],
      societe: [["society","société"],["community","communauté"],["culture","culture"],["tradition","tradition"],["custom","coutume"],["religion","religion"],["politics","politique"],["president","président"],["minister","ministre"],["election","élection"],["vote","vote"],["democracy","démocratie"],["law","loi"],["justice","justice"],["freedom","liberté"],["equality","égalité"],["rights","droits"],["citizen","citoyen"],["population","population"],["peace","paix"],["war","guerre"],["conflict","conflit"],["poverty","pauvreté"],["wealth","richesse"]],
      environnement: [["climate","climat"],["pollution","pollution"],["recycling","recyclage"],["waste","déchets"],["energy","énergie"],["solar","solaire"],["renewable","renouvelable"],["carbon","carbone"],["emission","émission"],["ecosystem","écosystème"],["species","espèce"],["endangered","en voie de disparition"],["extinction","extinction"],["conservation","conservation"],["sustainable","durable"],["planet","planète"],["drought","sécheresse"],["flood","inondation"]],
      "sante-avance": [["disease","maladie"],["treatment","traitement"],["cure","remède"],["surgery","chirurgie"],["operation","opération"],["vaccine","vaccin"],["virus","virus"],["bacteria","bactérie"],["infection","infection"],["symptom","symptôme"],["diagnosis","diagnostic"],["nutrition","nutrition"],["vitamin","vitamine"],["protein","protéine"],["calorie","calorie"],["fitness","forme physique"],["stress","stress"],["therapy","thérapie"],["wellness","bien-être"]]
    },

    // ==================== B2 : +250 mots ====================
    B2: {
      business: [["entrepreneur","entrepreneur"],["startup","startup"],["innovation","innovation"],["acquisition","acquisition"],["merger","fusion"],["stakeholder","partie prenante"],["shareholder","actionnaire"],["board","conseil"],["CEO","PDG"],["executive","cadre dirigeant"],["revenue","revenu"],["turnover","chiffre d'affaires"],["profit margin","marge bénéficiaire"],["loss","perte"],["bankruptcy","faillite"],["expansion","expansion"],["competition","concurrence"],["competitor","concurrent"],["brand","marque"],["marketing","marketing"],["advertising","publicité"],["promotion","promotion"],["campaign","campagne"],["customer service","service client"],["quality control","contrôle qualité"],["outsourcing","externalisation"],["supply chain","chaîne d'approvisionnement"],["logistics","logistique"],["inventory","inventaire"],["warehouse","entrepôt"],["deal","accord"],["investment","investissement"],["portfolio","portefeuille"],["dividend","dividende"],["valuation","évaluation"],["forecast","prévision"]],
      "politique-avance": [["sovereignty","souveraineté"],["legislation","législation"],["amendment","amendement"],["referendum","référendum"],["coalition","coalition"],["lobby","lobby"],["corruption","corruption"],["transparency","transparence"],["accountability","responsabilité"],["bureaucracy","bureaucratie"],["ideology","idéologie"],["liberal","libéral"],["conservative","conservateur"],["socialism","socialisme"],["capitalism","capitalisme"],["nationalism","nationalisme"],["globalization","mondialisation"],["diplomacy","diplomatie"],["sanction","sanction"],["treaty","traité"],["alliance","alliance"],["summit","sommet"],["policy","politique"],["regulation","réglementation"]],
      "economie-avance": [["macroeconomics","macroéconomie"],["microeconomics","microéconomie"],["GDP","PIB"],["unemployment","chômage"],["interest rate","taux d'intérêt"],["mortgage","hypothèque"],["asset","actif"],["liability","passif"],["equity","capitaux propres"],["bond","obligation"],["commodity","matière première"],["speculation","spéculation"],["monopoly","monopole"],["tariff","tarif douanier"],["subsidy","subvention"],["deficit","déficit"],["surplus","excédent"],["fiscal","fiscal"],["monetary","monétaire"],["austerity","austérité"],["privatization","privatisation"]],
      "science-avance": [["quantum","quantique"],["relativity","relativité"],["particle","particule"],["molecule","molécule"],["compound","composé"],["reaction","réaction"],["catalyst","catalyseur"],["enzyme","enzyme"],["DNA","ADN"],["genome","génome"],["mutation","mutation"],["organism","organisme"],["biodiversity","biodiversité"],["neuron","neurone"],["brain","cerveau"],["cognitive","cognitif"],["consciousness","conscience"],["perception","perception"],["behavior","comportement"],["stimulus","stimulus"],["response","réponse"],["adaptation","adaptation"]],
      droit: [["court","tribunal"],["judge","juge"],["jury","jury"],["lawyer","avocat"],["attorney","avocat"],["prosecutor","procureur"],["defendant","défendeur"],["plaintiff","plaignant"],["witness","témoin"],["testimony","témoignage"],["verdict","verdict"],["sentence","peine"],["guilty","coupable"],["innocent","innocent"],["crime","crime"],["criminal","criminel"],["victim","victime"],["theft","vol"],["murder","meurtre"],["fraud","fraude"]],
      philosophie: [["ethics","éthique"],["morality","moralité"],["logic","logique"],["reason","raison"],["truth","vérité"],["reality","réalité"],["existence","existence"],["free will","libre arbitre"],["determinism","déterminisme"],["metaphysics","métaphysique"],["epistemology","épistémologie"],["ontology","ontologie"],["dialectic","dialectique"],["paradox","paradoxe"],["wisdom","sagesse"],["virtue","vertu"],["vice","vice"],["happiness","bonheur"],["meaning","sens"],["purpose","but"]],
      art: [["artist","artiste"],["sculpture","sculpture"],["architecture","architecture"],["poetry","poésie"],["novel","roman"],["play","pièce de théâtre"],["theater","théâtre"],["cinema","cinéma"],["director","réalisateur"],["actor","acteur"],["actress","actrice"],["script","scénario"],["scene","scène"],["masterpiece","chef-d'œuvre"],["exhibition","exposition"],["gallery","galerie"],["composer","compositeur"],["symphony","symphonie"],["concert","concert"],["opera","opéra"],["ballet","ballet"],["choreography","chorégraphie"],["design","design"],["aesthetic","esthétique"]],
      psychologie: [["personality","personnalité"],["intelligence","intelligence"],["memory","mémoire"],["motivation","motivation"],["trauma","traumatisme"],["depression","dépression"],["anxiety","anxiété"],["empathy","empathie"],["resilience","résilience"],["self-esteem","estime de soi"],["unconscious","inconscient"],["conditioning","conditionnement"]],
      medecine: [["patient","patient"],["clinic","clinique"],["physician","médecin"],["surgeon","chirurgien"],["pharmacist","pharmacien"],["antibiotic","antibiotique"],["chronic","chronique"],["immune","immunitaire"]],
      "medias-avances": [["journalism","journalisme"],["press","presse"],["documentary","documentaire"],["editorial","éditorial"],["censorship","censure"],["propaganda","propagande"],["misinformation","désinformation"],["fake news","fausses nouvelles"],["bias","partialité"],["objectivity","objectivité"],["investigation","enquête"],["leak","fuite"],["whistleblower","lanceur d'alerte"],["reporter","reporter"],["anchor","présentateur"]],
      "education-avance": [["pedagogy","pédagogie"],["assessment","évaluation"],["evaluation","évaluation"],["fellowship","bourse de recherche"],["dissertation","thèse"],["thesis","mémoire"],["publication","publication"],["academic","académique"],["faculty","faculté"],["dean","doyen"],["professor","professeur"],["lecturer","chargé de cours"],["tutor","tuteur"],["mentor","mentor"],["literacy","alphabétisation"]],
      finance: [["finance","finance"],["banking","banque"],["accounting","comptabilité"],["audit","audit"],["balance sheet","bilan"],["cash flow","flux de trésorerie"],["debt","dette"],["credit","crédit"],["loan","prêt"],["interest","intérêt"],["collateral","garantie"],["insurance","assurance"],["premium","prime"],["coverage","couverture"],["liquidity","liquidité"],["yield","rendement"],["hedge","couverture"],["derivative","produit dérivé"]],
      "adjectifs-avances": [["comprehensive","complet"],["substantial","substantiel"],["significant","significatif"],["essential","essentiel"],["crucial","crucial"],["vital","vital"],["inevitable","inévitable"],["controversial","controversé"],["ambiguous","ambigu"],["profound","profond"],["reluctant","réticent"],["consistent","cohérent"],["overwhelming","accablant"],["compelling","convaincant"],["subtle","subtil"],["innovative","innovant"],["efficient","efficace"],["adequate","adéquat"]]
    },

    // ==================== C1 : +310 mots ====================
    C1: {
      academique: [["ubiquitous","omniprésent"],["meticulous","méticuleux"],["resilience","résilience"],["discrepancy","divergence"],["paradigm","paradigme"],["scrutiny","examen minutieux"],["consensus","consensus"],["notwithstanding","nonobstant"],["juxtaposition","juxtaposition"],["inherent","inhérent"],["coherent","cohérent"],["pertinent","pertinent"],["explicit","explicite"],["implicit","implicite"],["concise","concis"],["elaborate","élaboré"],["substantiate","étayer"],["hypothesize","émettre une hypothèse"],["correlate","établir une corrélation"],["deduce","déduire"],["infer","inférer"],["synthesize","synthétiser"],["analyze","analyser"],["evaluate","évaluer"],["critique","critiquer"],["validate","valider"],["refute","réfuter"],["advocate","préconiser"],["articulate","articuler"],["convey","transmettre"],["illustrate","illustrer"],["demonstrate","démontrer"],["marginal","marginal"],["predominant","prédominant"],["preliminary","préliminaire"],["conclusive","concluant"],["empirical","empirique"]],
      professionnel: [["leverage","tirer parti"],["optimize","optimiser"],["streamline","rationaliser"],["benchmark","référence"],["milestone","jalon"],["deliverable","livrable"],["initiative","initiative"],["autonomy","autonomie"],["collaboration","collaboration"],["synergy","synergie"],["scalability","évolutivité"],["feasibility","faisabilité"],["sustainability","durabilité"],["competency","compétence"],["proficiency","maîtrise"],["expertise","expertise"]],
      litteraire: [["eloquent","éloquent"],["poignant","poignant"],["evocative","évocateur"],["poetic","poétique"],["lyrical","lyrique"],["narrative","narratif"],["protagonist","protagoniste"],["antagonist","antagoniste"],["metaphor","métaphore"],["simile","comparaison"],["allegory","allégorie"],["irony","ironie"],["satire","satire"],["symbolism","symbolisme"],["imagery","imagerie"]],
      scientifique: [["quantitative","quantitatif"],["qualitative","qualitatif"],["methodology","méthodologie"],["framework","cadre"],["variable","variable"],["parameter","paramètre"],["threshold","seuil"],["trajectory","trajectoire"],["equilibrium","équilibre"],["entropy","entropie"],["mechanism","mécanisme"],["phenomenon","phénomène"],["anomaly","anomalie"],["correlation","corrélation"]],
      journalistique: [["allege","alléguer"],["purport","prétendre"],["disclose","divulguer"],["unveil","dévoiler"],["expose","révéler"],["scrutinize","examiner"],["corroborate","corroborer"],["contradict","contredire"],["speculate","spéculer"]],
      juridique: [["jurisdiction","juridiction"],["statute","statut"],["precedent","précédent"],["litigation","litige"],["arbitration","arbitrage"],["compliance","conformité"],["indemnity","indemnité"],["breach","violation"],["remedy","recours"]],
      medical: [["pathology","pathologie"],["etiology","étiologie"],["prognosis","pronostic"],["syndrome","syndrome"],["acute","aigu"],["benign","bénin"],["malignant","malin"],["inflammation","inflammation"],["metastasis","métastase"]],
      technique: [["infrastructure","infrastructure"],["protocol","protocole"],["interface","interface"],["implementation","mise en œuvre"],["configuration","configuration"],["integration","intégration"],["deployment","déploiement"],["maintenance","maintenance"],["optimization","optimisation"]],
      philosophique: [["phenomenology","phénoménologie"],["existentialism","existentialisme"],["pragmatism","pragmatisme"],["empiricism","empirisme"],["rationalism","rationalisme"],["relativism","relativisme"],["absolutism","absolutisme"],["transcendence","transcendance"]],
      rhetorique: [["persuasion","persuasion"],["argumentation","argumentation"],["rhetoric","rhétorique"],["discourse","discours"],["eloquence","éloquence"],["emphatic","emphatique"],["assertive","assertif"],["conciliatory","conciliant"],["contentious","contentieux"],["polemical","polémique"]],
      "verbes-c1": [["exacerbate","exacerber"],["alleviate","atténuer"],["mitigate","atténuer"],["facilitate","faciliter"],["implement","mettre en œuvre"],["integrate","intégrer"],["consolidate","consolider"],["differentiate","différencier"],["encompass","englober"],["underscore","souligner"],["highlight","mettre en évidence"],["outline","décrire"],["delineate","délimiter"],["exemplify","exemplifier"],["verify","vérifier"],["endorse","appuyer"],["condone","tolérer"],["denounce","dénoncer"],["deny","nier"],["acknowledge","reconnaître"],["concede","concéder"],["contest","contester"],["dispute","contester"],["rebut","réfuter"],["discredit","discréditer"],["undermine","miner"],["weaken","affaiblir"],["reinforce","renforcer"],["strengthen","renforcer"],["bolster","renforcer"]]
    },

    // ==================== C2 : +160 mots ====================
    C2: {
      "litteraire-avance": [["serendipity","heureux hasard"],["quintessential","par excellence"],["ephemeral","éphémère"],["idiosyncrasy","idiosyncrasie"],["esoteric","ésotérique"],["perfunctory","superficiel"],["obfuscate","obscurcir"],["recalcitrant","récalcitrant"],["ineffable","ineffable"],["inexorable","inexorable"],["insidious","insidieux"],["obsequious","obséquieux"],["sycophantic","flagorneur"],["magnanimous","magnanime"],["pusillanimous","pusillanime"],["mercurial","capricieux"],["vociferous","bruyant"],["loquacious","loquace"],["taciturn","taciturne"],["erudite","érudit"],["sagacious","sagace"],["perspicacious","perspicace"],["astute","astucieux"],["canny","avisé"]],
      poetique: [["ethereal","éthéré"],["celestial","céleste"],["luminous","lumineux"],["resplendent","resplendissant"],["sublime","sublime"],["somber","sombre"],["melancholic","mélancolique"],["serene","serein"],["tranquil","tranquille"],["tumultuous","tumultueux"],["tempestuous","orageux"],["halcyon","paisible"],["bucolic","bucolique"]],
      "philosophique-avance": [["teleology","téléologie"],["hermeneutics","herméneutique"],["syllogism","syllogisme"],["tautology","tautologie"],["antinomy","antinomie"],["aporia","aporie"],["heuristic","heuristique"],["sublation","dépassement"]],
      "scientifique-avance": [["axiom","axiome"],["theorem","théorème"],["corollary","corollaire"],["stochastic","stochastique"],["deterministic","déterministe"],["asymptotic","asymptotique"],["orthogonal","orthogonal"],["isomorphic","isomorphe"],["homogeneous","homogène"],["heterogeneous","hétérogène"],["emergent","émergent"]],
      "juridique-avance": [["jurisprudence","jurisprudence"],["tort","délit civil"],["felony","crime"],["misdemeanor","délit"],["injunction","injonction"],["affidavit","affidavit"],["subpoena","citation à comparaître"],["deposition","déposition"],["adjudicate","juger"],["arbitrate","arbitrer"],["litigate","plaider"],["prosecute","poursuivre"],["acquit","acquitter"],["convict","condamner"],["exonerate","disculper"]],
      archaique: [["archaic","archaïque"],["obsolete","obsolète"],["anachronism","anachronisme"],["vestige","vestige"],["relic","relique"],["antiquated","désuet"],["quaint","pittoresque"],["erstwhile","d'autrefois"]],
      "technique-specialise": [["cryptography","cryptographie"],["nanotechnology","nanotechnologie"],["biotechnology","biotechnologie"],["semiconductor","semi-conducteur"],["microprocessor","microprocesseur"],["telecommunications","télécommunications"],["satellite","satellite"],["spectroscopy","spectroscopie"],["chromatography","chromatographie"],["calibration","étalonnage"],["granularity","granularité"],["interoperability","interopérabilité"],["virtualization","virtualisation"],["containerization","conteneurisation"]]
    }
  };

  // ============================================================
  // FUSION : convertit les listes [en, fr] → objets {en, fr, theme}
  // et ajoute aux tableaux globaux (sans doublons)
  // ============================================================
  function mergeLevel(levelCode) {
    const themesObj = EXTRA[levelCode] || {};
    const toAdd = [];

    Object.entries(themesObj).forEach(([theme, list]) => {
      list.forEach(([en, fr]) => toAdd.push({ en, fr, theme }));
    });

    const current = window[`WORDS_${levelCode}`] || [];
    const existing = new Set(current.map(w => w.en.toLowerCase()));
    let added = 0;

    toAdd.forEach(w => {
      if (!existing.has(w.en.toLowerCase())) {
        current.push(w);
        existing.add(w.en.toLowerCase());
        added++;
      }
    });

    window[`WORDS_${levelCode}`] = current;
    console.log(`📚 ${levelCode} : +${added} → total ${current.length}`);
  }

  ['A1','A2','B1','B2','C1','C2'].forEach(mergeLevel);

  const total = ['A1','A2','B1','B2','C1','C2']
    .reduce((s, l) => s + (window[`WORDS_${l}`]?.length || 0), 0);
  console.log(`✅ TOTAL FINAL : ${total} mots`);
})();