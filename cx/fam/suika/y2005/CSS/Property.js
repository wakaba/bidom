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
if (typeof (cx.fam.suika.y2005.CSS.Property) == "undefined") {
  cx.fam.suika.y2005.CSS.Property = {};
}

JSAN.require ("cx.fam.suika.y2005.CSS.Value");
JSAN.require ("cx.fam.suika.y2005.DOM.Node");

cx.fam.suika.y2005.DOM.Node.Element._AddFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/CSS/Property#", "1.0", {
    _GetComputedValueSetForMedia: function (mediaManager) {
      return this._Node._ComputedStyle;
    },
    _SetComputedValueSetForMedia: function (propSet, mediaManager) {
      this._Node._ComputedStyle = propSet;
    }
    /* TODO: |mediaManager| support */
  });

/**
   Interface |CSSPropertyValueComputer|

Literal   :  |supported|  |unsupported|  |invalid|  |ill@formed|
<(tokenization)>
Tokenized :  |supported|  |unsupported|  |invalid|  |ill| |formed|
<parseValueFromTokens>
Declared0 :  "supported"  "unsupported"  "invalid"  null
                                         or null
<setDeclaredValue> <convertToDeclaredValue> <isValidValue>
Declared1 :  "supported"  "unsupported"  null       N/A
<isSupportedValue>
Specified :  "supported"  N/A            N/A        N/A



|textual representation|
"CSSValue object"
*/
cx.fam.suika.y2005.CSS.Property.Computer =
function (uaStyleSheetList, userStyleSheetList) {
  this.userAgentStyleSheetList = uaStyleSheetList != null
    ? uaStyleSheetList
    : new cx.fam.suika.y2005.CSS.StyleSheetList ();
  this.userStyleSheetList = userStyleSheetList != null
    ? userStyleSheetList
    : new cx.fam.suika.y2005.CSS.StyleSheetList ();
};

/**
   The list of the user agent style sheets.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype.getUserAgentStyleSheetList =
function () {
  return this.userAgentStyleSheetList;
};
cx.fam.suika.y2005.CSS.Property.Computer.prototype.setUserAgentStyleSheetList =
function (newValue) {
  this.userAgentStyleSheetList = newValue;
};

/**
   The list of the user style sheets.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype.getUserStyleSheetList =
function () {
  return this.userStyleSheetList;
};
cx.fam.suika.y2005.CSS.Property.Computer.prototype.setUserStyleSheetList =
function (newValue) {
  this.userStyleSheetList = newValue;
};

cx.fam.suika.y2005.CSS.Property.Computer.prototype._UpdateComputedValueForMedia =
function (authorStyleSheetList, rootElement, mediaManager) {
  /* Gets enabled top-level style sheets */
  var uass = this._GetEnabledCSSStyleSheets
               (this.userAgentStyleSheetList, mediaManager);
  var auss = this._GetEnabledCSSStyleSheets
               (authorStyleSheetList, mediaManager);
  var usss = this._GetEnabledCSSStyleSheets (this.userStyleSheetList, mediaManager);

  var propList =
      [
       ["urn:x-suika-fam-cx:css:", "clear"],
       ["urn:x-suika-fam-cx:css:", "direction"],
       ["http://suika.fam.cx/~wakaba/archive/2005/11/css.", "display-model"],
       ["http://suika.fam.cx/~wakaba/archive/2005/11/css.", "display-role"],
       ["urn:x-suika-fam-cx:css:", "float"],
       ["urn:x-suika-fam-cx:css:", "unicode-bidi"],
       ["urn:x-suika-fam-cx:css:", "overflow-x"],
       ["urn:x-suika-fam-cx:css:", "overflow-y"], /* after |overflow-x| */
       ["http://suika.fam.cx/~wakaba/archive/2005/11/css.", "scroller"],
       ["urn:x-suika-fam-cx:css:", "visibility"],
       ["urn:x-suika-fam-cx:css:", "z-index"],
       ["urn:x-suika-fam-cx:css:", "list-style-type"],
       ["urn:x-suika-fam-cx:css:", "list-style-image"],
       ["urn:x-suika-fam-cx:css:", "list-style-position"],
       ["urn:x-suika-fam-cx:css:", "page-break-after"],
       ["urn:x-suika-fam-cx:css:", "page-break-before"],
       ["urn:x-suika-fam-cx:css:", "page-break-inside"],
       ["urn:x-suika-fam-cx:css:", "orphans"],
       ["urn:x-suika-fam-cx:css:", "widows"],
       ["urn:x-suika-fam-cx:css:", "background-image"],
       ["urn:x-suika-fam-cx:css:", "background-repeat"],
       ["urn:x-suika-fam-cx:css:", "background-attachment"],
       ["urn:x-suika-fam-cx:css:", "font-style"],
       ["urn:x-suika-fam-cx:css:", "font-variant"],
       ["urn:x-suika-fam-cx:css:", "font-weight"],
       
       /* <length> - after |font-size| */
       ["urn:x-suika-fam-cx:css:", "height"],
       ["urn:x-suika-fam-cx:css:", "width"],
       ["urn:x-suika-fam-cx:css:", "min-height"],
       ["urn:x-suika-fam-cx:css:", "min-width"],
       ["urn:x-suika-fam-cx:css:", "max-height"],
       ["urn:x-suika-fam-cx:css:", "max-width"],
       ["urn:x-suika-fam-cx:css:", "line-height"],
       ["urn:x-suika-fam-cx:css:", "vertical-align"],
       ["urn:x-suika-fam-cx:css:", "top"],
       ["urn:x-suika-fam-cx:css:", "bottom"],
       ["urn:x-suika-fam-cx:css:", "left"],
       ["urn:x-suika-fam-cx:css:", "right"],
       ["urn:x-suika-fam-cx:css:", "padding-bottom"],
       ["urn:x-suika-fam-cx:css:", "padding-left"],
       ["urn:x-suika-fam-cx:css:", "padding-right"],
       ["urn:x-suika-fam-cx:css:", "padding-top"],
       ["urn:x-suika-fam-cx:css:", "margin-bottom"],
       ["urn:x-suika-fam-cx:css:", "margin-left"],
       ["urn:x-suika-fam-cx:css:", "margin-right"],
       ["urn:x-suika-fam-cx:css:", "margin-top"],
       ["http://suika.fam.cx/~wakaba/archive/2005/11/css.", "background-position-x"],
       ["http://suika.fam.cx/~wakaba/archive/2005/11/css.", "background-position-y"],
       
       ["urn:x-suika-fam-cx:css:", "position"],
         /* after |top|, |bottom|, |right|, |left|, |direction| */
       ["http://suika.fam.cx/~wakaba/archive/2005/11/css.props.", "display"],
         /* after |display|, |position|, and |float| */
      
       ["urn:x-suika-fam-cx:css:", "color"],
       
       ["urn:x-suika-fam-cx:css:", "border-bottom-color"],
       ["urn:x-suika-fam-cx:css:", "border-left-color"],
       ["urn:x-suika-fam-cx:css:", "border-right-color"],
       ["urn:x-suika-fam-cx:css:", "border-top-color"],
       ["urn:x-suika-fam-cx:css:", "background-color"],
         /* after |color| */
         
       ["urn:x-suika-fam-cx:css:", "border-bottom-style"],
       ["urn:x-suika-fam-cx:css:", "border-left-style"],
       ["urn:x-suika-fam-cx:css:", "border-right-style"],
       ["urn:x-suika-fam-cx:css:", "border-top-style"],
       
       ["urn:x-suika-fam-cx:css:", "border-bottom-width"],
       ["urn:x-suika-fam-cx:css:", "border-left-width"],
       ["urn:x-suika-fam-cx:css:", "border-right-width"],
       ["urn:x-suika-fam-cx:css:", "border-top-width"],
         /* after |font-size| and |border-*-style| */
       
       ["urn:x-suika-fam-cx:css:", "opacity"]
      ]; /* mediaManager._GetSupportedPropertyNameList */

  /* Prepares a property set initially containing initial values */
  var initialValueSet = new cx.fam.suika.y2005.CSS.Property.PropertySet ();
  this._SetInitialValues (propList, initialValueSet);

  /* For each elements (in depth first order), ... */
  var els = [[rootElement]];
  while (els.length > 0) {
    var el = els.pop ();
    
    /* Gets a set of rule sets applied to an element */
    var uadecls = this._GetStyleDeclarationsForElement (uass, el[0], mediaManager);
    var audecls = this._GetStyleDeclarationsForElement (auss, el[0], mediaManager);
    /* TODO: inline and override style sheets support */
    var usdecls = this._GetStyleDeclarationsForElement (usss, el[0], mediaManager);
  
    /* TODO: pseudo element support */
    uadecls = uadecls[""] != null ? uadecls[""][1] : [];
    audecls = audecls[""] != null ? audecls[""][1] : [];
    usdecls = usdecls[""] != null ? usdecls[""][1] : [];
    
    /* Gets a set of computed values for an element */
    var propSet = initialValueSet.clone ();
    this._GetCascadedValueSet (uadecls, usdecls, audecls, [], mediaManager, propSet);
    this._ComputeSpecifiedValue (propList, el[1], propSet, mediaManager);
    this._ComputeComputedValue (propList, el[1], propSet, el[0]);
    el[0]._SetComputedValueSetForMedia (propSet, mediaManager);
    
    /* For children... */
    var elcs = el[0].getChildNodes ();
    var elcsl = elcs.getLength ();
    for (var i = 0; i < elcsl; i++) {
      var elc = elcs.item (i);
      if (elc.getNodeType () == elc.ELEMENT_NODE) {
        els.push ([elc, propSet]);
      }
      /* Note.  Entity reference nodes are not supported. */
    }
  }
};

/**
   Creates a style sheet list consists of all enabled CSS top-level style sheets
   for a media from a style sheet list.
   
   @param styleSheetList    A source list of style sheets.
   @param mediaManager      A media manager to which media queries are issued.
   @return A |StyleSheetList| object.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._GetEnabledCSSStyleSheets =
function (styleSheetList, mediaManager) {
  var r = new cx.fam.suika.y2005.CSS.StyleSheetList ();
  var l = styleSheetList.getLength ();
  for (var i = 0; i < l; i++) {
    var s = styleSheetList.item (i);
    if (!s.getDisabled () && s.getType () == "text/css") {
      /* TODO: Media query support */
      r.addStyleSheet (s);
    }
  }
  return r;
};

/**
   Returns a set of declaration blocks applied to an element or a pseudo element
   generated for the element.
   
   @param styleSheetList  A style sheet list from which rule sets are find.
   @param elementNode     An element node, for which selectors are matched.
   @param mediaMatch      A media manager to which media queries are issued.
   @return An associative array whose keys are hash key obtained by
           |_GetPseudoElementHashKey| method on selectors.  Each value
           is an array with two items: pseudo element selector object
           and another array.  The array in turn contain arrays consist of declaration
           block (|CSSStyleDeclaration|), its specificity, and
           an integer that can be used to sort the array without losting
           its items' original order.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._GetStyleDeclarationsForElement =
function (styleSheetList, elementNode, mediaManager) {
  var r = {};
  var i = 0;
  
  var styleSheetListLength = styleSheetList.getLength ();
  for (var j = 0; j < styleSheetListLength; j++) {
    var rules = styleSheetList.item (j).getCSSRules ();
    var rulesLength = rules.getLength ();
    for (var k = 0; k < rulesLength; k++) {
      var rule = rules.item (k);
      RT: switch (rule.getType ()) {
      case rule.STYLE_RULE:
        var selGroup = rule.getSelectorObject ();
        var selGroupLength = selGroup.getLength ();
        for (var l = 0; l < selGroupLength; l++) {
          var sel = selGroup.item (l);
          if (sel.matchElement (elementNode)) {
            var selPE = sel.getPseudoElements ();
            var key = selPE._GetPseudoElementHashKey ();
            if (!r[key]) r[key] = [selPE, []];
            r[key][1].push ([rule.getStyle (), sel.getSpecificity (), i++]);
          }
        } /* selector */
        break RT;
      case rule.MEDIA_RULE:
        /* TODO: implement */
        break RT;
      case rule.IMPORT_RULE:
        /* TODO: implement */
        break RT;
      } /* RT */
    } /* styleSheet.cssRules */
  } /* styleSheetList */
  return r;
};

/**
   Sets initial values of properties to a property set.
   
   @param propList  An array that contains arrays of namespace URI and
                    local name pairs, which indicates what properties should
                    be set their specified values.  Note that the order
                    is *not* significant for this method.
   @param propSet   A property set.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._SetInitialValues =
function (propList, propSet) {
  for (var i in propList) {
    var pn = propList[i];
    if (pn[0] == "http://suika.fam.cx/~wakaba/archive/2005/11/css.props.") {
      /* Dummy properties */
      continue;
    } else {
      var propDef = cx.fam.suika.y2005.CSS.Property.getPropertyDefinition
                      (pn[0], pn[1]);
      propSet.setPropertyValueNS
          (pn[0], propDef.prefix, pn[1], propDef.initialValue);
    }
  }
};

