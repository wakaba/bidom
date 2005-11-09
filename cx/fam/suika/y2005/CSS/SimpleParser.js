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
if (typeof (cx.fam.suika.y2005.CSS) == "undefined") {
  cx.fam.suika.y2005.CSS = {};
}

cx.fam.suika.y2005.CSS.SimpleParser = function (impl) {
  this._Factory = impl;
};

/**
   Parses a |DOMString| as an entire CSS style sheet (|stylesheet|)
   and returns it as a |CSSStyleSheet| object.
   
   This parser will discard any ignored tokens if any.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype.parseString =
function (inputText) {
  this._String = inputText;
  this._CurrentCharPos = 0;
  this._CharStack = [];
  this._TokenStack = [];
  this._IgnoreCharset = false;
  
  JSAN.require ("cx.fam.suika.y2005.CSS.Node");
  JSAN.require ("cx.fam.suika.y2005.CSS.Property");
  var ss = this._Factory.createCSSStyleSheet ();
  this._NSContext = ss;
  
  this._ParseStyleSheet (ss);
  
  this._NSContext = null;
  this._String = null;
  return ss;
};

/**
   Parses a |DOMString| as a group of selectors (|selectors-group|)
   and returns it as a |SSelectorsGroup| object.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype.parseSelectorsString =
function (inputText, nsContext) {
  this._String = inputText;
  this._CurrentCharPos = 0;
  this._CharStack = [];
  this._TokenStack = [];
  this._NSContext = nsContext;
  
  JSAN.require ("cx.fam.suika.y2005.CSS.Selectors");
  var sel = this._ParseSelectorsGroup ();
  
  var token = this._PopToken (false);
  if (token != null) {
    sel = this._Factory.createSSelectorsGroup ();
  }
  
  this._NSContext = null;
  this._String = null;
  
  return sel;
};

/**
   Parses the input as a style sheet, i.e. a list of statements,
   and returns a |CSSStyleSheet| object.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._ParseStyleSheet =
function (ss) {
  /* Whether a top-level |@charset| rule should be ignored or not */
  /* this._IgnoreCharset = false; -- should be set by the callee of the method -- */
  if (!this._IgnoreCharset) {
    var ch = this._PopChar ();
    if (ch != "@") {
      this._IgnoreCharset = true;
      /* |@charst| rule must be the first token in |stylesheet|. */
    }
    if (ch.length > 0) this._CharStack.push (ch);
  }
  
  /* Whether a top-level |@import| rule should be ignored or not */
  this._IgnoreImport = false;
  
  /* Whether a top-level |@namespace| rule should be ignored or not */
  this._IgnoreNamespace = false;
  
  S: while (true) {
    var token = this._PopToken (false);
    if (!token) {
      break S;
    } else if (token.type == "ATKEYWORD") { /* at-rule */
      this._ParseAtRule (token, ss);
      if (token.value != "import" && token.value != "charset") {
        this._IgnoreImport = true;
        if (token.value != "namespace") this._IgnoreNamespace = true;
      }
      this._IgnoreCharset = true;
    } else if (token.type == "S" || token.type == "CDO" || token.type == "CDC") {
      this._IgnoreCharset = true;
    } else if (token.type == "INVALID") {
      /* Broken string -- ignored */
      this._IgnoreCharset = true;
    } else { /* rule set */
      this._TokenStack.push (token);
      this._ParseRuleSet (ss);
      this._IgnoreNamespace = true;
      this._IgnoreImport = true;
      this._IgnoreCharset = true;
    }
  }
};

/**
   Parses an at-rule.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._ParseAtRule =
function (/* |ATKEYWORD| */ token, parentNode) {
  var atType = token.value.toLowerCase ();
  var parentType = parentNode.getCSSNodeType ();
  var token = this._PopToken (false);
  
  if (atType == "namespace" &&
      !this._IgnoreNamespace &&
      parentType == parentNode.CSS_STYLE_SHEET_NODE) {
    var prefix = null;
    if (token && token.type == "IDENT") {
      prefix = token.value;
      token = this._PopToken (false);
    }
    
    if (token && (token.type == "STRING" || token.type == "URI")) {
      var uri = token.value;
      token = this._PopToken (false);
      if (token && token.type == ";") {
        var ati = this._Factory.createCSSNamespaceRule (prefix, uri);
        parentNode.appendCSSRule (ati);
        
        /* Skipping |S|s if any */
        token = this._PopToken (false);
        if (token != null) this._TokenStack.push (token);
        return;
      }
    }
  } else if (atType == "import" &&
             !this._IgnoreImport &&
             parentType == parentNode.CSS_STYLE_SHEET_NODE) {
    if (token && (token.type == "STRING" || token.type == "URI")) {
      var uri = token.value;
      token = this._PopToken (false);
      
      /* Media query (it might be empty) */
      var mq = this._ParseMediaQuery ();
      
      if (token && token.type == ";") {
        var ati = this._Factory.createCSSImportRule (uri, mq);
        parentNode.appendCSSRule (ati);
        
        /* Skipping |S|s if any */
        token = this._PopToken (false);
        if (token != null) this._TokenStack.push (token);
        return;
      }
    }
  } else if (atType == "charset" &&
             !this._IgnoreCharset &&
             parentType == parentNode.CSS_STYLE_SHEET_NODE) {
    if (token && token.type == "STRING") {
      var charset = token.value;
      token = this._PopToken (false);
      if (token && token.type == ";") {
        var atc = this._Factory.createCSSCharsetRule (charset);
        parentNode.appendCSSRule (atc);
        
        /* Skipping |S|s if any */
        token = this._PopToken (false);
        if (token != null) this._TokenStack.push (token);
        return;
      }
    }
  }
  
  /* Skips |any|s */
  ANY: while (token && (token.type != "{" && token.type != ";" &&
                        token.type != "ATKEYWORD")) {
    if (token.type == "[" || token.type == "(" || token.type == "FUNCTION") {
      this._TokenStack.push (token);
      this._SkipAnyEnclosed ();
    }
    token = this._PopToken (false);
  }
  /* Skips a |block| if any */
  if (token == null) {
    /* WARNING: error */
  } else if (token.type == "{") {
    this._TokenStack.push (token);
    this._SkipAnyEnclosed ();
    token = this._PopToken (false); /* Skips |S| if any */
  } else if (token.type == ";") {
    token = this._PopToken (false); /* Skips |S| if any */
  }
  if (token != null) this._TokenStack.push (token);
};

