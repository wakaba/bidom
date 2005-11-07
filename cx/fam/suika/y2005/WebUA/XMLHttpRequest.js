/**
   Module |WebUA.XMLHttpRequest|
   
   The |WebUA.XMLHttpRequest| module provides a wrapper for |XMLHttpRequest|
   object.
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
if (typeof (cx.fam.suika.y2005.WebUA) == "undefined") {
  cx.fam.suika.y2005.WebUA = {};
}

/**
   Class |WebUA.XMLHttpRequest|
   
     Implements:
       |XMLHttpRequest| [HTML5 WD] (partially)
       |EventTarget| [DOM Level 3 Events] (partially)
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest = function (impl, win) {
  this._Impl = impl; /* |DOMImplementation| object */
  this._Window = win ? win : window; /* TODO: encapsulate native |window| */
  this._Object = this._Window.XMLHttpRequest
                   ? new this._Window.XMLHttpRequest ()
                   : new ActiveXObject ("Microsoft.XMLHTTP");
  this.eventListener = {};
  var this_ = this;
  this._Object.onreadystatechange = function () {
    var event = new cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event ();
    event.initEventNS (null, "readystatechange", false, false);
    this_.dispatchEvent (event);
  };
};

/**
   Registers an event listener.
   [DOM Level 3 Events]
   
       Note.  Registering an event listener in an event listener being triggered
              should have no effect for the event being processed, but
              it is *not* implemented.

   @param namespaceURI   The namespace URI of the event type, or |null|.
   @param type           The local name of the event type.
   @param listener       The event listener to register.
                             Note.  This implementation does not support
                                    listeners other than |Function| object.
   @param useCapture     If |true|, the addition has no effect since
                         no capture phase is defined for this kind of objects.
   @param evtGroup       The event group, or |null| for the default group.
                             Note.  This implementation does not support
                                    non-|null| values and such registrations
                                    are ignored.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.addEventListenerNS =
function (namespaceURI, type, listener, useCapture, evtGroup) {
  if (useCapture || evtGroup) return;
  var key = (namespaceURI ? namespaceURI : "") + '"' + type;
  if (!this.eventListener[key]) this.eventListener[key] = [];
  var listeners = this.eventListener[key];
  for (var i = 0; i < listeners.length; i++) {
    if (listeners[i] == listener) {
      return;
    }
  }
  listeners.push (listener);
};

/**
   Dispatches an event.
   [DOM Level 2 Events, modified in DOM Level 3 Events]
   
   @param evt  The event to be dispatched.
   @return     If |evt.preventDefault| was called, |false|, otherwise |true|.
   @throw EventException |UNSPECIFIED_EVENT_TYPE_ERR|: If |evt.type| is
                         |null| or an empty string.
                         |DISPATCH_REQUEST_ERR|: If the |evt| is already being
                         dispatched in the tree.
                         |NOT_SUPPORTED_ERR|: If dispatching of the |evt| is
                         not supported.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.dispatchEvent =
function (evt) {
  var nsuri = evt.getNamespaceURI ();
  var ln = evt.getType ();
  key = nsuri != null ? nsuri : "";
  key = key + '"' + ln;
  var listeners = [];
  if (this.eventListener[key]) {
    for (var i = 0; i < this.eventListener[key].length; i++) {
      listeners.push (this.eventListener[key][i]);
    }
  }
  if (nsuri != null) {
    key = '"' + ln;
    if (this.eventListener[key]) {
      for (var i = 0; i < this.eventListener[key].length; i++) {
        listeners.push (this.eventListener[key][i]);
      }
    }
  }
  
  evt._SetTarget (this);
  evt.setDispatchState (this, evt.AT_TARGET);
  L: for (var i = 0; i < listeners.length; i++) {
    listeners[i] (evt);
    if (evt.isImmediatePropagationStopped) break L;
  }
  return evt.isDefaultPrevented ();
};

/* TODO: |abort|, |getAllResponseHeaders|, |getResponseHeader| */

/* Not implemented: |hasEventListenerNS|, |addEventListener|, |removeEventListener| */

