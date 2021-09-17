var t={addition:"inserted",attributes:"propertyName",bold:"strong",cite:"keyword",code:"monospace",definitionList:"list",deletion:"deleted",div:"punctuation",em:"emphasis",footnote:"variable",footCite:"qualifier",header:"heading",html:"comment",image:"atom",italic:"emphasis",link:"link",linkDefinition:"link",list1:"list",list2:"list.special",list3:"list",notextile:"string.special",pre:"operator",p:"content",quote:"bracket",span:"quote",specialChar:"character",strong:"strong",sub:"content.special",sup:"content.special",table:"variableName.special",tableHeading:"operator"};function e(e,a,r){if("_"===r)return e.eat("_")?n(e,a,"italic",/__/,2):n(e,a,"em",/_/,1);if("*"===r)return e.eat("*")?n(e,a,"bold",/\*\*/,2):n(e,a,"strong",/\*/,1);if("["===r)return e.match(/\d+\]/)&&(a.footCite=!0),i(a);if("("===r&&e.match(/^(r|tm|c)\)/))return t.specialChar;if("<"===r&&e.match(/(\w+)[^>]+>[^<]+<\/\1>/))return t.html;if("?"===r&&e.eat("?"))return n(e,a,"cite",/\?\?/,2);if("="===r&&e.eat("="))return n(e,a,"notextile",/==/,2);if("-"===r&&!e.eat("-"))return n(e,a,"deletion",/-/,1);if("+"===r)return n(e,a,"addition",/\+/,1);if("~"===r)return n(e,a,"sub",/~/,1);if("^"===r)return n(e,a,"sup",/\^/,1);if("%"===r)return n(e,a,"span",/%/,1);if("@"===r)return n(e,a,"code",/@/,1);if("!"===r){var l=n(e,a,"image",/(?:\([^\)]+\))?!/,1);return e.match(/^:\S+/),l}return i(a)}function n(t,e,n,a,r){var l=t.pos>r?t.string.charAt(t.pos-r-1):null,u=t.peek();if(e[n]){if((!u||/\W/.test(u))&&l&&/\S/.test(l)){var s=i(e);return e[n]=!1,s}}else(!l||/\W/.test(l))&&u&&/\S/.test(u)&&t.match(new RegExp("^.*\\S"+a.source+"(?:\\W|$)"),!1)&&(e[n]=!0,e.mode=o.attributes);return i(e)}function i(e){var n=a(e);if(n)return n;var i=[];return e.layoutType&&i.push(t[e.layoutType]),i=i.concat(function(e){for(var n=[],i=1;i<arguments.length;++i)e[arguments[i]]&&n.push(t[arguments[i]]);return n}(e,"addition","bold","cite","code","deletion","em","footCite","image","italic","link","span","strong","sub","sup","table","tableHeading")),"header"===e.layoutType&&i.push(t.header+"-"+e.header),i.length?i.join(" "):null}function a(e){var n=e.layoutType;switch(n){case"notextile":case"code":case"pre":return t[n];default:return e.notextile?t.notextile+(n?" "+t[n]:""):null}}var r={cache:{},single:{bc:"bc",bq:"bq",definitionList:/- .*?:=+/,definitionListEnd:/.*=:\s*$/,div:"div",drawTable:/\|.*\|/,foot:/fn\d+/,header:/h[1-6]/,html:/\s*<(?:\/)?(\w+)(?:[^>]+)?>(?:[^<]+<\/\1>)?/,link:/[^"]+":\S/,linkDefinition:/\[[^\s\]]+\]\S+/,list:/(?:#+|\*+)/,notextile:"notextile",para:"p",pre:"pre",table:"table",tableCellAttributes:/[\/\\]\d+/,tableHeading:/\|_\./,tableText:/[^"_\*\[\(\?\+~\^%@|-]+/,text:/[^!"_=\*\[\(<\?\+~\^%@-]+/},attributes:{align:/(?:<>|<|>|=)/,selector:/\([^\(][^\)]+\)/,lang:/\[[^\[\]]+\]/,pad:/(?:\(+|\)+){1,2}/,css:/\{[^\}]+\}/},createRe:function(t){switch(t){case"drawTable":return r.makeRe("^",r.single.drawTable,"$");case"html":return r.makeRe("^",r.single.html,"(?:",r.single.html,")*","$");case"linkDefinition":return r.makeRe("^",r.single.linkDefinition,"$");case"listLayout":return r.makeRe("^",r.single.list,l("allAttributes"),"*\\s+");case"tableCellAttributes":return r.makeRe("^",r.choiceRe(r.single.tableCellAttributes,l("allAttributes")),"+\\.");case"type":return r.makeRe("^",l("allTypes"));case"typeLayout":return r.makeRe("^",l("allTypes"),l("allAttributes"),"*\\.\\.?","(\\s+|$)");case"attributes":return r.makeRe("^",l("allAttributes"),"+");case"allTypes":return r.choiceRe(r.single.div,r.single.foot,r.single.header,r.single.bc,r.single.bq,r.single.notextile,r.single.pre,r.single.table,r.single.para);case"allAttributes":return r.choiceRe(r.attributes.selector,r.attributes.css,r.attributes.lang,r.attributes.align,r.attributes.pad);default:return r.makeRe("^",r.single[t])}},makeRe:function(){for(var t="",e=0;e<arguments.length;++e){var n=arguments[e];t+="string"==typeof n?n:n.source}return new RegExp(t)},choiceRe:function(){for(var t=[arguments[0]],e=1;e<arguments.length;++e)t[2*e-1]="|",t[2*e]=arguments[e];return t.unshift("(?:"),t.push(")"),r.makeRe.apply(null,t)}};function l(t){return r.cache[t]||(r.cache[t]=r.createRe(t))}var o={newLayout:function(t,e){return t.match(l("typeLayout"),!1)?(e.spanningLayout=!1,(e.mode=o.blockType)(t,e)):(a(e)||(t.match(l("listLayout"),!1)?n=o.list:t.match(l("drawTable"),!1)?n=o.table:t.match(l("linkDefinition"),!1)?n=o.linkDefinition:t.match(l("definitionList"))?n=o.definitionList:t.match(l("html"),!1)&&(n=o.html)),(e.mode=n||o.text)(t,e));var n},blockType:function(t,e){var n,a;return e.layoutType=null,(n=t.match(l("type")))?((n=(a=n[0]).match(l("header")))?(e.layoutType="header",e.header=parseInt(n[0][1])):a.match(l("bq"))?e.layoutType="quote":a.match(l("bc"))?e.layoutType="code":a.match(l("foot"))?e.layoutType="footnote":a.match(l("notextile"))?e.layoutType="notextile":a.match(l("pre"))?e.layoutType="pre":a.match(l("div"))?e.layoutType="div":a.match(l("table"))&&(e.layoutType="table"),e.mode=o.attributes,i(e)):(e.mode=o.text)(t,e)},text:function(t,n){if(t.match(l("text")))return i(n);var a=t.next();return'"'===a?(n.mode=o.link)(t,n):e(t,n,a)},attributes:function(e,n){return n.mode=o.layoutLength,e.match(l("attributes"))?t.attributes:i(n)},layoutLength:function(t,e){return t.eat(".")&&t.eat(".")&&(e.spanningLayout=!0),e.mode=o.text,i(e)},list:function(t,e){var n=t.match(l("list"));e.listDepth=n[0].length;var a=(e.listDepth-1)%3;return e.layoutType=a?1===a?"list2":"list3":"list1",e.mode=o.attributes,i(e)},link:function(e,n){return n.mode=o.text,e.match(l("link"))?(e.match(/\S+/),t.link):i(n)},linkDefinition:function(e){return e.skipToEnd(),t.linkDefinition},definitionList:function(t,e){return t.match(l("definitionList")),e.layoutType="definitionList",t.match(/\s*$/)?e.spanningLayout=!0:e.mode=o.attributes,i(e)},html:function(e){return e.skipToEnd(),t.html},table:function(t,e){return e.layoutType="table",(e.mode=o.tableCell)(t,e)},tableCell:function(t,e){return t.match(l("tableHeading"))?e.tableHeading=!0:t.eat("|"),e.mode=o.tableCellAttributes,i(e)},tableCellAttributes:function(e,n){return n.mode=o.tableText,e.match(l("tableCellAttributes"))?t.attributes:i(n)},tableText:function(t,n){return t.match(l("tableText"))?i(n):"|"===t.peek()?(n.mode=o.tableCell,i(n)):e(t,n,t.next())}};const u={startState:function(){return{mode:o.newLayout}},token:function(t,e){return t.sol()&&function(t,e){e.mode=o.newLayout,e.tableHeading=!1,"definitionList"===e.layoutType&&e.spanningLayout&&t.match(l("definitionListEnd"),!1)&&(e.spanningLayout=!1)}(t,e),e.mode(t,e)},blankLine:function(t){var e=t.spanningLayout,n=t.layoutType;for(var i in t)t.hasOwnProperty(i)&&delete t[i];t.mode=o.newLayout,e&&(t.layoutType=n,t.spanningLayout=!0)}};export{u as textile};