/**
   Parses a rule set.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._ParseRuleSet =
function (parentNode) {
  var sel = this._ParseSelectorsGroup ();
  var token = this._PopToken (false);
  if (sel.getLength () != 0) {
    if (token && token.type == "{") {
      var rs = this._Factory.createCSSRuleSet (sel);
      this._ParseDeclarationBlockContent (rs);
      token = this._PopToken (false);
      if (!token || token.type == "}") {
        parentNode.appendCSSRule (rs);
        /* Skips |S| if any */
        token = this._PopToken (false);
        if (token != null) this._TokenStack.push (token);
        return;
      }
    }
  }
  
  /* Skips |any|s */
  ANY: while (token && (token.type != "{" && token.type != ";" &&
                        token.type != "ATKEYWORD")) {
    if (token.type == "[" || token.type == "(" || token.type == "FUNCTION") {
      this._TokenStack.push (token);
      this._SkipAnyEnclosed ();
    }
    token = this._PopToken (false);
  }
  if (token && token.type == "{") {
    this._TokenStack.push (token);
    this._SkipAnyEnclosed ();
  } else {
    /* Warning: error */
  }
};

/**
   Parses the content of a declaration block.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._ParseDeclarationBlockContent =
function (parentNode) {
  var token = this._PopToken (false);
  var block = parentNode.getStyle ();
  
  D: while (token && (token.type == "IDENT" || token.type == "DELIM")) {
    if (token.type == "IDENT") {
      var prop = this._ExpandNamespacedIdent (token.value.toLowerCase ());
      token = this._PopToken (false);
      if (token && token.type == "DELIM" && token.value == ":") {
        token = this._PopToken (false);
        var pp = cx.fam.suika.y2005.CSS.Property.getPropertyDefinition
                   (prop.namespaceURI, prop.localName);
        if (pp.isSupported) {
          this._TokenStack.push (token);
          this._ValueStack = [];
          var valsrc = pp.parseValueFromTokens
                         (this, prop.namespaceURI, prop.prefix, prop.localName);
          var priority = valsrc != null ? this._GetPriority () : null;
          if (priority != null) {
            token = this._PopToken ();
            if (!token || token.type == "}") {
              pp.setDeclaredValue (prop.namespaceURI, prop.prefix, prop.localName,
                                   block, valsrc, priority);
              this._TokenStack.push (token);
              return;
            } else if (token.type == ";") {
              pp.setDeclaredValue (prop.namespaceURI, prop.prefix, prop.localName,
                                   block, valsrc, priority);
              token = this._PopToken (false);
              continue D;
            }
          } else {
            token = this._PopToken (false);
          }
        }
      }
    }
    
    /* Skips |any|s */
    ANY: while (token && token.type != ";") {
      if (token.type == "{" || token.type == "[" ||
          token.type == "(" || token.type == "FUNCTION") {
        this._TokenStack.push (token);
        this._SkipAnyEnclosed ();
      } else if (token.type == "}") {
        this._TokenStack.push (token);
        return;
      }
      token = this._PopToken (false);
    }
    if (token && token.type == ";") {
      token = this._PopToken (false);
      continue D;
    }
  } /* D */
  
  if (token != null) this._TokenStack.push (token);
};

/* A set of pseudo element parsers */
cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoElementParser = {};
cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoElementParser
["urn:x-suika-fam-cx:selectors:"] = {
  after: function (selseq, pctype) {
    selseq.appendPseudoElement
      (this._Factory.createSPseudoElementNS
        (pctype.namespaceURI, pctype.prefix, pctype.localName));
    return true;
  }
};
(function (v) {
  for (var i in v) {
    cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoElementParser
    ["urn:x-suika-fam-cx:selectors:"][v[i]]
      = cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoElementParser
        ["urn:x-suika-fam-cx:selectors:"]["after"];
  }
}) ([/* "after", */ "before", "first-letter", "first-line", "selection"]);

/* A set of pseudo class parsers */
cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoClassParser = {};
cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoClassParser
["urn:x-suika-fam-cx:selectors:"] = {
  active: function (selseq, pctype) {
    selseq.appendSimpleSelector
      (this._Factory.createSPseudoClassNS
        (pctype.namespaceURI, pctype.prefix, pctype.localName));
    return true;
  }
};
(function (v) {
  for (var i in v) {
    cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoClassParser
    ["urn:x-suika-fam-cx:selectors:"][v[i]]
      = cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoClassParser
        ["urn:x-suika-fam-cx:selectors:"]["active"];
  }
}) ([/* "active", */ "checked", "disabled", "empty", "enabled",
     "first-child", "first-of-type", "focus", "hover", "indeterminate",
     "last-child", "last-of-type", "link", "only-child", "root", "target", "visited"]);
(function (v) {
  for (var i in v) {
    cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoClassParser
    ["urn:x-suika-fam-cx:selectors:"][v[i]]
      = cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoElementParser
        ["urn:x-suika-fam-cx:selectors:"][v[i]];
    cx.fam.suika.y2005.CSS.SimpleParser.prototype._PseudoClassParser
    ["urn:x-suika-fam-cx:selectors:"][v[i]].isPseudoElement = true;
  }
}) (["after", "before", "first-letter", "first-line"]);

