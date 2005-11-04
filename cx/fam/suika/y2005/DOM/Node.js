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
if (typeof (cx.fam.suika.y2005.DOM.Node) == "undefined") {
  cx.fam.suika.y2005.DOM.Node = {};
}

cx.fam.suika.y2005.DOM.Node.EXPORT_OK
  = ["getDOMElement", "getDOMDocument", "getDOMPI",
     "requireDOMNodeFeature"];

cx.fam.suika.y2005.DOM.Node._AddFeature =
function (cls, feature, version, impl) {
  feature = feature.toLowerCase ();
  var sf = cls._SupportedFeature;
  if (sf[feature] == null) {
    sf[feature] = {};
  }
  if (sf[feature][version]) {
    JSAN.require ("cx.fam.suika.y2005.Error");
    new cx.fam.suika.y2005.Error.RuntimeWarning
          ('Feature "' + feature + '" version "' + version +
           '" is already defined').report ();
    return;
  }
  sf[feature][version] = true;
  for (var n in impl) {
    if (n == "_Constructor") {
      if (cls._Constructor == undefined) {
        cls._Constructor = [];
      }
      cls._Constructor.push (impl[n]);
    } else if (cls.prototype[n] != null) {
      JSAN.require ("cx.fam.suika.y2005.Error");
      new cx.fam.suika.y2005.Error.RuntimeWarning
            ("Method " + n + " is already defined").report ();
    } else {
      cls.prototype[n] = impl[n];
    }
  }
};
cx.fam.suika.y2005.DOM.Node.requireDOMNodeFeature = function (feature, version) {
  feature = feature.toLowerCase ();
  if (!cx.fam.suika.y2005.DOM.Node._FeatureModule[feature] ||
      !cx.fam.suika.y2005.DOM.Node._FeatureModule[feature][version]) {
    JSAN.require ("cx.fam.suika.y2005.DOM.Core");
    throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     'Feature "' + feature + '" version "' + version +
                     '" is not supported');
  } else {
    JSAN.require (cx.fam.suika.y2005.DOM.Node._FeatureModule[feature][version]);
  }
};
cx.fam.suika.y2005.DOM.Node._FeatureModule = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule["events"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule["events"]["3.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.DOM.Events";
cx.fam.suika.y2005.DOM.Node._FeatureModule["css"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule["css"]["2.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.DOM.CSS";
cx.fam.suika.y2005.DOM.Node._FeatureModule["html"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule["html"]["5.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.DOM.HTML";
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementclass#"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementclass#"]["1.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.ElementClass";
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementview#"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementview#"]["1.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.ElementView";
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementbox#"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementbox#"]["1.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.ElementBox";
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementview/movable#"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/elementview/movable#"]["1.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.ElementView.Movable";
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/webua/vdocument#"] = {};
cx.fam.suika.y2005.DOM.Node._FeatureModule
["http://suika.fam.cx/www/cx/fam/suika/y2005/webua/vdocument#"]["1.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.WebUA.VDocument";

JSAN.require ("cx.fam.suika.y2005.Class.Inherit");

/* Node */

cx.fam.suika.y2005.DOM.Node.Node = function (node) {
  this._Node = node;  /* Original Node object */
  for (var i in cx.fam.suika.y2005.DOM.Node.Node._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Node._Constructor[i].apply (this, arguments);
  }
  if (!cx.fam.suika.y2005.DOM.Node.Node._CompatTested) {
    cx.fam.suika.y2005.DOM.Node.Node._CompatTested = true;
    var doc = this._Node.ownerDocument;
    if (!doc) doc = this._Node;
    var el = doc.createElement ("p");
    el.appendChild (doc.createTextNode ("&"));
    if (el.innerText == "&amp;") { /* Opera 8 */
      cx.fam.suika.y2005.DOM.Node.Node.prototype.getTextContent = function () {
        return this._Node.innerText
                         .replace ("&lt;", "<")
                         .replace ("&gt;", ">")
                         .replace ("&quot;", '"')
                         .replace ("&amp;", "&");
      };
    }
  }
};
cx.fam.suika.y2005.DOM.Node.Node._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Node._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Node, feature, version, impl);
};
cx.fam.suika.y2005.DOM.Node.getDOMNode = function (n) {
  if (!n) {
    return null;
  } else if (n._GetDOMNode) {
    return n._GetDOMNode (n);
  } else if (n._OwnerDocument && n._OwnerDocument._GetDOMNode) {
    return n._OwnerDocument._GetDOMNode (n);
  } else if (n.ownerDocument && n.ownerDocument._GetDOMNode) {
    return n.ownerDocument._GetDOMNode (n);
  } else {
    return cx.fam.suika.y2005.DOM.Node._GetDOMNode (n);
  }
};
cx.fam.suika.y2005.DOM.Node._GetDOMNode = function (n) {
  if (!n) {
    return null;
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.ELEMENT_NODE) {
    return cx.fam.suika.y2005.DOM.Node._GetDOMElement (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.DOCUMENT_NODE) {
    return cx.fam.suika.y2005.DOM.Node._GetDOMDocument (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.TEXT_NODE) {
    return new cx.fam.suika.y2005.DOM.Node.Text (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.ATTRIBUTE_NODE) {
    return new cx.fam.suika.y2005.DOM.Node.Attr (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype
                             .DOCUMENT_FRAGMENT_NODE) {
    return new cx.fam.suika.y2005.DOM.Node.DocumentFragment (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype
                             .CDATA_SECTION_NODE) {
    return new cx.fam.suika.y2005.DOM.Node.CDATASection (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype.COMMENT_NODE) {
    return new cx.fam.suika.y2005.DOM.Node.Comment (n);
  } else if (n.nodeType == cx.fam.suika.y2005.DOM.Node.Node.prototype
                             .PROCESSING_INSTRUCTION_NODE) {
    return cx.fam.suika.y2005.DOM.Node._GetDOMPI (n);
  } else {
    return new cx.fam.suika.y2005.DOM.Node.Node (n);
  }
};

cx.fam.suika.y2005.DOM.Node.Node.prototype.ELEMENT_NODE = 1;
cx.fam.suika.y2005.DOM.Node.Node.prototype.ATTRIBUTE_NODE = 2;
cx.fam.suika.y2005.DOM.Node.Node.prototype.TEXT_NODE = 3;
cx.fam.suika.y2005.DOM.Node.Node.prototype.CDATA_SECTION_NODE = 4;
cx.fam.suika.y2005.DOM.Node.Node.prototype.ENTITY_REFERENCE_NODE = 5;
cx.fam.suika.y2005.DOM.Node.Node.prototype.ENTITY_NODE = 6;
cx.fam.suika.y2005.DOM.Node.Node.prototype.PROCESSING_INSTRUCTION_NODE = 7;
cx.fam.suika.y2005.DOM.Node.Node.prototype.COMMENT_NODE = 8;
cx.fam.suika.y2005.DOM.Node.Node.prototype.DOCUMENT_NODE = 9;
cx.fam.suika.y2005.DOM.Node.Node.prototype.DOCUMENT_TYPE_NODE = 10;
cx.fam.suika.y2005.DOM.Node.Node.prototype.DOCUMENT_FRAGMENT_NODE = 11;
cx.fam.suika.y2005.DOM.Node.Node.prototype.NOTATION_NODE = 12;

cx.fam.suika.y2005.DOM.Node.Node.prototype.appendChild = function (c) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._Node.appendChild (c._Node));
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getAttributes = function () {
  return null;
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getChildNodes = function () {
  if (this._Node.childNodes) {
    return new cx.fam.suika.y2005.DOM.Node.ChildNodeList (this._Node.childNodes);
  } else {
    return new cx.fam.suika.y2005.DOM.Node.ArrayNodeList ();
  }
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getFirstChild = function () {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._Node.firstChild);
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.hasAttributes = function () {
  return null;
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.hasChildNodes = function () {
  return this._Node.hasChildNodes ();
};
/** Marked content [non-standard] */
cx.fam.suika.y2005.DOM.Node.Node.prototype.getInnerHTML = function () {
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
  var impl = this.getOwnerDocument ().getImplementation ();
  var se = impl.createGLSSerializer
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#SerializeDocumentInstance");
  var r = "";
  var cs = this.getChildNodes ();
  var csl = cs.getLength ();
  for (var i = 0; i < csl; i++) {
    r += se.writeToString (cs.item (i));
  }
  return r;
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.insertBefore = function (c, r) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode
           (this._Node.insertBefore (c._Node, r._Node));
};
/* BUG: Does not work for e.g. AttrTextNode */
cx.fam.suika.y2005.DOM.Node.Node.prototype.isSameNode = function (n) {
  return this._Node.isSameNode ? this._Node.isSameNode (n._Node)
                               : (this._Node == n._Node);
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getLastChild = function () {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._Node.lastChild);
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getLocalName = function () {
  return this._Node.localName;
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.lookupNamespaceURI = function (pfx) {
  switch (this.getNodeType ()) {
  case this.ELEMENT_NODE:
    if (this.getNamespaceURI () != null && this.getPrefix () == pfx) {
      return this.getNamespaceURI ();
    }
    var as = this.getAttributes ();
    var asLength = as.getLength ();
    for (var i = 0; i < asLength; i++) {
      var a = as.item (i);
      if (a.getNamespaceURI () == "http://www.w3.org/2002/xmlns/") {
        var ln = a.getLocalName ();
        var av = a.getValue ();
        if (a.getPrefix () == "xmlns" && ln == pfx) {
          if (av.length > 0) {
            return av;
          } else {
            return null;
          }
        } else if (ln == "xmlns" && pfx == null) {
          if (av.length > 0) {
            return av;
          } else {
            return null;
          }
        }
      }
    }  // Attributes
    var ae = this.getParentElement ();
    if (ae) {
      return ae.lookupNamespaceURI (pfx);
    } else {
      return null;
    }
  case this.DOCUMENT_NODE:
    var de = this.getDocumentElement ();
    if (de) {
      return de.lookupNamespaceURI (pfx);
    } else {
      return null;
    }
  case this.ATTRIBUTE_NODE:
    var oe = this.getOwnerElement ();
    if (oe) {
      return oe.lookupNamespaceURI (pfx);
    } else {
      return null;
    }
  case this.DOCUMENT_FRAGMENT_NODE:
  case this.DOCUMENT_TYPE_NODE:
  case this.ENTITY_NODE:
  case this.NOTATION_NODE:
    return null;
  default:
    var ae = this.getParentElement ();
    if (ae) {
      return ae.lookupNamespaceURI (pfx);
    } else {
      return null;
    }
  } // NodeType
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getNamespaceURI = function () {
  return typeof (this._Node._NamespaceURI) != "undefined"
           ? this._Node._NamespaceURI
           : this._Node.namespaceURI;
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getNextSibling = function () {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._Node.nextSibling);
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getNodeType = function () {
  return this._Node.nodeType;
};
/** Marked content with markup of the node itself [non-standard] */
cx.fam.suika.y2005.DOM.Node.Node.prototype.getOuterHTML = function () {
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
  var impl = this.getOwnerDocument ().getImplementation ();
  var se = impl.createGLSSerializer
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#SerializeDocumentInstance");
  return se.writeToString (this);
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getOwnerDocument = function () {
  return this._Node.ownerDocument
           ? cx.fam.suika.y2005.DOM.Node.getDOMDocument (this._Node.ownerDocument)
           : null;
};
/** Innermost ancestor element if any [non-standard] */
cx.fam.suika.y2005.DOM.Node.Node.prototype.getParentElement = function () {
  var pe;
  var pn = this._Node;
  while (pn && pn.parentNode) {
    pn = pn.parentNode;
    if (pn.nodeType == this.ELEMENT_NODE) {
      pe = pn;
    }
  }
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (pe);
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getParentNode = function () {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._Node.parentNode);
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getPrefix = function () {
  return this._Node.prefix;
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.setPrefix = function (newValue) {
  this._Node.prefix = newValue;
};

cx.fam.suika.y2005.DOM.Node.Node.prototype.getPreviousSibling = function () {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._Node.previousSibling);
};

/**
   The previous element, i.e. an element which precedes to the node
   and there is no other element between it and the node in document order
   and whose parent element is the same element as the parent element
   of the node.
   [non-standard]
*/
cx.fam.suika.y2005.DOM.Node.Node.prototype.getPreviousElement = function () {
  /* TODO: |EntityReference| support */
  var el = this.getPreviousSibling ();
  while (el != null) {
    if (el.getNodeType () == el.ELEMENT_NODE) {
      return el;
    }
    el = el.getPreviousSibling ();
  }
  return null;
};

cx.fam.suika.y2005.DOM.Node.Node.prototype.removeChild = function (c) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode
           (this._Node.removeChild (c._Node));
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.replaceChild = function (c, r) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode
           (this._Node.replaceChild (c._Node, r._Node));
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.getTextContent = function () {
  if (this._Node.parentNode) { /* This test is required to avoid Gecko bug */
    var v = this._Node.textContent;
    if (v != null) {
      return v;
    } else {
      return this._Node.innerText;
    }
  } else if (typeof (this._Node.innerText) == "string") {
    return this._Node.innerText;
  } else {
    var r = "";
    var cns = this._Node.childNodes;
    var cnsLength = cns.length;
    for (var i = 0; i < cnsLength; i++) {
      var cn = cns[i];
      if (cn.nodeType != this.COMMENT_NODE &&
          cn.nodeType != this.PROCESSING_INSTRUCTION_NODE) {
        r += cn.textContent;
      }
    }
    return r;
  }
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.setTextContent = function (newValue) {
  if (this._Node.hasChildNodes ()) {
    if (this._Node.textContent == undefined) {
      this._Node.innerText = newValue;
    } else {
      this._Node.textContent = newValue;
    }
  } else if (newValue.length > 0) {
    this._Node.appendChild (this._Node.ownerDocument.createTextNode (newValue));
  }
};


cx.fam.suika.y2005.DOM.Node.Node.prototype.toString = function () {
  return "[object Node]";
};

/* Document */

cx.fam.suika.y2005.DOM.Node.Document = function (node) {
  cx.fam.suika.y2005.DOM.Node.Document._superclass.apply (this, arguments);
  if (!this._Node.createAttributeNS) {
    cx.fam.suika.y2005.DOM.Node.Document.prototype.createAttributeNS =
    function (namespaceURI, qualifiedName) {
      if (namespaceURI == null ||
          (namespaceURI == "http://www.w3.org/XML/1998/namespace" &&
           qualifiedName.slice (0, 4) == "xml:") ||
          (namespaceURI == "http://www.w3.org/2000/xmlns/" &&
           qualifiedName == "xmlns")) {
        var el = this._Node.createAttribute (qualifiedName);
        return cx.fam.suika.y2005.DOM.Node.getDOMNode (el);
      } else {
        return new cx.fam.suika.y2005.DOM.Node.NSAttr (namespaceURI, qualifiedName);
      }
    };
    cx.fam.suika.y2005.DOM.Node.Document.prototype.createElementNS =
    function (namespaceURI, qualifiedName) {
      var nm = qualifiedName.split (":", 2);
      var el = this._Node.createElement (nm[1] ? nm[1] : nm[0]);
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
  } else if (!cx.fam.suika.y2005.DOM.Node.Document._CompatTested) {
    var attr = this._Node.createAttributeNS ("http://test/", "test:test");
    if (attr.localName == "test:test") {
      /* For Opera 8 - but this code is not enough to cover its strange behavior -
      cx.fam.suika.y2005.DOM.Node.Document.prototype.createAttributeNS =
      function (namespaceURI, qualifiedName) {
        var nm = qualifiedName.split (":", 2);
        var att;
        if (nm[1]) {
          att = this._Node.createAttributeNS (namespaceURI, nm[1]);
          att.prefix = nm[0];
          att._Prefix = nm[0];
        } else {
          att = this._Node.createAttributeNS (namespaceURI, nm[0]);
        }
        att._NamespaceURI = namespaceURI;
        return cx.fam.suika.y2005.DOM.Node.getDOMNode (att);
      };
      cx.fam.suika.y2005.DOM.Node.Attr.prototype.getNamespaceURI = function () {
        return this._Node._NamespaceURI != null
                 ? this._Node._NamespaceURI
                 : this._Node.namespaceURI;
      };
      cx.fam.suika.y2005.DOM.Node.Attr.prototype.getPrefix = function () {
        return this._Node._Prefix != null
                 ? this._Node._Prefix
                 : this._Node.prefix;
      };
      cx.fam.suika.y2005.DOM.Node.Attr.prototype.setPrefix = function (newValue) {
        this._Node.prefix = newValue;
        this._Node._Prefix = newValue;
      }; */
      cx.fam.suika.y2005.DOM.Node.Document.prototype.createAttributeNS =
      function (namespaceURI, qualifiedName) {
        if (namespaceURI == null ||
            (namespaceURI == "http://www.w3.org/XML/1998/namespace" &&
             qualifiedName.slice (0, 4) == "xml:") ||
            (namespaceURI == "http://www.w3.org/2000/xmlns/" &&
             qualifiedName == "xmlns")) {
          var el = this._Node.createAttributeNS (null, qualifiedName);
          return cx.fam.suika.y2005.DOM.Node.getDOMNode (el);
        } else {
          return new cx.fam.suika.y2005.DOM.Node.NSAttr (namespaceURI, qualifiedName);
        }
      };
      cx.fam.suika.y2005.DOM.Node.Document.prototype.createElementNS =
      function (namespaceURI, qualifiedName) {
        var altQualifiedName = qualifiedName;
        if (namespaceURI != "http://www.w3.org/1999/xhtml") {
          /* Opera 8 ignores namespace URI for the purpose of e.g. |script|
             or |href| evaluation */
          altQualifiedName = "@" + qualifiedName;
        }
        var el = this._Node.createElementNS (namespaceURI, altQualifiedName);
        el._NamespaceURI = namespaceURI;
        var nm = qualifiedName.split (":", 2);
        el._LocalName = nm[1] != null ? nm[1] : nm[0];
        return cx.fam.suika.y2005.DOM.Node.getDOMElement (el);
      };
    }
    if (!this._Node.createProcessingInstruction) {
      /* TODO: PI for WinIE and Gecko HTML mode */
    }
    cx.fam.suika.y2005.DOM.Node.Document._CompatTested = true;
  } // For Opera 8
  for (var i in cx.fam.suika.y2005.DOM.Node.Document._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Document._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.DOMDocument = cx.fam.suika.y2005.DOM.Node.Document;
cx.fam.suika.y2005.DOM.Node.Document.inherits (cx.fam.suika.y2005.DOM.Node.Node);
cx.fam.suika.y2005.DOM.Node.Document._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Document._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Document, feature, version, impl);
};
cx.fam.suika.y2005.DOM.Node.getDOMDocument = function (n) {
  if (!n) {
    return null;
  } else if (n._GetDOMNode) {
    return n._GetDOMNode (n);
  } else {
    return cx.fam.suika.y2005.DOM.Node._GetDOMDocument (n);
  }
};
cx.fam.suika.y2005.DOM.Node._GetDOMDocument = function (n) {
  return new cx.fam.suika.y2005.DOM.Node.Document (n);
};

cx.fam.suika.y2005.DOM.Node.Document.prototype.createAttributeNS =
function (namespaceURI, qualifiedName) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode
           (this._Node.createAttributeNS (namespaceURI, qualifiedName));
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.createComment =
function (data) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._Node.createComment (data));
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.createDocumentFragment =
function (namespaceURI, qualifiedName) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode
           (this._Node.createDocumentFragment ());
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.createElementNS =
function (namespaceURI, qualifiedName) {
  var el = this._Node.createElementNS (namespaceURI, qualifiedName);
  el._NamespaceURI = namespaceURI;
  var nm = qualifiedName.split (":", 2);
  el._LocalName = nm[1] != null ? nm[1] : nm[0];
  return cx.fam.suika.y2005.DOM.Node.getDOMElement (el);
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.createEntityReference =
function (name) {
  return new cx.fam.suika.y2005.DOM.Node.getDOMNode
           (this._Node.createEntityReference (name));
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.createProcessingInstruction =
function (target, data) {
  return new cx.fam.suika.y2005.DOM.Node.getDOMPI
           (this._Node.createProcessingInstruction (target, data));
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.createTextNode =
function (s) {
  return new cx.fam.suika.y2005.DOM.Node.Text (this._Node.createTextNode (s));
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getDocumentElement = function () {
  var de = this._Node.documentElement;
  if (!de) {
    var cs = this._Node.childNodes;
    var csl = cs.length;
    for (var i = 0; i < csl; i++) {
      var c = cs[i];
      if (c.nodeType == this.ELEMENT_NODE) {
        de = c;
        break;
      }
    }
  }
  return de ? cx.fam.suika.y2005.DOM.Node.getDOMElement (de) : null;
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getImplementation = function () {
  JSAN.require ("cx.fam.suika.y2005.DOM.Implementation");
  return new cx.fam.suika.y2005.DOM.Implementation.DOMImplementation
           (this._Node.implementation);
};
/** Marked content [non-standard] */
cx.fam.suika.y2005.DOM.Node.Document.prototype.getInnerHTML = function () {
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
  var impl = this.getImplementation ();
  var se = impl.createGLSSerializer
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#SerializeDocumentInstance");
  var r = "";
  var cs = this.getChildNodes ();
  var csl = cs.getLength ();
  for (var i = 0; i < csl; i++) {
    r += se.writeToString (cs.item (i)) + "\n";
  }
  return r;
};
/** Marked content with optional XML declaration [non-standard] */
cx.fam.suika.y2005.DOM.Node.Document.prototype.getOuterHTML = function () {
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
  var impl = this.getImplementation ();
  var se = impl.createGLSSerializer
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#SerializeDocumentInstance");
  return se.writeToString (this);
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getTextContent = function () {
  return null;
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.setTextContent = function (newValue) {};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getNodeName = function () {
  return "#document";
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getNodeValue = function () {
  return null;
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.setNodeValue = function (newValue) {};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getXMLEncoding = function () {
  return this._Node._XMLEncoding
           ? this._Node._XMLEncoding
           : this._Node.xmlEncoding ? this._Node.xmlEncoding : null;
};
/** Setting |xmlEncoding| attribute [non-standard] */
cx.fam.suika.y2005.DOM.Node.Document.prototype.setXMLEncoding = function (newValue) {
  this._Node._XMLEncoding = newValue;
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getXMLStandalone = function () {
  return this._Node.xmlStandalone ? true : false;
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.setXMLStandalone = function (newValue) {
  this._Node.xmlStandalone = newValue;
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.getXMLVersion = function () {
  return this._Node._XMLVersion
           ? this._Node._XMLVersion
           : this._Node.xmlVersion ? this._Node.xmlVersion : "1.0";
};
cx.fam.suika.y2005.DOM.Node.Document.prototype.setXMLVersion = function (newValue) {
  try {
    this._Node.xmlVersion = newValue;
  } catch (e) {
    /* Gecko HTML mode */
    this._Node._XMLVersion = newValue;
  }
};

cx.fam.suika.y2005.DOM.Node.Document.prototype.toString = function () {
  return "[object Document]";
};


/* Element */

cx.fam.suika.y2005.DOM.Node.Element = function (node) {
  cx.fam.suika.y2005.DOM.Node.Element._superclass.apply (this, arguments);
  if (!this._Node._Attribute) this._Node._Attribute = {};
  if (!cx.fam.suika.y2005.DOM.Node.Element._CompatTested) {
    cx.fam.suika.y2005.DOM.Node.Element._CompatTested = true;
    if (!this._Node.getAttributeNS) {
      cx.fam.suika.y2005.DOM.Node.Element.prototype.getAttributeNS
        = cx.fam.suika.y2005.DOM.Node.Element.prototype._GetAttributeNSCompat;
      cx.fam.suika.y2005.DOM.Node.Element.prototype.hasAttributeNS
        = cx.fam.suika.y2005.DOM.Node.Element.prototype._HasAttributeNSCompat;
      cx.fam.suika.y2005.DOM.Node.Element.prototype.removeAttributeNS
        = cx.fam.suika.y2005.DOM.Node.Element.prototype._RemoveAttributeNSCompat;
      cx.fam.suika.y2005.DOM.Node.Element.prototype.setAttributeNS
        = cx.fam.suika.y2005.DOM.Node.Element.prototype._SetAttributeNSCompat;
      cx.fam.suika.y2005.DOM.Node.Element.prototype.getLocalName = function () {
        if (this._Node._LocalName != undefined) {
          return this._Node._LocalName;
        } else {
          var nm = this._Node.nodeName.split (":", 2);
          if (nm[1]) {
            return nm[1];
          } else {
            return nm[0];
          }
        }
      };
      cx.fam.suika.y2005.DOM.Node.Element.prototype.getPrefix = function () {
        if (this._Node._Prefix != undefined) {
          return this._Node._Prefix;
        } else {
          var nm = this._Node.nodeName.split (":", 2);
          if (nm[1]) {
            return nm[0];
          } else {
            return null;
          }
        }
      };
      cx.fam.suika.y2005.DOM.Node.Element.prototype.getNamespaceURI = function () {
        if (this._Node._NamespaceURI != undefined) {
          return this._Node._NamespaceURI;
        } else {
          return null;
        }
      };
      cx.fam.suika.y2005.DOM.Node.Element.prototype._ReplaceAttrName =
      function (localName) {
        switch (localName) {
        case "class":
          return "className";
        case "className":
          return "@className";
        case "style":
          return "@style";
        default:
          return localName;
        }
      };
    } else {
      var attr = this._Node.ownerDocument
                     .createAttributeNS ("http://test/", "test:test");
      if (attr.localName == "test:test") {
        /* For Opera 8 */
        cx.fam.suika.y2005.DOM.Node.Element.prototype.getAttributeNS
          = cx.fam.suika.y2005.DOM.Node.Element.prototype._GetAttributeNSCompat;
        cx.fam.suika.y2005.DOM.Node.Element.prototype.hasAttributeNS
          = cx.fam.suika.y2005.DOM.Node.Element.prototype._HasAttributeNSCompat;
        cx.fam.suika.y2005.DOM.Node.Element.prototype.removeAttributeNS
          = cx.fam.suika.y2005.DOM.Node.Element.prototype._RemoveAttributeNSCompat;
        cx.fam.suika.y2005.DOM.Node.Element.prototype.setAttributeNS
          = cx.fam.suika.y2005.DOM.Node.Element.prototype._SetAttributeNSCompat;
        cx.fam.suika.y2005.DOM.Node.Element.prototype._ReplaceAttrName =
        function (localName) {
          if (localName.indexOf (":") > -1 &&
              localName.substring (0, 4) != "xml:") {
            return localName;
          } else {
            return localName.replace (/([A-Z])/g,
                                        function () {return "*" + RegExp.$1});
          }
        };
        cx.fam.suika.y2005.DOM.Node.Element.prototype.getLocalName =
        function () {
          return typeof (this._Node._LocalName) == "undefined"
                   ? this._Node.localName
                   : this._Node._LocalName;
        };
      }
    }
  } // For Opera 8
  for (var i in cx.fam.suika.y2005.DOM.Node.Element._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Element._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.DOMElement = cx.fam.suika.y2005.DOM.Node.Element;
cx.fam.suika.y2005.DOM.Node.Element.inherits (cx.fam.suika.y2005.DOM.Node.Node);
cx.fam.suika.y2005.DOM.Node.Element._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Element._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Element, feature, version, impl);
};

cx.fam.suika.y2005.DOM.Node.getDOMElement = function (n) {
  if (!n) {
    return null;
  } else if (n._GetDOMNode) {
    return n._GetDOMNode (n);
  } else if (n._OwnerDocument && n._OwnerDocument._GetDOMNode) {
    return n._OwnerDocument._GetDOMNode (n);
  } else if (n.ownerDocument && n.ownerDocument._GetDOMNode) {
    return n.ownerDocument._GetDOMNode (n);
  } else {
    return cx.fam.suika.y2005.DOM.Node._GetDOMElement (n);
  }
};
cx.fam.suika.y2005.DOM.Node._GetDOMElement = function (n) {
  var ns = typeof (n._NamespaceURI) == "undefined"
             ? n.namespaceURI
             : n._NamespaceURI;
  var ln = typeof (n._LocalName) == "undefined"
             ? n.localName
             : n._LocalName;
  if (cx.fam.suika.y2005.DOM.Node.Element._ElementTypeClass[ns] != null &&
      cx.fam.suika.y2005.DOM.Node.Element._ElementTypeClass[ns][ln] != null) {
    JSAN.require
      (cx.fam.suika.y2005.DOM.Node.Element._ElementTypeClass[ns][ln]["moduleName"]);
    return eval ("new " + cx.fam.suika.y2005.DOM.Node.Element
                 ._ElementTypeClass[ns][ln]["className"] + " (n)");
  } else {
    return new cx.fam.suika.y2005.DOM.Node.Element (n);
  }
};

cx.fam.suika.y2005.DOM.Node.Element._ElementTypeClass = {};
cx.fam.suika.y2005.DOM.Node.Element._ElementTypeClass[
  "http://suika.fam.cx/www/cx/fam/suika/y2005/WebUA/VDocument#"
] = {
  VWindow: {
    moduleName: /* ??JSANModule?? */ "cx.fam.suika.y2005.WebUA.VDocument",
    className: "cx.fam.suika.y2005.WebUA.VDocument.VWindowElement"
  }
};

cx.fam.suika.y2005.DOM.Node.Element.prototype.getAttributes = function () {
  if (this._Node._Attribute) {
    return new cx.fam.suika.y2005.DOM.Node.WinIEAttributeMap (this._Node);
  } else {
    return new cx.fam.suika.y2005.DOM.Node.AttributeMap (this._Node.attributes);
  }
};
cx.fam.suika.y2005.DOM.Node.Element.prototype.getAttributeNS =
function (namespaceURI, localName) {
  var attr = this._Node.getAttributeNodeNS (namespaceURI, localName);
  return attr ? attr.value : "";
};

/**
   Returns a snapshot list of identifiers of the element.
   [non-standard]
*/
cx.fam.suika.y2005.DOM.Node.Element.prototype.getIds = function () {
  var vals = []; /* TODO: |DOMStringList| */
  var as = this.getAttributes ();
  var asl = as.getLength ();
  for (var i = 0; i < asl; i++) {
    var a = as.item (i);
    if (a.isId ()) {
      var v = attrs.textContent.split (/\s+/);
      for (var j in v) {
        vals.push (v[j]);
      }
    }
  }
  /* TODO: identifier elements */
  return vals;
};

cx.fam.suika.y2005.DOM.Node.Element.prototype.hasAttributeNS =
function (namespaceURI, localName) {
  return this._Node.hasAttributeNS (namespaceURI, localName);
};
cx.fam.suika.y2005.DOM.Node.Element.prototype.hasAttributes = function () {
  return this._Node._Attribute ? (this.getAttributes ().getLength () > 0)
                               : this._Node.hasAttributes ();
};
cx.fam.suika.y2005.DOM.Node.Element.prototype.removeAttributeNS =
function (namespaceURI, qualifiedName, localName) {
  return this._Node.removetAttributeNS (namespaceURI, localName);
};
cx.fam.suika.y2005.DOM.Node.Element.prototype.setAttributeNS =
function (namespaceURI, qualifiedName, newValue) {
  var attr = this.getOwnerDocument ().createAttributeNS (namespaceURI, qualifiedName);
  attr.setValue (newValue);
  if (this._Node._OwnerDocument != null) {
    attr._Node._OwnerDocument = this._Node._OwnerDocument;
  }
  this._Node.setAttributeNodeNS (attr._Node);
  /* NOTE: Opera 8's implementation is problematic. */
  /* this._Node.setAttributeNS (namespaceURI, qualifiedName, newValue); */
};
cx.fam.suika.y2005.DOM.Node.Element.prototype.getNodeName = function () {
  var prefix = this.getPrefix ();
  var ln = this.getLocalName ();
  if (prefix) {
    return prefix + ":" + ln;
  } else {
    return ln;
  }
};

cx.fam.suika.y2005.DOM.Node.Element.prototype._GetAttributeNSCompat =
function (namespaceURI, localName) {
  if (!namespaceURI ||
      (namespaceURI == "http://www.w3.org/2002/xmlns/" && qualifiedName == "xmlns")) {
    return this._Node.getAttribute (this._ReplaceAttrName (localName));
  } else if (namespaceURI == "http://www.w3.org/XML/1998/namespace") {
    return this._Node.getAttribute ("xml:" + localName);
  } else {
    if (!this._Node._Attribute[namespaceURI]) {
      return "";
    } else if (this._Node._Attribute[namespaceURI][localName]) {
      return this._Node._Attribute[namespaceURI][localName].getTextContent ();
    } else {
      return "";
    }
  }
};
cx.fam.suika.y2005.DOM.Node.Element.prototype._HasAttributeNSCompat =
function (namespaceURI, localName) {
  if (!namespaceURI ||
      (namespaceURI == "http://www.w3.org/2002/xmlns/" && qualifiedName == "xmlns")) {
    return this._Node.getAttributeNode (this._ReplaceAttrName (localName))
           ? true : false;
  } else if (namespaceURI == "http://www.w3.org/XML/1998/namespace") {
    return this._Node.getAttributeNode ("xml:" + localName) ? true : false;
  } else {
    if (!this._Node._Attribute[namespaceURI]) {
      return false;
    } else if (this._Node._Attribute[namespaceURI][localName]) {
      return true;
    } else {
      return false;
    }
  }
  /* NOTE: WinIE 6 does not have |hasAttribute| method */
};
cx.fam.suika.y2005.DOM.Node.Element.prototype._RemoveAttributeNSCompat =
    function (namespaceURI, localName) {
      if (!namespaceURI ||
          (namespaceURI == "http://www.w3.org/2002/xmlns/" &&
           qualifiedName == "xmlns")) {
        this._Node.removeAttribute (this._ReplaceAttrName (localName));
      } else if (namespaceURI == "http://www.w3.org/XML/1998/namespace") {
        this._Node.removeAttribute ("xml:" + localName);
      } else {
        if (!this._Node._Attribute[namespaceURI]) {
          //
        } else if (this._Node._Attribute[namespaceURI][localName]) {
          var attr = this._Node._Attribute[namespaceURI][localName];
          this._Node._Attribute[namespaceURI][localName] = undefined;
          attr._Node._OwnerElement = null;
        } else {
          //
        }
      }
    };
cx.fam.suika.y2005.DOM.Node.Element.prototype._SetAttributeNSCompat =
    function (namespaceURI, qualifiedName, newValue) {
      if (!namespaceURI ||
          (namespaceURI == "http://www.w3.org/XML/1998/namespace" &&
           qualifiedName.slice (0, 4) == "xml:") ||
          (namespaceURI == "http://www.w3.org/2000/xmlns/" &&
           qualifiedName == "xmlns")) {
        this._Node.setAttribute (this._ReplaceAttrName (qualifiedName), newValue);
        /* TODO: Should |/attr/._Node._OwnerDocument| be set? */
      } else {
        if (!this._Node._Attribute[namespaceURI]) {
          this._Node._Attribute[namespaceURI] = {};
        }
        var nm = qualifiedName.split (":", 2);
        var localName = nm[1] ? nm[1] : nm[0];
        if (this._Node._Attribute[namespaceURI][localName]) {
          this._Node._Attribute[namespaceURI][localName].setTextContent (newValue);
        } else {
          var attr = this.getOwnerDocument ()
                         .createAttributeNS (namespaceURI, qualifiedName);
          this._Node._Attribute[namespaceURI][localName] = attr;
          attr._Node._OwnerElement = attr;
          if (this._Node._OwnerDocument != null)
            attr._Node._OwnerDocument = this._Node._OwnerDocument;
          attr.setValue (newValue);
        }
      }
    };

cx.fam.suika.y2005.DOM.Node.Element.prototype.toString = function () {
  return "[object Element]";
};

/* Attr */

cx.fam.suika.y2005.DOM.Node.Attr = function (node) {
  cx.fam.suika.y2005.DOM.Node.Attr._superclass.apply (this, [node]);
  if (this._Node.localName == null || window.opera) {
    cx.fam.suika.y2005.DOM.Node.Attr.prototype.getLocalName = function () {
      var name = this._Node.name;
      if (window.opera) {
        name = name.toLowerCase ()
                   .replace (/\*(.)/g, function () {return RegExp.$1.toUpperCase ()});
      }
      var nm = name.split (":", 2);
      if (nm[1]) {
        return nm[1];
      } else {
        if (nm[0].charAt (0) == "@") {
          return nm[0].slice (1);
        } else {
          return nm[0];
        }
      }
    };
    cx.fam.suika.y2005.DOM.Node.Attr.prototype.getPrefix = function () {
      var nm = this._Node.nodeName.split (":", 2);
      if (nm[1]) {
        return nm[0];
      } else {
        return null;
      }
    };
    cx.fam.suika.y2005.DOM.Node.Attr.prototype.getNamespaceURI = function () {
      if (typeof (this._Node._NamespaceURI) != "undefined") {
        return this._Node._NamespaceURI;
      } else {
        var nn = this.getNodeName ();
        if (nn.slice (0, 4) == "xml:") {
          return "http://www.w3.org/XML/1998/namespace";
        } else if (nn == "xmlns") {
          return "http://www.w3.org/2000/xmlns/";
        } else {
          return null;
        }
      }
    };
  }
  for (var i in cx.fam.suika.y2005.DOM.Node.Attr._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Attr._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.DOMAttr = cx.fam.suika.y2005.DOM.Node.Attr;
cx.fam.suika.y2005.DOM.Node.Attr.inherits (cx.fam.suika.y2005.DOM.Node.Node);
cx.fam.suika.y2005.DOM.Node.Attr._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Attr._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Attr, feature, version, impl);
};

cx.fam.suika.y2005.DOM.Node.Attr.prototype.getChildNodes = function () {
  if (this._Node.childNodes != null && !window.opera) {
    return new cx.fam.suika.y2005.DOM.Node.ChildNodeList (this._Node.childNodes);
  } else {
    /* WinIE 6 and Opera 8 has no Attr children. */
    /* WinIE 6 has no Element.childNodes but Opera 8 has. */
    return new cx.fam.suika.y2005.DOM.Node.AttrTextNodeList (this._Node);
  }
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.getFirstChild = function () {
  var n = cx.fam.suika.y2005.DOM.Node.AttrText._super.getFirstChild.apply (this, []);
  if (n) {
    return n;
  } else if (!this._Node.childNodes || window.opera) {
    var v;
    try { v = this._Node.nodeValue } catch (e) { v = "" }
    if (v != null && v.length > 0 && n == 0) {
      return new cx.fam.suika.y2005.DOM.Node.AttrText (this._Node);
    } else {
      return null;
    }
  }
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.hasChildNodes = function () {
  if (this._Node.firstChild) {
    return true;
  } else {
    var v = this.getFirstChild ();
    return v ? true : false;
  }
};

/**
   Whether the attribute is an identifier attribute or not.
   [DOM Level 3 Core]
*/
cx.fam.suika.y2005.DOM.Node.Attr.prototype.isId = function () {
  if (typeof (this._Node._IsId) != "undefined") {
    return this._Node._IsId;
  } else if (this._Node.isId) {
    return true;
  } else {
    var ns = this.getNamespaceURI ();
    var ln = this.getLocalName ();
    if (ln == "id" && ns == "http://www.w3.org/XML/1998/namespace") {
      return true;
    }
    var oel = this.getOwnerElement ();
    if (oel) {
      var ons = oel.getNamespaceURI ();
      switch (ons) {
      case "http://www.w3.org/1999/xhtml":
        if (ln == "id" && ns == null) {
          return true;
        }
      }
    }
    return false;
  }
};

cx.fam.suika.y2005.DOM.Node.Attr.prototype.getLastChild = function () {
  var n = cx.fam.suika.y2005.DOM.Node.AttrText._super.getLastChild.apply (this, []);
  if (n) {
    return n;
  } else if (!this._Node.childNodes || window.opera) {
    var v;
    try { v = this._Node.nodeValue } catch (e) { v = "" }
    if (v != null && v.length > 0 && n == 0) {
      return new cx.fam.suika.y2005.DOM.Node.AttrText (this._Node);
    } else {
      return null;
    }
  }
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.getNodeName = function () {
  var prefix = this.getPrefix ();
  var ln = this.getLocalName ();
  if (prefix) {
    return prefix + ":" + ln;
  } else {
    return ln;
  }
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.getSpecified = function () {
  return this._Node.specified;
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.getOwnerElement = function () {
  return cx.fam.suika.y2005.DOM.Node.getDOMElement
    (this._Node.ownerElement ? this._Node.ownerElement : this._Node._OwnerElement);
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.getNodeValue = function () {
  var v;
  try {
    v = this._Node.nodeValue;
  } catch (e) {
    v = "";
  }
  if (v == null) v = "";
  return v;
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.setNodeValue = function (newValue) {
  this._Node.nodeValue = newValue;
};
cx.fam.suika.y2005.DOM.Node.Attr.prototype.getTextContent
  = cx.fam.suika.y2005.DOM.Node.Attr.prototype.getNodeValue;
cx.fam.suika.y2005.DOM.Node.Attr.prototype.setTextContent
  = cx.fam.suika.y2005.DOM.Node.Attr.prototype.setNodeValue;
cx.fam.suika.y2005.DOM.Node.Attr.prototype.getValue
  = cx.fam.suika.y2005.DOM.Node.Attr.prototype.getNodeValue;
cx.fam.suika.y2005.DOM.Node.Attr.prototype.setValue
  = cx.fam.suika.y2005.DOM.Node.Attr.prototype.setNodeValue;

cx.fam.suika.y2005.DOM.Node.Attr.prototype.toString = function () {
  return "[object Attr]";
};

/* Attr for namespaced attribute in WinIE 6 and Opera 8 */

cx.fam.suika.y2005.DOM.Node.NSAttr = function (namespaceURI, qualifiedName) {
  var el = document.createElement ("namespacedAttribute");
  cx.fam.suika.y2005.DOM.Node.NSAttr._superclass.apply (this, [el]);
  el._NamespaceURI = namespaceURI;
  var nm = qualifiedName.split (":", 2);
  if (nm[1] != null) {
    el._Prefix = nm[0];
    el._LocalName = nm[1];
  } else {
    JSAN.require ("cx.fam.suika.y2005.DOM.Core");
    throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NAMESPACE_ERR,
                     'Qualified name "' + qualifiedName + '" has no namespace prefix');
  }
  el._Specified = true;
  var thisNode = this;
  el._GetDOMNode = function () { return thisNode };
};
cx.fam.suika.y2005.DOM.Node.NSAttr.inherits (cx.fam.suika.y2005.DOM.Node.Attr);

cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getChildNodes = function () {
  return cx.fam.suika.y2005.DOM.Node.Node.prototype.getChildNodes.apply
           (this, []);
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getLocalName = function () {
  return this._Node._LocalName;
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getNamespaceURI = function () {
  return this._Node._NamespaceURI;
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getNodeType = function () {
  return this.ATTRIBUTE_NODE;
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getNodeValue = function () {
  return cx.fam.suika.y2005.DOM.Node.Element.prototype.getTextContent.apply
           (this, []);
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.setNodeValue = function (newValue) {
  cx.fam.suika.y2005.DOM.Node.Element.prototype.setTextContent.apply
           (this, [newValue]);
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getPrefix = function () {
  return this._Node._Prefix;
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.setPrefix = function (newValue) {
  this._Node._Prefix = newValue;
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getSpecified = function () {
  return this._Node._Specified;
};
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getTextContent
  = cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getNodeValue;
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.setTextContent
  = cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.setNodeValue;
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getValue
  = cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.getNodeValue;
cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.setValue
  = cx.fam.suika.y2005.DOM.Node.NSAttr.prototype.setNodeValue;

/* CharacterData */

cx.fam.suika.y2005.DOM.Node.CharacterData = function (node) {
  cx.fam.suika.y2005.DOM.Node.CharacterData._superclass.apply (this, [node]);
  for (var i in cx.fam.suika.y2005.DOM.Node.CharacterData._Constructor) {
    cx.fam.suika.y2005.DOM.Node.CharacterData._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.CharacterData.inherits (cx.fam.suika.y2005.DOM.Node.Node);

cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.getData = function () {
  return this._Node.data;
};
cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.setData =
function (newValue) {
  this._Node.data = newValue;
};
cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.getNodeValue
  = cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.getData;
cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.setNodeValue
  = cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.setData;
cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.getTextContent
  = cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.getData;
cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.setTextContent
  = cx.fam.suika.y2005.DOM.Node.CharacterData.prototype.setData;

/* Text */

cx.fam.suika.y2005.DOM.Node.Text = function (node) {
  cx.fam.suika.y2005.DOM.Node.Text._superclass.apply (this, [node]);
  for (var i in cx.fam.suika.y2005.DOM.Node.Text._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Text._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.DOMText = cx.fam.suika.y2005.DOM.Node.Text;
cx.fam.suika.y2005.DOM.Node.Text.inherits (cx.fam.suika.y2005.DOM.Node.CharacterData);
cx.fam.suika.y2005.DOM.Node.Text._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Text._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Text, feature, version, impl);
};

cx.fam.suika.y2005.DOM.Node.Text.prototype.toString = function () {
  return "[object Text]";
};

/* The only child text node in attribute node, for compatibility
   with WinIE 6 and Opera 8 object model */

cx.fam.suika.y2005.DOM.Node.AttrText = function (node) {
  cx.fam.suika.y2005.DOM.Node.AttrText._superclass.apply (this, arguments);
};
cx.fam.suika.y2005.DOM.Node.AttrText.inherits (cx.fam.suika.y2005.DOM.Node.Text);

cx.fam.suika.y2005.DOM.Node.AttrText.prototype.getData = function () {
  var v;
  try {
    v = this._Node.nodeValue;
  } catch (e) {
    v = "";
  }
  if (v == null) v = "";
  return v;
};
cx.fam.suika.y2005.DOM.Node.AttrText.prototype.setData = function (newValue) {
  this._Node.nodeValue = newValue;
};
cx.fam.suika.y2005.DOM.Node.AttrText.prototype.getNodeType = function () {
  return this.TEXT_NODE;
};
cx.fam.suika.y2005.DOM.Node.AttrText.prototype.getNodeValue
  = cx.fam.suika.y2005.DOM.Node.AttrText.prototype.getData;
cx.fam.suika.y2005.DOM.Node.AttrText.prototype.setNodeValue
  = cx.fam.suika.y2005.DOM.Node.AttrText.prototype.setData;
cx.fam.suika.y2005.DOM.Node.AttrText.prototype.getTextContent
  = cx.fam.suika.y2005.DOM.Node.AttrText.prototype.getData;
cx.fam.suika.y2005.DOM.Node.AttrText.prototype.setTextContent
  = cx.fam.suika.y2005.DOM.Node.AttrText.prototype.setData;

/* CDATASection */

cx.fam.suika.y2005.DOM.Node.CDATASection = function (node) {
  cx.fam.suika.y2005.DOM.Node.CDATASection._superclass.apply (this, [node]);
  for (var i in cx.fam.suika.y2005.DOM.Node.CDATASection._Constructor) {
    cx.fam.suika.y2005.DOM.Node.CDATASection._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.CDATASection.inherits
  (cx.fam.suika.y2005.DOM.Node.CharacterData);
cx.fam.suika.y2005.DOM.Node.CDATASection._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.CDATASection._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.CDATASection, feature, version, impl);
};

cx.fam.suika.y2005.DOM.Node.CDATASection.prototype.toString = function () {
  return "[object CDATASection]";
};

/* Comment */

cx.fam.suika.y2005.DOM.Node.Comment = function (node) {
  cx.fam.suika.y2005.DOM.Node.Comment._superclass.apply (this, [node]);
  for (var i in cx.fam.suika.y2005.DOM.Node.Comment._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Comment._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.Comment.inherits
  (cx.fam.suika.y2005.DOM.Node.CharacterData);
cx.fam.suika.y2005.DOM.Node.Comment._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Comment._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Comment, feature, version, impl);
};

cx.fam.suika.y2005.DOM.Node.Comment.prototype.getInnerHTML = function () {
  return this.getData ();
};
cx.fam.suika.y2005.DOM.Node.Comment.prototype.getOuterHTML = function () {
  return "<!--" + this.getData () + "-->";
};

cx.fam.suika.y2005.DOM.Node.Comment.prototype.toString = function () {
  return "[object Comment]";
};

/* ProcessingInstruction */

cx.fam.suika.y2005.DOM.Node.ProcessingInstruction = function (node) {
  cx.fam.suika.y2005.DOM.Node.ProcessingInstruction._superclass.apply
    (this, arguments);
  for (var i in cx.fam.suika.y2005.DOM.Node.ProcessingInstruction._Constructor) {
    cx.fam.suika.y2005.DOM.Node.ProcessingInstruction._Constructor[i].apply
      (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.inherits
  (cx.fam.suika.y2005.DOM.Node.Node);
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.ProcessingInstruction, feature, version, impl);
};
cx.fam.suika.y2005.DOM.Node.getDOMPI =
function (n) {
  if (!n) {
    return null;
  } else if (n._GetDOMNode) {
    return n._GetDOMNode (n);
  } else if (n._OwnerDocument && n._OwnerDocument._GetDOMNode) {
    return n._OwnerDocument._GetDOMNode (n);
  } else if (n.ownerDocument && n.ownerDocument._GetDOMNode) {
    return n.ownerDocument._GetDOMNode (n);
  } else {
    return cx.fam.suika.y2005.DOM.Node._GetDOMPI (n);
  }
};
cx.fam.suika.y2005.DOM.Node._GetDOMPI = function (n) {
  return new cx.fam.suika.y2005.DOM.Node.ProcessingInstruction (n);
};

cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getData =
function () {
  return this._Node.data;
};
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.setData =
function (newValue) {
  this._Node.data = newValue;
};
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getNodeName =
function () {
  return this._Node.target;
};
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getNodeValue
  = cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getData;
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.setNodeValue
  = cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.setData;
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getTarget
  = cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getNodeName;
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getTextContent
  = cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.getData;
cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.setTextContent
  = cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.setData;

cx.fam.suika.y2005.DOM.Node.ProcessingInstruction.prototype.toString = function () {
  return "[object ProcessingInstruction]";
};

/* DocumentFragment */

cx.fam.suika.y2005.DOM.Node.DocumentFragment = function (node) {
  cx.fam.suika.y2005.DOM.Node.DocumentFragment._superclass.apply (this, arguments);
  for (var i in cx.fam.suika.y2005.DOM.Node.DocumentFragment._Constructor) {
    cx.fam.suika.y2005.DOM.Node.DocumentFragment._Constructor[i].apply
      (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.DocumentFragment.inherits
  (cx.fam.suika.y2005.DOM.Node.Node);
cx.fam.suika.y2005.DOM.Node.DocumentFragment._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.DocumentFragment._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.DocumentFragment, feature, version, impl);
};

cx.fam.suika.y2005.DOM.Node.DocumentFragment.prototype.toString = function () {
  return "[object DocumentFragment]";
};

/* NodeList */

cx.fam.suika.y2005.DOM.Node.NodeList = function () {
};

/** Returns a copy of dead list [non-standard] */
cx.fam.suika.y2005.DOM.Node.NodeList.prototype.getSnapshot = function () {
  var l = new cx.fam.suika.y2005.DOM.Node.NodeListArray ();
  var len = this.getLength ();
  for (var i = 0; i < len; i++) {
    l.push (this.item (i));
  }
  return l;
};

cx.fam.suika.y2005.DOM.Node.NodeListArray = function () {
  this.v = [];
};

cx.fam.suika.y2005.DOM.Node.NodeListArray.prototype.getSnapshot = function () {
  return this;
};
cx.fam.suika.y2005.DOM.Node.NodeListArray.prototype.getLength = function () {
  return this.v.length;
};
cx.fam.suika.y2005.DOM.Node.NodeListArray.prototype.item = function (n) {
  return this.v[n];
};

cx.fam.suika.y2005.DOM.Node.ChildNodeList = function (nl) {
  this._NodeList = nl;
};
cx.fam.suika.y2005.DOM.Node.ChildNodeList.inherits
  (cx.fam.suika.y2005.DOM.Node.NodeList);

cx.fam.suika.y2005.DOM.Node.ChildNodeList.prototype.item = function (n) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._NodeList.item (n));
};
cx.fam.suika.y2005.DOM.Node.ChildNodeList.prototype.getLength = function () {
  return this._NodeList.length;
};

cx.fam.suika.y2005.DOM.Node.AttrTextNodeList = function (n) {
  this._Node = n;
};
cx.fam.suika.y2005.DOM.Node.AttrTextNodeList.inherits
  (cx.fam.suika.y2005.DOM.Node.NodeList);

cx.fam.suika.y2005.DOM.Node.AttrTextNodeList.prototype.item = function (n) {
  var v;
  try { v = this._Node.nodeValue } catch (e) { v = "" }
  if (v != null && v.length > 0 && n == 0) {
    return new cx.fam.suika.y2005.DOM.Node.AttrText (this._Node);
  } else {
    JSAN.require ("cx.fam.suika.y2005.DOM.Core");
    throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.INDEX_SIZE_ERR,
                     'There is no ' + n + 'th child node');
  }
};
cx.fam.suika.y2005.DOM.Node.AttrTextNodeList.prototype.getLength = function () {
  var v;
  try {
    v = this._Node.nodeValue;
  } catch (e) {
    v = "";
  }
  if (v != null && v.length > 0) {
    return 1;
  } else {
    return 0;
  }
};

/* NamedNodeMap */

cx.fam.suika.y2005.DOM.Node.AttributeMap = function (nl) {
  this._NamedNodeMap = nl;
};

cx.fam.suika.y2005.DOM.Node.AttributeMap.prototype.item = function (n) {
  return cx.fam.suika.y2005.DOM.Node.getDOMNode (this._NamedNodeMap.item (n));
};
cx.fam.suika.y2005.DOM.Node.AttributeMap.prototype.getLength = function () {
  return this._NamedNodeMap.length;
};

cx.fam.suika.y2005.DOM.Node.WinIEAttributeMap = function (n) {
  this._Node = n;
};

cx.fam.suika.y2005.DOM.Node.WinIEAttributeMap.prototype.item = function (n) {
  var i = 0;
  var lattrs = this._Node.attributes;
  var lattrsLength = lattrs.length;
  for (var j = 0; j < lattrsLength; j++) {
    var lattr = lattrs[j];
    if (lattr && lattr.specified && lattr.name.charAt (0) != "_") {
      if (i == n) {
        return cx.fam.suika.y2005.DOM.Node.getDOMNode (lattrs[j]);
      } else {
        i++;
      }
    }
  }
  for (var ns in this._Node._Attribute) {
    for (var ln in this._Node._Attribute[ns]) {
      if (i == n) {
        return this._Node._Attribute[ns][ln];
      } else {
        i++;
      }
    }
  }
  JSAN.require ("cx.fam.suika.y2005.DOM.Core");
  throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.INDEX_SIZE_ERR,
                     'There is no ' + n + 'th attribute');
};
cx.fam.suika.y2005.DOM.Node.WinIEAttributeMap.prototype.getLength = function () {
  var n = 0;
  var lattrs = this._Node.attributes;
  var lattrsLength = lattrs.length;
  for (var i = 0; i < lattrsLength; i++) {
    var lattr = lattrs[i];
    if (lattr && lattr.specified && lattr.name.charAt (0) != "_") {
      n++;
    }
    /* NOTE: In Opera 8 |lattrs[i]| might be |undefined| if there is |style| attr. */
  }
  for (var ns in this._Node._Attribute) {
    for (var ln in this._Node._Attribute[ns]) {
      n++;
    }
  }
  return n;
};


/**
   Class |SnapshotAttributeMap| implements |NamedNodeMap|
   
   A |SnapshotAttributeMap| is a set of attribute nodes that is not live.
*/
cx.fam.suika.y2005.DOM.Node.SnapshotAttributeMap = function () {
  this.attr = [];
};

cx.fam.suika.y2005.DOM.Node.SnapshotAttributeMap.prototype.getNamedItemNS =
function (namespaceURI, localName) {
  if (this.attr[namespaceURI]) {
    return this.attr[namespaceURI][localName];
  }
};

cx.fam.suika.y2005.DOM.Node.SnapshotAttributeMap.prototype.item =
function (index) {
  var i = 0;
  for (var ns in this.attr) {
    for (var ln in this.attr[ns]) {
      if (i++ == index) {
        return this.attr[ns][ln];
      }
    }
  }
};

cx.fam.suika.y2005.DOM.Node.SnapshotAttributeMap.prototype.getLength =
function () {
  var i = 0;
  for (var ns in this.attr) {
    for (var ln in this.attr[ns]) {
      i++;
    }
  }
  return i;
};

cx.fam.suika.y2005.DOM.Node.SnapshotAttributeMap.prototype.removeNamedItemNS =
function (namespaceURI, localName) {
  if (this.attr[namespaceURI] != null) {
    this.attr[namespaceURI][localName] = undefined;
  }
};

cx.fam.suika.y2005.DOM.Node.SnapshotAttributeMap.prototype.setNamedItemNS =
function (node) {
  var ns = node.getNamespaceURI ();
  if (this.attr[ns] == null) this[ns] = [];
  this.attr[ns][node.getLocalName ()] = node;
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
