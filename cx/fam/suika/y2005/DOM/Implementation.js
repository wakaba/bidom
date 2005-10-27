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
if (typeof (cx.fam.suika.y2005.DOM.Implementation) == "undefined") {
  cx.fam.suika.y2005.DOM.Implementation = {};
}

cx.fam.suika.y2005.DOM.Implementation.EXPORT_OK
  = ["requireDOMImplementationFeature", "Features"];

cx.fam.suika.y2005.DOM.Implementation._AddFeature =
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
cx.fam.suika.y2005.DOM.Implementation.requireDOMImplementationFeature =
function (feature, version) {
  feature = feature.toLowerCase ();
  if (!cx.fam.suika.y2005.DOM.Implementation._FeatureModule[feature] ||
      !cx.fam.suika.y2005.DOM.Implementation._FeatureModule[feature][version]) {
    throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     'Feature "' + feature + '" version "' + version +
                     '" is not supported');
  } else {
    JSAN.require (cx.fam.suika.y2005.DOM.Implementation._FeatureModule
                  [feature][version]);
  }
};
cx.fam.suika.y2005.DOM.Implementation._FeatureModule = {};
cx.fam.suika.y2005.DOM.Implementation._FeatureModule
["http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic."] = {};
cx.fam.suika.y2005.DOM.Implementation._FeatureModule
["http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic."]["3.0"]
  = /* ??JSANModule?? */ "cx.fam.suika.y2005.LS.Generic";
  
/* DOMImplementation */

cx.fam.suika.y2005.DOM.Implementation.DOMImplementation = function (impl) {
  this._Impl = impl;  /* Original DOMImplementation object */
  for (var i in cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._Constructor) {
    cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._Constructor[i].apply
      (this, arguments);
  }
};
cx.fam.suika.y2005.DOM.Implementation.DOMImplementation.prototype.toString =
function () {
  return "[object DOMImplementation]";
};
cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._SupportedFeature = {};
cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._AddFeature =
function (feature, version, impl) {
  cx.fam.suika.y2005.DOM.Implementation._AddFeature
    (cx.fam.suika.y2005.DOM.Implementation.DOMImplementation, feature, version, impl);
};

/* Features */

cx.fam.suika.y2005.DOM.Implementation.Features = function (features) {
  if (typeof (features) == "string") {
    var f = features.split (/\s+/);
    if (f.length == 1 && f[0] == "") {
      f.pop ();
    }
    this._Features = {};
    while (f.length > 0) {
      var fname = f.shift ().toLowerCase ();
      if (!this._Features[fname]) {
        this._Features[fname] = [];
      }
      var fver = f.shift ();
      if (fver == null) {
        this._Features[fname].push ("");
      } else if (fver.match (/^\d+\.\d+$/)) {
        this._Features[fname].push (fver);
      } else {
        f.unshift (fver);
        this._Features[fname].push ("");
      }
    }
  } else if (features._Features) {
    this._Features = features._Features;
  } else {
    for (var fname in features) {
      var lfname = fname.toLowerCase ();
      if (!this._Feature[lfname]) {
        this._Features[lfname] = [];
      }
      var v = featuers[fname];
      if (v == null) {
        this._Features[lfname].push ("");
      } else if (v instanceof Array) {
        for (var i in v) {
          this._Features[lfname].push (v[i]);
        }
      } else {
        this._Features[lfname].push (v);
      }
    }
  }
};
/** Returns a snapshot copy of list of feature name and value pairs */
cx.fam.suika.y2005.DOM.Implementation.Features.prototype.getFeaturePairSnapshot =
function () {
  var r = [];
  for (var fname in this._Features) {
    for (var i in this._Features[fname]) {
      r.push ([fname, this._Features[fname][i]]);
    }
  }
  return r;
};
/** Whether the features includes requested features or not */
cx.fam.suika.y2005.DOM.Implementation.Features.prototype.hasFeatures =
function (features) {
  var xfs = new cx.fam.suika.y2005.DOM.Implementation.Features (features)
            .getFeaturePairSnapshot ();
  XFS: for (var i = 0; i < xfs.length; i++) {
    var xf = xfs[i];
    if (this._Features[xf[0]]) {
      for (var i in this._Features[xf[0]]) {
        if (this._Features[xf[0]][i] == xf[1] || xf[1].length == 0) {
          continue XFS;
        }
      }
    }
    var mxf0 = xf[0].slice (1);
    if (xf[0].charAt (0) == "+" && this._Features[mxf0]) {
      for (var i in this._Features[mxf0]) {
        if (this._Features[mxf0][i] == xf[1] || xf[1].length == 0) {
          continue XFS;
        }
      }
    }
    return false;
  } // XFS
  return true;
};
cx.fam.suika.y2005.DOM.Implementation.Features.prototype.toString =
function () {
  var r = "";
  for (var fname in this._Features) {
    for (var i in this._Features[fname]) {
      r += " " + fname;
      var fver = this._Features[fname][i];
      if (fver.length > 0) {
        r += " " + fver;
      }
    }
  }
  return ((r.length > 0) ? r.slice (1) : "");
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
