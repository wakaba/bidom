JSAN.require ("cx.fam.suika.y2005.WebUA.VDocument");
JSAN.require ("cx.fam.suika.y2005.CSS.Property");

cx.fam.suika.y2005.WebUA.VDocumentCSS = function () {
};

/*
   Interface |VWindowElementCSS|
*/

/**
   Appends a new anonymous text.
*/
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.appendNewCSSAnonymousText =
function (s) {
  return this.appendChild (this.getOwnerDocument ().createTextNode (s));
};

/**
   Appends a new block-level box.
*/
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.appendNewCSSBlockBox =
function (computedStyle) {
  return this.appendChild (this._CreateCSSElement ("block", computedStyle));
};

/**
   Appends a new inline-level box.
*/
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.appendNewCSSInlineBox =
function (computedStyle) {
  return this.appendChild (this._CreateCSSElement ("inline", computedStyle));
};

cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype._CreateCSSElement =
function (localName, computedStyle) {    /* right */
  var el = this._Node.ownerDocument.createElement
               ("CX.FAM.SUIKA.Y2005.WEBUA.VDOCUMENTCSS.BOX");
  el._NamespaceURI = "http://suika.fam.cx/www/cx/fam/suika/y2005/WebUA/VDocumentCSS.";
  el._LocalName = localName;
  el._OwnerDocument = this._Node._OwnerDocument;
  el = cx.fam.suika.y2005.DOM.Node._GetDOMElement (el);
  el._SetComputedStyle (computedStyle);
  return el;
};


/**
   Renders a document with CSS.
   
   @param newDocument        The document to render, or |null| if clears.
   @param uaStyleSheetList   A list of user agent style sheets.
   @param userStyleSheetList A list of user style sheets.
*/
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.setContentDocumentCSS =
function (newDocument, uaStyleSheetList, userStyleSheetList) {
  this.setTextContent ("");
  this._Node._ContentDocument = newDocument;
  if (!newDocument) return;
  
  var mediaManager = null;
  
  var auss = new cx.fam.suika.y2005.CSS.StyleSheetList ();
  
  var docEl = newDocument.getDocumentElement ();
  if (!docEl) return;
  
  var comp = new cx.fam.suika.y2005.CSS.Property.Computer
               (uaStyleSheetList, userStyleSheetList);
  comp._UpdateComputedValueForMedia (auss, docEl, mediaManager);
  
  var els = [{type: "e", node: docEl, parentBox: this}];
  ELS: while (els.length > 0) {
    var el = els.shift ();
    switch (el.type) {
    case "e": 
      var computed = el.node._GetComputedValueSetForMedia (mediaManager);
      var display = computed.getSpecifiedPropertyValueNS
                      ("http://suika.fam.cx/~wakaba/archive/2005/11/css.",
                       "display-role");
      switch (display.getNamespaceURI () + display.getLocalName ()) {
      case "urn:x-suika-fam-cx:css:none":
        continue ELS;
      case "urn:x-suika-fam-cx:css:block":
        var elbox = el.parentBox.appendNewCSSBlockBox (computed);
        break;
      case "urn:x-suika-fam-cx:css:inline":
        var elbox = el.parentBox.appendNewCSSInlineBox (computed);
        break;
      }
      
      // block or inline
      var elChilds = el.node.getChildNodes ();
      var elChildsL = elChilds.getLength ();
      for (var i = 0; i < elChildsL; i++) {
        var elChild = elChilds.item (i);
        switch (elChild.getNodeType ()) {
        case elChild.ELEMENT_NODE:
          els.push ({type: "e", node: elChild, parentBox: elbox});
          break;
        case elChild.COMMENT_NODE:
        case elChild.PROCESSING_INSTRUCTION_NODE:
          break;
        /* TODO: entity reference */
        default:
          els.push ({type: "t", parentBox: elbox,
                     textContent: elChild.getTextContent ()});
          break;
        }
      }
      break;
    case "t":
      el.parentBox.appendNewCSSAnonymousText (el.textContent);
      break;
    }
  } /* ELS */
};

cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement = function (node) {
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement._superclass.apply
    (this, arguments);
};
cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.inherits
  (cx.fam.suika.y2005.DOM.Node.Element);

cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._SetComputedStyle =
function (computedStyle) {
  this._Node._ComputedStyle = computedStyle;
  
  /* |display| */
  var display = computedStyle.getSpecifiedPropertyValueNS
                  ("http://suika.fam.cx/~wakaba/archive/2005/11/css.", "display-role");
  switch (display.getExpandedURI ()) {
  case "urn:x-suika-fam-cx:css:block":
  case "urn:x-suika-fam-cx:css:inline":
  case "urn:x-suika-fam-cx:css:list-item":
  case "urn:x-suika-fam-cx:css:table":
  case "urn:x-suika-fam-cx:css:run-in":
  case "urn:x-suika-fam-cx:css:compact":
    this._Node.style.display = display.getLocalName ();
  }
  
  var copyProps = [
    ["urn:x-suika-fam-cx:css:", "float",
     this._EngineName == "Trident" ? "styleFloat" : "cssFloat"],
    ["urn:x-suika-fam-cx:css:", "position", "position"],
    ["urn:x-suika-fam-cx:css:", "visibility", "visibility"]
  ];
  for (var i in copyProps) {
    var prop = computedStyle.getSpecifiedPropertyValueNS
                 (copyProps[i][0], copyProps[i][1]);
    try {
      this._Node.style[copyProps[i][2]] = prop.getCSSText ();
    } catch (e) {
    
    }
  }
  copyProps /* <length> */ = [
    ["urn:x-suika-fam-cx:css:", "height", "height"],
    ["urn:x-suika-fam-cx:css:", "width", "width"],
    ["urn:x-suika-fam-cx:css:", "top", "top"],
    ["urn:x-suika-fam-cx:css:", "left", "left"],
    ["urn:x-suika-fam-cx:css:", "right", "right"],
    ["urn:x-suika-fam-cx:css:", "bottom", "bottom"],
    ["urn:x-suika-fam-cx:css:", "line-height", "lineHeight"],
    ["urn:x-suika-fam-cx:css:", "vertical-align", "verticalAlign"]
  ];
  for (var i in copyProps) {
    var prop = computedStyle.getSpecifiedPropertyValueNS
                 (copyProps[i][0], copyProps[i][1]);
    /* TODO: vw, vh, vm */
    try {
      this._Node.style[copyProps[i][2]] = prop.getCSSText ();
    } catch (e) {
      // WinIE 6 throws error if non-supported value.
    };
  }
  var overflowX = computedStyle.getSpecifiedPropertyValueNS
                    ("urn:x-suika-fam-cx:css:", "overflow-x").getExpandedURI ();
  var overflowY = computedStyle.getSpecifiedPropertyValueNS
                    ("urn:x-suika-fam-cx:css:", "overflow-y").getExpandedURI ();
  if (typeof (this._Node.style.overflowX) != "undefined") {
    switch (overflowX) {
    case "urn:x-suika-fam-cx:css:visible":
    case "urn:x-suika-fam-cx:css:auto":
    case "urn:x-suika-fam-cx:css:hidden":
    case "urn:x-suika-fam-cx:css:scroll":
      this._Node.style.overflowX = overflowX.substring (23);
    }
    switch (overflowY) {
    case "urn:x-suika-fam-cx:css:visible":
    case "urn:x-suika-fam-cx:css:auto":
    case "urn:x-suika-fam-cx:css:hidden":
    case "urn:x-suika-fam-cx:css:scroll":
      this._Node.style.overflowY = overflowY.substring (23);
    }
  } else {
    if (overflowX == "urn:x-suika-fam-cx:css:scroll" ||
        overflowY == "urn:x-suika-fam-cx:css:scroll") {
      this._Node.style.overflow = "scroll";
    } else if (overflowX == "urn:x-suika-fam-cx:css:auto" ||
               overflowY == "urn:x-suika-fam-cx:css:auto") {
      this._Node.style.overflow = "auto";
    } else if (overflowX == "urn:x-suika-fam-cx:css:visible" ||
               overflowY == "urn:x-suika-fam-cx:css:visible") {
      this._Node.style.overflow = "visible";
    } else {
      this._Node.style.overflow = "hidden";
    }
  }
};

cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._CreateCSSElement
  = cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype._CreateCSSElement;
cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype.appendNewCSSAnonymousText
  = cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype
    .appendNewCSSAnonymousText;
cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype.appendNewCSSBlockBox
  = cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.appendNewCSSBlockBox;
cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype.appendNewCSSInlineBox
  = cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.appendNewCSSInlineBox;

if (window.navigator.userAgent.match (/\bOpera[\/ ](\d+\.\d+)/)) {
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineName = "Opera";
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineVersion
    = parseFloat (RegExp.$1);
} else if (window.navigator.userAgent.match (/\bGecko\/(\d+)/)) {
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineName = "Gecko";
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineVersion
    = parseInt (RegExp.$1);
} else if (window.navigator.userAgent.match (/\bMSIE (\d+\.\d+)/)) {
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineName
    = "Trident";
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineVersion
    = parseInt (RegExp.$1);
} else {
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineName
    = "Unknown";
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype._EngineVersion = 0;
}

cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement.prototype.toString =
function () {
  return "[object CSSBox]";
};

cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBlockElement = function () {
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBlockElement._superclass.apply
    (this, arguments);
};
cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBlockElement.inherits
  (cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement);

cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSInlineElement = function () {
  cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSInlineElement._superclass.apply
    (this, arguments);
};
cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSInlineElement.inherits
  (cx.fam.suika.y2005.WebUA.VDocumentCSS.CSSBoxElement);

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
