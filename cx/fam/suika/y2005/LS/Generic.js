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
if (typeof (cx.fam.suika.y2005.LS) == "undefined") {
  cx.fam.suika.y2005.LS = {};
}
if (typeof (cx.fam.suika.y2005.LS.Generic) == "undefined") {
  cx.fam.suika.y2005.LS.Generic = {};
}

JSAN.require ("cx.fam.suika.y2005.DOM.Implementation");

cx.fam.suika.y2005.DOM.Implementation.DOMImplementation._AddFeature
  ("http://suika.fam.cx/~wakaba/archive/2004/dom/ls#generic.", "3.0", {
    createGLSParser: function (features) {
      features = new cx.fam.suika.y2005.DOM.Implementation.Features (features);
      for (var i in cx.fam.suika.y2005.LS.Generic._Parser) {
        var se = cx.fam.suika.y2005.LS.Generic._Parser[i];
        if (se.features.hasFeatures (features)) {
          JSAN.require (se.moduleName);
          return eval ("new " + se.className + " (this);");
        }
      }
      JSAN.require ("cx.fam.suika.y2005.DOM.Core");
      throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     'Features "' + features + '" are not supported');
    },
    createGLSSerializer: function (features) {
      features = new cx.fam.suika.y2005.DOM.Implementation.Features (features);
      for (var i in cx.fam.suika.y2005.LS.Generic._Serializer) {
        var se = cx.fam.suika.y2005.LS.Generic._Serializer[i];
        if (se.features.hasFeatures (features)) {
          JSAN.require (se.moduleName);
          return eval ("new " + se.className + " (this);");
        }
      }
      JSAN.require ("cx.fam.suika.y2005.DOM.Core");
      throw new cx.fam.suika.y2005.DOM.Core.DOMException
                    (cx.fam.suika.y2005.DOM.Core.DOMException.NOT_SUPPORTED_ERR,
                     'Features "' + features + '" are not supported');
    }
  });

if (typeof (cx.fam.suika.y2005.LS.Generic._Parser) == "undefined") {
  cx.fam.suika.y2005.LS.Generic._Parser = [];
}
cx.fam.suika.y2005.LS.Generic._Parser.push ({
  moduleName: /* ??JSANModule?? */ "cx.fam.suika.y2005.LS.SimpleParser",
  className: "cx.fam.suika.y2005.LS.SimpleParser",
  features: new cx.fam.suika.y2005.DOM.Implementation.Features (
    "http://suika.fam.cx/www/cx/fam/suika/y2005/ls/simpleparser# 1.0"
  )
});
cx.fam.suika.y2005.LS.Generic._Parser.push ({
  moduleName: /* ??JSANModule?? */ "cx.fam.suika.y2005.CSS.SimpleParser",
  className: "cx.fam.suika.y2005.CSS.SimpleParser",
  features: new cx.fam.suika.y2005.DOM.Implementation.Features (
    "http://suika.fam.cx/www/cx/fam/suika/y2005/css/simpleparser# 1.0"
  )
});

if (typeof (cx.fam.suika.y2005.LS.Generic._Serializer) == "undefined") {
  cx.fam.suika.y2005.LS.Generic._Serializer = [];
}
cx.fam.suika.y2005.LS.Generic._Serializer.push ({
  moduleName: /* ??JSANModule?? */ "cx.fam.suika.y2005.LS.SimpleSerializer",
  className: "cx.fam.suika.y2005.LS.SimpleSerializer",
  features: new cx.fam.suika.y2005.DOM.Implementation.Features (
    "http://suika.fam.cx/~wakaba/archive/2004/dom/ls#serializedocumentinstance 1.0"
  )
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
 * The Original Code is manakai code.
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
