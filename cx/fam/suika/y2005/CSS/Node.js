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
if (typeof (cx.fam.suika.y2005.CSS.Node) == "undefined") {
  cx.fam.suika.y2005.CSS.Node = {};
}

JSAN.require ("cx.fam.suika.y2005.Class.Inherit");
JSAN.require ("cx.fam.suika.y2005.DOM.Implementation");
//JSAN.require ("cx.fam.suika.y2005.CSS.Selectors");
//JSAN.require ("cx.fam.suika.y2005.CSS.MediaQuery");

/**
   Interface |DOMImplementationCSS|
   
   The |DOMImplementationCSS| interface from DOM Level 2 CSS module
   provides the |createCSSStyleSheet| method that creates a CSS style sheet
   object.
   
   Interface |CSSImplementation|
   
   The |CSSImplementation| interface provides a set of factory method
   that creates CSS constructions.
*/
cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._AddFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/CSS/Node#", "1.0", {
    /**
       Creates a CSS style sheet object.
       [DOM Level 2 CSS]
    */
    createCSSStyleSheet: function (title, media) {
      var ss = new cx.fam.suika.y2005.CSS.Node.StyleSheet ();
      if (title != null) ss._SetTitle (title);
      //if (media != null) /* not implemented */
      return ss;
    },
    /**
       Creates a CSS |@import| rule object.
       
         Note.  Creating a |@import| object does not mean to load the referenced
                style sheet.
                @@ISSUE: Inserting the rule into a style sheet should make
                         the referenced style sheet loaded?
       
       [non-standard]
       
       @param href  The DOM URI of the referenced style sheet.
       @param media The media query associated to the rule.
                    If |null| is specified, then an empty media list
                    (which is equivalent to |all| by definition) is set.
       @return The newly created |@import| rule.
    */
    createCSSImportRule: function (href, media) {
      return new cx.fam.suika.y2005.CSS.Node.ImportRule (href, media);
    },
    /**
       Creates a CSS |@charset| rule object.
       [non-standard]
    */
    createCSSCharsetRule: function (charset) {
      return new cx.fam.suika.y2005.CSS.Node.CharsetRule (charset);
    },
    
    /**
       Creates a CSS |@namespace| rule object.
       
       [non-standard]
       
       @param prefix The namespace prefix, or |null| if it defines the
                     default namespace URI.
       @param namespaceURI The namespace URI.
       @return The newly created |@namespace| rule.
    */
    createCSSNamespaceRule: function (prefix, namespaceURI) {
      return new cx.fam.suika.y2005.CSS.Node.NamespaceRule (prefix, namespaceURI);
    },
    /**
       Creates a CSS rule set object.
       [non-standard]
    */
    createCSSRuleSet: function (selector) {
      var rs = new cx.fam.suika.y2005.CSS.Node.RuleSet ();
      if (selector != null) rs.SetSelector (rs);
      return rs;
    },
    /**
       Creates a CSS property declaration object.
       [non-standard]
    */
    createCSSPropertyNS: function (namespaceURI, localName) {
      return new cx.fam.suika.y2005.CSS.Node.PropertyDeclaration (namespaceURI, lname);
    }
  });

/**
   Constructs a new instance of |CSSNode| - for internal use.
*/
cx.fam.suika.y2005.CSS.Node.Node = function () {
};

cx.fam.suika.y2005.CSS.Node.Node.prototype.getCSSNodeType = function () {
  return this.CSS_UNKNOWN_NODE;
};
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_UNKNOWN_RULE_NODE         =   0;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_RULE_SET_NODE             =   1;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_AT_CHARSET_NODE           =   2;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_AT_IMPORT_NODE            =   3;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_AT_MEDIA_NODE             =   4;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_AT_FONT_FACE_NODE         =   5;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_AT_PAGE_NODE              =   6;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_UNKNOWN_NODE              = 100;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_STYLE_SHEET_NODE          = 101;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_DECLARATION_BLOCK_NODE    = 102;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_EMPTY_DECLARATION_NODE    = 103;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_PROPERTY_DECLARATION_NODE = 104;
cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_AT_NAMESPACE_NODE         = 106;

