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
if (typeof (cx.fam.suika.y2005.CSS.Selectors) == "undefined") {
  cx.fam.suika.y2005.CSS.Selectors = {};
}

JSAN.require ("cx.fam.suika.y2005.Class.Inherit");
JSAN.require ("cx.fam.suika.y2005.DOM.Implementation");

/**
   Escapes a string as an |IDENT|.
*/
cx.fam.suika.y2005.CSS.Selectors._EscapeIdent = function (s) {
  return s.replace
           (/([\u0000-\u002C\u002E\u002F\u003A-\u0040\u005B-\u005E\u0080\u007B-\u007F]|^[0-9])/g,
            function () {
              var c = RegExp.$1;
              if (!c.match (/^[\u0000-\u0020\u007F]/)) {
                return "\\" + c;
              } else {
                var e = "000000"
                      + c.charCodeAt (0).toString (16).toUpperCase ();
                return "\\" + e.substring (e.length - 6);
              }
            });
};

/**
   Interface |SelectorsImplementation|
*/
cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._AddFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/CSS/Selectors#", "1.0", {
    /**
       Creates an empty |SSelectorsGroup| object.
    */
    createSSelectorsGroup: function () {
      return new cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup ();
    },
    
    /**
       Creates an empty |SSelector| object.
    */
    createSSelector: function () {
      return new cx.fam.suika.y2005.CSS.Selectors.Selector ();
    },
    
    /**
       Creates an |SSimpleSelectorSequence| object.
       
       @param typesel A type or universal selector.
    */
    createSSimpleSelectorSequence: function (typesel) {
      return new cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence (typesel);
    },
    
    /**
       Creates an |STypeSelector| object.
       
       @param namespaceURI The namespace URI, or |null|.
       @param prefix       The namespace prefix, |*|, an empty string, or |null|.
       @param localName    The local name, or |*|.
    */
    createSTypeSelectorNS: function (namespaceURI, prefix, localName) {
      return new cx.fam.suika.y2005.CSS.Selectors.TypeSelector
               (namespaceURI, prefix, localName);
    },
    
    /**
       Creates an |SAttributeSelector| object.
       
       @param namespaceURI The namespace URI, or |null|.
       @param prefix       The namespace prefix, |*|, an empty string, or |null|.
       @param localName    The local name.
       @param operator     The operator constant.
       @param value        The attribute value, or |null|.
    */
    createSAttributeSelectorNS:
    function (namespaceURI, prefix, localName, operator, value) {
      return new cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
               (namespaceURI, prefix, localName, op, value);
    },
    
    /**
       Creates an |SClassSelector| object.
       
       @param className The class name.
    */
    createSClassSelector: function (className) {
      return new cx.fam.suika.y2005.CSS.Selectors.ClassSelector (className);
    },
    
    /**
       Creates an |SIDSelector| object.
       
       @param id The identifier.
    */
    createSIDSelector: function (id) {
      return new cx.fam.suika.y2005.CSS.Selectors.IDSelector (id);
    },
    
    /**
       Creates an |SPseudoClass| object.
       
       @param namespaceURI The namespace URI of the pseudo class.
       @param prefix       The namespace prefix of the pseudo class.
       @param localName    The local name of the pseudo class.
       @throws DOMException |NOT_SUPPORTED_ERR|: If the implementation does
                           not support the creation of the pseudo class by
                           this method, because it does not support the pseudo
                           class entirely or it does support it but the pseudo
                           class requires one or more functional parameter.
                           In the later case, separate method to create the pseudo
                           class should be provided.
    */
    createSPseudoClassNS: function (namespaceURI, prefix, localName) {
      return new cx.fam.suika.y2005.CSS.Selectors.PseudoClass
               (namespaceURI, prefix, localName);
    },
    
    /**
       Creates an |SPseudoElement| object.
       
       @param namespaceURI The namespace URI of the pseudo element.
       @param prefix       The namespace prefix of the pseudo element.
       @param localName    The local name of the pseudo element.
       @throws DOMException |NOT_SUPPORTED_ERR|: If the implementation does
                           not support the creation of the pseudo element by
                           this method, because it does not support the pseudo
                           element entirely or it does support it but the pseudo
                           element requires one or more functional parameter.
                           In the later case, separate method to create the pseudo
                           element should be provided.
    */
    createSPseudoElementNS: function (namespaceURI, prefix, localName) {
      return new cx.fam.suika.y2005.CSS.Selectors.PseudoElement
               (namespaceURI, prefix, localName);
    }
  });