/**
   An event listener that is invoked when a |readystatechange|
   event is fired on the object.
   [HTML5 WD]
   
   A |readystatechange| event is immediately dispatched at the object
   whenever the |readyState| attribute changes value.  It has no default action.
   
       Note.  In Opera 8.0 Beta the |readystatechange| event might
              be fired even when the state is not changed.  This bug
              is fixed (at least) in Opera 8.5.
       
       Note.  Firefox 0.9 does not fires the event if |async| flag is |false|.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.setOnreadystatechange =
function (newValue) {
  if (this.onreadystatechage != null) {
    this.removeEventListenerNS
      (null, "readystatechange", this.onreadystatechange, false);
  }
  this.onreadystatechange = newValue;
  this.addEventListenerNS (null, "readystatechange", newValue, false);
}

/**
   Initializes the object by remembering the arguments, setting the 
   |readystate| attribute to |READY_STATE_OPEN|, resetting the |responseText|,
   |responseXML|, |status|, and |statusText| attributes to their initial values,
   and resetting the list of request header fields.
   [HTML5 WD]
   
   @param method   The request method.
   @param uri      The request URI.  It is resolved to an absolute URI using
                   the script context's |window.location.href| value as the base URI.
                       Note.  If the URI contains a user name and a password,
                              then they are used if the |user| and |password|
                              arguments are omitted.  If they are not omitted,
                              even if they are |null|, they take precedence.
   @param async    Defaulted to |true| if omitted.
   @param user     Defaulted to |null| if omitted.
   @param password Defaulted to |null| if omitted.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.open =
function (method, uri, async, user, password) {
  /* TODO: don't use native |window| object directly. */
  if (uri == "") {
    uri = this._Window.location.href;
    /* Note.  WinIE6 and Firefox 0.9 does not support empty string URI */
  }
  this._Object.open (method.toUpperCase (), uri, async, user, password);
    /* Note.  Firefox 0.9 does not accept lowercase method name.
              Whether it is allowed is unclear in the specification. */
};

/**
   The state of the object.
   [HTML5 WD]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.getReadyState = function () {
  return this._Object.readyState;
};

/**
   The initial value.
   [non-standard]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.READY_STATE_UNINITIALIZED = 0;
/**
   The |open| method has been successfully called.
   [non-standard]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.READY_STATE_OPEN = 1;
/**
   The |send| method has been successfully called, but no
   data has yet received.
   [non-standard]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.READY_STATE_SENT = 2;
/**
   Data is begin received, but the data transfer is not yet completed.
   [non-standard]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.READY_STATE_RECEIVING = 3;
/**
   The data transfer has been completed.
   [non-standard]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.READY_STATE_LOADED = 4;

/**
   Removes an event litener.
   [DOM Level 3 Events]
   
       Note.  Removal of an event listener takes effect as soon as the method
              is called.
              Removing a listener that is not registered has no effect.

   @param namespaceURI   The namespace URI of the event type, or |null|.
   @param type           The local name of the event type.
   @param listener       The event listener.
   @param useCapture     The phase.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.removeEventListenerNS =
function (namespaceURI, type, listener, useCapture) {
  if (useCapture) return;
  var key = (namespaceURI ? namespaceURI : "") + '"' + type;
  if (!this.eventListener[key]) return;
  var listeners = this.eventListener[key];
  for (var i = 0; i < listeners.length; i++) {
    if (listeners[i] == listener) {
      listeners.splice (i, 1);
      return;
    }
  }
};

/**
   The body of the data received so far, interpreted using the character
   encoding specified in the response, or UTF-8 if no character encoding
   was specified.
       Note.  Invalid bytes are convedted to |REPLACEMENT CHARACTER|.
   The attribute has a value of an empty string if the |readyState|
   attribute has a value other than |READY_STATE_RECEIVING| or 
   |READY_STATE_LOADED|.
   [HTML5 WD]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.getResponseText = function () {
  return this._Object.responseText;
};

/**
   A |Document| object representing the parsed document.
   [HTML5 WD]
   
   The attribute has a value of |null| if the |readyState| attribute
   has a value other than |READY_STATE_LOADED|, if the |Content-Type|
   is neither |text/xml|, |application/xml|, nor ends in |+xml|, or if 
   the document was not an XML document.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.getResponseXML = function () {
  if (this._Object.readyState == this.READY_STATE_LOADED) {
  /* TODO: |Content-Type| check */
    JSAN.use ("cx.fam.suika.y2005.DOM.CleanNode");
    var doc = cx.fam.suika.y2005.DOM.CleanNode.createCleanDOMDocument ();
    cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature
      ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0");
    var xmlParser = this._Impl.createGLSParser
      ("http://suika.fam.cx/www/cx/fam/suika/y2005/LS/SimpleParser#");
    try {
      xmlParser.parseStringWithContext (this._Object.responseText, doc);
    } catch (e) {
      var event = new cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event ();
      event.initEventNS
        ("http://suika.fam.cx/www/cx/fam/suika/y2005/WebUA/XMLHttpRequest#",
         "parseError", false, false, e);
      this.dispatchEvent (event);
      return null;
    }
    return doc;
  } else {
    return null;
  }
};

