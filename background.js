var titleGenerated2 = Math.random().toString(36).substr(2, Math.round(Math.random()*20+4));
//var titleGenerated2 = "DragonBound - HTML5 Multiplayer Free Online Game";
var manifestData = chrome.runtime.getManifest();
var BOT_ENABLED = false;

function callAjax(url, callback){
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

setTimeout(function(){
	BOT_ENABLED = true;
	go.call(window);
},200);


callAjax(chrome.runtime.getURL("assets/DragonBound.js") +"?" + Date.now(), function(data){
    var curhash = /myhash\s*=\s*(\d+)/g.exec(data), current_hashnum;
    console.log("curhash",curhash);
	if(curhash && (current_hashnum = +curhash[1])){

		callAjax("https://dragonbound.net/static/dragon.appcache" +"?" + Date.now(), function(manifest){
			var scripturl;
			if(scripturl = /js\/[^.]+.js/.exec(manifest)){
				callAjax("https://dragonbound.net/static/"+scripturl[0]+"?" + Date.now(), function(script){
					console.log("len",script.length);
					var hash = /myhash\s*=\s*(\d+)/g.exec(script), hashnum;
					console.log("hash",hash, "https://dragonbound.net/static/" + scripturl[0] + "?" + Date.now());
					if(hash && (hashnum = +hash[1])){
						if(current_hashnum == hashnum){
							BOT_ENABLED = true;
							go.call(window);
							alert("Você pode abrir DragonBound...");
						}else{
							alert("Aimbot desativado por segurança, revisa atualização");
							chrome.management.getSelf(function(extension){
								chrome.management.setEnabled(extension.id, false);
							});
						}
					}
				});
			}
		});

	}
});


chrome.runtime.onMessage.addListener(request => {
	let power = parseFloat(request.tts);

	if(!isNaN(power)){
		const texto = String(power/100).replace(".", " ponto ");

		chrome.tts.speak(texto, {  rate: 1.5, pitch: 0, onEvent: function(event) {}}, function() {});
	}
});

// Créditos: MagicMath
	chrome.declarativeNetRequest.updateDynamicRules({
	  removeRuleIds: [1],
	  addRules: [{
		id: 1,
		priority: 1,
		action: { type: 'modifyHeaders', requestHeaders: [{ header: 'referer', operation: 'set', value: 'https://dragonbound.net/' }] },
		condition: { urlFilter: '*://*.dragonbound.net/*', resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'script'] }
	  }],
	  callback: function() {
		if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
	  }
	});


function go() {

	var titleGenerated = "DragonBound - HTML5 Multiplayer Free Online Game (MagicMath)";
