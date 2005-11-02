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
if (typeof (cx.fam.suika.y2005.CSS.Value) == "undefined") {
  cx.fam.suika.y2005.CSS.Value = {};
}

JSAN.require ("cx.fam.suika.y2005.Class.Inherit");
JSAN.require ("cx.fam.suika.y2005.DOM.Implementation");

/**
   Interface |CSSImplementationValue|
*/
cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._AddFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/CSS/Value#", "1.0", {
    /**
       Creates a CSS keyword identifier value.
       
       @param namespaceURI The namespace URI of the identifier.
       @param prefix       The namespace prefix of the identifier, if any, or |null|.
       @param localName    The local name of the identifier.
    */
    createCSSKeywordValueNS: function (namespaceURI, prefix, localName) {
      localName = localName.toLowerCase ();
      if (prefix != null) prefix = prefix.toLowerCase ();
      if (namespaceURI == "urn:x-suika-fam-cx:css:") {
        switch (localName) {
        case "inherit":
        case "important":
        case "initial":
        case "-moz-initial":
          return new cx.fam.suika.y2005.CSS.Value.CascadeValue
                   (namespaceURI, prefix, localName);
        }
      }
      return new cx.fam.suika.y2005.CSS.Value.IdentValue
               (namespaceURI, prefix, localName);
    },
    
    /**
       Creates a CSS numeral value.
       
       @param value        The floating number value.
       @param namespaceURI The namespace URI of the unit, or |null| for no unit.
       @param prefix       The namespace prefix of the unit, if any, or |null|.
       @param localName    The local name of the unit, |%| for percentage,
                           or |null| for no unit.  Note that |namespaceURI|
                           and |prefix| are ignored if the |localName| is
                           either |%| or |null|.
    */
    createCSSNumericValueNS: function (value, namespaceURI, prefix, localName) {
      if (localName != null) localName = localName.toLowerCase ();
      if (prefix != null) prefix = prefix.toLowerCase ();
      if (namespaceURI == null && localName == null) {
        return new cx.fam.suika.y2005.CSS.Value.NumericValue (value, null, null, null);
      } else if (localName == "%") {
        return new cx.fam.suika.y2005.CSS.Value.NumericValue
                 (value, "urn:x-suika-fam-cx:css:", null, localName);
      } else {
        return new cx.fam.suika.y2005.CSS.Value.NumericValue
                 (value, namespaceURI, prefix, localName);
      }
    },
    
    /**
       Creates a CSS string value.
       
       @param value        The string value.
    */
    createCSSStringValue: function (value) {
      return new cx.fam.suika.y2005.CSS.Value.StringValue (value);
    },
    
    /**
       Creates a CSS URI value.
       
       @param value        The DOM URI.
       @param baseURI      The base URI against which |value| is resolved,
                           if available, or |null|.
    */
    createCSSURIValue: function (value, baseURI) {
      return new cx.fam.suika.y2005.CSS.Value.URIValue (value, baseURI);
    },
    
    /**
       Creates a CSS RGB color value.
       
       @param red   The red color value.
       @param green The green color value.
       @param blue  The blue color value.
       
       For ECMAScript binding, |Number| type values can be used
       as parameters as well as |CSSNumericValue| objects.  They
       are converted into |CSSNumericValue|s with no unit.
    */
    createCSSRGBValue: function (red, green, blue) {
      if (typeof (red) == "number") {
        red = new cx.fam.suika.y2005.CSS.Value.NumericValue (red, null, null, null);
      }
      if (typeof (green) == "number") {
        green = new cx.fam.suika.y2005.CSS.Value.NumericValue
                  (green, null, null, null);
      }
      if (typeof (blue) == "number") {
        blue = new cx.fam.suika.y2005.CSS.Value.NumericValue (blue, null, null, null);
      }
      return new cx.fam.suika.y2005.CSS.Value.RGBValue (red, green, blue);
    },
    
    /**
       Creates an empty |CSSValueList|.
    */
    createCSSValueList: function () {
      return new cx.fam.suika.y2005.CSS.Value.ValueList ();
    }
  });


