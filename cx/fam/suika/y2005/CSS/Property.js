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


/**
   Interface |CSSPropertyValueComputer|
*/
cx.fam.suika.y2005.CSS.Property.Computer = function () {
};

cx.fam.suika.y2005.CSS.Property.Computer.prototype._UpdateComputedValueForMedia =
function (authorStyleSheetList, rootElement, mediaManager) {
  /* Gets enabled top-level style sheets */
  var uass = this._GetEnabledCSSStyleSheets
               (new cx.fam.suika.y2005.CSS.StyleSheetList (), mediaManager);
  var auss = this._GetEnabledCSSStyleSheets
               (authorStyleSheetList, mediaManager);
  var usss = this._GetEnabledCSSStyleSheets
               (new cx.fam.suika.y2005.CSS.StyleSheetList (), mediaManager);

  // ...
  var el = rootElement;
  var pvals = null;
  el._SetComputedValueSetForMedia = function (a) { el._ComputedStyle = a };
  
  /* Gets a set of rule sets applied to an element */
  var uadecls = this._GetStyleDeclarationsForElement (uass, el, mediaManager);
  var audecls = this._GetStyleDeclarationsForElement (auss, el, mediaManager);
  /* TODO: inline and override style sheets support */
  var usdecls = this._GetStyleDeclarationsForElement (usss, el, mediaManager);
  
  /* TODO: pseudo element support */
  uadecls = uadecls[""] != null ? uadecls[""][1] : [];
  audecls = audecls[""] != null ? audecls[""][1] : [];
  usdecls = usdecls[""] != null ? usdecls[""][1] : [];
  
  /* Gets a set of computed values for an element */
  var vals = this._GetCascadedValueSet (uadecls, usdecls, audecls, []);
  var proplist = [["urn:x-suika-fam-cx:css:", "display"]];
                /* mediaManager._GetSupportedPropertyNameList */
  this._ComputeSpecifiedValue (proplist, vals, pvals, mediaManager);
  this._ComputeComputedValue (proplist, vals, pvals, mediaManager);
  el._SetComputedValueSetForMedia (vals, mediaManager);
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
        for (var k = 0; k < selGroupLength; k++) {
          var sel = selGroup.item (k);
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
    var c = b[1].compareSpecificity (a[1]);  /* Selector specificity order */
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
  for (var i in props2) { props1.push (props2[i]) }
  for (var i in props3) { props1.push (props3[i]) }
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
    if (propSet.hasSpecifiedPropertyValueNS (pn[0], pn[1])) {
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
  P: for (var i in propList) {
    var pn = propList[i];
    var val = propSet.getSpecifiedPropertyValueNS (pn[0], pn[1]);
    var ppfx = propSet._GetPropertyPrefix (pn[0], pn[1]);
    switch (val.getCSSValueType ()) {
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


/*
    Property definitions and implementations
*/

cx.fam.suika.y2005.CSS.Property._PropImpl = function (v) {
  for (var i in v) {
    switch (i) {
    case "allowedKeywords":
      this._AllowedKeywords = [];
      while (true) {
        var ns = v[i].shift ();
        var lns = v[i].shift ();
        if (lns == null) break;
        this._AllowedKeywords[ns] = [];
        for (var j in lns) {
          this._AllowedKeywords[ns][lns[j]] = true;
        }
      }
      break;
    default:
      this[i] = v[i];
    }
  }
  if (typeof (this.prefix) == "undefined") this.prefix = null;
};
cx.fam.suika.y2005.CSS.Property._PropImpl.prototype.setSpecifiedValues =
function (ns, pfx, ln, prop, propset) {
  /* as is */
  propset.setPropertyValueNS (ns, pfx, ln, prop.getPropertyValue ());
};

/**
   Template for |setSpecifiedValues| method that if a keyword from a specific
   is the value then it is set as the cascaded value.
*/
cx.fam.suika.y2005.CSS.Property._PropImpl._SetSpecifiedValues_Keywords =
function (ns, pfx, ln, prop, propset) {
  var val = prop.getPropertyValue ();
  if (val.getCSSValueType () == val.CSS_PRIMITIVE_VALUE &&
      val.getPrimitiveType () == val.CSS_IDENT) {
    var valns = val.getNamespaceURI ();
    if (this._AllowedKeywords[valns]) {
      if (this._AllowedKeywords[valns][val.getLocalName ()]) {
        propset.setPropertyValueNS (ns, pfx, ln, val);
      }
    }
  }
};

cx.fam.suika.y2005.CSS.Property._PropImpl.prototype.setComputedValue =
function (ns, pfx, ln, val, propset, parentpropset) {
  // no action
};

cx.fam.suika.y2005.CSS.Property._Prop = {};
cx.fam.suika.y2005.CSS.Property._Prop["urn:x-suika-fam-cx:css:"] = {
  display: new cx.fam.suika.y2005.CSS.Property._PropImpl ({
    allowedKeywords: [
      "urn:x-suika-fam-cx:css:", ["block", "inline", "none"]
    ],
    initial: new cx.fam.suika.y2005.CSS.Value.IdentValue
                   ("urn:x-suika-fam-cx:css:", null, "inline"),
    setSpecifiedValues:
      cx.fam.suika.y2005.CSS.Property._PropImpl._SetSpecifiedValues_Keywords
  })
};

/* Revision: $Date: 2005/11/04 10:38:29 $ */

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
