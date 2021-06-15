!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((n=n||self).moikiExporter={})}(this,function(n){function e(){return(e=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function t(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)e.indexOf(t=o[r])>=0||(i[t]=n[t]);return i}function r(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function i(n,e){var t;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(t=function(n,e){if(n){if("string"==typeof n)return r(n,void 0);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(n,void 0):void 0}}(n))||e&&n&&"number"==typeof n.length){t&&(n=t);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(t=n[Symbol.iterator]()).next.bind(t)}var o,a,s=function(n){var e=n.sequences,t=n.assets,r=n.sounds,i=n.counters,o=n.stats;return{_id:n._id,meta:n.meta,theme:n.theme,firstSequence:n.firstSequence||(e&&e.length>0?e[0].id:"intro"),sequences:e&&e.length>0?e:[{id:"intro",content:""}],counters:void 0===i?[]:i,assets:void 0===t?[]:t,sounds:void 0===r?[]:r,stats:void 0===o?{numView:0}:o}},u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,l=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,d="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",f="["+d+"]",m="\\d+",p="[a-z\\xdf-\\xf6\\xf8-\\xff]",h="[^\\ud800-\\udfff"+d+m+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",g="(?:\\ud83c[\\udde6-\\uddff]){2}",_="[\\ud800-\\udbff][\\udc00-\\udfff]",T="[A-Z\\xc0-\\xd6\\xd8-\\xde]",S="(?:"+p+"|"+h+")",C="(?:"+T+"|"+h+")",O="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",v="[\\ufe0e\\ufe0f]?"+O+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",g,_].join("|")+")[\\ufe0e\\ufe0f]?"+O+")*",E="(?:"+["[\\u2700-\\u27bf]",g,_].join("|")+")"+v,R=RegExp("['’]","g"),x=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),b=RegExp([T+"?"+p+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[f,T,"$"].join("|")+")",C+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[f,T+S,"$"].join("|")+")",T+"?"+S+"+(?:['’](?:d|ll|m|re|s|t|ve))?",T+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",m,E].join("|"),"g"),I=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,N="object"==typeof self&&self&&self.Object===Object&&self,A="object"==typeof u&&u&&u.Object===Object&&u||N||Function("return this")(),y=(o={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(n){return null==o?void 0:o[n]}),w=Object.prototype.toString,M=A.Symbol,k=M?M.prototype:void 0,L=k?k.toString:void 0;function D(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==w.call(n)}(n))return L?L.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var U=(a=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,r){for(var i=-1,o=n?n.length:0;++i<o;)t=e(t,n[i],i,n);return t}(function(n,e,t){return n=D(n),void 0===(e=e)?function(n){return I.test(n)}(n)?function(n){return n.match(b)||[]}(n):function(n){return n.match(c)||[]}(n):n.match(e)||[]}(function(n){return(n=D(n))&&n.replace(l,y).replace(x,"")}(n).replace(R,"")),a,"")}),j=function(n){return"This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/"+n+"\nExported on "+(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})},P=function(n){if(n&&n.author){var e=n.author;return e.pseudo||e.firstname+" "+e.lastname}return"Inconnu"},V={__proto__:null,getHeader:j,getAuthor:P,simplifyStory:function(n,r,o){for(var a,s=n.firstSequence,u={},c=function n(e,t,r){void 0===r&&(r=!1),u[e]||(u[e]={in:[],to:[]}),r?u[e].in.push(t):(u[e].to.push(t),n(t,e,!0))},l={},d=i(n.sequences);!(a=d()).done;){var f=a.value;if(l[f.id]=f,f.choices&&f.choices.length>0)for(var m,p=i(f.choices);!(m=p()).done;){var h=m.value;if(h.content=o(h.content),h.conditions&&h.conditions.length>0)for(var g,_=i(h.conditions);!(g=_()).done;){var T=g.value;T.next&&c(f.id,T.next)}h.next&&c(f.id,h.next)}else{if(f.conditions&&f.conditions.length>0)for(var S,C=i(f.conditions);!(S=C()).done;){var O=S.value;O.next&&c(f.id,O.next)}f.next&&c(f.id,f.next)}}for(var v,E=[l[s]],R=i(Object.entries(u).map(function(n){return{data:n[1],index:n[0]}}));!(v=R()).done;){var x=v.value;(x.data.in.length>1||1===x.data.in.length&&u[x.data.in[0]].to.length>1)&&x.index!==s&&E.push(l[x.index])}for(var b=0,I=E;b<I.length;b++){for(var N=I[b],A=N.id,y=[l[A]];1===u[A].to.length;)y.push(l[A=u[A].to[0]]);N.chain=y;for(var w=[],M=0,k=y;M<k.length;M++){var L=k[M];w.push(L),L.actions&&1===L.actions.length&&L.actions[0]&&L.actions[0].params&&w.push({objectAction:r[L.actions[0].params.target],kind:L.actions[0].kind})}for(var D=[],U="",j=0,P=w;j<P.length;j++){var V=P[j];V.objectAction?(U&&(D.push(U.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),U=""),D.push(e({},V.objectAction,{actionKind:V.kind}))):U+=o(V.content)+" "}U&&D.push(U.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),N.chainedContent=D}return E.forEach(function(n){n.chain=n.chain.map(function(n){return e({},t(n,["chain","chainedContent"]))})}),E}},Y=function(n){return n.replace(/-/gi,"_")},G=function(n){return n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},H=function(n,e){return void 0===e&&(e="story"),n?(e?e+"_":"")+n.replace(/-/gi,"_"):null},F=function(n){return n.replace(/(<\/*(strong|b)>)/gi,"").replace(/(<\/*(em)>)/gi,"").replace(/(<\/*(h\d)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/<\/p>/gi,"</p> ").replace(/<\/*p>/gi,"").replace(/(<\/*(span)>)/gi,"").replace(/(\s)+/gi," ").replace(/©/gim,"(c)").replace(/@/gim,"@@64").replace(/\^/gim,"@@94").replace(/\\/gim,"@@92").replace(/~/gim,"@@126").replace(/°/gim," ").replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi,"^").replace(/(\s)*&nbsp;(\s)*/gi," ").replace(/("|“|”)/gim,"~").replace(/’/gim,"'").replace(/…/gim,"...").trim()},q={lang:"fr",encoding:"utf8",asciiOnly:!0,clsPattern:"--",disablePauseOnActions:!1,disablePauseOnSimpleSequence:!1,disablePauseOnGameOver:!1,disableClearScreenOnChoice:!1,preferSeparatorThanCls:!1},B={HEADER:"Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici :",MOIKI_PRESENTS:"Moiki présente :",A_STORY_BY:"Une histoire de",COLON:" :",CMD_HELP:"AIDE",CMD_UNDO:"RETOUR",CMD_REDO:"REFAIRE",CMD_LIST:"LISTE",CMD_SHOW:"REVOIR",CMD_EXIT:"QUITTER",CMD_YES:"oui",CMD_YES_SHORT:"o",CMD_NO:"non",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"Cette saisie ne correspond à aucun choix !",LIST_OF_COMMANDS:"Liste des commandes",RESTART_GAME:"Recommencer depuis le début",LIST_OBJECTS:"Lister les objets récupérés",RESHOW_TEXT:"Afficher le texte de la dernière séquence",QUIT:"Quitter",BYE_BYE:"Bye-bye !",CONFIRM_RESTART:"Recommencer depuis le début ?",INVENTORY_LIST:"Liste des objets de l'inventaire :",INVENTORY_EMPTY:"Votre inventaire est vide !",OBJECT_WON:"Objet récupéré : ",OBJECT_LOST:"Objet perdu : ",COUNTER_SET:" vaut maintenant : ",COUNTER_ADD:" augmente de ",COUNTER_SUB:" diminue de ",WIN_GAME:"Gagné !",LOSE_GAME:"Perdu !",COMMAND_UNKNOWN_LEFT:"Cette commande est inconnue ! Tapez ~",COMMAND_UNKNOWN_RIGHT:"~ pour une liste des commandes disponibles.",DEFAULT_CONFIRM_MSG:"Etes-vous sûr de vouloir faire cette action ?",AND:"et",OR:"ou",PLEASE_ANSWER:"Veuillez répondre par ",ANOTHER_GAME:"Lancer une autre partie ?"},W={HEADER:"This story was exported with Moiki Exporter.^The original version is avalaible here:",MOIKI_PRESENTS:"Moiki presents :",A_STORY_BY:"A story by",COLON:":",CMD_HELP:"HELP",CMD_UNDO:"UNDO",CMD_REDO:"REDO",CMD_LIST:"LIST",CMD_SHOW:"SHOW",CMD_EXIT:"EXIT",CMD_YES:"yes",CMD_YES_SHORT:"y",CMD_NO:"no",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"This entry does not correspond to any choice!",LIST_OF_COMMANDS:"List of commands",RESTART_GAME:"Restart the game",LIST_OBJECTS:"List of items won",RESHOW_TEXT:"Show the text of the last sequence",QUIT:"Quit the game",BYE_BYE:"Bye bye!",CONFIRM_RESTART:"Restart from the beginning?",INVENTORY_LIST:"List of items in inventory:",INVENTORY_EMPTY:"Inventory is empty!",OBJECT_WON:"Item won : ",OBJECT_LOST:"Item lost : ",COUNTER_SET:" is now: ",COUNTER_ADD:" increases by ",COUNTER_SUB:" decreases by ",WIN_GAME:"Won!",LOSE_GAME:"Lost!",COMMAND_UNKNOWN_LEFT:"This command is unknown! Type ~",COMMAND_UNKNOWN_RIGHT:"~ for a list of available commands.",DEFAULT_CONFIRM_MSG:"Are you sure you want to take this action?",AND:"and",OR:"or",PLEASE_ANSWER:"Please answer ",ANOTHER_GAME:"Start another game?"},z=["INVENTORY_EMPTY","INVENTORY_LIST","CMD_LIST","LIST_OBJECTS","OBJECT_WON","OBJECT_LOST"],K={__proto__:null,convertId:H,cleanContent:F,informDefaultSettings:q,DEFAULT_STRINGS_FR:B,DEFAULT_STRINGS_EN:W,stringsForItems:z,SPECIAL_CHARS:["…","ō","⨭","⨮","☼","¤","×","♦","█","■","▄","▲","▓","♥","◄"]};n.convertToInform=function(n,t,r){if("inform6"===t)return function(n,t){void 0===t&&(t={});for(var r,o=n._id,a=n.meta,s=n.firstSequence,u=n.sequences,c=n.assets,l=n.counters,d=H,f=F,m=e({},q,t),p=e({},"fr"===m.lang?B:W,m.strings||{}),h=function(n,e){return void 0===e&&(e=1),"#IfV5; style "+n+"; #EndIf;\n"+"  ".repeat(e)},g=function(n){return h("bold",n)},_=function(n){return h("underline",n)},T=function(n){return h("roman",n)},S=new Set([]),C=function(n){for(var e,t,r=f(n),o=m.asciiOnly?"":r,a=i(r);!(t=a()).done;){var s=t.value;(e=s.charCodeAt(0))>255&&!m.asciiOnly?S.add(e.toString(16)):m.asciiOnly&&(e>127&&e<255?(S.add(e.toString(16)),o+=s):o+=e>255?"?":s)}return o},O={},v={},E=function(n,e){var t=d(n,e);if(t.length>=20){if(!O[t]){var r=t.slice(0,18)+"_C";v[r]=v[r]?v[r]+1:1,O[t]=r+v[r]}return O[t]}return t},R={},x=i(c.entries());!(r=x()).done;){var b=r.value,I=b[0],N=b[1];R[N.id]=e({identifier:"_"+E(U(N.label),"")+"_"+(I+1)},N)}for(var A,y=Object.entries(R).map(function(n){return n[1]}),w={},M=i(l.entries());!(A=M()).done;){var k=A.value,L=k[0],D=k[1];w[D.id]=e({identifier:"_"+E(U(D.name),"")+"_"+(L+1),value:D.defaultValue||0},D)}for(var V,Y=Object.entries(w).map(function(n){return n[1]}),G=function(n){var e=[];if(n&&n.length>0)for(var t,r=i(n);!(t=r()).done;){var o=t.value,a=o.kind,s=o.query.params;if("passage"===a)e.push(s[0].target);else if("multiple"===a)for(var u,c=i(s);!(u=c()).done;){var l=u.value;"passage"===l.kind&&e.push(l.target)}}return e},K=[],J=i(u);!(V=J()).done;){var Z=V.value;if(Z.choices&&Z.choices.length>0)for(var X,Q=i(Z.choices);!(X=Q()).done;){var $=X.value;K.push.apply(K,G($.conditions)),$.showCondition&&$.showCondition.kind&&K.push.apply(K,G([$.showCondition]))}else K.push.apply(K,G(Z.conditions))}for(var nn,en,tn=Array.from(new Set(K)).map(function(n){return E(n)}),rn=function(n,e){switch(n){case"with":return"hasItem("+R[e].identifier+")";case"without":return"~~hasItem("+R[e].identifier+")";default:console.warn("This type of object condition is unknown:",n)}return null},on=function(n,e,t){if(isNaN(t)||"number"!=typeof t)return console.warn("The value of this counter condition is invalid:",t),null;switch(n){case"=":return w[e].identifier+" == "+t;case"!=":return w[e].identifier+" ~= "+t;case"<":case"<=":case">":case">=":return w[e].identifier+" "+n+" "+t;default:console.warn("This type of counter condition is unknown:",n)}return null},an=function(n,e){switch(n){case"by":return"userPassages--\x3ePSG_"+E(e)+" == 1";case"not-by":return"userPassages--\x3ePSG_"+E(e)+" == 0";default:console.warn("This type of passage condition is unknown:",n)}return null},sn=function(n){for(var e,t=[],r=i(n);!(e=r()).done;){var o=e.value,a=o.kind,s=o.condition,u=o.target,c=o.value;switch(a){case"object":t.push(rn(s,u));break;case"counter":t.push(on(s,u,c));break;case"passage":t.push(an(s,u));break;default:console.warn("This type of multiple condition is unknown:",a)}}return t.filter(function(n){return null!==n}).map(function(n){return"("+n+")"})},un=function(n){var e=n.kind,t=n.query,r=t.operator,i=t.params,o=i[0],a=o.target,s=o.condition,u=o.value;switch(e){case"object":return rn(s,a);case"counter":return on(s,a,u);case"passage":return an(s,a);case"multiple":var c=sn(i);return c?c.join("and"===r?" && ":" || "):null;default:console.warn("This kind of condition is unknown:",e)}},cn=function(n){for(var e,t=[],r=i(n);!(e=r()).done;){var o=e.value,a=o.kind,s=o.next,u=o.query,c=u.operator,l=u.params,d=l[0],f=d.target,m=d.condition,p=d.value;switch(a){case"object":var h=rn(m,f);h&&t.push("if ("+h+") return "+E(s)+";");break;case"counter":var g=on(m,f,p);g&&t.push("if ("+g+") return "+E(s)+";");break;case"passage":var _=an(m,f);_&&t.push("if ("+_+") return "+E(s)+";");break;case"multiple":var T=sn(l);T&&t.push("if ("+T.join("and"===c?" && ":" || ")+") return "+E(s)+";");break;default:console.warn("This kind of condition is unknown:",a)}}return t},ln=function(n){for(var e,t=[],r=i(n);!(e=r()).done;){var o=e.value,a=o.kind,s=o.params,u=s.target,c=s.modifier,l=s.value;switch(a){case"object":t.push(c+"Item("+R[u].identifier+");");break;case"counter":t.push(c+"Counter("+w[u].identifier+", "+l+");");break;default:console.warn("This kind of action is unknown:",a)}}return t},dn=function(n){return n.actions&&n.actions.length>0?[].concat(ln(n.actions),["return "+E(n.next)+";"]):n.conditions&&n.conditions.length>0?[].concat(cn(n.conditions),["return "+E(n.next)+";"]):["return "+E(n.next)+";"]},fn=function(n){var e=null,t=[],r=C(n.content);if(n.puzzle){t.push("code");for(var o,a=[],s=i(n.puzzle.codes);!(o=s()).done;){var u=o.value;a.push('if (isCommand("'+u.value+'")) {',"  return "+E(u.next)+";","}")}e=['print "'+r+'";',"code = getInputCode();"].concat(a,["return "+E(n.puzzle.defaultNext)+";"])}else if(!n.next||n.choices&&0!==n.choices.length)if(n.choices&&n.choices.length>0){var c=[],l=[],d=[],f=0;if(n.choices.filter(function(n){return n.showCondition&&n.showCondition.kind}).length>0){t.push("choice","numVisibleChoices");for(var p,h=i(n.choices);!(p=h()).done;){var g=p.value,_=C(g.content),T=!(!g.showCondition||!g.showCondition.kind)&&un(g.showCondition);T?c.push("if ("+T+") {","  numVisibleChoices = numVisibleChoices + 1;","  userChoices--\x3e"+(f+1)+" = numVisibleChoices;",'  print "- (", numVisibleChoices, "). '+_+'^";',"}"):c.push("numVisibleChoices = numVisibleChoices + 1;","userChoices--\x3e"+(f+1)+" = numVisibleChoices;",'print "- (", numVisibleChoices, "). '+_+'^";'),l.push(dn(g)),++f}d=l.map(function(n,e){return"if (choice == userChoices--\x3e"+(e+1)+") {\n    "+n.join("\n    ")+"\n  }"}),e=["numVisibleChoices = 0;",'print "'+r+'^^";'].concat(c,["choice = getInputChoice(numVisibleChoices);"],d)}else{t.push("choice");for(var S,O=i(n.choices);!(S=O()).done;){var v=S.value,R=C(v.content);c.push('print "- '+(f+1)+". "+R+'^";'),l.push(dn(v)),++f}d=l.map(function(n,e){return"if (choice == "+(e+1)+") {\n    "+n.join("\n    ")+"\n  }"}),e=['print "'+r+'^^";'].concat(c,["choice = getInputChoice("+l.length+");"],d)}}else e=['print "'+r+'^";',!m.disablePauseOnGameOver&&"wait();","gameOver = "+(n.isHappyEnd?"1":"2")+";","return nothing;"];else e=n.actions&&n.actions.length>0?['print "'+r+'^^";'].concat(ln(n.actions),["return "+E(n.next)+";"]):n.conditions&&n.conditions.length>0?['print "'+r+'";',!m.disablePauseOnSimpleSequence&&"wait();"].concat(cn(n.conditions),["return "+E(n.next)+";"]):['print "'+r+'";',!m.disablePauseOnSimpleSequence&&"wait();","return "+E(n.next)+";"];var x=E(n.id);return tn.includes(x)&&(e=["userPassages--\x3ePSG_"+x+" = 1;"].concat(e)),{statements:e.filter(function(n){return!!n}).join("\n  "),vars:t}},mn=m.preferSeparatorThanCls?'print (string) CLS_PATTERN, "^";':"cls();",pn="! This file contains the necessary core for the Moiki export to Inform6\n! kaelhem (c) 2021\n! kaelhem at gmail com\n\n\n! Inform settings\n! -------------------------------------------\n\nGlobal location = DefaultRoomForStatusBar; ! Must be the first global to show location name\nGlobal status_field_1 = 0; ! Must be the second global to show score or hours\nGlobal status_field_2 = 0; ! Must be the third global to show turns or minutes\n\n! Variables for game management\n! -------------------------------------------\n! Array path --\x3e 10; ! allow 10 undo moves, but it's not implemented yet...\nGlobal markForRedo = 0; ! used to restart game from beginning\nGlobal markForShow = 0; ! used to re-display sequence text\nGlobal gameOver = 0;\n\n#IfV3;\n  Constant ARRAY_LEN_OFFSET = 2;\n#IfNot;\n  Constant ARRAY_LEN_OFFSET = 3;\n#EndIf;\n\n! Choices management (used for visibility conditions of choices)\n! -------------------------------------------\n\nConstant MAX_CHOICES = 6;\nArray userChoices --\x3e (ARRAY_LEN_OFFSET + MAX_CHOICES);\n\n[ clearChoices i;\n  for (i=1: i<=MAX_CHOICES: i++) {\n    userChoices--\x3ei = 0;\n  }\n  return;\n];\n\n"+(y.length>0?"! Items management\n! -------------------------------------------\n\nArray userItems --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_ITEMS);\n\n[ clearItems i;\n  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n    userItems--\x3ei = 0;\n  }\n  return;\n];\n\n[ addItem index;\n  if (userItems--\x3eindex == 0) {\n    toggleItem(index);\n  }\n  return;\n];\n\n[ subItem index;\n  if (userItems--\x3eindex == 1) {\n    toggleItem(index);\n  }\n  return;\n];\n\n[ hasItem index;\n  return userItems--\x3eindex == 1;\n];\n\n[ toggleItem index;\n  "+g()+"if (userItems--\x3eindex == 0) {\n    userItems--\x3eindex = 1;\n    ++status_field_1;\n    print (string) STR_OBJECT_WON;\n  } else {\n    userItems--\x3eindex = 0;\n    --status_field_1;\n    print (string) STR_OBJECT_LOST;\n  }\n  print (string) getItemDescription(index);\n  "+T()+(m.disablePauseOnActions?"":"wait();\n  ")+"return;\n];\n\n[ countItems i count;\n  count = 0;\n  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n    if (userItems--\x3ei == 1) ++count;\n  }\n  return count;\n];\n":"")+"\n\n"+(Y.length>0?"! Counters management\n! -------------------------------------------\n\nArray userCounters --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_COUNTERS);\n\n[ clearCounters i;\n  for (i=1: i<=COUNT_TOTAL_COUNTERS: i++) {\n    userCounters--\x3ei = defaultCounterValue(i);\n  }\n  return;\n];\n\n[ setCounter index value;\n  userCounters--\x3eindex = value;\n  if (isCounterGauge(index)) {\n    "+g()+"print (string) getCounterName(index), (string) STR_COUNTER_SET, value;\n    "+T()+(m.disablePauseOnActions?"":"wait();\n  ")+"\n  }\n  return;\n];\n\n[ addCounter index value;\n  userCounters--\x3eindex = userCounters--\x3eindex + value;\n  if (isCounterGauge(index)) {\n    "+g()+'print (string) getCounterName(index), (string) STR_COUNTER_ADD, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters--\x3eindex;\n    '+T()+(m.disablePauseOnActions?"":"wait();\n  ")+"\n  }\n  return;\n];\n\n[ subCounter index value;\n  userCounters--\x3eindex = userCounters--\x3eindex - value;\n  if (isCounterGauge(index)) {\n    "+g()+'print (string) getCounterName(index), (string) STR_COUNTER_SUB, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters--\x3eindex;\n    '+T()+(m.disablePauseOnActions?"":"wait();\n  ")+"\n  }\n  return;\n];\n":"")+"\n\n"+(tn.length>0?"! Passages management (for conditions only)\n! -------------------------------------------\n\nArray userPassages --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_PASSAGES);\n\n[ clearPassages i;\n  for (i=1: i<=COUNT_TOTAL_PASSAGES: i++) {\n    userPassages--\x3ei = 0;\n  }\n  return;\n];\n":"")+"\n\n! Manage user inputs\n! -------------------------------------------\n\n! fix: in z-code v3, input buffers are not formatted the same way...\n#IfV3;\n  Constant arrayStartIndex 1;\n  [ length arr len;\n    len = 0;\n    while (arr->(len+1) ~= 0) ++len;\n    return len;\n  ];\n#Ifnot;\n  Constant arrayStartIndex 2;\n  [ length arr;\n    return arr->1;\n  ];\n#EndIf;\n\n! read user inputs\n[ KeyLine buffer;\n  buffer->0 = 10;\n  read buffer 0;\n  return buffer;\n];\n\n! convert a string into array\n[ toArray str arr;\n  @output_stream 3 arr;\n  @print_paddr str;\n  @output_stream -3;\n  return arr;\n];\n\n! take a char and return the same in lower case\n[ toLowerCase c;\n  if (c >= 'A' && c <= 'Z') return c + 32; else return c;\n];\n\n! return true if the given command as string match the current input buffer\n[isCommand cmd aCmd i;\n  aCmd = toArray(cmd);\n  if (aCmd--\x3e0 == length(key)) {\n    for (i=0: i<aCmd--\x3e0: i++) {\n      if (key->(arrayStartIndex+i) ~= toLowerCase(aCmd->(2+i))) rfalse;\n    }\n    rtrue;\n  }\n  rfalse;\n];\n\n! store user input\nArray key -> 13;\n\n! read user code\n[ getInputCode numChoices len chNum commandUnknown done;\n  do {\n    print \"> \";\n  } until(KeyLine(key)--\x3e0);\n  return key;\n];\n\n! read user choices / menu commands\n[ getInputChoice numChoices len chNum commandUnknown done;\n  done = false;\n  do {\n    commandUnknown = false;\n    do {\n      print \"> \";\n    } until(KeyLine(key)--\x3e0);\n    len = length(key);\n    if (len == 1) {\n      chNum = key->arrayStartIndex - 48;\n      if (chNum > 0 && chNum <= numChoices) {\n        "+(m.disableClearScreenOnChoice?"":mn+"\n        ")+'done = true;\n      } else if (chNum > 0 && chNum <= 10) {\n        print (string) STR_NOCHOICE_MATCH, "^";\n      } else {\n        commandUnknown = true;\n      }\n    } else if (isCommand(STR_CMD_HELP)) {\n      showHelp();\n    } else if (isCommand(STR_CMD_UNDO)) {\n      undo();\n    } else if (isCommand(STR_CMD_REDO)) {\n      if (redo()) return 0;\n    } else if (isCommand(STR_CMD_EXIT)) {\n      exit();\n    } else if (isCommand(STR_CMD_SHOW)) {\n      markForShow = 1;\n      return 0;'+(y.length>0?"\n    } else if (isCommand(STR_CMD_LIST)) {\n      inventory();\n    ":"")+'\n    } else {\n      commandUnknown = true;\n    }\n    if (commandUnknown) {\n      print (string) STR_COMMAND_UNKNOWN_LEFT, (string) STR_CMD_HELP, (string) STR_COMMAND_UNKNOWN_RIGHT, "^";\n    }\n  } until(done);\n  return chNum;\n];\n\n[ confirm question ok done;\n  done = false;\n  ok = false;\n  do {\n    do {\n      if (question) {\n        print (string) question;\n      } else {\n        print (string) STR_DEFAULT_CONFIRM_MSG;\n      }\n      print " (", (string) STR_CMD_YES, "/", (string) STR_CMD_NO, ")^> ";\n    } until(KeyLine(key)--\x3e0);\n    if (isCommand(STR_CMD_YES) || isCommand(STR_CMD_YES_SHORT)) {\n      ok = true;\n      done = true;\n    } else if (isCommand(STR_CMD_NO) || isCommand(STR_CMD_NO_SHORT)) {\n      done = true;\n    }\n    if (~~done) {\n      print (string) STR_PLEASE_ANSWER, (string) STR_CMD_YES, " ", (string) STR_OR, " ", (string) STR_CMD_NO,".^";\n    }\n  } until(done);\n  return ok;\n];\n\n[ cls;\n  #IfV3;\n    ! in v3 it seems there is no way to clear the screen...\n    print (string) CLS_PATTERN, "^";\n  #Ifnot;\n    @erase_window -1; ! this opcode is not available in V3\n  #EndIf;\n  rtrue;\n];\n\n[ wait x;\n  #IfV3;\n    read key 0;\n  #Ifnot;\n    @read_char 1 x; ! this opcode is not available in V3\n    print "^";\n  #EndIf;\n];\n\n\n! Menu\n! -------------------------------------------\n\n[ showHelp;\n  '+_()+'print (string) STR_LIST_OF_COMMANDS, "^";\n  '+T()+'! print "  - ", (string) STR_CMD_UNDO, (string) STR_COLON, " ", (string) STR_BACK_TO_PREVIOUS, "^";\n  print "  - ", (string) STR_CMD_REDO, (string) STR_COLON, " ", (string) STR_RESTART_GAME, "^";\n  print "  - ", (string) STR_CMD_SHOW, (string) STR_COLON, " ", (string) STR_RESHOW_TEXT, "^";\n  print "  - ", (string) STR_CMD_EXIT, (string) STR_COLON, " ", (string) STR_QUIT, "^";\n  '+(y.length>0?'print "  - ", (string) STR_CMD_LIST, (string) STR_COLON, " ", (string) STR_LIST_OBJECTS, "^";\n  ':"")+'rtrue;\n];\n\n[ exit;\n  print (string) STR_BYE_BYE, "^";\n  @quit;\n];\n\n[ undo;\n  print "Undo: not implemented yet !^";\n  rtrue;\n];\n\n[ redo;\n  if (confirm(STR_CONFIRM_RESTART)) {\n    markForRedo = 1;\n    rtrue;\n  }\n  rfalse;\n];\n'+(y.length>0?'\n[ inventory i;\n  if (countItems() == 0) {\n    print (string) STR_INVENTORY_EMPTY, "^";\n  } else {\n    '+_(2)+'print (string) STR_INVENTORY_LIST, "^";\n    '+T(2)+'for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n      if (hasItem(i)) print "* ", (string) getItemDescription(i), "^";\n    }\n  }\n  rtrue;\n];\n':"")+"\n\n! Presentation\n! -------------------------------------------\n\n[ startScreen;\n  "+_()+'print (string) STR_HEADER, " ", (string) STORY_URL, "^^";\n  '+T()+'print (string) STR_MOIKI_PRESENTS, "^";\n  '+g()+'print (string) STORY_TITLE, "^^";\n  '+T()+'print (string) STR_A_STORY_BY, " ", (string) STORY_AUTHOR, "^^", (string) STORY_DESCRIPTION, "^";\n  rtrue;\n];\n\n\n! Game loop\n! -------------------------------------------\n[ mainLoop firstSequence next res;\n  next = firstSequence;\n  do {\n    ++status_field_2; ! increase turn counter\n    res = next();\n    if (markForShow == 1) {\n      markForShow = 0;\n      res = next;\n    }\n    if (markForRedo == 1) {\n      res = false;\n    }\n    next = res;\n    print "^";\n  } until(~~next);\n  if (gameOver > 0) {\n    '+g(2)+'if (gameOver == 1) {\n      print (string) STR_WIN_GAME, "^^";\n    } else if (gameOver == 2) {\n      print (string) STR_LOSE_GAME, "^^";\n    }\n    '+T(2)+"gameOver = 0;\n  }\n];\n\n[ startGame firstSequence replay;\n  startScreen();\n  wait();\n  do {\n    cls();\n    replay = false;\n    location = DefaultRoomForStatusBar; ! reset location (avoid compiler warning)\n    status_field_1 = 0; ! reset score\n    status_field_2 = 0; ! reset turns\n    "+(y.length>0?"clearItems();":"")+"\n    "+(Y.length>0?"clearCounters();":"")+"\n    "+(tn.length>0?"clearPassages();":"")+"\n    mainLoop(firstSequence);\n    if (markForRedo == 1) {\n      markForRedo = 0;\n      replay = true;\n    } else {\n      if (confirm(STR_ANOTHER_GAME)) {\n        replay = true;\n      } else {\n        exit();\n      }\n    }\n  } until(~~replay);\n];\n",hn=("utf8"===m.encoding?"!% -Cu\n":"")+"!% -~S\n!% $OMIT_UNUSED_ROUTINES=1\n%%SPECIAL_CHARS%%\n! "+j(o).split("\n").join("\n! ")+"\n\n! author: "+P(a)+"\n! title: "+a.name+'\n\nObject DefaultRoomForStatusBar "'+a.name+'"; ! used to force name in status line\n\n! Constants\n! -------------------------------------------\nConstant STORY_TITLE = "'+C(a.name)+'";\nConstant STORY_DESCRIPTION = "'+C(a.description)+'";\nConstant STORY_AUTHOR = "'+C(P(a))+'";\nConstant STORY_URL = "https://moiki.fr/story/'+o+'";\n\n! Strings\n'+Object.entries(p).filter(function(n){var e=n[0];return!(z.find(function(n){return n===e})&&0===y.length)}).map(function(n){return"Constant STR_"+n[0]+' = "'+n[1]+'";'}).join("\n")+'\n! Config\nConstant CLS_PATTERN = "'+m.clsPattern.slice(0,40).repeat(40).slice(0,40)+'";\n\n'+(y.length>0?"\n! Defines objects / heroes\n!-------------------------------------------\nConstant COUNT_TOTAL_ITEMS = "+y.length+";\n\n"+y.map(function(n,e){return"Constant "+n.identifier+" = "+(e+1)+";"}).join("\n")+"\n\n[ getItemDescription index;\n  switch (index) {\n    "+y.map(function(n){return n.identifier+': return "'+C(n.label)+" - ~"+C(n.desc)+'~";'}).join("\n    ")+'\n    default: return "";\n  }\n];\n\n':"")+"\n\n"+(Y.length>0?"\n! Defines counters\n!-------------------------------------------\nConstant COUNT_TOTAL_COUNTERS = "+Y.length+";\n\n"+Y.map(function(n,e){return"Constant "+n.identifier+" = "+(e+1)+";"}).join("\n")+"\n\n[ getCounterName index;\n  switch (index) {\n    "+Y.map(function(n){return n.identifier+': return "'+n.name+'";'}).join("\n    ")+'\n    default: return "Undefined counter";\n  }\n];\n\n[ defaultCounterValue index;\n  switch (index) {\n    '+Y.map(function(n){return n.identifier+": return "+(n.defaultValue||0)+";"}).join("\n    ")+"\n    default: return 0;\n  }\n];\n\n[ isCounterGauge index;\n  switch (index) {\n    "+Y.filter(function(n){return n.gauge}).map(function(n){return n.identifier+": rtrue;"}).join("\n    ")+"\n    default: return false;\n  }\n];\n\n":"")+"\n\n"+(tn.length>0?"\n! Defines passages (used only for conditions)\n!-------------------------------------------\nConstant COUNT_TOTAL_PASSAGES = "+tn.length+";\n\n"+tn.map(function(n,e){return"Constant PSG_"+n+" = "+(e+1)+";"}).join("\n")+"\n\n":"")+'\n\n! Include MoikInform library\n! ------------------------------------------\nInclude "moikinform";\n\n\n! App entry point\n! ------------------------------------------\n[ Main;\n  startGame('+E(s)+");\n];\n\n\n! Story sequences\n! ------------------------------------------\n",gn=i(u);!(nn=gn()).done;){var _n=nn.value,Tn=fn(_n),Sn=Tn.statements,Cn=Tn.vars;hn+="[ "+E(_n.id)+(Cn&&Cn.length>0?" "+Cn.join(" "):"")+";\n  "+Sn+"\n];\n\n"}return[{filename:"story.inf",data:hn.replace("%%SPECIAL_CHARS%%",(en=Array.from(S),en.length>0?"\n"+(m.asciiOnly?"Zcharacter table +":"Zcharacter table")+" "+en.map(function(n){return"'@{"+n+"}'"}).join(" ")+";\n":""))},{filename:"moikinform.h",data:pn}]}(n,r);throw new Error("This format is unvailable!")},n.convertToInk=function(n){for(var t,r=n._id,o=n.meta,a=n.firstSequence,s=n.sequences,u=n.counters,c={},l=i(n.assets);!(t=l()).done;){var d=t.value;c[d.id]=e({inkVar:"_object_"+Y(U(d.label))},d)}for(var f,m={},p=i(u);!(f=p()).done;){var h=f.value;m[h.id]=e({inkVar:"_counter_"+Y(U(h.name))},h)}var g=function(n,e,t){var r=e[0],o=r.condition,a=r.target,s=r.value;switch(n){case"object":return function(n,e){var t=c[e].inkVar;switch(n){case"with":return t;case"without":return"not "+t;default:console.warn("This type of object condition is unknown:",n)}return null}(o,a);case"counter":return function(n,e,t){var r=m[e].inkVar;if(isNaN(t)||"number"!=typeof t)return console.warn("The value of this counter condition is invalid:",t),null;switch(n){case"=":case"!=":case"<":case"<=":case">":case">=":return r+" "+n+" "+t;default:console.warn("This type of counter condition is unknown:",n)}return null}(o,a,s);case"passage":return function(n,e){switch(n){case"by":return""+Y(e);case"not-by":return"not "+Y(e);default:console.warn("This type of passage condition is unknown:",n)}return null}(o,a);case"multiple":var u=function(n){for(var e,t=[],r=i(n);!(e=r()).done;){var o=e.value;t.push(g(o.kind,[{condition:o.condition,target:o.target,value:o.value}]))}return t.filter(function(n){return null!==n})}(e);return u&&u.length>0?u.join("and"===t?" && ":" || "):null;default:console.warn("This kind of condition is unknown:",n)}},_=function(n,e,t){void 0===t&&(t=!1);var r=n.map(function(n){var e=n.next,t=n.query,r=t.operator;return{cond:g(n.kind,t.params,void 0===r?null:r),next:e}}),i=null;return r&&r.length>0&&(i=[].concat(r,[{cond:"else",next:e}]).map(function(n){return"- "+n.cond+":\n  -> "+Y(n.next)}).join("\n").replace(/\n/g,"\n  ")),i?(t?"\n":"")+"{\n  "+i+"\n}\n":"-> "+Y(e)+" \n"},T=function(n){var e=n.kind,t=n.params;switch(e){case"object":return function(n){var e=n.modifier,t=c[n.target],r=t.inkVar,i=t.label,o=t.desc;switch(e){case"toggle":return["~ "+r+" = !"+r,"{ "+r+":","  <em>Objet récupéré : "+i+' - "'+o+'"</em>',"- else:","  <em>Objet perdu : "+i+' - "'+o+'"</em>',"}"];case"add":return["{ not "+r+":","  ~ "+r+" = true","  <em>Objet récupéré : "+i+' - "'+o+'"</em>',"}"];case"sub":return["{ "+r+":","  ~ "+r+" = false","  <em>Objet perdu : "+i+' - "'+o+'"</em>',"}"];default:console.warn("This action modifier is unknown:",e)}return null}(t);case"counter":return function(n){var e=n.modifier,t=n.value,r=m[n.target],i=r.inkVar,o=r.name,a=r.gauge;switch(e){case"set":var s=["~ "+i+" = "+t];return a?[].concat(s,["<em>"+o+" vaut maintenant : "+t+"</em>"]):s;case"add":var u=["~ "+i+" += "+t];return a?[].concat(u,["<em>"+o+" augmente de "+t+" et vaut maintenant : {"+i+"}</em>"]):u;case"sub":var c=["~ "+i+" -= "+t];return a?[].concat(c,["<em>"+o+" diminue de "+t+" et vaut maintenant : {"+i+"}</em>"]):c;default:console.warn("This action modifier is unknown:",e)}return null}(t);default:console.warn("This kind of action is unknown:",e)}},S=function(n){for(var e,t=[],r=i(n);!(e=r()).done;){var o=T(e.value);o&&t.push(o.join("\n"))}return t&&t.length>0?t.join("\n")+"\n":null},C="/*\n"+j(r)+"\n*/\n\n# author: "+P(o)+"\n# title: "+o.name+"\n";o.image&&(C+="# IMAGE: "+o.image.replace(/\//gi,"\\/")+'\n<em>Crédit photo : <a href="'+"https://unsplash.com".replace(/\//gi,"\\/")+'">Unsplash</a></em>\n'),C+="<em>"+o.description+"</em>\n<hr/>\n";for(var O,v=i(Object.entries(c).map(function(n){return n[1]}));!(O=v()).done;)C+="VAR "+O.value.inkVar+" = false\n";for(var E,R=i(Object.entries(m).map(function(n){return n[1]}));!(E=R()).done;){var x=E.value,b=x.defaultValue;C+="VAR "+x.inkVar+" = "+(void 0===b?0:b)+"\n"}C+="\n-> "+Y(a)+"\n";for(var I,N=i(s);!(I=N()).done;){var A=I.value,y=G(A.content);if(C+="\n=== "+Y(A.id)+" ===\n",C+=y+"\n",A.puzzle);else if(A.choices&&A.choices.length>0){for(var w,M=i(A.choices);!(w=M()).done;){var k=w.value,L=" ";k.actions&&k.actions.length>0&&(L=S(k.actions));var D="+ ";if(k.showCondition&&k.showCondition.kind){var V=k.showCondition,H=V.query,F=H.operator;D+="{"+g(V.kind,H.params,void 0===F?null:F)+"} "}var q=D+"["+G(k.content)+"]"+L;C+=k.conditions&&k.conditions.length>0?q+" "+_(k.conditions,k.next,!0):q+"-> "+Y(k.next)+"\n"}C+="# CLEAR\n"}else A.actions&&A.actions.length>0&&(C+=S(A.actions)),C+=A.conditions&&A.conditions.length>0?_(A.conditions,A.next):A.next?"-> "+Y(A.next)+"\n":"-> END\n"}return C},n.inform6Utils=K,n.migrate=function(n){var r=n.meta.version||1;switch(n.meta.version=2,r){case 1:return function(n){var r=s(n);return e({},r,{meta:e({},r.meta,{simplified:!0}),sequences:r.sequences.map(function(n){var e=n._doc||n,r=e.action,i=e.condition,o=t(e,["action","condition"]);return r&&r.params&&(o.actions=[{kind:"object",params:{target:r.params,modifier:"toggle"}}]),i&&i.params&&i.next&&(o.conditions=[{kind:"object",query:{params:[{target:i.params,condition:"with"}]},next:i.next}]),o.choices&&o.choices.length>0&&(o.choices=o.choices.map(function(n){var e=n._doc||n,r=e.action,i=e.condition,o=t(e,["action","condition"]);return r&&r.params&&(o.actions=[{kind:"object",params:{target:r.params,modifier:"toggle"}}]),i&&i.params&&i.next&&(o.conditions=[{kind:"object",query:{params:[{target:i.params,condition:"with"}]},next:i.next}]),o})),o})})}(n);default:return function(n){return s(n)}(n)}},n.utils=V,n.version="2.0.6"});
//# sourceMappingURL=moiki-exporter.umd.js.map