/**
   Escapes a string as an |IDENT|.
*/
cx.fam.suika.y2005.CSS.Value._EscapeIdent = function (s) {
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
   Interface |CSSValue|
   
   A |CSSValue| object represents a value or a set of value used in
   CSS style sheets.
*/
cx.fam.suika.y2005.CSS.Value.Value = function () {
};

/**
   A textual representation of the value.
   [DOM Level 2 CSS]
   
   Note that namespace and base URI fixups are *not* done.
*/
cx.fam.suika.y2005.CSS.Value.Value.prototype.getCSSText = function () {
  return null;
};
cx.fam.suika.y2005.CSS.Value.Value.prototype.setCSSText = function (newValue) {}

/**
   The type of the value.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Value.Value.prototype.getCSSValueType = function () {
  return this.CSS_CUSTOM;
};
cx.fam.suika.y2005.CSS.Value.Value.prototype.CSS_INHERIT         = 0;
cx.fam.suika.y2005.CSS.Value.Value.prototype.CSS_PRIMITIVE_VALUE = 1;
cx.fam.suika.y2005.CSS.Value.Value.prototype.CSS_VALUE_LIST      = 2;
cx.fam.suika.y2005.CSS.Value.Value.prototype.CSS_CUSTOM          = 3;

cx.fam.suika.y2005.CSS.Value.Value.prototype.toString = function () {
  return "[object CSSValue]";
};


/**
   Interface |CSSCascadeValue|
   
   A |CSSCascadeValue| represents a keyword that controls cascading,
   such as |inherit| or |initial|.
*/
cx.fam.suika.y2005.CSS.Value.CascadeValue = function (nsuri, pfx, lname) {
  cx.fam.suika.y2005.CSS.Value.CascadeValue._superclass.apply (this, []);
  this.namespaceURI = nsuri;
  this.prefix = pfx;
  this.localName = lname;
};
cx.fam.suika.y2005.CSS.Value.CascadeValue.inherits
  (cx.fam.suika.y2005.CSS.Value.Value);
cx.fam.suika.y2005.CSS.Value.Value.prototype.getCSSValueType = function () {
  if (this.namespaceURI == "urn:x-suika-fam-cx:css:" &&
      this.localName == "inherit") {
    return this.CSS_INHERIT;
  } else {
    return this.CSS_CUSTOM;
  }
};

/**
   The local name of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getLocalName = function () {
  return this.localName;
};

/**
   The name of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getName = function () {
  if (this.namespaceURI == "urn:x-suika-fam-cx:css:") {
    return this.localName;
  } else {
    return "-" + this.prefix + "-" + this.localName;
  }
};

/**
   The namespace URI of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getNamespaceURI = function () {
  return this.namespaceURI;
};

/**
   The namespace prefix of the identifier, or |null| if no prefix.
*/
cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getPrefix = function () {
  return this.prefix;
};

cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getCSSText = function () {
  return cx.fam.suika.y2005.CSS.Value._EscapeIdent (this.getName ());
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.toString = function () {
  return "[object CSSCascadeValue]";
};


/**
   Interface |CSSPrimitiveValue|
*/
cx.fam.suika.y2005.CSS.Value.PrimitiveValue = function () {
  cx.fam.suika.y2005.CSS.Value.PrimitiveValue._superclass.apply (this, []);
};
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.inherits
  (cx.fam.suika.y2005.CSS.Value.Value);
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.getCSSValueType = function () {
  return this.CSS_PRIMITIVE_VALUE;
};

cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.getPrimitiveType = function () {
  return this.CSS_UNKNOWN;
};
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_UNKNOWN    = 0;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_NUMBER     = 1;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_PERCENTAGE = 2;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_EMS        = 3;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_EXS        = 4;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_PX         = 5;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_CM         = 6;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_MM         = 7;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_IN         = 8;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_PT         = 9;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_PC         = 10;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_DEG        = 11;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_RAD        = 12;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_GRAD       = 13;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_MS         = 14;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_S          = 15;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_HZ         = 16;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_KHZ        = 17;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_DIMENSION  = 18;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_STRING     = 19;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_URI        = 20;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_IDENT      = 21;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_ATTR       = 22;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_COUNTER    = 23;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_RECT       = 24;
cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.CSS_RGBCOLOR   = 25;

/* Not implemented: |getCounterValue|, |getFloatValue|, |getRGBColorValue|,
                    |getRectValue|, |getStringValue|, |setFloatValue|,
                    |setStringValue|,  */

cx.fam.suika.y2005.CSS.Value.PrimitiveValue.prototype.toString = function () {
  return "[object CSSPrimitiveValue]";
};


/**
   Interface |CSSNumericValue|
*/
cx.fam.suika.y2005.CSS.Value.NumericValue = function (f, nsuri, pfx, lname) {
  cx.fam.suika.y2005.CSS.Value.NumericValue._superclass.apply (this, []);
  this.value = f;
  this.namespaceURI = f;
  this.prefix = pfx;
  this.localName = lname;
};
cx.fam.suika.y2005.CSS.Value.NumericValue.inherits
  (cx.fam.suika.y2005.CSS.Value.PrimitiveValue);
cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getPrimitiveType = function () {
  if (this.namespaceURI == "urn:x-suika-fam-cx:css:") {
    switch (this.localName) {
    case "%":    return this.CSS_PERCENTAGE;
    case "em":   return this.CSS_EMS;
    case "ex":   return this.CSS_EXS;
    case "px":   return this.CSS_PX;
    case "cm":   return this.CSS_CM;
    case "mm":   return this.CSS_MM;
    case "in":   return this.CSS_IN;
    case "pt":   return this.CSS_PT;
    case "pc":   return this.CSS_PC;
    case "deg":  return this.CSS_DEG;
    case "rad":  return this.CSS_RAD;
    case "grad": return this.CSS_GRAD;
    case "ms":   return this.CSS_MS;
    case "s":    return this.CSS_S;
    case "hz":   return this.CSS_HZ;
    case "khz":  return this.CSS_KHZ;
    default:     return this.CSS_DIMENSION;
    }
  } else if (this.namespaceURI == null && this.localName == null) {
    return this.CSS_NUMBER;
  } else {
    return this.CSS_DIMENSION;
  }
};

/**
   The unit local name, or |null| if no unit.
*/
cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getUnitLocalName = function () {
  return this.localName;
};

/**
   The unit name, or an empty string if no unit.
*/
cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getUnitName = function () {
  if (this.namespaceURI == null && this.localName == null) {
    return "";
  } else if (this.namespaceURI == "urn:x-suika-fam-cx:css:") {
    return this.localName;
  } else {
    return "-" + this.prefix + "-" + this.localName;
  }
};

/**
   The unit namespace URI, or |null| if no unit.
*/
cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getUnitNamespaceURI = function () {
  return this.namespaceURI;
};

/**
   The unit namespace prefix, or |null| if no prefix or no unit.
*/
cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getUnitPrefix = function () {
  return this.prefix;
};

/**
   The float value.
*/
cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getValue = function () {
  return this.value;
};

cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getCSSText = function () {
  var r = this.value.toString (10);
  if (this.namespaceURI != null && this.localName != null) {
    if (this.namespaceURI == "urn:x-suika-fam-cx:cx:" && this.localName == "%") {
      r += "%";
    } else {
      r += cx.fam.suika.y2005.CSS.Value._EscapeIdent (this.getUnitName ());
    }
  }
  return r;
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.toString = function () {
  return "[object CSSNumericValue]";
};


/**
   Interface |CSSStringValue|
*/
cx.fam.suika.y2005.CSS.Value.StringValue = function (str) {
  cx.fam.suika.y2005.CSS.Value.StringValue._superclass.apply (this, []);
  this.value = str;
};
cx.fam.suika.y2005.CSS.Value.StringValue.inherits
  (cx.fam.suika.y2005.CSS.Value.PrimitiveValue);
cx.fam.suika.y2005.CSS.Value.StringValue.prototype.getPrimitiveType = function () {
  return this.CSS_STRING;
};

/**
   The string value.
*/
cx.fam.suika.y2005.CSS.Value.StringValue.prototype.getValue = function () {
  return this.value;
};

cx.fam.suika.y2005.CSS.Value.StringValue.prototype.getCSSText = function () {
  return '"'
       + this.value.replace (/([\u000A\u000C"\\]|\u000D\u000A)/g,
                             function () { return "\\" + RegExp.$1 })
       + '"';
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.StringValue.prototype.toString = function () {
  return "[object CSSStringValue]";
};


/**
   Interface |CSSIdentValue|
   
   A |CSSIdentValue| represents a keyword used as a property value.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue = function (nsuri, pfx, lname) {
  cx.fam.suika.y2005.CSS.Value.IdentValue._superclass.apply (this, []);
  this.namespaceURI = nsuri;
  this.prefix = pfx;
  this.localName = lname;
};
cx.fam.suika.y2005.CSS.Value.IdentValue.inherits
  (cx.fam.suika.y2005.CSS.Value.PrimitiveValue);
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getPrimitiveType = function () {
  return this.CSS_IDENT;
};

/**
   The local name of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getLocalName =
  cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getLocalName;

/**
   The name of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getName =
  cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getName;

/**
   The namespace URI of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getNamespaceURI =
  cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getLocalNamespaceURI;

/**
   The namespace prefix of the identifier, or |null| if no prefix.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getPrefix =
  cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getPrefix;

cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getCSSText =
  cx.fam.suika.y2005.CSS.Value.CascadeValue.prototype.getCSSText;
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.toString = function () {
  return "[object CSSIdentValue]";
};


/**
   Interface |CSSFunctionValue|
*/
cx.fam.suika.y2005.CSS.Value.FunctionValue = function (nsuri, pfx, lname) {
  cx.fam.suika.y2005.CSS.Value.FunctionValue._superclass.apply (this, []);
  this.functionNamespaceURI = nsuri;
  this.functionPrefix = pfx;
  this.functionLocalName = lname;
};
cx.fam.suika.y2005.CSS.Value.FunctionValue.inherits
  (cx.fam.suika.y2005.CSS.Value.PrimitiveValue);
cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getPrimitiveType = function () {
  return this.CSS_CUSTOM;
};

/**
   The function local name.
*/
cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getFunctionLocalName =
function () {
  return this.functionLocalName;
};

/**
   The function name.
*/
cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getFunctionName = function () {
  if (this.functionNamespaceURI == "urn:x-suika-fam-cx:css:") {
    return this.functionLocalName;
  } else {
    return "-" + this.functionPrefix + "-" + this.functionLocalName;
  }
};

/**
   The function namespace URI.
*/
cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getFunctionNamespaceURI =
function () {
  return this.functionNamespaceURI;
};

/**
   The function namespace prefix, or |null| if no prefix.
*/
cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getFunctionPrefix =
function () {
  return this.functionPrefix;
};


cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getCSSText = function () {
  return cx.fam.suika.y2005.CSS.Value._EscapeIdent (this.getFunctionName ()) + "()";
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.toString = function () {
  return "[object CSSFunctionValue]";
};


/**
   Interface |CSSURIValue|
*/
cx.fam.suika.y2005.CSS.Value.URIValue = function (uriArg, baseURIArg) {
  cx.fam.suika.y2005.CSS.Value.URIValue._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", null, "url"]);
  this.value = uriArg;
  this.baseURI = baseURIArg;
};
cx.fam.suika.y2005.CSS.Value.URIValue.inherits
  (cx.fam.suika.y2005.CSS.Value.FunctionValue);
cx.fam.suika.y2005.CSS.Value.URIValue.prototype.getPrimitiveType = function () {
  return this.CSS_URI;
};

/* Not implemented: |absoluteURI| */

/**
   The base URI, if available, or |null|.
*/
cx.fam.suika.y2005.CSS.Value.URIValue.prototype.getBaseURI = function () {
  return this.baseURI;
};

/**
   The DOM URI value.
*/
cx.fam.suika.y2005.CSS.Value.URIValue.prototype.getValue = function () {
  return this.value;
};


cx.fam.suika.y2005.CSS.Value.StringValue.prototype.getCSSText = function () {
  return 'url('
       + this.value.replace (/([\u000A\u000C"'()\\]|\u000D\u000A)/g,
                             function () { return "\\" + RegExp.$1 })
       + ')';
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.URIValue.prototype.toString = function () {
  return "[object CSSURIValue]";
};


/**
   Interface |CSSRGBValue| extends |RGBColor|
*/
cx.fam.suika.y2005.CSS.Value.RGBValue = function (r, g, b) {
  cx.fam.suika.y2005.CSS.Value.RGBValue._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", null, "rgb"]);
  this.red = r;
  this.green = g;
  this.blue = b;
};
cx.fam.suika.y2005.CSS.Value.RGBValue.inherits
  (cx.fam.suika.y2005.CSS.Value.FunctionValue);
cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.getPrimitiveType = function () {
  return this.CSS_RGBCOLOR;
};

/**
   The red color value.
*/
cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.getRed = function () {
  return this.red;
};

/**
   The green color value.
*/
cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.getGreen = function () {
  return this.green;
};

/**
   The blue color value.
*/
cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.getBlue = function () {
  return this.blue;
};


cx.fam.suika.y2005.CSS.Value.StringValue.prototype.getCSSText = function () {
  return 'rgb('
       + this.red.getCSSText () + ","
       + this.green.getCSSText () + ","
       + this.blue.getCSSText ()
       + ')';
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.toString = function () {
  return "[object CSSRGBValue]";
};


/**
   Interface |CSSValueList|
   
   A |CSSValueList| is an ordered collection of |CSSValue|s.  A |CSSValueList|
   is also a |CSSValue|.  It represents |none| keyword when the |length| is zero.
*/
cx.fam.suika.y2005.CSS.Value.ValueList = function () {
  cx.fam.suika.y2005.CSS.Value.ValueList._superclass.apply (this, []);
  this.items = [];
};
cx.fam.suika.y2005.CSS.Value.ValueList.inherits
  (cx.fam.suika.y2005.CSS.Value.Value);

/**
   Returns the |index|th value in the list, if any, or |null|.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Value.ValueList.prototype.item = function (index) {
  return this.items[index];
};

/**
   Returns the number of values in the list.
   [DOM Level 2 CSS]
*/
cx.fam.suika.y2005.CSS.Value.ValueList.prototype.getLength = function (index) {
  return this.items.length;
};

cx.fam.suika.y2005.CSS.Value.ValueList.prototype.getCSSText = function () {
  if (this.items.length == 0) {
    return "none";
  } else {
    /* TODO: separeted by what? */
  }
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.ValueList.prototype.toString = function () {
  return "[object CSSValueList]";
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