/* TODO: |setRequestHeader| */

/* Not implemented: |willTrigerNS| */

/**
   Sets the |readyState| attribute to |READY_STATE_SENT| and sends
   a request.
   [HTML5 WD]
   
   If the |async| flag is set to |false|, then the method does
   not return until the request has completed.  Otherwise,
   it returns immediately.
   
   @param data       If the |method| is |post| or |put|, then the |data|
                     is used for the entity body.  If |data| is a string,
                     the data is encoded as UTF-8.  If the |data| is a |Document|,
                     then the document is serialized using the encoding given
                     by |data.xmlEncoding|, if specified, or UTF-8 otherwise.
   @throw DOMException  |INVALID_STATE_ERR|:  If the |readyState| attribute 
                        has a value other than |READY_STATE_OPEN|.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.send = function (data) {
  this._Object.send (typeof (data) == "undefined" ? null : data);
  /* Note.  Firefox 0.9 does not allow zero argument |send| method. */
};

/**
   The HTTP status code.
   [HTML5 WD]
   
       Note.  If the response is an HTTP redirect, then it should be 
              transparently followed.
   
       Note.  WinIE6, Firefox 0.9, and Opera 8.5 returns |0| for non-HTTP
              request (such as local file).  In addition, they might
              set non-|200| value to the attribute such as |304| for non-error
              case.
   
   @throw DOMException  |INVALID_STATE_ERR|:  If the |readyState| attribute
                        has a value other than |READY_STATE_RECEIVING| or
                        |READY_STATE_LOADED|.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.getStatus = function () {
  return this._Object.status;
};

/**
   The HTTP status text.
   [HTML5 WD]
   
   @throw DOMException  |INVALID_STATE_ERR|:  If the |readyState| attribute
                        has a value other than |READY_STATE_RECEIVING| or
                        |READY_STATE_LOADED|.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.getStatusText = function () {
  return this._Object.statusText;
};

cx.fam.suika.y2005.WebUA.XMLHttpRequest.prototype.toString = function () {
  return "[object XMLHttpRequest]";
};



/**
   Class |WebUA.XMLHttpRequest.Event|
   
     Implements:
       |Event| [DOM Level 3 Events]
       |CustomEvent| [DOM Level 3 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event = function () {
  this.timeStamp = new Date (/* now */);
};