/**
   Interface |SSelectorsGroup|
   
   An |SSelectorsGroup| object represents a group of selectors,
   or a |COMMA| separated list of selectors.
   Unlike groups of selectors in Selectors, this object might be empty,
   i.e. |length| might be zero.  Serializing such object (i.e. |selectorText|)
   will result in an invalid selector.
*/
cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup = function () {
};
cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup.inherits (Array);

/**
   Adds a selector to the group.
   
   @param sel The selector object to add.
*/
cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup.prototype.appendSelector =
function (sel) {
  this.push (sel);
};

/**
   Returns the |index|th selector in the group, if any, or |null|.
   
   @param index The ordinal index of the selector, starting from zero.
   @return The |index|th selector or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup.prototype.item = function (index) {
  return this[index];
};

/**
   The number of selectors in the group.
   
   @return The number of selectors.
*/
cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup.prototype.getLength = function () {
  return this.length;
};

/**
   A textual representation of the object.
   
     Note.  The returned string might be an invalid selector, in cases, for example:
              - if a type selector has undeclared namespace prefix,
              - if the group has no selector,
              - or so on.

  @return A textual representation.
*/
cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup.prototype.getSelectorText =
function () {
  var r = this[0] != null ? this[0].getSelectorText () : "";
  for (var i = 1; i < this.length; i++) {
    r += ",\n" + this[i].getSelectorText ();
  }
  return r;
};

cx.fam.suika.y2005.CSS.Selectors.SelectorsGroup.prototype.toString = function () {
  return "[object SSelectorsGroup]";
};


/**
   Interface |SSelector|
   
   An |SSelector| object represents a selector,
   or a list of simple selector sequences separeted by combinators.
   Unlike selectors in Selectors, this object might be empty,
   i.e. |length| might be zero.  Serializing such object (i.e. |selectorText|)
   will result in an invalid selector.
*/
cx.fam.suika.y2005.CSS.Selectors.Selector = function () {
  this.cmbs = [null];
};
cx.fam.suika.y2005.CSS.Selectors.Selector.inherits (Array);

/**
   Adds a simple selector sequence to the selector.
   
   @param combinator The combinator that separates the previous simple selector
                     sequence and the new one.
   @param sel        The simple selector sequence object to add.
*/
cx.fam.suika.y2005.CSS.Selectors.Selector.prototype.appendSimpleSelectorSequence =
function (combinator, sel) {
  if (this.length != 0) this.cmbs.push (combinator);
  this.push (sel);
};

/**
   Returns the |index + 1|'th combinator, i.e. the combinator between
   |index - 1|'th and |index|th simple selector sequences in the selector,
   if any, or |null|.
   
   @param index The ordinal index of the combinator, starting from one.
   @return The |index|th combinator or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.Selector.prototype.getCombinator = function (index) {
  return this.cmbs[index];
};
cx.fam.suika.y2005.CSS.Selectors.Selector
.prototype.SELECTORS_COMBINATOR_DESCENDANT                = 1;
cx.fam.suika.y2005.CSS.Selectors.Selector
.prototype.SELECTORS_COMBINATOR_CHILD                     = 2;
cx.fam.suika.y2005.CSS.Selectors.Selector
.prototype.SELECTORS_COMBINATOR_DIRECT_ADJACENT_SIBLING   = 3;
cx.fam.suika.y2005.CSS.Selectors.Selector
.prototype.SELECTORS_COMBINATOR_INDIRECT_ADJACENT_SIBLING = 4;

/**
   Returns the |index|th simple selector sequence in the selector, if any, or |null|.
   
   @param index The ordinal index of the sequence, starting from zero.
   @return The |index|th sequence or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.Selector.prototype.item = function (index) {
  return this[index];
};

/**
   The number of simple selector sequences in the selector.
   
   @return The number of sequences.
*/
cx.fam.suika.y2005.CSS.Selectors.Selector.prototype.getLength = function () {
  return this.length;
};