/**
   The textual representation of the node.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.Node.prototype.getCSSText = function () {
  return null;
};
cx.fam.suika.y2005.CSS.Node.Node.prototype.setCSSText = function (newValue) {};

/**
   Returns the namespace URI associated to a namespace prefix,
   if any, or |null|.
   [non-standard]
   
   @param prefix The namespace prefix to lookup.  If |null|, default
                 namespace URI, if any, is returned.  Note that in CSS
                 identifiers including prefixes are case-insensitive.
   @return The namespace URI associated with |prefix|, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Node.Node.prototype.lookupNamespaceURI =
function (prefix) {
  if (this.parentRule) {
    return this.parentRule.lookupNamespaceURI (prefix);
  } else {
    return null;
  }
};

cx.fam.suika.y2005.CSS.Node.Node.prototype.toString = function () {
  return "[object CSSNode]";
};


/**
   Interface |CSSStyleSheet|
   
   A |CSSStyleSheet| object represents a CSS style sheet.
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet = function () {
  cx.fam.suika.y2005.CSS.Node.StyleSheet._superclass.apply (this, arguments);
  this.cssRules = new cx.fam.suika.y2005.CSS.RuleList ();
};
cx.fam.suika.y2005.CSS.Node.StyleSheet.inherits (cx.fam.suika.y2005.CSS.Node.Node);
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Node.prototype.CSS_STYLE_SHEET_NODE;
};

/**
   Appends a |CSSRule| to the list.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.appendCSSRule = function (newRule) {
  /* There should be |HIERARCHY_REQUEST_ERR|. */
  newRule._SetParentRule (this);
  return this.cssRules.push (newRule);
};

/**
   The list of rules, i.e. rule sets and at-rules.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getCSSRules = function () {
  return this.cssRules;
};

/**
   The textual representation of the style sheet.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getCSSText = function () {
  var r = "";
  var lastType = this.CSS_UNKNOWN_RULE_NODE;
  for (var i = 0; i < this.cssRules.length; i++) {
    var rule = this.cssRules[i];
    if (lastType == this.CSS_RULE_SET_NODE &&
        rule.getCSSNodeType () == this.CSS_RULE_SET_NODE) {
      r += "\n";
    }
    lastType = rule.getCSSNodeType ();
    r += rule.getCSSText ();
  }
  /* TODO: Namespace fixup */
  return r;
};

/**
   Whether the style sheet is applied to the document or not.
   [DOM Level 2 Style Sheets]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getDisabled = function () {
  return this.disabled;
};
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.setDisabled = function (newValue) {
  this.disabled = newValue;
};

/**
   The URI of the style sheet document, if available, or |null|.
   [DOM Level 2 Style Sheets]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getHref = function () {
  return this.href;
};
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype._SetHref = function (newValue) {
  this.href = newValue;
};

/* Not implemented: |media|, |ownerNode| from DOM Level 2 Style Sheets,
                    |setCSSText| */

/**
   Returns the namespace URI associated to a namespace prefix,
   if any, or |null|.
   [non-standard]
   
   @param prefix The namespace prefix to lookup.  If |null|, default
                 namespace URI, if any, is returned.  Note that in CSS
                 identifiers including prefixes are case-insensitive.
   @return The namespace URI associated with |prefix|, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.lookupNamespaceURI =
function (prefix) {
  prefix = prefix.toLowerCase ();
  var uri = null;
  for (var i = 0; i < this.cssRules.length; i++) {
    var rule = this.cssRules[i];
    var ruleType = rule.getType ();
    if (ruleType == this.NAMESPACE_RULE) {
      if (rule.getPrefix () == prefix) {
        uri = rule.getNamespaceURI ();
      }
      /* Don't |break|, since last occurence is in effect if there is 
         more than one declarations. */
    } else if (ruleType != this.CHARSET_RULE &&
               ruleType != this.IMPORT_RULE) {
      break;
    }
  }
  return uri;
};

