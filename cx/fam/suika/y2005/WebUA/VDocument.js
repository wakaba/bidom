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
if (typeof (cx.fam.suika.y2005.WebUA) == "undefined") {
  cx.fam.suika.y2005.WebUA = {};
}

JSAN.require ("cx.fam.suika.y2005.DOM.Node");

/**
  Interface |VDocument|
  
  |Document| object emulated by an |Element| node.
  
  Typical Web browsers does not allow flexible embedding
  (i.e. without |frame| or |iframe| elements) of external |Document|
  to a window of another |Document|.  A |VDocument| object implements
  the |Document| interface while it is internally represented
  as a (native) |Element| node.  This "hack" enables a |Document|
  being embeded (as a "child" |Element|) into another |Document|.
*/
cx.fam.suika.y2005.WebUA.VDocument = function (node) {
  cx.fam.suika.y2005.DOM.Node.Node.apply (this, arguments);
  if (!cx.fam.suika.y2005.WebUA.VDocument._CompatTested) {
    cx.fam.suika.y2005.WebUA.VDocument._CompatTested = true;
    if (!node.ownerDocument.createElementNS) {
      cx.fam.suika.y2005.WebUA.VDocument.prototype.createElementNS =
      function (namespaceURI, qualifiedName) {
        var nm = qualifiedName.split (":", 2);
        var el = this._Node.ownerDocument
                           .createElement ("@" + (nm[1] ? nm[1] : nm[0]));
        el._NamespaceURI = namespaceURI;
        if (nm[1] != null) {
          el._Prefix = nm[0];
          el._LocalName = nm[1];
        } else {
          el._Prefix = null;
          el._LocalName = nm[0];
        }
        return cx.fam.suika.y2005.DOM.Node.getDOMElement (el);
      };
    }
  }
};
cx.fam.suika.y2005.WebUA.VDocument.inherits (cx.fam.suika.y2005.DOM.Node.Document);

cx.fam.suika.y2005.WebUA.VDocument._GetDOMNode = function (node) {
  if (node.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.ELEMENT_NODE) {
    var nodeName = node.nodeName;
    if (nodeName == "CX.FAM.SUIKA.Y2005.WEBUA.VDOCUMENT") {
      return cx.fam.suika.y2005.WebUA.VDocument._GetDOMDocument (node);
    } else if (nodeName == "CX.FAM.SUIKA.Y2005.WEBUA.VDOCUMENT.TEXT") {
      return new cx.fam.suika.y2005.WebUA.VDocument.Text (node);
    } else {
      return cx.fam.suika.y2005.DOM.Node._GetDOMNode (node);
    }
  } else {
    return cx.fam.suika.y2005.DOM.Node._GetDOMNode (node);
  }
};
cx.fam.suika.y2005.WebUA.VDocument._GetDOMDocument = function (node) {
  return new cx.fam.suika.y2005.WebUA.VDocument (node);
};

