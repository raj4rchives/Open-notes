const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const logs=[];
function log(event,status="OK"){logs.unshift({t:new Date().toLocaleTimeString(),e:event,s:status});renderLogs()}
function renderLogs(){$("#logsList").innerHTML=logs.slice(0,30).map(x=>`<div class="logrow"><span>${x.t}</span><span>${x.e}</span><span class="ok">${x.s}</span></div>`).join("")}
function tab(id){$$(".tab").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");$$(".nav").forEach(x=>x.classList.toggle("active",x.dataset.tab===id))}
$$(".nav").forEach(b=>b.onclick=()=>tab(b.dataset.tab));
$$("[data-go]").forEach(b=>b.onclick=()=>tab(b.dataset.go));
setInterval(()=>$("#clock").textContent=new Date().toLocaleTimeString(),1000);

function updatePreview(){
 const p=$("#preview"); p.className="preview "+$("#theme").value;
 p.querySelector("h3").textContent=$("#orgName").value;
 p.querySelector("p").textContent=$("#scenarioMsg").value;
}
["scenarioName","orgName","scenarioMsg","theme"].forEach(id=>$("#"+id).addEventListener("input",updatePreview));
$("#buildBtn").onclick=()=>{updatePreview();log("Safe demo scenario built: "+$("#scenarioName").value);alert("SAFE DEMO READY — no credentials are stored or transmitted.");};
$("#demoSubmit").onclick=()=>{log("Demo interaction triggered — credential capture blocked","BLOCKED");alert("Training checkpoint reached.\n\nNo username/password was collected, stored, or sent.");};

$("#makeUrl").onclick=()=>{
 const sid=encodeURIComponent($("#scenarioId").value||"training");
 const tok=encodeURIComponent($("#demoToken").value||"DEMO");
 const base=location.href.split("#")[0];
 const u=base+"#demo="+sid+"&token="+tok;
 $("#urlOut").textContent=u; $("#checkUrl").value=u; log("Safe local demo URL generated");
};
$("#copyUrl").onclick=async()=>{if($("#urlOut").textContent.startsWith("http")){await navigator.clipboard.writeText($("#urlOut").textContent);log("Demo URL copied to clipboard");}};
$("#analyzeUrl").onclick=()=>{
 let raw=$("#checkUrl").value.trim(), out=$("#urlResults"); out.innerHTML="";
 if(!raw){out.innerHTML='<div class="result bad">ENTER A URL FIRST</div>';return}
 let u; try{u=new URL(raw)}catch{out.innerHTML='<div class="result bad">INVALID URL FORMAT</div>';return}
 const checks=[
  [u.protocol!=="https:","warn","No HTTPS — transport encryption is absent."],
  [u.hostname.match(/^\d{1,3}(\.\d{1,3}){3}$/),"bad","Hostname is an IP address instead of a normal domain."],
  [u.hostname.includes("xn--"),"warn","Punycode/IDN hostname detected; inspect characters carefully."],
  [raw.includes("@"),"bad","@ in a URL can hide the actual destination from casual inspection."],
  [u.hostname.split(".").length>4,"warn","Many hostname labels/subdomains — verify the real domain."],
  [u.search.length>120,"warn","Unusually long query string — inspect parameters before trusting it."]
 ];
 let hits=0; checks.forEach(c=>{if(c[0]){hits++;out.innerHTML+=`<div class="result ${c[1]}">${c[2]}</div>`}});
 if(!hits)out.innerHTML='<div class="result">NO BASIC INDICATORS TRIGGERED — still verify the domain and context.</div>';
 log("URL analyzed: "+u.hostname);
};

function randomIp(){return `192.0.2.${Math.floor(Math.random()*253)+1}`}
$("#newIp").onclick=()=>{$("#fakeIp").textContent=randomIp();log("Documentation IP generated (simulated)")};
$("#clearLogs").onclick=()=>{logs.length=0;renderLogs()};
log("Sandbox initialized");