/**
   Returns a set of cascaded property values.  This method
   receives four inputs of |_GetStyleDeclarationsForElement|'s result format
   and returns a |CSSPropertyDeclaration| object.
   
   @param userAgentDeclarations  A list of declarations from user agent style sheets.
   @param userDeclarations       A list of declarations from user style sheets.
   @param authorDeclarations     A list of declarations from author style sheets.
   @param overrideDeclarations   A list of declarations from override style sheets.
   @param renderingEngine        The layout engine for which the cascaded value
                                 is computed.  It is expected that the engine
                                 provides information on whether a particular
                                 value, e.g. |rgba()| is supported in the engine
                                 or not.  If a declared value is not supported,
                                 then the value is ignored as per the forward
                                 compatible rule of CSS.
   @param propSet                The property set to which properties are set.
   @return                       |propSet|.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._GetCascadedValueSet =
function (userAgentDeclarations, userDeclarations,
          authorDeclarations, overrideDeclarations, renderingEngine, propSet) {
  var props1 = [];
  var props2 = [];
  var props3 = [];
  var cmps = function (a, b) {
    var c = a[1].compareSpecificity (b[1]);  /* Selector specificity order */
    if (c == 0) {
      return a[2] - b[2];                    /* Occurence order */
    } else {
      return c;
    }
  };
  
  var important = new cx.fam.suika.y2005.CSS.Value.IdentValue
                        ("urn:x-suika-fam-cx:css:", null, "important");

  userAgentDeclarations = userAgentDeclarations.sort (cmps);
  for (var i in userAgentDeclarations) {
    var decls = userAgentDeclarations[i][0];
    var propnames = decls.getSpecifiedPropertyNameList ();
    for (var k in propnames) {
      var propname = propnames[k];
      var vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], null);
      for (var j = 0; j < vals.length; j++) {
        props1.push ([propname, vals[j]]);
      }
      vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], important);
      for (var j = 0; j < vals.length; j++) {
        props2.push ([propname, vals[j]]);
      }
    }
  }
  for (var i = 0; i < props2.length; i++) { props1.push (props2[i]) }

  userDeclarations = userDeclarations.sort (cmps);
  for (var i in userDeclarations) {
    var decls = userDeclarations[i][0];
    var propnames = decls.getSpecifiedPropertyNameList ();
    for (var k in propnames) {
      var propname = propnames[k];
      var vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], null);
      for (var j = 0; j < vals.length; j++) {
        props1.push ([propname, vals[j]]);
      }
      vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], important);
      for (var j = 0; j < vals.length; j++) {
        props3.push ([propname, vals[j]]);
      }
    }
  }

  authorDeclarations = authorDeclarations.sort (cmps);
  for (var i in authorDeclarations) {
    var decls = authorDeclarations[i][0];
    var propnames = decls.getSpecifiedPropertyNameList ();
    for (var k in propnames) {
      var propname = propnames[k];
      var vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], null);
      for (var j = 0; j < vals.length; j++) {
        props1.push ([propname, vals[j]]);
      }
      vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], important);
      for (var j = 0; j < vals.length; j++) {
        props2.push ([propname, vals[j]]);
      }
    }
  }

  overrideDeclarations = overrideDeclarations.sort (cmps);
  for (var i in overrideDeclarations) {
    var decls = overrideDeclarations[i][0];
    var propnames = decls.getSpecifiedPropertyNameList ();
    for (var k in propnames) {
      var propname = propnames[k];
      var vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], null);
      for (var j = 0; j < vals.length; j++) {
        props1.push ([propname, vals[j]]);
      }
      vals = decls.getSpecifiedPropertyValuesNS (propname[0], propname[2], important);
      for (var j = 0; j < vals.length; j++) {
        props2.push ([propname, vals[j]]);
      }
    }
  }
  
  for (var i = 0; i < props2.length; i++) { props1.push (props2[i]) }
  for (var i = 0; i < props3.length; i++) { props1.push (props3[i]) }
  for (var i in props1) {
    var prop = props1[i];
    /* TODO: Query |mediaManager| to set value or not */
    propSet.setPropertyValueNS (prop[0][0], prop[0][1], prop[0][2], prop[1]);
  }
  return propSet;
};

/**
   Computes specified value of properties.
   
       Note.  In some properties their initial values are defined as 
              the computed value of another property.  This method
              fill properties by special values
              (e.g. |-manakai_c-left-or-right-by-direction|)
              if such initial values are their specified values.  They
              will be resolved in computed value phase.
   
   @param propList  An array that contains arrays of namespace URI and
                    local name pairs, which indicates what properties should
                    be set their specified values.  Note that the order
                    is *not* significant for this method.
   @param parentPropSet A property set containing computed values of the
                    parent element, if any, or |null|.
   @param propSet   A property set containing cascaded values.
   @param mediaManager A media manager.
                        ISSUE: Is this parameter necessary?
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._ComputeSpecifiedValue =
function (propList, parentPropSet, propSet, mediaManager) {
  for (var i in propList) {
    var pn = propList[i];
    if (pn[0] == "http://suika.fam.cx/~wakaba/archive/2005/11/css.props.") {
      /* Dummy properties */
      continue;
    } else if (propSet.hasSpecifiedPropertyValueNS (pn[0], pn[1])) {
      continue;
    } else {
      var propDef = cx.fam.suika.y2005.CSS.Property.getPropertyDefinition
                      (pn[0], pn[1]);
      if (parentPropSet != null && propDef.inherit) {
        propSet.setPropertyValueNS
          (pn[0], propDef.prefix,
           pn[1], parentPropSet.getSpecifiedPropertyValueNS (pn[0], pn[1]));
      } else {
        // Set by |_SetInitialValues|
        //propSet.setPropertyValueNS
        //  (pn[0], propDef.prefix, pn[1], propDef.initialValue);
      }
    }
  }
};


/**
   Computes computed value of properties.
   
   @param propList  An array that contains arrays of namespace URI and
                    local name pairs, which indicates what properties should
                    be set their specified values.  Note that the order
                    *is* significant for this method.
   @param parentPropSet A property set containing computed values of the
                    parent element, if any, or |null|.
   @param propSet   A property set containing cascaded values.
   @param elementNode The element for which the value is computed.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._ComputeComputedValue =
function (propList, parentPropSet, propSet, elementNode) {
  P: for (var i = 0; i < propList.length; i++) {
    var pn = propList[i];
    var propDef = cx.fam.suika.y2005.CSS.Property.getPropertyDefinition (pn[0], pn[1]);
    var value = propSet.getSpecifiedPropertyValueNS (pn[0], pn[1]);
    propDef.setComputedValue (pn[0], propDef.prefix, pn[1], parentPropSet, propSet,
                              value, elementNode);
  } /* P */
};


/**
   Class |CSSPropertySet| implements |CSSStyleDeclaration|
   
   A |CSSPropertySet| object is a set of CSS property name and value pairs.
   The class does not hold information on shorthand properties,
   dupulicate or unknown (so that ignored) properties, and so on,
   unlike |CSSStyleDeclaration| class in |CSS.Node| module.
*/
cx.fam.suika.y2005.CSS.Property.PropertySet = function () {
  this.v = {};
};

/**
   Creates a clone.
   [non-standard]
   
       Note.  Property values are not cloned but references to thems
              are copied.

   @return  A cloned |CSS.Property.PropertySet|.
*/
cx.fam.suika.y2005.CSS.Property.PropertySet.prototype.clone =
function () {
  var r = new cx.fam.suika.y2005.CSS.Property.PropertySet ();
  for (var i in this.v) {
    r.v[i] = this.v[i];
  }
  return r;
};

/**
   The textual representation of the style declarations, excluding the
   surrounding curly braces.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Property.PropertySet.prototype.getCSSText =
function () {
  var r = "";
  for (var ns in this.v) {
    for (var ln in this.v[ns]) {
      var pv = this.v[ns][ln];
      if (pv == null) continue;
      if (pv.prefix == null) {
        r += "  " + ln;
      } else {
        r += "  -" + pv.prefix + "-" + ln;
      }
      r += ": " + pv.value.getCSSText () + ";\n";
    }
  }
  return r;
};

/**
   Gets a property name prefix.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @return The namespace prefix of the property, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Property.PropertySet.prototype._GetPropertyPrefix =
function (namespaceURI, localName) {
  if (this.v[namespaceURI] && this.v[namespaceURI][localName]) {
    return this.v[namespaceURI][localName].prefix;
  } else {
    return null;
  }
};

/**
   Gets a property value.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @return The |CSSValue| of the property, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Property.PropertySet.prototype.getSpecifiedPropertyValueNS =
function (namespaceURI, localName) {
  if (this.v[namespaceURI] && this.v[namespaceURI][localName]) {
    return this.v[namespaceURI][localName].value;
  } else {
    return null;
  }
};

/**
   Returns whether a property has value or not.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @return |true| or |false|.
*/
cx.fam.suika.y2005.CSS.Property.PropertySet.prototype.hasSpecifiedPropertyValueNS =
function (namespaceURI, localName) {
  if (this.v[namespaceURI] && this.v[namespaceURI][localName]) {
    return true;
  } else {
    return false;
  }
};

/**
   Sets a property value.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param prefix        The namespace prefix of the property.
   @param localName     The local name of the property.
   @param value         The |CSSValue| of the property.
*/
cx.fam.suika.y2005.CSS.Property.PropertySet.prototype.setPropertyValueNS =
function (namespaceURI, prefix, localName, value) {
  if (!this.v[namespaceURI]) this.v[namespaceURI] = [];
  this.v[namespaceURI][localName] = {prefix: prefix, value: value};
};

cx.fam.suika.y2005.CSS.Property.PropertySet.prototype.toString = function () {
  return "[CSSStyleDeclaration]";
};


/**
   Class |CSS.Property.MultiValueSet|
     Implements:
       |CSSStyleDeclaration| [DOM Level 2 CSS] (partially)
       |CSSPropertySet|

   The |CSS.Property.MultiValueSet| is yet another implementation (with
   some extention) of |CSSPropertySet|, which allows a property
   to have more than one values.
       In the declaration block of the CSS style sheet source entity,
   there might be more than one declarations for a property.  Since
   the CSS forward compatible parsing rules is so defined that unknown
   property values are ignored and later declaration wins, it is used
   to specify values for different levels of implementations.  Although
   the current implementation of |CSS.Property.Definition| are intended to
   discard values in unknown syntax and values in known syntax whose
   semantics is not known, the implementation may still encount to the
   value whose semantics is known but cannot be supported because of the
   limitations of the rendering engine.
   
       Note.  The order of values for different properties are not
              preserved while the order in the same property is preserved.

       Note.  This class ensures a value is valid for the property
              before the addition of the value.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet = function () {
  this.v = {};
  this.important = {};
};

/**
   Adds a property value.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param prefix        The namespace prefix of the property.
   @param localName     The local name of the property.
   @param value         The |CSSValue| of the property.  If the value is 
                        invalid for the property, the method invocation has no effect.
   @param priority      The priority object, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype.addPropertyValueNS =
function (namespaceURI, prefix, localName, value, priority) {
  if (!cx.fam.suika.y2005.CSS.Property.getPropertyDefinition (namespaceURI, localName)
         .isValidValue (namespaceURI, localName, value)) {
    return;
  }
  var key = namespaceURI + localName;
  if (this.v[key]) {
    switch (priority ? priority.getExpandedURI ()
                     : "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal") {
    case "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal":
      this.v[key].push (value);
      break;
    case "urn:x-suika-fam-cx:css:important":
      this.important[key].push (value);
      break;
    }
  } else {
    switch (priority ? priority.getExpandedURI ()
                     : "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal") {
    case "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal":
      this.v[key] = [value];
      this.v[key].namespaceURI = namespaceURI;
      this.v[key].prefix = prefix;
      this.v[key].localName = localName;
      this.important[key] = [];
      this.important[key].namespaceURI = namespaceURI;
      this.important[key].prefix = prefix;
      this.important[key].localName = localName;
      break;
    case "urn:x-suika-fam-cx:css:important":
      this.v[key] = [];
      this.v[key].namespaceURI = namespaceURI;
      this.v[key].prefix = prefix;
      this.v[key].localName = localName;
      this.important[key] = [value];
      this.important[key].namespaceURI = namespaceURI;
      this.important[key].prefix = prefix;
      this.important[key].localName = localName;
      break;
    }
  }
};

/**
   The textual representation of the style declarations, excluding the
   surrounding curly braces.
   [DOM Level 2 CSS]
   
   Note that namespace fix up is not done.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype.getCSSText =
function () {
  var r = "";
  P: for (var xuri in this.v) {
    var values = this.v[xuri];
    if (!values) continue P;
    var name = "  ";
    if (values.prefix == null) {
      name += values.localName + ": ";
    } else {
      name += "-" + values.prefix + "-" + values.localName + ": ";
    }
    for (var i = 0; i < values.length; i++) {
      r += name + values[i].getCSSText () + ";\n";
    }
    var values = this.important[xuri];
    for (var i = 0; i < values.length; i++) {
      r += name + values[i].getCSSText () + " !important;\n";
    }
  }
  return r;
};

/**
   Gets a property name prefix.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @return The namespace prefix of the property, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype._GetPropertyPrefix =
function (namespaceURI, localName) {
  if (this.v[namespaceURI + localName]) {
    return this.v[namespaceURI + localName].prefix;
  } else {
    return null;
  }
};

/**
   Returns a snapshot list of namespaceURI, namespace prefix, and local name
   of properties its value is specified in the collection.
   [non-standard]
   
   @return  An |Array| of |Array|s.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet
.prototype.getSpecifiedPropertyNameList = function () {
  var r = [];
  for (var xuri in this.v) {
    if (this.v[xuri].length > 0 || this.important[xuri].length > 0) {
      r.push ([this.v[xuri].namespaceURI, this.v[xuri].prefix,
               this.v[xuri].localName]);
    }
  }
  return r;
};

/**
   Gets a property value.
   [non-standard]
   
   @param expandedURI   The expanded URI of the property.
   @return The |CSSValue| of the property, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet
.prototype.getSpecifiedPropertyValueByExpandedURI =
function (expandedURI) {
  if (this.v[expandedURI]) {
    if (this.important[expandedURI].length > 0) {
      return this.important[expandedURI][this.important[expandedURI].length - 1];
    } else {
      return this.v[expandedURI][this.v[expandedURI].length - 1];
    }
  } else {
    return null;
  }
};

/**
   Gets a property value.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @return The |CSSValue| of the property, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype.getSpecifiedPropertyValueNS =
function (namespaceURI, localName) {
  var key = namespaceURI + localName;
  if (this.v[key]) {
    if (this.important[key].length > 0) {
      return this.important[key][this.important[key].length - 1];
    } else {
      return this.v[key][this.v[key].length - 1];
    }
  } else {
    return null;
  }
};

/**
   Gets an array of the property values.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @param priority      The priority value, if any, or |null|.
   @return The |Array| of the property values.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype.getSpecifiedPropertyValuesNS =
function (namespaceURI, localName, priority) {
  var key = namespaceURI + localName;
  if (this.v[key]) {
    switch (priority ? priority.getExpandedURI ()
                     : "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal") {
    case "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal":
      return this.v[key];
    default:
      return this.important[key];
    }
  } else {
    return [];
  }
};

/**
   Returns whether a property has value or not.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @return |true| or |false|.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype.hasSpecifiedPropertyValueNS =
function (namespaceURI, localName) {
  var key = namespaceURI + localName;
  if (this.v[key]) {
    return (this.v[key].length > 0 || this.important[key].length > 0);
  } else {
    return false;
  }
};

/**
   Sets a property value.  It clears the set of property values before addition.
   [non-standard]
   
   @param namespaceURI  The namespace URI of the property.
   @param prefix        The namespace prefix of the property.
   @param localName     The local name of the property.
   @param value         The |CSSValue| of the property.
   @param priority      The priority object, if any, or |null|.
*/
cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype.setPropertyValueNS =
function (namespaceURI, prefix, localName, value, priority) {
  if (!cx.fam.suika.y2005.CSS.Property.getPropertyDefinition (namespaceURI, localName)
         .isValidValue (namespaceURI, localName, value)) {
    return;
  }
  var key = namespaceURI + localName;
  switch (priority ? priority.getExpandedURI ()
                   : "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal") {
  case "http://suika.fam.cx/~wakaba/archive/2005/cssc.normal":
    this.v[key] = [value];
    this.v[key].namespaceURI = namespaceURI;
    this.v[key].prefix = prefix;
    this.v[key].localName = localName;
    this.important[key] = [];
    this.important[key].namespaceURI = namespaceURI;
    this.important[key].prefix = prefix;
    this.important[key].localName = localName;
    break;
  case "urn:x-suika-fam-cx:css:important":
    this.v[key] = [];
    this.v[key].namespaceURI = namespaceURI;
    this.v[key].prefix = prefix;
    this.v[key].localName = localName;
    this.important[key] = [value];
    this.important[key].namespaceURI = namespaceURI;
    this.important[key].prefix = prefix;
    this.important[key].localName = localName;
    break;
  }
};

