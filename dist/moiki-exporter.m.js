function n(){return(n=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function e(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function t(n,t){var r;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(r=function(n,t){if(n){if("string"==typeof n)return e(n,void 0);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(n,void 0):void 0}}(n))||t&&n&&"number"==typeof n.length){r&&(n=r);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=n[Symbol.iterator]()).next.bind(r)}var r,i,o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},a=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,s=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,u="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",c="["+u+"]",l="\\d+",f="[a-z\\xdf-\\xf6\\xf8-\\xff]",p="[^\\ud800-\\udfff"+u+l+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",d="(?:\\ud83c[\\udde6-\\uddff]){2}",m="[\\ud800-\\udbff][\\udc00-\\udfff]",g="[A-Z\\xc0-\\xd6\\xd8-\\xde]",h="(?:"+f+"|"+p+")",x="(?:"+g+"|"+p+")",b="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",v="[\\ufe0e\\ufe0f]?"+b+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",d,m].join("|")+")[\\ufe0e\\ufe0f]?"+b+")*",y="(?:"+["[\\u2700-\\u27bf]",d,m].join("|")+")"+v,j=RegExp("['’]","g"),S=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),I=RegExp([g+"?"+f+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[c,g,"$"].join("|")+")",x+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[c,g+h,"$"].join("|")+")",g+"?"+h+"+(?:['’](?:d|ll|m|re|s|t|ve))?",g+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",l,y].join("|"),"g"),k=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,w="object"==typeof self&&self&&self.Object===Object&&self,O="object"==typeof o&&o&&o.Object===Object&&o||w||Function("return this")(),T=(r={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(n){return null==r?void 0:r[n]}),_=Object.prototype.toString,E=O.Symbol,A=E?E.prototype:void 0,R=A?A.toString:void 0;function B(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==_.call(n)}(n))return R?R.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var V=(i=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,r){for(var i=-1,o=n?n.length:0;++i<o;)t=e(t,n[i],i,n);return t}(function(n,e,t){return n=B(n),void 0===(e=e)?function(n){return k.test(n)}(n)?function(n){return n.match(I)||[]}(n):function(n){return n.match(a)||[]}(n):n.match(e)||[]}(function(n){return(n=B(n))&&n.replace(s,T).replace(S,"")}(n).replace(j,"")),i,"")}),C=function(n){return"This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/"+n+"\nExported on "+(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})},L=function(n){if(n&&n.author){var e=n.author;return e.pseudo||e.firstname+" "+e.lastname}return"Inconnu"},q={__proto__:null,getHeader:C,getAuthor:L,simplifyStory:function(e,r,i){for(var o,a=e.firstSequence,s={},u=function n(e,t,r){void 0===r&&(r=!1),s[e]||(s[e]={in:[],to:[]}),r?s[e].in.push(t):(s[e].to.push(t),n(t,e,!0))},c={},l=t(e.sequences);!(o=l()).done;){var f=o.value;if(c[f.id]=f,f.choices&&f.choices.length>0)for(var p,d=t(f.choices);!(p=d()).done;){var m=p.value;m.content=i(m.content),m.condition&&m.condition.next&&m.condition.params&&u(f.id,m.condition.next),m.next&&u(f.id,m.next)}else f.condition&&f.condition.next&&f.condition.params&&u(f.id,f.condition.next),f.next&&u(f.id,f.next)}for(var g,h=[c[a]],x=t(Object.entries(s).map(function(n){return{data:n[1],index:n[0]}}));!(g=x()).done;){var b=g.value;(b.data.in.length>1||1===b.data.in.length&&s[b.data.in[0]].to.length>1)&&b.index!==a&&h.push(c[b.index])}for(var v=0,y=h;v<y.length;v++){for(var j=y[v],S=j.id,I=[c[S]];1===s[S].to.length;)I.push(c[S=s[S].to[0]]);j.chain=I;for(var k=[],w=0,O=I;w<O.length;w++){var T=O[w];k.push(T),T.action&&T.action.params&&"string"==typeof T.action.params&&k.push({objectAction:r[T.action.params]})}for(var _=[],E="",A=0,R=k;A<R.length;A++){var B=R[A];B.objectAction?(E&&(_.push(E.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),E=""),_.push(B.objectAction)):E+=i(B.content)+" "}E&&_.push(E.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),j.chainedContent=_}return h.forEach(function(e){e.chain=e.chain.map(function(e){return n({},function(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)e.indexOf(t=o[r])>=0||(i[t]=n[t]);return i}(e,["chain","chainedContent"]))})}),h}},$=function(n){return n.replace(/-/gi,"_")},U=function(n){return n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},G=function(n,e){return"{ "+e[n.condition.params].inkVar+":\n  -> "+$(n.condition.next)+"\n- else:\n  -> "+$(n.next)+"\n}\n"},N=function(n,e,t){void 0===t&&(t="");var r=e[n.action.params],i=r.inkVar,o=r.desc;return"\n"+t+"~ "+i+" = !"+i+"\n"+t+"{ "+i+":\n"+t+"  <h4><em>Objet récupéré</em> : "+o+"</h4>\n"+t+"- else:\n"+t+"  <h4><em>Objet perdu</em> : "+o+"</h4>\n"+t+"}\n"},z=function(e){for(var r,i=e._id,o=e.meta,a=e.firstSequence,s=e.sequences,u={},c=t(e.assets);!(r=c()).done;){var l=r.value;u[l.id]=n({inkVar:"_"+$(V(l.label))},l)}var f="/*\n"+C(i)+"\n*/\n\n# author: "+L(o)+"\n# title: "+o.name+"\n";o.image&&(f+="# IMAGE: "+o.image.replace(/\//gi,"\\/")+'\n<em>Crédit photo : <a href="'+"https://unsplash.com".replace(/\//gi,"\\/")+'">Unsplash</a></em>\n'),f+="<em>"+o.description+"</em>\n<hr/>\n";for(var p,d=t(Object.entries(u).map(function(n){return n[1]}));!(p=d()).done;)f+="VAR "+p.value.inkVar+" = false\n";f+="\n-> "+$(a)+"\n";for(var m,g=t(s);!(m=g()).done;){var h=m.value,x=U(h.content);if(f+="\n=== "+$(h.id)+" ===\n",f+=x+"\n",h.choices&&h.choices.length>0){for(var b,v=t(h.choices);!(b=v()).done;){var y=b.value,j=" ";y.action&&y.action.params&&"string"==typeof y.action.params&&(j=N(y,u,"\t"));var S="* ["+U(y.content)+"]"+j;f+=y.condition&&y.condition.next&&y.condition.params?S+" "+G(y,u):S+"-> "+$(y.next)+"\n"}f+="# CLEAR\n"}else h.action&&h.action.params&&"string"==typeof h.action.params&&(f+=N(h,u)),f+=h.condition&&h.condition.next&&h.condition.params?G(h,u):h.next?"-> "+$(h.next)+"\n":"-> END\n"}return f},D=function(n,e){return void 0===e&&(e="story"),e+"_"+n.replace(/-/gi,"_")},M=function(n){return n.replace(/(<\/*(strong|b)>)/gi,"").replace(/(<\/*(em)>)/gi,"").replace(/(<\/*(h\d)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/<\/p>/gi,"</p> ").replace(/<\/*p>/gi,"").replace(/(<\/*(span)>)/gi,"").replace(/(\s)+/gi," ").replace(/\@/gim,"@@64").replace(/\^/gim,"@@94").replace(/\\/gim,"@@92").replace(/\~/gim,"@@126").replace(/\°/gim," ").replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi,"^").replace(/(\s)*&nbsp;(\s)*/gi," ").replace(/(\"|“|”)/gim,"~").replace(/\’/gim,"'").trim()},F=["w","s","e","n","nw","ne","sw","se"],P=function(n){if(n>=0&&n<10)return F[n]+"_to";throw new Error("Only 8 choices are allowed here...")},H=function(n,e){return n.action&&n.action.params&&"string"==typeof n.action.params?"[; cls(); "+e[n.action.params].identifier+"=inverse("+e[n.action.params].identifier+"); style bold; addOrRemoveObject("+e[n.action.params].identifier+'); print "'+M(e[n.action.params].desc)+'"; style roman; wait(); return '+D(n.next)+";]":n.condition&&n.condition.next&&n.condition.params?"[; cls(); if ("+e[n.condition.params].identifier+") return "+D(n.condition.next)+"; else return "+D(n.next)+";]":"[; cls(); return "+D(n.next)+";]"},Z=function(n,e){var r=M(n.content);if(!n.next||n.choices&&0!==n.choices.length){if(n.choices&&n.choices.length>0){for(var i,o="",a=[],s=0,u=t(n.choices);!(i=u()).done;){var c=i.value;o+="- "+(s+1)+". "+M(c.content)+"^",a.push({gotoFunction:P(s),gotoValue:H(c,e)}),++s}return'"'+r+"^^"+o+'",\n  '+a.map(function(n){return n.gotoFunction+" "+n.gotoValue}).join(",\n  ")+";"}return'[; print "'+r+'^"; deadflag='+(n.isHappyEnd?"2":"1")+";];\n"}return n.action&&n.action.params&&"string"==typeof n.action.params?'[; print "'+r+'^^"; '+e[n.action.params].identifier+"=inverse("+e[n.action.params].identifier+"); style bold; addOrRemoveObject("+e[n.action.params].identifier+'); print "'+M(e[n.action.params].desc)+'"; style roman; wait(); PlayerTo('+D(n.next)+");];\n":n.condition&&n.condition.next&&n.condition.params?'[; print "'+r+'"; if ('+e[n.condition.params].identifier+") PlayerTo("+D(n.condition.next)+"); else PlayerTo("+D(n.next)+");];\n":'[; print "'+r+'"; PlayerTo('+D(n.next)+");];\n"},W=function(e,r){if("with-parser"===r)return function(e){for(var r,i=e._id,o=e.meta,a=e.firstSequence,s=e.sequences,u={},c=t(e.assets);!(r=c()).done;){var l=r.value;u[l.id]=n({identifier:"_"+D(V(l.label))},l)}var f=Object.entries(u).map(function(n){return n[1]}),p="!% !-s\n!% $OMIT_UNUSED_ROUTINES=1\n\n! "+C(i).split("\n").join("\n! ")+"\n\n! author: "+L(o)+"\n! title: "+o.name+'\n\nConstant Story "'+o.name+'";\nConstant Headline "^'+o.description+"^^Une histoire de "+L(o)+".^^Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici : https://moiki.fr/story/"+i+"^\";\nRelease 1;\n\n! Game utils\n! -------------------------------------------\n\nConstant NO_SCORE;\n\n! fix: in z-code v3, it seems there is no way to clear the screen...\n#IfV3;\n  [ cls;\n    print \"----------------------------------------^\";\n    rtrue;\n  ];\n#Ifnot;\n  [ cls;\n    @erase_window -1;\n    rtrue;\n  ];\n#EndIf;\n\n\n[ wait buf;\n  read buf 0;\n];\n\n[ waitAndClear;\n  wait();\n  cls();\n  rtrue;\n];\n\nInclude \"parser\";\n\n! Add a prefix to every commands to shortcut the lib. credit: @hlabrande\n[ BeforeParsing pos;\n  #Ifdef TARGET_ZCODE;\n    pos = parse->5;\n  #Ifnot; ! TARGET_GLULX\n    pos = parse->3;\n  #Endif; ! TARGET_\n  LTI_Insert(pos, 'c');\n  LTI_Insert(pos+1, 'h');\n  LTI_Insert(pos+2, 'o');\n  LTI_Insert(pos+3, 'i');\n  LTI_Insert(pos+4, 'x');\n  LTI_Insert(pos+5, ' ');\n  Tokenise__(buffer, parse);\n];\n\nInclude \"verblib\";\n\n[ addOrRemoveObject obj;\n  if (obj) print \"Objet récupéré : \"; else print \"Objet perdu : \";\n  rtrue;\n];\n\n[ inverse obj;\n  if (obj) rfalse; else rtrue;\n];\n";f.length>0&&(p+="\n! Variables for Objects / Heroes\n!-------------------------------------------\n"+f.map(function(n){return"Global "+n.identifier+" = false"}).join(";\n")+";\n"),p+='\n! Start story\n! ------------------------------------------\n\nClass sequence\n  with short_name [; rtrue; ],\n    cant_go [; print "Choix non reconnu, veuillez recommencer.^"; <<Look>>; ],\n    has light;\n';for(var d,m=t(s);!(d=m()).done;){var g=d.value;p+="\nSequence "+D(g.id)+' ""\nwith description '+Z(g,u)+"\n"}return p+"\n\n! Routines\n!-----------------------------------\n\n[ Initialise;\n  location = "+D(a)+';\n  introduction();\n  lookmode=2; ! les lieux déjà visités sont décrits à chaque fois\n  Banner();\n  waitAndClear();\n  return 2; ! banniËre dÈj‡ affichÈe\n];\n\n[ introduction;\n  style underline;\n  print "Ce jeu ne se joue qu\'en tapant les chiffres de vos choix.^De ce fait, vous ne pourrez ni sauver ni quitter de manière classique.^^";\n];\n\n[ DeathMessage;\n  switch (deadflag) {\n    1: print "Fin Tragique !";\n    2: print "Fin Heureuse !";\n  }\n];\n\n\n! Grammar\n!-----------------------------------\n\nInclude "FrenchG";\n\n[ ChoixNumberSub ;\n  '+F.map(function(n,e){return"if (noun == "+(e+1)+") <<Go "+n+"_obj>>;"}).join("\n  ")+"\n  print \"Choix non reconnu, veuillez recommencer.^\";\n];\n\nVerb 'choix'\n* number        ->choixNumber;\n"}(e);if("standard"===r)return function(e){for(var r,i=e._id,o=e.meta,a=e.firstSequence,s=e.sequences,u=function(n,e){return void 0===e&&(e=1),"#IfV5; style "+n+"; #EndIf;\n"+"  ".repeat(e)},c=function(n){return u("bold",n)},l=function(n){return u("underline",n)},f=function(n){return u("roman",n)},p={},d=t(e.assets);!(r=d()).done;){var m=r.value;p[m.id]=n({identifier:"_"+D(V(m.label))},m)}var g=Object.entries(p).map(function(n){return n[1]}),h=function(n,e){return n.action&&n.action.params&&"string"==typeof n.action.params?["cls();",e[n.action.params].identifier+" = inverse("+e[n.action.params].identifier+");",c()+"addOrRemoveObject("+e[n.action.params].identifier+");",'print "'+M(e[n.action.params].desc)+'";',f()+"wait();","return "+D(n.next)+";"]:n.condition&&n.condition.next&&n.condition.params?["cls();","if ("+e[n.condition.params].identifier+") return "+D(n.condition.next)+";","return "+D(n.next)+";"]:["cls();","return "+D(n.next)+";"]},x=function(n,e){var r=null,i=[],o=M(n.content);if(!n.next||n.choices&&0!==n.choices.length)if(n.choices&&n.choices.length>0){i.push("choice");for(var a,s="",u=[],l=0,p=t(n.choices);!(a=p()).done;){var d=a.value;s+="- "+(l+1)+". "+M(d.content)+"^",u.push(h(d,e)),++l}r=['print "'+o+"^^"+s+'";',"choice = getInputChoice("+u.length+");"].concat(u.map(function(n,e){return"if (choice == "+(e+1)+") {\n    "+n.join("\n    ")+"\n  }"}))}else r=['print "'+o+'^";',"wait();","gameOver = "+(n.isHappyEnd?"1":"2")+";","return nothing;"];else r=n.action&&n.action.params&&"string"==typeof n.action.params?['print "'+o+'^^";',e[n.action.params].identifier+" = inverse("+e[n.action.params].identifier+");",c()+"addOrRemoveObject("+e[n.action.params].identifier+");",'print "'+M(e[n.action.params].desc)+'";',f()+"wait();","return "+D(n.next)+";"]:n.condition&&n.condition.next&&n.condition.params?['print "'+o+'";',"wait();","if ("+e[n.condition.params].identifier+") return "+D(n.condition.next)+";","return "+D(n.next)+";"]:['print "'+o+'";',"wait();","return "+D(n.next)+";"];return{statements:r.join("\n  "),vars:i}},b="!% !-s\n!% $OMIT_UNUSED_ROUTINES=1\n\n! "+C(i).split("\n").join("\n! ")+"\n\n! author: "+L(o)+"\n! title: "+o.name+'\n\n! Inform settings\n! -------------------------------------------\n\nObject DefaultRoomStoryForStatusBar "'+o.name+"\"; ! used to force name in status line\nGlobal location = DefaultRoomStoryForStatusBar; ! Must be the first global to show location name\nGlobal status_field_1 = 0; ! Must be the second global to show score or hours\nGlobal status_field_2 = 0; ! Must be the third global to show turns or minutes\n\n! Variables for game management\n! -------------------------------------------\n! Array path --\x3e 10; ! allow 10 undo moves, but it's not implemented yet...\nGlobal markForRedo = 0; ! used to restart game from beginning\nGlobal markForShow = 0; ! used to re-display sequence text\nGlobal gameOver = 0;\n\n! Manage user inputs\n! -------------------------------------------\n\n! fix: in z-code v3, input buffers are not formatted the same way...\n#IfV3;\n  Constant inputBufferStartIndex 1;\n  [ length arr len;\n    len = 0;\n    while (arr->(len+1) ~= 0) ++len;\n    return len;\n  ];\n#Ifnot;\n  Constant inputBufferStartIndex 2;\n  [ length arr;\n    return arr->1;\n  ];\n#EndIf;\n\n! read user inputs\n[ KeyLine buffer;\n  buffer->0 = 10;\n  read buffer 0;\n  return buffer;\n];\n\n! To store user input\nArray key -> 13;\n\n! read user choices / menu commands\n[ getInputChoice numChoices len chNum commandUnknown done;\n  done = false;\n  do {\n    commandUnknown = false;\n    do {\n      print \"> \";\n    } until(KeyLine(key)--\x3e0);\n    len = length(key);\n    if (len == 4) {\n      if (key->inputBufferStartIndex == 'h' && key->(inputBufferStartIndex+1) == 'e' && key->(inputBufferStartIndex+2) == 'l' && key->(inputBufferStartIndex+3) == 'p') {\n        showHelp();\n      } else if (key->inputBufferStartIndex == 'u' && key->(inputBufferStartIndex+1) == 'n' && key->(inputBufferStartIndex+2) == 'd' && key->(inputBufferStartIndex+3) == 'o') {\n        undo();\n      } else if (key->inputBufferStartIndex == 'r' && key->(inputBufferStartIndex+1) == 'e' && key->(inputBufferStartIndex+2) == 'd' && key->(inputBufferStartIndex+3) == 'o') {\n        if (redo()) return;\n      } else if (key->inputBufferStartIndex == 'e' && key->(inputBufferStartIndex+1) == 'x' && key->(inputBufferStartIndex+2) == 'i' && key->(inputBufferStartIndex+3) == 't') {\n        exit();\n      } else if (key->inputBufferStartIndex == 'l' && key->(inputBufferStartIndex+1) == 'i' && key->(inputBufferStartIndex+2) == 's' && key->(inputBufferStartIndex+3) == 't') {\n        inventory();\n      } else if (key->inputBufferStartIndex == 's' && key->(inputBufferStartIndex+1) == 'h' && key->(inputBufferStartIndex+2) == 'o' && key->(inputBufferStartIndex+3) == 'w') {\n        markForShow = 1;\n        return;\n      } else {\n        commandUnknown = true;\n      }\n    } else if (len == 1) {\n      chNum = key->inputBufferStartIndex - 48;\n      if (chNum > 0 && chNum <= numChoices) {\n        done = true;\n      } else if (chNum > 0 && chNum <= 10) {\n        print \"Cette saisie ne correspond à aucun choix !^\";\n      } else {\n        commandUnknown = true;\n      }\n    } else {\n      commandUnknown = true;\n    }\n    if (commandUnknown) {\n      print \"Cette commande est inconnue ! Tapez ~HELP~ pour une liste des commandes disponibles.^\";\n    }\n  } until(done);\n  return chNum;\n];\n\n[ confirm question len ok done;\n  done = false;\n  ok = false;\n  do {\n    do {\n      if (question) {\n        print (string) question;\n      } else {\n        print \"Etes-vous sûr de vouloir faire cette action ? (oui/non)\";\n      }\n      print \"^> \";\n    } until(KeyLine(key)--\x3e0);\n    len = length(key);\n    if (len == 1) {\n      if (key->inputBufferStartIndex == 'o' or '1') {\n        ok = true;\n        done = true;\n      } else if (key->inputBufferStartIndex == 'n' or '0') {\n        done = true;\n      }\n    } else if (len == 3) {\n      if (key->inputBufferStartIndex == 'o' && key->(inputBufferStartIndex+1) == 'u' && key->(inputBufferStartIndex+2) == 'i') {\n        ok = true;\n        done = true;\n      } else if (key->inputBufferStartIndex == 'n' && key->(inputBufferStartIndex+1) == 'o' && key->(inputBufferStartIndex+2) == 'n') {\n        done = true;\n      }\n    }\n    if (~~done) {\n      print \"Veuillez répondre par oui ou non.^\";\n    }\n  } until(done);\n  return ok;\n];\n\n\n! Game utils\n! -------------------------------------------\n\n! fix: in z-code v3, it seems there is no way to clear the screen...\n#IfV3;\n  [ cls;\n    print \"----------------------------------------^\";\n    rtrue;\n  ];\n#Ifnot;\n  [ cls;\n    @erase_window -1;\n    rtrue;\n  ];\n#EndIf;\n\n[ wait;\n  read key 0;\n];\n\n";g.length>0&&(b+="\n! Variables for Objects / Heroes\n!-------------------------------------------\n"+g.map(function(n){return"Global "+n.identifier}).join(";\n")+";\n"),b+="\n[ clearObjects;\n  "+(g&&g.length>0&&g.map(function(n){return n.identifier+" = false"}).join(";\n  "))+";\n  return;\n];\n\n\n! Game menu entries\n! -------------------------------------------\n\n[ showHelp;\n  "+l()+'print "Liste des commandes^";\n  '+f()+'! print "  - UNDO : Retourner au choix précédent^";\n  print "  - REDO : Recommencer depuis le début^";\n  print "  - LIST : Lister les objets récupérés^";\n  print "  - SHOW : Afficher le texte de la dernière séquence^";\n  print "  - EXIT : Quitter^";\n  rtrue;\n];\n\n[ exit;\n  print "Bye-bye !^";\n  @quit;\n];\n\n[ undo;\n  print "Undo: not implemented yet !^";\n  rtrue;\n];\n\n[ redo;\n  if (confirm("Recommencer depuis le début ?")) {\n    markForRedo = 1;\n    rtrue;\n  }\n  rfalse;\n];\n\n[ inventory empty;\n  empty = true;\n  '+l()+'print "Liste des objets de l\'inventaire:^";\n  '+f()+g.map(function(n){return"if ("+n.identifier+') {\n    print "* '+n.desc+'^";\n    empty = false;\n  }'}).join("\n  ")+'\n  if (empty) print "Votre inventaire est vide !^";\n  rtrue;\n];\n\n\n! Routines\n!-----------------------------------\n\n[ addOrRemoveObject obj;\n  if (obj) {\n    ++status_field_1;\n    print "Objet récupéré : ";\n  } else {\n    --status_field_1;\n    print "Objet perdu : ";\n  }\n  rtrue;\n];\n\n[ inverse obj;\n  if (obj) rfalse; else rtrue;\n];\n\n[ startScreen;\n  '+l()+'print "Cette histoire a été exportée avec Moiki Exporter.^La version originelle est accessible ici : https://moiki.fr/story/'+i+'^^";\n  '+f()+'print "Moiki présente:^";\n  '+c()+'print "'+o.name+'^^";\n  '+f()+'print "Une histoire de '+L(o)+"^^"+o.description+'^";\n  rtrue;\n];\n\n[ startGameLoop next res;\n  next = '+D(a)+';\n  do {\n    ++status_field_2; ! increase turn counter\n    res = next();\n    if (markForShow == 1) {\n      markForShow = 0;\n      res = next;\n    }\n    if (markForRedo == 1) {\n      res = false;\n    }\n    next = res;\n    print "^";\n  } until(~~next);\n  if (gameOver > 0) {\n    '+c(2)+'if (gameOver == 1) {\n      print "Gagné !^^";\n    } else if (gameOver == 2) {\n      print "Perdu !^^";\n    }\n    '+f(2)+'gameOver = 0;\n  }\n];\n\n[ Main replay;\n  startScreen();\n  wait();\n  do {\n    cls();\n    replay = false;\n    clearObjects();\n    status_field_1 = 0; ! reset score counter\n    status_field_2 = 0; ! reset turns counter\n    startGameLoop();\n    if (markForRedo == 1) {\n      markForRedo = 0;\n      replay = true;\n    } else if (confirm("Lancer une autre partie ? (oui/non)")) {\n      replay = true;\n    } else {\n      exit();\n    }\n  } until(~~replay);\n];\n\n\n! Story sequences\n! ------------------------------------------\n\n';for(var v,y=t(s);!(v=y()).done;){var j=v.value,S=x(j,p),I=S.statements,k=S.vars;b+="[ "+D(j.id)+(k&&k.length>0?" "+k.join(" "):"")+";\n  "+I+"\n];\n\n"}return b}(e);throw new Error("This format is unvailable!")},K="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),Y=new Uint8Array(16);function J(){if(!K)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return K(Y)}for(var X=[],Q=0;Q<256;++Q)X[Q]=(Q+256).toString(16).substr(1);function nn(n,e,t){var r=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var i=(n=n||{}).random||(n.rng||J)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e)for(var o=0;o<16;++o)e[r+o]=i[o];return e||function(n,e){var t=0;return[X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],"-",X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]],X[n[t++]]].join("")}(i)}var en=function(n){return n.replace(/-/gi,"_")},tn=function(n){return n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},rn=function(n){return n.replace(/"/gi,'\\"')},on=function(n,e,t){return void 0===t&&(t="goto"),"(if: "+e[n.condition.params].tweeVar+")[("+t+': "'+en(n.condition.next)+'")]\n(else:)[('+t+': "'+en(n.next)+'")]\n'},an=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?en(n.next):null,o=rn(tn(n.content));if(r){var a=e[r],s=a.tweeVar;return'(link: "'+o+'")[(set: '+s+" to not "+s+', $actionText to "'+rn(a.desc)+'", $actionPassage to "'+i+'", $isObjectWin to '+s+')[(goto: "Toggle-Object")]]\n'}return t?'(link: "'+o+'")['+on(n,e)+"]\n":i?'(link: "'+o+'")[(goto: "'+i+'")]\n':""},sn=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?en(n.next):null;if(r){var o=e[r],a=o.tweeVar;return"(set: "+a+" to not "+a+', $actionText to "'+rn(o.desc)+'", $actionPassage to "'+i+'", $isObjectWin to '+a+')[(display: "Toggle-Object")]\n'}return t?on(n,e,"display")+"\n":i?'(display: "'+i+'")\n':""},un=function(n){return n.replace(/-/gi,"_")},cn=function(n){return n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},ln=function(n){return n.replace(/"/gi,'\\"')},fn=function(n,e,t){void 0===t&&(t=null);var r=t?"[["+t+"|"+un(n.condition.next)+"]]":'<<include "'+un(n.condition.next)+'">>',i=t?"[["+t+"|"+un(n.next)+"]]":'<<include "'+un(n.next)+'">>';return"<<if "+e[n.condition.params].tweeVar+">>\n  "+r+"\n<<else>>\n  "+i+"\n<</if>>\n"},pn=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?un(n.next):null,o=ln(cn(n.content));if(r){var a=e[r],s=a.tweeVar;return"[["+o+"|Toggle-Object]["+s+" to not "+s+'; $actionText to "'+ln(a.desc)+'"; $actionPassage to "'+i+'"; $isObjectWin to '+s+"]]\n"}return t?fn(n,e,o)+"\n":i?"[["+o+"|"+i+"]]\n":""},dn=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,i=n.next?un(n.next):null;if(r){var o=e[r],a=o.tweeVar;return"<<set "+a+" to not "+a+'; $actionText to "'+ln(o.desc)+'"; $actionPassage to "'+i+'"; $isObjectWin to '+a+'>>\n<<include "Toggle-Object">>\n'}return t?fn(n,e)+"\n":i?'<<include "'+i+'">>\n':""},mn=function(e,r){if("harlowe"===r)return function(e){for(var r,i=e._id,o=e.meta,a=e.firstSequence,s=e.sequences,u={},c=t(e.assets);!(r=c()).done;){var l=r.value;u[l.id]=n({tweeVar:"$"+en(V(l.label))},l)}for(var f,p="\x3c!--\n"+C(i)+"\n--\x3e\n\n:: StoryAuthor\n"+L(o)+"\n\n:: StoryTitle\n"+o.name+"\n\n:: StorySubtitle\n"+o.description+'\n\n:: StoryData\n{\n  "ifid": "'+nn()+'",\n  "format": "Harlowe",\n  "format-version": "3.1.0",\n  "start": "'+en(a)+'",\n  "zoom": 1\n}\n\n',d="(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n",m=t(Object.entries(u).map(function(n){return n[1]}));!(f=m()).done;)d+="(set: "+f.value.tweeVar+" to false)\n";for(var g,h=t(s);!(g=h()).done;){var x=g.value,b=tn(x.content);if(p+="\n:: "+en(x.id)+"\n"+b+"\n",x.choices&&x.choices.length>0)for(var v,y=t(x.choices);!(v=y()).done;)p+=an(v.value,u);else p+=sn(x,u);x.id===a&&(p+=d)}return p+"\n:: Toggle-Object\n(if: $isObjectWin)[Objet récupéré : {$actionText}]\n(else:)[Objet perdu : {$actionText}]\n(display: $actionPassage)\n"}(e);if("sugarcube"===r)return function(e){for(var r,i=e._id,o=e.meta,a=e.firstSequence,s=e.sequences,u={},c=t(e.assets);!(r=c()).done;){var l=r.value;u[l.id]=n({tweeVar:"$"+un(V(l.label))},l)}for(var f,p="\x3c!--\n"+C(i)+"\n--\x3e\n\n:: StoryAuthor\n"+L(o)+"\n\n:: StoryTitle\n"+o.name+"\n\n:: StorySubtitle\n"+o.description+'\n\n:: StoryData\n{\n  "ifid": "'+nn()+'",\n  "format": "SugarCube",\n  "format-version": "2.31.1",\n  "start": "'+un(a)+'",\n  "zoom": 1\n}\n\n',d="<<set $actionText to false; $actionPassage to false; $isObjectWin to false>>\n",m=t(Object.entries(u).map(function(n){return n[1]}));!(f=m()).done;)d+="<<set "+f.value.tweeVar+" to false>>\n";for(var g,h=t(s);!(g=h()).done;){var x=g.value,b=cn(x.content);if(p+="\n:: "+un(x.id)+"\n"+b+"\n",x.choices&&x.choices.length>0)for(var v,y=t(x.choices);!(v=y()).done;)p+=pn(v.value,u);else p+=dn(x,u);x.id===a&&(p+=d)}return p+"\n:: Toggle-Object\n<<if $isObjectWin>>\n  récupéré : $actionText\n<<else>>\n  perdu : $actionText\n<</if>>\n<<include [[$actionPassage]]>>\n"}(e);throw new Error("This format is unvailable!")},gn=function(n){return n.replace(/-/gi,"_")},hn=function(n){return n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<([/]*)(strong|b|h\d)>)/gi,"**").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/(<([/]*)(em)>)/gi,"_").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi,"+n+").replace(/(&nbsp;)+/gi," ").replace(/(\s)+/gi," ").trim()},xn=function(e){for(var r,i=e.meta,o=e.firstSequence,a=e.sequences,s=function(n){return a.findIndex(function(e){return e.id===n})+2},u={},c=t(e.assets);!(r=c()).done;){var l=r.value;u[l.id]=n({storyVar:gn(V(l.label))},l)}var f=[],p=[],d=a.length+2,m=function(n,e){var t=d;return p.push({id:t,events:["997|"+n.storyVar+"|"+(t+2)+"|null\n","997|null|"+(t+1)+"|null\n"]}),p.push({id:t+1,action:n.storyVar+"|invisible|null|récupéré: "+n.desc.trim()+"|null",events:["997|null|"+e+"|null\n"]}),p.push({id:t+2,action:"-"+n.storyVar+"|invisible|null|perdu: "+n.desc.trim()+"|null",events:["997|null|"+e+"|null\n"]}),d+=3,t},g="1 _start_\n";i.image&&(g+="[["+i.image+"]]+n+&&\nCrédit photo : Unsplash+n+&&\n"),g+="Une histoire de "+L(i).trim()+"+n+&&\n",g+="(exporté via https://moiki.fr)+n++n+&&\n",g+=i.description+"\n|\n",g+="997|null|"+s(o)+"|null\n",f.push({id:"$start",room:g+="*****"});for(var h,x=t(a);!(h=x()).done;){var b=h.value,v="",y=hn(b.content);if(v+=s(b.id)+" "+b.id+"\n",v+="[["+y.split("\n").map(function(n){return n+"+n+"}).join("")+"]]",b.choices&&b.choices.length>0){for(var j,S=[],I=1,k=t(b.choices);!(j=k()).done;){var w=j.value,O=s(w.next);if(w.condition&&w.condition.next&&w.condition.params)p.push({id:d,events:["997|"+u[w.condition.params].storyVar+"|"+s(w.condition.next)+"|null\n","997|null|"+O+"|null\n"]}),v+="+n+&&\n"+hn(w.content)+" ("+I+")",S.push(d),++d;else if(w.action&&w.action.params&&"string"==typeof w.action.params){var T=m(u[w.action.params],O);v+="+n+&&\n"+hn(w.content)+" ("+I+")",S.push(T)}else v+="+n+&&\n"+hn(w.content)+" ("+I+")",S.push(O);++I}if(S.length>0){v+="\n|\n",I=1;for(var _,E=t(S);!(_=E()).done;)v+=I+"->"+_.value+"\n",++I}}else if(b.final||!b.next)v+="\n|\n",v+=b.final&&b.isHappyEnd?"999|Tu as gagné ! Bravo !\n":"998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n";else{var A=s(b.next);v+="\n|\n",b.action&&b.action.params&&"string"==typeof b.action.params?v+="997|null|"+m(u[b.action.params],A)+"|null\n":(b.condition&&(v+="997|"+u[b.condition.params].storyVar+"|"+s(b.condition.next)+"|null\n"),v+="997|null|"+A+"|null\n")}f.push({id:b.id,room:v+="*****"})}for(var R=0,B=p;R<B.length;R++){var C=B[R],q=C.id,$=q+" condition-room-"+q+"\n";$+="null\n",$+=C.action||"|",$+="\n"+C.events.join(""),f.push({id:q,room:$+="*****"})}return i.name+"\n"+f.length+"\n"+f.map(function(n){return n.room}).join("\n")+"\n1§1️⃣|2§2️⃣|3§3️⃣"},bn="0.1.12";export{W as convertToInform,z as convertToInk,xn as convertToJdrBot,mn as convertToTwee,q as utils,bn as version};
//# sourceMappingURL=moiki-exporter.m.js.map
