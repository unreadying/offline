





//basic setup

//the output of all responses
var output = document.getElementById('output');
//the place where the user types
var inarea = document.getElementById('input');
//locale indicates where the user is in the system, 'out' is the default
var locale = ['out'];
//waiting on indicates the user must type an answer to a question they have been posed
var waitingon = '';
//last wait indicates what the last question asked was
var lastwait = '';
var user = false;
var a = null;
var giv = '';
var notecontent = false;
//the default search engine
var se = 'https://www.duckduckgo.com/?kl=us-en&q=';
var scrollpos = 0;
var hi = 0;
var ctally = 0;
var partialtext = ' ';
var cnote = false;
var mob = false;
var lucky = false;
var hideinput = false;
var rememberme = false;
var sync = false;
var takingnote = false;
var hiddeninput = '';
var searchrestrict = 'semi';
var logo = 'block';
var legal = 'block';
var scrollbarvar = 'block';
var gpref = 'random';

//resise input area to fit all user text
document.addEventListener('DOMContentLoaded', size);
//focus in the input area every time a key is pressed
document.addEventListener('keydown',foc);
//just constantly resise the input area
document.getElementById('input').addEventListener('input',size);
//detects whenever the user types
document.getElementById('input').addEventListener('keydown',type);
//scroll function since i dont like default scrollbars
document.addEventListener('wheel',scrol);
//
document.getElementById('sbc').addEventListener('mousemove',scrollbar);
document.getElementById('sbc').addEventListener('click',scrollbar);
document.addEventListener('click',anchorscroll);


//offline special

var msg = 1.0;

if(getlocal('msg')!==1.0){
	output.innerHTML+='punk records is temporarilly offline due to server maintanance . this means you cannot login . if you would like to access any of your data in the meantime , please contact the <a href="mailto:as_united@xerelia.ca">webmaster</a> .'
	setlocal('msg',msg);
}


var allfuns = [];
var cfuns = [];
var searchengines = {
'google':'https://www.google.com/search?q=',
'duckduckgo':'https://www.duckduckgo.com/?kl=us-en&q=',
'youtube':'https://www.youtube.com/results?search_query=',
'wikipedia':'https://en.wikipedia.org/wiki/?search=',
'pinterest':'https://www.pinterest.com/search/pins/?q='
};
var seshortcuts = {
	'g':'https://www.google.com/search?q=',
	'd':'https://www.duckduckgo.com/?kl=us-en&q=',
	'y':'https://www.youtube.com/results?search_query=',
	'w':'https://en.wikipedia.org/wiki/?search=',
	'p':'https://www.pinterest.com/search/pins/?q='
}
var bookmarks = {

}
var ctheme = {
	
}
var ntheme = {
	
}
var dtheme = {
	
}
var themes = {
	
}
var tempers = [

];
var manpers = [

];
var runonstarts = [
	
];
var inputhistory = [''];


//function declarations by locale

//special
allfuns.push({'call':'help','fun':null,'help':null,'loc':'out','depth':null,'goesto':null});

//out

allfuns.push({'call':'/s','fun':'anonsettings','help':'change settings','loc':'out','depth':0,'goesto':'anonset'});
allfuns.push({'call':'/b','fun':'bookmark','help':'manage bookmarks','loc':'out','depth':0,'goesto':'bookmarks'});
allfuns.push({'call':'anything else','fun':'fallback','help':'search the web','loc':'out','depth':null,'goesto':null});

//anonymous settings
allfuns.push({'call':'engine','fun':'searchengine','help':'change default search engine','loc':'anonset','depth':1,'goesto':null});
allfuns.push({'call':'theme','fun':'theme','help':'customize this page','loc':'anonset','depth':1,'goesto':'theme'});
allfuns.push({'call':'onstart','fun':'runonstart','help':'configure commands to run on startup','loc':'anonset','depth':1,'goesto':'runonstart'});
allfuns.push({'call':'layout','fun':'layout','help':'customize the layout of this page','loc':'anonset','depth':1,'goesto':'layout'});

//bookmarks
allfuns.push({'call':'add','fun':'bookmarkadd','help':'add a bookmark','loc':'bookmarks','depth':1,'goesto':null});
allfuns.push({'call':'delete','fun':'bookmarkdelete','help':'delete a bookmark','loc':'bookmarks','depth':1,'goesto':null});
allfuns.push({'call':'list','fun':'bookmarklist','help':'list all active bookmarks','loc':'bookmarks','depth':1,'goesto':null});
allfuns.push({'call':'group','fun':'bookmarkgroup','help':'organize bookmarks into groups','loc':'bookmarks','depth':1,'goesto':null});

//theme
allfuns.push({'call':'color','fun':'themecolor','help':'change the text color','loc':'theme','depth':2,'goesto':null});
allfuns.push({'call':'background','fun':'themebackground','help':'set the background color or image','loc':'theme','depth':2,'goesto':null});
allfuns.push({'call':'font','fun':'themefont','help':'change the font','loc':'theme','depth':2,'goesto':null});
allfuns.push({'call':'save','fun':'themesave','help':'save the current theme to memory','loc':'theme','depth':2,'goesto':null});
allfuns.push({'call':'list','fun':'themelist','help':'list all saved themes','loc':'theme','depth':2,'goesto':null});
allfuns.push({'call':'load','fun':'themeload','help':'load a theme from memory','loc':'theme','depth':2,'goesto':null});
allfuns.push({'call':'delete','fun':'themedelete','help':'delete a theme from memory','loc':'theme','depth':2,'goesto':null});

//onstart
allfuns.push({'call':'add','fun':'runonstartadd','help':'set a command to run on startup','loc':'runonstart','depth':2,'goesto':null});
allfuns.push({'call':'delete','fun':'runonstartdelete','help':'stop a command from running on startup','loc':'runonstart','depth':2,'goesto':null});
allfuns.push({'call':'list','fun':'runonstartlist','help':'list the commands that will run on startup','loc':'runonstart','depth':2,'goesto':null});

//layout
allfuns.push({'call':'logo','fun':'logotog','help':'toggle visibility of the punk records logo','loc':'layout','depth':2,'goesto':null});
allfuns.push({'call':'copyright','fun':'cwtog','help':'toggle visibility of the punk records © 2025 text','loc':'layout','depth':2,'goesto':null});
allfuns.push({'call':'scrollbar','fun':'sbtog','help':'toggle visibility of the scrollbar →','loc':'layout','depth':2,'goesto':null});
allfuns.push({'call':'greeting','fun':'wmpref','help':'change the default greeting','loc':'layout','depth':2,'goesto':null});

//settings
allfuns.push({'call':'engine','fun':'searchengine','help':'change default search engine','loc':'settings','depth':1,'goesto':null});
allfuns.push({'call':'theme','fun':'theme','help':'customize this page','loc':'settings','depth':1,'goesto':'theme'});
allfuns.push({'call':'onstart','fun':'runonstart','help':'configure commands to run on startup','loc':'settings','depth':1,'goesto':'runonstart'});
allfuns.push({'call':'layout','fun':'layout','help':'customize the layout of this page','loc':'settings','depth':1,'goesto':'layout'});

//null
allfuns.push({'call':null,'fun':'themeoverwrite','help':'say yes or no to overwriting','loc':'void','depth':null,'goesto':null});
allfuns.push({'call':null,'fun':'findnote','help':'choosing a note','loc':'void','depth':null,'goesto':null});