/**
   A textual representation of the object.
   
     Note.  The returned string might be an invalid selector, in cases, for example:
              - if a type selector has undeclared namespace prefix,
              - if the selector has no simple selector sequence,
              - if the simple selector sequence other than the last one
                contains one or more pseudo elements,
              - or so on.

  @return A textual representation.
*/
cx.fam.suika.y2005.CSS.Selectors.Selector.prototype.getSelectorText =
function () {
  var r = this[0] != null ? this[0].getSelectorText () : "";
  for (var i = 1; i < this.length; i++) {
    if (this.cmbs[i] == this.SELECTORS_COMBINATOR_CHILD) {
      r += " +";
    } else if (this.cmbs[i] == this.SELECTORS_COMBINATOR_DIRECT_ADJACENT_SIBLING) {
      r += " >";
    } else if (this.cmbs[i] == this.SELECTORS_COMBINATOR_INDIRECT_ADJACENT_SIBLING) {
      r += " ~";
    }
    r += " " + this[i].getSelectorText ();
  }
  return r;
};

cx.fam.suika.y2005.CSS.Selectors.Selector.prototype.toString = function () {
  return "[object SSelector]";
};


/**
   Interface |SSimpleSelectorSequence|
   
   An |SSimpleSelectorSequence| object represents a simple selector sequence,
   or a list of simple selector.  It was known as simple selectors in CSS
   Level 2.1.
   
     Note.  Although the universal selector is not explicitly appears in
            a textual representation of the simple selector sequence, 
            |SSimpleSelectorSequence| objects always hold a type or universal
            selector object in their |typeSelector| attribute.

     Note.  Pseudo elements are part of simple selector sequences in this
            object model while it is semantically part of selectors in Selectors.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence = function (typeSelector) {
  this.typesel = typeSelector;
  this.sels = [];
  this.pels = [];
};

/**
   Adds a pseudo element to the simple selector sequence.
   
   @param sel The pseudo element object to add.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype.appendPseudoElement =
function (sel) {
  this.pels.push (sel);
};

/**
   Adds a simple selector to the simple selector sequence.
   
   @param sel The simple selector object to add.
   @throw DOMException HIERARCHY_REQUEST_ERR: If the |sel| object is a
                       type, universal, or pseudo element selector.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype.appendSimpleSelector
= function (sel) {
  this.sels.push (sel);
};

/**
   Returns the |index|th pseudo element in the simple selector sequence,
   if any, or |null|.
   
   @param index The ordinal index of the pseudo element, starting from zero.
   @return The |index|th pseudo element, or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype.getPseudoElement =
function (index) {
  return this.pels[index];
};

/**
   Returns the |index|th simple selector in the simple selector sequence,
   if any, or |null|.
   
   @param index The ordinal index of the simple selector, starting from zero.
   @return The |index|th simple selector or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype.getSimpleSelector =
function (index) {
  return index == 0 ? this.typesel : this.sels[index];
};

/**
   The number of pseudo elements in the simple selector sequence.
   
   @return The number of pseudo elements.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype
.getPseudoElementLength = function () {
  return this.pels.length;
};

/**
   A textual representation of the object.
   
     Note.  The returned string might be an invalid selector, in cases, for example:
              - if a type selector has undeclared namespace prefix,
              - if the selector has no simple selector sequence,
              - or so on.

  @return A textual representation.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype.getSelectorText =
function () {
  var r = this.typesel.getSelectorText ();
  if (r.length == 0 && (this.sels.length + this.pels.length > 0)) {
    r = "*";
  }
  for (var i = 0; i < this.sels.length; i++) {
    r += this.sels[i].getSelectorText ();
  }
  for (var i = 0; i < this.pels.length; i++) {
    r += this.pels[i].getSelectorText ();
  }
  return r;
};

/**
   The number of simple selectors in the simple selector sequence.
   
   @return The number of simple selectors.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype
.getSimpleSelectorLength = function () {
  return this.sels.length + 1;
};

/**
   The type or universal selector in the simple selector sequence.
   
   @return The type or universal selectors.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype
.getTypeSelector = function () {
  return this.typesel;
};

cx.fam.suika.y2005.CSS.Selectors.SimpleSelectorSequence.prototype.toString =
function () {
  return "[object SSimpleSelectorSequence]";
};


/**
   Interface |SSimpleSelector|
   
   An |SSimpleSelector| object represents a simple selector or
   a pseudo element.
     
     Note.  Unlike in Selectors pseudo elements are treated as simple selectors
            in this object model.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector = function () {
};

/**
   The kind of simple selector.
   
   @return The type.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype.getSimpleSelectorType =
function () {
  return this.SELECTORS_UNKNOWN_SIMPLE_SELECTOR;
};
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_UNKNOWN_SIMPLE_SELECTOR = 0;
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_TYPE_SELECTOR           = 1;
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_UNIVERSAL_SELECTOR      = 2;
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_ATTRIBUTE_SELECTOR      = 3;
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_CLASS_SELECTOR          = 4;
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_ID_SELECTOR             = 5;
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_PSEUDO_CLASS            = 6;
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype
.SELECTORS_PSEUDO_ELEMENT          = 7;

/**
   A textual representation of the object.
   
     Note.  The returned string might be an invalid selector, for example,
            if a type selector has undeclared namespace prefix.

  @return A textual representation.
*/
cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype.getSelectorText =
function () {
  return "";
};

