var n,e,t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},i=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,r=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,o="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",s="["+o+"]",a="\\d+",c="[a-z\\xdf-\\xf6\\xf8-\\xff]",l="[^\\ud800-\\udfff"+o+a+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",u="(?:\\ud83c[\\udde6-\\uddff]){2}",p="[\\ud800-\\udbff][\\udc00-\\udfff]",d="[A-Z\\xc0-\\xd6\\xd8-\\xde]",f="(?:"+c+"|"+l+")",m="(?:"+d+"|"+l+")",g="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",_="[\\ufe0e\\ufe0f]?"+g+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",u,p].join("|")+")[\\ufe0e\\ufe0f]?"+g+")*",T="(?:"+["[\\u2700-\\u27bf]",u,p].join("|")+")"+_,h=RegExp("['’]","g"),$=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),S=RegExp([d+"?"+c+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[s,d,"$"].join("|")+")",m+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[s,d+f,"$"].join("|")+")",d+"?"+f+"+(?:['’](?:d|ll|m|re|s|t|ve))?",d+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",a,T].join("|"),"g"),O=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,x="object"==typeof self&&self&&self.Object===Object&&self,E="object"==typeof t&&t&&t.Object===Object&&t||x||Function("return this")(),R=(n={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"ss"},function(e){return null==n?void 0:n[e]}),b=Object.prototype.toString,I=E.Symbol,C=I?I.prototype:void 0,y=C?C.toString:void 0;function N(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==b.call(n)}(n))return y?y.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var M=(e=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,i){for(var r=-1,o=n?n.length:0;++r<o;)t=e(t,n[r],r,n);return t}(function(n,e,t){return n=N(n),void 0===(e=e)?function(n){return O.test(n)}(n)?function(n){return n.match(S)||[]}(n):function(n){return n.match(i)||[]}(n):n.match(e)||[]}(function(n){return(n=N(n))&&n.replace(r,R).replace($,"")}(n).replace(h,"")),e,"")});const A=n=>`This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/${n}\nExported on ${(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})}`,L=n=>{if(n&&n.author){const{firstname:e,lastname:t,pseudo:i}=n.author;return i||e+" "+t}return"Inconnu"};var D={__proto__:null,getHeader:A,getAuthor:L,simplifyStory:({sequences:n,firstSequence:e},t,i)=>{const r={},o=(n,e,t=!1)=>{r[n]||(r[n]={in:[],to:[]}),t?r[n].in.push(e):(r[n].to.push(e),o(e,n,!0))},s={};for(let e of n)if(s[e.id]=e,e.choices&&e.choices.length>0)for(let n of e.choices)n.content=i(n.content),n.condition&&n.condition.next&&n.condition.params&&o(e.id,n.condition.next),n.next&&o(e.id,n.next);else e.condition&&e.condition.next&&e.condition.params&&o(e.id,e.condition.next),e.next&&o(e.id,e.next);const a=[s[e]],c=Object.entries(r).map(([n,e])=>({data:e,index:n}));for(let n of c)(n.data.in.length>1||1===n.data.in.length&&r[n.data.in[0]].to.length>1)&&n.index!==e&&a.push(s[n.index]);for(let n of a){let e=n.id;const o=[s[e]];for(;1===r[e].to.length;)e=r[e].to[0],o.push(s[e]);n.chain=o;const a=[];for(let n of o)a.push(n),n.action&&n.action.params&&"string"==typeof n.action.params&&a.push({objectAction:t[n.action.params]});const c=[];let l="";for(let n of a)n.objectAction?(l&&(c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),l=""),c.push(n.objectAction)):l+=i(n.content)+" ";l&&c.push(l.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),n.chainedContent=c}return a.forEach(n=>{n.chain=n.chain.map(({...n})=>({...n}))}),a}};const w=n=>n.replace(/-/gi,"_"),v=n=>n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),j=(n,e)=>`{ ${e[n.condition.params].inkVar}:\n  -> ${w(n.condition.next)}\n- else:\n  -> ${w(n.next)}\n}\n`,U=(n,e,t="")=>{const{inkVar:i,desc:r}=e[n.action.params];return`\n${t}~ ${i} = !${i}\n${t}{ ${i}:\n${t}  <h4><em>Objet récupéré</em> : ${r}</h4>\n${t}- else:\n${t}  <h4><em>Objet perdu</em> : ${r}</h4>\n${t}}\n`},k=n=>{const{_id:e,meta:t,firstSequence:i,sequences:r,assets:o}=n;let s={};for(let n of o)s[n.id]={inkVar:"_"+w(M(n.label)),...n};let a=`/*\n${A(e)}\n*/\n\n# author: ${L(t)}\n# title: ${t.name}\n`;t.image&&(a+=`# IMAGE: ${t.image.replace(/\//gi,"\\/")}\n<em>Crédit photo : <a href="${"https://unsplash.com".replace(/\//gi,"\\/")}">Unsplash</a></em>\n`),a+="<em>"+t.description+"</em>\n<hr/>\n";const c=Object.entries(s).map(([n,e])=>e);for(let n of c)a+="VAR "+n.inkVar+" = false\n";a+="\n-> "+w(i)+"\n";for(let n of r){const e=v(n.content);if(a+="\n=== "+w(n.id)+" ===\n",a+=e+"\n",n.choices&&n.choices.length>0){for(let e of n.choices){let n=" ";e.action&&e.action.params&&"string"==typeof e.action.params&&(n=U(e,s,"\t"));let t="* ["+v(e.content)+"]"+n;a+=e.condition&&e.condition.next&&e.condition.params?`${t} ${j(e,s)}`:t+"-> "+w(e.next)+"\n"}a+="# CLEAR\n"}else n.action&&n.action.params&&"string"==typeof n.action.params&&(a+=U(n,s)),a+=n.condition&&n.condition.next&&n.condition.params?j(n,s):n.next?"-> "+w(n.next)+"\n":"-> END\n"}return a},V=(n,e="story")=>(e?e+"_":"")+n.replace(/-/gi,"_"),H=n=>n.replace(/(<\/*(strong|b)>)/gi,"").replace(/(<\/*(em)>)/gi,"").replace(/(<\/*(h\d)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/<\/p>/gi,"</p> ").replace(/<\/*p>/gi,"").replace(/(<\/*(span)>)/gi,"").replace(/(\s)+/gi," ").replace(/\@/gim,"@@64").replace(/\^/gim,"@@94").replace(/\\/gim,"@@92").replace(/\~/gim,"@@126").replace(/\°/gim," ").replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi,"^").replace(/(\s)*&nbsp;(\s)*/gi," ").replace(/(\"|“|”)/gim,"~").replace(/\’/gim,"'").trim(),G={CLS_PATTERN:"--"},Y={HEADER:"Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici :",MOIKI_PRESENTS:"Moiki présente :",A_STORY_BY:"Une histoire de",COLON:" :",CMD_HELP:"AIDE",CMD_UNDO:"RETOUR",CMD_REDO:"REFAIRE",CMD_LIST:"LISTE",CMD_SHOW:"REVOIR",CMD_EXIT:"QUITTER",CMD_YES:"oui",CMD_YES_SHORT:"o",CMD_NO:"non",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"Cette saisie ne correspond à aucun choix !",LIST_OF_COMMANDS:"Liste des commandes",BACK_TO_PREVIOUS:"Retourner au choix précédent",RESTART_GAME:"Recommencer depuis le début",LIST_OBJECTS:"Lister les objets récupérés",RESHOW_TEXT:"Afficher le texte de la dernière séquence",QUIT:"Quitter",BYE_BYE:"Bye-bye !",CONFIRM_RESTART:"Recommencer depuis le début ?",INVENTORY_LIST:"Liste des objets de l'inventaire :",INVENTORY_EMPTY:"Votre inventaire est vide !",OBJECT_WON:"Objet récupéré : ",OBJECT_LOST:"Objet perdu : ",WIN_GAME:"Gagné !",LOSE_GAME:"Perdu !",COMMAND_UNKNOWN_LEFT:"Cette commande est inconnue ! Tapez ~",COMMAND_UNKNOWN_RIGHT:"~ pour une liste des commandes disponibles.",DEFAULT_CONFIRM_MSG:"Etes-vous sûr de vouloir faire cette action ?",OR:" ou ",PLEASE_ANSWER:"Veuillez répondre par ",ANOTHER_GAME:"Lancer une autre partie ?"};var q={__proto__:null,convertId:V,cleanContent:H,informDefaultConfig:G,DEFAULT_STRINGS_FR:Y,DEFAULT_STRINGS_EN:{HEADER:"This story was exported with Moiki Exporter.^The original version is avalaible here:",MOIKI_PRESENTS:"Moiki presents :",A_STORY_BY:"A story by",COLON:":",CMD_HELP:"HELP",CMD_UNDO:"UNDO",CMD_REDO:"REDO",CMD_LIST:"LIST",CMD_SHOW:"SHOW",CMD_EXIT:"EXIT",CMD_YES:"yes",CMD_YES_SHORT:"y",CMD_NO:"no",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"This entry does not correspond to any choice!",LIST_OF_COMMANDS:"List of commands",BACK_TO_PREVIOUS:"Back to previous choice",RESTART_GAME:"Restart the game",LIST_OBJECTS:"List of items won",RESHOW_TEXT:"Show the text of the last sequence",QUIT:"Quit the game",BYE_BYE:"Bye bye!",CONFIRM_RESTART:"Restart from the beginning?",INVENTORY_LIST:"List of items in inventory:",INVENTORY_EMPTY:"Inventory is empty!",OBJECT_WON:"Item won : ",OBJECT_LOST:"Item lost : ",WIN_GAME:"Won !",LOSE_GAME:"Lost !",COMMAND_UNKNOWN_LEFT:"This command is unknown! Type ~",COMMAND_UNKNOWN_RIGHT:"~ for a list of available commands.",DEFAULT_CONFIRM_MSG:"Are you sure you want to take this action?",OR:" or ",PLEASE_ANSWER:"Please answer ",ANOTHER_GAME:"Start another game?"}};const P=["w","s","e","n","nw","ne","sw","se"],F=n=>{if(n>=0&&n<10)return P[n]+"_to";throw new Error("Only 8 choices are allowed here...")},B=(n,e)=>n.action&&n.action.params&&"string"==typeof n.action.params?`[; cls(); ${e[n.action.params].identifier}=inverse(${e[n.action.params].identifier}); style bold; addOrRemoveObject(${e[n.action.params].identifier}); print "${H(e[n.action.params].desc)}"; style roman; wait(); return ${V(n.next)};]`:n.condition&&n.condition.next&&n.condition.params?`[; cls(); if (${e[n.condition.params].identifier}) return ${V(n.condition.next)}; else return ${V(n.next)};]`:`[; cls(); return ${V(n.next)};]`,W=(n,e)=>{const t=H(n.content);if(!n.next||n.choices&&0!==n.choices.length){if(n.choices&&n.choices.length>0){let i="";const r=[];let o=0;for(let t of n.choices)i+="- "+(o+1)+". "+H(t.content)+"^",r.push({gotoFunction:F(o),gotoValue:B(t,e)}),++o;return`"${t}^^${i}",\n  ${r.map(n=>`${n.gotoFunction} ${n.gotoValue}`).join(",\n  ")};`}return`[; print "${t}^"; deadflag=${n.isHappyEnd?"2":"1"};];\n`}return n.action&&n.action.params&&"string"==typeof n.action.params?`[; print "${t}^^"; ${e[n.action.params].identifier}=inverse(${e[n.action.params].identifier}); style bold; addOrRemoveObject(${e[n.action.params].identifier}); print "${H(e[n.action.params].desc)}"; style roman; wait(); PlayerTo(${V(n.next)});];\n`:n.condition&&n.condition.next&&n.condition.params?`[; print "${t}"; if (${e[n.condition.params].identifier}) PlayerTo(${V(n.condition.next)}); else PlayerTo(${V(n.next)});];\n`:`[; print "${t}"; PlayerTo(${V(n.next)});];\n`},z=(n,e)=>{if("with-parser"===e)return(n=>{const{_id:e,meta:t,firstSequence:i,sequences:r,assets:o}=n;let s={};for(let n of o)s[n.id]={identifier:"_"+V(M(n.label)),...n};const a=Object.entries(s).map(([n,e])=>e);let c=`!% !-s\n!% $OMIT_UNUSED_ROUTINES=1\n\n! ${A(e).split("\n").join("\n! ")}\n\n! author: ${L(t)}\n! title: ${t.name}\n\nConstant Story "${t.name}";\nConstant Headline "^${t.description}^^Une histoire de ${L(t)}.^^Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici : https://moiki.fr/story/${e}^";\nRelease 1;\n\n! Game utils\n! -------------------------------------------\n\nConstant NO_SCORE;\n\n! fix: in z-code v3, it seems there is no way to clear the screen...\n#IfV3;\n  [ cls;\n    print "----------------------------------------^";\n    rtrue;\n  ];\n#Ifnot;\n  [ cls;\n    @erase_window -1;\n    rtrue;\n  ];\n#EndIf;\n\n\n[ wait buf;\n  read buf 0;\n];\n\n[ waitAndClear;\n  wait();\n  cls();\n  rtrue;\n];\n\nInclude "parser";\n\n! Add a prefix to every commands to shortcut the lib. credit: @hlabrande\n[ BeforeParsing pos;\n  #Ifdef TARGET_ZCODE;\n    pos = parse->5;\n  #Ifnot; ! TARGET_GLULX\n    pos = parse->3;\n  #Endif; ! TARGET_\n  LTI_Insert(pos, 'c');\n  LTI_Insert(pos+1, 'h');\n  LTI_Insert(pos+2, 'o');\n  LTI_Insert(pos+3, 'i');\n  LTI_Insert(pos+4, 'x');\n  LTI_Insert(pos+5, ' ');\n  Tokenise__(buffer, parse);\n];\n\nInclude "verblib";\n\n[ addOrRemoveObject obj;\n  if (obj) print "Objet récupéré : "; else print "Objet perdu : ";\n  rtrue;\n];\n\n[ inverse obj;\n  if (obj) rfalse; else rtrue;\n];\n`;a.length>0&&(c+=`\n! Variables for Objects / Heroes\n!-------------------------------------------\n${a.map(n=>"Global "+n.identifier+" = false").join(";\n")};\n`),c+='\n! Start story\n! ------------------------------------------\n\nClass sequence\n  with short_name [; rtrue; ],\n    cant_go [; print "Choix non reconnu, veuillez recommencer.^"; <<Look>>; ],\n    has light;\n';for(let n of r)c+=`\nSequence ${V(n.id)} ""\nwith description ${W(n,s)}\n`;return c+=`\n\n! Routines\n!-----------------------------------\n\n[ Initialise;\n  location = ${V(i)};\n  introduction();\n  lookmode=2; ! les lieux déjà visités sont décrits à chaque fois\n  Banner();\n  waitAndClear();\n  return 2; ! banniËre dÈj‡ affichÈe\n];\n\n[ introduction;\n  style underline;\n  print "Ce jeu ne se joue qu'en tapant les chiffres de vos choix.^De ce fait, vous ne pourrez ni sauver ni quitter de manière classique.^^";\n];\n\n[ DeathMessage;\n  switch (deadflag) {\n    1: print "Fin Tragique !";\n    2: print "Fin Heureuse !";\n  }\n];\n\n\n! Grammar\n!-----------------------------------\n\nInclude "FrenchG";\n\n[ ChoixNumberSub ;\n  ${P.map((n,e)=>`if (noun == ${e+1}) <<Go ${n}_obj>>;`).join("\n  ")}\n  print "Choix non reconnu, veuillez recommencer.^";\n];\n\nVerb 'choix'\n* number        ->choixNumber;\n`,c})(n);if("standard"===e)return(n=>{const{_id:e,meta:t,firstSequence:i,sequences:r,assets:o}=n,{convertId:s,cleanContent:a}=q,c=Y,l=G,u=(n,e=1)=>`#IfV5; style ${n}; #EndIf;\n${"  ".repeat(e)}`,p=n=>u("bold",n),d=n=>u("underline",n),f=n=>u("roman",n);let m={};for(const[n,e]of o.entries())m[e.id]={identifier:"_"+s(M(e.label),"")+"_"+(n+1),...e};const g=Object.entries(m).map(([n,e])=>e),_=(n,e)=>n.action&&n.action.params&&"string"==typeof n.action.params?["cls();",`${p(2)}toggleItem(${e[n.action.params].identifier});`,`print "${a(e[n.action.params].desc)}";`,f(2)+"wait();",`return ${s(n.next)};`]:n.condition&&n.condition.next&&n.condition.params?["cls();",`if (hasItem(${e[n.condition.params].identifier})) return ${s(n.condition.next)};`,`return ${s(n.next)};`]:["cls();",`return ${s(n.next)};`],T=(n,e)=>{let t=null;const i=[],r=a(n.content);if(!n.next||n.choices&&0!==n.choices.length)if(n.choices&&n.choices.length>0){i.push("choice");let o="";const s=[];let c=0;for(let t of n.choices)o+="- "+(c+1)+". "+a(t.content)+"^",s.push(_(t,e)),++c;t=[`print "${r}^^${o}";`,`choice = getInputChoice(${s.length});`,...s.map((n,e)=>`if (choice == ${e+1}) {\n    ${n.join("\n    ")}\n  }`)]}else t=[`print "${r}^";`,"wait();",`gameOver = ${n.isHappyEnd?"1":"2"};`,"return nothing;"];else t=n.action&&n.action.params&&"string"==typeof n.action.params?[`print "${r}^^";`,`${p()}toggleItem(${e[n.action.params].identifier});`,`print "${a(e[n.action.params].desc)}";`,f()+"wait();",`return ${s(n.next)};`]:n.condition&&n.condition.next&&n.condition.params?[`print "${r}";`,"wait();",`if (hasItem(${e[n.condition.params].identifier})) return ${s(n.condition.next)};`,`return ${s(n.next)};`]:[`print "${r}";`,"wait();",`return ${s(n.next)};`];return{statements:t.join("\n  "),vars:i}},h=`! This file contains the necessary core for the Moiki export to Inform6\n! kaelhem (c) 2020\n! kaelhem at gmail com\n\n\n! Inform settings\n! -------------------------------------------\n\nGlobal location = DefaultRoomForStatusBar; ! Must be the first global to show location name\nGlobal status_field_1 = 0; ! Must be the second global to show score or hours\nGlobal status_field_2 = 0; ! Must be the third global to show turns or minutes\n\n\n! Variables for game management\n! -------------------------------------------\n! Array path --\x3e 10; ! allow 10 undo moves, but it's not implemented yet...\nGlobal markForRedo = 0; ! used to restart game from beginning\nGlobal markForShow = 0; ! used to re-display sequence text\nGlobal gameOver = 0;\n\n\n! Items management\n! -------------------------------------------\n\n#IfV3;\n  Array userItems->(2+COUNT_TOTAL_ITEMS);\n#IfNot;\n  Array userItems->(3+COUNT_TOTAL_ITEMS);\n#EndIf;\n\n[ clearItems i;\n  for (i=1: i<=userItems->0: i++) {\n    userItems->i = 0;\n  }\n  return;\n];\n\n[ addItem index;\n  userItems->index = 1;\n  return;\n];\n\n[ removeItem index;\n  userItems->index = 0;\n  return;\n];\n\n[ hasItem index;\n  return userItems->index == 1;\n];\n\n[ toggleItem index;\n  if (userItems->index == 0) {\n    userItems->index = 1;\n    ++status_field_1;\n    print (string) STR_OBJECT_WON;\n  } else {\n    userItems->index = 0;\n    --status_field_1;\n    print (string) STR_OBJECT_LOST;\n  }\n  return;\n];\n\n[ countItems i count;\n  count = 0;\n  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n    if (userItems->i == 1) ++count;\n  }\n  return count;\n];\n\n! Manage user inputs\n! -------------------------------------------\n\n! fix: in z-code v3, input buffers are not formatted the same way...\n#IfV3;\n  Constant inputBufferStartIndex 1;\n  [ length arr len;\n    len = 0;\n    while (arr->(len+1) ~= 0) ++len;\n    return len;\n  ];\n#Ifnot;\n  Constant inputBufferStartIndex 2;\n  [ length arr;\n    return arr->1;\n  ];\n#EndIf;\n\n! read user inputs\n[ KeyLine buffer;\n  buffer->0 = 10;\n  read buffer 0;\n  return buffer;\n];\n\n! convert a string into array\n[ toArray str arr;\n  @output_stream 3 arr;\n  @print_paddr str;\n  @output_stream -3;\n  return arr;\n];\n\n! take a char and return the same in lower case\n[ toLowerCase c;\n  if (c >= 'A' && c <= 'Z') return c + 32; else return c;\n];\n\n! return true if the given command as string match the current input buffer\n[isCommand cmd aCmd i;\n  aCmd = toArray(cmd);\n  if (aCmd--\x3e0 == length(key)) {\n    for (i=0: i<aCmd--\x3e0: i++) {\n      if (key->(inputBufferStartIndex+i) ~= toLowerCase(aCmd->(2+i))) rfalse;\n    }\n    rtrue;\n  }\n  rfalse;\n];\n\n! store user input\nArray key -> 13;\n\n! read user choices / menu commands\n[ getInputChoice numChoices len chNum commandUnknown done;\n  done = false;\n  do {\n    commandUnknown = false;\n    do {\n      print "> ";\n    } until(KeyLine(key)--\x3e0);\n    len = length(key);\n    if (len == 1) {\n      chNum = key->inputBufferStartIndex - 48;\n      if (chNum > 0 && chNum <= numChoices) {\n        done = true;\n      } else if (chNum > 0 && chNum <= 10) {\n        print (string) STR_NOCHOICE_MATCH, "^";\n      } else {\n        commandUnknown = true;\n      }\n    } else if (isCommand(STR_CMD_HELP)) {\n      showHelp();\n    } else if (isCommand(STR_CMD_UNDO)) {\n      undo();\n    } else if (isCommand(STR_CMD_REDO)) {\n      if (redo()) return;\n    } else if (isCommand(STR_CMD_EXIT)) {\n      exit();\n    } else if (isCommand(STR_CMD_LIST)) {\n      inventory();\n    } else if (isCommand(STR_CMD_SHOW)) {\n      markForShow = 1;\n      return;\n    } else {\n      commandUnknown = true;\n    }\n    if (commandUnknown) {\n      print (string) STR_COMMAND_UNKNOWN_LEFT, (string) STR_CMD_HELP, (string) STR_COMMAND_UNKNOWN_RIGHT, "^";\n    }\n  } until(done);\n  return chNum;\n];\n\n[ confirm question ok done;\n  done = false;\n  ok = false;\n  do {\n    do {\n      if (question) {\n        print (string) question;\n      } else {\n        print (string) STR_DEFAULT_CONFIRM_MSG;\n      }\n      print " (", (string) STR_CMD_YES, "/", (string) STR_CMD_NO, ")^> ";\n    } until(KeyLine(key)--\x3e0);\n    if (isCommand(STR_CMD_YES) || isCommand(STR_CMD_YES_SHORT)) {\n      ok = true;\n      done = true;\n    } else if (isCommand(STR_CMD_NO) || isCommand(STR_CMD_NO_SHORT)) {\n      done = true;\n    }\n    if (~~done) {\n      print (string) STR_PLEASE_ANSWER, (string) STR_CMD_YES, (string) STR_OR, (string) STR_CMD_NO,".^";\n    }\n  } until(done);\n  return ok;\n];\n\n[ cls;\n  #IfV3;\n    ! in v3 it seems there is no way to clear the screen...\n    print (string) CLS_PATTERN, "^";\n  #Ifnot;\n    @erase_window -1; ! this opcode is not available in V3\n  #EndIf;\n  rtrue;\n];\n\n[ wait x;\n  #IfV3;\n    read key 0;\n  #Ifnot;\n    @read_char 1 x; ! this opcode is not available in V3\n    print "^";\n  #EndIf;\n];\n\n\n! Menu\n! -------------------------------------------\n\n[ showHelp;\n  ${d()}print (string) STR_LIST_OF_COMMANDS, "^";\n  ${f()}! print "  - ", (string) STR_CMD_UNDO, (string) STR_COLON, " ", (string) STR_BACK_TO_PREVIOUS, "^";\n  print "  - ", (string) STR_CMD_REDO, (string) STR_COLON, " ", (string) STR_RESTART_GAME, "^";\n  print "  - ", (string) STR_CMD_LIST, (string) STR_COLON, " ", (string) STR_LIST_OBJECTS, "^";\n  print "  - ", (string) STR_CMD_SHOW, (string) STR_COLON, " ", (string) STR_RESHOW_TEXT, "^";\n  print "  - ", (string) STR_CMD_EXIT, (string) STR_COLON, " ", (string) STR_QUIT, "^";\n  rtrue;\n];\n\n[ exit;\n  print (string) STR_BYE_BYE, "^";\n  @quit;\n];\n\n[ undo;\n  print "Undo: not implemented yet !^";\n  rtrue;\n];\n\n[ redo;\n  if (confirm(STR_CONFIRM_RESTART)) {\n    markForRedo = 1;\n    rtrue;\n  }\n  rfalse;\n];\n\n[ inventory i;\n  if (countItems() == 0) {\n    print (string) STR_INVENTORY_EMPTY, "^";\n  } else {\n    ${d(2)}print (string) STR_INVENTORY_LIST, "^";\n    ${f(2)}for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n      if (hasItem(i)) print "* ", (string) getItemDescription(i), "^";\n    }\n  }\n  rtrue;\n];\n\n\n! Presentation\n! -------------------------------------------\n\n[ startScreen;\n  ${d()}print (string) STR_HEADER, " ", (string) STORY_URL, "^^";\n  ${f()}print (string) STR_MOIKI_PRESENTS, "^";\n  ${p()}print (string) STORY_TITLE, "^^";\n  ${f()}print (string) STR_A_STORY_BY, " ", (string) STORY_AUTHOR, "^^", (string) STORY_DESCRIPTION, "^";\n  rtrue;\n];\n\n\n! Game loop\n! -------------------------------------------\n[ mainLoop firstSequence next res;\n  next = firstSequence;\n  do {\n    ++status_field_2; ! increase turn counter\n    res = next();\n    if (markForShow == 1) {\n      markForShow = 0;\n      res = next;\n    }\n    if (markForRedo == 1) {\n      res = false;\n    }\n    next = res;\n    print "^";\n  } until(~~next);\n  if (gameOver > 0) {\n    ${p(2)}if (gameOver == 1) {\n      print (string) STR_WIN_GAME, "^^";\n    } else if (gameOver == 2) {\n      print (string) STR_LOSE_GAME, "^^";\n    }\n    ${f(2)}gameOver = 0;\n  }\n];\n\n[ startGame firstSequence replay msg;\n  startScreen();\n  wait();\n  do {\n    cls();\n    replay = false;\n    clearItems();\n    status_field_1 = 0; ! reset score counter\n    status_field_2 = 0; ! reset turns counter\n    mainLoop(firstSequence);\n    if (markForRedo == 1) {\n      markForRedo = 0;\n      replay = true;\n    } else {\n      \n      if (confirm(STR_ANOTHER_GAME)) {\n        replay = true;\n      } else {\n        exit();\n      }\n    }\n  } until(~~replay);\n];\n`;let $=`!% !-s\n!% $OMIT_UNUSED_ROUTINES=1\n\n! ${A(e).split("\n").join("\n! ")}\n\n! author: ${L(t)}\n! title: ${t.name}\n\nObject DefaultRoomForStatusBar "${t.name}"; ! used to force name in status line\n\n! Constants\n! -------------------------------------------\nConstant STORY_TITLE = "${a(t.name)}";\nConstant STORY_DESCRIPTION = "${a(t.description)}";\nConstant STORY_AUTHOR = "${a(L(t))}";\nConstant STORY_URL = "https://moiki.fr/story/${e}";\n\n! Strings\n${Object.entries(c).map(([n,e])=>`Constant STR_${n} = "${e}";`).join("\n")}\n! Config\nConstant CLS_PATTERN = "${l.CLS_PATTERN.repeat(40).slice(0,40)}";\n\n\n! Defines Objects / Heroes\n!-------------------------------------------\nConstant COUNT_TOTAL_ITEMS = ${g.length};\n\n${g.length>0&&g.map((n,e)=>"Constant "+n.identifier+" = "+(e+1)+";").join("\n")}\n\n[ getItemDescription index;\n  switch (index) {\n    ${g.length>0&&g.map(n=>n.identifier+': return "'+n.desc+'";').join("\n    ")}\n    default: return "";\n  }\n];\n\nInclude "moikinform";\n\n\n! App entry point\n! ------------------------------------------\n[ Main;\n  startGame(${s(i)});\n];\n\n\n! Story sequences\n! ------------------------------------------\n`;for(let n of r){const{statements:e,vars:t}=T(n,m);$+=`[ ${s(n.id)}${t&&t.length>0?" "+t.join(" "):""};\n  ${e}\n];\n\n`}return[{filename:"moikinform.h",asBinary:!0,data:h},{filename:"story.inf",asBinary:!0,data:$}]})(n);throw new Error("This format is unvailable!")};var K="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),Z=new Uint8Array(16);function J(){if(!K)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return K(Z)}for(var X=[],Q=0;Q<256;++Q)X[Q]=(Q+256).toString(16).substr(1);function nn(n,e,t){var i=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var r=(n=n||{}).random||(n.rng||J)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,e)for(var o=0;o<16;++o)e[i+o]=r[o];return e||function(n,e){var t=0;return[X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]]].join("")}(r)}const en=n=>n.replace(/-/gi,"_"),tn=n=>n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),rn=n=>n.replace(/"/gi,'\\"'),on=(n,e,t="goto")=>`(if: ${e[n.condition.params].tweeVar})[(${t}: "${en(n.condition.next)}")]\n(else:)[(${t}: "${en(n.next)}")]\n`,sn=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,i=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,r=n.next?en(n.next):null,o=rn(tn(n.content));if(i){const{tweeVar:n,desc:t}=e[i];return`(link: "${o}")[(set: ${n} to not ${n}, $actionText to "${rn(t)}", $actionPassage to "${r}", $isObjectWin to ${n})[(goto: "Toggle-Object")]]\n`}return t?`(link: "${o}")[${on(n,e)}]\n`:r?`(link: "${o}")[(goto: "${r}")]\n`:""},an=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,i=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,r=n.next?en(n.next):null;if(i){const{tweeVar:n,desc:t}=e[i];return`(set: ${n} to not ${n}, $actionText to "${rn(t)}", $actionPassage to "${r}", $isObjectWin to ${n})[(display: "Toggle-Object")]\n`}return t?on(n,e,"display")+"\n":r?`(display: "${r}")\n`:""},cn=n=>n.replace(/-/gi,"_"),ln=n=>n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim(),un=n=>n.replace(/"/gi,'\\"'),pn=(n,e,t=null)=>{const i=t?`[[${t}|${cn(n.condition.next)}]]`:`<<include "${cn(n.condition.next)}">>`,r=t?`[[${t}|${cn(n.next)}]]`:`<<include "${cn(n.next)}">>`;return`<<if ${e[n.condition.params].tweeVar}>>\n  ${i}\n<<else>>\n  ${r}\n<</if>>\n`},dn=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,i=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,r=n.next?cn(n.next):null,o=un(ln(n.content));if(i){const{tweeVar:n,desc:t}=e[i];return`[[${o}|Toggle-Object][${n} to not ${n}; $actionText to "${un(t)}"; $actionPassage to "${r}"; $isObjectWin to ${n}]]\n`}return t?pn(n,e,o)+"\n":r?`[[${o}|${r}]]\n`:""},fn=(n,e)=>{const t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,i=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,r=n.next?cn(n.next):null;if(i){const{tweeVar:n,desc:t}=e[i];return`<<set ${n} to not ${n}; $actionText to "${un(t)}"; $actionPassage to "${r}"; $isObjectWin to ${n}>>\n<<include "Toggle-Object">>\n`}return t?pn(n,e)+"\n":r?`<<include "${r}">>\n`:""},mn=(n,e)=>{if("harlowe"===e)return(n=>{const{_id:e,meta:t,firstSequence:i,sequences:r,assets:o}=n;let s={};for(let n of o)s[n.id]={tweeVar:"$"+en(M(n.label)),...n};let a=`\x3c!--\n${A(e)}\n--\x3e\n\n:: StoryAuthor\n${L(t)}\n\n:: StoryTitle\n${t.name}\n\n:: StorySubtitle\n${t.description}\n\n:: StoryData\n{\n  "ifid": "${nn()}",\n  "format": "Harlowe",\n  "format-version": "3.1.0",\n  "start": "${en(i)}",\n  "zoom": 1\n}\n\n`;const c=Object.entries(s).map(([n,e])=>e);let l="(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n";for(let n of c)l+="(set: "+n.tweeVar+" to false)\n";for(let n of r){const e=tn(n.content);if(a+="\n:: "+en(n.id)+"\n"+e+"\n",n.choices&&n.choices.length>0)for(let e of n.choices)a+=sn(e,s);else a+=an(n,s);n.id===i&&(a+=l)}return a+="\n:: Toggle-Object\n(if: $isObjectWin)[Objet récupéré : {$actionText}]\n(else:)[Objet perdu : {$actionText}]\n(display: $actionPassage)\n",a})(n);if("sugarcube"===e)return(n=>{const{_id:e,meta:t,firstSequence:i,sequences:r,assets:o}=n;let s={};for(let n of o)s[n.id]={tweeVar:"$"+cn(M(n.label)),...n};let a=`\x3c!--\n${A(e)}\n--\x3e\n\n:: StoryAuthor\n${L(t)}\n\n:: StoryTitle\n${t.name}\n\n:: StorySubtitle\n${t.description}\n\n:: StoryData\n{\n  "ifid": "${nn()}",\n  "format": "SugarCube",\n  "format-version": "2.31.1",\n  "start": "${cn(i)}",\n  "zoom": 1\n}\n\n`;const c=Object.entries(s).map(([n,e])=>e);let l="<<set $actionText to false; $actionPassage to false; $isObjectWin to false>>\n";for(let n of c)l+="<<set "+n.tweeVar+" to false>>\n";for(let n of r){const e=ln(n.content);if(a+="\n:: "+cn(n.id)+"\n"+e+"\n",n.choices&&n.choices.length>0)for(let e of n.choices)a+=dn(e,s);else a+=fn(n,s);n.id===i&&(a+=l)}return a+="\n:: Toggle-Object\n<<if $isObjectWin>>\n  récupéré : $actionText\n<<else>>\n  perdu : $actionText\n<</if>>\n<<include [[$actionPassage]]>>\n",a})(n);throw new Error("This format is unvailable!")},gn=n=>n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<([/]*)(strong|b|h\d)>)/gi,"**").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/(<([/]*)(em)>)/gi,"_").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi,"+n+").replace(/(&nbsp;)+/gi," ").replace(/(\s)+/gi," ").trim(),_n=n=>{const{meta:e,firstSequence:t,sequences:i,assets:r}=n,o=n=>i.findIndex(e=>e.id===n)+2;let s={};for(let n of r)s[n.id]={storyVar:(a=M(n.label),a.replace(/-/gi,"_")),...n};var a;const c=[],l=[];let u=i.length+2;const p=(n,e)=>{const t=u;return l.push({id:t,events:[`997|${n.storyVar}|${t+2}|null\n`,`997|null|${t+1}|null\n`]}),l.push({id:t+1,action:`${n.storyVar}|invisible|null|récupéré: ${n.desc.trim()}|null`,events:[`997|null|${e}|null\n`]}),l.push({id:t+2,action:`-${n.storyVar}|invisible|null|perdu: ${n.desc.trim()}|null`,events:[`997|null|${e}|null\n`]}),u+=3,t};let d="1 _start_\n";e.image&&(d+=`[[${e.image}]]+n+&&\nCrédit photo : Unsplash+n+&&\n`),d+=`Une histoire de ${L(e).trim()}+n+&&\n`,d+="(exporté via https://moiki.fr)+n++n+&&\n",d+=e.description+"\n|\n",d+=`997|null|${o(t)}|null\n`,d+="*****",c.push({id:"$start",room:d});for(let n of i){let e="";const t=gn(n.content);if(e+=o(n.id)+" "+n.id+"\n",e+="[["+t.split("\n").map(n=>n+"+n+").join("")+"]]",n.choices&&n.choices.length>0){const t=[];let i=1;for(let r of n.choices){const n=o(r.next);if(r.condition&&r.condition.next&&r.condition.params)l.push({id:u,events:[`997|${s[r.condition.params].storyVar}|${o(r.condition.next)}|null\n`,`997|null|${n}|null\n`]}),e+=`+n+&&\n${gn(r.content)} (${i})`,t.push(u),++u;else if(r.action&&r.action.params&&"string"==typeof r.action.params){const o=p(s[r.action.params],n);e+=`+n+&&\n${gn(r.content)} (${i})`,t.push(o)}else e+=`+n+&&\n${gn(r.content)} (${i})`,t.push(n);++i}if(t.length>0){e+="\n|\n",i=1;for(let n of t)e+=i+"->"+n+"\n",++i}}else if(n.final||!n.next)e+="\n|\n",e+=n.final&&n.isHappyEnd?"999|Tu as gagné ! Bravo !\n":"998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n";else{const t=o(n.next);e+="\n|\n",n.action&&n.action.params&&"string"==typeof n.action.params?e+=`997|null|${p(s[n.action.params],t)}|null\n`:(n.condition&&(e+=`997|${s[n.condition.params].storyVar}|${o(n.condition.next)}|null\n`),e+=`997|null|${t}|null\n`)}e+="*****",c.push({id:n.id,room:e})}for(let{id:n,events:e,action:t}of l){let i=n+" condition-room-"+n+"\n";i+="null\n",i+=t||"|",i+="\n"+e.join(""),i+="*****",c.push({id:n,room:i})}return e.name+"\n"+c.length+"\n"+c.map(({room:n})=>n).join("\n")+"\n1§1️⃣|2§2️⃣|3§3️⃣"};var Tn="0.1.14";export{z as convertToInform,k as convertToInk,_n as convertToJdrBot,mn as convertToTwee,D as utils,Tn as version};
//# sourceMappingURL=moiki-exporter.modern.js.map