//push input to output
async function interpret(){
	ctally++;
	//grab the value typed by the user and put in a string called iv
	giv = inarea.value;
	//in the case the input is hidden , grab the secret value instead
	if(hideinput==true){
	giv=hiddeninput;
	}
	//then turn off hidden text for future
	hideinput=false;
	//add iv to the list of command run this session (inputhistory)
	inputhistory.push(giv);
	//then set the counter to the length of inputhistory (see nexthistory() or prevhistory() to understand why)
	hi=inputhistory.length;
	//now split the input up into its parts
	var iva = giv.split(' ');
	var say = '';

	//if there was only one word typed
	if(!iva[1]||iva[1].trim('')==''){
		//check if that word was exit or help
	if(/^help/i.test(iva[0]) && waitingon!=='runonstartadd'){
		say = help();
	}else if(/^exit/i.test(iva[0])){
		say = exit();
	}
	}
	
	
	if(say==''){
	//if not , then check if it was a command and that nothing is being waited for 
	if(waitingon==''){
		tempers=[];
		if(check(iva[0])&&!lucky){
			say = run(iva[0],iva[1],iva[2],iva[3],iva[4]);
		//if not then sent the input to the fallback function
	}else{
		say = fallback(giv);
	}
	//but if there is something being waited for ie. an expected response 
	}else{
		//store the waiting on value in lastwait
		lastwait=waitingon;
		waitingon='';
		//push input to a new array called tempers (temporary errays)
		for(i=0;i<iva.length;i++){

		tempers.push(iva[i]);
		}
		//then run the waited command with the perameters given
		say = window[lastwait](tempers[0],tempers[1],tempers[2]);
	}
	}

	
	//set the output to = the input
	output.innerHTML+='<p>'+inarea.value+'</p>';
	//remove the input
	inarea.value='';
	//put say into a variable called res (resolved) so that it can be resolved if its a promise
	var res = await Promise.resolve(say);
	//put the response in output also
	output.innerHTML+= '<p><span style="width:inherit">'+res+'</span></p>';
	//then scroll down if the bottom of the page has been reached
	tobottom();
	//and scroll again after async operations
	requestAnimationFrame(tobottom);
	hiddeninput='';
}

//a function to run functions from a click rather than a text input
async function mockinterpret(f,p1,p2,p3,p4){
	ctally++;
	hideinput=false;

	waitingon='';
	var say = '';
	var fundata = allfuns[getfunbyname(f)];
	f = fundata.call;
	say = run(f,p1,p2,p3,p4);
	var res = await Promise.resolve(say);
	output.innerHTML+='<p>'+fundata.help+'</p>';
	output.innerHTML+='<p>'+res+'</p>';
	tobottom();
	requestAnimationFrame(tobottom);
	hiddeninput='';
}

//a function to run functions that are not neccesarily in the allfunctions list
async function funinterpret(f,p1,p2,p3,p4){
	ctally++;
	hideinput=false;
	waitingon='';
	var say = '';
	say = window[f](p1,p2,p3,p4);
	var res = await Promise.resolve(say);
	output.innerHTML+='<p>'+res+'</p>';
	wtobottom();
	requestAnimationFrame(tobottom);
	hiddeninput='';
}

//a function to force regular interpret of any text
async function forceint(v){
inarea.value=v;
interpret();
}

//functions

//run function
function run(inputcall,p1,p2,p3,p4){
	var fun = {};
	//check through all currently available functions
	for(i=0;i<cfuns.length;i++){
		//if one function call matches the called function
		var cfuni = regex(cfuns[i].call);
		if(cfuni.test(inputcall)){
			//save it
			fun = cfuns[i];
			//if it specifies a locale and there are no perameters
			if(fun.goesto && !p1){
			//navigate to its locale
			while(fun.depth<locale.length-1){
				init('exit');
			}
				init(fun.goesto);
			}

			//return
			return window[fun.fun](p1,p2,p3,p4);
		}
	}
	return inputcall + ' is not a currently available function';
}

//check function
function check(inputcall){
	for(i=0;i<cfuns.length;i++){
		//if one function call matches the called function
		var cfuni = regex(cfuns[i].call);
		if(cfuni.test(inputcall)){
			//its true
			return true;
		}
	}
}

//help function (special function)
function help(l){
	var say = 'you are currently in the ' + saylocale() + ' menu<br><br>';
	if(l || waitingon!==''){
		say = '';
	}
	//check if waiting on something
	if(waitingon==''){
		//if not then loop through current functions
		for(i=0;i<cfuns.length;i++){
			//and output them
			if(cfuns[i].help && cfuns[i].depth>=0){
			if(!l){
			say+='<a onclick="mockinterpret(\'' +cfuns[i].fun+ '\')">type '+cfuns[i].call+' to '+cfuns[i].help+'</a><br>';
			}else if(cfuns[i].loc==l){
				say+='<a onclick="mockinterpret(\'' +cfuns[i].fun+ '\')">type '+cfuns[i].call+' to '+cfuns[i].help+'</a><br>';
			}
			}
		}
	}else{
		//if waiting then say that
		
		say+='waiting for you to enter a '+allfuns[getfunbyname(waitingon)].help+'';
	}
	return say;
}

//fallback function (special function)
//this is a search function for not logged in users and a help function for logged in users
function fallback(iv){
	var say ='';
	//if not logged in
	if(locale[0]=='out'){
		return search(se,iv);
		
	}else if(locale[1]=='notes'){
		return findnote(iv);
	}
	
	else if(!locale[1]&&searchrestrict=='semi'){
		return search(se,iv);
	}else{
		return "hmmm , you can type help for a list of commands";
}
}

//exit function (special function)
function exit(){
	say = '';
	if(waitingon!==''){
		say = 'canceled ' + allfuns[getfunbyname(waitingon)].help;
		waitingon='';
		manpers=[];
		return say;
	}else if(locale.length>1){
		init('exit');
		return 'you are now in the ' +saylocale()+ ' menu';
	}else{
		if(locale[0]=='in'){
		waitingon='yornlogout';
		return 'log out?'
		}else{
		return 'you cannot go back any further';
		}
	}
}

//master web search function
async function search(engine,terms){
	
	if(terms==undefined || terms.trim()==''){
		return 'what would you like to search for ?'
	}

	//create variable for output
	var say = '';
	//variable for clean unencoded search
	var clean = terms.split(',');
	//split search variables by commas
	terms=terms.split(',');

	//loop over the seach terms
		for(i=0;i<terms.length;i++){
			var temp = '';
			var enginedec = false;
			//clean up spaces
			terms[i]=terms[i].trim();
			clean[i]=clean[i].trim();
				//check if the first work of the search is a search engine shortcut
				if(seshortcuts[terms[i].split(' ')[0]]!==undefined){
					//set engine to the first character of the search
					engine = seshortcuts[terms[i].split(' ')[0]];
					enginedec = true;
					//if there are no additional characters after the engine declaration
					if(terms[i].split(' ')[1]==undefined){
						terms[i]='';
						//go to the engine homepage
						engine='https://'+engine.split('/')[2];
						enginedec = false;
						clean[i] = 'the '+engine.split('.')[1]+ ' homepage'; 
					}else{
					//remove the first character of the search
					terms[i] = terms[i].substring(1);
					clean[i] = clean[i].substring(1);
					terms[i]=terms[i].trim();
					clean[i]=clean[i].trim();
					}
				}else{engine=se};
				if(bookmarks[terms[i]]!==undefined){
					engine = '';
					var group = bookmarks[terms[i]].split(' ');
					if(group[1]){
					terms[i] = group[0];	
					}else{
					terms[i] = bookmarks[terms[i]];
					}
				}
				if(islink(terms[i])){
					if(terms[i].split('p')[0]!=='htt'){
						engine = 'http://'
					}
					else{
						engine=''
					}
				}
				if(lucky==true){
					engine=seshortcuts['d'];
					engine+='\\';
					
				}

			//encode search
			terms[i]=encodeURI(terms[i]);
			//logic for human output
			if(lucky==true){
				terms[i]+='&ia=web';
				say+='making a lucky search for ';
			}else if(enginedec==true && i==0){
				say+='searching ' + engine.split('.')[1] + ' for '
			}else if(i==0){
				say+='searching for ';
			}
			//creat a dom element and click on it
			a = document.createElement('a');
			a.href=(engine+terms[i]);
			a.target='_blank';
			document.body.appendChild(a);
			a.click();
			if(i!==0 && enginedec==true && temp == ''){
				temp = engine.split('.')[1] + ' for '; 
			}
			say+=temp+"<a href='"+engine+terms[i]+"' target='_blank' id="+terms[i]+">"+clean[i]+"</a>";
			if(terms[i+2]!==undefined){
				say+=' , '
			}else if(terms[i+1]!==undefined){
				say+=' and '
			}
		}
	return say;
}



