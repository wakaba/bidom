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
if (typeof (cx.fam.suika.y2005.ElementClass) == "undefined") {
  cx.fam.suika.y2005.ElementClass = {};
}

JSAN.require ("cx.fam.suika.y2005.DOM.Node");

/*
  Note: This class will be deprecated when Web Applications 1.0 or
        any other specification standardized interfaces to access classes.
*/

cx.fam.suika.y2005.DOM.Node.Element._AddFeature
  ("http://suika.fam.cx/www/cx/fam/suika/y2005/ElementClass#", "1.0", {
    addClassName: function (c) {
      var cls = this._Node.className;
      if (cls != null) {
        var clses = cls.split (/\s+/);
        for (var i = 0; i < clses.length; i++) {
          if (clses[i] == c) {
            return;
          }
        }
        clses.push (c);
        this._Node.className = clses.join (" ");
      }
    },
    
    /**
       Returns a snapshot list of class names of the element.
    */
    getClassNames: function () {
      var vals = [];
      var a = [["http://www.w3.org/1999/xhtml", "class"],
               ["http://www.w3.org/2002/xhtml2/", "class"]];
      for (var n in a) {
        var v = this.getAttributeNS (a[n][0], a[n][1]).split (/\s+/);
        for (var j in v) {
          vals.push (v[j]);
        }
      }
      var b = [["http://www.w3.org/1999/xhtml", null, "class"],
               ["http://www.w3.org/2000/svg", null, "class"],
               ["http://www.w3.org/1998/Math/MathML", null, "class"],
               ["http://www.w3.org/2002/xhtml2/", null, "class"],
               ["urn:x-suika-fam-cx:markup:suikawiki:0:9:", null, "class"],
               ["urn:x-suika-fam-cx:markup:suikawiki:0:10:", null, "class"],
               ["urn:x-suika-fam-cx:markup:ietf:html:3:draft:00:", null, "class"]];
      var ns = this.getNamespaceURI ();
      for (var n in b) {
        if (ns != b[n][0]) continue;
        var v = this.getAttributeNS (b[n][1], b[n][2]).split (/\s+/);
        for (var j in v) {
          vals.push (v[j]);
        }
      }
      return vals;
    },
    
    hasClassName: function (c) {
      var cls = this._Node.className;
      if (cls != null) {
        var clses = cls.split (/\s+/);
        for (var i = 0; i < clses.length; i++) {
          if (clses[i] == c) {
            return true;
          }
        }
      }
      return false;
    },
    removeClassName: function (c) {
      var cls = this._Node.className;
      if (cls != null) {
        var clses = cls.split (/\s+/);
        for (var i = clses.length - 1; i >= 0; i--) {
          if (clses[i] == c) {
            clses.splice (i, 1);
          }
        }
        this._Node.className = clses.join (" ");
      }
    }
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
 * The Original Code is ElementClass code.
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
