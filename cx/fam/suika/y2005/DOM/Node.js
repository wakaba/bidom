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

cx.fam.suika.y2005.DOM.Node.EXPORT_OK = ["DOMElement", "requireDOMNodeFeature"];
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

JSAN.require ("cx.fam.suika.y2005.Class.Inherit");

cx.fam.suika.y2005.DOM.Node.Node = function (node) {
  this._Node = node;  /* Original Node object */
  for (var i in cx.fam.suika.y2005.DOM.Node.Node._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Node._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.Node.prototype.toString = function () {
  return "[object Node]";
};
cx.fam.suika.y2005.DOM.Node.Node._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Node._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Node, feature, version, impl);
};

cx.fam.suika.y2005.DOM.Node.Element = function (node) {
  cx.fam.suika.y2005.DOM.Node.Element._superclass.apply (this, [node]);
  for (var i in cx.fam.suika.y2005.DOM.Node.Element._Constructor) {
    cx.fam.suika.y2005.DOM.Node.Element._Constructor[i].apply (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Node.DOMElement = cx.fam.suika.y2005.DOM.Node.Element;
cx.fam.suika.y2005.DOM.Node.Element.inherits (cx.fam.suika.y2005.DOM.Node.Node);
cx.fam.suika.y2005.DOM.Node.Element.prototype.toString = function () {
  return "[object Element]";
};
cx.fam.suika.y2005.DOM.Node.Element._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Node.Element._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Node._AddFeature
    (cx.fam.suika.y2005.DOM.Node.Element, feature, version, impl);
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
