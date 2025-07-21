/*
// Saving an object to localStorage
const user = { name: 'JohnDoe', age: 30, isLoggedIn: true };
localStorage.setItem('userData', JSON.stringify(user));

// Loading an object from localStorage
const storedUser = localStorage.getItem('userData');
if (storedUser) {
  const userObj = JSON.parse(storedUser);
  console.log(userObj.name); // Output: JohnDoe
} else {
  console.log('No user data found.');
}*/
// Remove an item from localStorage
//localStorage.removeItem('username');

// Clear all localStorage data
//localStorage.clear();

const elements_to_style = document.querySelectorAll('body, p, h1, h2, h3, h4, h5, h6, a, section, div, li, ul, ol, hr, br, em, strong');
//apply_invert(elements_to_style);

function apply_invert() {
    elements_to_style.forEach(function(element) {
		let tmp1=window.getComputedStyle(element);
		let fclr=flipclr(tmp1.color);
		let bclr=flipclr(tmp1.backgroundColor);
		element.style.color = fclr;
		element.style.backgroundColor = bclr;
    });
}

//Apply background color
function apply_bg_color(r=0,g=0,b=0,a=1.0) {
    elements_to_style.forEach(function(element) {
		element.style.backgroundColor = "rgba(" + r + "," + g + "," + b + ","+a+")";
    });
}
function apply_bg_color_string(clr) {
    elements_to_style.forEach(function(element) {
		element.style.backgroundColor = clr;
    });
}

//Apply foreground color
function apply_fg_color(r=0,g=0,b=0,a=1.0) {
    elements_to_style.forEach(function(element) {
		element.style.color = "rgba(" + r + "," + g + "," + b + ","+a+")";
    });
}
function apply_fg_color_string(clr) {
    elements_to_style.forEach(function(element) {
		element.style.color = clr;
    });
}

function flipclr(clr) {
	clr = clr.trim();
	let r = "";
	let g = "";
	let b = "";
	let findex = 4;
	let cindex = 0;
	if (clr.includes("rgba") === true) {
		findex++;
	}
	for (let i = findex; i < clr.length; i++) {
		if (clr[i] === ',') {
			cindex++;
		}
		if (cindex === 3) {
			break;
		}
		if (clr[i] !== ',') {
			switch (cindex) {
				case 0:
					r += clr[i];
					break;
				case 1:
					g += clr[i];
					break;
				case 2:
					b += clr[i];
					break;
			}
		}
	}
	r = 255 - parseInt(r);
	g = 255 - parseInt(g);
	b = 255 - parseInt(b);
	return "rgb(" + r + "," + g + "," + b + ")";
}

function set_class_bgimage(classname='main_header_r',img_url="url('https://afghangoat.hu/img/img1.png')"){
	let gotclasses=document.getElementsByClassName(classname);
	gotclasses[0].style.backgroundImage=img_url;
}

function reload_page(){
	window.location.reload();
}

//##########
//OLD NPU UTILS remade in pure js.
//##########

function isNeptunPage(cfg=null) {
	if(null===cfg){ //Invalid config
		return false;
	}
	return document.title.toLowerCase().indexOf(cfg.neptun_title) !== -1;
}

function isLoginPage(cfg=null) {
	if(null===cfg){ //Invalid config
		return false;
	}
	
	let c=document.getElementsByClassName(cfg.neptun_login_distinguish_label).length;
	if(c==0){
		return false;
	} else {
		return true;
	}
}

/*function getNeptunCode() {
	if ($("#upTraining_topname").size() > 0) {
		const input = $("#upTraining_topname").text();
		return input.substring(input.indexOf(" - ") + 3).toUpperCase();
	}
}*/
function getNeptunCodeLogin(cfg=null){
	if(null===cfg){ //Invalid config
		return '';
	}
	
	
	const inputo = document.getElementById(cfg.neptun_neptuncode_id);
	if(inputo){
		const input=inputo.value;
		return input;
	} else {
		return '';
	}
	
}

//At main
function getNeptunCode(cfg=null){
	if(null===cfg){ //Invalid config
		return '';
	}
	
	const inputo = document.getElementById(cfg.neptun_code_logged_id);
	if(inputo){
		const input=inputo.value;
		return input.substring(input.indexOf(" - ") + 3).toUpperCase();
	} else {
		return '';
	}
	
}

