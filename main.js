include("util.js");
include("tts2.js");

var karotz_ip="10.104.2.41"

var voice = "narbe"
//var voice = "mamie"
//var voice = "jose"
//var voice = "manuella"
//var voice = "samy"
//var voice = "bicool"
//var voice = "guy_vieux"
//var voice = "papanoel"
//var voice = "ramboo"
//var voice = "sidoo"
//var voice = "Philippe"
//var voice = "chuchotement"
//var voice = "matteo"
//var voice = "nono"
//var voice = "helium"
//var voice = "JulieEnfant"
//var voice = "grave"
//var voice = "darkvadoor"
//var voice = "electra"

var buttonListener = function(event) {
    if (event == "DOUBLE") {
        karotz.tts.stop();
        exit();
    }
    return true;
}

var exitFunction = function(event) {
    if((event == "CANCELLED") || (event == "TERMINATED")) {
        exit();
    }
    return true;
}

var step3 = function(event) {
    if((event == "CANCELLED") || (event == "TERMINATED"))
        karotz.tts2.start("Elle est dégueulasse cette mamie ! Mais bon je crois que tu peux le chercher longtemps ton IPAD...", "bicool", exitFunction);
}

var step2 = function(event) {
    if((event == "CANCELLED") || (event == "TERMINATED"))
        karotz.tts2.start("Franchement, à mon age avec un IPAD, que voulez-vous que j'en fasse... à la limite les oreilles du lapin, je peux toujours en faire quelque chose...", "mamie", step3);
}

var step1 = function(event) {
    if((event == "CANCELLED") || (event == "TERMINATED"))
        karotz.tts2.start("Tu m'acuses ? tu veux que je t'explose ta putain de gueule ? J'ai vu mamie qui trainnait avec hier !", "ramboo", step2);
}

var onKarotzConnect = function(data) {
    karotz.button.addListener(buttonListener);
    karotz.tts2.start("Ziva, tu me traites ou quoi ? C'est pas moi qui ait volé l'IPAD. T'as qu'à demandé à Ramboo! ", "narbe", step1);
}

karotz.connectAndStart(karotz_ip, 9123, onKarotzConnect, {});