async function loadprefs(){
	loadtheme();
	var temp = await get('gpref');
	if(temp){
	gpref=temp;	
	}
	var temp = await get('legal');
	if(temp){
	legal=temp;
	}
	temp = await get('hq');
	if(temp){
	logo=temp;
	}
	temp = await get('scrollbarvar');
	if(temp){
	scrollbarvar=temp;
	}
	layoutload();
	loadbookmarks();
	loadengine();

}



//function to enter the anonymous settings menu
function anonsettings(){
	return '↓ here is a list of the current settings you can modify ↓<br>'+help('anonset');
}

//function to enter the settings menu
function settings(){
	return 'welcome to settings';
}

//change search engine
function searchengine(s){
	var say = '';
	if(!s){
	waitingon='searchengine';
	say+= 'please select one of the following search engines <br>'
	var senames = Object.keys(searchengines);
	for(i=0;i<senames.length;i++){
	say+='<a onclick="mockinterpret(\'searchengine\',\''+senames[i]+'\')">'+senames[i]+'</a><br>';	
	}
	return say;

	}else{
	if(searchengines[s]){
	se = searchengines[s];
	set('se',se);
	return 'default search engine set to '+s+' ( you can always use other engines by prepending search terms with the first letter of the engine )';
	}else{
	return 'unknown engine , email me at webmaster@xerelia.ca to get it added';
	}
}
}

//replace default engine with user preference
async function loadengine(){
	var temp = await get('se')
	if(typeof temp=='string'){
	se=temp;
	}
}

//enter bookmarks menu or list or add bookmarks
function bookmark(b,l){
	if(!b && !l){
		return 'welcome to the bookmarks menu , here you can ... <br>' + help('bookmarks');
	}
	if(!l){
		if(b=='list'){
		return bookmarklist();
		}
	var saya = Object.entries(bookmarks);
	var keya = Object.keys(bookmarks);
	var adresses = '';
	for(i=0;i<saya.length;i++){
		var temp = saya[i][1].split(' ');
		console.log('looks like '+b+' is search , and '+temp[1]+' is the current result');
		if(temp[1]==b){
		if(adresses!==''){adresses+=' , '}
		console.log(temp[1]+' is group , adding '+temp[0]+' to search');
		adresses+=keya[i];
		}
	}
		if(adresses!==''){
		return search(se,adresses);
		}
		waitingon='bookmark'
		return 'enter the link you want the bookmark to represent'
	}
	bookmarks[b]=l;
	set('bookmarks',bookmarks);
	return '<a href="'+l+'">'+b+'</a> added to bookmarks'
}

//add bookmark the slow way
function bookmarkadd(b,l){
	if(!b && !l){
		waitingon='bookmarkadd'
		return 'enter a name for the bookmark'
	}
	if(!l){
		waitingon='bookmarkadd'
		return 'enter the link you want the bookmark to represent'
	}
	bookmarks[b]=l;
	set('bookmarks',bookmarks);
	return '<a href="'+l+'">'+b+'</a> added to bookmarks'
	
}

//delete a bookmark (the only way)
function bookmarkdelete(b){
	if(!b){
		waitingon='bookmarkdelete';
		return 'enter the name of the bookmark you would like to delete'
	}
	if(bookmarks[b]){
		delete bookmarks[b];
		set('bookmarks',bookmarks);
		return 'bookmark ' + b + ' deleted'
	}
	return b + ' is not a current bookmark , type list to view active bookmarks '
}

//list all bookmarks
function bookmarklist(){
	var groups = {};
	var say = '';
	var sayend = '';
	var saya = Object.entries(bookmarks);
	for(i=0;i<saya.length;i++){
		var temp = saya[i][1].split(' ');
		if(temp[1]){
		if(groups[temp[1]]){
		groups[temp[1]]+=temp[0];
		}else{
		sayend+='<a id="'+temp[1]+'leader" onclick="expandgroup(\''+temp[1]+'\')"><u>'+temp[1]+'</u></a><span id="'+temp[1]+'group"></span><br>';
		groups[temp[1]]+=temp[0];
		}
		}else{
		say+='<a target="_blank" href="'+saya[i][1]+'">'+saya[i][0]+'</a> ☼ '+saya[i][1] + '<br>';
		}
	}
	return say+sayend;
}

function expandgroup(g){
	var group = document.getElementById(g+'group');
	var leader = document.getElementById(g+'leader');
	if(group.innerHTML==''){
		leader.style.opacity='0.5';
	var say = '';
	var saya = Object.entries(bookmarks);
	for(i=0;i<saya.length;i++){
		var temp = saya[i][1].split(' ');
		if(temp[1]){
		if(temp[1]==g){
		say+='<br><a target="_blank" href="'+temp[0]+'">'+saya[i][0]+'</a> ☼ '+temp[0] + '';
		}
		}
	}
	group.innerHTML=say;
	return;
	}else{
	group.innerHTML='';
	leader.style.opacity='1';
	return;
	}
}

function bookmarkgroup(n,b){
	var say = '';
	var sayend = [];
	var saystart = [];
	if(!n){
		waitingon='bookmarkgroup';
		return 'enter a name for the group';
	}else if(!b){
	waitingon='bookmarkgroup';
	return 'enter the names of the bookmarks you want to group';
	}
	for(i=1;i<tempers.length;i++){
		if(bookmarks[tempers[i].trim('')]){
		bookmarks[tempers[i].trim('')]=bookmarks[tempers[i].trim('')]+' '+tempers[0].trim('');
		saystart.push([tempers[i].trim('')]);
		}else{
		sayend.push(tempers[i].trim(''));
		}
	}
	if(!isempty(saystart)){
		say+= 'succesfully added ';
	say += hrarray(saystart);
		say+= ' to bookmark group '+tempers[0].trim('');
	}
	if(!isempty(saystart)&&!isempty(sayend)){
		say+='<br><br>';
	}
	if(!isempty(sayend)){
	say += hrarray(sayend)
	say += ' were not added because they are not bookmarks yet , type list to see available bookmarks';
	
}
set('bookmarks',bookmarks);
return say;
}