/**
   The rule that references the style sheet, if any, or |null| otherwise.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getOwnerRule = function () {
  return this.ownerRule;
};
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype._SetOwnerRule = function (newValue) {
  this.ownerRule = newValue;
};

/**
   The parent style sheet, if any, or |null|.
   [DOM Level 2 Style Sheets]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getParentStyleSheet = function () {
  return this.parentStyleSheet;
};
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype._SetParentStyleSheet =
function (newValue) {
  this.parentStyleSheet = newValue;
};

/**
   The title of the style sheet, if any, or |null|.
   [DOM Level 2 Style Sheets]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getTitle = function () {
  return this.title;
};
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype._SetTitle =
function (newValue) {
  this.title = newValue;
};

/**
   The Internet media type of the style sheet.
   [DOM Level 2 Style Sheets]
*/
cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.getTitle = function () {
  return "text/css";
};

cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.toString = function () {
  return "[object CSSStyleSheet]";
};

/* Not implemented: |insertRule|, |deleteRule| from DOM Level 2 CSS */


/*
   Interface |CSSRule|
   
   A |CSSRule| represents a rule set or at-rule (i.e. a |statement|
   in CSS source document).
*/
cx.fam.suika.y2005.CSS.Node.Rule = function () {
  cx.fam.suika.y2005.CSS.Node.Rule._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.CSS.Node.Rule.inherits (cx.fam.suika.y2005.CSS.Node.Node);

/**
   Appends a |CSSRule| to the list.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.appendCSSRule
  = cx.fam.suika.y2005.CSS.Node.StyleSheet.prototype.appendCSSRule;

/**
   The textual representation of the rule.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getCSSText =
function () {
  return "@" + this.getRuleName () + ";\n";
};
/* Not implemented: |setCSSText| from DOM Level 2 CSS */

/*
  The rule that contains this rule, if any, or |null| otherwise.
  [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getParentRule = function () {
  return this.parentRule;
};
cx.fam.suika.y2005.CSS.Node.Rule.prototype._SetParentRule = function (newValue) {
  this.parentRule = newValue;
};

/*
  The style sheet that contains the rule.
  [DOM Level 2 CSS]
  
  It might be |null| if the rule is not part of any style sheet
  in this implementation.
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getParentRule = function () {
  return this.parentRule;
};
cx.fam.suika.y2005.CSS.Node.Rule.prototype._SetParentRule = function (newValue) {
  this.parentRule = newValue;
};

/**
   The local name of the rule.  If the rule is not an at-rule, |null|.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getRuleLocalName = function () {
  return this.ruleLocalName;
};

/**
   The qualified name of the rule.  If the rule is not an at-rule, |null|.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getRuleName = function () {
  if (this.ruleNamespaceURI == "urn:x-suika-fam-cx:css:") {
    return this.ruleLocalName;
  } else {
    return "-" + this.rulePrefix + "-" + this.ruleLocalName;
  }
};

/**
   The namespace URI of the rule.  If the rule is not an at-rule, |null|.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getRuleNamespaceURI = function () {
  return this.ruleNamespaceURI;
};

/**
   The namespace prefix of the rule.  If the rule is not an at-rule
   or the rule has no namespace prefix, |null|.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getRulePrefix = function () {
  return this.rulePrefix;
};
cx.fam.suika.y2005.CSS.Node.Rule.prototype.setRulePrefix = function (newValue) {
  this.rulePrefix = newValue;
};

/**
  The type of the rule.
  [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.getType = function () {
  return this.UNKNOWN_RULE;
};
cx.fam.suika.y2005.CSS.Node.Rule.prototype.UNKNOWN_RULE   = 0;
cx.fam.suika.y2005.CSS.Node.Rule.prototype.STYLE_RULE     = 1;
cx.fam.suika.y2005.CSS.Node.Rule.prototype.CHARSET_RULE   = 2;
cx.fam.suika.y2005.CSS.Node.Rule.prototype.IMPORT_RULE    = 3;
cx.fam.suika.y2005.CSS.Node.Rule.prototype.MEDIA_RULE     = 4;
cx.fam.suika.y2005.CSS.Node.Rule.prototype.FONT_FACE_RULE = 5;
cx.fam.suika.y2005.CSS.Node.Rule.prototype.PAGE_RULE      = 6;

/**
   |@namespace| rule.
   [non-standard]
   
     Note.  The |type| value of |@namespace| rules is |0|,
            i.e. |UNKNOWN_RULE|, in Gecko.
*/
cx.fam.suika.y2005.CSS.Node.Rule.prototype.NAMESPACE_RULE = 1001;

/**
   Interface |CSSAtRule|
*/
cx.fam.suika.y2005.CSS.Node.AtRule = function (namespaceURI, localName) {
  cx.fam.suika.y2005.CSS.Node.AtRule._superclass.apply (this, []);
  this.ruleNamespaceURI = namespaceURI;
  this.ruleLocalName = localName.toLowerCase ();
};
cx.fam.suika.y2005.CSS.Node.AtRule.inherits (cx.fam.suika.y2005.CSS.Node.Rule);

cx.fam.suika.y2005.CSS.Node.AtRule.prototype.toString = function () {
  return "[object CSSAtRule]";
};

/**
   Interface |CSSMediaRule|
*/
cx.fam.suika.y2005.CSS.Node.MediaRule = function (mq) {
  cx.fam.suika.y2005.CSS.Node.MediaRule._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", "media"]);
  this.cssRules = new cx.fam.suika.y2005.CSS.RuleList ();
  this.style = new cx.fam.suika.y2005.CSS.Node.StyleDeclaration ();
  if (mq != null) {
    this.media = mq;
  } else {
    /* TODO: set empty media query */
  }
};
cx.fam.suika.y2005.CSS.Node.MediaRule.inherits (cx.fam.suika.y2005.CSS.Node.AtRule);
cx.fam.suika.y2005.CSS.Node.MediaRule.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_AT_MEDIA_NODE;
};
cx.fam.suika.y2005.CSS.Node.MediaRule.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.MEDIA_RULE;
};

