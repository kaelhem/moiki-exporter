function n(){return(n=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n}).apply(this,arguments)}function e(n,e){if(null==n)return{};var t,i,r={},o=Object.keys(n);for(i=0;i<o.length;i++)e.indexOf(t=o[i])>=0||(r[t]=n[t]);return r}const t=n=>{const e=n.meta.version||1;switch(n.meta.version=2,e){case 1:return o(n);default:return r(n)}},i=n=>{const{_id:e,meta:t,firstSequence:i,sequences:r,theme:o,assets:s=[],sounds:a=[],counters:u=[],stats:c={numView:0}}=n;return{_id:e,meta:t,theme:o,firstSequence:i||(r&&r.length>0?r[0].id:"intro"),sequences:r&&r.length>0?r:[{id:"intro",content:""}],counters:u,assets:s,sounds:a,stats:c}},r=n=>i(n),o=t=>{const r=i(t);return n({},r,{meta:n({},r.meta,{simplified:!0}),sequences:r.sequences.map(n=>{const{_doc:t}=n,i=t||n,{action:r,condition:o}=i,s=e(i,["action","condition"]);return r&&r.params&&(s.actions=[{kind:"object",params:{target:r.params,modifier:"toggle"}}]),o&&o.params&&o.next&&(s.conditions=[{kind:"object",query:{params:[{target:o.params,condition:"with"}]},next:o.next}]),s.choices&&s.choices.length>0&&(s.choices=s.choices.map(n=>{const{_doc:t}=n,i=t||n,{action:r,condition:o}=i,s=e(i,["action","condition"]);return r&&r.params&&(s.actions=[{kind:"object",params:{target:r.params,modifier:"toggle"}}]),o&&o.params&&o.next&&(s.conditions=[{kind:"object",query:{params:[{target:o.params,condition:"with"}]},next:o.next}]),s})),s})})};var s,a,u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,l=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,d="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",f="["+d+"]",m="\\d+",h="[a-z\\xdf-\\xf6\\xf8-\\xff]",p="[^\\ud800-\\udfff"+d+m+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",_="(?:\\ud83c[\\udde6-\\uddff]){2}",g="[\\ud800-\\udbff][\\udc00-\\udfff]",T="[A-Z\\xc0-\\xd6\\xd8-\\xde]",S="(?:"+h+"|"+p+")",C="(?:"+T+"|"+p+")",O="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",E="[\\ufe0e\\ufe0f]?"+O+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",_,g].join("|")+")[\\ufe0e\\ufe0f]?"+O+")*",R="(?:"+["[\\u2700-\\u27bf]",_,g].join("|")+")"+E,x=RegExp("['’]","g"),$=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),b=RegExp([T+"?"+h+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[f,T,"$"].join("|")+")",C+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[f,T+S,"$"].join("|")+")",T+"?"+S+"+(?:['’](?:d|ll|m|re|s|t|ve))?",T+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",m,R].join("|"),"g"),N=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,I="object"==typeof self&&self&&self.Object===Object&&self,A="object"==typeof u&&u&&u.Object===Object&&u||I||Function("return this")(),w=(s={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"ss"},function(n){return null==s?void 0:s[n]}),y=Object.prototype.toString,M=A.Symbol,k=M?M.prototype:void 0,L=k?k.toString:void 0;function D(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==y.call(n)}(n))return L?L.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var v=(a=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,i){for(var r=-1,o=n?n.length:0;++r<o;)t=e(t,n[r],r,n);return t}(function(n,e,t){return n=D(n),void 0===(e=e)?function(n){return N.test(n)}(n)?function(n){return n.match(b)||[]}(n):function(n){return n.match(c)||[]}(n):n.match(e)||[]}(function(n){return(n=D(n))&&n.replace(l,w).replace($,"")}(n).replace(x,"")),a,"")});const U=n=>`This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/${n}\nExported on ${(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}`,j=n=>{if(n&&n.author){const{firstname:e,lastname:t,pseudo:i}=n.author;return i||e+" "+t}return"Inconnu"};var P={__proto__:null,getHeader:U,getAuthor:j,simplifyStory:({sequences:t,firstSequence:i},r,o)=>{const s={},a=(n,e,t=!1)=>{s[n]||(s[n]={in:[],to:[]}),t?s[n].in.push(e):(s[n].to.push(e),a(e,n,!0))},u={};for(let n of t)if(u[n.id]=n,n.choices&&n.choices.length>0)for(let e of n.choices){if(e.content=o(e.content),e.conditions&&e.conditions.length>0)for(let t of e.conditions)t.next&&a(n.id,t.next);e.next&&a(n.id,e.next)}else{if(n.conditions&&n.conditions.length>0)for(let e of n.conditions)e.next&&a(n.id,e.next);n.next&&a(n.id,n.next)}const c=[u[i]],l=Object.entries(s).map(([n,e])=>({data:e,index:n}));for(let n of l)(n.data.in.length>1||1===n.data.in.length&&s[n.data.in[0]].to.length>1)&&n.index!==i&&c.push(u[n.index]);for(let e of c){let t=e.id;const i=[u[t]];for(;1===s[t].to.length;)t=s[t].to[0],i.push(u[t]);e.chain=i;const a=[];for(let n of i)a.push(n),n.actions&&1===n.actions.length&&n.actions[0]&&n.actions[0].params&&a.push({objectAction:r[n.actions[0].params.target],kind:n.actions[0].kind});const c=[];let l="";for(let e of a)e.objectAction?(l&&(c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),l=""),c.push(n({},e.objectAction,{actionKind:e.kind}))):l+=o(e.content)+" ";l&&c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),e.chainedContent=c}return c.forEach(t=>{t.chain=t.chain.map(t=>n({},e(t,["chain","chainedContent"])))}),c}};const V=n=>n.replace(/-/gi,"_"),Y=n=>n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),G=e=>{const{_id:t,meta:i,firstSequence:r,sequences:o,assets:s,counters:a}=e;let u={};for(let e of s)u[e.id]=n({inkVar:"_object_"+V(v(e.label))},e);let c={};for(let e of a)c[e.id]=n({inkVar:"_counter_"+V(v(e.name))},e);const l=(n,e,t)=>{const[{condition:i,target:r,value:o}]=e;switch(n){case"object":return((n,e)=>{const{inkVar:t}=u[e];switch(n){case"with":return t;case"without":return"not "+t;default:console.warn("This type of object condition is unknown:",n)}return null})(i,r);case"counter":return((n,e,t)=>{const{inkVar:i}=c[e];if(isNaN(t)||"number"!=typeof t)return console.warn("The value of this counter condition is invalid:",t),null;switch(n){case"=":case"!=":case"<":case"<=":case">":case">=":return`${i} ${n} ${t}`;default:console.warn("This type of counter condition is unknown:",n)}return null})(i,r,o);case"passage":return((n,e)=>{switch(n){case"by":return""+V(e);case"not-by":return"not "+V(e);default:console.warn("This type of passage condition is unknown:",n)}return null})(i,r);case"multiple":{const n=(n=>{const e=[];for(let t of n){const{kind:n,condition:i,target:r,value:o}=t;e.push(l(n,[{condition:i,target:r,value:o}]))}return e.filter(n=>null!==n)})(e);return n&&n.length>0?n.join("and"===t?" && ":" || "):null}default:console.warn("This kind of condition is unknown:",n)}},d=(n,e,t=!1)=>{const i=n.map(n=>{const{kind:e,next:t,query:{params:i,operator:r=null}}=n;return{cond:l(e,i,r),next:t}});let r=null;return i&&i.length>0&&(r=[...i,{cond:"else",next:e}].map(({cond:n,next:e})=>`- ${n}:\n  -> ${V(e)}`).join("\n").replace(/\n/g,"\n  ")),r?`${t?"\n":""}{\n  ${r}\n}\n`:`-> ${V(e)} \n`},f=({kind:n,params:e})=>{switch(n){case"object":return(({target:n,modifier:e})=>{const{inkVar:t,label:i,desc:r}=u[n];switch(e){case"toggle":return[`~ ${t} = !${t}`,`{ ${t}:`,`  <em>Objet récupéré : ${i} - "${r}"</em>`,"- else:",`  <em>Objet perdu : ${i} - "${r}"</em>`,"}"];case"add":return[`{ not ${t}:`,`  ~ ${t} = true`,`  <em>Objet récupéré : ${i} - "${r}"</em>`,"}"];case"sub":return[`{ ${t}:`,`  ~ ${t} = false`,`  <em>Objet perdu : ${i} - "${r}"</em>`,"}"];default:console.warn("This action modifier is unknown:",e)}return null})(e);case"counter":return(({target:n,modifier:e,value:t})=>{const{inkVar:i,name:r,gauge:o}=c[n];switch(e){case"set":{const n=[`~ ${i} = ${t}`];return o?[...n,`<em>${r} vaut maintenant : ${t}</em>`]:n}case"add":{const n=[`~ ${i} += ${t}`];return o?[...n,`<em>${r} augmente de ${t} et vaut maintenant : {${i}}</em>`]:n}case"sub":{const n=[`~ ${i} -= ${t}`];return o?[...n,`<em>${r} diminue de ${t} et vaut maintenant : {${i}}</em>`]:n}default:console.warn("This action modifier is unknown:",e)}return null})(e);default:console.warn("This kind of action is unknown:",n)}},m=n=>{const e=[];for(let t of n){const n=f(t);n&&e.push(n.join("\n"))}return e&&e.length>0?e.join("\n")+"\n":null};let h=`/*\n${U(t)}\n*/\n\n# author: ${j(i)}\n# title: ${i.name}\n`;i.image&&(h+=`# IMAGE: ${i.image.replace(/\//gi,"\\/")}\n<em>Crédit photo : <a href="${"https://unsplash.com".replace(/\//gi,"\\/")}">Unsplash</a></em>\n`),h+="<em>"+i.description+"</em>\n<hr/>\n";const p=Object.entries(u).map(([n,e])=>e);for(let{inkVar:n}of p)h+="VAR "+n+" = false\n";const _=Object.entries(c).map(([n,e])=>e);for(let{inkVar:n,defaultValue:e=0}of _)h+=`VAR ${n} = ${e}\n`;h+="\n-> "+V(r)+"\n";for(let n of o){const e=Y(n.content);if(h+="\n=== "+V(n.id)+" ===\n",h+=e+"\n",n.choices&&n.choices.length>0){for(let e of n.choices){let n=" ";e.actions&&e.actions.length>0&&(n=m(e.actions));let t="+ ";if(e.showCondition&&e.showCondition.kind){const{kind:n,query:{params:i,operator:r=null}}=e.showCondition;t+="{"+l(n,i,r)+"} "}let i=t+"["+Y(e.content)+"]"+n;h+=e.conditions&&e.conditions.length>0?`${i} ${d(e.conditions,e.next,!0)}`:i+"-> "+V(e.next)+"\n"}h+="# CLEAR\n"}else n.actions&&n.actions.length>0&&(h+=m(n.actions)),h+=n.conditions&&n.conditions.length>0?d(n.conditions,n.next):n.next?"-> "+V(n.next)+"\n":"-> END\n"}return h},H={lang:"fr",encoding:"utf8",asciiOnly:!0,clsPattern:"--",disablePauseOnActions:!1,disablePauseOnSimpleSequence:!1,disablePauseOnGameOver:!1,disableClearScreenOnChoice:!1,preferSeparatorThanCls:!1},F={HEADER:"Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici :",MOIKI_PRESENTS:"Moiki présente :",A_STORY_BY:"Une histoire de",COLON:" :",CMD_HELP:"AIDE",CMD_UNDO:"RETOUR",CMD_REDO:"REFAIRE",CMD_LIST:"LISTE",CMD_SHOW:"REVOIR",CMD_EXIT:"QUITTER",CMD_YES:"oui",CMD_YES_SHORT:"o",CMD_NO:"non",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"Cette saisie ne correspond à aucun choix !",LIST_OF_COMMANDS:"Liste des commandes",RESTART_GAME:"Recommencer depuis le début",LIST_OBJECTS:"Lister les objets récupérés",RESHOW_TEXT:"Afficher le texte de la dernière séquence",QUIT:"Quitter",BYE_BYE:"Bye-bye !",CONFIRM_RESTART:"Recommencer depuis le début ?",INVENTORY_LIST:"Liste des objets de l'inventaire :",INVENTORY_EMPTY:"Votre inventaire est vide !",OBJECT_WON:"Objet récupéré : ",OBJECT_LOST:"Objet perdu : ",COUNTER_SET:" vaut maintenant : ",COUNTER_ADD:" augmente de ",COUNTER_SUB:" diminue de ",WIN_GAME:"Gagné !",LOSE_GAME:"Perdu !",COMMAND_UNKNOWN_LEFT:"Cette commande est inconnue ! Tapez ~",COMMAND_UNKNOWN_RIGHT:"~ pour une liste des commandes disponibles.",DEFAULT_CONFIRM_MSG:"Etes-vous sûr de vouloir faire cette action ?",AND:"et",OR:"ou",PLEASE_ANSWER:"Veuillez répondre par ",ANOTHER_GAME:"Lancer une autre partie ?"},q={HEADER:"This story was exported with Moiki Exporter.^The original version is avalaible here:",MOIKI_PRESENTS:"Moiki presents :",A_STORY_BY:"A story by",COLON:":",CMD_HELP:"HELP",CMD_UNDO:"UNDO",CMD_REDO:"REDO",CMD_LIST:"LIST",CMD_SHOW:"SHOW",CMD_EXIT:"EXIT",CMD_YES:"yes",CMD_YES_SHORT:"y",CMD_NO:"no",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"This entry does not correspond to any choice!",LIST_OF_COMMANDS:"List of commands",RESTART_GAME:"Restart the game",LIST_OBJECTS:"List of items won",RESHOW_TEXT:"Show the text of the last sequence",QUIT:"Quit the game",BYE_BYE:"Bye bye!",CONFIRM_RESTART:"Restart from the beginning?",INVENTORY_LIST:"List of items in inventory:",INVENTORY_EMPTY:"Inventory is empty!",OBJECT_WON:"Item won : ",OBJECT_LOST:"Item lost : ",COUNTER_SET:" is now: ",COUNTER_ADD:" increases by ",COUNTER_SUB:" decreases by ",WIN_GAME:"Won!",LOSE_GAME:"Lost!",COMMAND_UNKNOWN_LEFT:"This command is unknown! Type ~",COMMAND_UNKNOWN_RIGHT:"~ for a list of available commands.",DEFAULT_CONFIRM_MSG:"Are you sure you want to take this action?",AND:"and",OR:"or",PLEASE_ANSWER:"Please answer ",ANOTHER_GAME:"Start another game?"},B=["INVENTORY_EMPTY","INVENTORY_LIST","CMD_LIST","LIST_OBJECTS","OBJECT_WON","OBJECT_LOST"];var W={__proto__:null,convertId:(n,e="story")=>n?(e?e+"_":"")+n.replace(/-/gi,"_"):null,cleanContent:n=>n.replace(/(<\/*(strong|b)>)/gi,"").replace(/(<\/*(em)>)/gi,"").replace(/(<\/*(h\d)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/<\/p>/gi,"</p> ").replace(/<\/*p>/gi,"").replace(/(<\/*(span)>)/gi,"").replace(/(\s)+/gi," ").replace(/©/gim,"(c)").replace(/@/gim,"@@64").replace(/\^/gim,"@@94").replace(/\\/gim,"@@92").replace(/~/gim,"@@126").replace(/°/gim," ").replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi,"^").replace(/(\s)*&nbsp;(\s)*/gi," ").replace(/("|“|”)/gim,"~").replace(/’/gim,"'").replace(/…/gim,"...").trim(),informDefaultSettings:H,DEFAULT_STRINGS_FR:F,DEFAULT_STRINGS_EN:q,stringsForItems:B,SPECIAL_CHARS:["…","ō","⨭","⨮","☼","¤","×","♦","█","■","▄","▲","▓","♥","◄"]};const K=(e,t,i)=>{if("inform6"===t)return((e,t={})=>{const{_id:i,meta:r,firstSequence:o,sequences:s,assets:a,counters:u}=e,{convertId:c,cleanContent:l}=W,d=n({},H,t,{lang:"fr"===r.lang?"fr":"en"}),f=n({},"fr"===d.lang?F:q,d.strings||{}),m=(n,e=1)=>`#IfV5; style ${n}; #EndIf;\n${"  ".repeat(e)}`,h=n=>m("bold",n),p=n=>m("underline",n),_=n=>m("roman",n),g=new Set([]),T=n=>{const e=l(n);let t,i=d.asciiOnly?"":e;for(let n of e)t=n.charCodeAt(0),t>255&&!d.asciiOnly?g.add(t.toString(16)):d.asciiOnly&&(t>127&&t<255?(g.add(t.toString(16)),i+=n):i+=t>255?"?":n);return i},S={},C={},O=(n,e)=>{const t=c(n,e);if(t.length>=20){if(!S[t]){const n=t.slice(0,18)+"_C";C[n]=C[n]?C[n]+1:1,S[t]=n+C[n]}return S[t]}return t},E={};for(const[e,t]of a.entries())E[t.id]=n({identifier:"_"+O(v(t.label),"")+"_"+(e+1)},t);const R=Object.entries(E).map(([n,e])=>e),x={};for(const[e,t]of u.entries())x[t.id]=n({identifier:"_"+O(v(t.name),"")+"_"+(e+1),value:t.defaultValue||0},t);const $=Object.entries(x).map(([n,e])=>e),b=n=>{const e=[];if(n&&n.length>0)for(let t of n){const{kind:n,query:{params:i}}=t;if("passage"===n){const[{target:n}]=i;e.push(n)}else if("multiple"===n)for(let n of i){const{kind:t,target:i}=n;"passage"===t&&e.push(i)}}return e},N=[];for(let n of s)if(n.choices&&n.choices.length>0)for(let e of n.choices)N.push(...b(e.conditions)),e.showCondition&&e.showCondition.kind&&N.push(...b([e.showCondition]));else N.push(...b(n.conditions));const I=Array.from(new Set(N)).map(n=>O(n)),A=(n,e)=>{switch(n){case"with":return`hasItem(${E[e].identifier})`;case"without":return`~~hasItem(${E[e].identifier})`;default:console.warn("This type of object condition is unknown:",n)}return null},w=(n,e,t)=>{if(isNaN(t)||"number"!=typeof t)return console.warn("The value of this counter condition is invalid:",t),null;switch(n){case"=":return`${x[e].identifier} == ${t}`;case"!=":return`${x[e].identifier} ~= ${t}`;case"<":case"<=":case">":case">=":return`${x[e].identifier} ${n} ${t}`;default:console.warn("This type of counter condition is unknown:",n)}return null},y=(n,e)=>{switch(n){case"by":return`userPassages--\x3ePSG_${O(e)} == 1`;case"not-by":return`userPassages--\x3ePSG_${O(e)} == 0`;default:console.warn("This type of passage condition is unknown:",n)}return null},M=n=>{const e=[];for(let t of n){const{kind:n,condition:i,target:r,value:o}=t;switch(n){case"object":e.push(A(i,r));break;case"counter":e.push(w(i,r,o));break;case"passage":e.push(y(i,r));break;default:console.warn("This type of multiple condition is unknown:",n)}}return e.filter(n=>null!==n).map(n=>`(${n})`)},k=n=>{const{kind:e,query:{operator:t,params:i}}=n,[{target:r,condition:o,value:s}]=i;switch(e){case"object":return A(o,r);case"counter":return w(o,r,s);case"passage":return y(o,r);case"multiple":{const n=M(i),e="and"===t?" && ":" || ";return n?n.join(e):null}default:console.warn("This kind of condition is unknown:",e)}},L=n=>{const e=[];for(let t of n){const{kind:n,next:i,query:{operator:r,params:o}}=t,[{target:s,condition:a,value:u}]=o;switch(n){case"object":{const n=A(a,s);n&&e.push(`if (${n}) return ${O(i)};`);break}case"counter":{const n=w(a,s,u);n&&e.push(`if (${n}) return ${O(i)};`);break}case"passage":{const n=y(a,s);n&&e.push(`if (${n}) return ${O(i)};`);break}case"multiple":{const n=M(o),t="and"===r?" && ":" || ";n&&e.push(`if (${n.join(t)}) return ${O(i)};`);break}default:console.warn("This kind of condition is unknown:",n)}}return e},D=n=>{const e=[];for(let t of n){const{kind:n,params:{target:i,modifier:r,value:o}}=t;switch(n){case"object":e.push(`${r}Item(${E[i].identifier});`);break;case"counter":e.push(`${r}Counter(${x[i].identifier}, ${o});`);break;default:console.warn("This kind of action is unknown:",n)}}return e},P=n=>n.actions&&n.actions.length>0?[...D(n.actions),`return ${O(n.next)};`]:n.conditions&&n.conditions.length>0?[...L(n.conditions),`return ${O(n.next)};`]:[`return ${O(n.next)};`],V=n=>{let e=null;const t=[],i=T(n.content);if(!n.next||n.choices&&0!==n.choices.length)if(n.choices&&n.choices.length>0){const r=[],o=[];let s=[],a=0;if(n.choices.filter(n=>n.showCondition&&n.showCondition.kind).length>0){t.push("choice","numVisibleChoices");for(let e of n.choices){const n=T(e.content),t=!(!e.showCondition||!e.showCondition.kind)&&k(e.showCondition);t?r.push(`if (${t}) {`,"  numVisibleChoices = numVisibleChoices + 1;",`  userChoices--\x3e${a+1} = numVisibleChoices;`,`  print "- (", numVisibleChoices, "). ${n}^";`,"}"):r.push("numVisibleChoices = numVisibleChoices + 1;",`userChoices--\x3e${a+1} = numVisibleChoices;`,`print "- (", numVisibleChoices, "). ${n}^";`),o.push(P(e)),++a}s=o.map((n,e)=>`if (choice == userChoices--\x3e${e+1}) {\n    ${n.join("\n    ")}\n  }`),e=["numVisibleChoices = 0;",`print "${i}^^";`,...r,"choice = getInputChoice(numVisibleChoices);",...s]}else{t.push("choice");for(let e of n.choices){const n=T(e.content);r.push(`print "- ${a+1}. ${n}^";`),o.push(P(e)),++a}s=o.map((n,e)=>`if (choice == ${e+1}) {\n    ${n.join("\n    ")}\n  }`),e=[`print "${i}^^";`,...r,`choice = getInputChoice(${o.length});`,...s]}}else e=[`print "${i}^";`,!d.disablePauseOnGameOver&&"wait();",`gameOver = ${n.isHappyEnd?"1":"2"};`,"return nothing;"];else e=n.actions&&n.actions.length>0?[`print "${i}^^";`,...D(n.actions),`return ${O(n.next)};`]:n.conditions&&n.conditions.length>0?[`print "${i}";`,!d.disablePauseOnSimpleSequence&&"wait();",...L(n.conditions),`return ${O(n.next)};`]:[`print "${i}";`,!d.disablePauseOnSimpleSequence&&"wait();",`return ${O(n.next)};`];const r=O(n.id);return I.includes(r)&&(e=[`userPassages--\x3ePSG_${r} = 1;`,...e]),{statements:e.filter(n=>!!n).join("\n  "),vars:t}},Y=d.preferSeparatorThanCls?'print (string) CLS_PATTERN, "^";':"cls();",G=`! This file contains the necessary core for the Moiki export to Inform6\n! kaelhem (c) 2021\n! kaelhem at gmail com\n\n\n! Inform settings\n! -------------------------------------------\n\nGlobal location = DefaultRoomForStatusBar; ! Must be the first global to show location name\nGlobal status_field_1 = 0; ! Must be the second global to show score or hours\nGlobal status_field_2 = 0; ! Must be the third global to show turns or minutes\n\n! Variables for game management\n! -------------------------------------------\n! Array path --\x3e 10; ! allow 10 undo moves, but it's not implemented yet...\nGlobal markForRedo = 0; ! used to restart game from beginning\nGlobal markForShow = 0; ! used to re-display sequence text\nGlobal gameOver = 0;\n\n#IfV3;\n  Constant ARRAY_LEN_OFFSET = 2;\n#IfNot;\n  Constant ARRAY_LEN_OFFSET = 3;\n#EndIf;\n\n! Choices management (used for visibility conditions of choices)\n! -------------------------------------------\n\nConstant MAX_CHOICES = 6;\nArray userChoices --\x3e (ARRAY_LEN_OFFSET + MAX_CHOICES);\n\n[ clearChoices i;\n  for (i=1: i<=MAX_CHOICES: i++) {\n    userChoices--\x3ei = 0;\n  }\n  return;\n];\n\n${R.length>0?`! Items management\n! -------------------------------------------\n\nArray userItems --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_ITEMS);\n\n[ clearItems i;\n  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n    userItems--\x3ei = 0;\n  }\n  return;\n];\n\n[ addItem index;\n  if (userItems--\x3eindex == 0) {\n    toggleItem(index);\n  }\n  return;\n];\n\n[ subItem index;\n  if (userItems--\x3eindex == 1) {\n    toggleItem(index);\n  }\n  return;\n];\n\n[ hasItem index;\n  return userItems--\x3eindex == 1;\n];\n\n[ toggleItem index;\n  ${h()}if (userItems--\x3eindex == 0) {\n    userItems--\x3eindex = 1;\n    ++status_field_1;\n    print (string) STR_OBJECT_WON;\n  } else {\n    userItems--\x3eindex = 0;\n    --status_field_1;\n    print (string) STR_OBJECT_LOST;\n  }\n  print (string) getItemDescription(index);\n  ${_()}${d.disablePauseOnActions?"":"wait();\n  "}return;\n];\n\n[ countItems i count;\n  count = 0;\n  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n    if (userItems--\x3ei == 1) ++count;\n  }\n  return count;\n];\n`:""}\n\n${$.length>0?`! Counters management\n! -------------------------------------------\n\nArray userCounters --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_COUNTERS);\n\n[ clearCounters i;\n  for (i=1: i<=COUNT_TOTAL_COUNTERS: i++) {\n    userCounters--\x3ei = defaultCounterValue(i);\n  }\n  return;\n];\n\n[ setCounter index value;\n  userCounters--\x3eindex = value;\n  if (isCounterGauge(index)) {\n    ${h()}print (string) getCounterName(index), (string) STR_COUNTER_SET, value;\n    ${_()}${d.disablePauseOnActions?"":"wait();\n  "}\n  }\n  return;\n];\n\n[ addCounter index value;\n  userCounters--\x3eindex = userCounters--\x3eindex + value;\n  if (isCounterGauge(index)) {\n    ${h()}print (string) getCounterName(index), (string) STR_COUNTER_ADD, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters--\x3eindex;\n    ${_()}${d.disablePauseOnActions?"":"wait();\n  "}\n  }\n  return;\n];\n\n[ subCounter index value;\n  userCounters--\x3eindex = userCounters--\x3eindex - value;\n  if (isCounterGauge(index)) {\n    ${h()}print (string) getCounterName(index), (string) STR_COUNTER_SUB, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters--\x3eindex;\n    ${_()}${d.disablePauseOnActions?"":"wait();\n  "}\n  }\n  return;\n];\n`:""}\n\n${I.length>0?"! Passages management (for conditions only)\n! -------------------------------------------\n\nArray userPassages --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_PASSAGES);\n\n[ clearPassages i;\n  for (i=1: i<=COUNT_TOTAL_PASSAGES: i++) {\n    userPassages--\x3ei = 0;\n  }\n  return;\n];\n":""}\n\n! Manage user inputs\n! -------------------------------------------\n\n! fix: in z-code v3, input buffers are not formatted the same way...\n#IfV3;\n  Constant arrayStartIndex 1;\n  [ length arr len;\n    len = 0;\n    while (arr->(len+1) ~= 0) ++len;\n    return len;\n  ];\n#Ifnot;\n  Constant arrayStartIndex 2;\n  [ length arr;\n    return arr->1;\n  ];\n#EndIf;\n\n! read user inputs\n[ KeyLine buffer;\n  buffer->0 = 10;\n  read buffer 0;\n  return buffer;\n];\n\n! convert a string into array\n[ toArray str arr;\n  @output_stream 3 arr;\n  @print_paddr str;\n  @output_stream -3;\n  return arr;\n];\n\n! take a char and return the same in lower case\n[ toLowerCase c;\n  if (c >= 'A' && c <= 'Z') return c + 32; else return c;\n];\n\n! return true if the given command as string match the current input buffer\n[isCommand cmd aCmd i;\n  aCmd = toArray(cmd);\n  if (aCmd--\x3e0 == length(key)) {\n    for (i=0: i<aCmd--\x3e0: i++) {\n      if (key->(arrayStartIndex+i) ~= toLowerCase(aCmd->(2+i))) rfalse;\n    }\n    rtrue;\n  }\n  rfalse;\n];\n\n! store user input\nArray key -> 13;\n\n! read user choices / menu commands\n[ getInputChoice numChoices len chNum commandUnknown done;\n  done = false;\n  do {\n    commandUnknown = false;\n    do {\n      print "> ";\n    } until(KeyLine(key)--\x3e0);\n    len = length(key);\n    if (len == 1) {\n      chNum = key->arrayStartIndex - 48;\n      if (chNum > 0 && chNum <= numChoices) {\n        ${d.disableClearScreenOnChoice?"":Y+"\n        "}done = true;\n      } else if (chNum > 0 && chNum <= 10) {\n        print (string) STR_NOCHOICE_MATCH, "^";\n      } else {\n        commandUnknown = true;\n      }\n    } else if (isCommand(STR_CMD_HELP)) {\n      showHelp();\n    } else if (isCommand(STR_CMD_UNDO)) {\n      undo();\n    } else if (isCommand(STR_CMD_REDO)) {\n      if (redo()) return 0;\n    } else if (isCommand(STR_CMD_EXIT)) {\n      exit();\n    } else if (isCommand(STR_CMD_SHOW)) {\n      markForShow = 1;\n      return 0;${R.length>0?"\n    } else if (isCommand(STR_CMD_LIST)) {\n      inventory();\n    ":""}\n    } else {\n      commandUnknown = true;\n    }\n    if (commandUnknown) {\n      print (string) STR_COMMAND_UNKNOWN_LEFT, (string) STR_CMD_HELP, (string) STR_COMMAND_UNKNOWN_RIGHT, "^";\n    }\n  } until(done);\n  return chNum;\n];\n\n[ confirm question ok done;\n  done = false;\n  ok = false;\n  do {\n    do {\n      if (question) {\n        print (string) question;\n      } else {\n        print (string) STR_DEFAULT_CONFIRM_MSG;\n      }\n      print " (", (string) STR_CMD_YES, "/", (string) STR_CMD_NO, ")^> ";\n    } until(KeyLine(key)--\x3e0);\n    if (isCommand(STR_CMD_YES) || isCommand(STR_CMD_YES_SHORT)) {\n      ok = true;\n      done = true;\n    } else if (isCommand(STR_CMD_NO) || isCommand(STR_CMD_NO_SHORT)) {\n      done = true;\n    }\n    if (~~done) {\n      print (string) STR_PLEASE_ANSWER, (string) STR_CMD_YES, " ", (string) STR_OR, " ", (string) STR_CMD_NO,".^";\n    }\n  } until(done);\n  return ok;\n];\n\n[ cls;\n  #IfV3;\n    ! in v3 it seems there is no way to clear the screen...\n    print (string) CLS_PATTERN, "^";\n  #Ifnot;\n    @erase_window -1; ! this opcode is not available in V3\n  #EndIf;\n  rtrue;\n];\n\n[ wait x;\n  #IfV3;\n    read key 0;\n  #Ifnot;\n    @read_char 1 x; ! this opcode is not available in V3\n    print "^";\n  #EndIf;\n];\n\n\n! Menu\n! -------------------------------------------\n\n[ showHelp;\n  ${p()}print (string) STR_LIST_OF_COMMANDS, "^";\n  ${_()}! print "  - ", (string) STR_CMD_UNDO, (string) STR_COLON, " ", (string) STR_BACK_TO_PREVIOUS, "^";\n  print "  - ", (string) STR_CMD_REDO, (string) STR_COLON, " ", (string) STR_RESTART_GAME, "^";\n  print "  - ", (string) STR_CMD_SHOW, (string) STR_COLON, " ", (string) STR_RESHOW_TEXT, "^";\n  print "  - ", (string) STR_CMD_EXIT, (string) STR_COLON, " ", (string) STR_QUIT, "^";\n  ${R.length>0?'print "  - ", (string) STR_CMD_LIST, (string) STR_COLON, " ", (string) STR_LIST_OBJECTS, "^";\n  ':""}rtrue;\n];\n\n[ exit;\n  print (string) STR_BYE_BYE, "^";\n  @quit;\n];\n\n[ undo;\n  print "Undo: not implemented yet !^";\n  rtrue;\n];\n\n[ redo;\n  if (confirm(STR_CONFIRM_RESTART)) {\n    markForRedo = 1;\n    rtrue;\n  }\n  rfalse;\n];\n${R.length>0?`\n[ inventory i;\n  if (countItems() == 0) {\n    print (string) STR_INVENTORY_EMPTY, "^";\n  } else {\n    ${p(2)}print (string) STR_INVENTORY_LIST, "^";\n    ${_(2)}for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n      if (hasItem(i)) print "* ", (string) getItemDescription(i), "^";\n    }\n  }\n  rtrue;\n];\n`:""}\n\n! Presentation\n! -------------------------------------------\n\n[ startScreen;\n  ${p()}print (string) STR_HEADER, " ", (string) STORY_URL, "^^";\n  ${_()}print (string) STR_MOIKI_PRESENTS, "^";\n  ${h()}print (string) STORY_TITLE, "^^";\n  ${_()}print (string) STR_A_STORY_BY, " ", (string) STORY_AUTHOR, "^^", (string) STORY_DESCRIPTION, "^";\n  rtrue;\n];\n\n\n! Game loop\n! -------------------------------------------\n[ mainLoop firstSequence next res;\n  next = firstSequence;\n  do {\n    ++status_field_2; ! increase turn counter\n    res = next();\n    if (markForShow == 1) {\n      markForShow = 0;\n      res = next;\n    }\n    if (markForRedo == 1) {\n      res = false;\n    }\n    next = res;\n    print "^";\n  } until(~~next);\n  if (gameOver > 0) {\n    ${h(2)}if (gameOver == 1) {\n      print (string) STR_WIN_GAME, "^^";\n    } else if (gameOver == 2) {\n      print (string) STR_LOSE_GAME, "^^";\n    }\n    ${_(2)}gameOver = 0;\n  }\n];\n\n[ startGame firstSequence replay;\n  startScreen();\n  wait();\n  do {\n    cls();\n    replay = false;\n    location = DefaultRoomForStatusBar; ! reset location (avoid compiler warning)\n    status_field_1 = 0; ! reset score\n    status_field_2 = 0; ! reset turns\n    ${R.length>0?"clearItems();":""}\n    ${$.length>0?"clearCounters();":""}\n    ${I.length>0?"clearPassages();":""}\n    mainLoop(firstSequence);\n    if (markForRedo == 1) {\n      markForRedo = 0;\n      replay = true;\n    } else {\n      if (confirm(STR_ANOTHER_GAME)) {\n        replay = true;\n      } else {\n        exit();\n      }\n    }\n  } until(~~replay);\n];\n`;let K=`${"utf8"===d.encoding?"!% -Cu\n":""}!% -~S\n!% $OMIT_UNUSED_ROUTINES=1\n%%SPECIAL_CHARS%%\n! ${U(i).split("\n").join("\n! ")}\n\n! author: ${j(r)}\n! title: ${r.name}\n\nObject DefaultRoomForStatusBar "${r.name}"; ! used to force name in status line\n\n! Constants\n! -------------------------------------------\nConstant STORY_TITLE = "${T(r.name)}";\nConstant STORY_DESCRIPTION = "${T(r.description)}";\nConstant STORY_AUTHOR = "${T(j(r))}";\nConstant STORY_URL = "https://moiki.fr/story/${i}";\n\n! Strings\n${Object.entries(f).filter(([n,e])=>!(B.find(e=>e===n)&&0===R.length)).map(([n,e])=>`Constant STR_${n} = "${e}";`).join("\n")}\n! Config\nConstant CLS_PATTERN = "${d.clsPattern.slice(0,40).repeat(40).slice(0,40)}";\n\n${R.length>0?`\n! Defines objects / heroes\n!-------------------------------------------\nConstant COUNT_TOTAL_ITEMS = ${R.length};\n\n${R.map((n,e)=>"Constant "+n.identifier+" = "+(e+1)+";").join("\n")}\n\n[ getItemDescription index;\n  switch (index) {\n    ${R.map(n=>n.identifier+': return "'+T(n.label)+" - ~"+T(n.desc)+'~";').join("\n    ")}\n    default: return "";\n  }\n];\n\n`:""}\n\n${$.length>0?`\n! Defines counters\n!-------------------------------------------\nConstant COUNT_TOTAL_COUNTERS = ${$.length};\n\n${$.map((n,e)=>"Constant "+n.identifier+" = "+(e+1)+";").join("\n")}\n\n[ getCounterName index;\n  switch (index) {\n    ${$.map(n=>n.identifier+': return "'+n.name+'";').join("\n    ")}\n    default: return "Undefined counter";\n  }\n];\n\n[ defaultCounterValue index;\n  switch (index) {\n    ${$.map(n=>n.identifier+": return "+(n.defaultValue||0)+";").join("\n    ")}\n    default: return 0;\n  }\n];\n\n[ isCounterGauge index;\n  switch (index) {\n    ${$.filter(n=>n.gauge).map(n=>n.identifier+": rtrue;").join("\n    ")}\n    default: return false;\n  }\n];\n\n`:""}\n\n${I.length>0?`\n! Defines passages (used only for conditions)\n!-------------------------------------------\nConstant COUNT_TOTAL_PASSAGES = ${I.length};\n\n${I.map((n,e)=>"Constant PSG_"+n+" = "+(e+1)+";").join("\n")}\n\n`:""}\n\n! Include MoikInform library\n! ------------------------------------------\nInclude "moikinform";\n\n\n! App entry point\n! ------------------------------------------\n[ Main;\n  startGame(${O(o)});\n];\n\n\n! Story sequences\n! ------------------------------------------\n`;for(let n of s){const{statements:e,vars:t}=V(n);K+=`[ ${O(n.id)}${t&&t.length>0?" "+t.join(" "):""};\n  ${e}\n];\n\n`}return[{filename:"story.inf",data:K.replace("%%SPECIAL_CHARS%%",(()=>{const n=Array.from(g);return n.length>0?`\n${d.asciiOnly?"Zcharacter table +":"Zcharacter table"} ${n.map(n=>`'@{${n}}'`).join(" ")};\n`:""})())},{filename:"moikinform.h",data:G}]})(e,i);throw new Error("This format is unvailable!")};var J="2.0.5";export{K as convertToInform,G as convertToInk,W as inform6Utils,t as migrate,P as utils,J as version};
//# sourceMappingURL=moiki-exporter.modern.js.map