cx.fam.suika.y2005.WebUA.VDocument.prototype.createAttributeNS =
function (namespaceURI, qualifiedName) {
  var att = cx.fam.suika.y2005.WebUA.VDocument._super.getOwnerDocument.apply (this, [])
             .createAttributeNS (namespaceURI, qualifiedName);
  att._Node._OwnerDocument = this._Node;
  return att;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.createComment =
function (data) {
  var com = cx.fam.suika.y2005.WebUA.VDocument._super.getOwnerDocument.apply (this, [])
            .createComment (data);
  com._Node._OwnerDocument = this._Node;
  return com;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.createDocumentFragment =
function () {
  var df = cx.fam.suika.y2005.WebUA.VDocument._super.getOwnerDocument.apply (this, [])
           .createDocumentFragment ();
  df._Node._OwnerDocument = this._Node;
  return df;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.createElementNS =
function (namespaceURI, qualifiedName) {
  var altNamespaceURI = namespaceURI;
  if (namespaceURI == null) {
    altNamespaceURI = "http://suika.fam.cx/~wakaba/-temp/2003/09/27/null";
  } else if (namespaceURI == "http://www.w3.org/1999/xhtml") {
    altNamespaceURI = "http://suika.fam.cx/~wakaba/archive/2005/10/xhtml1#";
  }
  var el = cx.fam.suika.y2005.WebUA.VDocument._super.getOwnerDocument.apply (this, [])
           .createElementNS (altNamespaceURI, qualifiedName);
  el._Node._NamespaceURI = namespaceURI;
  el._Node._OwnerDocument = this._Node;
  return el;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.createEntityReference =
function (name) {
  var ref = cx.fam.suika.y2005.WebUA.VDocument._super.getOwnerDocument.apply (this, [])
            .createEntityReference (name);
  ref._Node._OwnerDocument = this._Node;
  return ref;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.createProcessingInstruction =
function (target, data) {
  var pi = cx.fam.suika.y2005.WebUA.VDocument._super.getOwnerDocument.apply (this, [])
           .createProcessingInstruction (target, data);
  pi._Node._OwnerDocument = this._Node;
  return pi;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.createTextNode =
function (data) {
  var txt = cx.fam.suika.y2005.WebUA.VDocument._super.getOwnerDocument.apply (this, [])
            .createTextNode (data);
  try {
    txt._Node._OwnerDocument = this._Node;
    return txt;
  } catch (e) {
    /* WinIE 6 does not allow setting of |Node./customProperty/|. */
    var el = this._Node.ownerDocument.createElement
               ("CX.FAM.SUIKA.Y2005.WEBUA.VDOCUMENT.TEXT");
    el.appendChild (txt._Node);
    el._OwnerDocument = this._Node;
    return cx.fam.suika.y2005.WebUA.VDocument._GetDOMNode (el);
  }
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getImplementation = function () {
  JSAN.require ("cx.fam.suika.y2005.DOM.Implementation");
  return new cx.fam.suika.y2005.DOM.Implementation.DOMImplementation
           (this._Node.ownerDocument.implementation);
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getLocalName = function () {
  return null;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getNamespaceURI = function () {
  return null;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getNextSibling = function () {
  return null;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getNodeType = function () {
  return this.DOCUMENT_NODE;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getOwnerDocument = function () {
  return null;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getParentElement = function () {
  return null;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getParentNode = function () {
  return null;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getPrefix = function () {
  return null;
};
cx.fam.suika.y2005.WebUA.VDocument.prototype.setPrefix = function (newPrefix) {};
cx.fam.suika.y2005.WebUA.VDocument.prototype.getPreviousSibling = function () {
  return null;
};

/** Interface |DocumentVDocument| */
cx.fam.suika.y2005.DOM.Node.Document._AddFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/WebUA/VDocument#", "1.0", {
    /**
       Creates a |VDocument| object.
       
         Note.  This method is defined on |Document| object rather than
                |DOMImplementation| object since a |VDocument| object
                is used within the context of a |Document|.
       
       @param namespaceURI  The namespace URI of the document element, or |null|.
       @param qualifiedName The qualified name of the document element.
                            If this parameter is specified, then the newly 
                            created |VDocument| object would have the document
                            element.  Otherwise, it is not created by the method.
       @return The newly created |VDocument| object.
    */
    createVDocument: function (namespaceURI, qualifiedName) {
      var doc = new cx.fam.suika.y2005.WebUA.VDocument
                  (this._Node.createElement ("CX.FAM.SUIKA.Y2005.WEBUA.VDOCUMENT"));
      doc._Node._GetDOMNode = cx.fam.suika.y2005.WebUA.VDocument._GetDOMNode;
      if (qualifiedName != null) {
        var root = doc.createElementNS (namespaceURI, qualifiedName);
        doc.appendChild (root);
        return cx.fam.suika.y2005.DOM.Node.getDOMDocument (doc._Node);
      } else {
        return doc;
      }
    },
    /**
       Creates a |VWindowElement| object.  Since it is an |Element| in
       the |Document|, it can be inserted anywhere in the |Document|
       (as long as the Web browser implementation allows it).
       
       @return The newly created |VWindowElement| object.
    */
    createVWindow: function () {
      var win = this.createElementNS
                  ("http://suika.fam.cx/www/cx/fam/suika/y2005/WebUA/VDocument#",
                   "vwindow")._Node;
      win._GetDOMNode = cx.fam.suika.y2005.DOM.Node._GetDOMElement;
      return cx.fam.suika.y2005.DOM.Node._GetDOMElement (win);
    }
  });

/**
   |Text| object emulated by an |Element| node with a child |Text| node.
   
   Since WinIE 6 does not allow |Text| nodes having custom properties,
   it cannot carry information on |ownerDocument|.  This class resolves
   the problem by wrapping each |Text| node with a container |Element|.
*/
cx.fam.suika.y2005.WebUA.VDocument.Text = function (node) {
  cx.fam.suika.y2005.DOM.Node.Node.apply (this, arguments);
  this._Node._GetDOMNode = cx.fam.suika.y2005.WebUA.VDocument._GetDOMNode;
};
cx.fam.suika.y2005.WebUA.VDocument.Text.inherits (cx.fam.suika.y2005.DOM.Node.Text);

cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.getData = function () {
  return this._Node.firstChild.data;
};
cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.setData =
function (newValue) {
  this._Node.firstChild.data = newValue;
};
cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.getNodeType = function () {
  return this.TEXT_NODE;
};
cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.getNodeValue
  = cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.getData;
cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.setNodeValue
  = cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.setData;
cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.getTextContent
  = cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.getData;
cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.setTextContent
  = cx.fam.suika.y2005.WebUA.VDocument.Text.prototype.setData;

/**
   Interface |VWindowElement|
   
   A |VWindowElement| object works as if it is an |HTMLIFrameElement|
   except that it displays a |VDocument| object instead of external documents.
*/
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement = function (node) {
  cx.fam.suika.y2005.DOM.Node.Element.apply (this, arguments);
};
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.inherits
  (cx.fam.suika.y2005.DOM.Node.Element);

cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.getChildNodes =
function () {
  return new cx.fam.suika.y2005.DOM.Node.NodeListArray ();
};

/**
   Returns the |VDocument| displayed in the window, if any, or |null|.
*/
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.getContentDocument =
function () {
  return typeof (this._Node._ContentDocument) != "undefined"
           ? this._Node._ContentDocument
           : this.getFirstChild ();
};
/**
   Displays the |VDocment| in the window.  If |null| is given, then
   the window is cleared.
*/
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.setContentDocument =
function (newValue) {
  this.setTextContent ("");
  if (newValue) this._Node.appendChild (newValue._Node);
};
cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.hasChildNodes =
function () {
  return false;
};

cx.fam.suika.y2005.WebUA.VDocument.VWindowElement.prototype.toString = function () {
  return "[object VWindowElement]";
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
