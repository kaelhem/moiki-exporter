function n(){return(n=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function e(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)e.indexOf(t=o[r])>=0||(i[t]=n[t]);return i}function t(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function r(n,e){var r;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(r=function(n,e){if(n){if("string"==typeof n)return t(n,void 0);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(n,void 0):void 0}}(n))||e&&n&&"number"==typeof n.length){r&&(n=r);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=n[Symbol.iterator]()).next.bind(r)}var i,o,a=function(n){return"This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/"+n+"\nExported on "+(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})},s=function(n){if(n&&n.author){var e=n.author;return e.pseudo||e.firstname+" "+e.lastname}return"Inconnu"},u={__proto__:null,getHeader:a,getAuthor:s,simplifyStory:function(t,i,o){for(var a,s=t.firstSequence,u={},c=function n(e,t,r){void 0===r&&(r=!1),u[e]||(u[e]={in:[],to:[]}),r?u[e].in.push(t):(u[e].to.push(t),n(t,e,!0))},l={},d=r(t.sequences);!(a=d()).done;){var f=a.value;if(l[f.id]=f,f.choices&&f.choices.length>0)for(var m,p=r(f.choices);!(m=p()).done;){var h=m.value;if(h.content=o(h.content),h.conditions&&h.conditions.length>0)for(var _,g=r(h.conditions);!(_=g()).done;){var T=_.value;T.next&&c(f.id,T.next)}else h.next&&c(f.id,h.next)}else if(f.conditions&&f.conditions.length>0)for(var S,C=r(f.conditions);!(S=C()).done;){var O=S.value;O.next&&c(f.id,O.next)}else f.next&&c(f.id,f.next)}for(var v,E=[l[s]],R=r(Object.entries(u).map(function(n){return{data:n[1],index:n[0]}}));!(v=R()).done;){var x=v.value;(x.data.in.length>1||1===x.data.in.length&&u[x.data.in[0]].to.length>1)&&x.index!==s&&E.push(l[x.index])}for(var b=0,N=E;b<N.length;b++){for(var I=N[b],A=I.id,y=[l[A]];1===u[A].to.length;)y.push(l[A=u[A].to[0]]);I.chain=y;for(var w=[],M=0,k=y;M<k.length;M++){var L=k[M];w.push(L),L.actions&&1===L.actions.length&&L.actions[0]&&L.actions[0].params&&w.push({objectAction:i[L.actions[0].params.target],kind:L.actions[0].kind})}for(var D=[],U="",j=0,P=w;j<P.length;j++){var V=P[j];V.objectAction?(U&&(D.push(U.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),U=""),D.push(n({},V.objectAction,{actionKind:V.kind}))):U+=o(V.content)+" "}U&&D.push(U.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),I.chainedContent=D}return E.forEach(function(t){t.chain=t.chain.map(function(t){return n({},e(t,["chain","chainedContent"]))})}),E}},c=function(n){var e=n.meta.version||1;switch(n.meta.version=2,e){case 1:return f(n);default:return d(n)}},l=function(n){var e=n.sequences,t=n.assets,r=n.sounds,i=n.counters,o=n.stats;return{_id:n._id,meta:n.meta,theme:n.theme,firstSequence:n.firstSequence||(e&&e.length>0?e[0].id:"intro"),sequences:e&&e.length>0?e:[{id:"intro",content:""}],counters:void 0===i?[]:i,assets:void 0===t?[]:t,sounds:void 0===r?[]:r,stats:void 0===o?{numView:0}:o}},d=function(n){return l(n)},f=function(t){var r=l(t);return n({},r,{meta:n({},r.meta,{simplified:!0}),sequences:r.sequences.map(function(n){var t=n._doc||n,r=t.action,i=t.condition,o=e(t,["action","condition"]);return r&&r.params&&(o.actions=[{kind:"object",params:{target:r.params,modifier:"toggle"}}]),i&&i.params&&i.next&&(o.conditions=[{kind:"object",query:{params:[{target:i.params,condition:"with"}]},next:i.next}]),o.choices&&o.choices.length>0&&(o.choices=o.choices.map(function(n){var t=n._doc||n,r=t.action,i=t.condition,o=e(t,["action","condition"]);return r&&r.params&&(o.actions=[{kind:"object",params:{target:r.params,modifier:"toggle"}}]),i&&i.params&&i.next&&(o.conditions=[{kind:"object",query:{params:[{target:i.params,condition:"with"}]},next:i.next}]),o})),o})})},m="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},p=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,h=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,_="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",g="["+_+"]",T="\\d+",S="[a-z\\xdf-\\xf6\\xf8-\\xff]",C="[^\\ud800-\\udfff"+_+T+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",O="(?:\\ud83c[\\udde6-\\uddff]){2}",v="[\\ud800-\\udbff][\\udc00-\\udfff]",E="[A-Z\\xc0-\\xd6\\xd8-\\xde]",R="(?:"+S+"|"+C+")",x="(?:"+E+"|"+C+")",b="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",N="[\\ufe0e\\ufe0f]?"+b+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",O,v].join("|")+")[\\ufe0e\\ufe0f]?"+b+")*",I="(?:"+["[\\u2700-\\u27bf]",O,v].join("|")+")"+N,A=RegExp("['’]","g"),y=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),w=RegExp([E+"?"+S+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[g,E,"$"].join("|")+")",x+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[g,E+R,"$"].join("|")+")",E+"?"+R+"+(?:['’](?:d|ll|m|re|s|t|ve))?",E+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",T,I].join("|"),"g"),M=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,k="object"==typeof self&&self&&self.Object===Object&&self,L="object"==typeof m&&m&&m.Object===Object&&m||k||Function("return this")(),D=(i={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(n){return null==i?void 0:i[n]}),U=Object.prototype.toString,j=L.Symbol,P=j?j.prototype:void 0,V=P?P.toString:void 0;function Y(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==U.call(n)}(n))return V?V.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var G=(o=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,r){for(var i=-1,o=n?n.length:0;++i<o;)t=e(t,n[i],i,n);return t}(function(n,e,t){return n=Y(n),void 0===(e=e)?function(n){return M.test(n)}(n)?function(n){return n.match(w)||[]}(n):function(n){return n.match(p)||[]}(n):n.match(e)||[]}(function(n){return(n=Y(n))&&n.replace(h,D).replace(y,"")}(n).replace(A,"")),o,"")}),F=function(n){return n.replace(/-/gi,"_")},H=function(n){return n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},q=function(e){for(var t,i=e._id,o=e.meta,u=e.firstSequence,c=e.sequences,l=e.counters,d={},f=r(e.assets);!(t=f()).done;){var m=t.value;d[m.id]=n({inkVar:"_object_"+F(G(m.label))},m)}for(var p,h={},_=r(l);!(p=_()).done;){var g=p.value;h[g.id]=n({inkVar:"_counter_"+F(G(g.name))},g)}var T=function(n,e,t){var i=e[0],o=i.condition,a=i.target,s=i.value;switch(n){case"object":return function(n,e){var t=d[e].inkVar;switch(n){case"with":return t;case"without":return"not "+t;default:console.warn("This type of object condition is unknown:",n)}return null}(o,a);case"counter":return function(n,e,t){var r=h[e].inkVar;if(isNaN(t)||"number"!=typeof t)return console.warn("The value of this counter condition is invalid:",t),null;switch(n){case"=":case"!=":case"<":case"<=":case">":case">=":return r+" "+n+" "+t;default:console.warn("This type of counter condition is unknown:",n)}return null}(o,a,s);case"passage":return function(n,e){switch(n){case"by":return""+F(e);case"not-by":return"not "+F(e);default:console.warn("This type of passage condition is unknown:",n)}return null}(o,a);case"multiple":var u=function(n){for(var e,t=[],i=r(n);!(e=i()).done;){var o=e.value;t.push(T(o.kind,[{condition:o.condition,target:o.target,value:o.value}]))}return t.filter(function(n){return null!==n})}(e);return console.log(u),u&&u.length>0?u.join("and"===t?" && ":" || "):null;default:console.warn("This kind of condition is unknown:",n)}},S=function(n,e,t){void 0===t&&(t=!1);var r=n.map(function(n){var e=n.next,t=n.query,r=t.operator;return{cond:T(n.kind,t.params,void 0===r?null:r),next:e}}),i=null;return r&&r.length>0&&(i=[].concat(r,[{cond:"else",next:e}]).map(function(n){return"- "+n.cond+":\n  -> "+F(n.next)}).join("\n").replace(/\n/g,"\n  ")),i?(t?"\n":"")+"{\n  "+i+"\n}\n":"-> "+F(e)+" \n"},C=function(n){var e=n.kind,t=n.params;switch(e){case"object":return function(n){var e=n.modifier,t=d[n.target],r=t.inkVar,i=t.label,o=t.desc;switch(e){case"toggle":return["~ "+r+" = !"+r,"{ "+r+":","  <em>Objet récupéré : "+i+' - "'+o+'"</em>',"- else:","  <em>Objet perdu : "+i+' - "'+o+'"</em>',"}"];case"add":return["{ not "+r+":","  ~ "+r+" = true","  <em>Objet récupéré : "+i+' - "'+o+'"</em>',"}"];case"sub":return["{ "+r+":","  ~ "+r+" = false","  <em>Objet perdu : "+i+' - "'+o+'"</em>',"}"];default:console.warn("This action modifier is unknown:",e)}return null}(t);case"counter":return function(n){var e=n.modifier,t=n.value,r=h[n.target],i=r.inkVar,o=r.name,a=r.gauge;switch(e){case"set":var s=["~ "+i+" = "+t];return a?[].concat(s,["<em>"+o+" vaut maintenant : "+t+"</em>"]):s;case"add":var u=["~ "+i+" += "+t];return a?[].concat(u,["<em>"+o+" augmente de "+t+" et vaut maintenant : {"+i+"}</em>"]):u;case"sub":var c=["~ "+i+" -= "+t];return a?[].concat(c,["<em>"+o+" diminue de "+t+" et vaut maintenant : {"+i+"}</em>"]):c;default:console.warn("This action modifier is unknown:",e)}return null}(t);default:console.warn("This kind of action is unknown:",e)}},O=function(n){for(var e,t=[],i=r(n);!(e=i()).done;){var o=C(e.value);o&&t.push(o.join("\n"))}return t&&t.length>0?t.join("\n")+"\n":null},v="/*\n"+a(i)+"\n*/\n\n# author: "+s(o)+"\n# title: "+o.name+"\n";o.image&&(v+="# IMAGE: "+o.image.replace(/\//gi,"\\/")+'\n<em>Crédit photo : <a href="'+"https://unsplash.com".replace(/\//gi,"\\/")+'">Unsplash</a></em>\n'),v+="<em>"+o.description+"</em>\n<hr/>\n";for(var E,R=r(Object.entries(d).map(function(n){return n[1]}));!(E=R()).done;)v+="VAR "+E.value.inkVar+" = false\n";for(var x,b=r(Object.entries(h).map(function(n){return n[1]}));!(x=b()).done;){var N=x.value,I=N.defaultValue;v+="VAR "+N.inkVar+" = "+(void 0===I?0:I)+"\n"}v+="\n-> "+F(u)+"\n";for(var A,y=r(c);!(A=y()).done;){var w=A.value,M=H(w.content);if(v+="\n=== "+F(w.id)+" ===\n",v+=M+"\n",w.choices&&w.choices.length>0){for(var k,L=r(w.choices);!(k=L()).done;){var D=k.value,U=" ";D.actions&&D.actions.length>0&&(U=O(D.actions));var j="+ ";if(D.showCondition&&D.showCondition.kind){var P=D.showCondition,V=P.query,Y=V.operator;j+="{"+T(P.kind,V.params,void 0===Y?null:Y)+"} "}var q=j+"["+H(D.content)+"]"+U;v+=D.conditions&&D.conditions.length>0?q+" "+S(D.conditions,D.next,!0):q+"-> "+F(D.next)+"\n"}v+="# CLEAR\n"}else w.actions&&w.actions.length>0&&(v+=O(w.actions)),v+=w.conditions&&w.conditions.length>0?S(w.conditions,w.next):w.next?"-> "+F(w.next)+"\n":"-> END\n"}return v},B=function(n,e){return void 0===e&&(e="story"),n?(e?e+"_":"")+n.replace(/-/gi,"_"):null},W=function(n){return n.replace(/(<\/*(strong|b)>)/gi,"").replace(/(<\/*(em)>)/gi,"").replace(/(<\/*(h\d)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/<\/p>/gi,"</p> ").replace(/<\/*p>/gi,"").replace(/(<\/*(span)>)/gi,"").replace(/(\s)+/gi," ").replace(/©/gim,"(c)").replace(/@/gim,"@@64").replace(/\^/gim,"@@94").replace(/\\/gim,"@@92").replace(/~/gim,"@@126").replace(/°/gim," ").replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi,"^").replace(/(\s)*&nbsp;(\s)*/gi," ").replace(/("|“|”)/gim,"~").replace(/’/gim,"'").trim()},K={lang:"fr",encoding:"utf8",clsPattern:"--",disablePauseOnActions:!1,disablePauseOnSimpleSequence:!1,disablePauseOnGameOver:!1,disableClearScreenOnChoice:!1,preferSeparatorThanCls:!1},J={HEADER:"Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici :",MOIKI_PRESENTS:"Moiki présente :",A_STORY_BY:"Une histoire de",COLON:" :",CMD_HELP:"AIDE",CMD_UNDO:"RETOUR",CMD_REDO:"REFAIRE",CMD_LIST:"LISTE",CMD_SHOW:"REVOIR",CMD_EXIT:"QUITTER",CMD_YES:"oui",CMD_YES_SHORT:"o",CMD_NO:"non",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"Cette saisie ne correspond à aucun choix !",LIST_OF_COMMANDS:"Liste des commandes",RESTART_GAME:"Recommencer depuis le début",LIST_OBJECTS:"Lister les objets récupérés",RESHOW_TEXT:"Afficher le texte de la dernière séquence",QUIT:"Quitter",BYE_BYE:"Bye-bye !",CONFIRM_RESTART:"Recommencer depuis le début ?",INVENTORY_LIST:"Liste des objets de l'inventaire :",INVENTORY_EMPTY:"Votre inventaire est vide !",OBJECT_WON:"Objet récupéré : ",OBJECT_LOST:"Objet perdu : ",COUNTER_SET:" vaut maintenant : ",COUNTER_ADD:" augmente de ",COUNTER_SUB:" diminue de ",WIN_GAME:"Gagné !",LOSE_GAME:"Perdu !",COMMAND_UNKNOWN_LEFT:"Cette commande est inconnue ! Tapez ~",COMMAND_UNKNOWN_RIGHT:"~ pour une liste des commandes disponibles.",DEFAULT_CONFIRM_MSG:"Etes-vous sûr de vouloir faire cette action ?",AND:"et",OR:"ou",PLEASE_ANSWER:"Veuillez répondre par ",ANOTHER_GAME:"Lancer une autre partie ?"},z={HEADER:"This story was exported with Moiki Exporter.^The original version is avalaible here:",MOIKI_PRESENTS:"Moiki presents :",A_STORY_BY:"A story by",COLON:":",CMD_HELP:"HELP",CMD_UNDO:"UNDO",CMD_REDO:"REDO",CMD_LIST:"LIST",CMD_SHOW:"SHOW",CMD_EXIT:"EXIT",CMD_YES:"yes",CMD_YES_SHORT:"y",CMD_NO:"no",CMD_NO_SHORT:"n",NOCHOICE_MATCH:"This entry does not correspond to any choice!",LIST_OF_COMMANDS:"List of commands",RESTART_GAME:"Restart the game",LIST_OBJECTS:"List of items won",RESHOW_TEXT:"Show the text of the last sequence",QUIT:"Quit the game",BYE_BYE:"Bye bye!",CONFIRM_RESTART:"Restart from the beginning?",INVENTORY_LIST:"List of items in inventory:",INVENTORY_EMPTY:"Inventory is empty!",OBJECT_WON:"Item won : ",OBJECT_LOST:"Item lost : ",COUNTER_SET:" is now: ",COUNTER_ADD:" increases by ",COUNTER_SUB:" decreases by ",WIN_GAME:"Won!",LOSE_GAME:"Lost!",COMMAND_UNKNOWN_LEFT:"This command is unknown! Type ~",COMMAND_UNKNOWN_RIGHT:"~ for a list of available commands.",DEFAULT_CONFIRM_MSG:"Are you sure you want to take this action?",AND:"and",OR:"or",PLEASE_ANSWER:"Please answer ",ANOTHER_GAME:"Start another game?"},X=["INVENTORY_EMPTY","INVENTORY_LIST","CMD_LIST","LIST_OBJECTS","OBJECT_WON","OBJECT_LOST"],Z={__proto__:null,convertId:B,cleanContent:W,informDefaultSettings:K,DEFAULT_STRINGS_FR:J,DEFAULT_STRINGS_EN:z,stringsForItems:X},Q=function(e,t,i){if("inform6"===t)return function(e,t){void 0===t&&(t={});for(var i,o=e._id,u=e.meta,c=e.firstSequence,l=e.sequences,d=e.assets,f=e.counters,m=B,p=W,h=n({},K,t),_=n({},"fr"===h.lang?J:z,h.strings||{}),g=function(n,e){return void 0===e&&(e=1),"#IfV5; style "+n+"; #EndIf;\n"+"  ".repeat(e)},T=function(n){return g("bold",n)},S=function(n){return g("underline",n)},C=function(n){return g("roman",n)},O={},v=r(d.entries());!(i=v()).done;){var E=i.value,R=E[0],x=E[1];O[x.id]=n({identifier:"_"+m(G(x.label),"")+"_"+(R+1)},x)}for(var b,N=Object.entries(O).map(function(n){return n[1]}),I={},A=r(f.entries());!(b=A()).done;){var y=b.value,w=y[0],M=y[1];I[M.id]=n({identifier:"_"+m(G(M.name),"")+"_"+(w+1),value:M.defaultValue||0},M)}for(var k,L=Object.entries(I).map(function(n){return n[1]}),D=function(n){var e=[];if(n&&n.length>0)for(var t,i=r(n);!(t=i()).done;){var o=t.value,a=o.kind,s=o.query.params;if("passage"===a)e.push(s[0].target);else if("multiple"===a)for(var u,c=r(s);!(u=c()).done;){var l=u.value;"passage"===l.kind&&e.push(l.target)}}return e},U=[],j=r(l);!(k=j()).done;){var P=k.value;if(P.choices&&P.choices.length>0)for(var V,Y=r(P.choices);!(V=Y()).done;){var F=V.value;U.push.apply(U,D(F.conditions)),F.showCondition&&F.showCondition.kind&&U.push.apply(U,D([F.showCondition]))}else U.push.apply(U,D(P.conditions))}for(var H,q=[].concat(new Set(U)).map(function(n){return m(n)}),Z=function(n,e){switch(console.log(n,e),n){case"with":return"hasItem("+O[e].identifier+")";case"without":return"~~hasItem("+O[e].identifier+")";default:console.warn("This type of object condition is unknown:",n)}return null},Q=function(n,e,t){if(isNaN(t)||"number"!=typeof t)return console.warn("The value of this counter condition is invalid:",t),null;switch(n){case"=":return I[e].identifier+" == "+t;case"!=":return I[e].identifier+" ~= "+t;case"<":case"<=":case">":case">=":return I[e].identifier+" "+n+" "+t;default:console.warn("This type of counter condition is unknown:",n)}return null},$=function(n,e){switch(n){case"by":return"userPassages--\x3ePSG_"+m(e)+" == 1";case"not-by":return"userPassages--\x3ePSG_"+m(e)+" == 0";default:console.warn("This type of passage condition is unknown:",n)}return null},nn=function(n){for(var e,t=[],i=r(n);!(e=i()).done;){var o=e.value,a=o.kind,s=o.condition,u=o.target,c=o.value;switch(a){case"object":t.push(Z(s,u));break;case"counter":t.push(Q(s,u,c));break;case"passage":t.push($(s,u));break;default:console.warn("This type of multiple condition is unknown:",a)}}return t.filter(function(n){return null!==n}).map(function(n){return"("+n+")"})},en=function(n){var e=n.kind,t=n.query,r=t.operator,i=t.params,o=i[0],a=o.target,s=o.condition,u=o.value;switch(e){case"object":return Z(s,a);case"counter":return Q(s,a,u);case"passage":return $(s,a);case"multiple":var c=nn(i);return c?c.join("and"===r?" && ":" || "):null;default:console.warn("This kind of condition is unknown:",e)}},tn=function(n){for(var e,t=[],i=r(n);!(e=i()).done;){var o=e.value,a=o.kind,s=o.next,u=o.query,c=u.operator,l=u.params,d=l[0],f=d.target,p=d.condition,h=d.value;switch(a){case"object":var _=Z(p,f);_&&t.push("if ("+_+") return "+m(s)+";");break;case"counter":var g=Q(p,f,h);g&&t.push("if ("+g+") return "+m(s)+";");break;case"passage":var T=$(p,f);T&&t.push("if ("+T+") return "+m(s)+";");break;case"multiple":var S=nn(l);S&&t.push("if ("+S.join("and"===c?" && ":" || ")+") return "+m(s)+";");break;default:console.warn("This kind of condition is unknown:",a)}}return t},rn=function(n){for(var e,t=[],i=r(n);!(e=i()).done;){var o=e.value,a=o.kind,s=o.params,u=s.target,c=s.modifier,l=s.value;switch(a){case"object":t.push(c+"Item("+O[u].identifier+");");break;case"counter":t.push(c+"Counter("+I[u].identifier+", "+l+");");break;default:console.warn("This kind of action is unknown:",a)}}return t},on=function(n){return n.actions&&n.actions.length>0?[].concat(rn(n.actions),["return "+m(n.next)+";"]):n.conditions&&n.conditions.length>0?[].concat(tn(n.conditions),["return "+m(n.next)+";"]):["return "+m(n.next)+";"]},an=function(n){var e=null,t=[],i=p(n.content);if(!n.next||n.choices&&0!==n.choices.length)if(n.choices&&n.choices.length>0){var o=[],a=[],s=[],u=0;if(n.choices.filter(function(n){return n.showCondition&&n.showCondition.kind}).length>0){t.push("choice","numVisibleChoices");for(var c,l=r(n.choices);!(c=l()).done;){var d=c.value,f=p(d.content);console.log(f);var _=!(!d.showCondition||!d.showCondition.kind)&&en(d.showCondition);_?o.push("if ("+_+") {","  numVisibleChoices = numVisibleChoices + 1;","  userChoices--\x3e"+(u+1)+" = numVisibleChoices;",'  print "- (", numVisibleChoices, "). '+f+'^";',"}"):o.push("numVisibleChoices = numVisibleChoices + 1;","userChoices--\x3e"+(u+1)+" = numVisibleChoices;",'print "- (", numVisibleChoices, "). '+f+'^";'),a.push(on(d)),++u}s=a.map(function(n,e){return"if (choice == userChoices--\x3e"+(e+1)+") {\n    "+n.join("\n    ")+"\n  }"})}else{t.push("choice");for(var g,T=r(n.choices);!(g=T()).done;){var S=g.value,C=p(S.content);o.push('print "- '+(u+1)+". "+C+'^";'),a.push(on(S)),++u}s=a.map(function(n,e){return"if (choice == "+(e+1)+") {\n    "+n.join("\n    ")+"\n  }"})}e=["numVisibleChoices = 0;",'print "'+i+'^^";'].concat(o,["choice = getInputChoice(numVisibleChoices);"],s)}else e=['print "'+i+'^";',!h.disablePauseOnGameOver&&"wait();","gameOver = "+(n.isHappyEnd?"1":"2")+";","return nothing;"];else e=n.actions&&n.actions.length>0?['print "'+i+'^^";'].concat(rn(n.actions),["return "+m(n.next)+";"]):n.conditions&&n.conditions.length>0?['print "'+i+'";',!h.disablePauseOnSimpleSequence&&"wait();"].concat(tn(n.conditions),["return "+m(n.next)+";"]):['print "'+i+'";',!h.disablePauseOnSimpleSequence&&"wait();","return "+m(n.next)+";"];var O=m(n.id);return q.includes(O)&&(e=["userPassages--\x3ePSG_"+O+" = 1;"].concat(e)),{statements:e.filter(function(n){return!!n}).join("\n  "),vars:t}},sn=h.preferSeparatorThanCls?'print (string) CLS_PATTERN, "^";':"cls();",un="! This file contains the necessary core for the Moiki export to Inform6\n! kaelhem (c) 2020\n! kaelhem at gmail com\n\n\n! Inform settings\n! -------------------------------------------\n\nGlobal location = DefaultRoomForStatusBar; ! Must be the first global to show location name\nGlobal status_field_1 = 0; ! Must be the second global to show score or hours\nGlobal status_field_2 = 0; ! Must be the third global to show turns or minutes\n\n! Variables for game management\n! -------------------------------------------\n! Array path --\x3e 10; ! allow 10 undo moves, but it's not implemented yet...\nGlobal markForRedo = 0; ! used to restart game from beginning\nGlobal markForShow = 0; ! used to re-display sequence text\nGlobal gameOver = 0;\n\n#IfV3;\n  Constant ARRAY_LEN_OFFSET = 2;\n#IfNot;\n  Constant ARRAY_LEN_OFFSET = 3;\n#EndIf;\n\n! Choices management (used for visibility conditions of choices)\n! -------------------------------------------\n\nConstant MAX_CHOICES = 6;\nArray userChoices --\x3e (ARRAY_LEN_OFFSET + MAX_CHOICES);\n\n[ clearChoices i;\n  for (i=1: i<=MAX_CHOICES: i++) {\n    userChoices--\x3ei = 0;\n  }\n  return;\n];\n\n"+(N.length>0?"! Items management\n! -------------------------------------------\n\nArray userItems --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_ITEMS);\n\n[ clearItems i;\n  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n    userItems--\x3ei = 0;\n  }\n  return;\n];\n\n[ addItem index;\n  if (userItems--\x3eindex == 0) {\n    toggleItem(index);\n  }\n  return;\n];\n\n[ subItem index;\n  if (userItems--\x3eindex == 1) {\n    toggleItem(index);\n  }\n  return;\n];\n\n[ hasItem index;\n  return userItems--\x3eindex == 1;\n];\n\n[ toggleItem index;\n  "+T()+"if (userItems--\x3eindex == 0) {\n    userItems--\x3eindex = 1;\n    ++status_field_1;\n    print (string) STR_OBJECT_WON;\n  } else {\n    userItems--\x3eindex = 0;\n    --status_field_1;\n    print (string) STR_OBJECT_LOST;\n  }\n  print (string) getItemDescription(index);\n  "+C()+(h.disablePauseOnActions?"":"wait();\n  ")+"return;\n];\n\n[ countItems i count;\n  count = 0;\n  for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n    if (userItems--\x3ei == 1) ++count;\n  }\n  return count;\n];\n":"")+"\n\n"+(L.length>0?"! Counters management\n! -------------------------------------------\n\nArray userCounters --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_COUNTERS);\n\n[ clearCounters i;\n  for (i=1: i<=COUNT_TOTAL_COUNTERS: i++) {\n    userCounters--\x3ei = defaultCounterValue(i);\n  }\n  return;\n];\n\n[ setCounter index value;\n  userCounters--\x3eindex = value;\n  if (isCounterGauge(index)) {\n    "+T()+"print (string) getCounterName(index), (string) STR_COUNTER_SET, value;\n    "+C()+(h.disablePauseOnActions?"":"wait();\n  ")+"\n  }\n  return;\n];\n\n[ addCounter index value;\n  userCounters--\x3eindex = userCounters--\x3eindex + value;\n  if (isCounterGauge(index)) {\n    "+T()+'print (string) getCounterName(index), (string) STR_COUNTER_ADD, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters--\x3eindex;\n    '+C()+(h.disablePauseOnActions?"":"wait();\n  ")+"\n  }\n  return;\n];\n\n[ subCounter index value;\n  userCounters--\x3eindex = userCounters--\x3eindex - value;\n  if (isCounterGauge(index)) {\n    "+T()+'print (string) getCounterName(index), (string) STR_COUNTER_SUB, value, " ", (string) STR_AND, (string) STR_COUNTER_SET, userCounters--\x3eindex;\n    '+C()+(h.disablePauseOnActions?"":"wait();\n  ")+"\n  }\n  return;\n];\n":"")+"\n\n"+(q.length>0?"! Passages management (for conditions only)\n! -------------------------------------------\n\nArray userPassages --\x3e (ARRAY_LEN_OFFSET + COUNT_TOTAL_PASSAGES);\n\n[ clearPassages i;\n  for (i=1: i<=COUNT_TOTAL_PASSAGES: i++) {\n    userPassages--\x3ei = 0;\n  }\n  return;\n];\n":"")+"\n\n! Manage user inputs\n! -------------------------------------------\n\n! fix: in z-code v3, input buffers are not formatted the same way...\n#IfV3;\n  Constant arrayStartIndex 1;\n  [ length arr len;\n    len = 0;\n    while (arr->(len+1) ~= 0) ++len;\n    return len;\n  ];\n#Ifnot;\n  Constant arrayStartIndex 2;\n  [ length arr;\n    return arr->1;\n  ];\n#EndIf;\n\n! read user inputs\n[ KeyLine buffer;\n  buffer->0 = 10;\n  read buffer 0;\n  return buffer;\n];\n\n! convert a string into array\n[ toArray str arr;\n  @output_stream 3 arr;\n  @print_paddr str;\n  @output_stream -3;\n  return arr;\n];\n\n! take a char and return the same in lower case\n[ toLowerCase c;\n  if (c >= 'A' && c <= 'Z') return c + 32; else return c;\n];\n\n! return true if the given command as string match the current input buffer\n[isCommand cmd aCmd i;\n  aCmd = toArray(cmd);\n  if (aCmd--\x3e0 == length(key)) {\n    for (i=0: i<aCmd--\x3e0: i++) {\n      if (key->(arrayStartIndex+i) ~= toLowerCase(aCmd->(2+i))) rfalse;\n    }\n    rtrue;\n  }\n  rfalse;\n];\n\n! store user input\nArray key -> 13;\n\n! read user choices / menu commands\n[ getInputChoice numChoices len chNum commandUnknown done;\n  done = false;\n  do {\n    commandUnknown = false;\n    do {\n      print \"> \";\n    } until(KeyLine(key)--\x3e0);\n    len = length(key);\n    if (len == 1) {\n      chNum = key->arrayStartIndex - 48;\n      if (chNum > 0 && chNum <= numChoices) {\n        "+(h.disableClearScreenOnChoice?"":sn+"\n        ")+'done = true;\n      } else if (chNum > 0 && chNum <= 10) {\n        print (string) STR_NOCHOICE_MATCH, "^";\n      } else {\n        commandUnknown = true;\n      }\n    } else if (isCommand(STR_CMD_HELP)) {\n      showHelp();\n    } else if (isCommand(STR_CMD_UNDO)) {\n      undo();\n    } else if (isCommand(STR_CMD_REDO)) {\n      if (redo()) return 0;\n    } else if (isCommand(STR_CMD_EXIT)) {\n      exit();\n    } else if (isCommand(STR_CMD_SHOW)) {\n      markForShow = 1;\n      return 0;'+(N.length>0?"\n    } else if (isCommand(STR_CMD_LIST)) {\n      inventory();\n    ":"")+'\n    } else {\n      commandUnknown = true;\n    }\n    if (commandUnknown) {\n      print (string) STR_COMMAND_UNKNOWN_LEFT, (string) STR_CMD_HELP, (string) STR_COMMAND_UNKNOWN_RIGHT, "^";\n    }\n  } until(done);\n  return chNum;\n];\n\n[ confirm question ok done;\n  done = false;\n  ok = false;\n  do {\n    do {\n      if (question) {\n        print (string) question;\n      } else {\n        print (string) STR_DEFAULT_CONFIRM_MSG;\n      }\n      print " (", (string) STR_CMD_YES, "/", (string) STR_CMD_NO, ")^> ";\n    } until(KeyLine(key)--\x3e0);\n    if (isCommand(STR_CMD_YES) || isCommand(STR_CMD_YES_SHORT)) {\n      ok = true;\n      done = true;\n    } else if (isCommand(STR_CMD_NO) || isCommand(STR_CMD_NO_SHORT)) {\n      done = true;\n    }\n    if (~~done) {\n      print (string) STR_PLEASE_ANSWER, (string) STR_CMD_YES, " ", (string) STR_OR, " ", (string) STR_CMD_NO,".^";\n    }\n  } until(done);\n  return ok;\n];\n\n[ cls;\n  #IfV3;\n    ! in v3 it seems there is no way to clear the screen...\n    print (string) CLS_PATTERN, "^";\n  #Ifnot;\n    @erase_window -1; ! this opcode is not available in V3\n  #EndIf;\n  rtrue;\n];\n\n[ wait x;\n  #IfV3;\n    read key 0;\n  #Ifnot;\n    @read_char 1 x; ! this opcode is not available in V3\n    print "^";\n  #EndIf;\n];\n\n\n! Menu\n! -------------------------------------------\n\n[ showHelp;\n  '+S()+'print (string) STR_LIST_OF_COMMANDS, "^";\n  '+C()+'! print "  - ", (string) STR_CMD_UNDO, (string) STR_COLON, " ", (string) STR_BACK_TO_PREVIOUS, "^";\n  print "  - ", (string) STR_CMD_REDO, (string) STR_COLON, " ", (string) STR_RESTART_GAME, "^";\n  print "  - ", (string) STR_CMD_SHOW, (string) STR_COLON, " ", (string) STR_RESHOW_TEXT, "^";\n  print "  - ", (string) STR_CMD_EXIT, (string) STR_COLON, " ", (string) STR_QUIT, "^";\n  '+(N.length>0?'print "  - ", (string) STR_CMD_LIST, (string) STR_COLON, " ", (string) STR_LIST_OBJECTS, "^";\n  ':"")+'rtrue;\n];\n\n[ exit;\n  print (string) STR_BYE_BYE, "^";\n  @quit;\n];\n\n[ undo;\n  print "Undo: not implemented yet !^";\n  rtrue;\n];\n\n[ redo;\n  if (confirm(STR_CONFIRM_RESTART)) {\n    markForRedo = 1;\n    rtrue;\n  }\n  rfalse;\n];\n'+(N.length>0?'\n[ inventory i;\n  if (countItems() == 0) {\n    print (string) STR_INVENTORY_EMPTY, "^";\n  } else {\n    '+S(2)+'print (string) STR_INVENTORY_LIST, "^";\n    '+C(2)+'for (i=1: i<=COUNT_TOTAL_ITEMS: i++) {\n      if (hasItem(i)) print "* ", (string) getItemDescription(i), "^";\n    }\n  }\n  rtrue;\n];\n':"")+"\n\n! Presentation\n! -------------------------------------------\n\n[ startScreen;\n  "+S()+'print (string) STR_HEADER, " ", (string) STORY_URL, "^^";\n  '+C()+'print (string) STR_MOIKI_PRESENTS, "^";\n  '+T()+'print (string) STORY_TITLE, "^^";\n  '+C()+'print (string) STR_A_STORY_BY, " ", (string) STORY_AUTHOR, "^^", (string) STORY_DESCRIPTION, "^";\n  rtrue;\n];\n\n\n! Game loop\n! -------------------------------------------\n[ mainLoop firstSequence next res;\n  next = firstSequence;\n  do {\n    ++status_field_2; ! increase turn counter\n    res = next();\n    if (markForShow == 1) {\n      markForShow = 0;\n      res = next;\n    }\n    if (markForRedo == 1) {\n      res = false;\n    }\n    next = res;\n    print "^";\n  } until(~~next);\n  if (gameOver > 0) {\n    '+T(2)+'if (gameOver == 1) {\n      print (string) STR_WIN_GAME, "^^";\n    } else if (gameOver == 2) {\n      print (string) STR_LOSE_GAME, "^^";\n    }\n    '+C(2)+"gameOver = 0;\n  }\n];\n\n[ startGame firstSequence replay;\n  startScreen();\n  wait();\n  do {\n    cls();\n    replay = false;\n    location = DefaultRoomForStatusBar; ! reset location (avoid compiler warning)\n    status_field_1 = 0; ! reset score\n    status_field_2 = 0; ! reset turns\n    "+(N.length>0?"clearItems();":"")+"\n    "+(L.length>0?"clearCounters();":"")+"\n    "+(q.length>0?"clearPassages();":"")+"\n    mainLoop(firstSequence);\n    if (markForRedo == 1) {\n      markForRedo = 0;\n      replay = true;\n    } else {\n      if (confirm(STR_ANOTHER_GAME)) {\n        replay = true;\n      } else {\n        exit();\n      }\n    }\n  } until(~~replay);\n];\n",cn=("utf8"===h.encoding?"!% -Cu\n":"")+"!% -~S\n!% $OMIT_UNUSED_ROUTINES=1\n\n! "+a(o).split("\n").join("\n! ")+"\n\n! author: "+s(u)+"\n! title: "+u.name+'\n\nObject DefaultRoomForStatusBar "'+u.name+'"; ! used to force name in status line\n\n! Constants\n! -------------------------------------------\nConstant STORY_TITLE = "'+p(u.name)+'";\nConstant STORY_DESCRIPTION = "'+p(u.description)+'";\nConstant STORY_AUTHOR = "'+p(s(u))+'";\nConstant STORY_URL = "https://moiki.fr/story/'+o+'";\n\n! Strings\n'+Object.entries(_).filter(function(n){var e=n[0];return!(X.find(function(n){return n===e})&&0===N.length)}).map(function(n){return"Constant STR_"+n[0]+' = "'+n[1]+'";'}).join("\n")+'\n! Config\nConstant CLS_PATTERN = "'+h.clsPattern.slice(0,40).repeat(40).slice(0,40)+'";\n\n'+(N.length>0?"\n! Defines objects / heroes\n!-------------------------------------------\nConstant COUNT_TOTAL_ITEMS = "+N.length+";\n\n"+N.map(function(n,e){return"Constant "+n.identifier+" = "+(e+1)+";"}).join("\n")+"\n\n[ getItemDescription index;\n  switch (index) {\n    "+N.map(function(n){return n.identifier+': return "'+n.label+" - ~"+n.desc+'~";'}).join("\n    ")+'\n    default: return "";\n  }\n];\n\n':"")+"\n\n"+(L.length>0?"\n! Defines counters\n!-------------------------------------------\nConstant COUNT_TOTAL_COUNTERS = "+L.length+";\n\n"+L.map(function(n,e){return"Constant "+n.identifier+" = "+(e+1)+";"}).join("\n")+"\n\n[ getCounterName index;\n  switch (index) {\n    "+L.map(function(n){return n.identifier+': return "'+n.name+'";'}).join("\n    ")+'\n    default: return "Undefined counter";\n  }\n];\n\n[ defaultCounterValue index;\n  switch (index) {\n    '+L.map(function(n){return n.identifier+": return "+(n.defaultValue||0)+";"}).join("\n    ")+"\n    default: return 0;\n  }\n];\n\n[ isCounterGauge index;\n  switch (index) {\n    "+L.filter(function(n){return n.gauge}).map(function(n){return n.identifier+": rtrue;"}).join("\n    ")+"\n    default: return false;\n  }\n];\n\n":"")+"\n\n"+(q.length>0?"\n! Defines passages (used only for conditions)\n!-------------------------------------------\nConstant COUNT_TOTAL_PASSAGES = "+q.length+";\n\n"+q.map(function(n,e){return"Constant PSG_"+n+" = "+(e+1)+";"}).join("\n")+"\n\n":"")+'\n\n! Include MoikInform library\n! ------------------------------------------\nInclude "moikinform";\n\n\n! App entry point\n! ------------------------------------------\n[ Main;\n  startGame('+m(c)+");\n];\n\n\n! Story sequences\n! ------------------------------------------\n",ln=r(l);!(H=ln()).done;){var dn=H.value,fn=an(dn),mn=fn.statements,pn=fn.vars;cn+="[ "+m(dn.id)+(pn&&pn.length>0?" "+pn.join(" "):"")+";\n  "+mn+"\n];\n\n"}return[{filename:"story.inf",data:cn},{filename:"moikinform.h",data:un}]}(e,i);throw new Error("This format is unvailable!")},$="dev";export{Q as convertToInform,q as convertToInk,Z as inform6Utils,c as migrate,u as utils,$ as version};
//# sourceMappingURL=moiki-exporter.m.js.map
