var themes = {};
var ctheme = {};


var user = false;
var sync = false;

var scrollpos = 0;


document.addEventListener('wheel',scrol);
document.getElementById('input').addEventListener('keydown',type);


chapters();

function interpret(){
var entry = document.getElementById('input').value;
document.getElementById('input').value = document.getElementById('input').value.replace(/\s+/g, '');
document.getElementById('input').value="";



console.log(entry);
if(entry=='i am entering a command'){
	
	document.getElementById('testtext').style.display='inline';
	document.getElementById('testtext').innerHTML='congratulations ! you entered a command<br><br>that is the basic principle of a command line interface , type the command and then the computer will do what you told it';
}else{
	document.getElementById('testtext').style.display='inline';
	document.getElementById('testtext').innerHTML='<span>oops ! you entered '+entry+'</span>';
}	
}	


function type(event){
	var k = event.key
	
	
	
	if (k=='Enter'){
		event.preventDefault();
		interpret();
	}
	
	
	
}


function chapters(){
	
	const chapterlist = document.querySelectorAll('.chapter');
	
	for(let i=0;i<chapterlist.length;i++){
		console.log(chapterlist[i].id);
		var titleid=chapterlist[i].id+'title';
		 var title = document.createElement('p');
		 title.innerHTML=chapterlist[i].id.replace(/-/g,' ');
		 title.id=titleid;
		 title.classList.add('sidebarbtn');
		 document.querySelector('.sidebar').append(title);
		 if(chapterlist[i].id!=='home'){
		 document.getElementById(chapterlist[i].id).style.display='none';
		 }else{
			document.getElementById(chapterlist[i].id+'title').classList.add('selected');
		 }
		 document.getElementById(titleid).addEventListener('click',expand);
	}
	
}

function expand(event){
		const chapterlist = document.querySelectorAll('.chapter');
	
	for(let i=0;i<chapterlist.length;i++){
		document.getElementById(chapterlist[i].id+'title').classList.remove('selected');
		 document.getElementById(chapterlist[i].id).style.display='none';
	}
	document.getElementById(event.target.id).classList.add('selected');
	document.getElementById(event.target.id.replace(/title$/,'')).style.display='block';
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

function setlocal(k,v){
localStorage.setItem(k,JSON.stringify(v));	
}

async function getfromtable(k) {
	try{
	const response = await fetch('usertableget.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
		body: JSON.stringify({key: k})
	})
	
	const data = await response.json();
	
		if(data.status === 'success'){
			return JSON.parse(data.value);
		}else{
			return false;
		}
	} catch(error) {
		console.log('error : ' + error);
		return false;
	}
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

function savetotable(k,v){
	v=JSON.stringify(v);
	fetch('usertableput.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({key: k,value: v})
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => {
		output.innerHTML+='<p>'+error+'</p>';
		return false;
	});
}


function isempty(v){
	if (v === null || v === undefined) return true;  
    if (typeof v === 'string' && v.trim() === '') return true;
    if (Array.isArray(v) && v === 0) return true;
    if (typeof v === 'object' && Object.keys(v).length === 0) return true;
    return false;  // Otherwise, it's not empty
}

function scrol(event){
	event.preventDefault();
	scrollpos=window.scrollY;
	scrollpos+=event.deltaY*20;
	if(scrollpos<0){
		scrollpos=0;
	}
	if(scrollpos>document.documentElement.scrollHeight - window.innerHeight){
		scrollpos=document.documentElement.scrollHeight - window.innerHeight;
	}
	window.scrollTo({top:scrollpos,behavior:'auto'});

}


async function loadtheme(){


	
	var temp = await get('themes');
	if(Array.isArray(temp)){
	set('themes',{});
	}
	if(temp){
	themes=temp;
	}
	temp = await get('theme');
	if(sync&&temp!==getlocal('theme')){
	setlocal('theme',temp);
	}
	if(isempty(ctheme)&&temp){
	ctheme=temp;
	}else{
	await set('theme',ctheme);
	};	

	if(ctheme.bg){
		if(ctheme.bg.split('/')[0]=='https:' || ctheme.bg.split('/')[0]=='http:'){
			document.body.style.backgroundImage = 'url('+ctheme.bg+')';
			if(ctheme.bgc){
			document.body.style.backgroundColor = ctheme.bgc;
			document.documentElement.style.setProperty('--bg', ctheme.bg);
			}			

		}else{
			document.body.style.backgroundImage = 'none';
			document.body.style.backgroundColor = ctheme.bg;
			document.documentElement.style.setProperty('--bg', ctheme.bg);
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

	}else{
		document.getElementById('output').style.letterSpacing = 'normal';

	}
	if(ctheme.fg){
		document.body.style.color = ctheme.fg;
		document.getElementById('hq').style.stroke=ctheme.fg;

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

	}
	if(ctheme.w){
		document.getElementById('output').style.fontWeight = ctheme.w;

	}
	else{
		document.getElementById('output').style.fontWeight = 'normal';

	}


	}
	
	
loadtheme();