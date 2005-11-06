/*
   Module |DOM.CleanNode|
   
   The |DOM.CleanNode| module is an implementation of DOM tree model
   that does not depend on any Web browser implementation.
   
       Note.  This is *not* a conforming DOM implementation.  For example,
              it does not implement all DOM methods and attributes.  Even
              if a method or attribute is implemented, it does not provide
              the full feature as the DOM standard provides.  Some errors
              are not reported.  Such restrictions includes, but not limited to:
                - |INVALID_CHARACTER_ERR|, |NAMESPACE_ERR|, 
                  |HIERARCHY_REQUEST_ERR|, and |WRONG_DOCUMENT_ERR|
                  are not checked.
                - Applications must not use an empty string as a namespace URI,
                  which is synonym for |null| namespace URI in DOM Level 3.
                - Direct modifications to |Attr| children does not turn
                  |Attr.specified| attribute on.
*/

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
if (typeof (cx.fam.suika.y2005.DOM.CleanNode) == "undefined") {
  cx.fam.suika.y2005.DOM.CleanNode = {};
}

cx.fam.suika.y2005.DOM.CleanNode.EXPORT_OK = ["createCleanDOMDocument"];
JSAN.require ("cx.fam.suika.y2005.Class.Inherit");

/**
   Creates a new instance of |Document|.

       Note.  Future version of this module is expected to
              provide a |DOMImplementation| object, from
              which a |Document| can be created, via the
              global |DOMImplementationRegistry| object.
*/
cx.fam.suika.y2005.DOM.CleanNode.createCleanDOMDocument = function () {
  return new cx.fam.suika.y2005.DOM.CleanNode.Document ();
};

/**
   Interface |Node|
*/
cx.fam.suika.y2005.DOM.CleanNode.Node = function () {
};

/**
   Adds a node to the last of the list of children of the node.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.appendChild = function (newChild) {
  if (newChild.getNodeType () == newChild.DOCUMENT_FRAGMENT_NODE) {
    var childs = newChild.getChildNodes ();
    var childsl = childs.getLength ();
    for (var i = 0; i < childsl; i++) {
      var child = childs.item (i);
      this.childNodes.v.push (child);
      child.parentNode = this;
    }
    newChild.childNodes.splice (0, newChild.childNodes.length);
  } else {
    this.childNodes.v.push (newChild);
    if (newChild.parentNode != null) {
      newChild.parentNode.removeChild (newChild);
    }
    newChild.parentNode = this;
  }
  return newChild;
};

/**
   The list of attributes.  Note that the collection is live.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getAttributes = function () {
  return null;
};

/**
   The list of child nodes.  Note that the list is live.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getChildNodes = function () {
  return this.childNodes;
};

/**
   The first child node, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getFirstNode = function () {
  return this.childNodes.v[0];
};

/**
   The type of the node.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getNodeType = function () {
  /* abstract */
};
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.ELEMENT_NODE = 1;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.ATTRIBUTE_NODE = 2;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.TEXT_NODE = 3;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.CDATA_SECTION_NODE = 4;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.ENTITY_REFERENCE_NODE = 5;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.ENTITY_NODE = 6;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.PROCESSING_INSTRUCTION_NODE = 7;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.COMMENT_NODE = 8;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.DOCUMENT_NODE = 9;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.DOCUMENT_TYPE_NODE = 10;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.DOCUMENT_FRAGMENT_NODE = 11;
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.NOTATION_NODE = 12;

