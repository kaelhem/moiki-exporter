var n,e,t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},o=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,i=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,r="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",a="["+r+"]",s="\\d+",c="[a-z\\xdf-\\xf6\\xf8-\\xff]",l="[^\\ud800-\\udfff"+r+s+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",u="(?:\\ud83c[\\udde6-\\uddff]){2}",p="[\\ud800-\\udbff][\\udc00-\\udfff]",f="[A-Z\\xc0-\\xd6\\xd8-\\xde]",d="(?:"+c+"|"+l+")",g="(?:"+f+"|"+l+")",m="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",$="[\\ufe0e\\ufe0f]?"+m+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",u,p].join("|")+")[\\ufe0e\\ufe0f]?"+m+")*",x="(?:"+["[\\u2700-\\u27bf]",u,p].join("|")+")"+$,h=RegExp("['’]","g"),b=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),y=RegExp([f+"?"+c+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[a,f,"$"].join("|")+")",g+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[a,f+d,"$"].join("|")+")",f+"?"+d+"+(?:['’](?:d|ll|m|re|s|t|ve))?",f+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",s,x].join("|"),"g"),j=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,O="object"==typeof self&&self&&self.Object===Object&&self,v="object"==typeof t&&t&&t.Object===Object&&t||O||Function("return this")(),S=(n={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"ss"},function(e){return null==n?void 0:n[e]}),w=Object.prototype.toString,T=v.Symbol,A=T?T.prototype:void 0,V=A?A.toString:void 0;function E(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==w.call(n)}(n))return V?V.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var k=(e=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,o){for(var i=-1,r=n?n.length:0;++i<r;)t=e(t,n[i],i,n);return t}(function(n,e,t){return n=E(n),void 0===(e=e)?function(n){return j.test(n)}(n)?function(n){return n.match(y)||[]}(n):function(n){return n.match(o)||[]}(n):n.match(e)||[]}(function(n){return(n=E(n))&&n.replace(i,S).replace(b,"")}(n).replace(h,"")),e,"")});const R=n=>`This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/${n}\nExported on ${(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}`,q=n=>{if(n&&n.author){const{firstname:e,lastname:t,pseudo:o}=n.author;return o||e+" "+t}return"Inconnu"};var C={__proto__:null,getHeader:R,getAuthor:q,simplifyStory:({sequences:n,firstSequence:e},t,o)=>{const i={},r=(n,e,t=!1)=>{i[n]||(i[n]={in:[],to:[]}),t?i[n].in.push(e):(i[n].to.push(e),r(e,n,!0))},a={};for(let e of n)if(a[e.id]=e,e.choices&&e.choices.length>0)for(let n of e.choices)n.content=o(n.content),n.condition&&n.condition.next&&n.condition.params&&r(e.id,n.condition.next),n.next&&r(e.id,n.next);else e.condition&&e.condition.next&&e.condition.params&&r(e.id,e.condition.next),e.next&&r(e.id,e.next);const s=[a[e]],c=Object.entries(i).map(([n,e])=>({data:e,index:n}));for(let n of c)(n.data.in.length>1||1===n.data.in.length&&i[n.data.in[0]].to.length>1)&&n.index!==e&&s.push(a[n.index]);for(let n of s){let e=n.id;const r=[a[e]];for(;1===i[e].to.length;)e=i[e].to[0],r.push(a[e]);n.chain=r;const s=[];for(let n of r)s.push(n),n.action&&n.action.params&&"string"==typeof n.action.params&&s.push({objectAction:t[n.action.params]});const c=[];let l="";for(let n of s)n.objectAction?(l&&(c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),l=""),c.push(n.objectAction)):l+=o(n.content)+" ";l&&c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),n.chainedContent=c}return s.forEach(n=>{n.chain=n.chain.map(({...n})=>({...n}))}),s}};const U=n=>n.replace(/-/gi,"_"),_=n=>n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),I=(n,e)=>`{ ${e[n.condition.params].inkVar}:\n  -> ${U(n.condition.next)}\n- else:\n  -> ${U(n.next)}\n}\n`,L=(n,e,t="")=>{const{inkVar:o,desc:i}=e[n.action.params];return`\n${t}~ ${o} = !${o}\n${t}{ ${o}:\n${t}  <h4><em>Objet récupéré</em> : ${i}</h4>\n${t}- else:\n${t}  <h4><em>Objet perdu</em> : ${i}</h4>\n${t}}\n`},z=n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={inkVar:"_"+U(k(n.label)),...n};let s=`/*\n${R(e)}\n*/\n\n# author: ${q(t)}\n# title: ${t.name}\n`;t.image&&(s+=`# IMAGE: ${t.image.replace(/\//gi,"\\/")}\n<em>Crédit photo : <a href="${"https://unsplash.com".replace(/\//gi,"\\/")}">Unsplash</a></em>\n`),s+="<em>"+t.description+"</em>\n<hr/>\n";const c=Object.entries(a).map(([n,e])=>e);for(let n of c)s+="VAR "+n.inkVar+" = false\n";s+="\n-> "+U(o)+"\n";for(let n of i){const e=_(n.content);if(s+="\n=== "+U(n.id)+" ===\n",s+=e+"\n",n.choices&&n.choices.length>0){for(let e of n.choices){let n=" ";e.action&&e.action.params&&"string"==typeof e.action.params&&(n=L(e,a,"\t"));let t="* ["+_(e.content)+"]"+n;s+=e.condition&&e.condition.next&&e.condition.params?`${t} ${I(e,a)}`:t+"-> "+U(e.next)+"\n"}s+="# CLEAR\n"}else n.action&&n.action.params&&"string"==typeof n.action.params&&(s+=L(n,a)),s+=n.condition&&n.condition.next&&n.condition.params?I(n,a):n.next?"-> "+U(n.next)+"\n":"-> END\n"}return s};var D="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),Z=new Uint8Array(16);function W(){if(!D)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return D(Z)}for(var P=[],M=0;M<256;++M)P[M]=(M+256).toString(16).substr(1);function N(n,e,t){var o=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var i=(n=n||{}).random||(n.rng||W)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e)for(var r=0;r<16;++r)e[o+r]=i[r];return e||function(n,e){var t=0;return[P[n[t++]],P[n[t++]],P[n[t++]],P[n[t++]],"-",P[n[t++]],P[n[t++]],"-",P[n[t++]],P[n[t++]],"-",P[n[t++]],P[n[t++]],"-",P[n[t++]],P[n[t++]],P[n[t++]],P[n[t++]],P[n[t++]],P[n[t++]]].join("")}(i)}const G=n=>n.replace(/-/gi,"_"),H=n=>n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),Y=n=>n.replace(/"/gi,'\\"'),J=(n,e,t="goto")=>`(if: ${e[n.condition.params].tweeVar})[(${t}: "${G(n.condition.next)}")]\n(else:)[(${t}: "${G(n.next)}")]\n`,B=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?G(n.next):null,r=Y(H(n.content));if(o){const{tweeVar:n,desc:t}=e[o];return`(link: "${r}")[(set: ${n} to not ${n}, $actionText to "${Y(t)}", $actionPassage to "${i}", $isObjectWin to ${n})[(goto: "Toggle-Object")]]\n`}return t?`(link: "${r}")[${J(n,e)}]\n`:i?`(link: "${r}")[(goto: "${i}")]\n`:""},F=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?G(n.next):null;if(o){const{tweeVar:n,desc:t}=e[o];return`(set: ${n} to not ${n}, $actionText to "${Y(t)}", $actionPassage to "${i}", $isObjectWin to ${n})[(display: "Toggle-Object")]\n`}return t?J(n,e,"display")+"\n":i?`(display: "${i}")\n`:""},K=n=>n.replace(/-/gi,"_"),Q=n=>n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),X=n=>n.replace(/"/gi,'\\"'),nn=(n,e,t=null)=>{const o=t?`[[${t}|${K(n.condition.next)}]]`:`<<include "${K(n.condition.next)}">>`,i=t?`[[${t}|${K(n.next)}]]`:`<<include "${K(n.next)}">>`;return`<<if ${e[n.condition.params].tweeVar}>>\n  ${o}\n<<else>>\n  ${i}\n<</if>>\n`},en=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?K(n.next):null,r=X(Q(n.content));if(o){const{tweeVar:n,desc:t}=e[o];return`[[${r}|Toggle-Object][${n} to not ${n}; $actionText to "${X(t)}"; $actionPassage to "${i}"; $isObjectWin to ${n}]]\n`}return t?nn(n,e,r)+"\n":i?`[[${r}|${i}]]\n`:""},tn=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?K(n.next):null;if(o){const{tweeVar:n,desc:t}=e[o];return`<<set ${n} to not ${n}; $actionText to "${X(t)}"; $actionPassage to "${i}"; $isObjectWin to ${n}>>\n<<include "Toggle-Object">>\n`}return t?nn(n,e)+"\n":i?`<<include "${i}">>\n`:""},on=(n,e)=>{if("harlowe"===e)return(n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={tweeVar:"$"+G(k(n.label)),...n};let s=`\x3c!--\n${R(e)}\n--\x3e\n\n:: StoryAuthor\n${q(t)}\n\n:: StoryTitle\n${t.name}\n\n:: StorySubtitle\n${t.description}\n\n:: StoryData\n{\n  "ifid": "${N()}",\n  "format": "Harlowe",\n  "format-version": "3.1.0",\n  "start": "${G(o)}",\n  "zoom": 1\n}\n\n`;const c=Object.entries(a).map(([n,e])=>e);let l="(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n";for(let n of c)l+="(set: "+n.tweeVar+" to false)\n";for(let n of i){const e=H(n.content);if(s+="\n:: "+G(n.id)+"\n"+e+"\n",n.choices&&n.choices.length>0)for(let e of n.choices)s+=B(e,a);else s+=F(n,a);n.id===o&&(s+=l)}return s+="\n:: Toggle-Object\n(if: $isObjectWin)[Objet récupéré : {$actionText}]\n(else:)[Objet perdu : {$actionText}]\n(display: $actionPassage)\n",s})(n);if("sugarcube"===e)return(n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={tweeVar:"$"+K(k(n.label)),...n};let s=`\x3c!--\n${R(e)}\n--\x3e\n\n:: StoryAuthor\n${q(t)}\n\n:: StoryTitle\n${t.name}\n\n:: StorySubtitle\n${t.description}\n\n:: StoryData\n{\n  "ifid": "${N()}",\n  "format": "SugarCube",\n  "format-version": "2.31.1",\n  "start": "${K(o)}",\n  "zoom": 1\n}\n\n`;const c=Object.entries(a).map(([n,e])=>e);let l="<<set $actionText to false; $actionPassage to false; $isObjectWin to false>>\n";for(let n of c)l+="<<set "+n.tweeVar+" to false>>\n";for(let n of i){const e=Q(n.content);if(s+="\n:: "+K(n.id)+"\n"+e+"\n",n.choices&&n.choices.length>0)for(let e of n.choices)s+=en(e,a);else s+=tn(n,a);n.id===o&&(s+=l)}return s+="\n:: Toggle-Object\n<<if $isObjectWin>>\n  récupéré : $actionText\n<<else>>\n  perdu : $actionText\n<</if>>\n<<include [[$actionPassage]]>>\n",s})(n);throw new Error("This format is unvailable!")},rn=n=>n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<([/]*)(strong|b|h\d)>)/gi,"**").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/(<([/]*)(em)>)/gi,"_").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi,"+n+").replace(/(&nbsp;)+/gi," ").replace(/(\s)+/gi," ").trim(),an=n=>{const{meta:e,firstSequence:t,sequences:o,assets:i}=n,r=n=>o.findIndex(e=>e.id===n)+2;let a={};for(let n of i)a[n.id]={storyVar:(s=k(n.label),s.replace(/-/gi,"_")),...n};var s;const c=[],l=[];let u=o.length+2;const p=(n,e)=>{const t=u;return l.push({id:t,events:[`997|${n.storyVar}|${t+2}|null\n`,`997|null|${t+1}|null\n`]}),l.push({id:t+1,action:`${n.storyVar}|invisible|null|récupéré: ${n.desc.trim()}|null`,events:[`997|null|${e}|null\n`]}),l.push({id:t+2,action:`-${n.storyVar}|invisible|null|perdu: ${n.desc.trim()}|null`,events:[`997|null|${e}|null\n`]}),u+=3,t};let f="1 _start_\n";e.image&&(f+=`[[${e.image}]]+n+&&\nCrédit photo : Unsplash+n+&&\n`),f+=`Une histoire de ${q(e).trim()}+n+&&\n`,f+="(exporté via https://moiki.fr)+n++n+&&\n",f+=e.description+"\n|\n",f+=`997|null|${r(t)}|null\n`,f+="*****",c.push({id:"$start",room:f});for(let n of o){let e="";const t=rn(n.content);if(e+=r(n.id)+" "+n.id+"\n",e+="[["+t.split("\n").map(n=>n+"+n+").join("")+"]]",n.choices&&n.choices.length>0){const t=[];let o=1;for(let i of n.choices){const n=r(i.next);if(i.condition&&i.condition.next&&i.condition.params)l.push({id:u,events:[`997|${a[i.condition.params].storyVar}|${r(i.condition.next)}|null\n`,`997|null|${n}|null\n`]}),e+=`+n+&&\n${rn(i.content)} (${o})`,t.push(u),++u;else if(i.action&&i.action.params&&"string"==typeof i.action.params){const r=p(a[i.action.params],n);e+=`+n+&&\n${rn(i.content)} (${o})`,t.push(r)}else e+=`+n+&&\n${rn(i.content)} (${o})`,t.push(n);++o}if(t.length>0){e+="\n|\n",o=1;for(let n of t)e+=o+"->"+n+"\n",++o}}else if(n.final||!n.next)e+="\n|\n",e+=n.final&&n.isHappyEnd?"999|Tu as gagné ! Bravo !\n":"998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n";else{const t=r(n.next);e+="\n|\n",n.action&&n.action.params&&"string"==typeof n.action.params?e+=`997|null|${p(a[n.action.params],t)}|null\n`:(n.condition&&(e+=`997|${a[n.condition.params].storyVar}|${r(n.condition.next)}|null\n`),e+=`997|null|${t}|null\n`)}e+="*****",c.push({id:n.id,room:e})}for(let{id:n,events:e,action:t}of l){let o=n+" condition-room-"+n+"\n";o+="null\n",o+=t||"|",o+="\n"+e.join(""),o+="*****",c.push({id:n,room:o})}return e.name+"\n"+c.length+"\n"+c.map(({room:n})=>n).join("\n")+"\n1§1️⃣|2§2️⃣|3§3️⃣"};var sn="0.1.4";export{z as convertToInk,an as convertToJdrBot,on as convertToTwee,C as utils,sn as version};
//# sourceMappingURL=moiki-exporter.modern.js.map
