var n,e,t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},o=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,i=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,r="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",a="["+r+"]",s="\\d+",c="[a-z\\xdf-\\xf6\\xf8-\\xff]",u="[^\\ud800-\\udfff"+r+s+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",l="(?:\\ud83c[\\udde6-\\uddff]){2}",f="[\\ud800-\\udbff][\\udc00-\\udfff]",p="[A-Z\\xc0-\\xd6\\xd8-\\xde]",d="(?:"+c+"|"+u+")",m="(?:"+p+"|"+u+")",g="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",$="[\\ufe0e\\ufe0f]?"+g+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",l,f].join("|")+")[\\ufe0e\\ufe0f]?"+g+")*",x="(?:"+["[\\u2700-\\u27bf]",l,f].join("|")+")"+$,h=RegExp("['’]","g"),b=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),y=RegExp([p+"?"+c+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[a,p,"$"].join("|")+")",m+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[a,p+d,"$"].join("|")+")",p+"?"+d+"+(?:['’](?:d|ll|m|re|s|t|ve))?",p+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",s,x].join("|"),"g"),v=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,j="object"==typeof self&&self&&self.Object===Object&&self,w="object"==typeof t&&t&&t.Object===Object&&t||j||Function("return this")(),O=(n={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"ss"},function(e){return null==n?void 0:n[e]}),A=Object.prototype.toString,E=w.Symbol,S=E?E.prototype:void 0,V=S?S.toString:void 0;function T(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==A.call(n)}(n))return V?V.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var k=(e=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,o){for(var i=-1,r=n?n.length:0;++i<r;)t=e(t,n[i],i,n);return t}(function(n,e,t){return n=T(n),void 0===(e=e)?function(n){return v.test(n)}(n)?function(n){return n.match(y)||[]}(n):function(n){return n.match(o)||[]}(n):n.match(e)||[]}(function(n){return(n=T(n))&&n.replace(i,O).replace(b,"")}(n).replace(h,"")),e,"")});const L=n=>`This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/${n}\nExported on ${(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}`,R=n=>{if(n&&n.author){const{firstname:e,lastname:t,pseudo:o}=n.author;return o||e+" "+t}return"Inconnu"};var U={__proto__:null,getHeader:L,getAuthor:R};const C=n=>n.replace(/-/gi,"_"),I=n=>n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/&nbsp;/gi," ").trim(),z=(n,e)=>`{ ${e[n.condition.params].inkVar}:\n  -> ${C(n.condition.next)}\n- else:\n  -> ${C(n.next)}\n}\n`,_=(n,e,t="")=>{const{inkVar:o,desc:i}=e[n.action.params];return`\n${t}~ ${o} = !${o}\n${t}{ ${o}:\n${t}  <h4><em>Objet récupéré</em> : ${i}</h4>\n${t}- else:\n${t}  <h4><em>Objet perdu</em> : ${i}</h4>\n${t}}\n`},q=n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={inkVar:"_"+C(k(n.label)),...n};let s=`/*\n${L(e)}\n*/\n\n# author: ${R(t)}\n# title: ${t.name}\n`;t.image&&(s+=`# IMAGE: ${t.image.replace(/\//gi,"\\/")}\n<em>Crédit photo : <a href="${"https://unsplash.com".replace(/\//gi,"\\/")}">Unsplash</a></em>\n`),s+="<em>"+t.description+"</em>\n<hr/>\n";const c=Object.entries(a).map(([n,e])=>e);for(let n of c)s+="VAR "+n.inkVar+" = false\n";s+="\n-> "+C(o)+"\n";for(let n of i){const e=I(n.content);if(s+="\n=== "+C(n.id)+" ===\n",s+=e+"\n",n.choices&&n.choices.length>0){for(let e of n.choices){let n=" ";e.action&&e.action.params&&"string"==typeof e.action.params&&(n=_(e,a,"\t"));let t="* ["+I(e.content)+"]"+n;s+=e.condition&&e.condition.next&&e.condition.params?`${t} ${z(e,a)}`:t+"-> "+C(e.next)+"\n"}s+="# CLEAR\n"}else n.action&&n.action.params&&"string"==typeof n.action.params&&(s+=_(n,a)),s+=n.condition&&n.condition.next&&n.condition.params?z(n,a):n.next?"-> "+C(n.next)+"\n":"-> END\n"}return s};var Z="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),D=new Uint8Array(16);function M(){if(!Z)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return Z(D)}for(var N=[],G=0;G<256;++G)N[G]=(G+256).toString(16).substr(1);function H(n,e,t){var o=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var i=(n=n||{}).random||(n.rng||M)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e)for(var r=0;r<16;++r)e[o+r]=i[r];return e||function(n,e){var t=0;return[N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]]].join("")}(i)}const W=n=>n.replace(/-/gi,"_"),P=n=>n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").trim(),Y=n=>n.replace(/"/gi,'\\"'),J=(n,e,t="goto")=>`(if: ${e[n.condition.params].tweeVar})[(${t}: "${W(n.condition.next)}")]\n(else:)[(${t}: "${W(n.next)}")]\n`,B=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?W(n.next):null,r=Y(P(n.content));if(o){const{tweeVar:n,desc:t}=e[o];return`(link: "${r}")[(set: ${n} to not ${n}, $actionText to "${Y(t)}", $actionPassage to "${i}", $isObjectWin to ${n})[(goto: "Toggle-Object")]]\n`}return t?`(link: "${r}")[${J(n,e)}]\n`:i?`(link: "${r}")[(goto: "${i}")]\n`:""},F=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?W(n.next):null;if(o){const{tweeVar:n,desc:t}=e[o];return`(set: ${n} to not ${n}, $actionText to "${Y(t)}", $actionPassage to "${i}", $isObjectWin to ${n})[(display: "Toggle-Object")]\n`}return t?J(n,e,"display")+"\n":i?`(display: "${i}")\n`:""},K=(n,e)=>{if("harlowe"===e)return(n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={tweeVar:"$"+W(k(n.label)),...n};let s=`\x3c!--\n${L(e)}\n--\x3e\n\n:: StoryAuthor\n${R(t)}\n\n:: StoryTitle\n${t.name}\n\n:: StorySubtitle\n${t.description}\n\n:: StoryData\n{\n  "ifid": "${H()}",\n  "format": "Harlowe",\n  "format-version": "3.1.0",\n  "start": "${W(o)}",\n  "zoom": 1\n}\n\n`;const c=Object.entries(a).map(([n,e])=>e);let u="(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n";for(let n of c)u+="(set: "+n.tweeVar+" to false)\n";for(let n of i){const e=P(n.content);if(s+="\n:: "+W(n.id)+"\n"+e+"\n",n.choices&&n.choices.length>0)for(let e of n.choices)s+=B(e,a);else s+=F(n,a);n.id===o&&(s+=u)}return s+="\n:: Toggle-Object\n(if: $isObjectWin)[Objet récupéré : {$actionText}]\n(else:)[Objet perdu : {$actionText}]\n(display: $actionPassage)\n",s})(n);throw new Error("This format is unvailable!")},Q=n=>n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b)>)/gi,"**").replace(/(<([/]*)(em)>)/gi,"_").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi,"+n+").replace(/(&nbsp;)+/gi," ").trim(),X=n=>{const{meta:e,firstSequence:t,sequences:o,assets:i,sounds:r}=n,a=n=>o.findIndex(e=>e.id===n)+1;let s={};for(let n of i)s[n.id]={storyVar:(c=k(n.label),c.replace(/-/gi,"_")),...n};var c;const u=[],l=[];let f=o.length+1;for(let n of o){let o="";const i=Q(n.content);if(o+=a(n.id)+" "+n.id+"\n",n.soundLoop&&n.soundLoop.sound){const e=r.find(e=>e.id===n.soundLoop.sound);e&&e.sound&&e.sound.previews&&e.sound.previews["preview-lq-mp3"]&&(o+="<<"+e.sound.previews["preview-lq-mp3"]+">>")}if(n.id===t&&(e.image&&(o+=`[[${e.image}]]+n+&&\nCrédit photo : Unsplash+n+&&\n`),o+=`Une histoire de ${R(e).trim()}+n++n+&&\n`,o+=e.description+"+n++n+&&\n"),o+="[["+i.split("\n").map(n=>n+"+n+").join("")+"]]",n.choices&&n.choices.length>0){const e=[];for(let t of n.choices)if(t.condition&&t.condition.next&&t.condition.params)l.push({id:f,events:[`997|${s[t.condition.params].storyVar}|${a(t.condition.next)}|null\n`,`997|null|${a(t.next)}|null\n`]}),o+=`+n+&&\n${Q(t.content)} (${f})`,e.push(f),++f;else{const n=a(t.next);if(t.action&&t.action.params&&"string"==typeof t.action.params){const i=s[t.condition.params];l.push({id:f,action:`${i.storyVar}|invisible|null|${i.desc.trim()}|null`,events:[`997|null|${n}|null\n`]}),o+=`+n+&&\n${Q(t.content)} (${f})`,e.push(f),++f}else o+=`+n+&&\n${Q(t.content)} (${n})`,e.push(n)}if(e.length>0){o+="\n|\n";for(let n of e)o+=n+"\n"}}else if(n.final||!n.next)o+="\n|\n",o+=n.final&&n.isHappyEnd?"999|Tu as gagné ! Bravo !\n":"998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n";else if(o+="\n|\n",n.action&&n.action.params&&"string"==typeof n.action.params){const e=s[n.action.params];l.push({id:f,action:`${e.storyVar}|invisible|null|${e.desc.trim()}|null`,events:[`997|null|${a(n.next)}|null\n`]}),o+=`997|null|${f}|null\n`,++f}else n.condition&&(o+=`997|${s[n.condition.params].storyVar}|${a(n.condition.next)}|null\n`),o+=`997|null|${a(n.next)}|null\n`;o+="*****",u.push({id:n.id,room:o})}for(let{id:n,events:e,action:t,content:o="null"}of l){let i=n+" special-room-"+n+"\n";i+=o+"\n",i+=t||"|",i+="\n"+e.join(""),i+="*****",u.push({id:n,room:i})}return e.name+"\n"+u.length+"\n"+u.map(({room:n})=>n).join("\n")};var nn="0.0.7";export{q as convertToInk,X as convertToJdrBot,K as convertToTwee,U as utils,nn as version};
//# sourceMappingURL=moiki-exporter.modern.js.map