//send user bookmarks the bookmarks variable
async function loadbookmarks(){
	var temp = await get('bookmarks');
	if(temp){
	bookmarks=temp;
	}
}

async function note(n,c){

	return user+'\'s notebook<br>'+await notelist();	
	
}

async function findnote(n){
	n = giv;
	var say = '';

	var niq = await getnote(n);
	
	if(typeof niq.content == 'string' ||!niq){
		if(/%&/i.test(n) && !niq){
		return 'sorry , but note titles cannot contain "%&" :| use litterally anything else';
		}
		cnote=n;
		if(!niq){
		noteadd(n);
		return '';
		}
		init(niq.locale+niq.name);
		if(niq.locale.split('%&').length!==locale.length&&n!==locale[locale.length-1]){
		var temp = await notelist(n);	
		}else{
		var temp = await notelist();
		}
		if(temp&&temp!=='no notes in this directory'){
		console.log('we got notes');
		say+='<br>'+temp;
		}
		return 'entered <b>'+niq.locale.replace(/^in%&/, '').replace(/%&/g, '→')+niq.name+'</b><br><br>'+ niq.content +say;
	}else{
	waitingon='findnote';
	return multinote(n);
	}
}

async function noteadd(n,l){

	if(!n){
		waitingon='noteadd';
	return 'enter the note\'s name'	
	}
	
	n = giv;
	if(l){
	var niq = await getnote(n,l);
	}else{
	var niq = await getnote(n);	
	}
	if(typeof niq.content == 'string' ||!niq){

		if(/%&/i.test(n) || /^-r/i.test(n) || /^list/i.test(n)){
		return 'sorry , but note titles cannot contain "%&" or be '+n+' :| try something else';
		}
		cnote=n;
		notemode();
		if(niq){
			 input.value=niq.content;
			 size();
		}
		return '';
	}
	waitingon='noteadd';
	return multinote(n);
	}



function getlocale(n){
		var l='';
		
		if(/%&/.test(n)){
			if(!/^in%&notes%&/.test(n)){
			l='in%&notes'
			}else{
				l=''
			}
		}else{
		for(i=0;i<locale.length-1;i++){
		l+=locale[i];
		l+='%&';
		}
		}
		return l;
}

//enter theme menu or set theme
function theme(bg,fg){
	if(!bg && !fg){
		return help('theme');
	}else if(bg && fg){
		ctheme.bg=bg,ctheme.fg=fg;
		set('theme',ctheme);
		loadtheme();
		if(ctheme.bg.split('/')[0]=='https:' || ctheme.bg.split('/')[0]=='http:'){
		return 'set theme to ' + ctheme.fg + ' on <a href = "' + ctheme.bg + '">' +ctheme.bg+ '</a>';
		}else{
		return 'set theme to ' + ctheme.fg + ' on ' +ctheme.bg;
		}
	}
	
}

//set text color
function themecolor(m,l,i){
	var say = '';
	if(!m){
		waitingon='themecolor';
		return 'input a color for the text';
	}else{

		if(m!=="''" && m!=="’’"){
		ctheme.fg=m;
		}
		say += 'set text color to ' + ctheme.fg;
		if(l){
		if(l!=="''" && l!=="’’"){
		ctheme.lc=l;
		}
		say+=' , set link color to ' + ctheme.lc;
		}
		if(i){
		if(i!=="''" && i!=="’’"){
		ctheme.ic=i;
		}
		say+=' , set input color to ' + ctheme.ic; 
		}
					if(!ctheme.font){
				ctheme.font='courier'
			}
			if(!ctheme.bg){
				ctheme.bg='black'
			}
			if(!ctheme.fg){
				ctheme.fg='white'
			}
			if(!ctheme.mbm){
				ctheme.mbm='normal'
			}
			if(!ctheme.w){
				ctheme.w='normal'
			}
			if(!ctheme.lc){
				ctheme.lc='auto'
			}
			if(!ctheme.ic){
				ctheme.ic=='inherit'
			}
			if(!ctheme.bgc){
				ctheme.bgc=document.body.style.backgroundColor;
			if(!ctheme.bgc){
			ctheme.bgc='black';
				}
			}
		loadtheme();
		return say;
		}
	}	

//set background
function themebackground(bg,size1,size2,pos1,pos2){
	var say = ''
	if(!bg){
		waitingon='themebackground';
		return 'input a color or image link for the background';
	}else{
		if(bg!=="''" && bg!=="’’"){
		ctheme.bg=bg;
		ctheme.bgc=document.body.style.backgroundColor;
		if(!ctheme.bgc){
			ctheme.bgc='black';
		}
		}
		loadtheme();
		if(ctheme.bg.split('/')[0]=='https:' || ctheme.bg.split('/')[0]=='http:'){
			say+='set background to <a href = "' + ctheme.bg + '">' +ctheme.bg+ '</a>';
		if(size1){
		if(size1!=="''" && size1!=="’’"){
			if(size2&&size2!=="''"&&size2!=="’’"){
				size1=size1+' '+size2;
			}
		ctheme.size=size1;
		}
		say+=' set picture size setting to ' +ctheme.size;
		}
		if(pos1){
		if(pos1!=="''" && pos1!=="’’"){
			if(pos2&&pos2!=="''"&&pos2!=="’’"){
				pos1=''+pos1+' '+pos2+'';	
			}
		ctheme.pos=''+pos1+'';
		}
		say+=' set background position to ' +ctheme.pos;
		}
		
					if(!ctheme.font){
				ctheme.font='courier'
			}
			if(!ctheme.bg){
				ctheme.bg='black'
			}
			if(!ctheme.fg){
				ctheme.fg='white'
			}
			if(!ctheme.mbm){
				ctheme.mbm='normal'
			}
			if(!ctheme.w){
				ctheme.w='normal'
			}
			if(!ctheme.lc){
				ctheme.lc='auto'
			}
			if(!ctheme.ic){
				ctheme.ic=='inherit'
			}
			if(!ctheme.bgc){
				ctheme.bgc=document.body.style.backgroundColor;
			if(!ctheme.bgc){
			ctheme.bgc='black';
				}
			}
		
		loadtheme();
		return say; 
		}else{
		return 'set background to ' +ctheme.bg;
		}
	}
	}

//set font
function themefont(f,w,ls,mbm){
	var say = '';
	if(!f){
		waitingon='themefont';
		return 'select a font <br>'+
		'<a style="font-family:\'courier\' " onclick="mockinterpret(\'themefont\',\'courier\')">courier</a><br>' +
		'<a style="font-family:\'arial\' " onclick="mockinterpret(\'themefont\',\'arial\')">arial</a><br>' +
		'<a style="font-family:\'times\' " onclick="mockinterpret(\'themefont\',\'times\')">times</a><br>' +
		'or type the name of a font available to you'; 
	}else{
		if(f!=="''" && f!=="’’"){
		ctheme.font=f
		}
		if(w){
		if(w!=="''" && w!=="’’"){
		ctheme.w=w;
		}
		say+=' set font weight to ' +ctheme.w;
		}
		if(mbm){
		if(mbm!=="''" && mbm!=="’’"){
		ctheme.mbm=mbm;
		}
		say+= ' set blending mode to ' +ctheme.mbm;
		}
		if(ls){
		if(ls!=="''" && ls!=="’’"){
		ctheme.ls=ls;
		}
		say+= ' set leading to ' +ctheme.ls;
		}
		
					if(!ctheme.font){
				ctheme.font='courier'
			}
			if(!ctheme.bg){
				ctheme.bg='black'
			}
			if(!ctheme.fg){
				ctheme.fg='white'
			}
			if(!ctheme.mbm){
				ctheme.mbm='normal'
			}
			if(!ctheme.w){
				ctheme.w='normal'
			}
			if(!ctheme.lc){
				ctheme.lc='auto'
			}
			if(!ctheme.ic){
				ctheme.ic=='inherit'
			}
			if(!ctheme.bgc){
				ctheme.bgc=document.body.style.backgroundColor;
			if(!ctheme.bgc){
			ctheme.bgc='black';
				}
			}
		
		loadtheme();
		return 'set font to what you see here , should be '+ctheme['font']+say;
		}
	}

