function n(){return(n=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function e(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function t(n,t){var r;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(r=function(n,t){if(n){if("string"==typeof n)return e(n,void 0);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(n,void 0):void 0}}(n))||t&&n&&"number"==typeof n.length){r&&(n=r);var o=0;return function(){return o>=n.length?{done:!0}:{done:!1,value:n[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=n[Symbol.iterator]()).next.bind(r)}var r,o,i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},a=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,u=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,c="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",f="["+c+"]",s="\\d+",l="[a-z\\xdf-\\xf6\\xf8-\\xff]",d="[^\\ud800-\\udfff"+c+s+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",p="(?:\\ud83c[\\udde6-\\uddff]){2}",m="[\\ud800-\\udbff][\\udc00-\\udfff]",g="[A-Z\\xc0-\\xd6\\xd8-\\xde]",x="(?:"+l+"|"+d+")",y="(?:"+g+"|"+d+")",b="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",v="[\\ufe0e\\ufe0f]?"+b+"(?:\\u200d(?:"+["[^\\ud800-\\udfff]",p,m].join("|")+")[\\ufe0e\\ufe0f]?"+b+")*",h="(?:"+["[\\u2700-\\u27bf]",p,m].join("|")+")"+v,j=RegExp("['’]","g"),O=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),w=RegExp([g+"?"+l+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[f,g,"$"].join("|")+")",y+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[f,g+x,"$"].join("|")+")",g+"?"+x+"+(?:['’](?:d|ll|m|re|s|t|ve))?",g+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",s,h].join("|"),"g"),A=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,S="object"==typeof self&&self&&self.Object===Object&&self,E="object"==typeof i&&i&&i.Object===Object&&i||S||Function("return this")(),T=(r={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(n){return null==r?void 0:r[n]}),V=Object.prototype.toString,$=E.Symbol,k=$?$.prototype:void 0,I=k?k.toString:void 0;function R(n){return null==n?"":function(n){if("string"==typeof n)return n;if(function(n){return"symbol"==typeof n||function(n){return!!n&&"object"==typeof n}(n)&&"[object Symbol]"==V.call(n)}(n))return I?I.call(n):"";var e=n+"";return"0"==e&&1/n==-1/0?"-0":e}(n)}var U=(o=function(n,e,t){return n+(t?"-":"")+e.toLowerCase()},function(n){return function(n,e,t,r){for(var o=-1,i=n?n.length:0;++o<i;)t=e(t,n[o],o,n);return t}(function(n,e,t){return n=R(n),void 0===(e=e)?function(n){return A.test(n)}(n)?function(n){return n.match(w)||[]}(n):function(n){return n.match(a)||[]}(n):n.match(e)||[]}(function(n){return(n=R(n))&&n.replace(u,T).replace(O,"")}(n).replace(j,"")),o,"")}),C=function(n){return"This story was created with Moiki, and converted with Moiki-Exporter\nMore info: https://github.com/kaelhem/moiki-exporter\nLaunch it with the Moiki player: https://moiki.fr/story/"+n+"\nExported on "+(new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})},L=function(n){if(n&&n.author){var e=n.author;return e.pseudo||e.firstname+" "+e.lastname}return"Inconnu"},z=function(n){return n.replace(/-/gi,"_")},Z=function(n){return n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/&nbsp;/gi," ").trim()},D=function(n,e){return"{ "+e[n.condition.params].inkVar+":\n  -> "+z(n.condition.next)+"\n- else:\n  -> "+z(n.next)+"\n}\n"},M=function(n,e,t){void 0===t&&(t="");var r=e[n.action.params],o=r.inkVar,i=r.desc;return"\n"+t+"~ "+o+" = !"+o+"\n"+t+"{ "+o+":\n"+t+"  <h4><em>Objet récupéré</em> : "+i+"</h4>\n"+t+"- else:\n"+t+"  <h4><em>Objet perdu</em> : "+i+"</h4>\n"+t+"}\n"},N=function(e){for(var r,o=e._id,i=e.meta,a=e.firstSequence,u=e.sequences,c={},f=t(e.assets);!(r=f()).done;){var s=r.value;c[s.id]=n({inkVar:U(s.label).replace("-","_")},s)}var l="/*\n"+C(o)+"\n*/\n\n# author: "+L(i)+"\n# title: "+i.name+"\n";i.image&&(l+="# IMAGE: "+i.image.replace(/\//gi,"\\/")+'\n<em>Crédit photo : <a href="'+"https://unsplash.com".replace(/\//gi,"\\/")+'">Unsplash</a></em>\n'),l+="<em>"+i.description+"</em>\n<hr/>\n";for(var d,p=t(Object.entries(c).map(function(n){return n[1]}));!(d=p()).done;)l+="VAR "+d.value.inkVar+" = false\n";l+="\n-> "+z(a)+"\n";for(var m,g=t(u);!(m=g()).done;){var x=m.value,y=Z(x.content);if(l+="\n=== "+z(x.id)+" ===\n",l+=y+"\n",x.choices&&x.choices.length>0){for(var b,v=t(x.choices);!(b=v()).done;){var h=b.value,j=" ";h.action&&h.action.params&&"string"==typeof h.action.params&&(j=M(h,c,"\t"));var O="* ["+Z(h.content)+"]"+j;l+=h.condition&&h.condition.next&&h.condition.params?O+" "+D(h,c):O+"-> "+z(h.next)+"\n"}l+="# CLEAR\n"}else x.action&&x.action.params&&"string"==typeof x.action.params&&(l+=M(x,c)),l+=x.condition&&x.condition.next&&x.condition.params?D(x,c):x.next?"-> "+z(x.next)+"\n":"-> END\n"}return l},_="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),G=new Uint8Array(16);function P(){if(!_)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return _(G)}for(var W=[],q=0;q<256;++q)W[q]=(q+256).toString(16).substr(1);function H(n,e,t){var r=e&&t||0;"string"==typeof n&&(e="binary"===n?new Array(16):null,n=null);var o=(n=n||{}).random||(n.rng||P)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,e)for(var i=0;i<16;++i)e[r+i]=o[i];return e||function(n,e){var t=0;return[W[n[t++]],W[n[t++]],W[n[t++]],W[n[t++]],"-",W[n[t++]],W[n[t++]],"-",W[n[t++]],W[n[t++]],"-",W[n[t++]],W[n[t++]],"-",W[n[t++]],W[n[t++]],W[n[t++]],W[n[t++]],W[n[t++]],W[n[t++]]].join("")}(o)}var Y=function(n){return n.replace(/-/gi,"_")},J=function(n){return n.replace(/<\/p>/gi,"</p> ").replace(/(<([/p]+)>)/gi,"").replace(/(<([/]*)(strong|b)>)/gi,"''").replace(/(<([/]*)(em)>)/gi,"//").replace(/(<br(\s)*(\/)*>)/gi," ").replace(/&nbsp;/gi," ").trim()},F=function(n){return n.replace(/"/gi,'\\"')},K=function(n,e,t){return void 0===t&&(t="goto"),"(if: "+e[n.condition.params].tweeVar+")[("+t+': "'+Y(n.condition.next)+'")]\n(else:)[('+t+': "'+Y(n.next)+'")]\n'},B=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,o=n.next?Y(n.next):null,i=F(J(n.content));if(r){var a=e[r],u=a.tweeVar;return'(link: "'+i+'")[(set: '+u+" to not "+u+', $actionText to "'+F(a.desc)+'", $actionPassage to "'+o+'", $isObjectWin to '+u+')[(goto: "Toggle-Object")]]\n'}return t?'(link: "'+i+'")['+K(n,e)+"]\n":o?'(link: "'+i+'")[(goto: "'+o+'")]\n':""},Q=function(n,e){var t=n.condition&&n.condition.next&&n.condition.params?n.condition.params:null,r=n.action&&n.action.params&&"string"==typeof n.action.params?n.action.params:null,o=n.next?Y(n.next):null;if(r){var i=e[r],a=i.tweeVar;return"(set: "+a+" to not "+a+', $actionText to "'+F(i.desc)+'", $actionPassage to "'+o+'", $isObjectWin to '+a+')[(display: "Toggle-Object")]\n'}return t?K(n,e,"display")+"\n":o?'(display: "'+o+'")\n':""},X=function(e,r){if("harlowe"===r)return function(e){for(var r,o=e._id,i=e.meta,a=e.firstSequence,u=e.sequences,c={},f=t(e.assets);!(r=f()).done;){var s=r.value;c[s.id]=n({tweeVar:"$"+U(s.label).replace("-","_")},s)}for(var l,d="\x3c!--\n"+C(o)+"\n--\x3e\n\n:: StoryAuthor\n"+L(i)+"\n\n:: StoryTitle\n"+i.name+"\n\n:: StorySubtitle\n"+i.description+'\n\n:: StoryData\n{\n  "ifid": "'+H()+'",\n  "format": "Harlowe",\n  "format-version": "3.1.0",\n  "start": "'+Y(a)+'",\n  "zoom": 1\n}\n\n',p="(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n",m=t(Object.entries(c).map(function(n){return n[1]}));!(l=m()).done;)p+="(set: "+l.value.tweeVar+" to false)\n";for(var g,x=t(u);!(g=x()).done;){var y=g.value,b=J(y.content);if(d+="\n:: "+Y(y.id)+"\n"+b+"\n",y.choices&&y.choices.length>0)for(var v,h=t(y.choices);!(v=h()).done;)d+=B(v.value,c);else d+=Q(y,c);y.id===a&&(d+=p)}return d+"\n:: Toggle-Object\n(if: $isObjectWin)[Objet récupéré : {$actionText}]\n(else:)[Objet perdu : {$actionText}]\n(display: $actionPassage)\n"}(e);throw new Error("This format is unvailable!")},nn="0.0.1";export{N as convertToInk,X as convertToTwee,nn as version};
//# sourceMappingURL=moiki-exporter.m.js.map
