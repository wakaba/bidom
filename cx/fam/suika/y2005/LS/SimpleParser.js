if (typeof (cx) == "undefined") {
  cx = {};
}
if (typeof (cx.fam) == "undefined") {
  cx.fam = {};
}
if (typeof (cx.fam.suika) == "undefined") {
  cx.fam.suika = {};
}
if (typeof (cx.fam.suika.y2005) == "undefined") {
  cx.fam.suika.y2005 = {};
}
if (typeof (cx.fam.suika.y2005.LS) == "undefined") {
  cx.fam.suika.y2005.LS = {};
}

cx.fam.suika.y2005.LS.SimpleParser = function () {
};

cx.fam.suika.y2005.LS.SimpleParser.prototype.parseStringWithContext =
function (inputText, contextArg) {
  this._String = inputText;
  this._CurrentCharPos = 0;
  this._CharStack = [];
  this._TokenStack = [];
  this._SrcType = "external1.1";
  
  var xmlVersion = "1.0";
  var xmlEncoding = null;
  var xmlStandalone = false;
  
  this._LexMode = "CON";
  var token = this._PopToken ();
  
  /* XML declaration */
  if (token && token.type == "pio") {
    this._LexMode = "PI";
    token = this._PopToken ();
    if (!token || token.type != "string") {
      this._ParseError (token, {type: "string", value: "xml"});
    }
    
    var pattern = /^xml[\x09\x0A\x0D\x20]/;
    var rexec;
    if ((rexec = pattern.exec (token.value)) != null) {
      token.value = token.value.substring (rexec[0].length);
      pattern = /^version[\x09\x0A\x0D\x20]*=[\x09\x0A\x0D\x20]*("[^"]*"|'[^']*')/;
      if ((rexec = pattern.exec (token.value)) != null) {
        var ver = rexec[1].slice (1);
        ver = ver.substring (0, ver.length - 1);
        token.value = token.value.substring (rexec[0].length)
                    .replace (/[\x09\x0A\x0D\x20]+/, '');
        if (ver != "1.0" && ver != "1.1") {
          this._ParseError ({type: "VersionNum", value: ver},
                            {type: "VersionNum", value: "1.0"});
        }
        xmlVersion = ver;
      } else {
        this._ParseError (token, {type: "VersionInfo"});
      }
      
      pattern = /^encoding[\x09\x0A\x0D\x20]*=[\x09\x0A\x0D\x20]*("[^"]*"|'[^']*')/;
      if ((rexec = pattern.exec (token.value)) != null) {
        xmlEncoding = rexec[1].slice (1);
        xmlEncoding = xmlEncoding.substring (0, xmlEncoding.length - 1);
        token.value = token.value.substring (rexec[0].length)
                    .replace (/[\x09\x0A\x0D\x20]+/, '');
      }
      
      pattern = /^standalone[\x09\x0A\x0D\x20]*=[\x09\x0A\x0D\x20]*("[^"]*"|'[^']*')/;
      if ((rexec = pattern.exec (token.value)) != null) {
        var st = rexec[1].slice (1);
        st = st.substring (0, st.length - 1);
        token.value = token.value.substring (rexec[0].length)
                    .replace (/[\x09\x0A\x0D\x20]+/, '');
        if (st == "yes") {
          xmlStandalone = true;
        } else if (st == "no") {
          xmlStandalone = false;
        } else {
          this._ParseError ({type: "standalone", value: st},
                            {type: "standalone", value: "yes"});
        }
      }
      
      if (contextArg.getNodeType () == contextArg.DOCUMENT_NODE) {
        contextArg.setXMLVersion (xmlVersion);
        contextArg.setXMLEncoding (xmlEncoding);
        contextArg.setXMLStandalone (xmlStandalone);
      }
      
      token = this._PopToken ();
      if (!token || token.type != "pic") {
        this._ParseError (token, {type: "pic"});
      }
    } else {
      /* A processing instruction */
      this._TokenStack.push (token);
      this._TokenStack.push ({type: "pio"});
    }
    this._LexMode = "CON";
  } else if (token) {
    this._TokenStack.push (token);
  }
  
  this._ParseAsElement (contextArg);
  
  token = this._PopToken ();
  if (token) {
    this._ParseError (token, {type: "Ee"});
  }
};