//save theme to system
async function themesave(n){
	if(!n){
		waitingon='themesave';
		return 'please enter a name for this theme'
	}else{
		if(!themes[n]){
			if(!ctheme.font){
				ctheme.font='courier'
			}
			if(!ctheme.bg){
				ctheme.bg='black'
			}
			if(!ctheme.fg){
				ctheme.fg='white'
			}
			if(!ctheme.mbm){
				ctheme.mbm='normal'
			}
			if(!ctheme.ls){
				ctheme.ls='normal'
			}
			if(!ctheme.w){
				ctheme.w='normal'
			}
			if(!ctheme.lc){
				ctheme.lc='auto'
			}
			if(!ctheme.ic){
				ctheme.ic=='inherit'
			}
			if(!ctheme.bgc){
				ctheme.bgc=document.body.style.backgroundColor;
			if(!ctheme.bgc){
			ctheme.bgc='black';
				}
			}
			console.log('THEMES IS ',themes);
			themes[n]=ctheme;
			console.log('THEMES IS ',themes);
			console.log('SAVING THEME ',n,themes[n],' TO CREATE A THEMES LIST OF ',themes);
			set('themes',themes);
			return 'theme ' +n+ ' saved';
		}
		waitingon = 'themeoverwrite';
		return n + ' is already a theme , overwrite ?'
	}
}

//ask if you want to overwrite the theme
function themeoverwrite(n,a){
	if(!a){
	waitingon = 'themeoverwrite';
	return 'yes or no'
	}

	if(/^y/i.test(a.substring(0,1))){
		if(!ctheme.font){
				ctheme.font='courier'
			}
			if(!ctheme.bg){
				ctheme.bg='black'
			}
			if(!ctheme.fg){
				ctheme.fg='white'
			}
			if(!ctheme.mbm){
				ctheme.mbm='normal'
			}
			if(!ctheme.ls){
				ctheme.ls='normal'
			}
			if(!ctheme.w){
				ctheme.w='normal'
			}
			if(!ctheme.lc){
				ctheme.lc='auto'
			}
			if(!ctheme.ic){
				ctheme.ic=='inherit'
			}
			if(!ctheme.bgc){

				ctheme.bgc=document.body.style.backgroundColor;
			if(!ctheme.bgc){
			ctheme.bgc='black';
				}
			}
			themes[n]=ctheme;
			console.log('SAVING THEME ',n,themes[n],' TO CREATE A THEMES LIST OF ',themes);
			set('themes',themes);
		return 'updated ' +n;
	}
}

//delete a theme
function themedelete(n){
		if(!n){
		waitingon='themedelete';
		return 'enter the name of the theme you would like to delete';
	}
	else{
		if(!themes[n]){
			return n+' is not a theme , type list to view saved themes';
		}
		delete themes[n];
		set('themes',themes);
		return n+ ' deleted';
	}
	
}

async function themeauto(time,theme){
	if(!time){
	waitingon='themeauto';
	return 'would you like to set the theme for day or night ? or type reset to remove auto themes';
	}else if(!theme){
		
	if(/^r/i.test(time)){
	set('dtheme',false);
	set('ntheme',false);
	}
	
	waitingon='themeauto';
	return 'enter the name of the theme you want to use at '+time;
	}else{
	if(themes[theme]){
			if(!themes[theme].ls){
				ctheme.ls='normal';	
			}
	if(/^d/i.test(time)){
	dtheme=themes[theme]	
	set('dtheme',dtheme);	
	}else if(/^n/i.test(time)){
	ntheme=themes[theme]	
	set('ntheme',ntheme);	
	}else{
	return time+' is not valid';	
	}
	loadtheme();
	return 'theme ' + theme + ' set to activate at '+time;
	}
	else{ return theme + ' is not a saved theme , type list to see your saved themes'}
	}
}

//load a theme the by name
function themeload(n){
	if(!n){
		waitingon='themeload';
		return 'enter the name of the theme you would like to load';
	}
	if(themes[n]){
	if(!themes[n].ls){
	ctheme.ls='normal';	
	}
	ctheme=themes[n];
	loadtheme();
	return 'theme ' + n + ' loaded';
	}
	else{ return n + ' is not a saved theme , type list to see your saved themes'}
	
}

//create a clickable list of themes
function themelist(){
	var say = ''
	var saya = Object.keys(themes);

	for(i=0;i<saya.length;i++){
		say+='<a style="'
		if(themes[saya[i]].fg){
			say+='color:'+themes[saya[i]].fg+';';
		}
		if(themes[saya[i]].bg){
			if(themes[saya[i]].bg.split('/')[0]=='https:' || themes[saya[i]].bg.split('/')[0]=='http:'){
				say+='background-image:url('+themes[saya[i]].bg+');';
			say+='background-color:'+themes[saya[i]].bgc+';';
			}else{
			say+='background-color:'+themes[saya[i]].bg+';';
		}
		}
		if(themes[saya[i]].font){
			say+='font-family:'+themes[saya[i]].font+';';
		}
		if(themes[saya[i]].ls){
			say+='letter-spacing:'+themes[saya[i]].ls+';';	
		}else{
			say+='letter-spacing:normal;';
		}
		say+='width:fit-content;background-size:cover" onclick = "themeload(\''+saya[i]+'\')">'+saya[i]+'</a><br>';
}
if(saya.length==0){
	say+='no themes saved'
}else{
	say+='<br>↑ click on a theme to enable it';
}
	return say;	
}

