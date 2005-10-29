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
if (typeof (cx.fam.suika.y2005.DOM) == "undefined") {
  cx.fam.suika.y2005.DOM = {};
}
if (typeof (cx.fam.suika.y2005.DOM.HTML) == "undefined") {
  cx.fam.suika.y2005.DOM.HTML = {};
}

cx.fam.suika.y2005.DOM.HTML.EXPORT_OK
  = ["getSHTMLElement", "getSHTMLDocument"];

JSAN.require ("cx.fam.suika.y2005.DOM.Node");

cx.fam.suika.y2005.DOM.HTML._GetSHTMLNode = function (n) {
  if (!n) {
    return null;
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.ELEMENT_NODE) {
    return cx.fam.suika.y2005.DOM.HTML.getSHTMLElement (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.DOCUMENT_NODE) {
    return cx.fam.suika.y2005.DOM.HTML.getSHTMLDocument (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.ATTRIBUTE_NODE) {
    return cx.fam.suika.y2005.DOM.HTML.getSHTMLAttr (n);
  } else {
    return cx.fam.suika.y2005.DOM.Node._GetDOMNode (n);
  }
};


/* HTMLDocument */

cx.fam.suika.y2005.DOM.HTML.HTMLDocument = function (node) {
  cx.fam.suika.y2005.DOM.HTML.HTMLDocument._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.DOM.HTML.HTMLDocument.inherits
  (cx.fam.suika.y2005.DOM.Node.Document);

cx.fam.suika.y2005.DOM.HTML.HTMLDocument.prototype.toString = function () {
  return "[object HTMLDocument]";
};

/* SHTMLDocument - for classic HTML implementation */

cx.fam.suika.y2005.DOM.HTML.SHTMLDocument = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLDocument._superclass.apply (this, [node]);
  if (!this._Node._GetDOMNode) {
    this._Node._GetDOMNode
      = cx.fam.suika.y2005.DOM.HTML._GetSHTMLNode;
  }
};
cx.fam.suika.y2005.DOM.HTML.SHTMLDocument.inherits
  (cx.fam.suika.y2005.DOM.HTML.HTMLDocument);
cx.fam.suika.y2005.DOM.HTML.getSHTMLDocument = function (d) {
  return new cx.fam.suika.y2005.DOM.HTML.SHTMLDocument (d);
};

/* HTMLElement */

cx.fam.suika.y2005.DOM.HTML.HTMLElement = function (node) {
  cx.fam.suika.y2005.DOM.HTML.HTMLElement._superclass.apply (this, [node]);
};
cx.fam.suika.y2005.DOM.HTML.HTMLElement.inherits
  (cx.fam.suika.y2005.DOM.Node.Element);

cx.fam.suika.y2005.DOM.HTML.HTMLElement.prototype.toString = function () {
  return "[object HTMLElement]";
};

/* SHTMLElement - for classic HTML implementation */

cx.fam.suika.y2005.DOM.HTML.SHTMLElement = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLElement._superclass.apply (this, arguments);
  if (!this._Node.ownerDocument._GetDOMNode) {
    this._Node.ownerDocument._GetDOMNode
      = cx.fam.suika.y2005.DOM.HTML._GetSHTMLNode;
  }
};
cx.fam.suika.y2005.DOM.HTML.SHTMLElement.inherits
  (cx.fam.suika.y2005.DOM.HTML.HTMLElement);

cx.fam.suika.y2005.DOM.HTML.getSHTMLElement = function (d) {
  if (d.namespaceURI == null && d.localName == null &&
      (d._NamespaceURI == null || d._NamespaceURI == "http://www.w3.org/1999/xhtml")) {
    if (d.nodeName == "SCRIPT") {
      return new cx.fam.suika.y2005.DOM.HTML.SHTMLScriptElement (d);
    } else if (d.nodeName == "TITLE") {
      return new cx.fam.suika.y2005.DOM.HTML.SHTMLTitleElement (d);
    } else if (d.nodeName == "COMMENT") {
      return new cx.fam.suika.y2005.DOM.HTML.SHTMLCommentElement (d);
    }
  }
  return new cx.fam.suika.y2005.DOM.HTML.SHTMLElement (d);
};

cx.fam.suika.y2005.DOM.HTML.SHTMLElement.prototype.getLocalName = function () {
  var ln = cx.fam.suika.y2005.DOM.HTML.SHTMLElement._super.getLocalName.apply
             (this, arguments);
  var ns = this.getNamespaceURI ();
  if (ns == "http://www.w3.org/1999/xhtml" &&
      typeof (this._Node._LocalName) == "undefined") {
    return ln.toLowerCase ();
  } else {
    return ln;
  }
};
cx.fam.suika.y2005.DOM.HTML.SHTMLElement.prototype.getNamespaceURI = function () {
  var ns = cx.fam.suika.y2005.DOM.HTML.SHTMLElement._super.getNamespaceURI.apply
             (this, arguments);
  if (ns == null && typeof (this._Node._NamespaceURI) == "undefined") {
    return "http://www.w3.org/1999/xhtml";
  } else {
    return ns;
  }
};

/* SHTMLTextElement - element content can be retrieved from |text| property */

cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.inherits
  (cx.fam.suika.y2005.DOM.HTML.SHTMLElement);

cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.getChildNodes = function () {
  return new cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeList (this._Node);
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.getFirstChild = function () {
  if (this._Node.text.length > 0) {
    return new cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText (this._Node);
  } else {
    return null;
  }
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.hasChildNodes = function () {
  return (this._Node.text.length > 0 ? true : false);
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.getLastChild
  = cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.getFirstChild;
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.getText = function () {
  return this._Node.text;
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.setText = function (newValue) {
  this._Node.text = newValue;
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.getTextContent
  = cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.getText;
cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.setTextContent
  = cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement.prototype.setText;

/* SHTMLTitleElement */

cx.fam.suika.y2005.DOM.HTML.SHTMLTitleElement = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLTitleElement._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTitleElement.inherits
  (cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement);

/* SHTMLScriptElement */

cx.fam.suika.y2005.DOM.HTML.SHTMLScriptElement = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLScriptElement._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.DOM.HTML.SHTMLScriptElement.inherits
  (cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement);

/* SHTMLCommentElement */

cx.fam.suika.y2005.DOM.HTML.SHTMLCommentElement = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLCommentElement._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.DOM.HTML.SHTMLCommentElement.inherits
  (cx.fam.suika.y2005.DOM.HTML.SHTMLTextElement);

/* SHTMLAttr - for classic HTML implementation */

cx.fam.suika.y2005.DOM.HTML.SHTMLAttr = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLAttr._superclass.apply (this, [node]);
  if (!this._Node.ownerDocument._GetDOMNode) {
    this._Node.ownerDocument._GetDOMNode
      = cx.fam.suika.y2005.DOM.HTML._GetSHTMLNode;
  }
};
cx.fam.suika.y2005.DOM.HTML.SHTMLAttr.inherits
  (cx.fam.suika.y2005.DOM.Node.Attr);

cx.fam.suika.y2005.DOM.HTML.getSHTMLAttr = function (d) {
  return new cx.fam.suika.y2005.DOM.HTML.SHTMLAttr (d);
};

cx.fam.suika.y2005.DOM.HTML.SHTMLAttr.prototype.getNamespaceURI = function () {
  var ns = cx.fam.suika.y2005.DOM.HTML.SHTMLAttr._super.getNamespaceURI.apply
             (this, arguments);
  if (ns == null && this.getLocalName () == "xmlns") {
    return "http://www.w3.org/2000/xmlns/";
  } else {
    return ns;
  }
};
cx.fam.suika.y2005.DOM.HTML.SHTMLAttr.prototype.getPrefix = function () {
  var pfx = cx.fam.suika.y2005.DOM.HTML.SHTMLAttr._super.getPrefix.apply
             (this, arguments);
  if (pfx == "XML") {
    return pfx;
  } else {
    return pfx;
  }
};

cx.fam.suika.y2005.DOM.HTML.SHTMLAttr.prototype.toString = function () {
  return "[object HTMLAttr]";
};

/* Text */

cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText = function (node) {
  cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.inherits
  (cx.fam.suika.y2005.DOM.Node.Text);

cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.getData = function () {
  return this._Node.text;
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.setData = function (newValue) {
  this._Node.text = newValue;
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.getNodeType = function () {
  return this.TEXT_NODE;
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.getNodeValue
  = cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.getData;
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.setNodeValue
  = cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.setData;
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.getTextContent
  = cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.getData;
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.setTextContent
  = cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText.prototype.setData;

/* NodeList */

cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeList = function (n) {
  this._Node = n;
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeList.inherits
  (cx.fam.suika.y2005.DOM.Node.NodeList);

cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeList.prototype.item = function (n) {
  if (this._Node.text.length > 0 && n == 0) {
    return new cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeText (this._Node);
  } else {
    JSAN.require ("cx.fam.suika.y2005.DOM.Core");
    throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.INDEX_SIZE_ERR,
                     'There is no ' + n + 'th child node');
  }
};
cx.fam.suika.y2005.DOM.HTML.SHTMLTextNodeList.prototype.getLength = function () {
  if (this._Node.text.length > 0) {
    return 1;
  } else {
    return 0;
  }
};

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