/**
   Returns whether the node has attributes or not.
   [DOM Level 2 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.hasAttributes = function () {
  return false;
};

/**
   Returns whether the node has child nodes or not.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.hasChildNodes = function () {
  return (this.childNodes.v.length > 0);
};

/**
   Markup'ed content of the node.
   [non-standard, WinIE, Opera, Gecko]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getInnerHTML = function () {
  var impl = this.getOwnerDocument ().getImplementation ();
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
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

/**
   Inserts a node before another node.
   [DOM Level 1 Core]
   
   @param newChild  The node to add.
   @param refChild  The |newChild| is inserted before the node.
                    If |null|, |newChild| is appended.
   @return  The inserted node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.insertBefore =
function (newChild, refChild) {
  var cs = this.childNodes;
  var csl = cs.getLength ();
  if (refChild != null) {
    B: for (var j = 0; j < csl; j++) {
      var c = cs.item (j);
      if (c.isSameNode (refChild)) {
        break B;
      }
    }
    /* TODO: throw exception */
    return null;
  } else {
    j = csl;
  }
  
  if (newChild.getNodeType () == newChild.DOCUMENT_FRAGMENT_NODE) {
    var childs = newChild.getChildNodes ();
    var childsl = childs.getLength ();
    for (var i = 0; i < childsl; i++) {
      var child = childs.item (i);
      cs.v.splice (j++, 0, child);
      child.parentNode = this;
    }
    newChild.childNodes.v.splice (newChild.childNodes.v.length);
  } else {
    if (newChild.parentNode != null) {
      newChild.parentNode.removeChild (newChild);
    }
    cs.v.splice (j, 0, newChild);
    newChild.parentNode = this;
  }
  /* Note that this implementation does not strictly conform to the standard */
  return newChild;
};


/**
   Whether a node is the same node as the node or not.
   [DOM Level 3 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.isSameNode = function (node) {
  return (this == node);
};

/**
   The last child node, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getLastChild = function () {
  return this.childNodes.v[this.childNodes.v.length - 1];
};

/**
   The local name of the node, if any, or |null|.
   [DOM Level 2 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getLocalName = function () {
  return this.localName;
};

/**
   Finds the namespace URI associated with a namespace prefix.
   [DOM Level 3 Core]
   
   @param prefix  The namespace prefix to look up, or |null| for the
                  default namespace.
   @return The namespace URI for |prefix|, if any, or |null|.
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.lookupNamespaceURI = function (pfx) {
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

/**
   The namespace URI of the node, if any, or |null|.
   [DOM Level 2 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getNamespaceURI = function () {
  return this.namespaceURI;
};

/**
   The next sibling element, if any, or |null|.
   [non-standard]
   
       Note.  The current implementation does not support entity references.
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getNextSiblingElement = function () {
  var parent = this.parentNode;
  if (parent != null) {
    var parentCs = parent.childNodes;
    var parentCsl = parentCs.getLength ();
    var returns = false;
    for (var i = 0; i < parentCsl; i++) {
      var parentC = parentCs.item (i);
      if (parentC.isSameNode (this)) {
        returns = true;
      } else if (returns && parentC.getNodeType () == parentC.ELEMENT_NODE) {
        return parentC;
      }
    }
  }
  return null;
};

/**
   The next sibling node, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getNextSibling = function () {
  var parent = this.parentNode;
  if (parent != null) {
    var parentCs = parent.childNodes;
    var parentCsl = parentCs.getLength ();
    var returns = false;
    for (var i = 0; i < parentCsl; i++) {
      var parentC = parentCs.item (i);
      if (parentC.isSameNode (this)) {
        returns = true;
      } else if (returns) {
        return parentC;
      }
    }
  }
  return null;
};

/**
   The name of the node.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getNodeName = function () {
  // abstract
};

/**
   The value of the node, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getNodeValue = function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.setNodeValue = function () {
};

/**
   The markup'ed content, including the markup for the node itself.
   [non-standard, WinIE]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getOuterHTML = function () {
  var impl = this.getOwnerDocument ().getImplementation ();
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
  var se = impl.createGLSSerializer
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#SerializeDocumentInstance");
  return se.writeToString (this);
};

/**
   The owner document, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getOwnerDocument = function () {
  return this.ownerDocument;
};

/**
   The nearest ancestor element, if any, or |null|.
   [non-standard]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getParentElement = function () {
  var pn = this;
  while (pn && pn.parentNode) {
    pn = pn.parentNode;
    if (pn.getNodeType () == this.ELEMENT_NODE) {
      return pn;
    }
  }
};

/**
   The parent node, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getParentNode = function () {
  return this.parentNode;
};

/**
   The namespace prefix of the node, if any, or |null|.
   [DOM Level 2 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getPrefix = function () {
  return this.prefix;
};
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.setPrefix = function (newValue) {
  this.prefix = newValue;
};

/**
   The previous sibling element, if any, or |null|.
   [non-standard]
   
       Note.  The current implementation does not support entity references.
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getPreviousSiblingElement =
function () {
  var parent = this.parentNode;
  if (parent != null) {
    var parentCs = parent.childNodes;
    var parentCsl = parentCs.getLength ();
    var el = null;
    for (var i = 0; i < parentCsl; i++) {
      var parentC = parentCs.item (i);
      if (parentC.isSameNode (this)) {
        return el;
      } else if (parentC.getNodeType () == parentC.ELEMENT_NODE) {
        el = parentC;
      }
    }
  }
  return null;
};

/**
   The previous sibling, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getPreviousSibling = function () {
  var parent = this.parentNode;
  if (parent != null) {
    var parentCs = parent.childNodes;
    var parentCsl = parentCs.getLength ();
    var returns = false;
    for (var i = 0; i < parentCsl; i++) {
      var parentC = parentCs.item (i);
      if (parentC.isSameNode (this)) {
        returns = true;
      } else if (returns && parentC.getNodeType () == parentC.ELEMENT_NODE) {
        return parentC;
      }
    }
  }
  return null;
};


/**
   Removes a child node.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.removeChild =
function (oldChild) {
  var cs = this.childNodes;
  var csl = cs.getLength ();
  B: for (var j = 0; j < csl; j++) {
    var c = cs.item (j);
    if (c.isSameNode (oldChild)) {
      cs.splice (j, 1);
      c.parentNode = null;
      return c;
    }
  }
  /* TODO: throw exception in this case */
  return null;
  /* Note that this implementation does not strictly conform to the standard */
};