//configure the site to look like the users theme
async function loadtheme(){


	
	var temp = await get('themes');
	if(Array.isArray(temp)){
	set('themes',{});
	}
	if(temp){
	themes=temp;
	}
	if(gettime().greeting=='night'||gettime().greeting=='evening'){
	temp = await get('ntheme');
	console.log('checking for night theme and found '+temp);
	}else{
	temp = await get('dtheme');
	console.log('checking for day theme and found '+temp);
	}
	if(temp){
	ctheme=temp;
	console.log('since it is '+ gettime().greeting +' setting theme to '+temp);
	}else{
	temp = await get('theme');
	if(sync&&temp!==getlocal('theme')){
	setlocal('theme',temp);
	}
	if(isempty(ctheme)&&temp){
	ctheme=temp;
	}else{
	await set('theme',ctheme);
	}
	};	

	if(ctheme.bg){
		if(ctheme.bg.split('/')[0]=='https:' || ctheme.bg.split('/')[0]=='http:'){
			document.body.style.backgroundImage = 'url('+ctheme.bg+')';
			document.getElementById('scrollbar').style.backgroundColor = ctheme.fg;
			document.getElementById('scrollbar').style.opacity='.3';
			document.getElementById('scrollslot').style.opacity='0';
			if(ctheme.bgc){
			document.body.style.backgroundColor = ctheme.bgc;
			}			

		}else{
			document.body.style.backgroundImage = 'none';
			document.body.style.backgroundColor = ctheme.bg;
			document.getElementById('scrollslot').style.opacity='1';
			document.getElementById('scrollbar').style.opacity='1'
			document.getElementById('scrollbar').style.backgroundColor=ctheme.bg;
		}
	}
	if(ctheme.size){
		document.body.style.backgroundSize = ctheme.size;
	}else{
		document.body.style.backgroundSize = 'contain';
	}
	
	if(ctheme.pos){
		document.body.style.backgroundPosition = ctheme.pos;
	}else{
		document.body.style.backgroundPosition = '0% 0%';
	}
	
	if(ctheme.mbm){
		document.body.style.mixBlendMode = ctheme.mbm;
	}else{
		document.body.style.mixBlendMode = 'normal';
	}
	
	if(ctheme.ls){
		document.getElementById('output').style.letterSpacing = ctheme.ls;
		document.getElementById('input').style.letterSpacing = ctheme.ls;
	}else{
		document.getElementById('output').style.letterSpacing = 'normal';
		document.getElementById('input').style.letterSpacing = 'normal';
	}
	if(ctheme.fg){
		document.body.style.color = ctheme.fg;
		document.getElementById('hq').style.stroke=ctheme.fg;
		document.getElementById('scrollslot').style.backgroundColor=ctheme.fg;
	}
	if(ctheme.lc){
		document.documentElement.style.setProperty('--lc', ctheme.lc);
	}else{
		document.documentElement.style.setProperty('--lc', ctheme.fg);
	}
	if(ctheme.ic){
		document.documentElement.style.setProperty('--ic', ctheme.ic);
	}else{
		document.documentElement.style.setProperty('--ic', 'inherit');	
	}
	if(ctheme.font){
		document.getElementById('output').style.fontFamily = ctheme.font;
		document.getElementById('input').style.fontFamily = ctheme.font;
	}
	if(ctheme.w){
		document.getElementById('output').style.fontWeight = ctheme.w;
		document.getElementById('input').style.fontWeight = ctheme.w;
	}
	else{
		document.getElementById('output').style.fontWeight = 'normal';
		document.getElementById('input').style.fontWeight = 'normal';
	}


	}

//enter the runonstart menu
function runonstart(c){
	
	if(c=='list'){
		return runonstartlist();
	}
	
	return 'welcome to the startup commands control center , here you can ...<br>'+help('runonstart');
	
}

//set a function to run whenever the user opens the site 
function runonstartadd(c,p1,p2,p3){
	if(!c){
		waitingon = 'runonstartadd'
		return 'enter the command to run on start , including any perameters'
	}
	var rsi;


	var cpp = c;
	if(p1){
		cpp+=' '+p1;
	}
	if(p2){
		cpp+=' '+p2;
	}
	if(p3){
		cpp+=' '+p3;
	}
	if(locale[0]=='out'){
	for(i=0;i<allfuns.length;i++){
		if(allfuns[i].loc=='out' && allfuns[i].call==c){
			runonstarts.push(cpp);
			set('runonstarts',runonstarts);
			return 'set '+c+' to run on startup , you can refresh the page to see if it worked'
		}else{
				return 'you need to be logged in to set that command'
			}
		}
	}else{
	runonstarts.push(cpp);
	set('runonstarts',runonstarts);
	return 'i hope you know what you are doing , '+c+' will be triggered on startup';
		
	}
	if(c=='help'){
		runonstarts.push('help');
		set('runonstarts',runonstarts);
		return 'i will help you on startup';
	}
	return 'error , '+c+' is not a valid command , only main menu commands are supported . see the <a href="documentation.html">documentation</a> for more info';
}

//delete a function from the runonstart list
function runonstartdelete(c){
	say = '';
	if(!c){
		waitingon = 'runonstartdelete';
		return 'this is your current list of commands <br>' + runonstartlist() + '<br>input the number that coresponds with the command you want to remove';
	}
	if(c<runonstarts.length){
		say+='command ' + runonstarts[c] + ' deleted'
		runonstarts.splice(c,1);
		set('runonstarts',runonstarts);
		return say;
	}
	return c + ' is not a number that coresponds to a command '

}

//generate a list of commands that will run on start
function runonstartlist(){
	var say = ''
	if(runonstarts.length>0){
	return listarray(runonstarts);
	}
	return 'no commands will run on startup'
}

//run the commands saved to run on start
async function startcommand(){
	console.log('running startcmd');
	var cmd = [];
	var say = '';
	if(!localStorage.getItem('seen')){
	say = 'welcome to punk records . </p><p>type <a onclick="funinterpret(\'help\')">help</a> if you are confused , or click <a href="documentation.html">here</a> if you want to learn more . ';
	output.innerHTML+='<p>'+say+'</p>';
	localStorage.setItem('seen',true);
	}else{
	var temp = getlocal('runonstarts');
	if(temp&&!user){
		console.log('not logged in running ',temp);
	runonstarts = temp;	
	}else{
	var temp = await getfromtable('runonstarts');
	if(temp&&user){
	console.log('logged in running ',temp);	
	runonstarts=temp;
	}
	}

	}

	if(runonstarts&&!isempty(runonstarts)){
	console.log('attempting to run ',temp);		
	for(var i=0;i<runonstarts.length;i++){

	cmd = runonstarts[i].split(' ');

	if(cmd[0]=='help'){
		say = help()
	}else{
		console.log('actually to running ',temp);	
	say = await run(cmd[0],cmd[1],cmd[2],cmd[3])
	}
	console.log('okay but for real running ',temp,say,cmd[0]);
	output.innerHTML+='<p>'+say+'</p>';

	}
	}
	return '';
}

//command to enter the layout menu
function layout(){
return help('layout');	
}

//command to hide or show the logo
function logotog(){

if(logo=='none'){
set('hq','block');
logo='block';
}else{
set('hq','none');
logo='none';
}	

layoutload();
return 'logo set to '+logo;	
}

function cwtog(){

if(legal=='short'){
set('legal','show');
legal='show';
}else if(legal=='hidden'){
set('legal','short');
legal='short';
}else{
set('legal','hidden');
legal='hidden';
}
	
layoutload();
return 'copyright text set to '+legal;	
}

function sbtog(){
	
if(scrollbarvar=='none'){
set('scrollbarvar','block');
scrollbarvar='block';
}else{
set('scrollbarvar','none');
scrollbarvar='none';
}	

layoutload();
return 'scrollbar set to '+scrollbarvar;	

}

function wmpref(){

if(gpref=='random'){
gpref = 'hour'
set('gpref','hour');	
}else if(gpref=='hour'){
gpref = 'date'
set('gpref','date');	
}else{
gpref = 'random'
set('gpref','random');
}
return 'greeting now set to '+gpref;
}	

function layoutload(){
	var cw = document.getElementById('cw');
	var hq = document.getElementById('hq');
	var sb = document.getElementById('scrollbar');
	var ss = document.getElementById('scrollslot');
	hq.style.display=logo;
	sb.style.display=scrollbarvar;
	ss.style.display=scrollbarvar;
	if(legal=='short'){
		cw.style.visibility='visible';
		cw.innerHTML='© 2025';
	}else{
		cw.style.visibility=legal;
		cw.innerHTML='punk records © 2025';
	}
}

