function n(){return(n=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function e(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function t(n,t){var r;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(r=function(n,t){if(n){if("string"==typeof n)return e(n,void 0);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(n,void 0):void 0}}(n))||t&&n&&"number"==typeof n.length){r&&(n=r);var o=0;return function(){return o>=n.length?{done:!0}:{done:!1,value:n[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=n[Symbol.iterator]()).next.bind(r)}var r,o,i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},a=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,c=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,u="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",s="["+u+"]",l="\\d+",f="[a-z\\xdf-\\xf6\\xf8-\\xff]",p="[^\\ud800-\\udfff"+u+l+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",d="(?:\\ud83c[\\udde6-\\uddff]){2}",g="[\\ud800-\\udbff][\\udc00-\\udfff]",m="[A-Z\\xc0-\\xd6\\xd8-\\xde]",v="(?:"+f+"|"+p+")",h="(?:"+m+"|"+p+")",x="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",b="[\\ufe0e\\ufe0f]?"+x+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",d,g].join("|")+")[\\ufe0e\\ufe0f]?"+x+")*",y="(?:"+["[\\u2700-\\u27bf]",d,g].join("|")+")"+b,j=RegExp("['’]","g"),O=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),S=RegExp([m+"?"+f+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[s,m,"$"].join("|")+")",h+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[s,m+v,"$"].join("|")+")",m+"?"+v+"+(?:['’](?:d|ll|m|re|s|t|ve))?",m+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",l,y].join("|"),"g"),w=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,T="object"==typeof self&&self&&self.Object===Object&&self,A="object"==typeof i&&i&&i.Object===Object&&i||T||Function("return this")(),$=(r={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(n){return null==r?void 0:r[n]}),V=Object.prototype.toString,E=A.Symbol,k=E?E.prototype:void 0,C=k?k.toString:void 0;function I(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==V.call(n)}(n))return C?C.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var R=(o=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,r){for(var o=-1,i=n?n.length:0;++o<i;)t=e(t,n[o],o,n);return t}(function(n,e,t){return n=I(n),void 0===(e=e)?function(n){return w.test(n)}(n)?function(n){return n.match(S)||[]}(n):function(n){return n.match(a)||[]}(n):n.match(e)||[]}(function(n){return(n=I(n))&&n.replace(c,$).replace(O,"")}(n).replace(j,"")),o,"")}),U=function(n){return"This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/"+n+"\nExported on "+(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})},q=function(n){if(n&&n.author){var e=n.author;return e.pseudo||e.firstname+" "+e.lastname}return"Inconnu"},_={__proto__:null,getHeader:U,getAuthor:q,simplifyStory:function(e,r,o){for(var i,a=e.firstSequence,c={},u=function n(e,t,r){void 0===r&&(r=!1),c[e]||(c[e]={in:[],to:[]}),r?c[e].in.push(t):(c[e].to.push(t),n(t,e,!0))},s={},l=t(e.sequences);!(i=l()).done;){var f=i.value;if(s[f.id]=f,f.choices&&f.choices.length>0)for(var p,d=t(f.choices);!(p=d()).done;){var g=p.value;g.content=o(g.content),g.condition&&g.condition.next&&g.condition.params&&u(f.id,g.condition.next),g.next&&u(f.id,g.next)}else f.condition&&f.condition.next&&f.condition.params&&u(f.id,f.condition.next),f.next&&u(f.id,f.next)}for(var m,v=[s[a]],h=t(Object.entries(c).map(function(n){return{data:n[1],index:n[0]}}));!(m=h()).done;){var x=m.value;(x.data.in.length>1||1===x.data.in.length&&c[x.data.in[0]].to.length>1)&&x.index!==a&&v.push(s[x.index])}for(var b=0,y=v;b<y.length;b++){for(var j=y[b],O=j.id,S=[s[O]];1===c[O].to.length;)S.push(s[O=c[O].to[0]]);j.chain=S;for(var w=[],T=0,A=S;T<A.length;T++){var $=A[T];w.push($),$.action&&$.action.params&&"string"==typeof $.action.params&&w.push({objectAction:r[$.action.params]})}for(var V=[],E="",k=0,C=w;k<C.length;k++){var I=C[k];I.objectAction?(E&&(V.push(E.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),E=""),V.push(I.objectAction)):E+=o(I.content)+" "}E&&V.push(E.replace(/(\s)*<br(\s)*\/>(\s)*/gi,"\r\n").trim()),j.chainedContent=V}return v.forEach(function(e){e.chain=e.chain.map(function(e){return n({},function(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)e.indexOf(t=i[r])>=0||(o[t]=n[t]);return o}(e,["chain","chainedContent"]))})}),v}},L=function(n){return n.replace(/-/gi,"_")},z=function(n){return n.replace(/(<(strong|b)>\s)/gi," <b>").replace(/(\s<\/(strong|b)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},D=function(n,e){return"{ "+e[n.condition.params].inkVar+":\n  -> "+L(n.condition.next)+"\n- else:\n  -> "+L(n.next)+"\n}\n"},Z=function(n,e,t){void 0===t&&(t="");var r=e[n.action.params],o=r.inkVar,i=r.desc;return"\n"+t+"~ "+o+" = !"+o+"\n"+t+"{ "+o+":\n"+t+"  <h4><em>Objet récupéré</em> : "+i+"</h4>\n"+t+"- else:\n"+t+"  <h4><em>Objet perdu</em> : "+i+"</h4>\n"+t+"}\n"},P="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),W=new Uint8Array(16);function M(){if(!P)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return P(W)}for(var N=[],G=0;G<256;++G)N[G]=(G+256).toString(16).substr(1);function H(n,e,t){var r=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var o=(n=n||{}).random||(n.rng||M)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,e)for(var i=0;i<16;++i)e[r+i]=o[i];return e||function(n,e){var t=0;return[N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],"-",N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]],N[n[t++]]].join("")}(o)}var J=function(n){return n.replace(/-/gi,"_")},Y=function(n){return n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},B=function(n){return n.replace(/"/gi,'\\"')},F=function(n,e,t){return void 0===t&&(t="goto"),"(if: "+e[n.condition.params].tweeVar+")[("+t+': "'+J(n.condition.next)+'")]\n(else:)[('+t+': "'+J(n.next)+'")]\n'},K=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,o=n.next?J(n.next):null,i=B(Y(n.content));if(r){var a=e[r],c=a.tweeVar;return'(link: "'+i+'")[(set: '+c+" to not "+c+', $actionText to "'+B(a.desc)+'", $actionPassage to "'+o+'", $isObjectWin to '+c+')[(goto: "Toggle-Object")]]\n'}return t?'(link: "'+i+'")['+F(n,e)+"]\n":o?'(link: "'+i+'")[(goto: "'+o+'")]\n':""},Q=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,o=n.next?J(n.next):null;if(r){var i=e[r],a=i.tweeVar;return"(set: "+a+" to not "+a+', $actionText to "'+B(i.desc)+'", $actionPassage to "'+o+'", $isObjectWin to '+a+')[(display: "Toggle-Object")]\n'}return t?F(n,e,"display")+"\n":o?'(display: "'+o+'")\n':""},X=function(n){return n.replace(/-/gi,"_")},nn=function(n){return n.replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b|h\d)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").replace(/(\s)+/gi," ").trim()},en=function(n){return n.replace(/"/gi,'\\"')},tn=function(n,e,t){void 0===t&&(t=null);var r=t?"[["+t+"|"+X(n.condition.next)+"]]":'<<include "'+X(n.condition.next)+'">>',o=t?"[["+t+"|"+X(n.next)+"]]":'<<include "'+X(n.next)+'">>';return"<<if "+e[n.condition.params].tweeVar+">>\n  "+r+"\n<<else>>\n  "+o+"\n<</if>>\n"},rn=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,o=n.next?X(n.next):null,i=en(nn(n.content));if(r){var a=e[r],c=a.tweeVar;return"[["+i+"|Toggle-Object]["+c+" to not "+c+'; $actionText to "'+en(a.desc)+'"; $actionPassage to "'+o+'"; $isObjectWin to '+c+"]]\n"}return t?tn(n,e,i)+"\n":o?"[["+i+"|"+o+"]]\n":""},on=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,o=n.next?X(n.next):null;if(r){var i=e[r],a=i.tweeVar;return"<<set "+a+" to not "+a+'; $actionText to "'+en(i.desc)+'"; $actionPassage to "'+o+'"; $isObjectWin to '+a+'>>\n<<include "Toggle-Object">>\n'}return t?tn(n,e)+"\n":o?'<<include "'+o+'">>\n':""},an=function(n){return n.replace(/-/gi,"_")},cn=function(n){return n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<(strong|b|h\d)>\s)/gi," <b>").replace(/(\s<\/(strong|b|h\d)>)/gi,"</b> ").replace(/(<([/]*)(strong|b|h\d)>)/gi,"**").replace(/(<em>\s)/gi," <em>").replace(/(\s<\/em>)/gi,"</em> ").replace(/(<([/]*)(em)>)/gi,"_").replace(/(<([/]*)(span)>)/gi,"").replace(/<span class="ql-cursor">/gi,"").replace(/(<br(\s)*(\/)*>)/gi,"+n+").replace(/(&nbsp;)+/gi," ").replace(/(\s)+/gi," ").trim()};exports.convertToInk=function(e){for(var r,o=e._id,i=e.meta,a=e.firstSequence,c=e.sequences,u={},s=t(e.assets);!(r=s()).done;){var l=r.value;u[l.id]=n({inkVar:"_"+L(R(l.label))},l)}var f="/*\n"+U(o)+"\n*/\n\n# author: "+q(i)+"\n# title: "+i.name+"\n";i.image&&(f+="# IMAGE: "+i.image.replace(/\//gi,"\\/")+'\n<em>Crédit photo : <a href="'+"https://unsplash.com".replace(/\//gi,"\\/")+'">Unsplash</a></em>\n'),f+="<em>"+i.description+"</em>\n<hr/>\n";for(var p,d=t(Object.entries(u).map(function(n){return n[1]}));!(p=d()).done;)f+="VAR "+p.value.inkVar+" = false\n";f+="\n-> "+L(a)+"\n";for(var g,m=t(c);!(g=m()).done;){var v=g.value,h=z(v.content);if(f+="\n=== "+L(v.id)+" ===\n",f+=h+"\n",v.choices&&v.choices.length>0){for(var x,b=t(v.choices);!(x=b()).done;){var y=x.value,j=" ";y.action&&y.action.params&&"string"==typeof y.action.params&&(j=Z(y,u,"\t"));var O="* ["+z(y.content)+"]"+j;f+=y.condition&&y.condition.next&&y.condition.params?O+" "+D(y,u):O+"-> "+L(y.next)+"\n"}f+="# CLEAR\n"}else v.action&&v.action.params&&"string"==typeof v.action.params&&(f+=Z(v,u)),f+=v.condition&&v.condition.next&&v.condition.params?D(v,u):v.next?"-> "+L(v.next)+"\n":"-> END\n"}return f},exports.convertToJdrBot=function(e){for(var r,o=e.meta,i=e.firstSequence,a=e.sequences,c=function(n){return a.findIndex(function(e){return e.id===n})+2},u={},s=t(e.assets);!(r=s()).done;){var l=r.value;u[l.id]=n({storyVar:an(R(l.label))},l)}var f=[],p=[],d=a.length+2,g=function(n,e){var t=d;return p.push({id:t,events:["997|"+n.storyVar+"|"+(t+2)+"|null\n","997|null|"+(t+1)+"|null\n"]}),p.push({id:t+1,action:n.storyVar+"|invisible|null|récupéré: "+n.desc.trim()+"|null",events:["997|null|"+e+"|null\n"]}),p.push({id:t+2,action:"-"+n.storyVar+"|invisible|null|perdu: "+n.desc.trim()+"|null",events:["997|null|"+e+"|null\n"]}),d+=3,t},m="1 _start_\n";o.image&&(m+="[["+o.image+"]]+n+&&\nCrédit photo : Unsplash+n+&&\n"),m+="Une histoire de "+q(o).trim()+"+n+&&\n",m+="(exporté via https://moiki.fr)+n++n+&&\n",m+=o.description+"\n|\n",m+="997|null|"+c(i)+"|null\n",f.push({id:"$start",room:m+="*****"});for(var v,h=t(a);!(v=h()).done;){var x=v.value,b="",y=cn(x.content);if(b+=c(x.id)+" "+x.id+"\n",b+="[["+y.split("\n").map(function(n){return n+"+n+"}).join("")+"]]",x.choices&&x.choices.length>0){for(var j,O=[],S=1,w=t(x.choices);!(j=w()).done;){var T=j.value,A=c(T.next);if(T.condition&&T.condition.next&&T.condition.params)p.push({id:d,events:["997|"+u[T.condition.params].storyVar+"|"+c(T.condition.next)+"|null\n","997|null|"+A+"|null\n"]}),b+="+n+&&\n"+cn(T.content)+" ("+S+")",O.push(d),++d;else if(T.action&&T.action.params&&"string"==typeof T.action.params){var $=g(u[T.action.params],A);b+="+n+&&\n"+cn(T.content)+" ("+S+")",O.push($)}else b+="+n+&&\n"+cn(T.content)+" ("+S+")",O.push(A);++S}if(O.length>0){b+="\n|\n",S=1;for(var V,E=t(O);!(V=E()).done;)b+=S+"->"+V.value+"\n",++S}}else if(x.final||!x.next)b+="\n|\n",b+=x.final&&x.isHappyEnd?"999|Tu as gagné ! Bravo !\n":"998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n";else{var k=c(x.next);b+="\n|\n",x.action&&x.action.params&&"string"==typeof x.action.params?b+="997|null|"+g(u[x.action.params],k)+"|null\n":(x.condition&&(b+="997|"+u[x.condition.params].storyVar+"|"+c(x.condition.next)+"|null\n"),b+="997|null|"+k+"|null\n")}f.push({id:x.id,room:b+="*****"})}for(var C=0,I=p;C<I.length;C++){var U=I[C],_=U.id,L=_+" condition-room-"+_+"\n";L+="null\n",L+=U.action||"|",L+="\n"+U.events.join(""),f.push({id:_,room:L+="*****"})}return o.name+"\n"+f.length+"\n"+f.map(function(n){return n.room}).join("\n")},exports.convertToTwee=function(e,r){if("harlowe"===r)return function(e){for(var r,o=e._id,i=e.meta,a=e.firstSequence,c=e.sequences,u={},s=t(e.assets);!(r=s()).done;){var l=r.value;u[l.id]=n({tweeVar:"$"+J(R(l.label))},l)}for(var f,p="\x3c!--\n"+U(o)+"\n--\x3e\n\n:: StoryAuthor\n"+q(i)+"\n\n:: StoryTitle\n"+i.name+"\n\n:: StorySubtitle\n"+i.description+'\n\n:: StoryData\n{\n  "ifid": "'+H()+'",\n  "format": "Harlowe",\n  "format-version": "3.1.0",\n  "start": "'+J(a)+'",\n  "zoom": 1\n}\n\n',d="(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n",g=t(Object.entries(u).map(function(n){return n[1]}));!(f=g()).done;)d+="(set: "+f.value.tweeVar+" to false)\n";for(var m,v=t(c);!(m=v()).done;){var h=m.value,x=Y(h.content);if(p+="\n:: "+J(h.id)+"\n"+x+"\n",h.choices&&h.choices.length>0)for(var b,y=t(h.choices);!(b=y()).done;)p+=K(b.value,u);else p+=Q(h,u);h.id===a&&(p+=d)}return p+"\n:: Toggle-Object\n(if: $isObjectWin)[Objet récupéré : {$actionText}]\n(else:)[Objet perdu : {$actionText}]\n(display: $actionPassage)\n"}(e);if("sugarcube"===r)return function(e){for(var r,o=e._id,i=e.meta,a=e.firstSequence,c=e.sequences,u={},s=t(e.assets);!(r=s()).done;){var l=r.value;u[l.id]=n({tweeVar:"$"+X(R(l.label))},l)}for(var f,p="\x3c!--\n"+U(o)+"\n--\x3e\n\n:: StoryAuthor\n"+q(i)+"\n\n:: StoryTitle\n"+i.name+"\n\n:: StorySubtitle\n"+i.description+'\n\n:: StoryData\n{\n  "ifid": "'+H()+'",\n  "format": "SugarCube",\n  "format-version": "2.31.1",\n  "start": "'+X(a)+'",\n  "zoom": 1\n}\n\n',d="<<set $actionText to false; $actionPassage to false; $isObjectWin to false>>\n",g=t(Object.entries(u).map(function(n){return n[1]}));!(f=g()).done;)d+="<<set "+f.value.tweeVar+" to false>>\n";for(var m,v=t(c);!(m=v()).done;){var h=m.value,x=nn(h.content);if(p+="\n:: "+X(h.id)+"\n"+x+"\n",h.choices&&h.choices.length>0)for(var b,y=t(h.choices);!(b=y()).done;)p+=rn(b.value,u);else p+=on(h,u);h.id===a&&(p+=d)}return p+"\n:: Toggle-Object\n<<if $isObjectWin>>\n  récupéré : $actionText\n<<else>>\n  perdu : $actionText\n<</if>>\n<<include [[$actionPassage]]>>\n"}(e);throw new Error("This format is unvailable!")},exports.utils=_,exports.version="0.1.4";
//# sourceMappingURL=moiki-exporter.js.map