cx.fam.suika.y2005.CSS.Property.MultiValueSet.prototype.toString = function () {
  return "[CSSStyleDeclaration]";
};



/**
   Returns the definition of a property, if any, or an empty
   definition for unsupported property.
*/
cx.fam.suika.y2005.CSS.Property.getPropertyDefinition =
function (namespaceURI, localName) {
  if (cx.fam.suika.y2005.CSS.Property.Definition[namespaceURI + localName]) {
    return cx.fam.suika.y2005.CSS.Property.Definition[namespaceURI + localName];
  } else {
    return new cx.fam.suika.y2005.CSS.Property.Definition ({isSupported: true});
  }
};

/**
   Class |CSS.Property.Definition|
   
   A |CSS.Property.Definition| object represents the definition of a property.
*/
cx.fam.suika.y2005.CSS.Property.Definition = function (template) {
  for (var i in template) {
    switch (i) {
    default:
      this[i] = template[i];
    }
  }
  if (typeof (this.validKeyword) == "undefined") this.validKeyword = {};
  if (typeof (this.validKeyword1) == "undefined") this.validKeyword1 = {};
  if (typeof (this.validFunction) == "undefined") this.validFunction = {};
  if (typeof (this.validType) == "undefined") this.validType = {};
  if (typeof (this.validUnit) == "undefined") this.validUnit = {};
  this.validKeyword1["urn:x-suika-fam-cx:css:inherit"] = true;
  this.validKeyword1["urn:x-suika-fam-cx:css:-moz-initial"] = true;
  this.validKeyword1["http://suika.fam.cx/~wakaba/archive/2005/cssc.initial"] = true;
};


/**
   The "well-known" namespace prefix of the property, or |null|
   for properties in the standard namespace.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.prefix = null;

/**
   Whether the property is supported or not.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.isSupported = true;

/**
   Whether the property is a shorthand property in the implementation or not.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.isShorthand = false;

/**
   Whether the property does inherit or not.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.inherit = false;

/**
   The initial value.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.initialValue
  = new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/cssc.",
                    "manakai_c", "user-agent-dependent");

/**
   Parses the property value without priority declaration, from
   the token sequence.
   
       Note.  If the implementation supports the value specified in the
              property declaration, then the method must return a value
              that holds information on the value and the |parser|'s
              head must reference the next token, whose value might be |!|
              introducing the priority declaration for the property,
              to the last token of the property value, if any.  The
              value returned from the method would be passed to
              |setDeclaredValue| method unless the parser is encounted
              to a parse error before the |;|, |}|, or end of the entity that
              terminates the property declaration.  The method may or
              may not discard any value that is syntatically legal but 
              inappropriate or unsupported for the property.  Such values are
              discarded at the time of added to property sets in any way.
                  If the implementation does not support the value specified
              in the property declaration, including cases of parse errors, 
              then the method must return a |null|.  If the method
              returns |null|, the parser would skip until the end of the
              property declaration.

   @param parser         The |CSS.SimpleParser| object that is reached at a
                         property value.
   @param namespaceURI   The namespace URI of the property.
   @param prefix         The namespace prefix of the property, if any, or |null|.
   @param localName      The local name of the property.
   @return A non-|null| value, or |null| indicating parse error.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.parseValueFromTokens =
function (parser, namespaceURI, prefix, localName) {
  return null;
};

/**
   Sets a value or a set of values to a set of properties.  For shorthand
   properties, values must be set to longhand properties.
   
   @param namespaceURI   The namespace URI of the property.
   @param prefix         The namespace prefix of the property, if any, or |null|.
   @param localName      The local name of the property.
   @param propSet        The property set to which the value(s) should be set.
   @param valueSet       The object returned by |parseValueFromTokens| method.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.setDeclaredValue =
function (namespaceURI, prefix, localName, propSet, valueSource, priority) {
  /*
     This template sets the |valueSource| as a property value.
     Unless this method is overridden, the |parseVaueFromTokens| method
     must return a |CSSValue| object valid for the property.
  */
  propSet.addPropertyValueNS
    (namespaceURI, prefix, localName,
     this.convertToDeclaredValue (namespaceURI, localName, valueSource), priority);
  /*
        Note.  Using public methods in |CSS.Property.MultiValueSet|
               ensures that unsupported values are not set and that
               values are normalized in the |propSet|.
  */
};

/**
   Converts a value returned by |parseValueFromTokens| into a |CSSValue|.
   
       Note.  Shorthand properties does not need to implement this method.

   @param namespaceURI   The namespace URI of the property.
   @param localName      The local name of the property.
   @param valueSource    The value returned by |parseValueFromTokens|.
   @return  A |CSSValue|.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.convertToDeclaredValue =
function (namespaceURI, localName, valueSource) {
  return valueSource;
};

/**
   Returns whether a value is valid for the property or not.
   For shorthand properties, it must return a |false|.
   
   @param namespaceURI  The namespace URI of the property.
   @param localName     The local name of the property.
   @param value         The |CSSValue| to test.
   @param partial       Is |value| is part of a property value or not.
                        If |true|, keyword in |propDef.validKeyword1|
                        should be reported as invalid.
   @return |true| or |false|.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.isValidValue =
function (namespaceURI, localName, value) {
  return false;
};

/**
   Sets the computed value of a specified value of the property.
   
   @param namespaceURI  The namespace URI of the property.
   @param prefix        The namespace prefix of the property, if any, or |null|.
   @param localName     The local name of the property.
   @param parentPropSet The parent property set from which the computed value
                        is taken in the case of |inherit| value, if any, or |null|.
   @param propSet       The property set for computed values.  If no
                        new value for the property is set to this set,
                        then the specified value is the computed value.
   @param elementNode   The |Element| for which the value is computed.  If the
                        specified value contains |attr()| function, its value
                        is taken from this node.
   @param value         The specified value.  The |value| comes from
                        the source where it is ensured that the |value|
                        is valid as a specified value of the property.
*/
cx.fam.suika.y2005.CSS.Property.Definition.prototype.setComputedValue =
function (namespaceURI, prefix, localName, parentPropSet, propSet, value,
          elementNode) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    switch (value.getExpandedURI ()) {
    case "urn:x-suika-fam-cx:css:inherit":
      /* CSS2 |inherit| value */
      if (parentPropSet != null) {
        propSet.setPropertyValueNS (namespaceURI, prefix, localName,
                                    parentPropSet.getSpecifiedPropertyValueNS
                                      (namespaceURI, localName));
      } else {
        propSet.setPropertyValueNS (namespaceURI, prefix, localName,
                                    this.initialValue);
      }
      return /* OK */;
    case "http://suika.fam.cx/~wakaba/archive/2005/cssc.initial":
    case "urn:x-suika-fam-cx:css:-moz-initial":
      /* CSS3 |initial| value */
      propSet.setPropertyValueNS (namespaceURI, prefix, localName, this.initialValue);
      return /* OK */;
    }
    break;
  }
  /* unchange */
};


/**
   Class |CSS.Property.Definition_Keyword|
   
   The definition for a property that only allows a set of one keywords.
*/
cx.fam.suika.y2005.CSS.Property.Definition_Keyword = function (template) {
  cx.fam.suika.y2005.CSS.Property.Definition_Keyword._superclass.apply
    (this, [template]);
};
cx.fam.suika.y2005.CSS.Property.Definition_Keyword.inherits
  (cx.fam.suika.y2005.CSS.Property.Definition);

cx.fam.suika.y2005.CSS.Property.Definition_Keyword.prototype.parseValueFromTokens =
function (parser, namespaceURI, prefix, localName) {
  var value = parser._GetNextValue ();
  if (value == null) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return value;
  }
  return null;
};

cx.fam.suika.y2005.CSS.Property.Definition_Keyword.prototype.isValidValue =
function (namespaceURI, localName, value, partial) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return (this.validKeyword[value.getExpandedURI ()] ||
            (!partial && this.validKeyword1[value.getExpandedURI ()]));
    break;
  }
  return false;
};


/**
   Class |CSS.Property.Definition_Length|
   
   The definition for a property that only allows one <length>
   or other dimension.
*/
cx.fam.suika.y2005.CSS.Property.Definition_Length = function (template) {
  cx.fam.suika.y2005.CSS.Property.Definition_Length._superclass.apply
    (this, [template]);
  if (this.validType["tag:manakai@suika.fam.cx,2005-11:length"]) {
    this.validUnit["urn:x-suika-fam-cx:css:em"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:px"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:vw"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:vh"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:vm"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:in"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:cm"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:mm"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:pt"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:pc"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:gd"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:rem"] = true;
    this.validUnit["urn:x-suika-fam-cx:css:ex"] = true;
  }
};
cx.fam.suika.y2005.CSS.Property.Definition_Length.inherits
  (cx.fam.suika.y2005.CSS.Property.Definition);

/**
   Whether negative values are allowed or not.
*/
cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.negativeNotAllowed = false;

cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.parseValueFromTokens =
function (parser, namespaceURI, prefix, localName) {
  var value = parser._GetNextValue ();
  if (value == null) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
  case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
  case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return value;
  }
  return null;
};

cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.isValidValue =
function (namespaceURI, localName, value, partial) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
    if (this.negativeNotAllowed) {
      if (value.getValue () < 0) return false;
    }
    return this.validUnit[value.getUnitExpandedURI ()];
  case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
    if (this.negativeNotAllowed) {
      if (value.getValue () < 0) return false;
    }
    return this.validType["tag:manakai@suika.fam.cx,2005-11:percentage"];
  case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
    if (this.negativeNotAllowed) {
      if (value.getValue () < 0) return false;
    }
    if (this.validType["tag:manakai@suika.fam.cx,2005-11:number"]) return true;
    if (this.validType["tag:manakai@suika.fam.cx,2005-11:integer"] &&
        value.getValue () % 1 == 0) return true;
    if (this.validUnit["urn:x-suika-fam-cx:css:px"] && value.getValue () == 0) {
      return true;
    }
    return false;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return (this.validKeyword[value.getExpandedURI ()] ||
            (!partial && this.validKeyword1[value.getExpandedURI ()]));
  }
  return false;
};

cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.setComputedValue =
function (namespaceURI, prefix, localName, parentPropSet, propSet, value,
          elementNode) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
    /* TODO: resolve relative length */
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    var xuri = value.getExpandedURI ();
    if (this.validKeyword[xuri].computedValue) {
      propSet.setPropertyValueNS (namespaceURI, prefix, localName, 
                                  this.validKeyword[xuri].computedValue);
    } else {
      cx.fam.suika.y2005.CSS.Property.Definition_Length._super.setComputedValue.apply
        (this, arguments);
    }
    return;
  }
  /* unchange */
};


/**
   Class |CSS.Property.Definition_Length4|
   
   The definition for a property that only allows one, two, three, or four <length>
   or other dimensions.
*/
cx.fam.suika.y2005.CSS.Property.Definition_Length4 = function (template) {
  cx.fam.suika.y2005.CSS.Property.Definition_Length4._superclass.apply
    (this, [template]);
};
cx.fam.suika.y2005.CSS.Property.Definition_Length4.inherits
  (cx.fam.suika.y2005.CSS.Property.Definition_Length);

cx.fam.suika.y2005.CSS.Property.Definition_Length4.prototype.parseValueFromTokens =
function (parser, namespaceURI, prefix, localName) {
  var value = parser._GetNextValue ();
  if (value == null) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
  case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
  case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
    var values = [value, value, value, value];
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) {
      var values = [value];
    } else {
      var values = [value, value, value, value];
    }
    break;
  default:
    return null;
  }
  
  value = parser._GetNextValue ();
  if (value == null) return values;
  if (values.length == 1) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
  case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
  case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
    values[1] = value;
    values[3] = value;
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) return null;
    values[1] = value;
    values[3] = value;
    break;
  default:
    return null;
  }
  
  value = parser._GetNextValue ();
  if (value == null) return values;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
  case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
  case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
    values[2] = value;
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) return null;
    values[2] = value;
    break;
  default:
    return null;
  }
  
  value = parser._GetNextValue ();
  if (value == null) return values;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
  case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
  case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
    values[3] = value;
    return values;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) return null;
    values[3] = value;
    return values;
  default:
    return null;
  }
};