cx.fam.suika.y2005.CSS.Selectors.SimpleSelector.prototype.toString = function () {
  return "[object SSimpleSelector]";
};


/**
   Interface |STypeSelector|
   
   An |STypeSelector| object represents a type selector or
   a universal selector.
   
       |    Meaning    |    prefix     | namespaceURI  |     Note
   ----+---------------+---------------+---------------+---------------
     E | E in any      |     null      |     null      | No default namespace
       | E in default  |     null      | uri (default) | Default namespace is defined
    |E | E in null     |      ""       |     null      |
   P|E | E in uri (P)  |      P        |    uri (P)    |
   *|E | E in any      |      *        |     null      |
*/
cx.fam.suika.y2005.CSS.Selectors.TypeSelector = function (ns, pfx, ln) {
  cx.fam.suika.y2005.CSS.Selectors.TypeSelector._superclass.apply (this, []);
  this.namespaceURI = ns;
  this.prefix = pfx;
  this.localName = ln;
};
cx.fam.suika.y2005.CSS.Selectors.TypeSelector.inherits
  (cx.fam.suika.y2005.CSS.Selectors.SimpleSelector);
cx.fam.suika.y2005.CSS.Selectors.TypeSelector.prototype.getSimpleSelectorType =
function () {
  if (this.localName == "*") {
    return this.SELECTORS_UNIVERESAL_SELECTOR;
  } else {
    return this.SELECTORS_TYPE_SELECTOR;
  }
};

/**
   The local name of the simple selector.
   
   @return The local name if the object is a type selector, or "*"
           for a universal selector.
*/
cx.fam.suika.y2005.CSS.Selectors.TypeSelector.prototype.getLocalName =
function () {
  return this.localName;
};

/**
   The namespace URI of the simple selector.
   
     Note.  If the value is |null|, then its semantics depends on
            the |prefix| value.
   
   @return The namespace URI, if it is specified, or |null| otherwise.
*/
cx.fam.suika.y2005.CSS.Selectors.TypeSelector.prototype.getNamespaceURI =
function () {
  return this.namespaceURI;
};

/**
   The namespace prefix of the simple selector.
   
   @return The namespace prefix, or an empty string if the simple selector
           does contain a "|" but its namespace prefix is omitted, or
           |null| if the simple selector does not contain any "|",
           or |*| that matched to any namespace.
*/
cx.fam.suika.y2005.CSS.Selectors.TypeSelector.prototype.getPrefix =
function () {
  return this.prefix;
};

cx.fam.suika.y2005.CSS.Selectors.TypeSelector.prototype.getSelectorText =
function () {
  var r;
  if (this.prefix != null) {
    r = cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.prefix) + "|"
      + cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.localName);
  } else {
    r = cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.localName);
  }
  return r;
};

cx.fam.suika.y2005.CSS.Selectors.TypeSelector.prototype.toString = function () {
  return "[object STypeSelector]";
};