/**
   The list of rules within the |@media| block.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.MediaRule.prototype.getCSSRules = function () {
  return this.cssRules;
};


/**
   The textual representation of the rule.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.MediaRule.prototype.getCSSText =
function () {
  var r = "@media";
  var mq = this.media.getMediaText ();
  if (mq.length > 0) {
    r += " " + mq;
  }
  r += " {\n\n";
  for (var i = 0; i < this.cssRules.length; i++) {
    r += this.cssRules[i].getCSSText () + "\n";
  }
  r += "}\n";
  return r;
};
/* Not implemented: |setCSSText| */

/**
   The media query.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.MediaRule.prototype.getMedia = function () {
  return this.media;
};

/* Not implemented: |insertRule|, |deleteRule| from DOM Level 2 CSS */

cx.fam.suika.y2005.CSS.Node.MediaRule.prototype.toString = function () {
  return "[object CSSMediaRule]";
};


/**
   Interface |CSSFontFaceRule|
*/
cx.fam.suika.y2005.CSS.Node.FontFaceRule = function () {
  cx.fam.suika.y2005.CSS.Node.FontFaceRule._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", "font-face"]);
  this.style = new cx.fam.suika.y2005.CSS.Node.StyleDeclaration ();
};
cx.fam.suika.y2005.CSS.Node.FontFaceRule.inherits (cx.fam.suika.y2005.CSS.Node.AtRule);
cx.fam.suika.y2005.CSS.Node.FontFaceRule.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_AT_FONT_FACE_NODE;
};
cx.fam.suika.y2005.CSS.Node.FontFaceRule.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.FONT_FACE_RULE;
};