cx.fam.suika.y2005.CSS.Property.Definition_Length4.prototype.isValidValue =
function (namespaceURI, localName, value) {
  return false;
};

/* |setDeclaredValue| method must be defined for each property. */


/**
   Class |CSS.Property.Definition_Color|
   
   The definition for a property that only allows one <color>.
*/
cx.fam.suika.y2005.CSS.Property.Definition_Color = function (template) {
  cx.fam.suika.y2005.CSS.Property.Definition_Color._superclass.apply
    (this, [template]);
  this.validFunction["urn:x-suika-fam-cx:css:rgb"] = true;
  this.validFunction["urn:x-suika-fam-cx:css:rgba"] = true;
  this.validFunction["urn:x-suika-fam-cx:css:hsl"] = true;
  this.validFunction["urn:x-suika-fam-cx:css:hsla"] = true;
  var kwd = [
    /* X11 color keywords */
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", 
    "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", 
    "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", 
    "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", 
    "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", 
    "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", 
    "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", 
    "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", 
    "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", 
    "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", 
    "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", 
    "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", 
    "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", 
    "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", 
    "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", 
    "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", 
    "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", 
    "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", 
    "mediumslateblue", "mediumspringgreen", "mediumturquoise", 
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", 
    "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", 
    "orange", "orangered", "orchid", "palegoldenrod", "palegreen", 
    "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", 
    "pink", "plum", "powderblue", "purple", "red", "rosybrown", 
    "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", 
    "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", 
    "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", 
    "thistle", "tomato", "turquoise", "violet", "wheat", "white", 
    "whitesmoke", "yellow", "yellowgreen",
    
    /* CSS2 system colors */
    "activeborder", "activecaption", "appworkspace", "background", 
    "buttonface", "buttonhighlight", "buttonshadow", "buttontext", 
    "captiontext", "graytext", "highlight", "highlighttext", 
    "inactiveborder", "inactivecaption", "inactivecaptiontext", 
    "infobackground", "infotext", "menu", "menutext", "scrollbar", 
    "threeddarkshadow", "threedface", "threedhighlight", 
    "threedlightshadow", "threedshadow", "window", "windowframe", 
    "windowtext",
    
    "transparent",
    "currentcolor", 
    "flavor"
  ];
  for (var i in kwd) {
    this.validKeyword["urn:x-suika-fam-cx:css:" + kwd[i]] = true;
  }
  this.validKeyword
    ["http://suika.fam.cx/~wakaba/archive/2005/cssc.user-agent-dependent"] = true;
};
cx.fam.suika.y2005.CSS.Property.Definition_Color.inherits
  (cx.fam.suika.y2005.CSS.Property.Definition);

cx.fam.suika.y2005.CSS.Property.Definition_Color.prototype.parseValueFromTokens =
function (parser, namespaceURI, prefix, localName) {
  var value = parser._GetNextValue ();
  if (value == null) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return value;
  }
  return null;
};

cx.fam.suika.y2005.CSS.Property.Definition_Color.prototype.isValidValue =
function (namespaceURI, localName, value, partial) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    return this.validFunction[value.getFunctionExpandedURI ()];
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return (this.validKeyword[value.getExpandedURI ()] ||
            (!partial && this.validKeyword1[value.getExpandedURI ()]));
  }
  return false;
};

cx.fam.suika.y2005.CSS.Property.Definition_Color.prototype.setComputedValue =
function (namespaceURI, prefix, localName, parentPropSet, propSet, value,
          elementNode) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    switch (value.getFunctionExpandedURI ()) {
    /*
       Although CSS3 color CR defines computed value for |hsl| and |hsla|
       as same as specified value, this implementation converts them
       into |rgb| or |rgba| for convinience.
    */
    case "urn:x-suika-fam-cx:css:hsl":
      propSet.setPropertyValueNS (namespaceURI, prefix, localName,
                                  value.getRGBAValue ());
      break;
    case "urn:x-suika-fam-cx:css:hsla":
      propSet.setPropertyValueNS (namespaceURI, prefix, localName,
                                  value.getRGBAValue ());
      break;
    }
    return;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    var xuri = value.getExpandedURI ();
    var rgb = {
      /* so-called X11 colors including HTML4 colors [SVG, CSS3 Color CR] */
      "urn:x-suika-fam-cx:css:aliceblue":	[0xf0, 0xf8, 0xff],
      "urn:x-suika-fam-cx:css:antiquewhite":	[0xfa, 0xeb, 0xd7],
      "urn:x-suika-fam-cx:css:aqua":	[0x00, 0xff, 0xff],
      "urn:x-suika-fam-cx:css:aquamarine":	[0x7f, 0xff, 0xd4],
      "urn:x-suika-fam-cx:css:azure":	[0xf0, 0xff, 0xff],
      "urn:x-suika-fam-cx:css:beige":	[0xf5, 0xf5, 0xdc],
      "urn:x-suika-fam-cx:css:bisque":	[0xff, 0xe4, 0xc4],
      "urn:x-suika-fam-cx:css:black":	[0x00, 0x00, 0x00],
      "urn:x-suika-fam-cx:css:blanchedalmond":	[0xff, 0xeb, 0xcd],
      "urn:x-suika-fam-cx:css:blue":	[0x00, 0x00, 0xff],
      "urn:x-suika-fam-cx:css:blueviolet":	[0x8a, 0x2b, 0xe2],
      "urn:x-suika-fam-cx:css:brown":	[0xa5, 0x2a, 0x2a],
      "urn:x-suika-fam-cx:css:burlywood":	[0xde, 0xb8, 0x87],
      "urn:x-suika-fam-cx:css:cadetblue":	[0x5f, 0x9e, 0xa0],
      "urn:x-suika-fam-cx:css:chartreuse":	[0x7f, 0xff, 0x00],
      "urn:x-suika-fam-cx:css:chocolate":	[0xd2, 0x69, 0x1e],
      "urn:x-suika-fam-cx:css:coral":	[0xff, 0x7f, 0x50],
      "urn:x-suika-fam-cx:css:cornflowerblue":	[0x64, 0x95, 0xed],
      "urn:x-suika-fam-cx:css:cornsilk":	[0xff, 0xf8, 0xdc],
      "urn:x-suika-fam-cx:css:crimson":	[0xdc, 0x14, 0x3c],
      "urn:x-suika-fam-cx:css:cyan":	[0x00, 0xff, 0xff],
      "urn:x-suika-fam-cx:css:darkblue":	[0x00, 0x00, 0x8b],
      "urn:x-suika-fam-cx:css:darkcyan":	[0x00, 0x8b, 0x8b],
      "urn:x-suika-fam-cx:css:darkgoldenrod":	[0xb8, 0x86, 0x0b],
      "urn:x-suika-fam-cx:css:darkgray":	[0xa9, 0xa9, 0xa9],
      "urn:x-suika-fam-cx:css:darkgreen":	[0x00, 0x64, 0x00],
      "urn:x-suika-fam-cx:css:darkgrey":	[0xa9, 0xa9, 0xa9],
      "urn:x-suika-fam-cx:css:darkkhaki":	[0xbd, 0xb7, 0x6b],
      "urn:x-suika-fam-cx:css:darkmagenta":	[0x8b, 0x00, 0x8b],
      "urn:x-suika-fam-cx:css:darkolivegreen":	[0x55, 0x6b, 0x2f],
      "urn:x-suika-fam-cx:css:darkorange":	[0xff, 0x8c, 0x00],
      "urn:x-suika-fam-cx:css:darkorchid":	[0x99, 0x32, 0xcc],
      "urn:x-suika-fam-cx:css:darkred":	[0x8b, 0x00, 0x00],
      "urn:x-suika-fam-cx:css:darksalmon":	[0xe9, 0x96, 0x7a],
      "urn:x-suika-fam-cx:css:darkseagreen":	[0x8f, 0xbc, 0x8f],
      "urn:x-suika-fam-cx:css:darkslateblue":	[0x48, 0x3d, 0x8b],
      "urn:x-suika-fam-cx:css:darkslategray":	[0x2f, 0x4f, 0x4f],
      "urn:x-suika-fam-cx:css:darkslategrey":	[0x2f, 0x4f, 0x4f],
      "urn:x-suika-fam-cx:css:darkturquoise":	[0x00, 0xce, 0xd1],
      "urn:x-suika-fam-cx:css:darkviolet":	[0x94, 0x00, 0xd3],
      "urn:x-suika-fam-cx:css:deeppink":	[0xff, 0x14, 0x93],
      "urn:x-suika-fam-cx:css:deepskyblue":	[0x00, 0xbf, 0xff],
      "urn:x-suika-fam-cx:css:dimgray":	[0x69, 0x69, 0x69],
      "urn:x-suika-fam-cx:css:dimgrey":	[0x69, 0x69, 0x69],
      "urn:x-suika-fam-cx:css:dodgerblue":	[0x1e, 0x90, 0xff],
      "urn:x-suika-fam-cx:css:firebrick":	[0xb2, 0x22, 0x22],
      "urn:x-suika-fam-cx:css:floralwhite":	[0xff, 0xfa, 0xf0],
      "urn:x-suika-fam-cx:css:forestgreen":	[0x22, 0x8b, 0x22],
      "urn:x-suika-fam-cx:css:fuchsia":	[0xff, 0x00, 0xff],
      "urn:x-suika-fam-cx:css:gainsboro":	[0xdc, 0xdc, 0xdc],
      "urn:x-suika-fam-cx:css:ghostwhite":	[0xf8, 0xf8, 0xff],
      "urn:x-suika-fam-cx:css:gold":	[0xff, 0xd7, 0x00],
      "urn:x-suika-fam-cx:css:goldenrod":	[0xda, 0xa5, 0x20],
      "urn:x-suika-fam-cx:css:gray":	[0x80, 0x80, 0x80],
      "urn:x-suika-fam-cx:css:green":	[0x00, 0x80, 0x00],
      "urn:x-suika-fam-cx:css:greenyellow":	[0xad, 0xff, 0x2f],
      "urn:x-suika-fam-cx:css:grey":	[0x80, 0x80, 0x80],
      "urn:x-suika-fam-cx:css:honeydew":	[0xf0, 0xff, 0xf0],
      "urn:x-suika-fam-cx:css:hotpink":	[0xff, 0x69, 0xb4],
      "urn:x-suika-fam-cx:css:indianred":	[0xcd, 0x5c, 0x5c],
      "urn:x-suika-fam-cx:css:indigo":	[0x4b, 0x00, 0x82],
      "urn:x-suika-fam-cx:css:ivory":	[0xff, 0xff, 0xf0],
      "urn:x-suika-fam-cx:css:khaki":	[0xf0, 0xe6, 0x8c],
      "urn:x-suika-fam-cx:css:lavender":	[0xe6, 0xe6, 0xfa],
      "urn:x-suika-fam-cx:css:lavenderblush":	[0xff, 0xf0, 0xf5],
      "urn:x-suika-fam-cx:css:lawngreen":	[0x7c, 0xfc, 0x00],
      "urn:x-suika-fam-cx:css:lemonchiffon":	[0xff, 0xfa, 0xcd],
      "urn:x-suika-fam-cx:css:lightblue":	[0xad, 0xd8, 0xe6],
      "urn:x-suika-fam-cx:css:lightcoral":	[0xf0, 0x80, 0x80],
      "urn:x-suika-fam-cx:css:lightcyan":	[0xe0, 0xff, 0xff],
      "urn:x-suika-fam-cx:css:lightgoldenrodyellow":	[0xfa, 0xfa, 0xd2],
      "urn:x-suika-fam-cx:css:lightgray":	[0xd3, 0xd3, 0xd3],
      "urn:x-suika-fam-cx:css:lightgreen":	[0x90, 0xee, 0x90],
      "urn:x-suika-fam-cx:css:lightgrey":	[0xd3, 0xd3, 0xd3],
      "urn:x-suika-fam-cx:css:lightpink":	[0xff, 0xb6, 0xc1],
      "urn:x-suika-fam-cx:css:lightsalmon":	[0xff, 0xa0, 0x7a],
      "urn:x-suika-fam-cx:css:lightseagreen":	[0x20, 0xb2, 0xaa],
      "urn:x-suika-fam-cx:css:lightskyblue":	[0x87, 0xce, 0xfa],
      "urn:x-suika-fam-cx:css:lightslategray":	[0x77, 0x88, 0x99],
      "urn:x-suika-fam-cx:css:lightslategrey":	[0x77, 0x88, 0x99],
      "urn:x-suika-fam-cx:css:lightsteelblue":	[0xb0, 0xc4, 0xde],
      "urn:x-suika-fam-cx:css:lightyellow":	[0xff, 0xff, 0xe0],
      "urn:x-suika-fam-cx:css:lime":	[0x00, 0xff, 0x00],
      "urn:x-suika-fam-cx:css:limegreen":	[0x32, 0xcd, 0x32],
      "urn:x-suika-fam-cx:css:linen":	[0xfa, 0xf0, 0xe6],
      "urn:x-suika-fam-cx:css:magenta":	[0xff, 0x00, 0xff],
      "urn:x-suika-fam-cx:css:maroon":	[0x80, 0x00, 0x00],
      "urn:x-suika-fam-cx:css:mediumaquamarine":	[0x66, 0xcd, 0xaa],
      "urn:x-suika-fam-cx:css:mediumblue":	[0x00, 0x00, 0xcd],
      "urn:x-suika-fam-cx:css:mediumorchid":	[0xba, 0x55, 0xd3],
      "urn:x-suika-fam-cx:css:mediumpurple":	[0x93, 0x70, 0xdb],
      "urn:x-suika-fam-cx:css:mediumseagreen":	[0x3c, 0xb3, 0x71],
      "urn:x-suika-fam-cx:css:mediumslateblue":	[0x7b, 0x68, 0xee],
      "urn:x-suika-fam-cx:css:mediumspringgreen":	[0x00, 0xfa, 0x9a],
      "urn:x-suika-fam-cx:css:mediumturquoise":	[0x48, 0xd1, 0xcc],
      "urn:x-suika-fam-cx:css:mediumvioletred":	[0xc7, 0x15, 0x85],
      "urn:x-suika-fam-cx:css:midnightblue":	[0x19, 0x19, 0x70],
      "urn:x-suika-fam-cx:css:mintcream":	[0xf5, 0xff, 0xfa],
      "urn:x-suika-fam-cx:css:mistyrose":	[0xff, 0xe4, 0xe1],
      "urn:x-suika-fam-cx:css:moccasin":	[0xff, 0xe4, 0xb5],
      "urn:x-suika-fam-cx:css:navajowhite":	[0xff, 0xde, 0xad],
      "urn:x-suika-fam-cx:css:navy":	[0x00, 0x00, 0x80],
      "urn:x-suika-fam-cx:css:oldlace":	[0xfd, 0xf5, 0xe6],
      "urn:x-suika-fam-cx:css:olive":	[0x80, 0x80, 0x00],
      "urn:x-suika-fam-cx:css:olivedrab":	[0x6b, 0x8e, 0x23],
      "urn:x-suika-fam-cx:css:orange":	[0xff, 0xa5, 0x00],
      "urn:x-suika-fam-cx:css:orangered":	[0xff, 0x45, 0x00],
      "urn:x-suika-fam-cx:css:orchid":	[0xda, 0x70, 0xd6],
      "urn:x-suika-fam-cx:css:palegoldenrod":	[0xee, 0xe8, 0xaa],
      "urn:x-suika-fam-cx:css:palegreen":	[0x98, 0xfb, 0x98],
      "urn:x-suika-fam-cx:css:paleturquoise":	[0xaf, 0xee, 0xee],
      "urn:x-suika-fam-cx:css:palevioletred":	[0xdb, 0x70, 0x93],
      "urn:x-suika-fam-cx:css:papayawhip":	[0xff, 0xef, 0xd5],
      "urn:x-suika-fam-cx:css:peachpuff":	[0xff, 0xda, 0xb9],
      "urn:x-suika-fam-cx:css:peru":	[0xcd, 0x85, 0x3f],
      "urn:x-suika-fam-cx:css:pink":	[0xff, 0xc0, 0xcb],
      "urn:x-suika-fam-cx:css:plum":	[0xdd, 0xa0, 0xdd],
      "urn:x-suika-fam-cx:css:powderblue":	[0xb0, 0xe0, 0xe6],
      "urn:x-suika-fam-cx:css:purple":	[0x80, 0x00, 0x80],
      "urn:x-suika-fam-cx:css:red":	[0xff, 0x00, 0x00],
      "urn:x-suika-fam-cx:css:rosybrown":	[0xbc, 0x8f, 0x8f],
      "urn:x-suika-fam-cx:css:royalblue":	[0x41, 0x69, 0xe1],
      "urn:x-suika-fam-cx:css:saddlebrown":	[0x8b, 0x45, 0x13],
      "urn:x-suika-fam-cx:css:salmon":	[0xfa, 0x80, 0x72],
      "urn:x-suika-fam-cx:css:sandybrown":	[0xf4, 0xa4, 0x60],
      "urn:x-suika-fam-cx:css:seagreen":	[0x2e, 0x8b, 0x57],
      "urn:x-suika-fam-cx:css:seashell":	[0xff, 0xf5, 0xee],
      "urn:x-suika-fam-cx:css:sienna":	[0xa0, 0x52, 0x2d],
      "urn:x-suika-fam-cx:css:silver":	[0xc0, 0xc0, 0xc0],
      "urn:x-suika-fam-cx:css:skyblue":	[0x87, 0xce, 0xeb],
      "urn:x-suika-fam-cx:css:slateblue":	[0x6a, 0x5a, 0xcd],
      "urn:x-suika-fam-cx:css:slategray":	[0x70, 0x80, 0x90],
      "urn:x-suika-fam-cx:css:slategrey":	[0x70, 0x80, 0x90],
      "urn:x-suika-fam-cx:css:snow":	[0xff, 0xfa, 0xfa],
      "urn:x-suika-fam-cx:css:springgreen":	[0x00, 0xff, 0x7f],
      "urn:x-suika-fam-cx:css:steelblue":	[0x46, 0x82, 0xb4],
      "urn:x-suika-fam-cx:css:tan":	[0xd2, 0xb4, 0x8c],
      "urn:x-suika-fam-cx:css:teal":	[0x00, 0x80, 0x80],
      "urn:x-suika-fam-cx:css:thistle":	[0xd8, 0xbf, 0xd8],
      "urn:x-suika-fam-cx:css:tomato":	[0xff, 0x63, 0x47],
      "urn:x-suika-fam-cx:css:turquoise":	[0x40, 0xe0, 0xd0],
      "urn:x-suika-fam-cx:css:violet":	[0xee, 0x82, 0xee],
      "urn:x-suika-fam-cx:css:wheat":	[0xf5, 0xde, 0xb3],
      "urn:x-suika-fam-cx:css:white":	[0xff, 0xff, 0xff],
      "urn:x-suika-fam-cx:css:whitesmoke":	[0xf5, 0xf5, 0xf5],
      "urn:x-suika-fam-cx:css:yellow":	[0xff, 0xff, 0x00],
      "urn:x-suika-fam-cx:css:yellowgreen":	[0x9a, 0xcd, 0x32],
      
      "urn:x-suika-fam-cx:css:transparent":	[0, 0, 0, 0]
    }[xuri];
    if (rgb) {
      if (rgb.length == 3) {
        propSet.setPropertyValueNS
          (namespaceURI, prefix, localName,
           new cx.fam.suika.y2005.CSS.Value.RGBValue (rgb[0], rgb[1], rgb[2], 1));
      } else if (rgb.length == 4) {
        propSet.setPropertyValueNS
          (namespaceURI, prefix, localName,
           new cx.fam.suika.y2005.CSS.Value.RGBValue (rgb[0], rgb[1], rgb[2], rgb[3]));
      }
      return;
    }
    if (xuri == "urn:x-suika-fam-cx:css:currentcolor") {
      propSet.setPropertyValueNS
        (namespaceURI, prefix, localName,
         propSet.getSpecifiedPropertyValueNS ("urn:x-suika-fam-cx:css:", "color"));
    }
    cx.fam.suika.y2005.CSS.Property.Definition_Length._super.setComputedValue.apply
      (this, arguments);
    return;
  }
  /* unchange */
};

