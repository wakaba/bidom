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
    var vals = this._GetCascadedValueSet (uadecls, usdecls, audecls, []);
    var proplist =
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
       
       ["urn:x-suika-fam-cx:css:", "position"],
         /* after |top|, |bottom|, |right|, |left|, |direction| */
       ["http://suika.fam.cx/~wakaba/archive/2005/11/css.props.", "display"]
         /* after |display|, |position|, and |float| */
      ];
                  /* mediaManager._GetSupportedPropertyNameList */
    this._ComputeSpecifiedValue (proplist, vals, el[1], mediaManager);
    this._ComputeComputedValue (proplist, vals, el[1], mediaManager);
    el[0]._SetComputedValueSetForMedia (vals, mediaManager);
    
    var elcs = el[0].getChildNodes ();
    var elcsl = elcs.getLength ();
    for (var i = 0; i < elcsl; i++) {
      var elc = elcs.item (i);
      if (elc.getNodeType () == elc.ELEMENT_NODE) {
        els.push ([elc, vals]);
      }
      /* TODO: entity reference node */
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
   Returns a set of cascaded property values.  This method
   receives four inputs of |_GetStyleDeclarationsForElement|'s result format
   and returns a |CSSPropertyDeclaration| object.
   
   @param userAgentDeclarations  A list of declarations from user agent style sheets.
   @param userDeclarations       A list of declarations from user style sheets.
   @param authorDeclarations     A list of declarations from author style sheets.
   @param overrideDeclarations   A list of declarations from override style sheets.
   @return A set of properties as a |CSSPropertyDeclaration| object.
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._GetCascadedValueSet =
function (userAgentDeclarations, userDeclarations,
          authorDeclarations, overrideDeclarations) {
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

  userAgentDeclarations = userAgentDeclarations.sort (cmps);
  for (var i in userAgentDeclarations) {
    var decls = userAgentDeclarations[i][0];
    var declsl = decls.getDeclarationLength ();
    for (var j = 0; j < declsl; j++) {
      var decl = decls.getDeclarationNode (j);
      if (decl.getCSSNodeType () == decl.CSS_PROPERTY_DECLARATION_NODE) {
        var im = decl.getPriority ();
        var imns = im.getNamespaceURI ();
        var imln = im.getLocalName ();
        if ((imns == "http://suika.fam.cx/~wakaba/archive/2005/cssc." &&
             imln == "normal") ||
            (imns == "urn:x-suika-fam-cx:css:" && imln == "important")) {
          props3.push (decl);
        }
      }
    }
  }

  userDeclarations = userDeclarations.sort (cmps);
  for (var i in userDeclarations) {
    var decls = userDeclarations[i][0];
    var declsl = decls.getDeclarationLength ();
    for (var j = 0; j < declsl; j++) {
      var decl = decls.getDeclarationNode (j);
      if (decl.getCSSNodeType () == decl.CSS_PROPERTY_DECLARATION_NODE) {
        var im = decl.getPriority ();
        var imns = im.getNamespaceURI ();
        var imln = im.getLocalName ();
        if (imns == "http://suika.fam.cx/~wakaba/archive/2005/cssc." &&
            imln == "normal") {
          props1.push (decl);
        } else if (imns == "urn:x-suika-fam-cx:css:" && imln == "important") {
          props3.push (decl);
        }
      }
    }
  }

  authorDeclarations = authorDeclarations.sort (cmps);
  for (var i in authorDeclarations) {
    var decls = authorDeclarations[i][0];
    var declsl = decls.getDeclarationLength ();
    for (var j = 0; j < declsl; j++) {
      var decl = decls.getDeclarationNode (j);
      if (decl.getCSSNodeType () == decl.CSS_PROPERTY_DECLARATION_NODE) {
        var im = decl.getPriority ();
        var imns = im.getNamespaceURI ();
        var imln = im.getLocalName ();
        if (imns == "http://suika.fam.cx/~wakaba/archive/2005/cssc." &&
            imln == "normal") {
          props1.push (decl);
        } else if (imns == "urn:x-suika-fam-cx:css:" && imln == "important") {
          props2.push (decl);
        }
      }
    }
  }

  overrideDeclarations = overrideDeclarations.sort (cmps);
  for (var i in overrideDeclarations) {
    var decls = overrideDeclarations[i][0];
    var declsl = decls.getDeclarationLength ();
    for (var j = 0; j < declsl; j++) {
      var decl = decls.getDeclarationNode (j);
      if (decl.getCSSNodeType () == decl.CSS_PROPERTY_DECLARATION_NODE) {
        var im = decl.getPriority ();
        var imns = im.getNamespaceURI ();
        var imln = im.getLocalName ();
        if (imns == "http://suika.fam.cx/~wakaba/archive/2005/cssc." &&
            imln == "normal") {
          props1.push (decl);
        } else if (imns == "urn:x-suika-fam-cx:css:" && imln == "important") {
          props2.push (decl);
        }
      }
    }
  }
  
  var propset = new cx.fam.suika.y2005.CSS.Property.PropertySet ();
  for (var i = 0; i < props2.length; i++) { props1.push (props2[i]) }
  for (var i = 0; i < props3.length; i++) { props1.push (props3[i]) }
  for (var i in props1) {
    var prop = props1[i];
    var propns = prop.getPropertyNamespaceURI ();
    var propln = prop.getPropertyLocalName ();
    var p = cx.fam.suika.y2005.CSS.Property._Prop[propns] != null
              ? cx.fam.suika.y2005.CSS.Property._Prop[propns][propln] : null;
    if (p == null) continue;
    p.setSpecifiedValues (propns, prop.getPropertyPrefix (), propln, prop, propset);
  }
  return propset;
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
   @param propSet   A property set containing cascaded values.
   @param parentPropSet A property set containing computed values of the
                    parent element, if any, or |null|.
   @param mediaManager A media manager.
                        ISSUE: Is this parameter necessary?
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._ComputeSpecifiedValue =
function (propList, propSet, parentPropSet, mediaManager) {
  for (var i in propList) {
    var pn = propList[i];
    if (pn[0] == "http://suika.fam.cx/~wakaba/archive/2005/11/css.props.") {
      continue;
    } else if (propSet.hasSpecifiedPropertyValueNS (pn[0], pn[1])) {
      continue;
    } else {
      var p = cx.fam.suika.y2005.CSS.Property._Prop[pn[0]] != null
                ? cx.fam.suika.y2005.CSS.Property._Prop[pn[0]][pn[1]] : null;
      if (parentPropSet != null && p.inherit) {
        propSet.setPropertyValueNS
          (pn[0], parentPropSet._GetPropertyPrefix (pn[0], pn[1]),
           pn[1], parentPropSet.getSpecifiedPropertyValueNS (pn[0], pn[1]));
      } else {
        propSet.setPropertyValueNS
          (pn[0], p.prefix, pn[1], p.initial);
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
   @param propSet   A property set containing cascaded values.
   @param parentPropSet A property set containing computed values of the
                    parent element, if any, or |null|.
   @param mediaManager A media manager.
                        ISSUE: Is this parameter necessary?
*/
cx.fam.suika.y2005.CSS.Property.Computer.prototype._ComputeComputedValue =
function (propList, propSet, parentPropSet, mediaManager) {
  P: for (var i = 0; i < propList.length; i++) {
    var pn = propList[i];
    if (pn[0] == "http://suika.fam.cx/~wakaba/archive/2005/11/css.props.") {
      /* Computes value from multiple properties' semi-computed values */
      cx.fam.suika.y2005.CSS.Property._Prop[pn[0]][pn[1]].setComputedValue
        (pn[0], null, pn[1], null, propSet, parentPropSet);
      continue P;
    }
    var val = propSet.getSpecifiedPropertyValueNS (pn[0], pn[1]);
    var ppfx = propSet._GetPropertyPrefix (pn[0], pn[1]);
    switch (val.getCSSValueType ()) {
    case val.CSS_INHERIT:
    case val.CSS_CASCADING_VALUE:
      var setToInitial = false;
      var p2 = false;
      switch (val.getNamespaceURI ()) {
      case "urn:x-suika-fam-cx:css:":
        switch (val.getLocalName ()) {
        case "inherit":
          if (parentPropSet != null) {
            propSet.setPropertyValueNS
              (pn[0], ppfx, pn[1],
               parentPropSet.getSpecifiedPropertyValueNS (pn[0], pn[1]));
            continue P;
          } else {
            setToInitial = true;
          }
        }
      case "http://suika.fam.cx/~wakaba/archive/2005/cssc.":
        switch (val.getLocalName ()) {
        case "initial":
          setToInitial = true;
          break;
        default:
          p2 = true;
        }
      }
      if (setToInitial) {
        var p = cx.fam.suika.y2005.CSS.Property._Prop[pn[0]] != null
                    ? cx.fam.suika.y2005.CSS.Property._Prop[pn[0]][pn[1]] : null;
        propSet.setPropertyValueNS (pn[0], ppfx, pn[1], p.initial);
        p2 = true;
      }
      if (p2 &&
          val.getCSSValueType () == val.CSS_CASCADING_VALUE &&
          val.getNamespaceURI () == "http://suika.fam.cx/~wakaba/archive/2005/cssc.") {
        switch (val.getLocalName ()) {
        case "left-or-right-by-direction":
          var dirval = propSet.getSpecifiedPropertyValueNS
                         ("urn:x-suika-fam-cx:css:", "direction");
          if (dirval && dirval.getCSSValueType () == dirval.CSS_PRIMITIVE_VALUE &&
              dirval.getPrimitiveType () == dirval.CSS_IDENT &&
              dirval.getNamespaceURI () == "urn:x-suika-fam-cx:css:") {
            switch (dirval.getLocalName ()) {
            case "ltr":
              propSet.setPropertyValueNS
                (pn[0], ppfx, pn[1],
                 new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "left"));
              break;
            case "rtl":
              propSet.setPropertyValueNS
                (pn[0], ppfx, pn[1],
                 new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "right"));
              break;
            }
          }
        }
      }
      continue P;
    } /* CASCADING_VALUE */
    
    var p = cx.fam.suika.y2005.CSS.Property._Prop[pn[0]] != null
              ? cx.fam.suika.y2005.CSS.Property._Prop[pn[0]][pn[1]] : null;
    p.setComputedValue (pn[0], ppfx, pn[1], val, propSet, parentPropSet);
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
  this.v = [];
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
   A template for property definitions.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl = function (v) {
  this._AllowedKeyword = [];
  this._AllowedKeyword["urn:x-suika-fam-cx:css:"] = {
    inherit: true
  };
  this._AllowedKeyword["http://suika.fam.cx/~wakaba/archive/2005/cssc."] = {
    initial: true
  };
  for (var i in v) {
    switch (i) {
    case "allowedKeyword":
      while (true) {
        var ns = v[i].shift ();
        var lns = v[i].shift ();
        if (lns == null) break;
        if (!this._AllowedKeyword[ns]) this._AllowedKeyword[ns] = [];
        for (var j in lns) {
          this._AllowedKeyword[ns][lns[j]] = true;
        }
      }
      break;
    default:
      this[i] = v[i];
    }
  }
  if (typeof (this.prefix) == "undefined") this.prefix = null;
};

/**
   Converts cascaded value into a set of specified values.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl.prototype.setSpecifiedValues =
function (ns, pfx, ln, prop, propset) {
  /* as is */
  propset.setPropertyValueNS (ns, pfx, ln, prop.getPropertyValue ());
};

/**
   Converts specified value into computed value.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl.prototype.setComputedValue =
function (ns, pfx, ln, val, propSet, parentPropSet) {
  // no action
};

/**
   A template for property definitions that only allows one keyword.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword = function () {
  cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword._superclass.apply
    (this, arguments);
};
cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword.inherits
  (cx.fam.suika.y2005.CSS.Property._PropImpl);

/**
   Template for |parsePropertyValue| property for properties that only
   allows a set of one keywords.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword.prototype.parsePropertyValue =
function (block, prop) {
  var val = this._GetNextValue ();
  if (val == null) return false;
  var valtype = val.getCSSValueType ();
  if ((valtype == val.CSS_PRIMITIVE_VALUE &&
       val.getPrimitiveType () == val.CSS_IDENT) ||
      valtype == val.CSS_INHERIT ||
      valtype == val.CSS_CASCADING_VALUE) {
    var im = this._GetPriority ();
    if (im) {
      var p = this._Factory.createCSSPropertyNS
                  (prop.namespaceURI, prop.prefix, prop.localName, val);
      p.setPriority (im);
      block.appendPropertyNode (p);
      return true;
    }
  }
};

/**
   Template for |setSpecifiedValues| method that if a keyword from a specific
   is the value then it is set as the cascaded value.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword.prototype.setSpecifiedValues =
function (ns, pfx, ln, prop, propset) {
  var val = prop.getPropertyValue ();
  var valtype = val.getCSSValueType ();
  if ((valtype == val.CSS_PRIMITIVE_VALUE &&
       val.getPrimitiveType () == val.CSS_IDENT) ||
      valtype == val.CSS_INHERIT ||
      valtype == val.CSS_CASCADING_VALUE) {
    var valns = val.getNamespaceURI ();
    if (this._AllowedKeyword[valns]) {
      if (this._AllowedKeyword[valns][val.getLocalName ()]) {
        propset.setPropertyValueNS (ns, pfx, ln, val);
      }
    }
  }
};


/**
   A template for property definitions that allows a length.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl_Length = function () {
  cx.fam.suika.y2005.CSS.Property._PropImpl_Length._superclass.apply
    (this, arguments);
};
cx.fam.suika.y2005.CSS.Property._PropImpl_Length.inherits
  (cx.fam.suika.y2005.CSS.Property._PropImpl);

cx.fam.suika.y2005.CSS.Property._PropImpl_Length.prototype.parsePropertyValue =
function (block, prop, propDef) {
  var val = this._GetNextValue ();
  if (val == null) return false;
  var valtype = val.getCSSValueType ();
  if ((valtype == val.CSS_PRIMITIVE_VALUE &&
       (val.matchPrimitiveType (val.CSS_LENGTH) ||
        val.matchPrimitiveType (val.CSS_PERCENTAGE) ||
        val.getPrimitiveType () == val.CSS_IDENT ||
        (propDef._NumberAllowed && val.getPrimitiveType () == val.CSS_NUMBER))) ||
      valtype == val.CSS_INHERIT ||
      valtype == val.CSS_CASCADING_VALUE) {
    var im = this._GetPriority ();
    if (im) {
      var p = this._Factory.createCSSPropertyNS
                  (prop.namespaceURI, prop.prefix, prop.localName, val);
      p.setPriority (im);
      block.appendPropertyNode (p);
      return true;
    }
  }
};

cx.fam.suika.y2005.CSS.Property._PropImpl_Length.prototype.setSpecifiedValues =
function (ns, pfx, ln, prop, propSet) {
  var val = prop.getPropertyValue ();
  var valtype = val.getCSSValueType ();
  if (valtype == val.CSS_PRIMITIVE_VALUE) {
    var ptype = val.getPrimitiveType ();
    if (val.matchPrimitiveType (val.CSS_LENGTH)) {
      switch (val.getUnitExpandedURI ()) {
      case "urn:x-suika-fam-cx:css:em":
        /* TODO */
        if (!this._NegativeNotAllowed || val.getValue () >= 0) {
          propSet.setPropertyValueNS (ns, pfx, ln, val);
        }
        break;
      case "urn:x-suika-fam-cx:css:px":
      case "urn:x-suika-fam-cx:css:vw":
      case "urn:x-suika-fam-cx:css:vh":
      case "urn:x-suika-fam-cx:css:vm":
      case "urn:x-suika-fam-cx:css:in":
      case "urn:x-suika-fam-cx:css:cm":
      case "urn:x-suika-fam-cx:css:mm":
      case "urn:x-suika-fam-cx:css:pt":
      case "urn:x-suika-fam-cx:css:pc":
        if (!this._NegativeNotAllowed || val.getValue () >= 0) {
          propSet.setPropertyValueNS (ns, pfx, ln, val);
        }
        break;
      case "urn:x-suika-fam-cx:css:gd":
      case "urn:x-suika-fam-cx:css:rem":
      case "urn:x-suika-fam-cx:css:ex":
        /* TODO */
        if (!this._NegativeNotAllowed || val.getValue () >= 0) {
          propSet.setPropertyValueNS (ns, pfx, ln, val);
        }
        break;
      default:
      }
    } else if (val.matchPrimitiveType (val.CSS_PERCENTAGE)) {
      if (!this._NegativeNotAllowed || val.getValue () >= 0) {
        propSet.setPropertyValueNS (ns, pfx, ln, val);
      }
      return;
    } else if (this._NumberAllowed && ptype == val.CSS_NUMBER) {
      if (!this._NegativeNotAllowed || val.getValue () >= 0) {
        propSet.setPropertyValueNS (ns, pfx, ln, val);
      }
      return;
    }
  }
  if ((valtype == val.CSS_PRIMITIVE_VALUE &&
       val.getPrimitiveType () == val.CSS_IDENT) ||
      valtype == val.CSS_INHERIT ||
      valtype == val.CSS_CASCADING_VALUE) {
    var valns = val.getNamespaceURI ();
    if (this._AllowedKeyword[valns]) {
      if (this._AllowedKeyword[valns][val.getLocalName ()]) {
        propSet.setPropertyValueNS (ns, pfx, ln, val);
      }
    }
  }
};

/* Actual property definitions */

cx.fam.suika.y2005.CSS.Property._Prop = {};
cx.fam.suika.y2005.CSS.Property._Prop["urn:x-suika-fam-cx:css:"] = {
  clear: new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["both", "left", "none", "right"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "none")
  }),
  "bottom": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    /* computed value might be amended in |position| computing */
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  direction: new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["ltr"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "ltr")
  }),
  display: new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    setSpecifiedValues: function (ns, pfx, ln, prop, propSet) {
      var val = prop.getPropertyValue ();
      var valtype = val.getCSSValueType ();
      if (valtype == val.CSS_PRIMITIVE_VALUE &&
          val.getPrimitiveType () == val.CSS_IDENT) {
        var valln = val.getLocalName ();
        switch (val.getNamespaceURI () + valln) {
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
        case "http://suika.fam.cx/~wakaba/archive/2005/11/css.ruby-base":
        case "http://suika.fam.cx/~wakaba/archive/2005/11/css.ruby-text":
        case "http://suika.fam.cx/~wakaba/archive/2005/11/css.ruby-base-group":
        case "http://suika.fam.cx/~wakaba/archive/2005/11/css.ruby-text-group":
          propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, valln));
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
                   ("urn:x-suika-fam-cx:css:", null, valln));
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
        case "http://suika.fam.cx/~wakaba/archive/2005/11/css.ruby":
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
                    "manakai", "ruby"));
          break;
        }
      } else if (valtype == val.CSS_INHERIT ||
                 valtype == val.CSS_CASCADING_VALUE) {
        var valns = val.getNamespaceURI ();
        if (this._AllowedKeyword[valns]) {
          if (this._AllowedKeyword[valns][val.getLocalName ()]) {
            propSet.setPropertyValueNS
              ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
               "manakai", "display-role", val);
            propSet.setPropertyValueNS
              ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
               "manakai", "display-model", val);
          }
        }
      }
    }
  }),
  "float": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["left", "none", "right"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "none")
  }),
  "height": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  "left": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    /* computed value might be amended in |position| computing */
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  "line-height": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["normal"]
    ],
    inherit: true,
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "normal"),
    _NegativeNotAllowed: true,
    _NumberAllowed: true
  }),
  "max-height": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  "max-width": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  "min-height": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  "min-width": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  overflow: new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    setSpecifiedValues: function (ns, pfx, ln, prop, propSet) {
      var val = prop.getPropertyValue ();
      var valtype = val.getCSSValueType ();
      if (valtype == val.CSS_PRIMITIVE_VALUE &&
          val.getPrimitiveType () == val.CSS_IDENT) {
        var valln = val.getLocalName ();
        switch (val.getNamespaceURI () + valln) {
        case "urn:x-suika-fam-cx:css:auto":
        case "urn:x-suika-fam-cx:css:hidden":
        case "urn:x-suika-fam-cx:css:scroll":
        case "urn:x-suika-fam-cx:css:visible":
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-x", val);
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-y", val);
          break;
        case "urn:x-suika-fam-cx:css:-moz-scrollbars-none":
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-x",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "scroll"));
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-y",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "scroll"));
          propSet.setPropertyValueNS
              ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
               "manakai", "scroller",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "invisible"));
          break;
        case "urn:x-suika-fam-cx:css:-moz-scrollbars-horizontal":
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-x",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "scroll"));
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-y",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto"));
          propSet.setPropertyValueNS
              ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
               "manakai", "scroller",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "scrollbar"));
          break;
        case "urn:x-suika-fam-cx:css:-moz-scrollbars-vertical":
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-x",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto"));
          propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-y",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "scroll"));
          propSet.setPropertyValueNS
              ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
               "manakai", "scroller",
               new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "scrollbar"));
          break;
        }
      } else if (valtype == val.CSS_INHERIT ||
                 valtype == val.CSS_CASCADING_VALUE) {
        var valns = val.getNamespaceURI ();
        if (this._AllowedKeyword[valns]) {
          if (this._AllowedKeyword[valns][val.getLocalName ()]) {
            propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-x", val);
            propSet.setPropertyValueNS
              ("urn:x-suika-fam-cx:css:", null, "overflow-y", val);
          }
        }
      }
    }
  }),
  "overflow-x": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    /* CSS3 box model WD, WinIE 5.0+, Firefox 1.5+ */
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto", "hidden", "scroll", "visible"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "visible")
  }),
  "overflow-y": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    /* CSS3 box model WD, WinIE 5.0+, Firefox 1.5+ */
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto", "hidden", "scroll", "visible"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "visible"),
    setComputedValue: function (ns, pfx, ln, val, propSet, parentPropSet) {
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
    }
  }),
  position: new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["absolute", "fixed", "relative", "static"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "static"),
    setComputedValue: function (ns, pfx, ln, val, propSet, parentPropSet) {
      switch (val.getExpandedURI ()) {
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
        if (leftVal.getCSSValueType () == leftVal.CSS_PRIMITIVE_VALUE &&
            leftVal.getPrimitiveType () == leftVal.CSS_IDENT &&
            leftVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
          var rightVal = propSet.getSpecifiedPropertyValueNS
                           ("urn:x-suika-fam-cx:css:", "right");
          if (rightVal.getCSSValueType () == rightVal.CSS_PRIMITIVE_VALUE &&
              rightVal.getPrimitiveType () == rightVal.CSS_IDENT &&
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
          if (rightVal.getCSSValueType () == rightVal.CSS_PRIMITIVE_VALUE &&
              rightVal.getPrimitiveType () == rightVal.CSS_IDENT &&
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
        if (topVal.getCSSValueType () == topVal.CSS_PRIMITIVE_VALUE &&
            topVal.getPrimitiveType () == topVal.CSS_IDENT &&
            topVal.getExpandedURI () == "urn:x-suika-fam-cx:css:auto") {
          var bottomVal = propSet.getSpecifiedPropertyValueNS
                           ("urn:x-suika-fam-cx:css:", "bottom");
          if (bottomVal.getCSSValueType () == bottomVal.CSS_PRIMITIVE_VALUE &&
              bottomVal.getPrimitiveType () == bottomVal.CSS_IDENT &&
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
          if (bottomVal.getCSSValueType () == bottomVal.CSS_PRIMITIVE_VALUE &&
              bottomVal.getPrimitiveType () == bottomVal.CSS_IDENT &&
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
    }
  }),
  "right": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    /* computed value might be amended in |position| computing */
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  "top": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    /* computed value might be amended in |position| computing */
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  }),
  "unicode-bidi": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["normal"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "normal")
  }),
  "vertical-align": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["baseline", "bottom", "middle", "sub",
                                  "super", "text-bottom", "text-top", "top"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "baseline")
  }),
  "visibility": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["collapse", "visible", "hidden"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "visible")
  }),
  "width": new cx.fam.suika.y2005.CSS.Property._PropImpl_Length ({
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:", ["auto"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "auto")
  })
};
cx.fam.suika.y2005.CSS.Property._Prop
["http://suika.fam.cx/~wakaba/archive/2005/11/css."] = {
  "display-model": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    /* CSS3 Box model WD */
    allowedKeyword: [
      "http://suika.fam.cx/~wakaba/archive/2005/11/css.",
        ["block-inside", "inline-inside"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "inline-inside"),
    prefix: "manakai"
  }),
  "display-role": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    /* CSS3 Box model WD */
    allowedKeyword: [
      "urn:x-suika-fam-cx:css:",
        ["block", "compact", "inline", "list-item", "none", "run-in",
         "table", "table-caption", "table-cell", "table-column",
         "table-column-group", "table-footer-group", "table-header-group",
         "table-row", "table-row-group"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "inline"),
    prefix: "manakai"
  }),
  "scroller": new cx.fam.suika.y2005.CSS.Property._PropImpl_Keyword ({
    /* CSS3 Box model WD editor's note */
    allowedKeyword: [
      "http://suika.fam.cx/~wakaba/archive/2005/11/css.", ["scrollbar", "invisible"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                    "manakai", "scrollbar"),
    prefix: "manakai"
  })
};
cx.fam.suika.y2005.CSS.Property._Prop
["http://suika.fam.cx/~wakaba/archive/2005/11/css.props."] = {
  "display": {
    parsePropertyValue: function () { return false },
    setComputedValue: function (ns, _1, ln, _2, propSet, parentPropSet) {
      var display = propSet.getSpecifiedPropertyValueNS
                      ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                       "display-role");
      var displayNS = display.getNamespaceURI ();
      var displayLN = display.getLocalName ();
      if (displayLN == "none" && displayNS == "urn:x-suika-fam-cx:css:") {
        return; /* |position| and |float| do not apply */
      }
      var position = propSet.getSpecifiedPropertyValueNS
                      ("urn:x-suika-fam-cx:css:", "position");
      var positionLN = position.getLocalName ();
      if ((positionLN == "absolute" || positionLN == "fixed") &&
          position.getNamespaceURI () == "urn:x-suika-fam-cx:css:") {
        propSet.setPropertyValueNS
          ("urn:x-suika-fam-cx:css:", null, "float",
           new cx.fam.suika.y2005.CSS.Value.IdentValue
                 ("urn:x-suika-fam-cx:css:", null, "none"));
      } else {
        var floatV = propSet.getSpecifiedPropertyValueNS
                       ("urn:x-suika-fam-cx:css:", "float");
        if (floatV.getLocalName () == "none" &&
            floatV.getNamespaceURI () == "urn:x-suika-fam-cx:css:" &&
            parentPropSet != null) {
          return;
        }
      }
      if (displayNS == "urn:x-suika-fam-cx:css:") {
        switch (displayLN) {
        case "inline":
        case "run-in":
          propSet.setPropertyValueNS
            ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
             "manakai", "display-role",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "block"));
          var displayModel = propSet.getSpecifiedPropertyValueNS
                               ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                                "display-model");
          if (displayModel.getNamespaceURI () + displayModel.getLocalName ()
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
        //case "inline-block":
        case "table-row-group":
        case "table-column":
        case "table-column-group":
        case "table-header-group":
        case "table-footer-group":
        case "table-row":
        case "table-cell":
        case "table-caption":
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
        /*case "inline-table":
          propSet.setPropertyValueNS
            ("urn:x-suika-fam-cx:css:", null, "display",
             new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "table"));
          break;*/
        }
      }
    }
  }
};

/* Revision: $Date: 2005/11/05 12:04:34 $ */

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