/**
   Whether the event is a bubbling event or not.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getBubbles =
function () {
  return this.bubbles;
};

/**
   Whether the event can have its default action prevented or not.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getCancelable =
function () {
  return this.cancelable;
};

/**
   The |EventTarget| whose |EventListener|s are currently being processed.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getCurrentTarget =
function () {
  return this.currentTarget;
};

/**
   The phase of event flow currently being accomplished.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getEventPhase =
function () {
  return this.eventPhase;
};
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.CAPTURING_PHASE = 1;
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.AT_TARGET = 2;
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.BUBBLING_PHASE = 3;

/**
   Initializes the attribute values of the |Event| object.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.initEvent =
function (eventTypeArg, canBubbleArg, cancelableArg) {
  this.namespaceURI = null;
  this.type = eventTypeArg;
  this.bubbles = canBubbleArg;
  this.cancelable = cancelableArg;
};

/**
   Initializes the attribute values of the |Event| object.
   [DOM Level 3 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.initEventNS =
function (namespaceURIArg, eventTypeArg, canBubbleArg, cancelableArg) {
  this.namespaceURI = namespaceURIArg;
  this.type = eventTypeArg;
  this.bubbles = canBubbleArg;
  this.cancelable = cancelableArg;
};

/**
   Initializes the attribute values of the |Event| object.
   [non-standard]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.initEventNS =
function (namespaceURIArg, eventTypeArg, canBubbleArg, cancelableArg,
          relatedExceptionArg) {
  this.namespaceURI = namespaceURIArg;
  this.type = eventTypeArg;
  this.bubbles = canBubbleArg;
  this.cancelable = cancelableArg;
  this.relatedException = relatedExceptionArg;
};

/**
   Returns whether the |CustomEvent| interface is implemented or not.
   [DOM Level 3 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.isCustom =
function () {
  return true;
};

/**
   Returns whether the |preventDefault| method has been called or not.
   [DOM Level 3 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.isDefaultPrevented =
function () {
  return this.preventDefault;
};

/**
   Returns whether the |stopImmediatePropagation| method has been called or not.
   [DOM Level 3 Events - CustomEvent]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.isImmediatePropagationStopped =
function () {
  return this.immediatePropagationStopped;
};

/**
   Returns whether the |stopPropagation| method has been called or not.
   [DOM Level 3 Events - CustomEvent]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.isPropagationStopped =
function () {
  return this.propagationStopped;
};

/**
   The namespace URI of the event type, or |null| if unspecified.
   [DOM Level 3 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getNamespaceURI =
function () {
  return this.namespaceURI;
};

/**
   Signify that the event is to be canceled if the event is cancelable.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.preventDefault =
function () {
  if (this.cancelable) this.preventDefault = true;
};

/**
   A related exception, if any, or |null|.
   [non-standard]
   
   If the event type is
   {"http://suika.fam.cx/www/cx/fam/suika/y2005/WebUA/XMLHttpRequest#", "parseError"},
   then this attribute is set to the exception that reports a parse error, if any.
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getRelatedException =
function () {
  return this.relatedException;
};

/**
   Prevents event listeners of the same group to be triggered immediately.
   [DOM Level 3 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.stopImmediatePropagation =
function () {
  this.immediatePropagationStopped = true;
};

/**
   Prevents event listeners of the same group to be triggered but its
   effect is deferred until all event listeners attached on the
   |currentTarget| have been triggered.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.stopPropagation =
function () {
  this.propagationStopped = true;
};

/**
   Sets the values of |currentTarget| and |eventPhase| attributes and
   resets |isPropagationStopped| and |isImmediatePropagationStopped|.
   [DOM Level 3 Events - CustomEvent]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.setDispatchState =
function (targetArg, phaseArg) {
  this.currentTarget = targetArg;
  this.eventPhase = phaseArg;
  this.propagationStopped = false;
  this.immediatePropagationStopped = false;
};

/**
   The event target.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getTarget =
function () {
  return this.target;
};
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype._SetTarget =
function (newValue) {
  this.target = newValue;
};

/**
   The time at which the event was created.  It is a |Date| object for 
   ECMAScript binding.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getTimeStamp =
function () {
  return this.timeStamp;
};

/**
   The local name part of the event type.
   [DOM Level 2 Events]
*/
cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.getType =
function () {
  return this.type;
};

cx.fam.suika.y2005.WebUA.XMLHttpRequest.Event.prototype.toString =
function () {
  return "[object Event]";
};



/* $Date: 2005/11/07 10:47:00 $ */

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