/**
   Replaces a child node with another node.
   [DOM Level 1 Core]
   
   @param newChild  The node to replace by.
   @param refChild  The node to be replaced.
   @return  The node replaced.
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.replaceChild =
function (newChild, refChild) {
  var cs = this.childNodes;
  var csl = cs.getLength ();
  B: for (var j = 0; j < csl; j++) {
    var c = cs.item (j);
    if (c.isSameNode (refChild)) {
      c.parentNode = null;
      break B;
    }
  }
  /* TODO: throw exception in this case */
  if (csl == j) return null;
  
  if (newChild.getNodeType () == newChild.DOCUMENT_FRAGMENT_NODE) {
    var childs = newChild.getChildNodes ();
    var childsl = childs.getLength ();
    for (var i = 0; i < childsl; i++) {
      var child = childs.item (i);
      cs.v.splice (j++, 1, child);
      child.parentNode = this;
    }
    newChild.childNodes.v.splice (newChild.childNodes.v.length);
  } else {
    if (newChild.parentNode != null) {
      newChild.parentNode.removeChild (newChild);
    }
    cs.v.splice (j, 1, newChild);
    newChild.parentNode = this;
  }
  /* Note that this implementation does not strictly conform to the standard */
  return refChild;
};

/**
   The text content of the node.
   [DOM Level 3 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.getTextContent = function () {
  var r = "";
  for (var i = 0; i < this.childNodes.v.length; i++) {
    var child = this.childNodes.v[i];
    switch (child.getNodeType ()) {
    case child.COMMENT_NODE:
    case child.PROCESSING_INSTRUCTION_NODE:
      break;
    default:
      r += child.getTextContent ();
    }
  }
  return r;
};
cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.setTextContent = function (newValue) {
  for (var i = 0; i < this.childNodes.v.length; i++) {
    this.childNodes.v[i].parentNode = null;
  }
  this.childNodes.v.splice (0, this.childNodes.v.length);
  if (newValue.length > 0) {
    this.appendChild (this.ownerDocument.createTextNode (newValue));
  }
};

cx.fam.suika.y2005.DOM.CleanNode.Node.prototype.toString = function () {
  return "[object Node]";
};


/**
   Interface |Document|
*/
cx.fam.suika.y2005.DOM.CleanNode.Document = function () {
  cx.fam.suika.y2005.DOM.CleanNode.Document._superclass.apply (this, []);
  this.childNodes = new cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList ();
};
cx.fam.suika.y2005.DOM.CleanNode.Document.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

