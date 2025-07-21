/*
CREDITS:
- A Neptun powerup, mint előd: https://github.com/solymosi/npu
- A neptun powerup összes kontributora

- Afghan_Goat
*/

const manifest = chrome.runtime.getManifest();

console.log(manifest.name + " | "+ manifest.version +" betöltése kész!\n`"+manifest.description+"`");

let tray_hidden=true;

let tray_button = null;
let config_menu=null;

function apply_style1(){
	//DOM styles
	let fg_clr=document.getElementById("sbody").value;
	let bg_clr=document.getElementById("shead").value;
	apply_fg_color_string(fg_clr);
	
	apply_bg_color_string(bg_clr);
}

function apply_style2(){
	let nt1=document.getElementById("nt1").value;
	let nt2=document.getElementById("nt2").value;
	let nt3=document.getElementById("nt3").value;
	
	let rel=false;
	if(nt1==""){
		rel=true;
	} else {
		set_class_bgimage("main_header_l",nt1);
	}
	
	if(nt2==""){
		rel=true;
	} else {
		set_class_bgimage("main_header_m",nt2);
	}
	
	if(nt3==""){
		rel=true;
	} else {
		set_class_bgimage("main_header_r",nt3);
	}
	
	if(rel==true){
		reload_page();
	}
}

function apply_presets(){
	let cpreset=document.getElementById("presets").value;
	let new_theme="Alap";
	switch(cpreset){
		case 'p1':
			//Base
			apply_bg_color(255,255,255,1.0);
			apply_fg_color(0,0,0,1.0);
			break;
		case 'p2':
			//SCBW
			new_theme="SCBW";
			apply_bg_color(40,40,150,1.0);
			
			set_class_bgimage("main_header_r","url('https://afghangoat.hu/build_choser/duke.webp')");
			set_class_bgimage("main_header_l","url('https://afghangoat.hu/build_choser/duke.webp')");
			set_class_bgimage("main_header_m","url('https://afghangoat.hu/build_choser/duke.webp')");
			break;
	}
	console.log("Új téma beállítva: "+new_theme);
}

function create_tray(){
	
	if(tray_button!==null){
		return;
	}
	document.body.innerHTML+=`<style>
.button-30 {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>`;
	
	tray_button = document.createElement('a');
	tray_button.classList.add("button-30");
  
	tray_button.style.position = 'fixed';
	tray_button.style.top = '0';
	tray_button.style.left = '0';
	tray_button.style.backgroundColor = 'black';
	tray_button.style.color = 'white';
	tray_button.style.width = '50px';
	tray_button.style.height = '50px';
	tray_button.style.zIndex = '9998';
	tray_button.style.fontSize = '16px';
	tray_button.style.display = 'block';
	  
	tray_button.textContent = 'N++';
	
	document.body.appendChild(tray_button);
	
	tray_button.onclick=function() {
		toggle_tray();
	};
	
	//Config style
	config_menu=document.createElement('div');
	config_menu.innerHTML=`<style>
    
  #notneeded{
    font-family: "JetBrains Mono",monospace;
    font-weight:100;
    resize: both;
    overflow: auto;
    background-color: #111;
    color: white;
    width:50vw;
    height:50vh;
    display: inline-block;
    border: 4px solid #444;
    padding: 10px;
    z-index: 9999;
    position:fixed;
    top:0px;
    left:0px;
  }
  </style>
  <div id="notneeded">
    <h1>Konfiguráció:</h1>
    <h2>Kinézet:</h2>
    <hr/>
    
    <h3>Alap stílusok</h3>
    <input type="color" id="shead" name="head" value="#e66465" /><label for="head">Háttér</label>

  <input type="color" id="sbody" name="body" value="#f6b73c" />
  <label for="body">Szöveg</label>
    <button class="button-30" id="as1">Mentés</button>
    <br/>
    <h3>Neptun főmenü képek (url kell)</h3>
    <label for="nt1">Bal:</label><input type="text" id="nt1" name="nt1"><br/>
    <label for="nt2">Közép:</label><input type="text" id="nt2" name="nt2"><br/>
    <label for="nt3">Jobb:</label><input type="text" id="nt3" name="nt3"><br/><br/>
    <button class="button-30" id="as2">Mentés</button><br/>
    
    <label for="presets">Preset stílus:</label>

	<select id="presets">
	  <option value="p1">Alap</option>
	  <option value="p2">Starcraft Broodwar</option>
	</select>
	<br/><br/>
	
	<button class="button-30" id="cbt1">Bezár</button>
	`;
	
	document.body.appendChild(config_menu);
	config_menu.style.display = 'none';
	
	
	document.getElementById('presets').addEventListener('change', apply_presets);
	document.getElementById('as1').addEventListener('click', apply_style1);
	document.getElementById('as2').addEventListener('click', apply_style2);
	document.getElementById('cbt1').addEventListener('click', toggle_tray);
	
}
function toggle_tray(){
	if(tray_hidden==true){
		tray_hidden=false;
		//Show
		
		if(tray_button!==null){
			tray_button.style.display = 'none';
		}
		if(config_menu!==null){
			config_menu.style.display = 'block';
		}
		
	} else {
		tray_hidden=true;
		//Hide
		if(tray_button!==null){
			tray_button.style.display = 'block';
		}
		
		if(config_menu!==null){
			config_menu.style.display = 'none';
		}
		
	} 

}

create_tray();

//TODO save, lastfgcolor,lastbgcolor,lastm1,m2,m3-s

//https://neptun.bme.hu/hallgatoi/login.aspx make when this, not load