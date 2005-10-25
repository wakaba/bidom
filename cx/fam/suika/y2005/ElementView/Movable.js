JSAN.require ("cx.fam.suika.y2005.DOM.Node");
cx.fam.suika.y2005.DOM.Node.requireDOMNodeFeature ("Events", "3.0");
cx.fam.suika.y2005.DOM.Node.requireDOMNodeFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/ElementClass#", "1.0");
cx.fam.suika.y2005.DOM.Node.requireDOMNodeFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/ElementView#", "1.0");
cx.fam.suika.y2005.DOM.Node.requireDOMNodeFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/ElementBox#", "1.0");

cx.fam.suika.y2005.DOM.Node.Element._AddFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/ElementView/Movable#", "1.0", {
    _Constructor: function () {
      var thisVM = this;
      var moving = function (e) {
        var mel = thisVM._MovingElement;
        mel.setElementBoxLeft ((e.clientX - mel._EVMDragCX > 0
                                 ? e.clientX - mel._EVMDragCX : 0));
        mel.setElementBoxTop  ((e.clientY - mel._EVMDragCY > 0
                                 ? e.clientY - mel._EVMDragCY : 0));
      };
      this._StartMoving = function (e) {
        var mel = thisVM._MovingElement;
        if (mel == null || thisVM.hasClassName ("DRAGING")) {
          return;
        }
        thisVM.addClassName ("DRAGING");
        mel._EVMDragCX = e.clientX - mel.getOffsetLeft ();
        mel._EVMDragCY = e.clientY - mel.getOffsetTop ();
        thisVM._MovingElement.addEventListenerNS
          (thisVM._EVNS, "mousemove", moving, false);
      };
      this._EndMoving = function () {
        thisVM.removeClassName ("DRAGING");
        thisVM._MovingElement.removeEventListenerNS
          (thisVM._EVNS, "mousemove", moving, false);
      };
    },
    isDragable: function () {
      return this.hasClassName ("DRAGABLE");
    },
    getMovingElement: function () {
      return this._MovingElement;
    },
    setMovingElement: function (newMEl) {
      if (newMEl == null) {
        if (this._MovingElement) {
          this._MovingElement.removeClassName ("MOVABLE");
          this.removeEventListenerNS
            (this._EVNS, "mousedown", this._StartMoving, false);
          this.removeEventListenerNS (this._EVNS, "mouseup", this._EndMoving, false);
          this._MovingElement = null;
        }
        this.removeClassName ("DRAGABLE");
      } else {
        this._MovingElement = newMEl;
        this._MovingElement._EVMDragCX = 0;
        this._MovingElement._EVMDragCY = 0;
        this.addEventListenerNS (this._EVNS, "mousedown", this._StartMoving, false);
        this.addEventListenerNS (this._EVNS, "mouseup", this._EndMoving, false);
        this._MovingElement.addClassName ("MOVABLE");
        this.addClassName ("DRAGABLE");
      }
    }
  });


/* See also: <http://suika.fam.cx/www/mozilla/xbl/doc/drag-xbl> */

/* ***** BEGIN LICENSE BLOCK *****
   - Version: MPL 1.1/GPL 2.0/LGPL 2.1
   -
   - The contents of this file are subject to the Mozilla Public License Version
   - 1.1 (the "License"); you may not use this file except in compliance with
   - the License. You may obtain a copy of the License at
   - <http://www.mozilla.org/MPL/>
   -
   - Software distributed under the License is distributed on an "AS IS" basis,
   - WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
   - for the specific language governing rights and limitations under the
   - License.
   -
   - The Original Code is SuikaWiki code.
   -
   - The Initial Developer of the Original Code is Wakaba.
   - Portions created by the Initial Developer are Copyright (C) 2003
   - the Initial Developer. All Rights Reserved.
   -
   - Contributor(s):
   -   Wakaba <w@suika.fam.cx>
   -
   - Alternatively, the contents of this file may be used under the terms of
   - either the GNU General Public License Version 2 or later (the "GPL"), or
   - the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
   - in which case the provisions of the GPL or the LGPL are applicable instead
   - of those above. If you wish to allow use of your version of this file only
   - under the terms of either the GPL or the LGPL, and not to allow others to
   - use your version of this file under the terms of the MPL, indicate your
   - decision by deleting the provisions above and replace them with the notice
   - and other provisions required by the LGPL or the GPL. If you do not delete
   - the provisions above, a recipient may use your version of this file under
   - the terms of any one of the MPL, the GPL or the LGPL.
   -
   - ***** END LICENSE BLOCK *****
*/
