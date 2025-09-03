export interface LocationData {
  regions: Region[];
}

export interface Region {
  name: string;
  districts: District[];
}

export interface District {
  name: string;
  towns: string[];
}

export const ghanaLocationData: LocationData = {
  regions: [
    {
      name: "Greater Accra",
      districts: [
        {
          name: "Accra Metropolitan",
          towns: ["Accra Central", "Adabraka", "Osu", "Cantonments", "Labone", "Dansoman", "Jamestown", "Kaneshie", "Kokomlemle", "Laterbiokorshie", "Mamprobi", "New Town", "North Ridge", "Sabon Zongo", "South Labone", "Tesano", "West Ridge", "Achimota", "Legon", "Madina"]
        },
        {
          name: "Tema Metropolitan",
          towns: ["Tema Community 1", "Tema Community 2", "Tema Community 3", "Tema Community 4", "Tema Community 5", "Tema Community 6", "Tema Community 7", "Tema Community 8", "Tema Community 9", "Tema Community 10", "Tema Community 11", "Tema Community 12", "Tema New Town", "Ashaiman", "Batsonaa", "Spintex", "Sakumono", "Lashibi", "Klagon", "Adjei Kojo"]
        },
        {
          name: "Ga South Municipal",
          towns: ["Weija", "Bortianor", "Ngleshie Amanfro", "Kasoa", "Dawhenya", "Ofankor", "Pokuase", "Amasaman", "Dome", "Taifa", "Kwabenya", "Haasto", "Oblogo", "Mallam", "Gbawe", "Santa Maria", "Oyarifa", "Abokobi", "Dodowa", "Ashaley Botwe"]
        },
        {
          name: "Ledzokuku Municipal",
          towns: ["Teshie", "Nungua", "Sakumono", "Lashibi", "Cantonments", "Labone", "Community 18", "Community 19", "Community 20", "Community 21", "Community 22", "Community 23", "Community 24", "Community 25", "Baatsonaa", "Spintex", "Klagon", "Adjei Kojo", "Michel Camp", "Ashaiman"]
        },
        {
          name: "Kpone Katamanso Municipal",
          towns: ["Kpone", "Katamanso", "Appolonia", "Oyarifa", "Ashaiman", "Adjei Kojo", "Michel Camp", "Zenu", "Gbetsele", "Apollonia", "Appolonia", "Omanjor", "Sakumono", "Lashibi", "Cantonments", "Labone", "Community 18", "Community 19", "Community 20", "Community 21"]
        }
      ]
    },
    {
      name: "Ashanti",
      districts: [
        {
          name: "Kumasi Metropolitan",
          towns: ["Adum", "Bantama", "Manhyia", "Tafo", "Suame", "Asokwa", "Oforikrom", "Nhyiaeso", "Subin", "Bompata", "Ejisu", "Fomena", "Mampong", "Bekwai", "Konongo", "Obuasi", "Agona", "Nyinahin", "Effiduase", "Juaso"]
        },
        {
          name: "Ejisu Municipal",
          towns: ["Ejisu", "Besease", "Bonwire", "Edwenase", "Achiase", "Adadientem", "Adwafo", "Ahenema Kokoben", "Apoteri", "Asaman", "Asonomaso", "Atonsu", "Beposo", "Bodwesango", "Donyina", "Feyiase", "Jachie", "Kwaso", "Nkontompo", "Trebuom"]
        },
        {
          name: "Oforikrom Municipal",
          towns: ["Oforikrom", "Ayeduase", "Kotei", "Boadi", "Emena", "Kentinkrono", "Ayigya", "Daban", "Essienimpong", "Gyinyase", "Krofrom", "Nsenie", "Ohwim", "Old Tafo", "Pankrono", "Santasi", "Sokoban", "South Suntreso", "Tarkwa Maakro", "Brewery"]
        },
        {
          name: "Asokwa Municipal",
          towns: ["Asokwa", "Atonsu", "Boadi", "Daban", "Emena", "Gyinyase", "Krofrom", "Nsenie", "Ohwim", "Old Tafo", "Pankrono", "Santasi", "Sokoban", "South Suntreso", "Tarkwa Maakro", "Brewery", "Ayigya", "Kentinkrono", "Ayeduase", "Kotei"]
        },
        {
          name: "Suame Municipal",
          towns: ["Suame", "Abuakwa", "Aduman", "Afrancho", "Ahenkro", "Ankaase", "Anwiankwanta", "Asaman", "Asonomaso", "Atonsu", "Beposo", "Bodwesango", "Donyina", "Feyiase", "Jachie", "Kwaso", "Nkontompo", "Trebuom", "Besease", "Bonwire"]
        }
      ]
    },
    {
      name: "Western",
      districts: [
        {
          name: "Sekondi Takoradi Metropolitan",
          towns: ["Sekondi", "Takoradi", "Effiakuma", "Kwesimintsim", "Apowa", "Essikado", "Kojokrom", "Mpintsin", "Nkroful", "Prestea", "Tarkwa", "Bogoso", "Dunkwa", "Elubo", "Half Assini", "Axim", "Essiama", "Nkroful", "Prestea", "Tarkwa"]
        },
        {
          name: "Tarkwa Nsuaem Municipal",
          towns: ["Tarkwa", "Nsuaem", "Aboso", "Bogoso", "Prestea", "Huni Valley", "Damang", "Benso", "Awudua", "Akoon", "Mpohor", "Essaman", "Simpa", "Tamso", "Amanfu", "Bompieso", "Daboase", "Adieyie", "Mpeasem", "Aboso"]
        },
        {
          name: "Ellembelle District",
          towns: ["Ellembelle", "Aiyinasi", "Esiama", "Nkroful", "Asanta", "Sanwoma", "Eikwe", "Aboasi", "Adubrim", "Akropong", "Amada", "Anwia", "Asemkow", "Awiebo", "Baku", "Benyim", "Bewiakrom", "Bondzi", "Jomoro", "Half Assini"]
        },
        {
          name: "Ahanta West Municipal",
          towns: ["Agona", "Busua", "Butre", "Dixcove", "Princess Town", "Akatekyi", "Akwidaa", "Ankobra", "Apremodo", "Asemkow", "Awiebo", "Bonyere", "Efia", "Ewusiejo", "Fanti", "Miemia", "Nkroful", "Prestea", "Sekondi", "Takoradi"]
        },
        {
          name: "Wassa East District",
          towns: ["Daboase", "Adum Banso", "Amanfu", "Bompieso", "Benso", "Awudua", "Akoon", "Mpohor", "Essaman", "Simpa", "Tamso", "Aboso", "Bogoso", "Prestea", "Huni Valley", "Damang", "Tarkwa", "Nsuaem", "Aboso", "Bogoso"]
        }
      ]
    },
    {
      name: "Central",
      districts: [
        {
          name: "Cape Coast Metropolitan",
          towns: ["Cape Coast", "Elmina", "Kakumdo", "Pedu", "Abura", "Ankaful", "Bakaano", "Duakor", "Ekon", "Essuekyir", "Koforidua", "Kwaprow", "Mpeasem", "Nkanfoa", "Ola", "Siwdu", "Tantri", "Akotokyir", "Amamoma", "University"]
        },
        {
          name: "Effutu Municipal",
          towns: ["Winneba", "Gyangyanadze", "Osubonpanyin", "Ateitu", "Amanful", "Essuekyir", "Koforidua", "Kwaprow", "Mpeasem", "Nkanfoa", "Ola", "Siwdu", "Tantri", "Akotokyir", "Amamoma", "University", "Cape Coast", "Elmina", "Kakumdo", "Pedu"]
        },
        {
          name: "Agona West Municipal",
          towns: ["Swedru", "Nyakrom", "Nkum", "Bobikuma", "Kwanyako", "Amanful", "Essuekyir", "Koforidua", "Kwaprow", "Mpeasem", "Nkanfoa", "Ola", "Siwdu", "Tantri", "Akotokyir", "Amamoma", "University", "Cape Coast", "Elmina", "Kakumdo"]
        },
        {
          name: "Mfantsiman Municipal",
          towns: ["Saltpond", "Mankessim", "Anomabu", "Biriwa", "Dominase", "Eguafo", "Kormantse", "Abandze", "Amanful", "Essuekyir", "Koforidua", "Kwaprow", "Mpeasem", "Nkanfoa", "Ola", "Siwdu", "Tantri", "Akotokyir", "Amamoma", "University"]
        },
        {
          name: "Abura Asebu Kwamankese District",
          towns: ["Abura", "Asebu", "Kwamankese", "Dunkwa", "Moree", "Ankaful", "Bakaano", "Duakor", "Ekon", "Essuekyir", "Koforidua", "Kwaprow", "Mpeasem", "Nkanfoa", "Ola", "Siwdu", "Tantri", "Akotokyir", "Amamoma", "University"]
        }
      ]
    },
    {
      name: "Eastern",
      districts: [
        {
          name: "New Juaben South Municipal",
          towns: ["Koforidua", "Effiduase", "Asokore", "Jumapo", "Suhyen", "Oyoko", "Bokoro", "Densuano", "Kukurantumi", "Abirim", "Akim Oda", "Akim Swedru", "Apedwa", "Asamankese", "Akwatia", "Achiase", "Akim Tafo", "Akim Wenchi", "Akyem Hemang", "Akyem Sekyere"]
        },
        {
          name: "Akuapim South Municipal",
          towns: ["Nkawkaw", "Aburi", "Kitase", "Dawu", "Pakro", "Adawso", "Adukrom", "Akropong", "Amanokrom", "Apirede", "Aseseeso", "Atwea", "Berekuso", "Dawu", "Dompim", "Kwabeng", "Larteh", "Mamfe", "Obosomase", "Tutu"]
        },
        {
          name: "West Akim Municipal",
          towns: ["Asamankese", "Adeiso", "Akim Oda", "Akim Swedru", "Apedwa", "Akwatia", "Achiase", "Akim Tafo", "Akim Wenchi", "Akyem Hemang", "Akyem Sekyere", "Koforidua", "Effiduase", "Asokore", "Jumapo", "Suhyen", "Oyoko", "Bokoro", "Densuano", "Kukurantumi"]
        },
        {
          name: "Birim South District",
          towns: ["Akim Oda", "Akim Swedru", "Apedwa", "Asamankese", "Akwatia", "Achiase", "Akim Tafo", "Akim Wenchi", "Akyem Hemang", "Akyem Sekyere", "Koforidua", "Effiduase", "Asokore", "Jumapo", "Suhyen", "Oyoko", "Bokoro", "Densuano", "Kukurantumi", "Abirim"]
        },
        {
          name: "Yilo Krobo Municipal",
          towns: ["Somanya", "Kpong", "Akuse", "Akim Oda", "Akim Swedru", "Apedwa", "Asamankese", "Akwatia", "Achiase", "Akim Tafo", "Akim Wenchi", "Akyem Hemang", "Akyem Sekyere", "Koforidua", "Effiduase", "Asokore", "Jumapo", "Suhyen", "Oyoko", "Bokoro"]
        }
      ]
    },
    {
      name: "Volta",
      districts: [
        {
          name: "Ho Municipal",
          towns: ["Ho", "Akoefe", "Avenui", "Dome", "Hlefi", "Klefe", "Kpedze", "Matse", "Sokode", "Takla", "Taviefe", "Tanyigbe", "Abutia", "Adaklu", "Aflao", "Akatsi", "Anloga", "Keta", "Kpando", "Hohoe"]
        },
        {
          name: "Hohoe Municipal",
          towns: ["Hohoe", "Alavanyo", "Kpando", "Fodome", "Gbi", "Lolobi", "Likpe", "Logba", "Tafi", "Tagbo", "Todzi", "Wli", "Abutia", "Adaklu", "Aflao", "Akatsi", "Anloga", "Keta", "Ho", "Akoefe"]
        },
        {
          name: "Keta Municipal",
          towns: ["Keta", "Anloga", "Aflao", "Akatsi", "Denu", "Kedzi", "Srogboe", "Tegbi", "Vodza", "Woe", "Abor", "Adina", "Afife", "Agbozume", "Avenor", "Dzodze", "Fiave", "Havedzi", "Hevi", "Klikor"]
        },
        {
          name: "Akatsi South District",
          towns: ["Akatsi", "Avenor", "Dzodze", "Fiave", "Havedzi", "Hevi", "Klikor", "Abor", "Adina", "Afife", "Agbozume", "Keta", "Anloga", "Aflao", "Denu", "Kedzi", "Srogboe", "Tegbi", "Vodza", "Woe"]
        },
        {
          name: "North Tongu District",
          towns: ["Adidome", "Aveyime", "Battor", "Dodome", "Fieve", "Mafi", "Mepe", "Torgome", "Volo", "Abutia", "Adaklu", "Aflao", "Akatsi", "Anloga", "Keta", "Kpando", "Hohoe", "Ho", "Akoefe", "Avenui"]
        }
      ]
    },
    {
      name: "Northern",
      districts: [
        {
          name: "Tamale Metropolitan",
          towns: ["Tamale", "Kanvili", "Kalpohini", "Lamashegu", "Sabonjida", "Sakasaka", "Tishigu", "Vitting", "Zogbeli", "Abeka", "Adubili", "Choggu", "Gumbihini", "Kukuo", "Nakpanzoo", "Nyohini", "Sagnarigu", "Salamba", "Tunayili", "Yepalsi"]
        },
        {
          name: "Sagnarigu Municipal",
          towns: ["Sagnarigu", "Kanvili", "Kalpohini", "Lamashegu", "Sabonjida", "Sakasaka", "Tishigu", "Vitting", "Zogbeli", "Abeka", "Adubili", "Choggu", "Gumbihini", "Kukuo", "Nakpanzoo", "Nyohini", "Tamale", "Salamba", "Tunayili", "Yepalsi"]
        },
        {
          name: "Yendi Municipal",
          towns: ["Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu", "Bimbilla", "Jasikan", "Kpandae", "Nalerigu", "Bole", "Damongo", "Salaga", "Sawla", "Buipe", "Fufulso", "Larabanga", "Mole", "Buipe"]
        },
        {
          name: "Nanumba North Municipal",
          towns: ["Bimbilla", "Jasikan", "Kpandae", "Nalerigu", "Bole", "Damongo", "Salaga", "Sawla", "Buipe", "Fufulso", "Larabanga", "Mole", "Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu", "Tamale"]
        },
        {
          name: "Gushegu Municipal",
          towns: ["Gushegu", "Karaga", "Kpandae", "Nalerigu", "Bole", "Damongo", "Salaga", "Sawla", "Buipe", "Fufulso", "Larabanga", "Mole", "Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu", "Tamale"]
        }
      ]
    },
    {
      name: "Upper East",
      districts: [
        {
          name: "Bolgatanga Municipal",
          towns: ["Bolgatanga", "Bongo", "Navrongo", "Paga", "Bawku", "Zebilla", "Binduri", "Garu", "Tempane", "Pusiga", "Talensi", "Nabdam", "Bawku West", "Kassena Nankana", "Builsa", "Sandema", "Chiana", "Kolgatanga", "Tongo", "Zuarungu"]
        },
        {
          name: "Bawku Municipal",
          towns: ["Bawku", "Zebilla", "Binduri", "Garu", "Tempane", "Pusiga", "Talensi", "Nabdam", "Bawku West", "Kassena Nankana", "Builsa", "Sandema", "Chiana", "Kolgatanga", "Tongo", "Zuarungu"]
        },
        {
          name: "Bawku Municipal",
          towns: ["Bawku", "Zebilla", "Binduri", "Garu", "Tempane", "Pusiga", "Bolgatanga", "Bongo", "Navrongo", "Paga", "Talensi", "Nabdam", "Bawku West", "Kassena Nankana", "Builsa", "Sandema", "Chiana", "Kolgatanga", "Tongo", "Zuarungu"]
        },
        {
          name: "Kassena Nankana Municipal",
          towns: ["Navrongo", "Paga", "Kassena", "Nankana", "Bolgatanga", "Bongo", "Bawku", "Zebilla", "Binduri", "Garu", "Tempane", "Pusiga", "Talensi", "Nabdam", "Bawku West", "Builsa", "Sandema", "Chiana", "Kolgatanga", "Tongo"]
        },
        {
          name: "Builsa South District",
          towns: ["Sandema", "Chiana", "Fumbisi", "Gbedema", "Kanjaga", "Siniensi", "Wiesi", "Bolgatanga", "Bongo", "Navrongo", "Paga", "Bawku", "Zebilla", "Binduri", "Garu", "Tempane", "Pusiga", "Talensi", "Nabdam", "Bawku West"]
        },
        {
          name: "Talensi District",
          towns: ["Tongo", "Pwalugu", "Sheaga", "Winkogo", "Yameriga", "Bolgatanga", "Bongo", "Navrongo", "Paga", "Bawku", "Zebilla", "Binduri", "Garu", "Tempane", "Pusiga", "Talensi", "Nabdam", "Bawku West", "Kassena Nankana", "Builsa"]
        }
      ]
    },
    {
      name: "Upper West",
      districts: [
        {
          name: "Wa Municipal",
          towns: ["Wa", "Bamahu", "Charia", "Dobile", "Kperisi", "Nakori", "Sombo", "Tikpo", "Wechiau", "Busa", "Funsi", "Hamile", "Jirapa", "Lambussie", "Lawra", "Nadowli", "Tumu", "Zeo", "Babile", "Daffiama"]
        },
        {
          name: "Jirapa Municipal",
          towns: ["Jirapa", "Lambussie", "Lawra", "Nadowli", "Tumu", "Zeo", "Babile", "Daffiama", "Wa", "Bamahu", "Charia", "Dobile", "Kperisi", "Nakori", "Sombo", "Tikpo", "Wechiau", "Busa", "Funsi", "Hamile"]
        },
        {
          name: "Lawra Municipal",
          towns: ["Lawra", "Nadowli", "Tumu", "Zeo", "Babile", "Daffiama", "Jirapa", "Lambussie", "Wa", "Bamahu", "Charia", "Dobile", "Kperisi", "Nakori", "Sombo", "Tikpo", "Wechiau", "Busa", "Funsi", "Hamile"]
        },
        {
          name: "Nadowli-Kaleo District",
          towns: ["Nadowli", "Kaleo", "Daffiama", "Babile", "Zeo", "Tumu", "Lawra", "Jirapa", "Lambussie", "Wa", "Bamahu", "Charia", "Dobile", "Kperisi", "Nakori", "Sombo", "Tikpo", "Wechiau", "Busa", "Funsi"]
        },
        {
          name: "Sissala East Municipal",
          towns: ["Tumu", "Zeo", "Babile", "Daffiama", "Nadowli", "Lawra", "Jirapa", "Lambussie", "Wa", "Bamahu", "Charia", "Dobile", "Kperisi", "Nakori", "Sombo", "Tikpo", "Wechiau", "Busa", "Funsi", "Hamile"]
        }
      ]
    },
    {
      name: "Bono",
      districts: [
        {
          name: "Sunyani Municipal",
          towns: ["Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Dormaa"]
        },
        {
          name: "Berekum Municipal",
          towns: ["Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Dormaa"]
        },
        {
          name: "Dormaa Central Municipal",
          towns: ["Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa"]
        },
        {
          name: "Techiman Municipal",
          towns: ["Techiman", "Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman"]
        },
        {
          name: "Wenchi Municipal",
          towns: ["Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi"]
        }
      ]
    },
    {
      name: "Bono East",
      districts: [
        {
          name: "Techiman North District",
          towns: ["Techiman", "Tuobodom", "Krobo", "Offuman", "Tanoso", "Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza"]
        },
        {
          name: "Kintampo North Municipal",
          towns: ["Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo"]
        },
        {
          name: "Atebubu-Amantin Municipal",
          towns: ["Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi", "Atebubu"]
        },
        {
          name: "Nkoranza South Municipal",
          towns: ["Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi", "Atebubu", "Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza"]
        },
        {
          name: "Pru East District",
          towns: ["Yeji", "Banda", "Brekum", "Sunyani", "Abesim", "Antwikrom", "Baatown", "Berekum", "Dormaa", "Drobo", "Japekrom", "Kintampo", "Nkoranza", "Nsawkaw", "Sampa", "Seikwa", "Techiman", "Wenchi", "Atebubu", "Yeji"]
        }
      ]
    },
    {
      name: "Ahafo",
      districts: [
        {
          name: "Goaso Municipal",
          towns: ["Goaso", "Acherensua", "Hwidiem", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Akrodie", "Beatrice", "Dadieso", "Fawohoyeden", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Acherensua", "Hwidiem", "Goaso", "Akrodie", "Beatrice"]
        },
        {
          name: "Asunafo North Municipal",
          towns: ["Mim", "Goaso", "Acherensua", "Hwidiem", "Kenyasi", "Nkasiem", "Sankore", "Akrodie", "Beatrice", "Dadieso", "Fawohoyeden", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Acherensua", "Hwidiem", "Goaso", "Akrodie", "Beatrice"]
        },
        {
          name: "Asunafo South District",
          towns: ["Kukuom", "Goaso", "Acherensua", "Hwidiem", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Akrodie", "Beatrice", "Dadieso", "Fawohoyeden", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Acherensua", "Hwidiem", "Goaso", "Akrodie"]
        },
        {
          name: "Asutifi South District",
          towns: ["Hwidiem", "Goaso", "Acherensua", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Akrodie", "Beatrice", "Dadieso", "Fawohoyeden", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Acherensua", "Hwidiem", "Goaso", "Akrodie", "Beatrice"]
        },
        {
          name: "Tano North Municipal",
          towns: ["Duayaw Nkwanta", "Goaso", "Acherensua", "Hwidiem", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Akrodie", "Beatrice", "Dadieso", "Fawohoyeden", "Kenyasi", "Mim", "Nkasiem", "Sankore", "Acherensua", "Hwidiem", "Goaso", "Akrodie"]
        }
      ]
    },
    {
      name: "Savannah",
      districts: [
        {
          name: "West Gonja Municipal",
          towns: ["Damongo", "Larabanga", "Mole", "Buipe", "Fufulso", "Sawla", "Bole", "Salaga", "Yapei", "Daboya", "Busunu", "Mankarigu", "Murugu", "Tuluwe", "Sankpala", "Kpembe", "Makango", "Kpalbe", "Jentilpe", "Bonyanto"]
        },
        {
          name: "East Gonja Municipal",
          towns: ["Salaga", "Makango", "Kpembe", "Kpalbe", "Jentilpe", "Bonyanto", "Damongo", "Larabanga", "Mole", "Buipe", "Fufulso", "Sawla", "Bole", "Salaga", "Yapei", "Daboya", "Busunu", "Mankarigu", "Murugu", "Tuluwe"]
        },
        {
          name: "North Gonja District",
          towns: ["Daboya", "Busunu", "Mankarigu", "Murugu", "Tuluwe", "Sankpala", "Kpembe", "Makango", "Kpalbe", "Jentilpe", "Bonyanto", "Damongo", "Larabanga", "Mole", "Buipe", "Fufulso", "Sawla", "Bole", "Salaga", "Yapei"]
        },
        {
          name: "Central Gonja District",
          towns: ["Buipe", "Yapei", "Daboya", "Busunu", "Mankarigu", "Murugu", "Tuluwe", "Sankpala", "Kpembe", "Makango", "Kpalbe", "Jentilpe", "Bonyanto", "Damongo", "Larabanga", "Mole", "Buipe", "Fufulso", "Sawla", "Bole"]
        },
        {
          name: "Bole District",
          towns: ["Bole", "Sawla", "Tuna", "Kalba", "Mandari", "Kontonkore", "Chache", "Banda", "Bore", "Jentilpe", "Bonyanto", "Damongo", "Larabanga", "Mole", "Buipe", "Fufulso", "Sawla", "Bole", "Salaga", "Yapei"]
        }
      ]
    },
    {
      name: "North East",
      districts: [
        {
          name: "Nalerigu Municipal",
          towns: ["Nalerigu", "Gambaga", "Walewale", "Yagaba", "Kpasenkpe", "Wulugu", "Langbensi", "Kunkwa", "Sakogu", "Gbintiri", "Kuga", "Janga", "Zabzugu", "Tatale", "Sang", "Nakpachei", "Yendi", "Bimbilla", "Jasikan", "Kpandae"]
        },
        {
          name: "West Mamprusi Municipal",
          towns: ["Walewale", "Yagaba", "Kpasenkpe", "Wulugu", "Langbensi", "Kunkwa", "Sakogu", "Gbintiri", "Kuga", "Janga", "Zabzugu", "Tatale", "Sang", "Nakpachei", "Yendi", "Bimbilla", "Jasikan", "Kpandae", "Nalerigu", "Gambaga"]
        },
        {
          name: "East Mamprusi Municipal",
          towns: ["Gambaga", "Nalerigu", "Walewale", "Yagaba", "Kpasenkpe", "Wulugu", "Langbensi", "Kunkwa", "Sakogu", "Gbintiri", "Kuga", "Janga", "Zabzugu", "Tatale", "Sang", "Nakpachei", "Yendi", "Bimbilla", "Jasikan", "Kpandae"]
        },
        {
          name: "Yunyoo-Nasuan District",
          towns: ["Yunyoo", "Nasuan", "Nalerigu", "Gambaga", "Walewale", "Yagaba", "Kpasenkpe", "Wulugu", "Langbensi", "Kunkwa", "Sakogu", "Gbintiri", "Kuga", "Janga", "Zabzugu", "Tatale", "Sang", "Nakpachei", "Yendi", "Bimbilla"]
        },
        {
          name: "Mamprugu Moagduri District",
          towns: ["Moagduri", "Nalerigu", "Gambaga", "Walewale", "Yagaba", "Kpasenkpe", "Wulugu", "Langbensi", "Kunkwa", "Sakogu", "Gbintiri", "Kuga", "Janga", "Zabzugu", "Tatale", "Sang", "Nakpachei", "Yendi", "Bimbilla", "Jasikan"]
        }
      ]
    },
    {
      name: "Oti",
      districts: [
        {
          name: "Jasikan District",
          towns: ["Jasikan", "Kpandae", "Nalerigu", "Bimbilla", "Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu", "Kete Krachi", "Dambai", "Nkwanta", "Kpassa", "Brewaniase", "Worawora", "Biakoye", "Kadjebi", "Dodo"]
        },
        {
          name: "Krachi East Municipal",
          towns: ["Dambai", "Kete Krachi", "Nkwanta", "Kpassa", "Brewaniase", "Worawora", "Biakoye", "Kadjebi", "Dodo", "Jasikan", "Kpandae", "Nalerigu", "Bimbilla", "Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu"]
        },
        {
          name: "Nkwanta South Municipal",
          towns: ["Nkwanta", "Kpassa", "Brewaniase", "Worawora", "Biakoye", "Kadjebi", "Dodo", "Jasikan", "Kpandae", "Nalerigu", "Bimbilla", "Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu", "Kete Krachi", "Dambai"]
        },
        {
          name: "Biakoye District",
          towns: ["Worawora", "Biakoye", "Kadjebi", "Dodo", "Jasikan", "Kpandae", "Nalerigu", "Bimbilla", "Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu", "Kete Krachi", "Dambai", "Nkwanta", "Kpassa", "Brewaniase"]
        },
        {
          name: "Kadjebi District",
          towns: ["Kadjebi", "Dodo", "Jasikan", "Kpandae", "Nalerigu", "Bimbilla", "Yendi", "Adibo", "Kuga", "Nakpachei", "Sang", "Tatale", "Zabzugu", "Kete Krachi", "Dambai", "Nkwanta", "Kpassa", "Brewaniase", "Worawora", "Biakoye"]
        }
      ]
    },
    {
      name: "Western North",
      districts: [
        {
          name: "Sefwi Wiawso Municipal",
          towns: ["Sefwi Wiawso", "Bibiani", "Anhwiaso", "Awaso", "Juaboso", "Bodi", "Asawinso", "Adabokrom", "Benchema", "Boako", "Chirano", "Dadieso", "Essam", "Kokofu", "Mim", "New Debiso", "Old Debiso", "Sewhi", "Suano", "Wiawso"]
        },
        {
          name: "Bibiani Anhwiaso Bekwai Municipal",
          towns: ["Bibiani", "Anhwiaso", "Awaso", "Sefwi Wiawso", "Juaboso", "Bodi", "Asawinso", "Adabokrom", "Benchema", "Boako", "Chirano", "Dadieso", "Essam", "Kokofu", "Mim", "New Debiso", "Old Debiso", "Sewhi", "Suano", "Wiawso"]
        },
        {
          name: "Juaboso District",
          towns: ["Juaboso", "Bodi", "Asawinso", "Adabokrom", "Benchema", "Boako", "Chirano", "Dadieso", "Essam", "Kokofu", "Mim", "New Debiso", "Old Debiso", "Sewhi", "Suano", "Wiawso", "Sefwi Wiawso", "Bibiani", "Anhwiaso", "Awaso"]
        },
        {
          name: "Bodi District",
          towns: ["Bodi", "Juaboso", "Asawinso", "Adabokrom", "Benchema", "Boako", "Chirano", "Dadieso", "Essam", "Kokofu", "Mim", "New Debiso", "Old Debiso", "Sewhi", "Suano", "Wiawso", "Sefwi Wiawso", "Bibiani", "Anhwiaso", "Awaso"]
        },
        {
          name: "Aowin Municipal",
          towns: ["Enchi", "Sefwi Wiawso", "Bibiani", "Anhwiaso", "Awaso", "Juaboso", "Bodi", "Asawinso", "Adabokrom", "Benchema", "Boako", "Chirano", "Dadieso", "Essam", "Kokofu", "Mim", "New Debiso", "Old Debiso", "Sewhi", "Suano"]
        }
      ]
    }
  ]
};

// Mock schools data for each town
export const schoolsData: Record<string, string[]> = {
  "Accra Central": [
    "Accra High School", "Accra Academy", "Kinbu Secondary School", 
    "St. Mary's Senior High School", "Wesley Grammar School", 
    "Presbyterian Boys' Secondary School", "Achimota School", 
    "Holy Trinity Cathedral School", "Ghana National College", 
    "Labone Senior High School", "St. Thomas Aquinas Senior High School",
    "Odorgonno Senior High School", "Accra Girls Senior High School",
    "Accra Technical Training Centre", "St. John's Grammar School",
    "Mfantsipim School", "Adisadel College", "Prempeh College",
    "Opoku Ware School", "Kumasi High School"
  ],
  "Kumasi": [
    "Kumasi High School", "Opoku Ware School", "Prempeh College",
    "St. Louis Senior High School", "Yaa Asantewaa Girls' Senior High School",
    "T.I. Ahmadiyya Senior High School", "KNUST Senior High School",
    "Osei Tutu Senior High School", "Asanteman Senior High School",
    "St. Monica's Senior High School", "Anglican Senior High School",
    "Adventist Senior High School", "Kumasi Academy", "Serwaa Nyarko Girls' Senior High School",
    "Afia Kobi Ampem Girls' Senior High School", "KNUST Basic School",
    "Prempeh College", "Opoku Ware School", "Kumasi High School",
    "St. Peter's Senior High School"
  ],
  "Cape Coast": [
    "Adisadel College", "Mfantsipim School", "St. Augustine's College",
    "Holy Child School", "Wesley Girls' High School", "Ghana National College",
    "University Practice Senior High School", "Oguaa Senior High Technical School",
    "Academy of Christ the King", "Cape Coast Technical Institute",
    "St. Nicholas Senior High School", "Aggrey Memorial Senior High School",
    "Edinaman Senior High School", "Adisadel College", "Mfantsipim School",
    "St. Augustine's College", "Holy Child School", "Wesley Girls' High School",
    "Ghana National College", "University Practice Senior High School"
  ],
  // Add more towns and their schools as needed...
};

export default ghanaLocationData;