/**
   Creates a namespace aware attribute node.
   [DOM Level 2 Core]
   
   @param namespaceURI  The namespace URI, or |null|.
   @param qualifiedName The local name.
   @return  The newly created |Attr| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createAttributeNS =
function (namespaceURI, qualifiedName) {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.Attr (namespaceURI, qualifiedName);
  r.ownerDocument = this;
  r.specified = true;
  return r;
};

/**
   Creates a comment node.
   [DOM Level 1 Core]

   @return  The newly created |Comment| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createComment =
function (data) {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.Comment (data);
  r.ownerDocument = this;
  return r;
};

/**
   Creates a |CDATA| section node.
   [DOM Level 1 Core]

   @return  The newly created |CDATASection| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createCDATASection =
function (data) {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.CDATASection (data);
  r.ownerDocument = this;
  return r;
};

/**
   Creates a document fragment node.
   [DOM Level 1 Core]

   @return  The newly created |DocumentFragment| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createDocumentFragment =
function () {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment ();
  r.ownerDocument = this;
  return r;
};

/**
   Creates a namespace aware element node.
   [DOM Level 2 Core]
   
   @param namespaceURI  The namespace URI, or |null|.
   @param localName     The local name.
   @return              The newly created |Comment| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createElementNS =
function (namespaceURI, qualifiedName) {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.Element (namespaceURI, qualifiedName);
  r.ownerDocument = this;
  return r;
};

/**
   Creates an entity reference node.
   [DOM Level 1 Core]

   @return  The newly created |EntityReference| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createEntityReference =
function (name) {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.EntityReference (name);
  r.ownerDocument = this;
  return r;
};

/**
   Creates a processing instruction node.
   [DOM Level 1 Core]

   @return  The newly created |ProcessingInstruction| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createProcessingInstruction =
function (target, data) {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction (target, data);
  r.ownerDocument = this;
  return r;
};

/**
   Creates a text node.
   [DOM Level 1 Core]

   @param data  The text data.
   @return  The newly created |Text| node.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.createTextNode =
function (data) {
  var r = new cx.fam.suika.y2005.DOM.CleanNode.Text (data);
  r.ownerDocument = this;
  return r;
};

/**
   The document element node, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getDocumentElement =
function () {
  for (var i = 0; i < this.childNodes.v.length; i++) {
    var child = this.childNodes.v[i];
    if (child.getNodeType () == child.ELEMENT_NODE) {
      return child;
    }
  }
  return null;
};

/**
   The implementation object.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getImplementation = function () {
  JSAN.require ("cx.fam.suika.y2005.DOM.Implementation");
  return new cx.fam.suika.y2005.DOM.Implementation.DOMImplementation (null);
};

/**
   Markup'ed content of the node.
   [non-standard]
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getInnerHTML = function () {
  var impl = this.getImplementation ();
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
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

/**
   Markup'ed content with optional XML declaration.
   [non-standard]
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getOuterHTML = function () {
  var impl = this.getImplementation ();
  cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
  var se = impl.createGLSSerializer
    ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#SerializeDocumentInstance");
  return se.writeToString (this);
};

/**
   Whethter the implementation enfoces strict error checking or not.
   [DOM Level 3 Core]
   
       Note.  In this implementation its value is always |false|
              and setting the attribute has no effect.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getStrictErrorChecking =
function () {
  return false;
};
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.setStrictErrorChecking =
function (newValue) {
};

/**
   The encoding declaration value in XML declaration, if any, or |null|.
   [DOM Level 3 Core]
   
       Note.  This attribute is read-write in this implementation.
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getXMLEncoding = function () {
  return this.xmlEncoding;
};
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.setXMLEncoding =
function (newValue) {
  this.xmlEncoding = newValue
};

/**
   The standalone declaration value in XML declaration, if any, or |null|.
   [DOM Level 3 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getXMLStandalone = function () {
  return this.xmlStandalone;
};
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.setXMLStandalone =
function (newValue) {
  this.xmlStandalone = newValue
};

/**
   The XML version of the document.
   [DOM Level 3 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getXMLVersion = function () {
  return this.xmlVersion == null ? "1.0" : this.xmlVersion;
};
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.setXMLVersion =
function (newValue) {
  this.xmlVersion = newValue
};


cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getNodeName = function () {
  return "#document";
};
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.setNodeName = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getNodeType = function () {
  return this.DOCUMENT_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getNodeValue = function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.setNodeValue = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.getTextContent = function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.setTextContent = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.Document.prototype.toString = function () {
  return "[object Document]";
};

/**
   Interface |DocumentFragment|
*/
cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment = function () {
  cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment._superclass.apply (this, []);
  this.childNodes = new cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList ();
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.getNodeName = function () {
  return "#document-fragment";
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.setNodeName = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.getNodeType = function () {
  return this.DOCUMENT_FRAGMENT_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.getNodeValue =
function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.setNodeValue =
function () {
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.getTextContent =
function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.setTextContent =
function () {
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.toString = function () {
  return "[object DocumentFragment]";
};

/**
   Interface |DocumentType|
*/
cx.fam.suika.y2005.DOM.CleanNode.DocumentType = function () {
  cx.fam.suika.y2005.DOM.CleanNode.DocumentType._superclass.apply (this, []);
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentType.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

cx.fam.suika.y2005.DOM.CleanNode.DocumentType.prototype.getNodeName = function () {
  return "#document-type";
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentType.prototype.setNodeName = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentType.prototype.getNodeType = function () {
  return this.DOCUMENT_TYPE_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentType.prototype.getNodeValue = function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentType.prototype.setNodeValue = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentType.prototype.getTextContent = function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.DocumentType.prototype.setTextContent = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.DocumentFragment.prototype.toString = function () {
  return "[object DocumentType]";
};

/**
   Interface |Element|
*/
cx.fam.suika.y2005.DOM.CleanNode.Element = function (nsuri, qname) {
  cx.fam.suika.y2005.DOM.CleanNode.Element._superclass.apply (this, []);
  this.childNodes = new cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList ();
  this.attributes = new cx.fam.suika.y2005.DOM.CleanNode.AttributeMap ();
  this.namespaceURI = nsuri == "" ? null : nsuri;
  var qn = qname.split (":", 2);
  if (qn[1] != null) {
    this.prefix = qn[0];
    this.localName = qn[1];
  } else {
    this.prefix = null;
    this.localName = qn[0];
  }
};
cx.fam.suika.y2005.DOM.CleanNode.Element.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

/**
   Returns an attribute value, if any, or empty string.
   [DOM Level 2 Core]
   
   @param namespaceURI  The namespace URI of the attribute.
   @param localName     The local name of the attribute.
   @return  The attribute value, if attribute any, or |null|.
*/
cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getAttributeNS =
function (namespaceURI, localName) {
  if (namespaceURI == null) namespaceURI = "";
  if (this.attributes.v[namespaceURI] && this.attributes.v[namespaceURI][localName]) {
    return this.attributes.v[namespaceURI][localName].getTextContent ();
  } else {
    return "";
  }
};

/**
   Returns a snapshot list of identifiers of the element.
   [non-standard]
*/
cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getIds = function () {
  var vals = []; /* TODO: |DOMStringList| */
  var as = this.getAttributes ();
  var asl = as.getLength ();
  for (var i = 0; i < asl; i++) {
    var a = as.item (i);
    if (a.isId ()) {
      var v = attrs.getTextContent ().split (/\s+/);
      for (var j in v) {
        vals.push (v[j]);
      }
    }
  }
  /* TODO: identifier elements */
  return vals;
};

/**
   Returns whether the element has an attribute or not.
   
   @param namespaceURI  The namespace URI of the attribute.
   @param localName     The local name of the attribute.
   @return  |true| or |false|.
*/
cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.hasAttributeNS =
function (namespaceURI, localName) {
  if (namespaceURI == null) namespaceURI = "";
  if (this.attributes.v[namespaceURI] && this.attributes.v[namespaceURI][localName]) {
    return true;
  } else {
    return false;
  }
};

/**
   Removes an attribute if any.
   
   @param namespaceURI  The namespace URI of the attribute.
   @param localName     The local name of the attribute.
*/
cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.removeAttributeNS =
function (namespaceURI, localName) {
  if (namespaceURI == null) namespaceURI = "";
  if (this.attributes.v[namespaceURI] && this.attributes.v[namespaceURI][localName]) {
    this.attributes.v[namespaceURI][localName].ownerElement = undefined;
  }
};

/**
   Sets an attribute value if any.
   
   @param namespaceURI  The namespace URI of the attribute.
   @param localName     The local name of the attribute.
   @param value         The attribute value.
*/
cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.setAttributeNS =
function (namespaceURI, localName, value) {
  if (namespaceURI == null) namespaceURI = "";
  if (!this.attributes.v[namespaceURI]) this.attributes.v[namespaceURI] = {};
  if (this.attributes.v[namespaceURI][localName]) {
    var attr = this.attributes.v[namespaceURI][localName];
  } else {
    var attr = this.ownerDocument.createAttributeNS (namespaceURI, localName);
    attr.ownerElement = this;
    this.attributes.v[namespaceURI][localName] = attr;
  }
  attr.setTextContent (value);
  attr.specified = true;
};

/**
   The qualified name of the element type.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getTagName = function () {
  if (this.prefix != null) {
    return this.prefix + ":" + this.localName;
  } else {
    return this.localName;
  }
};

cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getAttributes = function () {
  return this.attributes;
};

cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.hasAttributes = function () {
  return (this.attributes.getLength () > 0);
};

cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getNodeName
  = cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getTagName;

cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getNodeType = function () {
  return this.ELEMENT_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getNodeValue = function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.setNodeValue = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.toString = function () {
  return "[object Element]";
};

/**
   Interface |Attr|
*/
cx.fam.suika.y2005.DOM.CleanNode.Attr = function (nsuri, qname) {
  cx.fam.suika.y2005.DOM.CleanNode.Attr._superclass.apply (this, []);
  this.childNodes = new cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList ();
  this.namespaceURI = nsuri == "" ? null : nsuri;
  var qn = qname.split (":", 2);
  if (qn[1] != null) {
    this.prefix = qn[0];
    this.localName = qn[1];
  } else {
    this.prefix = null;
    this.localName = qn[0];
  }
};
cx.fam.suika.y2005.DOM.CleanNode.Attr.inherits (cx.fam.suika.y2005.DOM.CleanNode.Node);

/**
   Whether the attribute is an identifier attribute or not.
   [DOM Level 3 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.isId = function () {
  if (this.isId) {
    return this.isId;
  } else {
    var ln = this.localName;
    var ns = this.namespaceURI;
    if (ln == "id") {
      switch (ns) {
      case "http://www.w3.org/XML/1998/namespace":
      case "http://www.w3.org/1999/xhtml":
        return true;
      }
    }
    var oel = this.ownerElement ();
    if (oel) {
      switch (oel.namespaceURI) {
      case "http://www.w3.org/1999/xhtml":
        if (ln == "id" && ns == null) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
   The owner element, if any, or |null|.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getOwnerElement = function () {
  return this.ownerElement;
};

/**
   Whether the value is specified or not.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getSpecified = function () {
  return this.specified;
};

/**
   The attribute value.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getValue = function () {
  return this.getTextContent ();
};
cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.setValue = function (newValue) {
  this.setTextContent (newValue);
};

/**
   The qualified name of the attribute.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getName
  = cx.fam.suika.y2005.DOM.CleanNode.Element.prototype.getTagName;

cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getNodeName
  = cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getName;

cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getNodeType = function () {
  return this.ATTRIBUTE_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.getNodeValue = function () {
  return this.getTextContent ();
};
cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.setNodeValue = function (newValue) {
  this.setTextContent (newValue);
};

cx.fam.suika.y2005.DOM.CleanNode.Attr.prototype.toString = function () {
  return "[object Attr]";
};

/**
   Interface |CharacterData|
*/
cx.fam.suika.y2005.DOM.CleanNode.CharacterData = function (data) {
  cx.fam.suika.y2005.DOM.CleanNode.CharacterData._superclass.apply (this, []);
  this.data = data;
};
cx.fam.suika.y2005.DOM.CleanNode.CharacterData.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

/**
   The text data in this node.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.getData = function () {
  return this.getTextContent ();
};
cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.setData =
function (newValue) {
  this.setTextContent (newValue);
};

cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.getNodeValue
  = cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.getData;
cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.setNodeValue
  = cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.setData;

cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.getTextContent = function () {
  return this.data;
};
cx.fam.suika.y2005.DOM.CleanNode.CharacterData.prototype.setTextContent =
function (newValue) {
  this.data = newValue;
};

/**
   Interface |Text|
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Text = function (data) {
  cx.fam.suika.y2005.DOM.CleanNode.Text._superclass.apply (this, [data]);
};
cx.fam.suika.y2005.DOM.CleanNode.Text.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.CharacterData);

cx.fam.suika.y2005.DOM.CleanNode.Text.prototype.getNodeName = function () {
  return "#text";
};

cx.fam.suika.y2005.DOM.CleanNode.Text.prototype.getNodeType = function () {
  return this.TEXT_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.Text.prototype.toString = function () {
  return "[object Text]";
};

/**
   Interface |CDATASection|
   [DOM Level 1 XML]
*/
cx.fam.suika.y2005.DOM.CleanNode.CDATASection = function (data) {
  cx.fam.suika.y2005.DOM.CleanNode.CDATASection._superclass.apply (this, [data]);
};
cx.fam.suika.y2005.DOM.CleanNode.CDATASection.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Text);

cx.fam.suika.y2005.DOM.CleanNode.CDATASection.prototype.getNodeName = function () {
  return "#cdata-section";
};

cx.fam.suika.y2005.DOM.CleanNode.CDATASection.prototype.getNodeType = function () {
  return this.CDATA_SECTION_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.CDATASection.prototype.toString = function () {
  return "[object CDATASection]";
};

/**
   Interface |Comment|
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.Comment = function (data) {
  cx.fam.suika.y2005.DOM.CleanNode.Comment._superclass.apply (this, [data]);
};
cx.fam.suika.y2005.DOM.CleanNode.Comment.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.CharacterData);

cx.fam.suika.y2005.DOM.CleanNode.Comment.prototype.getInnerHTML = function () {
  return this.getTextContent ();
};

cx.fam.suika.y2005.DOM.CleanNode.Comment.prototype.getNodeName = function () {
  return "#comment";
};

cx.fam.suika.y2005.DOM.CleanNode.Comment.prototype.getNodeType = function () {
  return this.COMMENT_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.Comment.prototype.getOuterHTML = function () {
  return "<!--" + this.getTextContent () + "-->";
};

cx.fam.suika.y2005.DOM.CleanNode.Comment.prototype.toString = function () {
  return "[object Comment]";
};

/**
   Interface |ProcessingInstruction|
   [DOM Level 1 XML]
*/
cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction = function (name, data) {
  cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction._superclass.apply (this, []);
  this.target = name;
  this.data = data;
};
cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

/**
   The target data of the node.
   [DOM Level 1 XML]
*/
cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getData =
function () {
  return this.getTextContent ();
};
cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.setData =
function (newValue) {
  this.setTextContent (newValue);
};

/**
   The target name of the node.
   [DOM Level 1 XML]
*/
cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getTarget =
function () {
  return this.target;
};

cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getNodeName
  = cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getTarget;

cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getNodeType =
function () {
  return this.PROCESSING_INSTRUCTION_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getNodeValue
  = cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getData;
cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.setNodeValue
  = cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.setData;

cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.getTextContent =
function () {
  return this.data;
};
cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.setTextContent =
function (newValue) {
  this.data = newValue;
};

cx.fam.suika.y2005.DOM.CleanNode.ProcessingInstruction.prototype.toString =
function () {
  return "[object ProcessingInstruction]";
};

/**
   Interface |EntityReference|
   [DOM Level 1 XML]
   
       Note.  This implementation does not support general entity references
              other than unexpanded ones.
*/
cx.fam.suika.y2005.DOM.CleanNode.EntityReference = function (name) {
  cx.fam.suika.y2005.DOM.CleanNode.EntityReference._superclass.apply (this, []);
  this.childNodes = new cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList ();
  this.name = name;
};
cx.fam.suika.y2005.DOM.CleanNode.EntityReference.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

cx.fam.suika.y2005.DOM.CleanNode.EntityReference.prototype.getNodeName =
function () {
  return this.name;
};

cx.fam.suika.y2005.DOM.CleanNode.EntityReference.prototype.getNodeType =
function () {
  return this.ENTITY_REFERENCE_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.EntityReference.prototype.toString =
function () {
  return "[object EntityReference]";
};

/**
   Interface |Entity|
   [DOM Level 1 XML]
*/
cx.fam.suika.y2005.DOM.CleanNode.Entity = function (name) {
  cx.fam.suika.y2005.DOM.CleanNode.Entity._superclass.apply (this, []);
  this.childNodes = new cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList ();
  this.name = name;
};
cx.fam.suika.y2005.DOM.CleanNode.Entity.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

cx.fam.suika.y2005.DOM.CleanNode.Entity.prototype.getNodeName =
function () {
  return this.name;
};

cx.fam.suika.y2005.DOM.CleanNode.Entity.prototype.getNodeType =
function () {
  return this.ENTITY_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.Entity.prototype.toString =
function () {
  return "[object Entity]";
};

/**
   Interface |Notation|
   [DOM Level 1 XML]
*/
cx.fam.suika.y2005.DOM.CleanNode.Notation = function (name) {
  cx.fam.suika.y2005.DOM.CleanNode.Notation._superclass.apply (this, []);
  this.name = name;
};
cx.fam.suika.y2005.DOM.CleanNode.Notation.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.Node);

cx.fam.suika.y2005.DOM.CleanNode.Notation.prototype.getNodeName =
function () {
  return this.name;
};

cx.fam.suika.y2005.DOM.CleanNode.Notation.prototype.getNodeType =
function () {
  return this.NOTATION_NODE;
};

cx.fam.suika.y2005.DOM.CleanNode.Notation.prototype.getTextContent = function () {
  return null;
};
cx.fam.suika.y2005.DOM.CleanNode.Notation.prototype.setTextContent = function () {
};

cx.fam.suika.y2005.DOM.CleanNode.Notation.prototype.toString =
function () {
  return "[object Notation]";
};


/**
   Interface |NodeList|
*/
cx.fam.suika.y2005.DOM.CleanNode.NodeList = function () {
};

/**
   The |index|th item in the list, if any, or |null|.
   [DOM Level 1 Core]
   
   @param index  The ordinal index of the item.
   @return  The |index|th item, or |null|.
*/
cx.fam.suika.y2005.DOM.CleanNode.NodeList.prototype.item = function (index) {
  return this.v[index];
};
/**
   The number of items in the list.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.NodeList.prototype.getLength = function () {
  return this.v.length;
};


cx.fam.suika.y2005.DOM.CleanNode.NodeList.prototype.toString = function () {
  return "[object NodeList]";
};


/**
   Class |ChildNodeList| implements |NodeList|
*/
cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList = function () {
  cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList._superclass.apply (this, []);
  this.v = [];
};
cx.fam.suika.y2005.DOM.CleanNode.ChildNodeList.inherits
  (cx.fam.suika.y2005.DOM.CleanNode.NodeList);


/**
   Class |AttributeMap| implements |NamedNodeMap|
*/
cx.fam.suika.y2005.DOM.CleanNode.AttributeMap = function () {
  //cx.fam.suika.y2005.DOM.CleanNode.AttributeMap._superclass.apply (this, []);
  this.v = [];
};
//cx.fam.suika.y2005.DOM.CleanNode.AttributeMap.inherits
//  (cx.fam.suika.y2005.DOM.CleanNode.NamedNodeMap);


/**
   Returns the |index|th item in the collection.
   [DOM Level 1 Core]
   
   @param index  The ordinal index of the item.
   @return  The |index|th item, if any, or |null|.
*/
cx.fam.suika.y2005.DOM.CleanNode.AttributeMap.prototype.item =
function (index) {
  var i = 0;
  for (var ns in this.v) {
    for (var ln in this.v[ns]) {
      if (i++ == index) {
        return this.v[ns][ln];
      }
    }
  }
  return null;
};

/**
   The number of items in the collection.
   [DOM Level 1 Core]
*/
cx.fam.suika.y2005.DOM.CleanNode.AttributeMap.prototype.getLength =
function () {
  var i = 0;
  for (var ns in this.v) {
    for (var ln in this.v[ns]) {
      i++;
    }
  }
  return i;
};


cx.fam.suika.y2005.DOM.CleanNode.AttributeMap.prototype.toString = function () {
  return "[object NamedNodeMap]";
};

/* $Date: 2005/11/06 14:24:23 $ */

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
