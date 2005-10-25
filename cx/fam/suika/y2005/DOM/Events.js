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
if (typeof (cx.fam.suika.y2005.DOM.Events) == "undefined") {
  cx.fam.suika.y2005.DOM.Events = {};
}

JSAN.require ("cx.fam.suika.y2005.Class.Inherit");

/* Event */

cx.fam.suika.y2005.DOM.Events.Event = function (e, win) {
  this._stde = e;
  this._iee = win.event;
  
  if (e) {
    var prop = ['bubbles', 'cancelable', 'currentTarget', 'eventPhase',
                'target', 'timeStamp', 'type',
                'namespaceURI' /* DOM Level 3 */];
    for (var i in prop) {
      this[prop[i]] = e[prop[i]];
    }
  }
};
cx.fam.suika.y2005.DOM.Events.Event.prototype = {
  CAPTURING_PHASE: 1,
  AT_TARGET: 2,
  BUBBLING_PHASE: 3,
  
  preventDefault: function () {
    if (this._stde && this._stde.preventDefault) {
      this._stde.preventDefault;
    }
    if (this._iee) {
      this._iee.returnValue = false;
    }
    this.DefaultPrevented = true;
  },
  
  /* DOM Level 3 */
  isCustom: function () {
    return false;
  },
  
  isDefaultPrevented: function () {
    if (this._stde && this._stde.isDefaultPrevented) {
      return this,_stde.isDefaultPrevented ();
    } else {
      return this.DefaultPrevented;
    }
  }
};

cx.fam.suika.y2005.DOM.Events.Event.prototype.toString = function () {
  return "[object Event]";
};

/* UIEvent */

cx.fam.suika.y2005.DOM.Events.UIEvent = function (e, win) {
  cx.fam.suika.y2005.DOM.Events.UIEvent._superclass.apply (this, [e, win]);
  if (this._iee) {
    this.view = win;
  }
  if (this._stde) {
    this.view = this._stde.view;
    this.detail = this._stde.detail;
  }
};
cx.fam.suika.y2005.DOM.Events.UIEvent.inherits (cx.fam.suika.y2005.DOM.Events.Event);

cx.fam.suika.y2005.DOM.Events.UIEvent.prototype.toString = function () {
  return "[object UIEvent]";
};

/* MouseEvent */

cx.fam.suika.y2005.DOM.Events.MouseEvent = function (e, win) {
  cx.fam.suika.y2005.DOM.Events.MouseEvent._superclass.apply (this, [e, win]);
  
  var iee = this._iee;
  if (iee) {
    this.buttons = iee.button;
    if (iee.button == 4) {
      this.button = this.MOUSE_BUTTON_TERTIARY;
    } else if (iee.button == 2 || iee.button == 6) {
      this.button = this.MOUSE_BUTTON_SECONDARY;
    } else if (iee.button <= 7 && iee.button > 0) {
      this.button = this.MOUSE_BUTTON_PRIMARY;
    } else {
      this.button = null;
    }
    var prop = ['clientX', 'clientY', 'altKey', 'ctrlKey', 'shiftKey',
                'screenX', 'screenY'];
    for (var i in prop) {
      this[prop[i]] = iee[prop[i]];
    }
    this.metaKey = false;
  }
  
  var ev = this._stde;
  if (ev) {
    var stdbutton = ev.button;
    this.buttons = stdbutton == 0
                 ? this.MOUSE_BUTTONS_PRIMARY
                 : stdbutton == 2
                 ? this.MOUSE_BUTTONS_SECONDARY
                 : stdbutton == 1
                 ? this.MOUSE_BUTTONS_TERTIARY
                 : Math.pow (2, stdbutton);
    this.button = stdbutton;
    var prop = ['clientX', 'clientY', 'ctrlKey', 'metaKey', 'relatedTarget',
                'screenX', 'screenY', 'shiftKey', 'altKey'];
    for (var i in prop) {
      this[prop[i]] = ev[prop[i]];
    }
  }
};

cx.fam.suika.y2005.DOM.Events.MouseEvent.inherits
  (cx.fam.suika.y2005.DOM.Events.UIEvent);