/**
   Parses and returns the next value, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._GetNextValue =
function (token) {
  var nextValue = this._ValueStack.pop ();
  if (nextValue) {
    return nextValue;
  }
  if (token == null) token = this._PopToken (false);
  if (token == null) {
    return null;
  } else if (token.type == "DIMENSION") { /* <length> */
    var unit = this._ExpandNamespacedIdent (token.value2.toLowerCase ());
    var val = this._Factory.createCSSNumericValueNS
                (token.value, unit.namespaceURI, unit.prefix, unit.localName);
    return val;
  } else if (token.type == "PERCENTAGE") { /* <percentage> */
    return this._Factory.createCSSNumericValueNS (token.value, null, null, "%");
  } else if (token.type == "NUMBER") { /* <number> or zero <length> */
    return this._Factory.createCSSNumericValueNS (token.value);
  } else if (token.type == "IDENT") {
    var v = this._ExpandNamespacedIdent (token.value.toLowerCase ());
    var val = this._Factory.createCSSKeywordValueNS
                (v.namespaceURI, v.prefix, v.localName);
    return val;
  } else if (token.type == "URI") {
    return this._Factory.createCSSURIValue
             (token.value, this._NSContext.getBaseURI ());
  } else if (token.type == "FUNCTION") {
    var fname = token.value.toLowerCase ();
    if (fname == "rgb") {
      token = this._PopToken (false);
      if (token && token.type == "NUMBER") {
        var r = token.value;
        token = this._PopToken ();
        if (token && token.type == "DELIM" && token.value == ",") {
          token = this._PopToken ();
          if (token && token.type == "NUMBER") {
            var g = token.value;
            token = this._PopToken ();
            if (token && token.type == "DELIM" && token.value == ",") {
              token = this._PopToken ();
              if (token && token.type == "NUMBER") {
                var b = token.value;
                token = this._PopToken ();
                if (!token || token.type == ")") {
                  /* null token is allowed because of CSS error recovering rule */
                  return this._Factory.createCSSRGBAValue (r, g, b, 1, false);
                }
              }
            }
          }
        }
      } else if (token && token.type == "PERCENTAGE") {
        var r = token.value;
        token = this._PopToken ();
        if (token && token.type == "DELIM" && token.value == ",") {
          token = this._PopToken ();
          if (token && token.type == "PERCENTAGE") {
            var g = token.value;
            token = this._PopToken ();
            if (token && token.type == "DELIM" && token.value == ",") {
              token = this._PopToken ();
              if (token && token.type == "PERCENTAGE") {
                var b = token.value;
                token = this._PopToken ();
                if (!token || token.type == ")") {
                  /* null token is allowed because of CSS error recovering rule */
                  return this._Factory.createCSSRGBAValue (r, g, b, 1, true);
                }
              }
            }
          }
        }
      }
    } else if (fname == "rgba") {
      token = this._PopToken (false);
      if (token && token.type == "NUMBER") {
        var r = token.value;
        token = this._PopToken ();
        if (token && token.type == "DELIM" && token.value == ",") {
          token = this._PopToken ();
          if (token && token.type == "NUMBER") {
            var g = token.value;
            token = this._PopToken ();
            if (token && token.type == "DELIM" && token.value == ",") {
              token = this._PopToken ();
              if (token && token.type == "NUMBER") {
                var b = token.value;
                token = this._PopToken ();
                if (token && token.type == "DELIM" && token.value == ",") {
                  token = this._PopToken ();
                  if (token && token.type == "NUMBER") {
                    var a = token.value;
                    token = this._PopToken ();
                    if (!token || token.type == ")") {
                      /* null token is allowed because of CSS error recovering rule */
                      return this._Factory.createCSSRGBAValue (r, g, b, a, false);
                    }
                  }
                }
              }
            }
          }
        }
      } else if (token && token.type == "PERCENTAGE") {
        var r = token.value;
        token = this._PopToken ();
        if (token && token.type == "DELIM" && token.value == ",") {
          token = this._PopToken ();
          if (token && token.type == "PERCENTAGE") {
            var g = token.value;
            token = this._PopToken ();
            if (token && token.type == "DELIM" && token.value == ",") {
              token = this._PopToken ();
              if (token && token.type == "PERCENTAGE") {
                var b = token.value;
                token = this._PopToken ();
                if (token && token.type == "DELIM" && token.value == ",") {
                  token = this._PopToken ();
                  if (token && token.type == "NUMBER") {
                    var a = token.value;
                    token = this._PopToken ();
                    if (!token || token.type == ")") {
                      /* null token is allowed because of CSS error recovering rule */
                      return this._Factory.createCSSRGBAValue (r, g, b, a, true);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else if (fname == "hsl") {
      token = this._PopToken (false);
      if (token && token.type == "NUMBER") {
        var h = token.value;
        token = this._PopToken ();
        if (token && token.type == "DELIM" && token.value == ",") {
          token = this._PopToken ();
          if (token && token.type == "PERCENTAGE") {
            var s = token.value;
            token = this._PopToken ();
            if (token && token.type == "DELIM" && token.value == ",") {
              token = this._PopToken ();
              if (token && token.type == "PERCENTAGE") {
                var l = token.value;
                token = this._PopToken ();
                if (!token || token.type == ")") {
                  /* null token is allowed because of CSS error recovering rule */
                  return this._Factory.createCSSHSLAValue (h, s, l, 1);
                }
              }
            }
          }
        }
      }
    } else if (fname == "hsla") {
      token = this._PopToken (false);
      if (token && token.type == "NUMBER") {
        var h = token.value;
        token = this._PopToken ();
        if (token && token.type == "DELIM" && token.value == ",") {
          token = this._PopToken ();
          if (token && token.type == "PERCENTAGE") {
            var s = token.value;
            token = this._PopToken ();
            if (token && token.type == "DELIM" && token.value == ",") {
              token = this._PopToken ();
              if (token && token.type == "PERCENTAGE") {
                var l = token.value;
                token = this._PopToken ();
                if (token && token.type == "DELIM" && token.value == ",") {
                  token = this._PopToken ();
                  if (token && token.type == "NUMBER") {
                    var a = token.value;
                    token = this._PopToken ();
                    if (!token || token.type == ")") {
                      /* null token is allowed because of CSS error recovering rule */
                      return this._Factory.createCSSHSLAValue (h, s, l, a);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    /* error - push a dummy token for later process to ignore
               tokens that takes matching of "(" & ")" into account  */
    this._TokenStack.push ({type: "FUNCTION", value: "**dummy**"});
    return null;
  } else if (token.type == "STRING") {
    return this._Factory.createCSSStringValue (token.value);
  } else if (token.type == "DELIM") {
    if (token.value == "-" || token.value == "+") {
      var token2 = this._PopToken ();
      if (token2 == null) {
        this._TokenStack.push (token2);
      } else if (token2.type == "NUMBER") { /* <number> or zero <length> */
        if (token.value == "-") token2.value *= -1;
        return this._Factory.createCSSNumericValueNS (token2.value);
      } else {
        this._TokenStack.push (token2);
      }
    }
  } else if (token.type == "HASH") {
    if (token.value.match (/^[0-9A-Fa-f]{6}$/)) {
      return this._Factory.createCSSRGBAValue (parseInt (token.value.slice (0, 2), 16),
                                               parseInt (token.value.slice (2, 4), 16),
                                               parseInt (token.value.slice (4, 6), 16),
                                               1, false);
    } else if (token.value.match (/^[0-9A-Fa-f]{3}$/)) {
      return this._Factory.createCSSRGBAValue (parseInt (token.value.slice (0, 1), 16),
                                               parseInt (token.value.slice (1, 2), 16),
                                               parseInt (token.value.slice (2, 3), 16),
                                               1, false);
    }
  }
  this._TokenStack.push (token);
  return null;
};

/**
   Converts priority specification at the end of the property declaration, if any,
   into a |CSSValue| object and tests whether it reaches to the very last
   of the declaration or not.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._GetPriority = function () {
  if (this._ValueStack.length > 0) return null;
  var token = this._PopToken (false);
  var val = null;
  if (token != null && token.type == "DELIM" && token.value == "!") {
    token = this._PopToken (false);
    if (token != null && token.type == "IDENT") {
      var v = this._ExpandNamespacedIdent (token.value.toLowerCase ());
      val = this._Factory.createCSSKeywordValueNS
              (v.namespaceURI, v.prefix, v.localName);
      token = this._PopToken (false);
    } else {
      return null;
    }
  }
  if (token == null ||
      token.type == "}" ||
      token.type == ";") {
    if (token != null) this._TokenStack.push (token);
    return val != null ? val : this._Factory.createCSSKeywordValueNS
                                 ("http://suika.fam.cx/~wakaba/archive/2005/cssc.",
                                  "manakaic", "normal");
  } else {
    this._TokenStack.push (token);
    return null;
  }
};

/**
   Expands an identifier (|ident|) into a triplet of namespace URI,
   namespace prefix, and local name.
   
   Note that namespace extension to identifiers is a non-standard feature.
   
   @param ident     The identifier to expand.  It should be normalized to
                    lower case if necessary.  The method does no such convertion.
   @param defaultNamespaceURI The namespace URI of the default namespace.
                    If |null|, the default of the default namespace URI is
                    |urn:x-suika-fam-cx:css:|.
   @return An |Object| that has three properties: |namespaceURI|, |localName|,
           and |prefix|.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._ExpandNamespacedIdent =
function (ident, defaultNamespaceURI) {
  if (this._NSContext != null && ident.match (/^-([^-]+)-/)) {
    var prefix = RegExp.$1;
    var lname = ident.substring (prefix.length + 2);
    var ns = this._NSContext.lookupNamespaceURI (prefix);
      /* ISSUE: Is prefix case-sensitive? */
    if (ns != null) {
      return {namespaceURI: ns, localName: lname, prefix: prefix};
    }
  }
  return {namespaceURI: defaultNamespaceURI == null ? "urn:x-suika-fam-cx:css:"
                                                    : defaultNamespaceURI,
          localName: ident.toLowerCase (), prefix: null};
};

/**
   Parses a selector and returns it as a |SSelectorsGroup| object.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._ParseSelectorsGroup =
function () {
  var token = this._PopToken (false);
  var sels = this._Factory.createSSelectorsGroup ();
  Sel: while (token != null) {
    var sel = this._Factory.createSSelector ();
    var cmb = null;
    SelSeq: while (token != null) {
      var pfx = "";
      var ln = null;
      var nsuri = null;
      if (token.type == "IDENT" ||
          (token.type == "DELIM" && token.value == "*")) {
        ln = token.value;
        pfx = null;
        token = this._PopToken (true);
      }
      
      if (token && token.type == "DELIM" && token.value == "|") {
        token = this._PopToken (true);
        if (token != null && (token.type == "IDENT" ||
                              token.type == "DELIM" && token.value == "*")) {
          pfx = ln != null ? ln.toLowerCase () : "";
          if (pfx != "*") {
            nsuri = this._NSContext.lookupNamespaceURI (pfx != "" ? pfx : null);
            if (pfx != "" && nsuri == null) {
              /* Invalid selector */
              return this._Factory.createSSelectorsGroup ();
            }
          }
          ln = token.value;
          token = this._PopToken (true);
        } else {
          /* Invalid selector */
          if (token != null && token.type == "S") token = this._PopToken (false);
          if (token != null) this._TokenStack.push (token);
          return this._Factory.createSSelectorsGroup ();
        }
      }
      
      if (ln == null || pfx == null) {
        pfx = null;
        nsuri = this._NSContext.lookupNamespaceURI (null);
      }
      
      var tsel = this._Factory.createSTypeSelectorNS (nsuri, pfx, ln);
      var selseq = this._Factory.createSSimpleSelectorSequence (tsel);
      
      var hasPseudoElement = false;
      SimpleSel: while (token != null) {
        if (token.type == "DELIM") {
          if (token.value == "." && !hasPseudoElement) {
            token = this._PopToken (true);
            if (token != null && token.type == "IDENT") {
              selseq.appendSimpleSelector
                (this._Factory.createSClassSelector (token.value));
              token = this._PopToken (true);
              continue SimpleSel;
            }
          } else if (token.value == "+" || token.value == "~" ||
                     token.value == ">" || token.value == ",") {
            if (ln == null && selseq.getSimpleSelectorLength () == 1) {
              // Empty (invalid) selector
            } else {
              break SimpleSel;
            }
          } else if (token.value == ":") {
            token = this._PopToken (true);
            if (token != null) {
              if (token.type == "IDENT") {
                var pctype = this._ExpandNamespacedIdent
                                 (token.value.toLowerCase (),
                                  "urn:x-suika-fam-cx:selectors:");
                var pp = this._PseudoClassParser[pctype.namespaceURI] != null
                         ? this._PseudoClassParser[pctype.namespaceURI]
                                                  [pctype.localName]
                         : null;
                if (pp != null) { /* Supported pseudo class */
                  if (pp.isPseudoElement) {
                    hasPseudoElement = true;
                  }
                  if (pp.apply (this, [selseq, pctype])) {
                    token = this._PopToken (true);
                    continue SimpleSel;
                  }
                }
              } else if (token.value == ":") {
                hasPseudoElement = true;
                token = this._PopToken (true);
                if (token != null && token.type == "IDENT") {
                  var petype = this._ExpandNamespacedIdent
                                 (token.value.toLowerCase (),
                                  "urn:x-suika-fam-cx:selectors:");
                  var pp = this._PseudoElementParser[petype.namespaceURI] != null
                           ? this._PseudoElementParser[petype.namespaceURI]
                                                      [petype.localName]
                           : null;
                  if (pp != null) { /* Supported pseudo element */
                    if (pp.apply (this, [selseq, petype])) {
                      token = this._PopToken (true);
                      continue SimpleSel;
                    }
                  }
                }
              }
            }
          }
        } else if (token.type == "[" && !hasPseudoElement) {
          token = this._PopToken (false);
          var pfx = "";
          var nsuri = null;
          var ln = null;
          if (token != null && (token.type == "IDENT" ||
                                token.type == "DELIM" && token.value == "*")) {
            ln = token.value;
            pfx = null;
            token = this._PopToken (true);
          }
          
          if (token && token.type == "DELIM" && token.value == "|") {
            token = this._PopToken (true);
            if (token != null && token.type == "IDENT") {
              pfx = ln != null ? ln.toLowerCase () : "";
              if (pfx != "*") {
                if (pfx != "") nsuri = this._NSContext.lookupNamespaceURI (pfx);
                if (pfx != "" && nsuri == null) {
                  /* Invalid selector */
                  return this._Factory.createSSelectorsGroup ();
                }
              }
              ln = token.value;
              token = this._PopToken (false);
            } else {
              /* Invalid selector */
              if (token != null && token.type == "S") token = this._PopToken (false);
              if (token != null) this._TokenStack.push (token);
              return this._Factory.createSSelectorsGroup ();
            }
          }
          
          if (ln == "*") {
            /* Invalid selector */
            if (token != null && token.type == "S") token = this._PopToken (false);
            if (token != null) this._TokenStack.push (token);
            return this._Factory.createSSelectorsGroup ();
          }
          
          if (token != null && token.type == "S") token = this._PopToken (false);
          if (token != null && ln != null) {
            var op = token.type;
            if ((op == "DELIM" && token.value == "=") ||
                op == "INCLUDES" ||
                op == "DASHMATCH" ||
                op == "PREFIXMATCH" ||
                op == "SUFFIXMATCH" ||
                op == "SUBSTRINGMATCH") {
              token = this._PopToken (false);
              if (token != null &&
                  (token.type == "STRING" || token.type == "IDENT")) {
                var val = token.value;
                token = this._PopToken (false);
                if (token != null && token.type == "]") {
                  selseq.appendSimpleSelector
                    (this._Factory.createSAttributeSelectorNS
                       (nsuri, pfx, ln,
                        op == "DELIM"
                            ? cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
                              .prototype.SELECTORS_ATTRIBUTE_EQUALS        :
                        op == "INCLUDES"
                            ? cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
                              .prototype.SELECTORS_ATTRIBUTE_INCLUDES      :
                        op == "DASHMATCH"
                            ? cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
                              .prototype.SELECTORS_ATTRIBUTE_DASHMATCH     :
                        op == "PREFIXMATCH"
                            ? cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
                              .prototype.SELECTORS_ATTRIBUTE_PREFIXMATCH   :
                        op == "SUFFIXMATCH"
                            ? cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
                              .prototype.SELECTORS_ATTRIBUTE_SUFFIXMATCH   :
                              cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
                              .prototype.SELECTORS_ATTRIBUTE_SUBSTRINGMATCH,
                        val));
                  token = this._PopToken (true);
                  continue SimpleSel;
                }
              }
            } else if (op == "]") {
              selseq.appendSimpleSelector
                    (this._Factory.createSAttributeSelectorNS
                       (nsuri, pfx, ln,
                        cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
                        .prototype.SELECTORS_ATTRIBUTE_HAS, null));
              token = this._PopToken (true);
              continue SimpleSel;
            }
          }
        } else if (token.type == "HASH" && !hasPseudoElement) {
          selseq.appendSimpleSelector
            (this._Factory.createSIDSelector (token.value));
          token = this._PopToken (true);
          continue SimpleSel;
        } else if (token.type == "S" || token.type == "}") {
          break SimpleSel;
        } else if (token.type == "{" || token.type == "ATKEYWORD") {
          if (ln == null && selseq.getSimpleSelectorLength () == 1) {
            // Empty (invalid) selector
          } else {
            break SimpleSel;
          }
        }
        
        /* Invalid selector */
        if (token != null && token.type == "S") token = this._PopToken (false);
        if (token != null) this._TokenStack.push (token);
        return this._Factory.createSSelectorsGroup ();
      } /* SimpleSel */
      sel.appendSimpleSelectorSequence (cmb, selseq);
      
      if (token != null && token.type == "S" && !hasPseudoElement) {
        cmb = cx.fam.suika.y2005.CSS.Selectors.Selector
              .prototype.SELECTORS_COMBINATOR_DESCENDANT;
        token = this._PopToken (false);
      } else {
        cmb = null;
      }
      if (token != null && token.type == "DELIM" && !hasPseudoElement) {
        if (token.value == "+") {
          cmb = cx.fam.suika.y2005.CSS.Selectors.Selector
                  .prototype.SELECTORS_COMBINATOR_CHILD;
          token = this._PopToken (false);
          continue SelSeq;
        } else if (token.value == ">") {
          cmb = cx.fam.suika.y2005.CSS.Selectors.Selector
                  .prototype.SELECTORS_COMBINATOR_DIRECT_ADJACENT_SIBLING;
          token = this._PopToken (false);
          continue SelSeq;
        } else if (token.value == "~") {
          cmb = cx.fam.suika.y2005.CSS.Selectors.Selector
                  .prototype.SELECTORS_COMBINATOR_INDIRECT_ADJACENT_SIBLING;
          token = this._PopToken (false);
          continue SelSeq;
        } else if (token.value != "*" &&
                   token.value != "|" &&
                   token.value != ":" &&
                   token.value != ".") {
          cmb = null;
          break SelSeq;
        }
      } else if (token == null ||
                 (token.type != "IDENT" &&
                  token.type != "HASH" &&
                  token.type != "[" &&
                  !(token.type == "DELIM" && (token.value == "*" ||
                                              token.value == "|" ||
                                              token.value == ":" ||
                                              token.value == ".")))) {
        cmb = null;
        break SelSeq;
      } else if (cmb == null) {
        break SelSeq;
      }
    } /* SelSeq */
    if (cmb != null) {     /* Non-terminated selector -> an empty Selectors */
      /* Invalid selector */
      if (token != null && token.type == "S") token = this._PopToken (false);
      if (token != null) this._TokenStack.push (token);
      return this._Factory.createSSelectorsGroup ();
    }
    sels.appendSelector (sel);
    
    if (token != null && token.type == "DELIM" && token.value == ",") {
      token = this._PopToken (false);
    } else {
      break Sel;
    }
  } /* Sel */
  if (token != null) {
    this._TokenStack.push (token);
  }
  return sels;
};

/*
  selectors-group              := selector *("," *S selector)
  selector                     := simple-selector-sequence
                                  *(combinator simple-selector-sequence)
                                  pseudo-elements *S
  simple-selector-sequence     := [type-selector / universal-selector]
                                  1*(simple-selector - type-selector
                                     - universal-selector) /
                                  type-selector / universal-selector
  simple-selector              := type-selector /
                                  universal-selector /
                                  attribute-selector /
                                  class-selector /
                                  ID-selector /
                                  content-selector /
                                  pseudo-class
  type-selector                := [namespace] element-name
  element-name                 := IDENT
  namespace                    := [namespace-prefix] "|"
  namespace-prefix             := IDENT / "*"
  universal-selector           := [namespace] "*"
  attribute-selector           := "[" *S [namespace] attribute-name *S
                                  [attribute-match *S attribute-value] *S "]"
  attribute-name               := IDENT
  attribute-match              := "=" / INCLUDES / DASHMATCH /
                                  PREFIXMATCH / SUFFIXMATCH / SUBSTRINGMATCH
  attribute-value              := IDENT / STRING
  class-selector               := "." IDENT
  ID-selector                  := HASH
  pseudo-class                 := ":" IDENT / functional-pseudo-class
  functional-pseudo-class      := ":" FUNCTION *S pseudo-class-value *S ")"
  pseudo-class-value           := IDENT / STRING / NUMBER / expression / negation-arg
  expression                   := ["-" / INTEGER] "n" [SIGNED_INTEGER] / INTEGER
  negation-arg                 := simple-selector
  pseudo-elements              := [structural-pseudo-elements]
                                  [formatting-pseudo-element]
  structural-pseudo-elements   := *(["::outside" ["(" integer ")"]]
                                    ("::before" ["(" integer ")"] / ":before" /
                                     "::after" ["(" integer ")"] / ":after" /
                                     "::alternate")
                                    ["::outside" ["(" integer ")"]])
  formatting-pseudo-element    := "::first-line" / ":first-line" /
                                  "::first-letter" / ":first-letter" /
                                  "::marker" /
                                  "::line-marker" /
                                  "::selection"
  combinator                   := 1*S / *S (">" / "+" / "~") *S
  S                            := <SPACE> /
                                  <HORIZONTAL TABULATOR> /
                                  <LINE FEED> /
                                  <CARRIAGE RETURN> /
                                  <FORM FEED>
*/

/**
   Parses a media query and returns it as a |MQQuery| object.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._ParseMediaQuery =
function () {
  
};

/**
   Skips any tokens enclosed by a pair of braces.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._SkipAnyEnclosed = function () {
  var pair = [];
  var token = this._PopToken (false);
  T: while (token) {
    if (token.type == "{" || token.type == "[" ||
        token.type == "(" || token.type == "FUNCTION") {
      pair.push (token.type == "{" ? "}" :
                 token.type == "[" ? "]" :
                                     ")");
    } else if (token.type == "}" || token.type == "]" ||
               token.type == ")") {
      var l = pair.pop ();
      if (l == token.type) {
        if (pair.length == 0) {
          break T;
        }
      } else {
        pair.push (l);
        /* WARNING: Unmatched! */
      }
    }
    token = this._PopToken (false);
  } /* T */
  if (pair.length > 0) {
    /* WARNING: Unmatched! */
  }
  /* Skips |S| if any */
  token = this._PopToken (false);
  if (token != null) this._TokenStack.push (token);
};

/**
   Pops the next token, if any, or returns |null|.
   
   @param Ssignificant If |false|, any |S| token is ignored.  Otherwise,
                       an |S| token is returned as well as other kind of
                       tokens.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._PopToken = function (Ssignificant) {
  var nextToken = this._TokenStack.pop ();
  while (!Ssignificant && nextToken != null && nextToken.type == "S") {
    nextToken = this._TokenStack.pop ();
  }
  if (nextToken) {
    return nextToken;
  }
  var r = "";
  X: while (true) {
    var ch = this._PopChar ();
    if (ch.length == 0) {
      break X;
    } else if (ch.match (/^[_a-zA-Z]/) || ch.charCodeAt (0) > 0x007F ||
               ch == "\\") {
      var ident = ch == "\\" ? this._GetUnescapedChar (false) : ch;
      if (ident.length != 0) {
        var ch2;
        I: while (true) {
          ch2 = this._PopChar ();
          if (ch2.match (/^[_a-zA-Z0-9-]/) || ch2.charCodeAt (0) > 0x007F) {
            ident += ch2;
          } else if (ch2 == "\\") {
            ch2 = this._GetUnescapedChar (false);
            if (ch2.length != 0) {
              ident += ch2;
            } else {
              ch2 = "\\";
              break I;
            }
          } else {
            break I;
          }
        } /* I */
        
        if (ch2 == "(") {
          if (ident.toLowerCase () != "url") {
            return {type: "FUNCTION", value: ident};
          } else {
            var chars = [ch2];
            var ch3 = this._PopChar ();
            IUS: while (true) {
              if (ch3 == "\u0020" || ch3 == "\u0009" || ch3 == "\u000D" ||
                  ch3 == "\u000A" || ch3 == "\u000C") {
                chars.push (ch3);
                ch3 = this._PopChar ();
              } else {
                break IUS;
              }
            } /* IUS */
            var uri = "";
            if (ch3 == '"' || ch3 == "'") { /* string */
              IUQ: while (true) {
                var ch4 = this._PopChar ();
                if (ch4 != "\u000D" && ch4 != "\u000A" && ch4 != "\u000C" &&
                    ch4 != "\\" && ch4 != ch) {
                  uri += ch4;
                } else if (ch4 == ch) {
                  break IUQ;
                } else if (ch4 == "\\") {
                  var unescaped = this._GetUnescapedChar (true);
                  if (unescaped.length > 0) {
                    uri += unescaped;
                  } else {
                    this._CharStack.push (ch4);
                    this._TokenStack.push ({type: "INVALID", value: uri});
                    chars.unshift (); /* |(| */
                    var ss = "";
                    for (var i = 0; i < chars.length; i++) {
                      ss += chars[i];
                    }
                    this._TokenStack.push ({type: "S", value: ss});
                    this._TokenStack.push ({type: "("});
                    return {type: "IDENT", value: ident};
                  }
                } else {
                  if (ch2.length > 0) this._CharStack.push (ch2);
                  this._TokenStack.push ({type: "INVALID", value: uri});
                  chars.unshift (); /* |(| */
                  var ss = "";
                  for (var i = 0; i < chars.length; i++) {
                    ss += chars[i];
                  }
                  this._TokenStack.push ({type: "S", value: ss});
                  this._TokenStack.push ({type: "("});
                  return {type: "IDENT", value: ident};
                }
              } /* IUQ */
            } else if (ch3.match (/^[!#$%&*-~]/) || ch3.charCodeAt (0) > 0x007F) {
              IU: while (true) {
                chars.push (ch3);
                if (ch3 != "\\") {
                  uri += ch3;
                } else {
                  var unescaped = this._GetUnescapedChar (false);
                  if (unescaped.length > 0) {
                    uri += ch3;
                  } else {
                    for (var i = 0; i < chars.length - 1; i++) {
                      this._CharStack.push (chars[i]);
                    }
                    return {type: "IDENT", value: ident};
                  }
                }
                ch3 = this._PopChar ();
                if (ch3.match (/^[!#$%&*-~]/) || ch3.charCodeAt (0) > 0x007F) {
                  //
                } else if (ch3 == ")" ||
                           ch3 == "\u0020" || ch3 == "\u0009" || ch3 == "\u000D" ||
                           ch3 == "\u000A" || ch3 == "\u000C") {
                  chars.push (ch3);
                  break IU;
                } else {
                  for (var i = 0; i < chars.length - 1; i++) {
                    this._CharStack.push (chars[i]);
                  }
                  if (ch3.length > 0) this._CharStack.push (ch3);
                  return {type: "IDENT", value: ident};
                }
              } /* IU */
            } else {
              for (var i = 0; i < chars.length - 1; i++) {
                this._CharStack.push (chars[i]);
              }
              return {type: "IDENT", value: ident};
            }
            if (ch3 != ")") {
              ch3 = this._PopChar ();
              IUR: while (true) {
                if (ch3 == ")") {
                  break IUR;
                } else if (ch3 == "\u0020" || ch3 == "\u0009" || ch3 == "\u000D" ||
                           ch3 == "\u000A" || ch3 == "\u000C") {
                  chars.push (ch3);
                  ch3 = this._PopChar ();
                } else {
                  if (ch3.length > 0) this._CharStack.push (ch3);
                  for (var i = 0; i < chars.length - 1; i++) {
                    this._CharStack.push (chars[i]);
                  }
                  return {type: "IDENT", value: ident};
                }
              } /* IUR */
            }
            return {type: "URI", value: uri};
          } /* url */
        } else if ((ident == "U" || ident == "u") && ch2 == "+") {
          var ch3 = this._PopChar ();
          if (ch3.match (/^[0-9A-Fa-f?]/)) {
            var cp = ch3;
            ch3 = this._PopChar ();
            IR: for (var i = 1; i < 6; i++) {
              if (ch3.match (/^[0-9A-Fa-f?]/)) {
                cp += ch3;
                ch3 = this._PopChar ();
              } else {
                break IR;
              }
            } /* IR */
            var cp2 = "";
            if (ch3 == "-") {
              var ch4 = this._PopChar ();
              if (ch4.match (/^[0-9A-Fa-f]/)) {
                cp2 = ch4;
                IR2: for (var i = 1; i < 6; i++) {
                  ch4 = this._PopChar ();
                  if (ch4.match (/^[0-9A-Fa-f]/)) {
                    cp2 += ch4;
                  } else {
                    if (ch4.length > 0) this._CharStack.push (ch4);
                    break IR2;
                  }
                } /* IR2 */
              } else {
                if (ch4.length > 0) this._CharStack.push (ch4);
              }
            } else if (ch3.length > 0) {
              this._CharStack.push (ch3);
            }
            return {type: "UNICODE-RANGE", value: cp, value2: cp2};
          } else {
            if (ch3.length > 0) this._CharStack.push (ch3);
            this._CharStack.push (ch2);
            return {type: "IDENT", value: ident};
          }
        } else {
          if (ch2.length > 0) this._CharStack.push (ch2);
          return {type: "IDENT", value: ident};
        }
      } else { /* |REVERSE SOLIDUS| which does not introduce an |escape| */
        return {type: "DELIM", value: ch};
      }
    } else if (ch.match (/^[0-9.]/)) {
      var num = ch != "." ? ch : "0";
      var ch2 = ch != "." ? this._PopChar () : ch;
      if (ch != ".") {
        N: while (true) {
          if (ch2.match (/^[0-9]/)) {
            num += ch2;
            ch2 = this._PopChar ();
          } else {
            break N;
          }
        } /* N */
      }
      
      var isFloat = false;
      if (ch2 == ".") {
        isFloat = true;
        ch2 = this._PopChar ();
        if (ch2.match (/^[0-9]/)) {
          num += "." + ch2;
          ch2 = this._PopChar ();
          N: while (true) {
            if (ch2.match (/^[0-9]/)) {
              num += ch2;
              ch2 = this._PopChar ();
            } else {
              break N;
            }
          } /* N */
        } else if (ch == ".") {
          if (ch2.length > 0) this._CharStack.push (ch2);
          return {type: "DELIM", value: ch};
        } else {
          this._CharStack.push (ch2);
          ch2 = ".";
        }
      }
      num = parseFloat (num, 10);
      
      var ihyphen = false;
      if (ch2 == "-") {
        ihyphen = true;
        ch2 = this._PopChar ();
      }
      if (ch2.match (/^[_a-zA-Z\\]/) || ch2.charCodeAt (0) > 0x007F) {
        var ident = ch2 == "\\" ? this._GetUnescapedChar (false) : ch2;
        if (ident.length != 0) {
          I: while (true) {
            ch2 = this._PopChar ();
            if (ch2.match (/^[_a-zA-Z0-9-]/) || ch2.charCodeAt (0) > 0x007F) {
              ident += ch2;
            } else if (ch2 == "\\") {
              ch2 = this._GetUnescapedChar (false);
              if (ch2.length != 0) {
                ident += ch2;
              } else {
                this._TokenStack.push ({type: "DELIM", value: "\\"});
                break I;
              }
            } else {
              if (ch2.length > 0) this._CharStack.push (ch2);
              break I;
            }
          } /* I */
          return {type: "DIMENSION", value: num,
                  value2: ihyphen ? "-" + ident : ident};
        } else {
          this._CharStack.push (ch2);
          if (ihyphen) this._CharStack.push ("-");
          return {type: "NUMBER", value: num, isFloat: isFloat};
        }
      } else if (!ihyphen && ch2 == "%") {
        return {type: "PERCENTAGE", value: num};
      } else {
        if (ch2.length > 0) this._CharStack.push (ch2);
        if (ihyphen) this._CharStack.push ("-");
        return {type: "NUMBER", value: num};
      }
    } else if (ch == ";" || ch == "{" || ch == "}" || ch == "(" || ch == ")" ||
               ch == "[" || ch == "]") {
      return {type: ch};
    } else if (ch == "\u0020" || ch == "\u0009" || ch == "\u000A" ||
               ch == "\u000D" || ch == "\u000C") { /* S */
      S: while (true) {
        var ch = this._PopChar ();
        if (ch == "\u0020" || ch == "\u0009" || ch == "\u000A" ||
            ch == "\u000D" || ch == "\u000C") {
          //
        } else {
          if (ch.length > 0) this._CharStack.push (ch);
          break S;
        }
      }
      if (Ssignificant) {
        return {type: "S"};
      } else {
        continue X;
      }
    } else if (ch == "-") {
      var ch2 = this._PopChar ();
      if (ch2.match (/^[_a-zA-Z\\]/) || ch2.charCodeAt (0) > 0x007F) {
        var ident = ch2 == "\\" ? this._GetUnescapedChar (false) : ch2;
        if (ident.length != 0) {
          I: while (true) {
            ch2 = this._PopChar ();
            if (ch2.match (/^[_a-zA-Z0-9-]/) || ch2.charCodeAt (0) > 0x007F) {
              ident += ch2;
            } else if (ch2 == "\\") {
              ch2 = this._GetUnescapedChar (false);
              if (ch2.length != 0) {
                ident += ch2;
              } else {
                ch2 = "\\";
                break I;
              }
            } else {
              break I;
            }
          } /* I */
          
          if (ch2 == "(") {
            return {type: "FUNCTION", value: "-" + ident};
          } else {
            if (ch2.length > 0) this._CharStack.push (ch2);
            return {type: "IDENT", value: "-" + ident};
          }
        } else {
          this._TokenStack.push ({type: "DELIM", value: "\\"});
          return {type: "DELIM", value: "-"};
        }
      } else if (ch2 == "-") {
        var ch3 = this._PopChar ();
        if (ch3 == ">") { /* CDC */
          return {type: "CDC"};
        } else {
          this._CharStack.push (ch3);
          this._CharStack.push (ch2);
          return {type: "DELIM", value: ch};
        }
      } else {
        if (ch2.length > 0) this._CharStack.push (ch2);
        return {type: "DELIM", value: ch};
      }
    } else if (ch == "@" || ch == "#") { /* ATKEYWORD || HASH */
      var ch2 = this._PopChar ();
      var ihyphen = false;
      if (ch == "@" && ch2 == "-") {
        ihyphen = true;
        ch2 = this._PopChar ();
      }
      if (ch2.match (/^[_a-zA-Z\\]/) || ch2.charCodeAt (0) > 0x007F) {
        var ident = ch2 == "\\" ? this._GetUnescapedChar (false) : ch2;
        if (ident.length != 0) {
          I: while (true) {
            ch2 = this._PopChar ();
            if (ch2.match (/^[_a-zA-Z0-9-]/) || ch2.charCodeAt (0) > 0x007F) {
              ident += ch2;
            } else if (ch2 == "\\") {
              ch2 = this._GetUnescapedChar (false);
              if (ch2.length != 0) {
                ident += ch2;
              } else {
                this._CharStack.push ("\\");
                break I;
              }
            } else {
              if (ch2.length > 0) this._CharStack.push (ch2);
              break I;
            }
          } /* I */
          
          return {type: ch == "@" ? "ATKEYWORD" : "HASH",
                  value: (ihyphen ? "-" : "") + ident};
        } else {
          this._CharStack.push ("\\");
          if (ihyphen) this._CharStack.push ("-");
          return {type: "DELIM", value: ch};
        }
      } else {
        if (ch2.length > 0) this._CharStack.push (ch2);
        return {type: "DELIM", value: ch};
      }
    } else if (ch == '"' || ch == "'") { /* STRING || INVALID */
      var text = "";
      Q: while (true) {
        var ch2 = this._PopChar ();
        if (ch2 != "\u000D" && ch2 != "\u000A" && ch2 != "\u000C" &&
            ch2 != "\\" && ch2 != ch) {
          text += ch2;
        } else if (ch2 == ch) {
          return {type: "STRING", value: text};
          break Q;
        } else if (ch2 == "\\") {
          var unescaped = this._GetUnescapedChar (true);
          if (unescaped.length > 0) {
            text += unescaped;
          } else {
            this._CharStack.push (ch2);
            return {type: "INVALID", value: text};
          }
        } else if (ch2.length == 0) {
          /* Note that an |INVALID| at the end of the entity is
             treated as if it is a |STRING| by the error handling rule. */
          return {type: "STRING", value: text};
        } else {
          this._CharStack.push (ch2);
          return {type: "INVALID", value: text};
        }
      } /* Q */
    } else if (ch == "/") {
      var ch2 = this._PopChar ();
      if (ch2 == "*") { /* COMMENT */
        ch2 = this._PopChar ();
        C: while (ch2.length > 0) {
          if (ch2 == "*") {
            ch2 = this._PopChar ();
            if (ch2 == "/") {
              break C;
            }
          } else {
            ch2 = this._PopChar ();
          }
        } /* C */
      } else {
        if (ch2.length > 0) this._CharStack.push (ch2);
        return {type: "DELIM", value: ch};
      }
    } else if (ch == "~" || ch == "|" || ch == "^" || ch == "$" || ch == "*") {
      var ch2 = this._PopChar ();        /* [CSS3] */
      if (ch2 == "=") { /* INCLUDES || DASHMATCH || ... */
        return {type: ch == "~" ? "INCLUDES" :
                      ch == "|" ? "DASHMATCH" :
                      ch == "^" ? "PREFIXMATCH" :
                      ch == "$" ? "SUFFIXMATCH" :
                                  "SUBSTRINGMATCH"};
      } else {
        if (ch2.length > 0) this._CharStack.push (ch2);
        return {type: "DELIM", value: ch};
      }
    } else if (ch == "<") {
      var ch2 = this._PopChar ();
      if (ch2 == "!") {
        var ch3 = this._PopChar ();
        if (ch3 == "-") {
          var ch4 = this._PopChar ();
          if (ch4 == "-") { /* CDO */
            return {type: "CDO"};
          } else {
            if (ch4.length > 0) this._CharStack.push (ch4);
            this._CharStack.push (ch3);
            this._CharStack.push (ch2);
            return {type: "DELIM", value: ch};
          }
        } else {
          if (ch3.length > 0) this._CharStack.push (ch3);
          this._CharStack.push (ch2);
          return {type: "DELIM", value: ch};
        }
      } else {
        if (ch2.length > 0) this._CharStack.push (ch2);
        return {type: "DELIM", value: "ch"};
      }
    } else if (ch.length > 0) {
      return {type: "DELIM", value: ch};
    } else {
      break X;
    }
  } /* X */
  return null;
};

/**
   Unescapes the next escaped sequence.  If the next characters
   are not a sequence expected after the |\| that introduces an escape
   sequence, then an empty string is returned.
   
   @param allowNL If |true|, a line break sequence is accepted as
                  an escaped sequence.  Otherwise, such sequence will
                  result in returning an empty string.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._GetUnescapedChar =
function (allowNL) {
  /* Introducing |REVERSE SOLIDUS| character is already read */
  var ch3 = this._PopChar ();
  if (ch3.match (/^[0-9A-Fa-f]/)) {
    var cp = ch3;
    QF: for (var i = 1; i < 6; i++) {
      var ch4 = this._PopChar ();
      if (ch4.match (/^[0-9A-Fa-f]/)) {
        cp += ch4;
      } else {
        this._CharStack.push (ch4);
        break QF;
      }
    }
    
    /* Following white space */
    var ch4 = this._PopChar ();
    if (ch4 == "\u0020" || ch4 == "\u000A" ||
        ch4 == "\u000C" || ch4 == "\u0009") {
      //
    } else if (ch4 == "\u000D") {
      ch4 = this._PopChar ();
      if (ch4 == "\u000A") {
        //
      } else if (ch4.length > 0) {
        this._CharStack.push (ch4);
      }
    } else if (ch4.length > 0) {
      this._CharStack.push (ch4);
    }
    
    var code = parseInt (cp, 16);
    if (code < 0x10000) {
      return String.fromCharCode (code);
    } else {
      code -= 0x10000;
      return String.fromCharCode (0xD800 | ((code >> 10) % 0x10000),
                                  0xDC00 | (code % 0x10000));
    }
  } else if (ch3 == "\u000D" || ch3 == "\u000A" || ch3 == "\u000C") {
    if (allowNL) {
      if (ch3 == "\u000D") {
        var ch4 = this._PopChar ();
        if (ch4 == "\u000A") {
          return ch3 + ch4;
        } else if (ch4.length > 0) {
          this._CharStack.push (ch4);
        }
      } else {
        return ch3;
      }
    } else {
      this._CharStack.push (ch3);
      return "";
    }
  } else if (ch3.length > 0) {
    return ch3;
  } else { /* Invalid */
    return "";
  }
};

/**
   Pops the next character.
*/
cx.fam.suika.y2005.CSS.SimpleParser.prototype._PopChar = function () {
  var nextChar = this._CharStack.pop ();
  if (nextChar) {
    return nextChar;
  }
  var ch = this._String.charAt (this._CurrentCharPos);
  if (ch.length > 0) {
    this._CurrentCharPos++;
    var cc = ch.charCodeAt (0);
    if (0xD800 <= cc && cc <= 0xDBFF) {
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

/* Revision: $Date: 2005/11/09 09:55:19 $ */

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