/**
   Interface |SAttributeSelector|
   
   An |SAttributeSelector| object represents an attribute selector.
*/
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector = function (ns, pfx, ln, op, val) {
  cx.fam.suika.y2005.CSS.Selectors.AttributeSelector._superclass.apply (this, []);
  this.namespaceURI = ns;
  this.prefix = pfx;
  this.localName = ln;
  this.operator = op;
  this.value = val;
};
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.inherits
  (cx.fam.suika.y2005.CSS.Selectors.SimpleSelector);
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.getSimpleSelectorType =
function () {
  return this.SELECTORS_ATTRIBUTE_SELECTOR;
};

/**
   The local name of the attribute.
   
   @return The local name.
*/
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.getLocalName =
function () {
  return this.localName;
};

/**
   The namespace URI of the attribute.
   
     Note.  If the value is |null|, then its semantics depends on
            the |prefix| value.
   
   @return The namespace URI, if it is specified, or |null| otherwise.
*/
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.getNamespaceURI =
function () {
  return this.namespaceURI;
};

/**
   The tyoe of the attribute selector.
   
   @return The type of the attribute selector.
*/
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.getOperator =
function () {
  return this.operator;
};
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
.prototype.SELECTORS_ATTRIBUTE_HAS            = 1;
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
.prototype.SELECTORS_ATTRIBUTE_EQUALS         = 2;
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
.prototype.SELECTORS_ATTRIBUTE_INCLUDES       = 3;
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
.prototype.SELECTORS_ATTRIBUTE_DASHMATCH      = 4;
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
.prototype.SELECTORS_ATTRIBUTE_PREFIXMATCH    = 5;
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
.prototype.SELECTORS_ATTRIBUTE_SUFFIXMATCH    = 6;
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector
.prototype.SELECTORS_ATTRIBUTE_SUBSTRINGMATCH = 7;

/**
   The namespace prefix of the attribute.
   
   @return The namespace prefix, or an empty string if the attribute name
           does contain a "|" but its namespace prefix is omitted, or
           |null| if the attribute name does not contain any "|",
           or |*| that matched to any namespace.
*/
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.getPrefix =
function () {
  return this.prefix;
};

/**
   The attribute value, if specified, or |null|.
   
   @return The attribute value, or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.getValue =
function () {
  return this.value;
};

cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.getSelectorText =
function () {
  var r = "[";
  if (this.prefix != null) {
    r += cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.prefix) + "|"
       + cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.localName);
  } else {
    r += cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.localName);
  }
  if (this.operator != this.SELECTORS_ATTRIBUTE_HAS) {
    r += this.operator == this.SELECTORS_ATTRIBUTE_EQUALS ?       "=" :
         this.operator == this.SELECTORS_ATTRIBUTE_INCLUDES ?    "~=" :
         this.operator == this.SELECTORS_ATTRIBUTE_DASHMATCH ?   "|=" :
         this.operator == this.SELECTORS_ATTRIBUTE_PREFIXMATCH ? "^=" :
         this.operator == this.SELECTORS_ATTRIBUTE_SUFFIXMATCH ? "$=" :
                                                                 "*=" ;
    r += '"'
       + this.value.replace (/([\u000A\u000C"\\]|\u000D\u000A)/g,
                             function () { return "\\" + RegExp.$1 })
       + '"';
  }
  r += "]";
  return r;
};

cx.fam.suika.y2005.CSS.Selectors.AttributeSelector.prototype.toString = function () {
  return "[object SAttributeSelector]";
};


/**
   Interface |SClassSelector|
   
   An |SClassSelector| object represents a class selector.
*/
cx.fam.suika.y2005.CSS.Selectors.ClassSelector = function (cls) {
  cx.fam.suika.y2005.CSS.Selectors.ClassSelector._superclass.apply (this, []);
  this.className = cls;
};
cx.fam.suika.y2005.CSS.Selectors.ClassSelector.inherits
  (cx.fam.suika.y2005.CSS.Selectors.SimpleSelector);

/**
   The class name.
   
   @return The class name.
*/
cx.fam.suika.y2005.CSS.Selectors.ClassSelector.prototype.getClassName =
function () {
  return this.className;
};

cx.fam.suika.y2005.CSS.Selectors.ClassSelector.prototype.getSelectorText =
function () {
  return "." + cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.className);
};

cx.fam.suika.y2005.CSS.Selectors.ClassSelector.prototype.toString = function () {
  return "[object SClassSelector]";
};