function filler(c){
	if(!c){c=1};
	if(c!=='stop'){
	waitingon='filler'
	}
	talk(c);
	return 'okay type stop to stop me'
	
}

//shorthand functions

//returns a bunch of giberish with c dictating number of characters
function talk(c){
	if(!c){c=1};
	var temp='ב‎ג‎ד‎ה‎ו‎ז‎ח ‎ט‎‎ך‎כ‎ל‎ם‎מ‎'
	//⦛⧞⌬⍟☥☧♆⛥𝆱₪℧℮θςωↂ∲∱⋉⋋⋥⋳⟃⎲‎δΔεημ⅌╋◍§
	if (waitingon=='filler'){
		for(i=0;i<c;i++){
		output.innerHTML += temp.charAt(rand(26));
		}
		setTimeout(talk,1);
	}else return 'stopped talking';

}


function gettime(){
	var date = new Date();
	return {
		day:(date.toLocaleString('en-US',{weekday:'long'})+' '+date.toLocaleString('en-US', { month: 'long' })+' '+date.getDate()+' '+date.getFullYear()).toLowerCase(),
		time:date.getHours()+':'+date.getMinutes().toString().replace(/^(\d)$/, '0$1'),
		greeting:timegreet(date.getHours())
	}
		
	
	 //return new Date().toLocaleString('en-US',{weekday:'long',year:'numeric',month:'long',day: 'numeric',hour: 'numeric',minute: '2-digit',hour12: true});
}

function timegreet(h){
	if(h<4){return 'night'}
	if(h<12){return 'morning'}
	if(h<18){return 'afternoon'}
	return 'evening'
}

//merge two objects into one
function syncobject(a1,a2){
	var a1keys = Object.keys(a1);
	var a2keys = Object.keys(a2);
	for(i=0;i<a1keys.length;i++){
		for(j=0;j<a2keys.length;j++){
			if(a1[a1keys[i]]!==a2[a2keys[j]]){
				a2[a1[i]] = a1[a1[i]];
			}
		}
	}
	return a2;	
}

//turn an array into an english sentence
function hrarray(a){
	var say = '';
	for(i=0;i<a.length;i++){
	say+=a[i];
	if(!a[i+2]&&a[i+1]){
	say+=' and ';	
	}else if(a[i+1]){
	say+=' , ';
	}
	}
	return say;
}

//get the index for a function by passing its name
function getfunbyname(n){
	for(i=0;i<allfuns.length;i++){
		if(n==allfuns[i].fun){
			return i;
		}
}
}

//check if something is a valid http link
function islink(l){	
return(/^(?!.*\s)(.*\.\w{2,4}\/.*|.*\.\w{2,4})$/.test(l))
}

function set(k,v){
if(user){
savetotable(k,v);
console.log('SETTING CLOUD ',k,' TO ',v);
if(k=='runonstarts'){
return;
}
}

if(user&&!sync){
return;
}else{
console.log('SETTING LOCAL ',k,' TO ',v);
setlocal(k,v);
}
}	

async function get(k){
var tempx;
if(user){
	tempx = await getfromtable(k);
}
if(user){
	if(!tempx&&!sync){
	console.log('GOT ',k, ' FROM THE CLOUD AND IT WAS FALSE');
	return false;
	}
	if(tempx){
	console.log('GOT ',k, ' FROM THE CLOUD AND IT WAS ',tempx);
	return tempx;
	}
}
const tempy = getlocal(k);
if(tempy){
		console.log('GOT ',k, ' FROM LOCAL AND IT WAS ',tempy);
return tempy;
}

	console.log('TRIED TO GET ',k, ' BUT IT WAS FALSE');
return false;	
}

async function getcloud(k){
var tempx;

	tempx = await getfromtable(k);

	if(tempx){
	console.log('GOT ',k, ' FROM THE CLOUD AND IT WAS ',tempx);
	return tempx;
	}
}

function savetotable(k,v){

		output.innerHTML+='<p>'+error+'</p>';
		return false;

}

function setlocal(k,v){
localStorage.setItem(k,JSON.stringify(v));	
}

function getlocal(k){
	if(localStorage.getItem(k)){
		try {
			return JSON.parse(localStorage.getItem(k));
		} catch {
		return localStorage.getItem(k);
		}
	}else{
return false;
	}		
}

async function getfromtable(k) {

		console.log('error : ' + error);
		return false;

}

//save an object
function saveobject(n,o,k,v){
	o[k]=v;
	localStorage.setItem(n,o);

}

//delete a single item from an object
function deletefromobject(on,o,n){
	if(o[n]){
		delete o[n];
		localStorage.setItem(on,o);

		return on.slice(0,-1) + ' ' + n + ' deleted'
	}
	else return n +' is not a valid ' + on.substring(on.length-1,1) + ' , type list to see what ' + on + ' you have saved ';
	
}

//save something to an array and then save the array
function save(n,o,v){
	o.push(v);
	localStorage.setItem(n,o);

}

//return every item in an array
function listarray(a){
	say='';

	for(i=0;i<a.length;i++){
		if(a[i].trim('')!==''){
		say+=i+' ♥ ';
		say+=a[i]+'<br>';
		}
	}
	return say;
}

//return true if q is in array a
function isinarray(a,q){
	for(i=0;i<a.length;i++){
		if(a[i]==q){
			 return i;
		}
	}
	return false;
}

//get and parse something saved, return it if can be , or else run it as a function
async function getsaved(s){
var data=await get(s);
	if(data){
		try {
			return JSON.parse(data);
		} catch {
		return data;
		}
	}else{
		return window[s];
	}
}

//function to combine two things into one without duplicates, second variable has priority
function combine(x,y){
	 console.log('CHECKING ',x, ' AND ', y,' ');
	var temp = [];
	var temparray = [];
	var tempobj = {};
	 //check if either is false and overwrite if so	
	if(x==false || isempty(x)){
		 console.log(x,' iS FALSE ');
		temp=y;
	}else if(y==false || isempty(y)){
		console.log(y,' iS FALSE ');
		temp=x;
	}
		
//check if both are strings and overwrite if so
	 if(typeof x == 'string' && typeof y == 'string'){
		 console.log('BOTH ',x, ' AND ', y,' ARE STRINGSs');
		temp=y;
	 }
	 
	 
//check if both are objects and sync if so
	var ikeys = [];
	var xkeys = [];
	var deltotal = 0;
	 if(typeof x == 'object' && !Array.isArray(x)){
		ikeys = Object.keys(x);
	 }
	 if(typeof y == 'object' && !Array.isArray(y)){
		xkeys = Object.keys(y);
	 }
	 if(ikeys.length && xkeys.length){
		 console.log('BOTH ',x, ' AND ', y,' ARE OBJECTs');
		for(var j=0;j<ikeys.length;j++){
		tempobj[ikeys[j]]=x[ikeys[j]];
		}
		for(var j=0;j<xkeys.length;j++){
		tempobj[xkeys[j]]=y[xkeys[j]];
		}
		var tempstr = '';
		var newkeys = Object.keys(tempobj);
		for(var j=0;j<newkeys.length;j++){
			tempstr = tempobj[newkeys[j]];
			
			for(var y=j+1;y<newkeys.length;y++){
				if(tempobj[newkeys[y]]==tempstr){
				delete tempobj[newkeys[y]];
				deltotal++;
				y--;
				}
			}
		}
		if(deltotal==xkeys.length){
		console.log('CREATED NEW OBJECT ',tempobj);
		temp=tempobj;
		}else{
		console.log('OBJECTS ARE THE SAME');
		temp=false;		
		}

		}
			
	

//check if both are arrays and sync if so	
	if(Array.isArray(x) && Array.isArray(y)){
		console.log('BOTH ',x, ' AND ', y,' ARE ARRAYSs');
		temparray = x.concat(y);
		var tempstr = '';
		for(var j=0;j<temparray.length;j++){
			tempstr = temparray[j];
			for(var y=j+1;y<temparray.length;y++){
				if(temparray[y]==tempstr){
				temparray.splice(y,1);
				y--;
				}
			}
		}
		console.log('CREATED NEW ARRAY ',temparr);
	temp=temparray;	
}
return temp;
}

