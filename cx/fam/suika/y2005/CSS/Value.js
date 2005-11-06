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
      return new cx.fam.suika.y2005.CSS.Value.IdentValue
               (namespaceURI, prefix, localName);
    },
    
    /**
       Creates a CSS numeral value.
       
       @param value        The floating number value.
       @param namespaceURI The namespace URI of the unit, or |null| for no unit
                           or percentage.
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
      } else if (namespaceURI == null && localName == "%") {
        return new cx.fam.suika.y2005.CSS.Value.NumericValue
                 (value, null, null, localName);
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
       Creates a CSS RGBA color value.
       
       @param red   The red color value.
       @param green The green color value.
       @param blue  The blue color value.
       @param alpha The alpha value.
       
       For ECMAScript binding, |Number| type values can be used
       as parameters as well as |CSSNumericValue| objects.  They
       are converted into |CSSNumericValue|s with no unit.
    */
    createCSSRGBAValue: function (red, green, blue, alpha) {
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
      if (typeof (alpha) == "number") {
        alpha = new cx.fam.suika.y2005.CSS.Value.NumericValue
                  (alpha, null, null, null);
      }
      return new cx.fam.suika.y2005.CSS.Value.RGBAValue (red, green, blue, alpha);
    },
    
    /**
       Creates a CSS HSL color value.
       
       @param hue        The hue value.
       @param saturation The saturation value.
       @param lightness  The lightness value.
       
       For ECMAScript binding, |Number| type values can be used
       as parameters as well as |CSSNumericValue| objects.  They
       are converted into |CSSNumericValue|s with no unit or of percentage.
    */
    createCSSHSLValue: function (hue, saturation, lightness) {
      if (typeof (hue) == "number") {
        hue = new cx.fam.suika.y2005.CSS.Value.NumericValue (hue, null, null, null);
      }
      if (typeof (saturation) == "number") {
        saturation = new cx.fam.suika.y2005.CSS.Value.NumericValue
                  (saturation, null, null, "%");
      }
      if (typeof (lightness) == "number") {
        lightness = new cx.fam.suika.y2005.CSS.Value.NumericValue
                  (lightness, null, null, "%");
      }
      return new cx.fam.suika.y2005.CSS.Value.HSLValue (hue, saturation, lightness);
    },
    
    /**
       Creates a CSS HSLA color value.
       
       @param hue        The hue value.
       @param saturation The saturation value.
       @param lightness  The lightness value.
       @param alpha      The alpha value.
       
       For ECMAScript binding, |Number| type values can be used
       as parameters as well as |CSSNumericValue| objects.  They
       are converted into |CSSNumericValue|s with no unit or of percentage.
    */
    createCSSHSLAValue: function (hue, saturation, lightness, alpha) {
      if (typeof (hue) == "number") {
        hue = new cx.fam.suika.y2005.CSS.Value.NumericValue (hue, null, null, null);
      }
      if (typeof (saturation) == "number") {
        saturation = new cx.fam.suika.y2005.CSS.Value.NumericValue
                  (saturation, null, null, "%");
      }
      if (typeof (lightness) == "number") {
        lightness = new cx.fam.suika.y2005.CSS.Value.NumericValue
                  (lightness, null, null, "%");
      }
      if (typeof (alpha) == "number") {
        alpha = new cx.fam.suika.y2005.CSS.Value.NumericValue
                  (alpha, null, null, null);
      }
      return new cx.fam.suika.y2005.CSS.Value.HSLAValue
               (hue, saturation, lightness, alpha);
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
           (/([\u0000-\u002C\u002E\u002F\u003A-\u0040\u005B-\u005E\u0080\u007B-\u007F]|^[0-9]|^-$)/g,
            function (c) {
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


/**
   Returns whether the type of the value matches to a type or not.
   
   A type URI matches to the type of the value if:
     - it is literally equal to the type URI of the value, or
     - it is a superset of the type of the value, e.g.
       the given type URI identifies <length> type and
       the value is an |em|-united one.

  The set of supported type URIs includes...
    - <tag:manakai@suika.fam.cx,2005-11:integer>
    - <tag:manakai@suika.fam.cx,2005-11:number>
    - <tag:manakai@suika.fam.cx,2005-11:non-negative-integer>
    - <tag:manakai@suika.fam.cx,2005-11:non-negative-number>
    - <tag:manakai@suika.fam.cx,2005-11:percentage>
    - <tag:manakai@suika.fam.cx,2005-11:length>
    - <tag:manakai@suika.fam.cx,2005-11:relative-length>
    - <tag:manakai@suika.fam.cx,2005-11:absolute-length>
    - <tag:manakai@suika.fam.cx,2005-11:absolute-length-or-px>
    - <tag:manakai@suika.fam.cx,2005-11:length-or-percentage>
    - <tag:manakai@suika.fam.cx,2005-11:angle>
    - <tag:manakai@suika.fam.cx,2005-11:time>
    - <tag:manakai@suika.fam.cx,2005-11:frequency>
    - <tag:manakai@suika.fam.cx,2005-11:string>
    - <tag:manakai@suika.fam.cx,2005-11:color>
    - <tag:manakai@suika.fam.cx,2005-11:inheritance>
  ... as well as URIs used in |typeURI| attribute.
*/
cx.fam.suika.y2005.CSS.Value.Value.prototype.matchTypeURI =
function (typeURI) {
  return (this.getTypeURI () == typeURI);
};

/**
   The URI that identifies the type of the value, that is:
     - <tag:manakai@suika.fam.cx,2005-11:NUMBER> for a number, including
       unitless zero.
     - <tag:manakai@suika.fam.cx,2005-11:PERCENTAGE> for a percentage.
     - <tag:manakai@suika.fam.cx,2005-11:DIMENSION> for a united number.
     - <tag:manakai@suika.fam.cx,2005-11:STRING> for a string.
     - <tag:manakai@suika.fam.cx,2005-11:IDENT> for a keyword, including |inherit|.
     - <tag:manakai@suika.fam.cx,2005-11:FUNCTION> for a functional value,
       including |url|.
     - <tag:manakai@suika.fam.cx,2005-11:VALUE_LIST> for a value list.
     - <tag:manakai@suika.fam.cx,2005-11:UNKNOWN> for an unknown value.
*/
cx.fam.suika.y2005.CSS.Value.Value.prototype.getTypeURI = function () {
  return "tag:manakai@suika.fam.cx,2005-11:CUSTOM";
};

cx.fam.suika.y2005.CSS.Value.Value.prototype.toString = function () {
  return "[object CSSValue]";
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

/**
   The type of primitive value.
   [DOM Level 2 CSS]
*/
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
  this.namespaceURI = nsuri;
  this.prefix = pfx;
  this.localName = lname;
};
cx.fam.suika.y2005.CSS.Value.NumericValue.inherits
  (cx.fam.suika.y2005.CSS.Value.PrimitiveValue);

cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getPrimitiveType = function () {
  if (this.namespaceURI == "urn:x-suika-fam-cx:css:") {
    switch (this.localName) {
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
  } else if (this.namespaceURI == null && this.localName == "%") {
    return this.CSS_PERCENTAGE;
  } else {
    return this.CSS_DIMENSION;
  }
};

cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getTypeURI = function () {
  if (this.namespaceURI != null) {
    return "tag:manakai@suika.fam.cx,2005-11:DIMENSION";
  } else if (this.localName == "%") {
    return "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE";
  } else { /* unitless */
    return "tag:manakai@suika.fam.cx,2005-11:NUMBER";
  }
};

cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.matchTypeURI =
function (typeURI) {
  if (this.namespaceURI != null) {
    switch (this.namespaceURI + this.localName) {
    case "urn:x-suika-fam-cx:css:em":
    case "urn:x-suika-fam-cx:css:ex":
    case "urn:x-suika-fam-cx:css:gd":
    case "urn:x-suika-fam-cx:css:rem":
    case "urn:x-suika-fam-cx:css:vw":
    case "urn:x-suika-fam-cx:css:vh":
    case "urn:x-suika-fam-cx:css:vm":
      switch (typeURI) {
      case "tag:manakai@suika.fam.cx,2005-11:length":
      case "tag:manakai@suika.fam.cx,2005-11:length-or-percentage":
      case "tag:manakai@suika.fam.cx,2005-11:relative-length":
      case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        return true;
      default:
        return false;
      }
    case "urn:x-suika-fam-cx:css:px":
      switch (typeURI) {
      case "tag:manakai@suika.fam.cx,2005-11:length":
      case "tag:manakai@suika.fam.cx,2005-11:length-or-percentage":
      case "tag:manakai@suika.fam.cx,2005-11:relative-length":
      case "tag:manakai@suika.fam.cx,2005-11:absolute-length-or-percentage":
      case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        return true;
      default:
        return false;
      }
    case "urn:x-suika-fam-cx:css:in":
    case "urn:x-suika-fam-cx:css:cm":
    case "urn:x-suika-fam-cx:css:mm":
    case "urn:x-suika-fam-cx:css:pt":
    case "urn:x-suika-fam-cx:css:pc":
      switch (typeURI) {
      case "tag:manakai@suika.fam.cx,2005-11:length":
      case "tag:manakai@suika.fam.cx,2005-11:length-or-percentage":
      case "tag:manakai@suika.fam.cx,2005-11:absolute-length":
      case "tag:manakai@suika.fam.cx,2005-11:absolute-length-or-percentage":
      case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        return true;
      default:
        return false;
      }
    case "urn:x-suika-fam-cx:css:deg":
    case "urn:x-suika-fam-cx:css:grad":
    case "urn:x-suika-fam-cx:css:rad":
    case "urn:x-suika-fam-cx:css:turn":
      switch (typeURI) {
      case "tag:manakai@suika.fam.cx,2005-11:angle":
      case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        return true;
      default:
        return false;
      }
    case "urn:x-suika-fam-cx:css:ms":
    case "urn:x-suika-fam-cx:css:s":
      switch (typeURI) {
      case "tag:manakai@suika.fam.cx,2005-11:time":
      case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        return true;
      default:
        return false;
      }
    case "urn:x-suika-fam-cx:css:hz":
    case "urn:x-suika-fam-cx:css:khz":
      switch (typeURI) {
      case "tag:manakai@suika.fam.cx,2005-11:frequency":
      case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        return true;
      default:
        return false;
      }
    default:
      switch (typeURI) {
      case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        return true;
      default:
        return false;
      }
    }
  } else if (this.localName == "%") {
    switch (typeURI) {
    case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
    case "tag:manakai@suika.fam.cx,2005-11:percentage":
    case "tag:manakai@suika.fam.cx,2005-11:length-or-percentage":
      return true;
    default:
      return false;
    }
  } else { /* unitless */
    switch (typeURI) {
    case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
    case "tag:manakai@suika.fam.cx,2005-11:number":
      return true;
    case "tag:manakai@suika.fam.cx,2005-11:length":
    case "tag:manakai@suika.fam.cx,2005-11:length-or-percentage":
    case "tag:manakai@suika.fam.cx,2005-11:absolute-length":
    case "tag:manakai@suika.fam.cx,2005-11:relative-length":
      return (this.value == 0);
    case "tag:manakai@suika.fam.cx,2005-11:integer":
      return (this.value % 1 == 0);
    case "tag:manakai@suika.fam.cx,2005-11:non-negative-integer":
      return (this.value % 1 == 0 && this.value >= 0);
    case "tag:manakai@suika.fam.cx,2005-11:non-negative-number":
      return (this.value >= 0);
    default:
      return false;
    }
  }
};

/**
   The unit expanded URI, |%|, or |null| if no unit.
*/
cx.fam.suika.y2005.CSS.Value.NumericValue.prototype.getUnitExpandedURI = function () {
  if (this.localName != null) {
    return this.namespaceURI + this.localName;
  } else if (this.namespaceURI == null) {
    return this.localName;
  } else {
    return null;
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
  if (this.namespaceURI != null) {
    r += cx.fam.suika.y2005.CSS.Value._EscapeIdent (this.getUnitName ());
  } else if (this.localName == "%") {
    r += "%";
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

cx.fam.suika.y2005.CSS.Value.StringValue.prototype.getTypeURI = function () {
  return "tag:manakai@suika.fam.cx,2005-11:STRING";
};

cx.fam.suika.y2005.CSS.Value.StringValue.prototype.matchTypeURI =
function (typeURI) {
  return (typeURI.toLowerCase () == "tag:manakai@suika.fam.cx,2005-11:string");
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
                             function (c) { return "\\" + c })
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
  if (this.namespaceURI + this.localName == "urn:x-suika-fam-cx:css:inherit") {
    return undefined;
  } else {
    return this.CSS_IDENT;
  }
};

cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getTypeURI = function () {
  return "tag:manakai@suika.fam.cx,2005-11:IDENT";
};

cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.matchTypeURI =
function (typeURI) {
  switch (this.namespaceURI + this.localName) {
  case "urn:x-suika-fam-cx:css:inherit":
  case "http://suika.fam.cx/~wakaba/archive/2005/cssc.initial":
    switch (typeURI) {
    case "tag:manakai@suika.fam.cx,2005-11:inheritance":
    case "tag:manakai@suika.fam.cx,2005-11:IDENT":
      return true;
    default:
      return false;
    }
  default:
    if (typeURI == "tag:manakai@suika.fam.cx,2005-11:IDENT") {
      return true;
    } else {
      return false;
    }
  }
};

/**
   The expanded URI of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getExpandedURI = function () {
  return this.namespaceURI + this.localName;
};

/**
   The local name of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getLocalName = function () {
  return this.localName;
};

/**
   The name of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getName = function () {
  if (this.namespaceURI == "urn:x-suika-fam-cx:css:") {
    return this.localName;
  } else {
    return "-" + this.prefix + "-" + this.localName;
  }
};

/**
   The namespace URI of the identifier.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getNamespaceURI = function () {
  return this.namespaceURI;
};

/**
   The namespace prefix of the identifier, or |null| if no prefix.
*/
cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getPrefix = function () {
  return this.prefix;
};

cx.fam.suika.y2005.CSS.Value.IdentValue.prototype.getCSSText = function () {
  return cx.fam.suika.y2005.CSS.Value._EscapeIdent (this.getName ());
};
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

cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getTypeURI = function () {
  return "tag:manakai@suika.fam.cx,2005-11:FUNCTION";
};

cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.matchTypeURI =
function (typeURI) {
  return (typeURI == "tag:manakai@suika.fam.cx,2005-11:FUNCTION");
};

/**
   The function name expanded URI.
*/
cx.fam.suika.y2005.CSS.Value.FunctionValue.prototype.getFunctionExpandedURI =
function () {
  return this.functionNamespaceURI + this.functionLocalName;
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
                             function (c) { return "\\" + c })
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

cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.matchTypeURI =
function (typeURI) {
  switch (typeURI) {
  case "tag:manakai@suika.fam.cx,2005-11:color":
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    return true;
  default:
    return false;
  }
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


cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.getCSSText = function () {
  return 'rgb('
       + this.red.getCSSText () + ", "
       + this.green.getCSSText () + ", "
       + this.blue.getCSSText ()
       + ')';
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.RGBValue.prototype.toString = function () {
  return "[object CSSRGBValue]";
};


/**
   Interface |CSSRGBAValue| extends |CSSRGBValue|
*/
cx.fam.suika.y2005.CSS.Value.RGBAValue = function (r, g, b, a) {
  cx.fam.suika.y2005.CSS.Value.FunctionValue.apply
    (this, ["urn:x-suika-fam-cx:css:", null, "rgba"]);
  this.red = r;
  this.green = g;
  this.blue = b;
  this.alpha = a;
};
cx.fam.suika.y2005.CSS.Value.RGBAValue.inherits
  (cx.fam.suika.y2005.CSS.Value.RGBValue);

cx.fam.suika.y2005.CSS.Value.RGBAValue.prototype.getPrimitiveType = function () {
  return this.CSS_UNKNOWN;
};

/**
   The alpha value.
   [non-standard]
*/
cx.fam.suika.y2005.CSS.Value.RGBAValue.prototype.getAlpha = function () {
  return this.alpha;
};
cx.fam.suika.y2005.CSS.Value.RGBAValue.prototype.setAlpha = function (newValue) {
  this.alpha = newValue;
};

cx.fam.suika.y2005.CSS.Value.RGBAValue.prototype.getCSSText = function () {
  return 'rgba('
       + this.red.getCSSText () + ", "
       + this.green.getCSSText () + ", "
       + this.blue.getCSSText () + ", "
       + this.alpha.getCSSText ()
       + ')';
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.RGBAValue.prototype.toString = function () {
  return "[object CSSRGBAValue]";
};


/**
   Interface |CSSHSLValue|
*/
cx.fam.suika.y2005.CSS.Value.HSLValue = function (h, s, l) {
  cx.fam.suika.y2005.CSS.Value.HSLValue._superclass.apply
    (this, ["urn:x-suika-fam-cx:css:", null, "hsl"]);
  this.hue = h;
  this.saturation = s;
  this.lightness = l;
};
cx.fam.suika.y2005.CSS.Value.HSLValue.inherits
  (cx.fam.suika.y2005.CSS.Value.FunctionValue);

cx.fam.suika.y2005.CSS.Value.HSLValue.prototype.matchTypeURI =
function (typeURI) {
  switch (typeURI) {
  case "tag:manakai@suika.fam.cx,2005-11:color":
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    return true;
  default:
    return false;
  }
};

/**
   The hue value.
*/
cx.fam.suika.y2005.CSS.Value.HSLValue.prototype.getHue = function () {
  return this.hue;
};

/**
   The saturation value.
*/
cx.fam.suika.y2005.CSS.Value.HSLValue.prototype.getSaturation = function () {
  return this.saturation;
};

/**
   The lightness value.
*/
cx.fam.suika.y2005.CSS.Value.HSLValue.prototype.getLightness = function () {
  return this.lightness;
};


cx.fam.suika.y2005.CSS.Value.HSLValue.prototype.getCSSText = function () {
  return 'hsl('
       + this.hue.getCSSText () + ", "
       + this.saturation.getCSSText () + ", "
       + this.lightness.getCSSText ()
       + ')';
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.HSLValue.prototype.toString = function () {
  return "[object CSSHSLValue]";
};


/**
   Interface |CSSHSLAValue| extends |CSSHSLValue|
*/
cx.fam.suika.y2005.CSS.Value.HSLAValue = function (h, s, l, a) {
  cx.fam.suika.y2005.CSS.Value.FunctionValue.apply
    (this, ["urn:x-suika-fam-cx:css:", null, "hsla"]);
  this.hue = h;
  this.saturation = s;
  this.lightness = l;
  this.alpha = a;
};
cx.fam.suika.y2005.CSS.Value.HSLAValue.inherits
  (cx.fam.suika.y2005.CSS.Value.HSLValue);

/**
   The alpha value.
*/
cx.fam.suika.y2005.CSS.Value.HSLAValue.prototype.getAlpha = function () {
  return this.alpha;
};
cx.fam.suika.y2005.CSS.Value.HSLAValue.prototype.setAlpha = function (newValue) {
  this.alpha = newValue;
};

cx.fam.suika.y2005.CSS.Value.HSLAValue.prototype.getCSSText = function () {
  return 'hsla('
       + this.hue.getCSSText () + ", "
       + this.saturation.getCSSText () + ", "
       + this.lightness.getCSSText () + ", "
       + this.alpha.getCSSText ()
       + ')';
};
/* Not implemented: |setCSSText| */

cx.fam.suika.y2005.CSS.Value.HSLAValue.prototype.toString = function () {
  return "[object CSSHSLAValue]";
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

cx.fam.suika.y2005.CSS.Value.ValueList.prototype.getTypeURI = function () {
  return "tag:manakai@suika.fam.cx,2005-11:VALUE_LIST";
};

cx.fam.suika.y2005.CSS.Value.ValueList.prototype.matchTypeURI = function (typeURI) {
  return (typeURI == "tag:manakai@suika.fam.cx,2005-11:VALUE_LIST");
};

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