/**
   Interface |SIDSelector|
   
   An |SIDSelector| object represents an ID selector.
*/
cx.fam.suika.y2005.CSS.Selectors.IDSelector = function (id) {
  cx.fam.suika.y2005.CSS.Selectors.IDSelector._superclass.apply (this, []);
  this.id = id;
};
cx.fam.suika.y2005.CSS.Selectors.IDSelector.inherits
  (cx.fam.suika.y2005.CSS.Selectors.SimpleSelector);

/**
   The identifier.
   
   @return The identifier.
*/
cx.fam.suika.y2005.CSS.Selectors.IDSelector.prototype.getId =
function () {
  return this.id;
};

cx.fam.suika.y2005.CSS.Selectors.IDSelector.prototype.getSelectorText =
function () {
  return "#" + cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.id);
};

cx.fam.suika.y2005.CSS.Selectors.IDSelector.prototype.toString = function () {
  return "[object SIDSelector]";
};


/**
   Interface |SPseudoClass|
   
   An |SPseudoClass| object represents a pseudo class.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoClass = function (nsuri, pfx, ln) {
  cx.fam.suika.y2005.CSS.Selectors.PseudoClass._superclass.apply (this, []);
  this.namespaceURI = nsuri;
  this.prefix = pfx;
  this.localName = ln;
};
cx.fam.suika.y2005.CSS.Selectors.PseudoClass.inherits
  (cx.fam.suika.y2005.CSS.Selectors.SimpleSelector);

/**
   The pseudo class local name.
   
   @return The local name.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoClass.prototype.getClassLocalName =
function () {
  return this.localName;
};

/**
   The pseudo class name.
   
   @return The pseudo class name.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoClass.prototype.getClassName =
function () {
  if (this.namespaceURI == "urn:x-suika-fam-cx:selectors:") {
    return this.localName;
  } else {
    return "-" + this.prefix + "-" + this.localName;
  }
};

/**
   The pseudo class namespace URI.
   
   @return The namespace URI.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoClass.prototype.getClassNamespaceURI =
function () {
  return this.namespaceURI;
};

/**
   The pseudo class namespace prefix.
   
   @return The namespace prefix, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoClass.prototype.getClassPrefix =
function () {
  return this.prefix;
};

cx.fam.suika.y2005.CSS.Selectors.PseudoClass.prototype.getSelectorText =
function () {
  return ":" + cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.getClassName ());
};

cx.fam.suika.y2005.CSS.Selectors.PseudoClass.prototype.toString = function () {
  return "[object SPseudoClass]";
};



/**
   Interface |SPseudoElement|
   
   An |SPseudoElement| object represents a pseudo element.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoElement = function (nsuri, pfx, ln) {
  cx.fam.suika.y2005.CSS.Selectors.PseudoElement._superclass.apply (this, []);
  this.namespaceURI = nsuri;
  this.prefix = pfx;
  this.localName = ln;
};
cx.fam.suika.y2005.CSS.Selectors.PseudoElement.inherits
  (cx.fam.suika.y2005.CSS.Selectors.SimpleSelector);

/**
   The pseudo element local name.
   
   @return The local name.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoElement.prototype.getElementLocalName =
function () {
  return this.localName;
};

/**
   The pseudo element name.
   
   @return The pseudo element name.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoElement.prototype.getElementName =
function () {
  if (this.namespaceURI == "urn:x-suika-fam-cx:selectors:") {
    return this.localName;
  } else {
    return "-" + this.prefix + "-" + this.localName;
  }
};

/**
   The pseudo element namespace URI.
   
   @return The namespace URI.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoElement.prototype.getElementNamespaceURI =
function () {
  return this.namespaceURI;
};

/**
   The pseudo element namespace prefix.
   
   @return The namespace prefix, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Selectors.PseudoElement.prototype.getElementPrefix =
function () {
  return this.prefix;
};

cx.fam.suika.y2005.CSS.Selectors.PseudoElement.prototype.getSelectorText =
function () {
  return "::" + cx.fam.suika.y2005.CSS.Selectors._EscapeIdent (this.getElementName ());
};

cx.fam.suika.y2005.CSS.Selectors.PseudoElement.prototype.toString = function () {
  return "[object SPseudoElement]";
};

/* Revision: $Date: 2005/11/02 12:59:21 $ */

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