/**
   The textual representation of the rule.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.FontFaceRule.prototype.getCSSText =
function () {
  return "@font-face {\n\n"
       + this.style.getCSSText ()
       + "\n}\n";
};
/* Not implemented: |setCSSText| */

/**
   The declaration block of the |@font-face| rule.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.FontFaceRule.prototype.getStyle = function () {
  return this.style;
};

cx.fam.suika.y2005.CSS.Node.FontFaceRule.prototype.toString = function () {
  return "[object CSSFontFaceRule]";
};



/**
   Interface |CSSPageRule|
*/
cx.fam.suika.y2005.CSS.Node.PageRule = function () {
  cx.fam.suika.y2005.CSS.Node.PageRule._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", "page"]);
};
cx.fam.suika.y2005.CSS.Node.PageRule.inherits (cx.fam.suika.y2005.CSS.Node.AtRule);
cx.fam.suika.y2005.CSS.Node.PageRule.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_AT_PAGE_NODE;
};
cx.fam.suika.y2005.CSS.Node.PageRule.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.PAGE_RULE;
};

/**
   The textual representation of the rule.
   [DOM Level 2 CSS]
   
   Note that namespace fixup is not done.
*/
cx.fam.suika.y2005.CSS.Node.PageRule.prototype.getCSSText =
function () {
  var r = "@page";
  var sel = this.getSelectorText ();
  if (sel.length > 0) {
    r += " " + sel;
  }
  r += " {\n\n"
     + this.style.getCSSText ()
     + "\n}\n";
  return r;
};
/* Not implemented: |setCSSText| */

/**
   The selector object of the |@page| rule.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.PageRule.prototype.getSelector = function () {
  return this.selector;
};
cx.fam.suika.y2005.CSS.Node.PageRule.prototype.setSelector = function (newValue) {
  this.selector = newValue;
};

/**
   The textual representation of selector of the |@page| rule.
   [DOM Level 2 CSS]
   
   Note that namespace fixup is not done.
*/
cx.fam.suika.y2005.CSS.Node.PageRule.prototype.getSelectorText = function () {
  return this.selector.getCSSText ();
};
/* Not implemented: |setSelectorText| from DOM Level 2 CSS */

/**
   The declaration block of the |@page| rule.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.PageRule.prototype.getStyle = function () {
  return this.style;
};

cx.fam.suika.y2005.CSS.Node.PageRule.prototype.toString = function () {
  return "[object CSSPageRule]";
};


/**
   Interface |CSSImportRule|
*/
cx.fam.suika.y2005.CSS.Node.ImportRule = function (hrefArg, mediaArg) {
  cx.fam.suika.y2005.CSS.Node.ImportRule._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", "import"]);
  this.href = hrefArg;
  if (mediaArg) {
    this.media = mediaArg;
  } else {
    /* TODO: set empty media query */
  }
};
cx.fam.suika.y2005.CSS.Node.ImportRule.inherits (cx.fam.suika.y2005.CSS.Node.AtRule);
cx.fam.suika.y2005.CSS.Node.ImportRule.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_AT_IMPORT_NODE;
};
cx.fam.suika.y2005.CSS.Node.ImportRule.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.IMPORT_RULE;
};

/**
   The textual representation of the rule.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.ImportRule.prototype.getCSSText =
function () {
  var r = '@import "';
        + this.href.replace (/([\u000A\u000C\u000D"\\])/,
                             function () { return "\\" + RegExp.$1 })
        + '"';
  var mq = this.media.getMediaText ();
  if (mq.length > 0) {
    r += " " + mq;
  }
  r += ";\n";
  return r;
};
/* Not implemented: |setCSSText| */