//return locale
function saylocale(){
	if(locale.length>1){
		if(locale[locale.length-1]=='anonset'){
			return 'anonymous settings'
		}
		return locale[locale.length-1];
	}
	else{ return 'main'};
}

function rand(n){
return Math.floor(Math.random()*n);	
}


//core and visual functionality {
	
function tobottom(){
window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
console.log('tobottom');
}

//	
function scrol(event){
	//disable default scroll behaviour
	event.preventDefault();
	//calculate the screen position
	scrollpos=window.scrollY;
	//recalculate when user scrolls
	scrollpos+=event.deltaY*3;
	//if scroll is above page
	if(scrollpos<0){
		//set scroll to top of page
		scrollpos=0;
	}
	//if scroll is below page
	if(scrollpos>document.documentElement.scrollHeight - window.innerHeight){
		//set scroll to bottom of page
		scrollpos=document.documentElement.scrollHeight - window.innerHeight;
	}
	//apply the calculated scroll
	window.scrollTo({top:scrollpos,behavior:'auto'});
	scrollbar()
}

function scrollbar(event){
	var scrollsize = (window.innerHeight/document.documentElement.scrollHeight)*window.innerHeight;
	
	if(event){
		if(event.buttons===1 || event.type==='click'){
		console.log(event.clientY/window.innerHeight)
		window.scrollTo({top:(((event.clientY-(scrollsize/2))/window.innerHeight)*(document.documentElement.scrollHeight))-1,behavior:'instant'});
		}
	}
	
	var bar = document.getElementById('scrollbar');
	
	var scrolloff = (window.scrollY/(document.documentElement.scrollHeight-window.innerHeight));
	

	
	if(document.documentElement.scrollHeight > window.innerHeight){
		console.log(event);
		bar.style.height=scrollsize+'px';
		console.log(scrolloff);
		bar.style.top=(scrolloff)*(window.innerHeight-scrollsize)+'px';
	}
	

}

function anchorscroll(event){
var a = event.target.closest('a');
if(a){
var tope = a.getBoundingClientRect().top;
window.scrollTo({top:tope+window.scrollY,behavior:'auto'});
requestAnimationFrame(tobottom);
}
}

function nexthistory(event){


	if(inputhistory[hi-1]){
		hi--;
		input.value=inputhistory[hi];
	}
}

function prevhistory(event){

	if(inputhistory[hi+1]){
		hi++;
		input.value=inputhistory[hi];
	}
}

var afo = 0;

function autofill(event){
	event.preventDefault();
	
	
	if(partialtext==' '){
		partialtext=input.value;
	}
	
	var ptl = partialtext.length;


	afo++;
	afo=afo%cfuns.length;

	for(i=afo;i<cfuns.length;i++){

		if(partialtext==cfuns[i].call.substring(0,ptl) && cfuns[i].fun!=='fallback'){
				input.value=cfuns[i].call;
				afo=i;

				return;
		}
	}
	
	afo=0;

	for(i=afo;i<cfuns.length;i++){

		if(partialtext==cfuns[i].call.substring(0,ptl) && cfuns[i].fun!=='fallback'){
				input.value=cfuns[i].call;
				afo=i;

				return;
		}
	}
	
}

function regex(s) {

    s='^'+s.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&')+'$';
	return new RegExp(s,'i');

}

//check if a var is empty
function isempty(v){
	if (v === null || v === undefined) return true;  
    if (typeof v === 'string' && v.trim() === '') return true;
    if (Array.isArray(v) && v === 0) return true;
    if (typeof v === 'object' && Object.keys(v).length === 0) return true;
    return false;  // Otherwise, it's not empty
}

//dynamically size textarea
function size(){
	//if there is no content, dont resize
	if (inarea.value.trim()===''){
		inarea.value=inarea.value.trim();
	}
	
	inarea.style.height = '1em';
	inarea.style.height = inarea.scrollHeight + 'px';


	if(hideinput==true){
		if(input.value.substring(input.value.length-1)!=='*' && hiddeninput.length<input.value.length){
		hiddeninput+=input.value.substring(input.value.length-1);
		if(input.value.substring(input.value.length-1)!==' '){
		input.value=input.value.slice(0,-1);
		input.value+='*';
		}
	}
	}
	
	scrollbar();
	tobottom();
}

//detect key inputs
function type(event){
	var k = event.key
	
	if(hideinput==true){
		if(k=='Backspace' || k=='Delete'){
			input.value='';
			hiddeninput='';
		}
	}
	

	
	if(k!=='Tab'){
		partialtext=' ';
	}

	if(takingnote==!true){

	if (k=='Enter'){
		
		interpret();
	}else if (k=='ArrowUp'){
		nexthistory(event);
	}else if (k=='ArrowDown'){
		prevhistory(event);
	}else if (k=='Tab'){
		autofill(event);
	}
	
	if(k=='Control'){
		lucky=true;
	}else{
		lucky=false;
	}
	
	}
tobottom();	
}

//focus textarea
function foc(event){
	console.log('regaining focus');
	if(event.key!=='Control'){
	inarea.focus();
	};
	tobottom();
}

//set mob  var based on screen aspect ratio
function ismob() {
    if( window.innerWidth / window.innerHeight < 0.55 ){
		mob=true;
	};
}

//intialize locale
function init(l){
	var temp = '';
	//if loggedin then
	if(locale[0]=='out' && user){
		// set base local to in
		locale=['in'];
	}
	if(locale[0]=='in' && !user){
		locale=['out'];
	}	
	
	//if locale perameter was passed
	if(l){
		console.log('l is presently '+l);
		//then unless peram is exit
		if(l=='exit'){
			//(which will cause locale to go back a step)
			locale.pop();
			//or the param contains %& meaning its a list of directories
		}else if(/%&/.test(l)){
			console.log('divider present');
			for(i=0;i<locale.length;i++){
				temp+=locale[i];
				temp+='%&';
			}
			console.log('locale is' +temp+locale);
		l = l.replace(new RegExp('^'+temp),'');
		l = l.split('%&');
		console.log('so concating '+l);
		locale=locale.concat(l);
			
		}else{
			
	//set locale to peram
	locale.push(l);
		}
	}
	
	//clear current functions
	cfuns=[];
	//loop through all functions
			//drill up for each locale
	for(j=locale.length;j>=0;j--){
	for(i=0;i<allfuns.length;i++){
		//if a function matches the current locale && it doesnt lead to the next locale
		if(allfuns[i].loc==locale[j] && allfuns[i].goesto==null){
			//push it to the current functions
			cfuns.push(allfuns[i]);
		}else if(allfuns[i].loc==locale[j] && allfuns[i].goesto!==locale[j+1]){
				cfuns.push(allfuns[i]);
		}
		}
	}
}


sync=getlocal('sync');

init();
loadprefs();
ismob();