/** Primary (left) button [non-standard] */
cx.fam.suika.y2005.DOM.Events.MouseEvent.prototype.MOUSE_BUTTON_PRIMARY = 0;
/** Secondary (right) button [non-standard] */
cx.fam.suika.y2005.DOM.Events.MouseEvent.prototype.MOUSE_BUTTON_SECONDARY = 2;
/** Tertiary (middle) button [non-standard] */
cx.fam.suika.y2005.DOM.Events.MouseEvent.prototype.MOUSE_BUTTON_TERTIARY = 1;
/** Primary (left) button mask [non-standard] */
cx.fam.suika.y2005.DOM.Events.MouseEvent.prototype.MOUSE_BUTTONS_PRIMARY = 1;
/** Secondary (right) button mask [non-standard] */
cx.fam.suika.y2005.DOM.Events.MouseEvent.prototype.MOUSE_BUTTONS_SECONDARY = 2;
/** Tertiary (middle) button mask [non-standard] */
cx.fam.suika.y2005.DOM.Events.MouseEvent.prototype.MOUSE_BUTTONS_TERTIARY = 4;

cx.fam.suika.y2005.DOM.Events.MouseEvent.prototype.toString = function () {
  return "[object MouseEvent]";
};

/* EventTarget */

JSAN.require ("cx.fam.suika.y2005.DOM.Node");

cx.fam.suika.y2005.DOM.Node.Element._AddFeature
  ("Events", "3.0", {
    _Constructor: function () {
      if (this._Node.addEventListenerNS) {
        this.addEventListenerNS
          = function (namespaceURI, type, listener, useCapture, evtGroup) {
              this._Node.addEventListenerNS
                     (namespaceURI, type, listener, useCapture, evtGroup);
            };
        this.removeEventListenerNS
          = function (namespaceURI, type, listener, useCapture) {
              this._Node.removeEventListenerNS
                     (namespaceURI, type, listener, useCapture);
            };
      }
    },
    addEventListenerNS: function (namespaceURI, type, listener, useCapture, evtGroup) {
      if (evtGroup != null) {
        JSAN.require ("cx.fam.suika.y2005.DOM.Core");
        throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     "Event group is not supported");
      }
      if (useCapture && !this._Node.addEventListener) {
        JSAN.require ("cx.fam.suika.y2005.DOM.Core");
        throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     "Event capture phase is not supported");
      }
      var etype = namespaceURI == this._EVNS
                    ? (type == "click" || type.slice (0, 5) == "mouse" ||
                       type == "dblclick")
                      ? cx.fam.suika.y2005.DOM.Events.MouseEvent
                      : (type == "DOMActivate" || type == "DOMFocusIn" ||
                         type == "DOMFocusOut" || type == "resize" ||
                         type == "scroll")
                        ? cx.fam.suika.y2005.DOM.Events.UIEvent
                        : cx.fam.suika.y2005.DOM.Events.Event
                    : cx.fam.suika.y2005.DOM.Events.Event;
      listener.handleEvent = function (e) {
        var ev = new etype (e, window);
        /* TODO: Scope chain consideration */
        var v = listener (ev);
        if (v != undefined && v == false) {
          ev.preventDefault ();
        }
      };
      if (this._Node.addEventListener) {
        this._Node.addEventListener (type, listener.handleEvent, useCapture);
      } else if (this._Node.attachEvent) {
        this._Node.attachEvent ("on" + type, listener.handleEvent);
      } else {
        JSAN.require ("cx.fam.suika.y2005.DOM.Core");
        throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     "addEventListener is not supported");
      }
    },
    removeEventListenerNS: function (namespaceURI, type, listener, useCapture) {
      if (this._Node.removeEventListener) {
        this._Node.removeEventListener (type, listener.handleEvent, useCapture);
      } else if (this._Node.detachEvent) {
        this._Node.detachEvent ("on" + type, listener.handleEvent);
      } else {
        JSAN.require ("cx.fam.suika.y2005.DOM.Core");
        throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     "removeEventListener is not supported");
      }
    },
    _EVNS: "http://www.w3.org/2001/xml-events"
  });

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