/**
   The DOM URI of the style sheet to be imported.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.ImportRule.prototype.getHref = function () {
  return this.href;
};

/**
   The media query of the rule.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.ImportRule.prototype.getMedia = function () {
  return this.media;
};

/**
   The style sheet referred to by the rule, if it has been loaded,
   or |null| otherwise.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.ImportRule.prototype.getStyleSheet = function () {
  return this.styleSheet;
};
cx.fam.suika.y2005.CSS.Node.ImportRule.prototype._SetStyleSheet = function (newValue) {
  this.styleSheet = newValue;
};

cx.fam.suika.y2005.CSS.Node.ImportRule.prototype.toString = function () {
  return "[object CSSImportRule]";
};


/**
   Interface |CSSCharsetRule|
*/
cx.fam.suika.y2005.CSS.Node.CharsetRule = function (encodingArg) {
  cx.fam.suika.y2005.CSS.Node.CharsetRule._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", "charset"]);
  this.encoding = encodingArg;
};
cx.fam.suika.y2005.CSS.Node.CharsetRule.inherits (cx.fam.suika.y2005.CSS.Node.AtRule);
cx.fam.suika.y2005.CSS.Node.CharsetRule.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_AT_CHARSET_NODE;
};
cx.fam.suika.y2005.CSS.Node.CharsetRule.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CHARSET_RULE;
};

/**
   The textual representation of the rule.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.CharsetRule.prototype.getCSSText =
function () {
  return '@charset "'
       + this.encoding.replace (/([\u000A\u000C\u000D"\\])/,
                                function () { return "\\" + RegExp.$1 })
       + '";\n';
};
/* Not implemented: |setCSSText| */

/**
   The charset name.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.CharsetRule.prototype.getEncoding = function () {
  return this.encoding;
};

cx.fam.suika.y2005.CSS.Node.CharsetRule.prototype.toString = function () {
  return "[object CSSCharsetRule]";
};


/**
   Interface |CSSNamespaceRule|
*/
cx.fam.suika.y2005.CSS.Node.NamespaceRule = function (prefixArg, namespaceURIArg) {
  cx.fam.suika.y2005.CSS.Node.NamespaceRule._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", "namespace"]);
  this.prefix = prefixArg;
  this.namespaceURI = namespaceURIArg;
};
cx.fam.suika.y2005.CSS.Node.NamespaceRule.inherits
  (cx.fam.suika.y2005.CSS.Node.AtRule);
cx.fam.suika.y2005.CSS.Node.NamespaceRule.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_AT_NAMESPACE_NODE;
};
cx.fam.suika.y2005.CSS.Node.NamespaceRule.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.NAMESPACE_RULE;
};

/**
   The textual representation of the rule.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.NamespaceRule.prototype.getCSSText =
function () {
  var r = "@namespace";
  if (this.prefix != null) r += " " + this.prefix;
  r += ' "'
     + this.namespaceURI.replace (/([\u000A\u000C\u000D"\\])/,
                                  function () { return "\\" + RegExp.$1 })
     + '";\n';
  return r;
};
/* Not implemented: |setCSSText| */

/**
   The namespace URI.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.CharsetRule.prototype.getNamespaceURI = function () {
  return this.namespaceURI;
};
/* Is setter necessary? */

/**
   The namespace prefix.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.CharsetRule.prototype.getPrefix = function () {
  return this.encoding;
};
/* Is setter necessary? */

cx.fam.suika.y2005.CSS.Node.NamespaceRule.prototype.toString = function () {
  return "[object CSSNamespaceRule]";
};


/**
   Interface |CSSUnknownRule|
*/
cx.fam.suika.y2005.CSS.Node.UnknownRule = function (namespaceURI, localName) {
  cx.fam.suika.y2005.CSS.Node.UnknownRule._superclass.apply
    (this, [namespaceURI, localName]);
};
cx.fam.suika.y2005.CSS.Node.UnknownRule.inherits (cx.fam.suika.y2005.CSS.Node.AtRule);

cx.fam.suika.y2005.CSS.Node.UnknownRule.prototype.toString = function () {
  return "[object CSSUnknownRule]";
};
cx.fam.suika.y2005.CSS.Node.UnknownRule.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_UNKNOWN_RULE_NODE;
};
cx.fam.suika.y2005.CSS.Node.UnknownRule.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.UNKNOWN_RULE;
};