function isLoggedIn() {
	return !!getNeptunCode();
}

// Parses and returns the first-level domain of the site
function getDomain() {
	const host = location.host.split(".");
	const tlds = "at co com edu eu gov hu hr info int mil net org ro rs sk si ua uk".split(" ");
	let domain = "";
	for (let i = host.length - 1; i >= 0; i--) {
		domain = `${host[i]}.${domain}`;
		if (!tlds.includes(host[i])) {
			return domain.substr(0, domain.length - 1);
		}
	}
}

// Parses and returns the sanitized name of the current training
function getTraining(cfg=null) {
	/*if ($("#lblTrainingName").size() > 0) {
		document.getElementById("lblTrainingName").innerText.replace(/[^a-zA-Z0-9]/g, "");
		return $("#lblTrainingName").text().replace(/[^a-zA-Z0-9]/g, "");
	}*/
	if(null===cfg){ //Invalid config
		return '';
	}
	const input=document.getElementById(cfg.neptun_training_label_id);
	if(input){
		return input.innerText.replace(/[^a-zA-Z0-9]/g, "");
	}
	
}

function getPageId() {
	const result = /ctrl=([a-zA-Z0-9_]+)/g.exec(window.location.href);
	return result ? result[1] : null;
}

// Returns whether the specified ID is the current page
function isPageId(...ctrls) {
	return ctrls.includes(getPageId());
}

// Get the current AJAX grid instance
function getAjaxInstance(elem) {
	const instanceId = getAjaxInstanceId(elem);
	return instanceId && unsafeWindow[getAjaxInstanceId(elem)];
}

function getAjaxInstanceId(elem) {
	if(!elem){
		return null;
	}
	const ajaxGrid = $(elem).closest("div[type=ajaxgrid]");
	return ajaxGrid.size() > 0 && ajaxGrid.first().attr("instanceid");
}

// Runs a function asynchronously to fix problems in certain cases
function runAsync(func) {
	window.setTimeout(func, 0);
}

// Evaluates code in the page context
function runEval(source) {
	const value = typeof source === "function" ? `(${source})();` : source;
	const script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.textContent = value;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

// Reads the value at the provided path in a deeply nested object
function deepGetProp(o, s) {
	let c = o;
	while (s.length) {
		const n = s.shift();
		if (!(c instanceof Object && n in c)) {
		return;
		}
		c = c[n];
	}
	return c;
}

// Sets a value at the provided path in a deeply nested object
function deepSetProp(o, s, v) {
	let c = o;
	while (s.length) {
		const n = s.shift();
		if (s.length === 0) {
			if (v === null) {
				delete c[n];
			} else {
				c[n] = v;
			}
			return;
		}
		if (!(typeof c === "object" && n in c)) {
			c[n] = new Object();
		}
		c = c[n];
	}
}

// Injects a style tag into the page
function injectCss(css) {
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.textContent = css;
    document.head.appendChild(style);
}

// Parses a subject code that is in parentheses at the end of a string
function parseSubjectCode(source) {
	const str = source.trim();
	if (str.charAt(str.length - 1) === ")") {
		let depth = 0;
		for (let i = str.length - 2; i >= 0; i--) {
			const c = str.charAt(i);
			if (depth === 0 && c === "(") {
				return str.substring(i + 1, str.length - 1);
			}
			depth = c === ")" ? depth + 1 : depth;
			depth = c === "(" && depth > 0 ? depth - 1 : depth;
		}
	}
	return null;
}

// Returns if the given string stands for a passing grade
const passing_grades=["jeles","excellent","jó","good","közepes","satisfactory","elégséges","pass","kiválóan megfelelt","excellent","megfelelt","average"];
const failing_grades=["elégtelen","fail","nem felelt meg","unsatisfactory","nem jelent meg","did not attend","nem vizsgázott","did not attend"];

function isPassingGrade(str) {
	return passing_grades.some(function (item) {
		return str.toLowerCase().indexOf(item) !== -1;
	});
}

// Returns if the given string stands for a failing grade
function isFailingGrade(str) {
	return failing_grades.some(function (item) {
		return str.toLowerCase().indexOf(item) !== -1;
	});
}