cx.fam.suika.y2005.LS.SimpleParser.prototype._ParseAsElement =
function (pnode) {
  var doc = pnode.getOwnerDocument ();
  var isDoc = false;
  if (!doc) {
    doc = pnode;
    isDoc = true;
  }
  var isDocOriginal = isDoc;
  var elqn = [];
  var el = [];
  var ns = [];
  var current = pnode;
  var currentNS = {xml: "http://www.w3.org/XML/1998/namespace",
                   xmlns: "http://www.w3.org/2000/xmlns/"};
  currentNS[""] = null;
  while (true) {
    var token = this._PopToken ();
    if (!token) {
      break;
    } else if (token.type == "stago") {
      this._LexMode = "TAG";
      token = this._PopToken ();
      if (!token || token.type != "string") {
        this._ParseError (token, {type: "Name"});
      }
      var etqname = token.value;
      elqn.push (etqname);
      
      token = this._PopToken ();
      if (token && token.type == "S") {
        token = this._PopToken ();
      }
      
      var newNS = [];
      for (var i in currentNS) {
        newNS[i] = currentNS[i];
      }
      ns.push (currentNS);
      currentNS = newNS;
      
      /* Attribute specification list */
      var attrs = {};
      while (token && token.type == "string") {
        var attrqname = token.value;
        if (attrs[attrqname] != null) {
          this._ParseError (token, {type: "Name",
                                    value: "**Attribute name is not unique**"});
        }
        
        token = this._PopToken ();
        if (token && token.type == "S") {
          token = this._PopToken ();
        }
        if (!token || token.type != "vi") {
          this._ParseError (token, {type: "vi"});
        }
        token = this._PopToken ();
        if (token && token.type == "S") {
          token = this._PopToken ();
        }
        if (!token || (token.type != "lit" && token.type != "lita")) {
          this._ParseError (token, {type: "lit"});
        }
        var litType = token.type;
        var litVal = [];
        this._LexMode = "LIT";
        while (true) {
          token = this._PopToken ();
          if (!token) {
            this._ParseError (token, {type: "lit"});
          } else if (token.type == "string") {
            litVal.push ({type: "AttValueText", value: token.value});
          } else if (token.type == "hero" || token.type == "nero") {
            var type = token.type;
            this._LexMode = "REF";
            token = this._PopToken ();
            if (!token || token.type != "string") {
              this._ParseError (token, {type: type == "hero" ? "hexdecimal"
                                                             : "Number"});
            }
            var code = (type == "hero" ? parseInt (token.value, 16)
                                       : parseInt (token.value, 10));
            if (code < 0x10000) {
              litVal.push ({type: "AttValueText", value: String.fromCharCode (code)});
            } else {
              code -= 0x10000;
              litVal.push
                ({type: "AttValueText",
                  value: String.fromCharCode (0xD800 | ((code >> 10) % 0x10000),
                                                    0xDC00 | (code % 0x10000))});
            }
            token = this._PopToken ();
            if (!token || token.type != "refc") {
              this._ParseError (token, {type: "refc"});
            }
            this._LexMode = "LIT";
          } else if (token.type == "ero") {
            this._LexMode = "REF";
            token = this._PopToken ();
            if (!token || token.type != "string") {
              this._ParseError (token, {type: "Name"});
            }
            var name = token.value;
            if (name == "amp" || name == "lt" || name == "gt" ||
                name == "quot" || name == "apos") {
              litVal.push ({type: "AttValueText",
                            value: name == "amp"  ? "&" :
                                   name == "lt"   ? "<" :
                                   name == "gt"   ? ">" :
                                   name == "quot" ? '"' :
                                                    "'"});
            } else {
              this._ParseError (token, {type: "EntityRef",
                                        value: "**General entity reference is not implemented**"});
            }
            token = this._PopToken ();
            if (!token || token.type != "refc") {
              this._ParseError (token, {type: "refc"});
            }
            this._LexMode = "LIT";
          } else if (token.type == litType) {
            break;
          } else if (token.type == "lit" || token.type == "lita" ||
                     token.type == "pero") {
            litVal.push ({type: "AttValueText", value: token.type == "lit"  ? '"' :
                                                       token.type == "lita" ? "'" :
                                                                              "%"});
          } else {
            this._ParseError (token, {type: "lit"});
          }
        }
        attrs[attrqname] = "";
        for (var i in litVal) {
          if (litVal[i].type == "AttValueText") {
            attrs[attrqname] += litVal[i].value;
          }
        }
        var nsuri = attrs[attrqname];
        if (attrqname == "xmlns") {
          currentNS[""] = nsuri.length > 0 ? nsuri : null;
        } else if (attrqname.substring (0, 6) == "xmlns:") {
          currentNS[attrqname.substring (6)] = nsuri.length > 0 ? nsuri : null;
        }
        this._LexMode = "TAG";
        token = this._PopToken ();
        if (token && token.type == "S") {
          token = this._PopToken ();
        }
      } /* parsing attribute specification list */
      
      /* element type */
      var etns;
      var nm = etqname.split (":", 2);
      if (nm[1] != null) {
        etns = currentNS[nm[0]];
        if (etns == null) {
          this._ParseError ({type: "QName", value: nm},
                            {type: "QName", value: "**prefix not declared**"});
        }
      } else {
        etns = currentNS[""];
      }
      
      el.push (current);
      current = current.appendChild (doc.createElementNS (etns, etqname));
      
      /* attribute speficifications */
      for (var attrqname in attrs) {
        var nm = attrqname.split (":", 2);
        var atns = null;
        if (nm[1] != null) {
          atns = currentNS[nm[0]];
          if (atns == null) {
            this._ParseError ({type: "Name", value: "**Prefix is not declared**"});
          }
        } else if (attrqname == "xmlns") {
          atns = "http://www.w3.org/2000/xmlns/";
        }
        current.setAttributeNS (atns, attrqname, attrs[attrqname]);
      }
      
      if (token && token.type == "nestc-net") {
        elqn.pop ();
        current = el.pop ();
        currentNS = ns.pop ();
      } else if (!token || token.type != "tagc") {
        this._ParseError (token, {type: "tagc"});
      } else {
        isDoc = false;
      }
      this._LexMode = "CON";
    } else if (token.type == "etago") {
      var expectedQName = elqn.pop ();
      this._LexMode = "TAG";
      token = this._PopToken ();
      if (!token || token.type != "string" || token.value != expectedQName) {
        this._ParseError (token, {type: "Name", value: expectedQName});
        if (expectedQName != null) elqn.push (expectedQName);
      }
      
      if (expectedQName != null) {
        current = el.pop ();
        currentNS = ns.pop ();
      }
      
      token = this._PopToken ();
      if (token && token.type == "S") {
        token = this._PopToken ();
      }
      
      if (!token || token.type != "tagc") {
        this._ParseError (token, {type: "tagc"});
      }
      this._LexMode = "CON";
      if (current.length == 0) isDoc = isDocOriginal;
    } else if (token.type == "string") {
      if (isDoc) {
        if (token.value.match (/[^\x09\x0A\x0D\x20]/)) {
          this._ParseError (token, {type: "S", value: " "});
        }
      } else {
        current.appendChild (doc.createTextNode (token.value));
      }
    } else if (token.type == "pio") {
      this._LexMode = "PI";
      token = this._PopToken ();
      
      /* target */
      var target;
      var pattern = /^([^\x09\x0A\x0D\x20]+)[\x09\x0A\x0D\x20]*/;
      var rexec;
      if (token && token.type == "string" &&
          (rexec = pattern.exec (token.value)) != null) {
        target = rexec[1];
        token.value = token.value.substring (rexec[0].length);
        if (target.toLowerCase () == "xml") {
          this._ParseError ({type: "Name", value: target}, {type: "PITarget"});
        }
      } else {
        this._ParseError (token, {type: "PITarget"});
      }
      
      /* data */
      var data = token.value;
      if (data == null) data = "";
      
      token = this._PopToken ();
      if (!token || token.type != "pic") {
        this._ParseError (token, {type: "pic"});
      }
      
      var pi = doc.createProcessingInstruction (target, data);
      current.appendChild (pi);
      this._LexMode = "CON";
    } else if (token.type == "mdo-com") {
      this._LexMode = "COM";
      var com
      token = this._PopToken ();
      if (token && token.type == "string") {
        com = doc.createComment (token.value);
        token = this._PopToken ();
      } else {
        com = doc.createComment ("");
      }
      current.appendChild (com);
      if (!token || token.type != "com") {
        this._ParseError (token, {type: "com"});
      }
      this._LexMode = "MD";
      token = this._PopToken ();
      if (!token || token.type != "mdc") {
        this._ParseError (token, {type: "mdc"});
      }
      this._LexMode = "CON";
    } else if (!isDoc && (token.type == "hero" || token.type == "nero")) {
      var type = token.type;
      this._LexMode = "REF";
      token = this._PopToken ();
      if (!token || token.type != "string") {
        this._ParseError (token, {type: type == "hero" ? "hexdecimal" : "Number"});
      }
      var code = (type == "hero" ? parseInt ("0x" + token.value)
                                 : parseInt (token.value, 10));
      if (code < 0x10000) {
        current.appendChild (doc.createTextNode (String.fromCharCode (code)));
      } else {
        code -= 0x10000;
        current.appendChild
          (doc.createTextNode (String.fromCharCode (0xD800 | ((code >> 10) % 0x10000),
                                                    0xDC00 | (code % 0x10000))));
      }
      token = this._PopToken ();
      if (!token || token.type != "refc") {
        this._ParseError (token, {type: "refc"});
      }
      this._LexMode = "CON";
    } else if (!isDoc && token.type == "ero") {
      this._LexMode = "REF";
      token = this._PopToken ();
      if (!token || token.type != "string") {
        this._ParseError (token, {type: "Name"});
      }
      var name = token.value;
      if (name == "amp" || name == "lt" || name == "gt" ||
          name == "quot" || name == "apos") {
        current.appendChild (doc.createTextNode (name == "amp"  ? "&" :
                                                 name == "lt"   ? "<" :
                                                 name == "gt"   ? ">" :
                                                 name == "quot" ? '"' :
                                                                  "'"));
      } else {
        this._ParseError (token, {type: "EntityRef",
                                  value: "**General entity reference is not implemented**"});
        current.appendChild (doc.createEntityReference (name));
      }
      token = this._PopToken ();
      if (!token || token.type != "refc") {
        this._ParseError (token, {type: "refc"});
      }
      this._LexMode = "CON";
    } else if (!isDoc && token.type == "mdo-dso") {
      this._ParseError (token, {type: "mdo",
                                value: "**cdata section not supported**"});
    } else if (isDoc && token.type == "mdo") {
      this._ParseError (token, {type: "mdo",
                                value: "**doctype declaration not supported**"});
    } else {
      this._TokenStack.push (token);
      break;
    }
  }
  
  if (el.length != 0) {
    this._ParseError (token, {type: "EndTag", value: "**missing end tag**"});
  }
};