/**
   Interface |CSSStyleRule|
   
   A |CSSStyleRule| object represents a rule set in a CSS style sheet.
*/
cx.fam.suika.y2005.CSS.Node.RuleSet = function () {
  cx.fam.suika.y2005.CSS.Node.RuleSet._superclass.apply (this, arguments);
  this.style = new cx.fam.suika.y2005.CSS.Node.StyleDeclaration ();
  this.style.parentRule = this;
};
cx.fam.suika.y2005.CSS.Node.RuleSet.inherits (cx.fam.suika.y2005.CSS.Node.Rule);
cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_RULE_SET_NODE;
};
cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.getType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.STYLE_RULE;
};

/**
   The textual representation of the rule set.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.getCSSText =
function () {
  return this.getSelectorText () + " {\n"
       + this.style.getCSSText ()
       + "}\n";
};
/* Not implemented: |setCSSText| from DOM Level 2 CSS */

/* Not implemented: |setSelectorText| from DOM Level 2 CSS */

/**
   The selector object of the rule set.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.getSelector = function () {
  return this.selector;
};
cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.setSelector = function (newValue) {
  this.selector = newValue;
};

/**
   A textual representation of the selector of the rule set.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.getSelectorText = function () {
  return this.selector.getSelectorText ();
};

/**
   The declaration block of the rule set.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.getStyle = function () {
  return this.style;
};

cx.fam.suika.y2005.CSS.Node.RuleSet.prototype.toString = function () {
  return "[object CSSRuleSet]";
};


/**
   Interface |CSSBlock|
*/
cx.fam.suika.y2005.CSS.Node.Block = function () {
  cx.fam.suika.y2005.CSS.Node.Block._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.CSS.Node.Block.inherits (cx.fam.suika.y2005.CSS.Node.Node);

cx.fam.suika.y2005.CSS.Node.Block.prototype.toString = function () {
  return "[object CSSBlock]";
};


/**
   Interface |CSSStyleDeclaration|
   
   A |CSSStyleDeclaration| represents a CSS declaration block.
*/
cx.fam.suika.y2005.CSS.Node.StyleDeclaration = function () {
  cx.fam.suika.y2005.CSS.Node.StyleDeclaration._superclass.apply (this, arguments);
  this.decls = [];
};
cx.fam.suika.y2005.CSS.Node.StyleDeclaration.inherits
  (cx.fam.suika.y2005.CSS.Node.Block);
cx.fam.suika.y2005.CSS.Node.StyleDeclaration.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_DECLARATION_BLOCK_NODE;
};

/**
   Appends a CSS property declaration object.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.StyleDeclaration.prototype.appendPropertyNode =
function (newProp) {
  newProp.parentRule = this;
  return this.decls.push (newProp);
};

/* Not implemented: |setCSSText|, |length|, |getPropertyCSSValue|,
                    |getPropertyPriority|, |getPropertyValue|,
                    |removeProperty|, |setProperty| from DOM Level 2 CSS */

/**
   The textual representation of the declaration block, excluding the
   surrounding curly braces.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.StyleDeclaration.prototype.getCSSText =
function () {
  var r = "";
  for (var i = 0; i < this.decls.length; i++) {
    r += "  " + this.decls[i].getCSSText () + ";\n";
  }
  return r;
};

/**
   The number of properties in the declaration block.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.StyleDeclaration.prototype.getDeclarationLength =
function () {
  return this.decls.length;
};

/*
  The rule that contains this rule, if any, or |null| otherwise.
  [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Node.StyleDeclaration.prototype.getParentRule = function () {
  return this.parentRule;
};
cx.fam.suika.y2005.CSS.Node.StyleDeclaration.prototype._SetParentRule =
function (newValue) {
  this.parentRule = newValue;
};

cx.fam.suika.y2005.CSS.Node.StyleDeclaration.prototype.toString = function () {
  return "[object CSSStyleDeclaration]";
};


/**
   Interface |CSSDeclaration|
*/
cx.fam.suika.y2005.CSS.Node.Declaration = function () {
  cx.fam.suika.y2005.CSS.Node.Declaration._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.CSS.Node.Declaration.inherits (cx.fam.suika.y2005.CSS.Node.Node);
cx.fam.suika.y2005.CSS.Node.Declaration.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_EMPTY_DECLARATION_NODE;
};