/**
   Class |CSS.Property.Definition_Color4|
   
   The definition for a property that only allows one, two, three, or four <color>s.
*/
cx.fam.suika.y2005.CSS.Property.Definition_Color4 = function (template) {
  cx.fam.suika.y2005.CSS.Property.Definition_Color4._superclass.apply
    (this, [template]);
};
cx.fam.suika.y2005.CSS.Property.Definition_Color4.inherits
  (cx.fam.suika.y2005.CSS.Property.Definition_Color);

cx.fam.suika.y2005.CSS.Property.Definition_Color4.prototype.parseValueFromTokens =
function (parser, namespaceURI, prefix, localName) {
  var value = parser._GetNextValue ();
  if (value == null) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    var values = [value, value, value, value];
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) {
      var values = [value];
    } else {
      var values = [value, value, value, value];
    }
    break;
  default:
    return null;
  }
  
  value = parser._GetNextValue ();
  if (value == null) return values;
  if (values.length == 1) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    values[1] = value;
    values[3] = value;
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) return null;
    values[1] = value;
    values[3] = value;
    break;
  default:
    return null;
  }
  
  value = parser._GetNextValue ();
  if (value == null) return values;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    values[2] = value;
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) return null;
    values[2] = value;
    break;
  default:
    return null;
  }
  
  value = parser._GetNextValue ();
  if (value == null) return values;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    values[3] = value;
    return values;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    if (this.validKeyword1[value.getExpandedURI ()]) return null;
    values[3] = value;
    return values;
  default:
    return null;
  }
};

cx.fam.suika.y2005.CSS.Property.Definition_Color4.prototype.isValidValue =
function (namespaceURI, localName, value) {
  return false;
};

/* |setDeclaredValue| method must be defined for each property. */


/**
   Class |CSS.Property.Definition_URI|
   
   The definition for a property that only allows one <uri>.
*/
cx.fam.suika.y2005.CSS.Property.Definition_URI = function (template) {
  cx.fam.suika.y2005.CSS.Property.Definition_URI._superclass.apply
    (this, [template]);
  this.validFunction["urn:x-suika-fam-cx:css:url"] = true;
};
cx.fam.suika.y2005.CSS.Property.Definition_URI.inherits
  (cx.fam.suika.y2005.CSS.Property.Definition);

cx.fam.suika.y2005.CSS.Property.Definition_URI.prototype.parseValueFromTokens =
function (parser, namespaceURI, prefix, localName) {
  var value = parser._GetNextValue ();
  if (value == null) return null;
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return value;
  }
  return null;
};

cx.fam.suika.y2005.CSS.Property.Definition_URI.prototype.isValidValue =
function (namespaceURI, localName, value, partial) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:FUNCTION":
    return this.validFunction[value.getFunctionExpandedURI ()];
    return true;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    return (this.validKeyword[value.getExpandedURI ()] ||
            (!partial && this.validKeyword1[value.getExpandedURI ()]));
  }
  return false;
};

cx.fam.suika.y2005.CSS.Property.Definition_URI.prototype.setComputedValue =
function (namespaceURI, prefix, localName, parentPropSet, propSet, value,
          elementNode) {
  switch (value.getTypeURI ()) {
  case "tag:manakai@suika.fam.cx,2005-11:URI":
    /* TODO: resolve relative URIs */
    break;
  case "tag:manakai@suika.fam.cx,2005-11:IDENT":
    cx.fam.suika.y2005.CSS.Property.Definition_URI._super.setComputedValue.apply
      (this, arguments);
    return;
  }
  /* unchange */
};


/**
   Returns a |setDeclaredValue| method implementation for shorthand
   properties that corresponding to a set of |top|, |right|, |bottom|, and
   |left| longhand properties.
*/
cx.fam.suika.y2005.CSS.Property.setDeclaredValue4 =
function (propNamespaceURI, propPrefix, propSuffix) {
  return function (namespaceURI, prefix, localName, propSet, valueSource, priority) {
    if (valueSource.length == 1) { /* |inherit| and so on */
      valueSource = [valueSource[0], valueSource[0], valueSource[0], valueSource[0]];
    } else {
      var checker = cx.fam.suika.y2005.CSS.Property.Definition
                  [propNamespaceURI + propPrefix + "bottom" + propSuffix].isValidValue;
      if (!checker.apply (this, [namespaceURI, localName, valueSource[0], true]) ||
          !checker.apply (this, [namespaceURI, localName, valueSource[1], true]) ||
          !checker.apply (this, [namespaceURI, localName, valueSource[2], true]) ||
          !checker.apply (this, [namespaceURI, localName, valueSource[3], true]))
        return;
    }
    propSet.addPropertyValueNS
      (propNamespaceURI, null, propPrefix + "top" + propSuffix,
       valueSource[0], priority);
    propSet.addPropertyValueNS
      (propNamespaceURI, null, propPrefix + "right" + propSuffix,
       valueSource[1], priority);
    propSet.addPropertyValueNS
      (propNamespaceURI, null, propPrefix + "bottom" + propSuffix,
       valueSource[2], priority);
    propSet.addPropertyValueNS
      (propNamespaceURI, null, propPrefix + "left" + propSuffix,
       valueSource[3], priority);
  };
};


/*
   Instances of property definitions
*/

cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:background"] =
new cx.fam.suika.y2005.CSS.Property.Definition ({
  isShorthand: true,
  isValidValue: function () { return false },
  parseValueFromTokens: function (parser, namespaceURI, prefix, localName) {
    var propDef = {
      color: cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:background-color"],
      image: cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:background-image"],
      repeat: cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:background-repeat"],
      attachment: cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:background-attachment"],
      position: cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:background-position"]
    };
    var values = {
      color: propDef.color.initialValue,
      image: propDef.image.initialValue,
      repeat: propDef.repeat.initialValue,
      attachment: propDef.attachment.initialValue,
      positionX: new cx.fam.suika.y2005.CSS.Value.NumericValue
                                           (50, null, null, "%"),
      positionY: new cx.fam.suika.y2005.CSS.Value.NumericValue
                                           (50, null, null, "%")
    };
    
    for (var i = 0; i < 5; i++) {
      var value = parser._GetNextValue ();
      if (value == null) {
        if (i == 0) return null;
        return values;
      }
      
      if (propDef.color &&
          propDef.color.isValidValue (namespaceURI, localName, value, true)) {
        values.color = value;
        propDef.color = null;
      } else if (propDef.image &&
          propDef.image.isValidValue (namespaceURI, localName, value, true)) {
        values.image = value;
        propDef.image = null;
      } else if (propDef.repeat &&
          propDef.repeat.isValidValue (namespaceURI, localName, value, true)) {
        values.repeat = value;
        propDef.repeat = null;
      } else if (propDef.attachment &&
          propDef.attachment.isValidValue (namespaceURI, localName, value, true)) {
        values.attachment = value;
        propDef.attachment = null;
      } else if (propDef.position) {
        parser._ValueStack.push (value);
        var valueSourcePosition = propDef.position.parseValueFromTokens
                                    (parser, namespaceURI, prefix, localName);
        if (valueSourcePosition == null) return null;
        values.positionX = valueSourcePosition[0];
        values.positionY = valueSourcePosition[1];
      } else {
        return null;
      }
    }
    return values;
  },
  setDeclaredValue: function (namespaceURI, prefix, localName,
                              propSet, valueSource, priority) {
    /* Since |parseValueFromTokens| ensures three values are
       valid, this method does not have to check it. */
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "background-color", valueSource.color, priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "background-image", valueSource.image, priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "background-repeat", valueSource.repeat, priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null, "background-attachment",
                                valueSource.attachment, priority);
    propSet.addPropertyValueNS ("http://suika.fam.cx/~wakaba/archive/2005/11/css.", 
                                "manakai", "background-position-x",
                                valueSource.positionX, priority);
    propSet.addPropertyValueNS ("http://suika.fam.cx/~wakaba/archive/2005/11/css.", 
                                "manakai", "background-position-y",
                                valueSource.positionY, priority);
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:background-attachment"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  /* CSS2.1 */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "scroll"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:fixed": true,
    "urn:x-suika-fam-cx:css:scroll": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:background-color"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Color ({
  /* Introduced in CSS1 */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "transparent")
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:background-position"] =
new cx.fam.suika.y2005.CSS.Property.Definition ({
  isShorthand: true,
  isValidValue: function () { return false },
  parseValueFromTokens: function (parser, namespaceURI, prefix, localName) {
    var value = parser._GetNextValue ();
    if (value == null) return null;
    var defX = cx.fam.suika.y2005.CSS.Property.Definition
            ["http://suika.fam.cx/~wakaba/archive/2005/11/css.background-position-x"];
    var defY = cx.fam.suika.y2005.CSS.Property.Definition
            ["http://suika.fam.cx/~wakaba/archive/2005/11/css.background-position-x"];
    
    switch (value.getTypeURI ()) {
    case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
    case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
    case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
      var value1 = value;
      break;
    case "tag:manakai@suika.fam.cx,2005-11:IDENT":
      switch (value.getExpandedURI ()) {
      case "urn:x-suika-fam-cx:css:left":
      case "urn:x-suika-fam-cx:css:right":
        var value1 = value;
        break;
      case "urn:x-suika-fam-cx:css:top":
      case "urn:x-suika-fam-cx:css:bottom":
        var value1 = parser._GetNextValue ();
        if (value1 == null) {
          return [new cx.fam.suika.y2005.CSS.Value.NumericValue
                                           (50, null, null, "%"), value];
        }
        if (value1.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT") {
          switch (value1.getExpandedURI ()) {
          case "urn:x-suika-fam-cx:css:left":
          case "urn:x-suika-fam-cx:css:center":
          case "urn:x-suika-fam-cx:css:right":
            return [value1, value];
          }
        }
        parser._ValueStack.push (value1);
        return null;
      case "urn:x-suika-fam-cx:css:center":
        var value2 = parser._GetNextValue ();
        if (value2 == null) {
          return [value, new cx.fam.suika.y2005.CSS.Value.NumericValue
                                                   (50, null, null, "%")];
        }
        switch (value2.getTypeURI ()) {
        case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
        case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
        case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
          return [value, value2];
        case "tag:manakai@suika.fam.cx,2005-11:IDENT":
          switch (value2.getExpandedURI ()) {
          case "urn:x-suika-fam-cx:css:top":
          case "urn:x-suika-fam-cx:css:center":
          case "urn:x-suika-fam-cx:css:bottom":
            return [value, value2];
          case "urn:x-suika-fam-cx:css:left":
          case "urn:x-suika-fam-cx:css:right":
            return [value2, value];
          }
        }
        parser._ValueStack.push (value2);
        return null;
      default:
        if (this.validKeyword1[value.getExpandedURI ()]) {
          var r = [value, value];
          r.isKeyword1 = true;
          return r;
        } else {
          parser._ValueStack.push (value);
          return null;
        }
      }
      break;
    default:
      parser._ValueStack.push (value);
      return null;
    }
    
    var value2 = parser._GetNextValue ();
    if (value2 == null) {
      return [value, new cx.fam.suika.y2005.CSS.Value.NumericValue
                                                   (50, null, null, "%")];
    }
    switch (value2.getTypeURI ()) {
    case "tag:manakai@suika.fam.cx,2005-11:DIMENSION":
    case "tag:manakai@suika.fam.cx,2005-11:PERCENTAGE":
    case "tag:manakai@suika.fam.cx,2005-11:NUMBER":
      return [value, value2];
    case "tag:manakai@suika.fam.cx,2005-11:IDENT":
      switch (value2.getExpandedURI ()) {
      case "urn:x-suika-fam-cx:css:top":
      case "urn:x-suika-fam-cx:css:center":
      case "urn:x-suika-fam-cx:css:bottom":
        return [value, value2];
      }
    }
    /* For |background| parser */
    parser._ValueStack.push (value2);
    return [value, new cx.fam.suika.y2005.CSS.Value.NumericValue
                                                   (50, null, null, "%")];
  },
  setDeclaredValue: function (namespaceURI, prefix, localName,
                              propSet, valueSource, priority) {
    /* Since |parseValueFromTokens| ensures three values are
       valid, this method does not have to check it. */
    propSet.addPropertyValueNS
      ("http://suika.fam.cx/~wakaba/archive/2005/11/css.", "manakai",
       "background-position-x", valueSource[0], priority);
    propSet.addPropertyValueNS
      ("http://suika.fam.cx/~wakaba/archive/2005/11/css.", "manakai",
       "background-position-y", valueSource[1], priority);
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["http://suika.fam.cx/~wakaba/archive/2005/11/css.background-position-x"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, "%"),
  prefix: "manakai",
  validKeyword: {
    "urn:x-suika-fam-cx:css:center":  {
      computedValue: new cx.fam.suika.y2005.CSS.Value.NumericValue
                           (50, null, null, "%")
    },
    "urn:x-suika-fam-cx:css:left":  {
      computedValue: new cx.fam.suika.y2005.CSS.Value.NumericValue
                           (0, null, null, "%")
    },
    "urn:x-suika-fam-cx:css:right":  {
      computedValue: new cx.fam.suika.y2005.CSS.Value.NumericValue
                           (100, null, null, "%")
    }
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["http://suika.fam.cx/~wakaba/archive/2005/11/css.background-position-y"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, "%"),
  prefix: "manakai",
  validKeyword: {
    "urn:x-suika-fam-cx:css:bottom": {
      computedValue: new cx.fam.suika.y2005.CSS.Value.NumericValue
                           (100, null, null, "%")
    },
    "urn:x-suika-fam-cx:css:center": {
      computedValue: new cx.fam.suika.y2005.CSS.Value.NumericValue
                           (50, null, null, "%")
    },
    "urn:x-suika-fam-cx:css:top": {
      computedValue: new cx.fam.suika.y2005.CSS.Value.NumericValue
                           (0, null, null, "%")
    }
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:background-image"] =
new cx.fam.suika.y2005.CSS.Property.Definition_URI ({
  /* Introduced in CSS1 */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "none"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:none": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:background-repeat"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  /* CSS2.1 */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "repeat"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:no-repeat": true,
    "urn:x-suika-fam-cx:css:repeat": true,
    "urn:x-suika-fam-cx:css:repeat-x": true,
    "urn:x-suika-fam-cx:css:repeat-y": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border"] =
new cx.fam.suika.y2005.CSS.Property.Definition ({
  isShorthand: true,
  isValidValue: function () { return false },
  parseValueFromTokens: function (parser, namespaceURI, prefix, localName) {
    var value = parser._GetNextValue ();
    if (value == null) return null;
    var bColor = cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:border-bottom-color"];
    var bStyle = cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:border-bottom-style"];
    var bWidth = cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:border-bottom-width"];
    var color = bColor.initialValue;
    var style = bStyle.initialValue;
    var width = bWidth.initialValue;
    
    /* 1st value */
    if (bColor.isValidValue (namespaceURI, localName, value, true)) {
      color = value; bColor = null;
    } else if (bStyle.isValidValue (namespaceURI, localName, value, true)) {
      style = value; bStyle = null;
    } else if (bWidth.isValidValue (namespaceURI, localName, value, true)) {
      width = value; bWidth = null;
    } else if (value.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
               this.validKeyword1[value.getExpandedURI ()]) {
      color = value; bColor = null;
      style = value; bStyle = null;
      width = value; bWidth = null;
    } else {
      return null;
    }
    
    /* 2nd value */
    value = parser._GetNextValue ();
    if (value == null) {
      //
    } else if (bColor != null && bColor.isValidValue
                                  (namespaceURI, localName, value, true)) {
      color = value; bColor = null;
      value = parser._GetNextValue ();
    } else if (bStyle != null && bStyle.isValidValue
                                  (namespaceURI, localName, value, true)) {
      style = value; bStyle = null;
      value = parser._GetNextValue ();
    } else if (bWidth != null && bWidth.isValidValue
                                  (namespaceURI, localName, value, true)) {
      width = value; bWidth = null;
      value = parser._GetNextValue ();
    } else {
      return null;
    }
    
    /* 3rd value */
    if (value == null) {
      //
    } else if (bColor != null && bColor.isValidValue
                                  (namespaceURI, localName, value, true)) {
      color = value;
    } else if (bStyle != null && bStyle.isValidValue
                                  (namespaceURI, localName, value, true)) {
      style = value;
    } else if (bWidth != null && bWidth.isValidValue
                                  (namespaceURI, localName, value, true)) {
      width = value;
    } else {
      return null;
    }
    return [color, style, width];
  },
  setDeclaredValue: function (namespaceURI, prefix, localName,
                              propSet, valueSource, priority) {
    /* Since |parseValueFromTokens| ensures three values are
       valid, this method does not have to check it. */
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-bottom-color", valueSource[0], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-bottom-style", valueSource[1], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-bottom-width", valueSource[2], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-left-color", valueSource[0], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-left-style", valueSource[1], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-left-width", valueSource[2], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-right-color", valueSource[0], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-right-style", valueSource[1], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-right-width", valueSource[2], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-top-color", valueSource[0], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-top-style", valueSource[1], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "border-top-width", valueSource[2], priority);
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-bottom"] =
new cx.fam.suika.y2005.CSS.Property.Definition ({
  isShorthand: true,
  isValidValue: function () { return false },
  parseValueFromTokens: cx.fam.suika.y2005.CSS.Property.Definition
                        ["urn:x-suika-fam-cx:css:border"].parseValueFromTokens,
  setDeclaredValue: function (namespaceURI, prefix, localName,
                              propSet, valueSource, priority) {
    /* Since |parseValueFromTokens| ensures three values are
       valid, this method does not have to check it. */
    propSet.addPropertyValueNS
      ("urn:x-suika-fam-cx:css:", null, localName + "-color",
       valueSource[0], priority);
    propSet.addPropertyValueNS
      ("urn:x-suika-fam-cx:css:", null, localName + "-style",
       valueSource[1], priority);
    propSet.addPropertyValueNS
      ("urn:x-suika-fam-cx:css:", null, localName + "-width",
       valueSource[2], priority);
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-bottom-color"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Color ({
    /* Introduced in CSS1, modified in CSS2, CSS3 border WD */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "currentcolor")
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-bottom-style"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "none"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:dashed": true,
    "urn:x-suika-fam-cx:css:dotted": true,
    "urn:x-suika-fam-cx:css:double": true,
    "urn:x-suika-fam-cx:css:groove": true,
    "urn:x-suika-fam-cx:css:hidden": true,
    "urn:x-suika-fam-cx:css:inset": true,
    "urn:x-suika-fam-cx:css:none": true,
    "urn:x-suika-fam-cx:css:outset": true,
    "urn:x-suika-fam-cx:css:ridge": true,
    "urn:x-suika-fam-cx:css:solid": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-bottom-width"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
    /* Introduced in CSS1, modified in CSS2, CSS3 Box model WD */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "medium"),
  negativeNotAllowed: true,
  setComputedValue: function (namespaceURI, prefix, localName, parentPropSet,
                              propSet, value, elementNode) {
    var bs = propSet.getSpecifiedPropertyValueNS
               ("urn:x-suika-fam-cx:css:", localName.replace ("width", "style"));
    switch (bs.getExpandedURI ()) {
    case "urn:x-suika-fam-cx:css:none":
    case "urn:x-suika-fam-cx:css:hidden":
      propSet.setPropertyValueNS
        (namespaceURI, prefix, localName,
         new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null));
      return;
    }
    
    switch (value.getTypeURI ()) {
    case "tag:manakai@suika.fam.cx,2005-11:IDENT":
      switch (value.getExpandedURI ()) {
      case "urn:x-suika-fam-cx:css:thin":
        /* UA dependent */
        propSet.setPropertyValueNS
          (namespaceURI, prefix, localName,
           new cx.fam.suika.y2005.CSS.Value.NumericValue
                   (1, "urn:x-suika-fam-cx:css:", null, "px"));
        return;
      case "urn:x-suika-fam-cx:css:medium":
        /* UA dependent */
        propSet.setPropertyValueNS
          (namespaceURI, prefix, localName,
           new cx.fam.suika.y2005.CSS.Value.NumericValue
                   (3, "urn:x-suika-fam-cx:css:", null, "px"));
        return;
      case "urn:x-suika-fam-cx:css:thick":
        /* UA dependent */
        propSet.setPropertyValueNS
          (namespaceURI, prefix, localName,
           new cx.fam.suika.y2005.CSS.Value.NumericValue
                   (5, "urn:x-suika-fam-cx:css:", null, "px"));
        return;
        /* Note.  CSS3 box model WD proposes 1px, 3px, and 5px as a possible choice. */
      }
    }
    cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.setComputedValue
      .apply (this, arguments);
  },
  validKeyword: {
    "urn:x-suika-fam-cx:css:medium": true,
    "urn:x-suika-fam-cx:css:thick": true,
    "urn:x-suika-fam-cx:css:thin": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
      /* percentage allowed in CSS3 Box model WD */
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-color"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Color4 ({
  isShorthand: true,
  isValidValue: function () { return false },
  setDeclaredValue: cx.fam.suika.y2005.CSS.Property.setDeclaredValue4
                          ("urn:x-suika-fam-cx:css:", "border-", "-color")
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:border-left"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:border-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-left-color"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-color"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-left-style"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-style"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-left-width"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-width"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-right"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-right-color"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-color"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-right-style"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-style"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-right-width"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-width"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-top"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-top-color"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-color"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-top-style"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-style"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-top-width"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:border-bottom-width"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-style"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length4 ({
  isShorthand: true,
  isValidValue: function () { return false },
  setDeclaredValue: cx.fam.suika.y2005.CSS.Property.setDeclaredValue4
                          ("urn:x-suika-fam-cx:css:", "border-", "-style"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:dashed": true,
    "urn:x-suika-fam-cx:css:dotted": true,
    "urn:x-suika-fam-cx:css:double": true,
    "urn:x-suika-fam-cx:css:groove": true,
    "urn:x-suika-fam-cx:css:hidden": true,
    "urn:x-suika-fam-cx:css:inset": true,
    "urn:x-suika-fam-cx:css:none": true,
    "urn:x-suika-fam-cx:css:outset": true,
    "urn:x-suika-fam-cx:css:ridge": true,
    "urn:x-suika-fam-cx:css:solid": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:border-width"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length4 ({
    /* Introduced in CSS1, modified in CSS2, CSS3 Box model WD */
  isShorthand: true,
  isValidValue: function () { return false },
  negativeNotAllowed: true,
  setDeclaredValue: cx.fam.suika.y2005.CSS.Property.setDeclaredValue4
                          ("urn:x-suika-fam-cx:css:", "border-", "-width"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:medium": true,
    "urn:x-suika-fam-cx:css:thick": true,
    "urn:x-suika-fam-cx:css:thin": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
      /* percentage allowed in CSS3 Box model WD */
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:bottom"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "auto"),
  /* Computed value might be amended in |position| computing */
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:clear"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "none"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:both": true,
    "urn:x-suika-fam-cx:css:left": true,
    "urn:x-suika-fam-cx:css:none": true,
    "urn:x-suika-fam-cx:css:right": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:color"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Color ({
    /* Introduced in CSS1, modified in CSS2, CSS2.1, SVG1, CSS3 Color CR */
    /* TODO: |attr| */
  inherit: true,
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("http://suika.fam.cx/~wakaba/archive/2005/cssc.",
                       "manakai_c", "user-agent-dependent"),
  parseValueFromTokens: function (parser, namespaceURI, prefix, localName) {
    var value = cx.fam.suika.y2005.CSS.Property.Definition_Color
                  .prototype.parseValueFromTokens.apply (this, arguments);
    if (value &&
        value.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
        value.getExpandedURI () == "urn:x-suika-fam-cx:css:currentcolor") {
      value = new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "inherit");
    }
    return value;
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:direction"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "ltr"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:ltr": true,
    "urn:x-suika-fam-cx:css:rtl": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:display"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  isShorthand: true,
  isValidValue: function () { return false },
  setDeclaredValue: function (namespaceURI, prefix, localName,
                              propSet, valueSource, priority) {
    if (valueSource.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT") {
      switch (valueSource.getExpandedURI ()) {
      case "urn:x-suika-fam-cx:css:none":
      case "urn:x-suika-fam-cx:css:inline":
      case "urn:x-suika-fam-cx:css:run-in":
      case "urn:x-suika-fam-cx:css:compact":
      case "urn:x-suika-fam-cx:css:table-cell":
      case "urn:x-suika-fam-cx:css:table-caption":
      case "urn:x-suika-fam-cx:css:table-row-group":
      case "urn:x-suika-fam-cx:css:table-header-group":
      case "urn:x-suika-fam-cx:css:table-footer-group":
      case "urn:x-suika-fam-cx:css:table-column":
      case "urn:x-suika-fam-cx:css:table-column-group":
      case "urn:x-suika-fam-cx:css:table-row":
      case "urn:x-suika-fam-cx:css:ruby-base":
      case "urn:x-suika-fam-cx:css:ruby-text":
      case "urn:x-suika-fam-cx:css:ruby-base-group":
      case "urn:x-suika-fam-cx:css:ruby-text-group":
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, valueSource.getLocalName ()));
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-model",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "inline-inside"));
        break;
      case "urn:x-suika-fam-cx:css:block":
      case "urn:x-suika-fam-cx:css:list-item":
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, valueSource.getLocalName ()));
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-model",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "block-inside"));
        break;
      case "urn:x-suika-fam-cx:css:table":
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "block"));
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-model",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "table"));
        break;
      case "urn:x-suika-fam-cx:css:inline-block":
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "inline"));
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-model",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "block-inside"));
        break;
      case "urn:x-suika-fam-cx:css:inline-table":
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "inline"));
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-model",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "table"));
          break;
      case "urn:x-suika-fam-cx:css:ruby":
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "inline"));
        propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-model",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "ruby"));
        break;
      default:
        propSet.setPropertyValueNS
                ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                 "manakai", "display-role", valueSource);
        propSet.setPropertyValueNS
                ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                 "manakai", "display-model", valueSource);
      } /* typeURI */
    }
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["http://suika.fam.cx/~wakaba/archive/2005/11/css.display-model"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
    /* CSS3 Box model WD */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "inline-inside"),
  prefix: "manakai",
  validKeyword: {
    "http://suika.fam.cx/~wakaba/archive/2005/11/css.block-inside": true,
    "http://suika.fam.cx/~wakaba/archive/2005/11/css.inline-inside": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["http://suika.fam.cx/~wakaba/archive/2005/11/css.display-role"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
    /* CSS3 Box model WD */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "inline"),
  prefix: "manakai",
  validKeyword: {
    "urn:x-suika-fam-cx:css:block": true,
    "urn:x-suika-fam-cx:css:compact": true,
    "urn:x-suika-fam-cx:css:inline": true,
    "urn:x-suika-fam-cx:css:list-item": true,
    "urn:x-suika-fam-cx:css:none": true,
    "urn:x-suika-fam-cx:css:ruby-base": true,
    "urn:x-suika-fam-cx:css:ruby-base-group": true,
    "urn:x-suika-fam-cx:css:ruby-text": true,
    "urn:x-suika-fam-cx:css:ruby-text-group": true,
    "urn:x-suika-fam-cx:css:run-in": true,
    "urn:x-suika-fam-cx:css:table": true,
    "urn:x-suika-fam-cx:css:table-caption": true,
    "urn:x-suika-fam-cx:css:table-cell": true,
    "urn:x-suika-fam-cx:css:table-column": true,
    "urn:x-suika-fam-cx:css:table-column-group": true,
    "urn:x-suika-fam-cx:css:table-footer-group": true,
    "urn:x-suika-fam-cx:css:table-header-group": true,
    "urn:x-suika-fam-cx:css:table-row": true,
    "urn:x-suika-fam-cx:css:table-row-group": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:float"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "none"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:left": true,
    "urn:x-suika-fam-cx:css:none": true,
    "urn:x-suika-fam-cx:css:right": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:font-style"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  /* CSS2.1 */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "normal"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:italic": true,
    "urn:x-suika-fam-cx:css:normal": true,
    "urn:x-suika-fam-cx:css:oblique": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:font-variant"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  /* CSS2.1 */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "normal"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:normal": true,
    "urn:x-suika-fam-cx:css:small-caps": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:font-weight"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "normal"),
  negativeNotAllowed: true,
  /* TODO: Computed value & NUMBER range */
  validKeyword: {
    "urn:x-suika-fam-cx:css:bold": true,
    "urn:x-suika-fam-cx:css:bolder": true,
    "urn:x-suika-fam-cx:css:lighter": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:number": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:height"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "auto"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:left"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:bottom"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:margin"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length4 ({
    /* Introduced in CSS1, modified in CSS2, CSS3 Box model WD */
  isShorthand: true,
  isValidValue: function () { return false },
  setDeclaredValue: cx.fam.suika.y2005.CSS.Property.setDeclaredValue4
                          ("urn:x-suika-fam-cx:css:", "margin-", ""),
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:margin-bottom"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
    /* Introduced in CSS1, modified in CSS2, CSS3 Box model WD */
  initialValue: new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null),
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:margin-left"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:margin-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:margin-right"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:margin-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:margin-top"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:margin-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:padding"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length4 ({
    /* Introduced in CSS1, modified in CSS2, CSS3 Box model WD */
  isShorthand: true,
  isValidValue: function () { return false },
  negativeNotAllowed: true,
  setDeclaredValue: cx.fam.suika.y2005.CSS.Property.setDeclaredValue4
                          ("urn:x-suika-fam-cx:css:", "padding-", ""),
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:max-height"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:height"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:max-width"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:height"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:min-height"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:height"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:min-width"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:height"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:opacity"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
    /* Introduced in SVG1, also defined in CSS3 color CR */
    /* Gecko's deprecated equivalent, |-moz-opacity|, had trouble
       in its implementation so that not identical to this property. */
  initialValue: new cx.fam.suika.y2005.CSS.Value.NumericValue (1, null, null, null),
  setComputedValue: function (namespaceURI, prefix, localName, parentPropSet,
                              propSet, value, elementNode) {
    if (value.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:NUMBER") {
      var val = value.getValue ();
      if (val < 0) {
        propSet.setPropertyValueNS
          (namespaceURI, prefix, localName,
           new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null));
      } else if (val > 1) {
        propSet.setPropertyValueNS
          (namespaceURI, prefix, localName,
           new cx.fam.suika.y2005.CSS.Value.NumericValue (1, null, null, null));
      }
      return;
    }
    cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.setComputedValue
      .apply (this, arguments);
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:number": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:overflow"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  isShorthand: true,
  isValidValue: function () { return false },
  setDeclaredValue: function (namespaceURI, prefix, localName,
                              propSet, valueSource, priority) {
    var checker = cx.fam.suika.y2005.CSS.Property.Definition
                  ["overflow-x"].isValidValue;
    if (!checker.apply (this, [namespaceURI, localName, valueSource, true])) return;
    propSet.addPropertyValueNS
      ("urn:x-suika-fam-cx:css:", null, "overflow-x", valueSource, priority);
    propSet.addPropertyValueNS
      ("urn:x-suika-fam-cx:css:", null, "overflow-y", valueSource, priority);
  },
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true,
    "urn:x-suika-fam-cx:css:hidden": true,
    "urn:x-suika-fam-cx:css:scroll": true,
    "urn:x-suika-fam-cx:css:visible": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:overflow-x"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
    /* CSS3 box model WD, WinIE 5.0+, Firefox 1.5+ */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "visible"),
  setComputedValue: function (namespaceURI, prefix, localName, parentPropSet,
                              propSet, value, elementNode) {
    cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.setComputedValue
      .apply (this, arguments);
    value = propSet.getSpecifiedPropertyValueNS (namespaceURI, localName);
  },
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true,
    "urn:x-suika-fam-cx:css:hidden": true,
    "urn:x-suika-fam-cx:css:scroll": true,
    "urn:x-suika-fam-cx:css:visible": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:overflow-y"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
    /* CSS3 box model WD, WinIE 5.0+, Firefox 1.5+ */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "visible"),
  setComputedValue: function (namespaceURI, prefix, localName, parentPropSet,
                              propSet, value, elementNode) {
    cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.setComputedValue
      .apply (this, arguments);
    
    var oX = propSet.getSpecifiedPropertyValueNS
                 ("urn:x-suika-fam-cx:css:", "overflow-x");
    var oY = propSet.getSpecifiedPropertyValueNS
                 ("urn:x-suika-fam-cx:css:", "overflow-y");
    switch (oX.getExpandedURI ()) {
    case "urn:x-suika-fam-cx:css:visible":
      switch (oY.getExpandedURI ()) {
      case "urn:x-suika-fam-cx:css:auto":
      case "urn:x-suika-fam-cx:css:scroll":
        propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-x",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto"));
        break;
      }
      break;
    case "urn:x-suika-fam-cx:css:auto":
    case "urn:x-suika-fam-cx:css:scroll":
      switch (oY.getExpandedURI ()) {
      case "urn:x-suika-fam-cx:css:visible":
        propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-y",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto"));
        break;
      }
      break;
    }
  },
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true,
    "urn:x-suika-fam-cx:css:hidden": true,
    "urn:x-suika-fam-cx:css:scroll": true,
    "urn:x-suika-fam-cx:css:visible": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:padding-bottom"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
    /* Introduced in CSS1, modified in CSS2, CSS3 Box model WD */
  initialValue: new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null),
  negativeNotAllowed: true,
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:padding-left"]
 = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:padding-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:padding-right"]
 = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:padding-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:padding-top"]
 = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:padding-bottom"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:page-break-after"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "auto"),
  negativeNotAllowed: true,
  validKeyword: {
    "urn:x-suika-fam-cx:css:always": true,
    "urn:x-suika-fam-cx:css:auto": true,
    "urn:x-suika-fam-cx:css:avoid": true,
    "urn:x-suika-fam-cx:css:left": true,
    "urn:x-suika-fam-cx:css:right": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:page-break-before"]
  = cx.fam.suika.y2005.CSS.Property.Definition
    ["urn:x-suika-fam-cx:css:page-break-before"];
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:page-break-inside"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "auto"),
  negativeNotAllowed: true,
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true,
    "urn:x-suika-fam-cx:css:avoid": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:position"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "static"),
  setComputedValue: function (namespaceURI, prefix, localName, parentPropSet,
                              propSet, value, elementNode) {
    cx.fam.suika.y2005.CSS.Property.Definition_Length.prototype.setComputedValue
      .apply (this, arguments);
    value = propSet.getSpecifiedPropertyValueNS (namespaceURI, localName);
    switch (value.getExpandedURI ()) {
    case "urn:x-suika-fam-cx:css:static":
      var autoVal = new cx.fam.suika.y2005.CSS.Value.IdentValue
                        ("urn:x-suika-fam-cx:css:", null, "auto");
      propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "left", autoVal);
      propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "right", autoVal);
      propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "top", autoVal);
      propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "bottom", autoVal);
      break;
    case "urn:x-suika-fam-cx:css:relative":
      var leftVal = propSet.getSpecifiedPropertyValueNS
                        ("urn:x-suika-fam-cx:css:", "left");
      if (leftVal.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
          leftVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
        var rightVal = propSet.getSpecifiedPropertyValueNS
                           ("urn:x-suika-fam-cx:css:", "right");
        if (rightVal.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
            rightVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
          /* left:auto; right:auto */
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "left",
               new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null));
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "right",
               new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null));
        } else {
          /* left:auto; right:~auto */
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "left",
               new cx.fam.suika.y2005.CSS.Value.NumericValue
                        (-rightVal.getValue (),
                         rightVal.getUnitNamespaceURI (),
                         rightVal.getUnitPrefix (),
                         rightVal.getUnitLocalName ()));
        }
      } else {
        var rightVal = propSet.getSpecifiedPropertyValueNS
                           ("urn:x-suika-fam-cx:css:", "right");
        if (rightVal.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
            rightVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
          /* left:~auto; right:auto */
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "right",
               new cx.fam.suika.y2005.CSS.Value.NumericValue
                        (-leftVal.getValue (),
                         leftVal.getUnitNamespaceURI (),
                         leftVal.getUnitPrefix (),
                         leftVal.getUnitLocalName ()));
        } else {
          /* left:~auto; right:~auto -- over-constrained */
          var dirVal = propSet.getSpecifiedPropertyValueNS
                           ("urn:x-suika-fam-cx:css:", "direction");
          if (dirVal.getExpandedURI () == "urn:x-suika-fam-cx:css:ltr") {
            propSet.setPropertyValueNS
                ("urn:x-suika-fam-cx:css:", null, "right",
                 new cx.fam.suika.y2005.CSS.Value.NumericValue
                        (-leftVal.getValue (),
                         leftVal.getUnitNamespaceURI (),
                         leftVal.getUnitPrefix (),
                         leftVal.getUnitLocalName ()));
          } else {
            propSet.setPropertyValueNS
                ("urn:x-suika-fam-cx:css:", null, "left",
                 new cx.fam.suika.y2005.CSS.Value.NumericValue
                        (-rightVal.getValue (),
                         rightVal.getUnitNamespaceURI (),
                         rightVal.getUnitPrefix (),
                         rightVal.getUnitLocalName ()));
          }
        }
      }
        
      var topVal = propSet.getSpecifiedPropertyValueNS
                        ("urn:x-suika-fam-cx:css:", "top");
      if (topVal.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
          topVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
        var bottomVal = propSet.getSpecifiedPropertyValueNS
                           ("urn:x-suika-fam-cx:css:", "bottom");
        if (bottomVal.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
            bottomVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
          /* top:auto; bottom:auto */
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "top",
               new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null));
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "bottom",
               new cx.fam.suika.y2005.CSS.Value.NumericValue (0, null, null, null));
        } else {
          /* top:auto; bottom:~auto */
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "top",
               new cx.fam.suika.y2005.CSS.Value.NumericValue
                        (-bottomVal.getValue (),
                         bottomVal.getUnitNamespaceURI (),
                         bottomVal.getUnitPrefix (),
                         bottomVal.getUnitLocalName ()));
        }
      } else {
        var bottomVal = propSet.getSpecifiedPropertyValueNS
                           ("urn:x-suika-fam-cx:css:", "bottom");
        if (bottomVal.getTypeURI == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
            bottomVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
          /* top:~auto; bottom:auto */
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "bottom",
               new cx.fam.suika.y2005.CSS.Value.NumericValue
                        (-topVal.getValue (),
                         topVal.getUnitNamespaceURI (),
                         topVal.getUnitPrefix (),
                         topVal.getUnitLocalName ()));
        } else {
          /* top:~auto; bottom:~auto -- over-constrained */
          propSet.setPropertyValueNS
                ("urn:x-suika-fam-cx:css:", null, "bottom",
                 new cx.fam.suika.y2005.CSS.Value.NumericValue
                        (-topVal.getValue (),
                         topVal.getUnitNamespaceURI (),
                         topVal.getUnitPrefix (),
                         topVal.getUnitLocalName ()));
        }
      }
      break;
    }
  },
  validKeyword: {
    "urn:x-suika-fam-cx:css:absolute": true,
    "urn:x-suika-fam-cx:css:fixed": true,
    "urn:x-suika-fam-cx:css:relative": true,
    "urn:x-suika-fam-cx:css:static": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:line-height"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  inherit: true,
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "normal"),
  negativeNotAllowed: true,
  validKeyword: {
    "urn:x-suika-fam-cx:css:normal": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:length": true,
    "tag:manakai@suika.fam.cx,2005-11:number": true,
    "tag:manakai@suika.fam.cx,2005-11:percentage": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:list-style"] =
new cx.fam.suika.y2005.CSS.Property.Definition ({
  isShorthand: true,
  isValidValue: function () { return false },
  parseValueFromTokens: function (parser, namespaceURI, prefix, localName) {
    var value = parser._GetNextValue ();
    if (value == null) return null;
    var lsType = cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:list-style-type"];
    var lsPosition = cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:list-style-position"];
    var lsImage = cx.fam.suika.y2005.CSS.Property.Definition
                  ["urn:x-suika-fam-cx:css:list-style-image"];
    var type = lsType.initialValue;
    var position = lsPosition.initialValue;
    var image = lsImage.initialValue;
    var hasNone = false;
    
    /* 1st value */
    if (lsType.isValidValue (namespaceURI, localName, value, true)) {
      type = value;
      if (type.getExpandedURI () == "urn:x-suika-fam-cx:css:none") {
        image = type;
        hasNone = true;
      } else {
        lsType = null;
      }
    } else if (lsPosition.isValidValue (namespaceURI, localName, value, true)) {
      position = value; lsPosition = null;
    } else if (lsImage.isValidValue (namespaceURI, localName, value, true)) {
      image = value; lsImage = null;
    } else if (value.getTypeURI () == "tag:manakai@suika.fam.cx,2005-11:IDENT" &&
               this.validKeyword1[value.getExpandedURI ()]) {
      type = value; lsType = null;
      position = value; lsPosition = null;
      image = value; lsImage = null;
    } else {
      return null;
    }
    
    /* 2nd value */
    value = parser._GetNextValue ();
    if (value == null) {
      //
    } else if (lsType != null && lsType.isValidValue
                                  (namespaceURI, localName, value, true)) {
      type = value;
      value = parser._GetNextValue ();
      if (hasNone) {
        lsImage = null;
      } else if (type.getExpandedURI () == "urn:x-suika-fam-cx:css:none") {
        image = type;
      } else {
        lsType = null;
      }
    } else if (lsPosition != null && lsPosition.isValidValue
                                  (namespaceURI, localName, value, true)) {
      position = value; lsPosition = null;
      value = parser._GetNextValue ();
    } else if (lsImage != null && lsImage.isValidValue
                                  (namespaceURI, localName, value, true)) {
      image = value; lsImage = null;
      value = parser._GetNextValue ();
      hasNone = false;
    } else {
      return null;
    }
    
    /* 3rd value */
    if (value == null) {
      //
    } else if (lsType != null && lsType.isValidValue
                                  (namespaceURI, localName, value, true)) {
      type = value;
      if (type.getExpandedURI () == "urn:x-suika-fam-cx:css:none") {
        image = type;
      }
    } else if (lsPosition != null && lsPosition.isValidValue
                                  (namespaceURI, localName, value, true)) {
      position = value;
    } else if (lsImage != null && lsImage.isValidValue
                                  (namespaceURI, localName, value, true)) {
      image = value;
    } else {
      return null;
    }
    return [type, position, image];
  },
  setDeclaredValue: function (namespaceURI, prefix, localName,
                              propSet, valueSource, priority) {
    /* Since |parseValueFromTokens| ensures three values are
       valid, this method does not have to check it. */
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "list-style-type", valueSource[0], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "list-style-position", valueSource[1], priority);
    propSet.addPropertyValueNS ("urn:x-suika-fam-cx:css:", null,
                                "list-style-image", valueSource[2], priority);
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:list-style-image"] =
new cx.fam.suika.y2005.CSS.Property.Definition_URI ({
  /* CSS2.1 */
  inherit: true,
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "none"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:none": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition
["urn:x-suika-fam-cx:css:list-style-position"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  /* CSS2.1 */
  inherit: true,
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "outside"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:inside": true,
    "urn:x-suika-fam-cx:css:outside": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:list-style-type"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  /* CSS2.1 */
  inherit: true,
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "disc"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:lower-alpha": true,
    "urn:x-suika-fam-cx:css:upper-alpha": true,
    "urn:x-suika-fam-cx:css:armenian": true,
    "urn:x-suika-fam-cx:css:circle": true,
    "urn:x-suika-fam-cx:css:disc": true,
    "urn:x-suika-fam-cx:css:decimal": true,
    "urn:x-suika-fam-cx:css:decimal-leading-zero": true,
    "urn:x-suika-fam-cx:css:georgian": true,
    "urn:x-suika-fam-cx:css:lower-greek": true,
    "urn:x-suika-fam-cx:css:lower-latin": true,
    "urn:x-suika-fam-cx:css:upper-latin": true,
    "urn:x-suika-fam-cx:css:none": true,
    "urn:x-suika-fam-cx:css:lower-roman": true,
    "urn:x-suika-fam-cx:css:upper-roman": true,
    "urn:x-suika-fam-cx:css:square": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:orphans"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  /* Introduced in CSS2 */
  inherit: true,
  initialValue: new cx.fam.suika.y2005.CSS.Value.NumericValue (2, null, null, null),
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:integer": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:right"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:bottom"];
cx.fam.suika.y2005.CSS.Property.Definition
["http://suika.fam.cx/~wakaba/archive/2005/11/css.scroller"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
    /* CSS3 Box model WD editor's note */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "scrollbar"),
  prefix: "manakai",
  validKeyword: {
    "http://suika.fam.cx/~wakaba/archive/2005/11/css.scrollbar": true,
    "http://suika.fam.cx/~wakaba/archive/2005/11/css.invisible": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:top"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:bottom"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:unicode-bidi"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "normal"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:bidi-override": true,
    "urn:x-suika-fam-cx:css:embed": true,
    "urn:x-suika-fam-cx:css:normal": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:vertical-align"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "baseline"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:baseline": true,
    "urn:x-suika-fam-cx:css:bottom": true,
    "urn:x-suika-fam-cx:css:middle": true,
    "urn:x-suika-fam-cx:css:sub": true,
    "urn:x-suika-fam-cx:css:super": true,
    "urn:x-suika-fam-cx:css:text-bottom": true,
    "urn:x-suika-fam-cx:css:text-top": true,
    "urn:x-suika-fam-cx:css:top": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:visibility"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Keyword ({
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "visible"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:collapse": true,
    "urn:x-suika-fam-cx:css:hidden": true,
    "urn:x-suika-fam-cx:css:visible": true
  }
});
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:widows"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:orphans"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:width"]
  = cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:height"];
cx.fam.suika.y2005.CSS.Property.Definition["urn:x-suika-fam-cx:css:z-index"] =
new cx.fam.suika.y2005.CSS.Property.Definition_Length ({
  /* Introduced in CSS2 */
  initialValue: new cx.fam.suika.y2005.CSS.Value.IdentValue
                      ("urn:x-suika-fam-cx:css:", null, "auto"),
  validKeyword: {
    "urn:x-suika-fam-cx:css:auto": true
  },
  validType: {
    "tag:manakai@suika.fam.cx,2005-11:integer": true
  }
});

cx.fam.suika.y2005.CSS.Property.Definition
["http://suika.fam.cx/~wakaba/archive/2005/11/css.props.display"] =
new cx.fam.suika.y2005.CSS.Property.Definition ({
  setComputedValue: function (namespaceURI, _1, localName, 
                              parentPropSet, propSet, _3, elementNode) {
    var displayVal = propSet.getSpecifiedPropertyValueNS
                       ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                        "display-role");
    var displayURI = displayVal.getExpandedURI ();
    if (displayURI == "urn:x-suika-fam-cx:css:none") return;
      /* |position| and |float| do not apply */
    var positionVal = propSet.getSpecifiedPropertyValueNS
                        ("urn:x-suika-fam-cx:css:", "position");
    switch (positionVal.getExpandedURI ()) {
    case "urn:x-suika-fam-cx:css:absolute":
    case "urn:x-suika-fam-cx:css:fixed":
      propSet.setPropertyValueNS
          ("urn:x-suika-fam-cx:css:", null, "float",
           new cx.fam.suika.y2005.CSS.Value.IdentValue
                 ("urn:x-suika-fam-cx:css:", null, "none"));
      break;
    default:
      var floatVal = propSet.getSpecifiedPropertyValueNS
                       ("urn:x-suika-fam-cx:css:", "float");
      if (floatVal.getExpandedURI () == "urn:x-suika-fam-cx:css:none" &&
          parentPropSet != null /* not root element */) {
        return;
      }
      break;
    }
    
    switch (displayURI) {
    case "urn:x-suika-fam-cx:css:inline":
    case "urn:x-suika-fam-cx:css:run-in":
      propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "block"));
      var displayModel = propSet.getSpecifiedPropertyValueNS
                               ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                                "display-model");
      if (displayModel.getExpandedURI ()
                == "http://suika.fam.cx/~wakaba/archive/2005/11/css.inline-inside") {
        propSet.setPropertyValueNS
              ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
               "manakai", "display-model",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                     ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                      "manakai", "block-inside"));
            /*
              This rule, inserted for compatibility with CSS 2.1,
              prevents the root element's box being |inline-inside| by e.g.
                root {
                  display: inline;
                  -manakai-display-model: -manakai-inline-inside;
                }
              and some fix would be required when CSS3 module on visual formatting
              is revised.
            */
      }
      break;
    //case "urn:x-suika-fam-cx:css:inline-block":
    case "urn:x-suika-fam-cx:css:table-row-group":
    case "urn:x-suika-fam-cx:css:table-column":
    case "urn:x-suika-fam-cx:css:table-column-group":
    case "urn:x-suika-fam-cx:css:table-header-group":
    case "urn:x-suika-fam-cx:css:table-footer-group":
    case "urn:x-suika-fam-cx:css:table-row":
    case "urn:x-suika-fam-cx:css:table-cell":
    case "urn:x-suika-fam-cx:css:table-caption":
      propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "block"));
      propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-model",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "block-inside"));
      break;
    /*case "urn:x-suika-fam-cx:css:inline-table":
      propSet.setPropertyValueNS
            ("urn:x-suika-fam-cx:css:", null, "display",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "table"));
      break;*/
    }
  }
});


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