cx.fam.suika.y2005.LS.SimpleParser.prototype._ParseError =
function (token, expected) {
  throw new Error ([token.type, token.value,
                    expected.type, expected.value].toString ());
  return;
  
  JSAN.require ("cx.fam.suika.y2005.LS.XML");
  if (token) {
    throw new cx.fam.suika.y2005.LS.XML.LSException
                  (cx.fam.suika.y2005.LS.XML.LSException.PARSE_ERR,
                   token.type + (token.value != null ? ' "' + token.value + '"' : "") +
                   " is found where " + expected.type +
                   (expected.value != null ? ' "' + expected.value + '"' : "") +
                   " is expected");
  } else {
    throw new cx.fam.suika.y2005.LS.XML.LSException
                  (cx.fam.suika.y2005.LS.XML.LSException.PARSE_ERR,
                   (expected.value != null ? ' "' + expected.value + '"' : "") +
                   " is required");
  }
};

cx.fam.suika.y2005.LS.SimpleParser.prototype._PopChar = function () {
  var nextChar = this._CharStack.pop ();
  if (nextChar) {
    return nextChar;
  }
  var ctype = this._SrcType;
  var ch = this._String.charAt (this._CurrentCharPos);
  if (ch.length > 0) {
    this._CurrentCharPos++;
    var cc = ch.charCodeAt (0);
    if (cc == 0x000D && (ctype == "external1.1" || ctype == "external1.0")) {
      var cn = this._String.charAt (this._CurrentCharPos);
      if (cn.length > 0) {
        var cnc = cn.charCodeAt (0);
        if (cnc == 0x000A || (cnc == 0x0085 && ctype == "external1.1")) {
          this._CurrentCharPos++;
        }
      }
      return "\u000A";
    } else if ((cc == 0x0085 || cc == 0x2028) && ctype == "external1.1") {
      return "\u000A";
    } else if (0xD800 <= cc && cc <= 0xDBFF) {
      var cn = this._String.charAt (this._CurrentCharPos);
      if (cn.length > 0) {
        var cnc = cn.charCodeAt (0);
        if (0xDC00 <= cnc && cnc <= 0xDFFF) {
          this._CurrentCharPos++;
          return ch + cn;
        }
      }
    }
  }
  return ch;
};