/**
   The textual representation of the declaration.
   [non-standard]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Node.Declaration.prototype.getCSSText =
function () {
  return "";
};

cx.fam.suika.y2005.CSS.Node.Declaration.prototype.toString = function () {
  return "[object CSSDeclaration]";
};


/**
   Interface |CSSPropertyDeclaration|
   
   A |CSSPropertyDeclaration| object represents a CSS declaration,
   i.e. a pair of property (or descriptor) name and value.
*/
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration = function (nsURI, lname) {
  cx.fam.suika.y2005.CSS.Node.PropertyDeclaration._superclass.apply (this, []);
  this.propertyNamespaceURI = nsURI;
  this.propertyLocalName = lname.toLowerCase ();
};
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.inherits
  (cx.fam.suika.y2005.CSS.Node.Declaration);
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.getCSSNodeType = {
  return cx.fam.suika.y2005.CSS.Node.Rule.prototype.CSS_PROPERTY_DECLARATION_NODE;
};

/**
   The textual representation of the declaration.
   Note that namespace fix up is not done.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.getCSSText =
function () {
  return this.getPropertyName () + ": " + this.getValue ().getCSSText ();
};

cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.getPropertyLocalName =
function () {
  return this.propertyLocalName;
};
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.getPropertyName =
function () {
  if (this.propertNamePrefix == null) {
    return this.propertyLocalName;
  } else {
    return "-" + this.propertyNamePrefix + "-" + this.propertyLocalName;
  }
};
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.getPropertyNamePrefix =
function () {
  return this.propertyName;
};
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.setPropertyNamePrefix =
function (newValue) {
  this.propertyNamePrefix = newValue.toLowerCase ();
};
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.getPropertyNamespaceURI =
function () {
  return this.propertyNamespaceURI;
};
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.getPropertyValue =
function () {
  return this.propertyValue;
};
cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.setPropertyValue =
function (newValue) {
  this.propertyValue = newValue;
};

cx.fam.suika.y2005.CSS.Node.PropertyDeclaration.prototype.toString = function () {
  return "[object CSSPropertyDeclaration]";
};


/**
   Interface |StyleSheetList|
*/
cx.fam.suika.y2005.CSS.StyleSheetList = function () {
};
cx.fam.suika.y2005.CSS.StyleSheetList.inherits (Array);

/**
   The |index|th style sheet in the list, if any, or |null| otherwise.
   [DOM Level 2 Style Sheet]
*/
cx.fam.suika.y2005.CSS.StyleSheetList.prototype.item = function (index) {
  return this[index];
};

/**
   The number of style sheets in the list.
   [DOM Level 2 Style Sheet]
*/
cx.fam.suika.y2005.CSS.StyleSheetList.prototype.getLength = function () {
  return this.length;
};

cx.fam.suika.y2005.CSS.StyleSheetList.prototype.toString = function () {
  return "[object StyleSheetList]";
};


/**
   Interface |CSSRuleList|
*/
cx.fam.suika.y2005.CSS.RuleList = function () {
};
cx.fam.suika.y2005.CSS.RuleList.inherits (Array);

/**
   The |index|th rule in the list, if any, or |null| otherwise.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.RuleList.prototype.item = function (index) {
  return this[index];
};

cx.fam.suika.y2005.CSS.RuleList.prototype.toString = function () {
  return "[object CSSRuleList]";
};

/**
   The number of rules in the list.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.RuleList.prototype.getLength = function () {
  return this.length;
};

/* Revision: $Date: 2005/11/01 14:27:47 $ */

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
