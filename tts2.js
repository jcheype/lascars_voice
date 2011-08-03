karotz.tts.__start = karotz.tts.start

karotz.tts2 = {}
karotz.tts2.__REG = new RegExp('url="(.*?)"');
karotz.tts2.start = function(text, lang, callback){
    var textCustom = encodeURIComponent(text+'. bla h')
    try{
        
        data = {KagedoSynthesis : '<KagedoSynthesis><Identification><codeAuth>10O328e5934A7</codeAuth></Identification><Result><ResultCode/><ErrorDetail/></Result><MainData><DialogList><Dialog character="'+ lang +'">' +textCustom+ '</Dialog></DialogList></MainData></KagedoSynthesis>'}
        result = http.post("http://webservice.kagedo.fr/synthesis/ws/makesound", data)
        log("voice: " + lang)
        log(result)
        m = karotz.tts2.__REG.exec(result);
        karotz.multimedia.play(m[1], callback)
    }
    catch(err){
        karotz.tts.__start(text, "fr", callback);
    }
}

karotz.tts3 = {}
karotz.tts3.__REG = new RegExp('retour_php=(.*?)\\&');
karotz.tts3.start = function(text, lang, callback){
    var textCustom = '. ' + text + '. .'
    try{
        data = {
            client_request_type : 'CREATE_REQUEST',
            client_voice : lang,
            actionscript_version : '3',
            client_text: encodeURIComponent(textCustom),
            client_version: "1-00",
            client_login: "asTTS",
            client_password: "demo_web"
        }
        result = http.post("http://vaas.acapela-group.com/Services/DemoWeb/textToMP3.php", data)
        log("voice: " + lang)
        log(result)
        m = karotz.tts3.__REG.exec(result);
        karotz.multimedia.play(m[1], callback)
    }
    catch(err){
        karotz.tts.__start(text, "fr", callback);
    }
}

karotz.tts.randVoice = function(lang) {
    var table = karotz.__voice_table[lang]
    return table[Math.floor(Math.random()*table.length)];
}

karotz.tts.voiceId = function(lang, id) {
    var table = karotz.__voice_table[lang]
    return table[id % table.length];
}

karotz.tts.__REG_ID = new RegExp('id_(\\w+)_(\\d+)');
karotz.tts.__REG_RAND = new RegExp('rand_(.+)');
karotz.tts.start = function(text, lang, callback){
    var rand = karotz.tts.__REG_RAND.exec(lang);
    if(rand){
        var voice = karotz.tts.randVoice(rand[1])
        karotz.__voice[rand[1]][voice](text, voice, callback)
        return
    }
    var id = karotz.tts.__REG_ID.exec(lang);
    if(id){
        log("lang: " + id[1])
        log("id:" + id[2])
        var voice = karotz.tts.voiceId(id[1], parseInt(id[2]))
        karotz.__voice[id[1]][voice](text, voice, callback)
        return
    }

    for (var mainLang in karotz.__voice){
        if(karotz.__voice[mainLang][lang]){
            karotz.__voice[mainLang][lang](text, lang, callback)
            return
        }
    }
}

karotz.__voice = {}

//FR
karotz.__voice["fr"] = {}
//KAGEDO
karotz.__voice["fr"]["narbe"]              =karotz.tts2.start
karotz.__voice["fr"]["mamie"]              =karotz.tts2.start
karotz.__voice["fr"]["jose"]               =karotz.tts2.start
karotz.__voice["fr"]["manuella"]           =karotz.tts2.start
karotz.__voice["fr"]["samy"]               =karotz.tts2.start
karotz.__voice["fr"]["bicool"]             =karotz.tts2.start
karotz.__voice["fr"]["guy_vieux"]          =karotz.tts2.start
karotz.__voice["fr"]["papanoel"]           =karotz.tts2.start
karotz.__voice["fr"]["ramboo"]             =karotz.tts2.start
karotz.__voice["fr"]["sidoo"]              =karotz.tts2.start
karotz.__voice["fr"]["Philippe"]           =karotz.tts2.start
karotz.__voice["fr"]["chuchotement"]       =karotz.tts2.start
karotz.__voice["fr"]["matteo"]             =karotz.tts2.start
karotz.__voice["fr"]["nono"]               =karotz.tts2.start
karotz.__voice["fr"]["helium"]             =karotz.tts2.start
karotz.__voice["fr"]["JulieEnfant"]        =karotz.tts2.start
karotz.__voice["fr"]["grave"]              =karotz.tts2.start
karotz.__voice["fr"]["darkvadoor"]         =karotz.tts2.start
karotz.__voice["fr"]["electra"]            =karotz.tts2.start

karotz.__voice["fr"]['antoine22k']         =karotz.tts3.start
karotz.__voice["fr"]['alice22k']           =karotz.tts3.start
karotz.__voice["fr"]['julie22k']           =karotz.tts3.start
karotz.__voice["fr"]['claire22k']          =karotz.tts3.start
karotz.__voice["fr"]['margaux22k']         =karotz.tts3.start
karotz.__voice["fr"]['bruno22k']           =karotz.tts3.start

karotz.__voice['fr']['fr']                 =karotz.tts.__start

//EN
karotz.__voice["en"] = {}                        
karotz.__voice["en"]['heather22k']         =karotz.tts3.start
karotz.__voice["en"]['kenny22k']           =karotz.tts3.start
karotz.__voice["en"]['laura22k']           =karotz.tts3.start
karotz.__voice["en"]['nelly22k']           =karotz.tts3.start
karotz.__voice["en"]['ryan22k']            =karotz.tts3.start
karotz.__voice["en"]['tracy22k']           =karotz.tts3.start

karotz.__voice['en']['en']                 =karotz.tts.__start

//UK
karotz.__voice["uk"] = {}                        
karotz.__voice["uk"]['graham22k']          =karotz.tts3.start
karotz.__voice["uk"]['lucy22k']            =karotz.tts3.start
karotz.__voice["uk"]['peter22k']           =karotz.tts3.start
karotz.__voice["uk"]['rachel22k']          =karotz.tts3.start


//es
karotz.__voice['es'] = {}
karotz.__voice['es']['antonio22k']         =karotz.tts3.start
karotz.__voice['es']['ines22k']            =karotz.tts3.start
karotz.__voice['es']['maria22k']           =karotz.tts3.start
karotz.__voice['es']['es']                 =karotz.tts.__start

//NL
karotz.__voice['nl'] = {}
karotz.__voice['nl']['femke22k']           =karotz.tts3.start
karotz.__voice['nl']['max22k']             =karotz.tts3.start

karotz.__voice_table ={}
for (var mainLang in karotz.__voice){
    karotz.__voice_table[mainLang] = []
    for (var prop in karotz.__voice[mainLang]){
        if(karotz.__voice[mainLang].hasOwnProperty(prop)){
            karotz.__voice_table[mainLang].push(prop)
        }
    }
}
