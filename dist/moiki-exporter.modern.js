var n,e,t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},o=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,i=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,r="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",a="["+r+"]",s="\\d+",c="[a-z\\xdf-\\xf6\\xf8-\\xff]",l="[^\\ud800-\\udfff"+r+s+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",u="(?:\\ud83c[\\udde6-\\uddff]){2}",p="[\\ud800-\\udbff][\\udc00-\\udfff]",d="[A-Z\\xc0-\\xd6\\xd8-\\xde]",f="(?:"+c+"|"+l+")",g="(?:"+d+"|"+l+")",m="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",$="[\\ufe0e\\ufe0f]?"+m+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",u,p].join("|")+")[\\ufe0e\\ufe0f]?"+m+")*",h="(?:"+["[\\u2700-\\u27bf]",u,p].join("|")+")"+$,x=RegExp("['’]","g"),b=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),y=RegExp([d+"?"+c+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[a,d,"$"].join("|")+")",g+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[a,d+f,"$"].join("|")+")",d+"?"+f+"+(?:['’](?:d|ll|m|re|s|t|ve))?",d+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",s,h].join("|"),"g"),j=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,T="object"==typeof self&&self&&self.Object===Object&&self,v="object"==typeof t&&t&&t.Object===Object&&t||T||Function("return this")(),O=(n={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"ss"},function(e){return null==n?void 0:n[e]}),w=Object.prototype.toString,_=v.Symbol,S=_?_.prototype:void 0,E=S?S.toString:void 0;function A(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==w.call(n)}(n))return E?E.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var V=(e=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,o){for(var i=-1,r=n?n.length:0;++i<r;)t=e(t,n[i],i,n);return t}(function(n,e,t){return n=A(n),void 0===(e=e)?function(n){return j.test(n)}(n)?function(n){return n.match(y)||[]}(n):function(n){return n.match(o)||[]}(n):n.match(e)||[]}(function(n){return(n=A(n))&&n.replace(i,O).replace(b,"")}(n).replace(x,"")),e,"")});const I=n=>`This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/${n}\nExported on ${(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}`,q=n=>{if(n&&n.author){const{firstname:e,lastname:t,pseudo:o}=n.author;return o||e+" "+t}return"Inconnu"};var C={__proto__:null,getHeader:I,getAuthor:q,simplifyStory:({sequences:n,firstSequence:e},t,o)=>{const i={},r=(n,e,t=!1)=>{i[n]||(i[n]={in:[],to:[]}),t?i[n].in.push(e):(i[n].to.push(e),r(e,n,!0))},a={};for(let e of n)if(a[e.id]=e,e.choices&&e.choices.length>0)for(let n of e.choices)n.content=o(n.content),n.condition&&n.condition.next&&n.condition.params&&r(e.id,n.condition.next),n.next&&r(e.id,n.next);else e.condition&&e.condition.next&&e.condition.params&&r(e.id,e.condition.next),e.next&&r(e.id,e.next);const s=[a[e]],c=Object.entries(i).map(([n,e])=>({data:e,index:n}));for(let n of c)(n.data.in.length>1||1===n.data.in.length&&i[n.data.in[0]].to.length>1)&&n.index!==e&&s.push(a[n.index]);for(let n of s){let e=n.id;const r=[a[e]];for(;1===i[e].to.length;)e=i[e].to[0],r.push(a[e]);n.chain=r;const s=[];for(let n of r)s.push(n),n.action&&n.action.params&&"string"==typeof n.action.params&&s.push({objectAction:t[n.action.params]});const c=[];let l="";for(let n of s)n.objectAction?(l&&(c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),l=""),c.push(n.objectAction)):l+=o(n.content)+" ";l&&c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),n.chainedContent=c}return s.forEach(n=>{n.chain=n.chain.map(({...n})=>({...n}))}),s}};const k=n=>n.replace(/-/gi,"_"),L=n=>n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),R=(n,e)=>`{ ${e[n.condition.params].inkVar}:\n  -> ${k(n.condition.next)}\n- else:\n  -> ${k(n.next)}\n}\n`,U=(n,e,t="")=>{const{inkVar:o,desc:i}=e[n.action.params];return`\n${t}~ ${o} = !${o}\n${t}{ ${o}:\n${t}  <h4><em>Objet récupéré</em> : ${i}</h4>\n${t}- else:\n${t}  <h4><em>Objet perdu</em> : ${i}</h4>\n${t}}\n`},G=n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={inkVar:"_"+k(V(n.label)),...n};let s=`/*\n${I(e)}\n*/\n\n# author: ${q(t)}\n# title: ${t.name}\n`;t.image&&(s+=`# IMAGE: ${t.image.replace(/\//gi,"\\/")}\n<em>Crédit photo : <a href="${"https://unsplash.com".replace(/\//gi,"\\/")}">Unsplash</a></em>\n`),s+="<em>"+t.description+"</em>\n<hr/>\n";const c=Object.entries(a).map(([n,e])=>e);for(let n of c)s+="VAR "+n.inkVar+" = false\n";s+="\n-> "+k(o)+"\n";for(let n of i){const e=L(n.content);if(s+="\n=== "+k(n.id)+" ===\n",s+=e+"\n",n.choices&&n.choices.length>0){for(let e of n.choices){let n=" ";e.action&&e.action.params&&"string"==typeof e.action.params&&(n=U(e,a,"\t"));let t="* ["+L(e.content)+"]"+n;s+=e.condition&&e.condition.next&&e.condition.params?`${t} ${R(e,a)}`:t+"-> "+k(e.next)+"\n"}s+="# CLEAR\n"}else n.action&&n.action.params&&"string"==typeof n.action.params&&(s+=U(n,a)),s+=n.condition&&n.condition.next&&n.condition.params?R(n,a):n.next?"-> "+k(n.next)+"\n":"-> END\n"}return s};var P="0.1.5";const z=n=>n.replace(/-/gi,"_"),D=n=>n.replace(/(<\/*(strong|b)>)/gi,"").replace(/(<\/*(em)>)/gi,"").replace(/(<\/*(h\d)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/<\/p>/gi,"</p> ").replace(/<\/*p>/gi,"").replace(/(<\/*(span)>)/gi,"").replace(/(\s)+/gi," ").replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi,"^").replace(/(\s)*&nbsp;(\s)*/gi," ").replace(/(\"|“|”)/gim,"~").replace(/\^/gim,"@@94").trim(),Z=n=>{switch(n){case 0:return"w_to";case 1:return"s_to";case 2:return"e_to";case 3:return"n_to";default:throw new Error("Only 4 choices are allowed here...")}},N=(n,e)=>n.action&&n.action.params&&"string"==typeof n.action.params?`[; ${e[n.action.params].identifier}=true; print "${e[n.action.params].desc}^"; PlayerTo(${z(n.next)}); rtrue;]`:n.condition&&n.condition.next&&n.condition.params?`[; if (${e[n.condition.params].identifier}) PlayerTo(${z(n.condition.next)}); else PlayerTo(${z(n.next)}); rtrue;]`:z(n.next),W=(n,e)=>{const t=D(n.content);if(!n.next||n.choices&&0!==n.choices.length){if(n.choices&&n.choices.length>0){let o="";const i=[];let r=0;for(let t of n.choices)o+="- "+(r+1)+". "+D(t.content)+"^",i.push({gotoFunction:Z(r),gotoValue:N(t,e)}),++r;return`"${t}^^${o}",\n  ${i.map(n=>`${n.gotoFunction} ${n.gotoValue}`).join(",\n  ")};`}return`[; print "${t}^"; deadflag=${n.isHappyEnd?"2":"1"};];\n`}return n.action&&n.action.params&&"string"==typeof n.action.params?`[; ${e[n.action.params].identifier}=true; print "${e[n.action.params].desc}^"; PlayerTo(${z(n.next)}); rtrue;];\n`:n.condition&&n.condition.next&&n.condition.params?`[; print "${t}^"; if (${e[n.condition.params].identifier}) PlayerTo(${z(n.condition.next)}); else PlayerTo(${z(n.next)});];\n`:`[; print "${t}^"; PlayerTo(${z(n.next)});];\n`},H=n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={identifier:"_"+z(V(n.label)),...n};const s=Object.entries(a).map(([n,e])=>e);let c=`!% !-s\n\n! ${I(e).split("\n").join("\n! ")}\n\n! author: ${q(t)}\n! title: ${t.name}\n\nConstant Story "${t.name}";\nConstant Headline "^${t.description}^^Une histoire de ${q(t)}.^^Cette histoire à été exporté avec Moiki Exporter v.${version}^La version originelle est accessible ici : https://moiki.fr/story/${e}^";\nRelease 1;\n\nInclude "parser";\n\n! Add a prefix to every commands to shortcut the lib. credit: @hlabrande\n[ BeforeParsing pos ;\n  #Ifdef TARGET_ZCODE;\n    pos = parse->5;\n  #Ifnot; ! TARGET_GLULX\n    pos = parse->3;\n  #Endif; ! TARGET_\n  LTI_Insert(pos, 'c');\n  LTI_Insert(pos+1, 'h');\n  LTI_Insert(pos+2, 'o');\n  LTI_Insert(pos+3, 'i');\n  LTI_Insert(pos+4, 'x');\n  LTI_Insert(pos+5, ' ');\n  Tokenise__(buffer, parse);\n\n];\n\nInclude "verblib";\n\n! Wait for player to press a key. credit: @FibreTigre.\n[ attend notNeeded;\n  @read_char 1 notNeeded;\n  rtrue;\n];\n`;s.length>0&&(c+=`\n! Variables for Objects / Heroes\n!-------------------------------------------\n${s.map(n=>"Global "+n.identifier+" = false").join(";\n")};\n`),c+='\n! Start story\n! ------------------------------------------\n\nClass sequence\n  with cant_go [; print "Choix non reconnu, veuillez recommencer.^"; <<Look>>; ];\n\n';for(let n of i)c+=`\nSequence ${z(n.id)} ""\nwith name "${z(n.id)}",\n  description ${W(n,a)}\n`;return c+=`\n\n! Routines\n!-----------------------------------\n\n[ Initialise;\n  location = ${z(o)};\n  give player light;\n  introduction();\n  lookmode=2; ! les lieux déjà visités sont décrits à chaque fois\n  return;\n];\n\n[ introduction;\n  style underline;\n  print "Ce jeu ne se joue qu'en tapant les chiffres de vos choix.^De ce fait, vous ne pourrez ni sauver ni quitter de manière classique.^^";\n  attend();\n];\n\n[ DeathMessage;\n  switch (deadflag) {\n    1: print "Fin Tragique !";\n    2: print "Fin Heureuse !";\n  }\n];\n\n\n! Grammar\n!-----------------------------------\n\nInclude "FrenchG";\n\n[ ChoixNumberSub ;\n  if (noun == 1) <<Go w_obj>>;\n  if (noun == 2) <<Go s_obj>>;\n  if (noun == 3) <<Go e_obj>>;\n  if (noun == 4) <<Go n_obj>>;\n  print "Choix non reconnu, veuillez recommencer.^";\n];\n\nVerb 'choix'\n* number        ->choixNumber;\n`,c};var M="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),F=new Uint8Array(16);function Y(){if(!M)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return M(F)}for(var B=[],J=0;J<256;++J)B[J]=(J+256).toString(16).substr(1);function K(n,e,t){var o=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var i=(n=n||{}).random||(n.rng||Y)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e)for(var r=0;r<16;++r)e[o+r]=i[r];return e||function(n,e){var t=0;return[B[n[t++]],B[n[t++]],B[n[t++]],B[n[t++]],"-",B[n[t++]],B[n[t++]],"-",B[n[t++]],B[n[t++]],"-",B[n[t++]],B[n[t++]],"-",B[n[t++]],B[n[t++]],B[n[t++]],B[n[t++]],B[n[t++]],B[n[t++]]].join("")}(i)}const X=n=>n.replace(/-/gi,"_"),Q=n=>n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),nn=n=>n.replace(/"/gi,'\\"'),en=(n,e,t="goto")=>`(if: ${e[n.condition.params].tweeVar})[(${t}: "${X(n.condition.next)}")]\n(else:)[(${t}: "${X(n.next)}")]\n`,tn=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?X(n.next):null,r=nn(Q(n.content));if(o){const{tweeVar:n,desc:t}=e[o];return`(link: "${r}")[(set: ${n} to not ${n}, $actionText to "${nn(t)}", $actionPassage to "${i}", $isObjectWin to ${n})[(goto: "Toggle-Object")]]\n`}return t?`(link: "${r}")[${en(n,e)}]\n`:i?`(link: "${r}")[(goto: "${i}")]\n`:""},on=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?X(n.next):null;if(o){const{tweeVar:n,desc:t}=e[o];return`(set: ${n} to not ${n}, $actionText to "${nn(t)}", $actionPassage to "${i}", $isObjectWin to ${n})[(display: "Toggle-Object")]\n`}return t?en(n,e,"display")+"\n":i?`(display: "${i}")\n`:""},rn=n=>n.replace(/-/gi,"_"),an=n=>n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),sn=n=>n.replace(/"/gi,'\\"'),cn=(n,e,t=null)=>{const o=t?`[[${t}|${rn(n.condition.next)}]]`:`<<include "${rn(n.condition.next)}">>`,i=t?`[[${t}|${rn(n.next)}]]`:`<<include "${rn(n.next)}">>`;return`<<if ${e[n.condition.params].tweeVar}>>\n  ${o}\n<<else>>\n  ${i}\n<</if>>\n`},ln=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?rn(n.next):null,r=sn(an(n.content));if(o){const{tweeVar:n,desc:t}=e[o];return`[[${r}|Toggle-Object][${n} to not ${n}; $actionText to "${sn(t)}"; $actionPassage to "${i}"; $isObjectWin to ${n}]]\n`}return t?cn(n,e,r)+"\n":i?`[[${r}|${i}]]\n`:""},un=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,o=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?rn(n.next):null;if(o){const{tweeVar:n,desc:t}=e[o];return`<<set ${n} to not ${n}; $actionText to "${sn(t)}"; $actionPassage to "${i}"; $isObjectWin to ${n}>>\n<<include "Toggle-Object">>\n`}return t?cn(n,e)+"\n":i?`<<include "${i}">>\n`:""},pn=(n,e)=>{if("harlowe"===e)return(n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={tweeVar:"$"+X(V(n.label)),...n};let s=`\x3c!--\n${I(e)}\n--\x3e\n\n:: StoryAuthor\n${q(t)}\n\n:: StoryTitle\n${t.name}\n\n:: StorySubtitle\n${t.description}\n\n:: StoryData\n{\n  "ifid": "${K()}",\n  "format": "Harlowe",\n  "format-version": "3.1.0",\n  "start": "${X(o)}",\n  "zoom": 1\n}\n\n`;const c=Object.entries(a).map(([n,e])=>e);let l="(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n";for(let n of c)l+="(set: "+n.tweeVar+" to false)\n";for(let n of i){const e=Q(n.content);if(s+="\n:: "+X(n.id)+"\n"+e+"\n",n.choices&&n.choices.length>0)for(let e of n.choices)s+=tn(e,a);else s+=on(n,a);n.id===o&&(s+=l)}return s+="\n:: Toggle-Object\n(if: $isObjectWin)[Objet récupéré : {$actionText}]\n(else:)[Objet perdu : {$actionText}]\n(display: $actionPassage)\n",s})(n);if("sugarcube"===e)return(n=>{const{_id:e,meta:t,firstSequence:o,sequences:i,assets:r}=n;let a={};for(let n of r)a[n.id]={tweeVar:"$"+rn(V(n.label)),...n};let s=`\x3c!--\n${I(e)}\n--\x3e\n\n:: StoryAuthor\n${q(t)}\n\n:: StoryTitle\n${t.name}\n\n:: StorySubtitle\n${t.description}\n\n:: StoryData\n{\n  "ifid": "${K()}",\n  "format": "SugarCube",\n  "format-version": "2.31.1",\n  "start": "${rn(o)}",\n  "zoom": 1\n}\n\n`;const c=Object.entries(a).map(([n,e])=>e);let l="<<set $actionText to false; $actionPassage to false; $isObjectWin to false>>\n";for(let n of c)l+="<<set "+n.tweeVar+" to false>>\n";for(let n of i){const e=an(n.content);if(s+="\n:: "+rn(n.id)+"\n"+e+"\n",n.choices&&n.choices.length>0)for(let e of n.choices)s+=ln(e,a);else s+=un(n,a);n.id===o&&(s+=l)}return s+="\n:: Toggle-Object\n<<if $isObjectWin>>\n  récupéré : $actionText\n<<else>>\n  perdu : $actionText\n<</if>>\n<<include [[$actionPassage]]>>\n",s})(n);throw new Error("This format is unvailable!")},dn=n=>n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<([/]*)(strong|b|h\d)>)/gi,"**").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/(<([/]*)(em)>)/gi,"_").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi,"+n+").replace(/(&nbsp;)+/gi," ").replace(/(\s)+/gi," ").trim(),fn=n=>{const{meta:e,firstSequence:t,sequences:o,assets:i}=n,r=n=>o.findIndex(e=>e.id===n)+2;let a={};for(let n of i)a[n.id]={storyVar:(s=V(n.label),s.replace(/-/gi,"_")),...n};var s;const c=[],l=[];let u=o.length+2;const p=(n,e)=>{const t=u;return l.push({id:t,events:[`997|${n.storyVar}|${t+2}|null\n`,`997|null|${t+1}|null\n`]}),l.push({id:t+1,action:`${n.storyVar}|invisible|null|récupéré: ${n.desc.trim()}|null`,events:[`997|null|${e}|null\n`]}),l.push({id:t+2,action:`-${n.storyVar}|invisible|null|perdu: ${n.desc.trim()}|null`,events:[`997|null|${e}|null\n`]}),u+=3,t};let d="1 _start_\n";e.image&&(d+=`[[${e.image}]]+n+&&\nCrédit photo : Unsplash+n+&&\n`),d+=`Une histoire de ${q(e).trim()}+n+&&\n`,d+="(exporté via https://moiki.fr)+n++n+&&\n",d+=e.description+"\n|\n",d+=`997|null|${r(t)}|null\n`,d+="*****",c.push({id:"$start",room:d});for(let n of o){let e="";const t=dn(n.content);if(e+=r(n.id)+" "+n.id+"\n",e+="[["+t.split("\n").map(n=>n+"+n+").join("")+"]]",n.choices&&n.choices.length>0){const t=[];let o=1;for(let i of n.choices){const n=r(i.next);if(i.condition&&i.condition.next&&i.condition.params)l.push({id:u,events:[`997|${a[i.condition.params].storyVar}|${r(i.condition.next)}|null\n`,`997|null|${n}|null\n`]}),e+=`+n+&&\n${dn(i.content)} (${o})`,t.push(u),++u;else if(i.action&&i.action.params&&"string"==typeof i.action.params){const r=p(a[i.action.params],n);e+=`+n+&&\n${dn(i.content)} (${o})`,t.push(r)}else e+=`+n+&&\n${dn(i.content)} (${o})`,t.push(n);++o}if(t.length>0){e+="\n|\n",o=1;for(let n of t)e+=o+"->"+n+"\n",++o}}else if(n.final||!n.next)e+="\n|\n",e+=n.final&&n.isHappyEnd?"999|Tu as gagné ! Bravo !\n":"998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n";else{const t=r(n.next);e+="\n|\n",n.action&&n.action.params&&"string"==typeof n.action.params?e+=`997|null|${p(a[n.action.params],t)}|null\n`:(n.condition&&(e+=`997|${a[n.condition.params].storyVar}|${r(n.condition.next)}|null\n`),e+=`997|null|${t}|null\n`)}e+="*****",c.push({id:n.id,room:e})}for(let{id:n,events:e,action:t}of l){let o=n+" condition-room-"+n+"\n";o+="null\n",o+=t||"|",o+="\n"+e.join(""),o+="*****",c.push({id:n,room:o})}return e.name+"\n"+c.length+"\n"+c.map(({room:n})=>n).join("\n")+"\n1§1️⃣|2§2️⃣|3§3️⃣"};export{H as convertToInform,G as convertToInk,fn as convertToJdrBot,pn as convertToTwee,C as utils,P as version};
//# sourceMappingURL=moiki-exporter.modern.js.map