cx.fam.suika.y2005.LS.SimpleParser.prototype._IsNameChar = function (ch) {
  var cc = ch.charCodeAt (0);
  if (cc <= 0x002B || cc == 0x002F || cc == 0x003C || cc == 0x003D || cc == 0x003E ||
      cc == 0x003F || cc == 0x005B || cc == 0x005D || cc == 0x007C) {
    return false;
  } else {
    return true;
  }
};
cx.fam.suika.y2005.LS.SimpleParser.prototype._IsSChar = function (ch) {
  var cc = ch.charCodeAt (0);
  if (cc <= 0x0020) {
    return true;
  } else {
    return false;
  }
};

cx.fam.suika.y2005.LS.SimpleParser.prototype._PopToken = function () {
  var nextToken = this._TokenStack.pop ();
  if (nextToken) {
    return nextToken;
  }
  var r = "";
  switch (this._LexMode) {
  case "CON":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch != "<" && ch != "&" && ch != "]") {
        r += ch;
      } else if (ch == "<") {
        var ch2 = this._PopChar ();
        if (ch2 == "/") {
          this._TokenStack.push ({type: "etago"});
        } else if (ch2 == "!") {
          var ch3 = this._PopChar ();
          if (ch3 == "-") {
            var ch4 = this._PopChar ();
            if (ch4 == "-") {
              this._TokenStack.push ({type: "mdo-com"});
            } else {
              this._TokenStack.push ({type: "mdo"});
              this._CharStack.push (ch3);
              this._CharStack.push (ch4);
            }
          } else if (ch3 == "[") {
            this._TokenStack.push ({type: "mdo-dso"});
          } else {
            this._TokenStack.push ({type: "mdo"});
            this._CharStack.push (ch3);
          }
        } else if (ch2 == "?") {
          this._TokenStack.push ({type: "pio"});
        } else {
          this._CharStack.push (ch2);
          this._TokenStack.push ({type: "stago"});
        }
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else if (ch == "&") {
        var ch2 = this._PopChar ();
        if (ch2 != "#") {
          this._CharStack.push (ch2);
          this._TokenStack.push ({type: "ero"});
          if (r.length > 0) {
            return {type: "string", value: r};
          }
          return this._TokenStack.pop ();
        } else {
          var ch3 = this._PopChar ();
          if (ch3 != "x") {
            this._CharStack.push (ch3);
            this._TokenStack.push ({type: "nero"});
            if (r.length > 0) {
              return {type: "string", value: r};
            }
            return this._TokenStack.pop ();
          } else {
            this._TokenStack.push ({type: "hero"});
            if (r.length > 0) {
              return {type: "string", value: r};
            }
            return this._TokenStack.pop ();
          }
        }
      } else /* ] */ {
        var ch2 = this._PopChar ();
        if (ch2 != "]") {
          r += ch;
          this._CharStack.push (ch2);
        } else {
          var ch3 = this._PopChar ();
          if (ch3 != ">") {
            r += ch2;
            this._CharStack.push (ch3);
          } else {
            this._TokenStack.push ({type: "mse"});
            if (r.length > 0) {
              return {type: "string", value: r};
            }
            return this._TokenStack.pop ();
          }
        }
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "LIT":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch == '"' || ch == "'" || ch == "%") {
        this._TokenStack.push
          ({type: ch == '"' ? "lit" : ch == "'" ? "lita" : "pero"});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else if (ch != "&") {
        r += ch;
      } else {
        var ch2 = this._PopChar ();
        if (ch2 != "#") {
          this._CharStack.push (ch2);
          this._TokenStack.push ({type: "ero"});
          if (r.length > 0) {
            return {type: "string", value: r};
          }
          return this._TokenStack.pop ();
        } else {
          var ch3 = this._PopChar ();
          if (ch3 != "x") {
            this._CharStack.push (ch3);
            this._TokenStack.push ({type: "nero"});
            if (r.length > 0) {
              return {type: "string", value: r};
            }
            return this._TokenStack.pop ();
          } else {
            this._TokenStack.push ({type: "hero"});
            if (r.length > 0) {
              return {type: "string", value: r};
            }
            return this._TokenStack.pop ();
          }
        }
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "TAG":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch == ">" || ch == '"' || ch == "'" || ch == "=") {
        this._TokenStack.push ({type: ch == ">" ? "tagc" :
                                      ch == '"' ? "lit" :
                                      ch == "'" ? "lita" :
                                                  "vi"});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else if (ch == "/") {
        var ch2 = this._PopChar ();
        if (ch2 == ">") {
          this._TokenStack.push ({type: "nestc-net"});
          if (r.length > 0) {
            return {type: "string", value: r};
          }
          return this._TokenStack.pop ();
        } else {
          r += ch;
          this._CharStack.push (ch2);
        }
      } else if (this._IsSChar (ch)) {
        var s = ch;
        SC: while (true) {
          var ch2 = this._PopChar ();
          if (ch2.length == 0) break SC;
          if (this._IsSChar (ch2)) {
            s += ch2;
          } else {
            this._CharStack.push (ch2);
            break SC;
          }
        }
        this._TokenStack.push ({type: "S", value: s});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else {
        r += ch;
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "DSM":
    DSM: while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (this._IsSChar (ch)) {
        var s = ch;
        SC: while (true) {
          var ch2 = this._PopChar ();
          if (ch2.length == 0) break SC;
          if (this._IsSChar (ch2)) {
            s += ch2;
          } else {
            this._CharStack.push (ch2);
            break SC;
          }
        }
        this._TokenStack.push ({type: "S", value: s});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else if (ch != "<" && ch != "]" && ch != "%") {
        r += ch;
      } else if (ch == "<") {
        var ch2 = this._PopChar ();
        if (ch2 == "!") {
          var ch3 = this._PopChar ();
          if (ch3 == "-") {
            var ch4 = this._PopChar ();
            if (ch4 == "-") {
              this._TokenStack.push ({type: "mdo-com"});
            } else {
              this._TokenStack.push ({type: "mdo"});
              this._CharStack.push (ch3);
              this._CharStack.push (ch4);
            }
          } else if (ch3 == "[") {
            this._TokenStack.push ({type: "mdo-dso"});
          } else {
            this._TokenStack.push ({type: "mdo"});
            this._CharStack.push (ch3);
          }
        } else if (ch2 == "?") {
          this._TokenStack.push ({type: "pio"});
        } else {
          r += ch;
          this._CharStack.push (ch2);
          continue DSM;
        }
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else if (ch == "%") {
        return {type: "pero"};
      } else /* ] */ {
        var ch2 = this._PopChar ();
        if (ch2 != "]") {
          this._TokenStack.push ({type: "dsc"});
          this._CharStack.push (ch2);
        } else {
          var ch3 = this._PopChar ();
          if (ch3 != ">") {
            this._TokenStack.push ({type: "dsc"});
            this._CharStack.push (ch3);
            this._CharStack.push (ch2);
          } else {
            this._TokenStack.push ({type: "mse"});
          }
        }
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "MD":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch == ">" || ch == '"' || ch == "'" || ch == "%" || ch == "[" ||
          ch == "(" || ch == "#") {
        this._TokenStack.push ({type: ch == ">" ? "mdc" :
                                      ch == '"' ? "lit" :
                                      ch == "'" ? "lita" :
                                      ch == "%" ? "pero" :
                                      ch == "[" ? "mdo" :
                                      ch == "(" ? "gro" :
                                                  "rni"});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else if (this._IsSChar (ch)) {
        var s = ch;
        SC: while (true) {
          var ch2 = this._PopChar ();
          if (ch2.length == 0) break SC;
          if (this._IsSChar (ch2)) {
            s += ch2;
          } else {
            this._CharStack.push (ch2);
            break SC;
          }
        }
        this._TokenStack.push ({type: "S", value: s});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else {
        r += ch;
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "REF":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch != ";") {
        r += ch;
      } else {
        if (r.length > 0) {
          this._TokenStack.push ({type: "refc"});
          return {type: "string", value: r};
        } else {
          return {type: "refc"};
        }
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "COM":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch != "-") {
        r += ch;
      } else {
        var ch2 = this._PopChar ();
        if (ch2 != "-") {
          r += ch + ch2;
        } else {
          if (r.length > 0) {
            this._TokenStack.push ({type: "com"});
            return {type: "string", value: r};
          } else {
            return {type: "com"};
          }
        }
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "GRP":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch == "|" || ch == ',' || ch == "(" || ch == ")" || ch == "%" ||
          ch == "*" || ch == "+" || ch == "?" || ch == "#") {
        this._TokenStack.push ({type: ch == "|" ? "or" :
                                      ch == ',' ? "seq" :
                                      ch == "(" ? "grpo" :
                                      ch == ")" ? "grpc" :
                                      ch == "%" ? "pero" :
                                      ch == "*" ? "rep" :
                                      ch == "+" ? "plus" :
                                      ch == "?" ? "opt" :
                                                  "rni"});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else if (this._IsSChar (ch)) {
        var s = ch;
        SC: while (true) {
          var ch2 = this._PopChar ();
          if (ch2.length == 0) break SC;
          if (this._IsSChar (ch2)) {
            s += ch2;
          } else {
            this._CharStack.push (ch2);
            break SC;
          }
        }
        this._TokenStack.push ({type: "S", value: s});
        if (r.length > 0) {
          return {type: "string", value: r};
        }
        return this._TokenStack.pop ();
      } else {
        r += ch;
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  case "PI":
    while (true) {
      var ch = this._PopChar ();
      if (ch.length == 0) break;
      if (ch != "?") {
        r += ch;
      } else {
        var ch2 = this._PopChar ();
        if (ch2 != ">") {
          r += ch + ch2;
        } else {
          if (r.length > 0) {
            this._TokenStack.push ({type: "pic"});
            return {type: "string", value: r};
          } else {
            return {type: "pic"};
          }
        }
      }
    }
    if (r.length > 0) {
      return {type: "string", value: r};
    } else {
      return null;
    }
  default:
    return null;
  }
};


/* Revision: $Date: 2005/11/06 14:24:23 $ */

/* ***** BEGIN LICENSE BLOCK *****
 * Copyright 2005 Wakaba <w@suika.fam.cx>.  All rights reserved.
 *
 * This program is free software; you can redistribute it and/or 
 * modify it under the same terms as Perl itself.
 *
 * Alternatively, the contents of this file may be used 
 * under the following terms (the "MPL/GPL/LGPL"), 
 * in which case the provisions of the MPL/GPL/LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of the MPL/GPL/LGPL, and not to allow others to
 * use your version of this file under the terms of the Perl, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the MPL/GPL/LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the Perl or the MPL/GPL/LGPL.
 *
 * "MPL/GPL/LGPL":
 *
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * <http://www.mozilla.org/MPL/>
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is BIDOM code.
 *
 * The Initial Developer of the Original Code is Wakaba.
 * Portions created by the Initial Developer are Copyright (C) 2005
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Wakaba <w@suika.fam.cx>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the LGPL or the GPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
