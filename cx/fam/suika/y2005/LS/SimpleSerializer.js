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

cx.fam.suika.y2005.LS.SimpleSerializer = function () {
};

cx.fam.suika.y2005.LS.SimpleSerializer.prototype.writeToString = function (nodeArg) {
  var isHTMLDocument = false;
  var od = nodeArg.getOwnerDocument ();
  if (!od) od = nodeArg;
  var rootElement = od.getDocumentElement ();
  if (rootElement &&
      !rootElement.getLocalName () &&
      !rootElement.getNamespaceURI () &&
      rootElement.getNodeName () == 'HTML') {
    isHTMLDocument = true;
  }
  var srcs = [nodeArg];
  var nsbind = [{xml: 'http://www.w3.org/XML/1998/namespace',
                 xmlns: 'http://suika.fam.cx/~wakaba/-temp/2003/09/27/undef'}];
  nsbind[0][''] = '';
  var xescape = function (s) {
    return s.replace (/&/g, '&amp;')
            .replace (/</g, '&lt;')
            .replace (/>/g, '&gt;')
            .replace (/"/g, '&quot;');
  };
  var copynsbind = function (nsbind) {
    var newbind = {};
    for (var ns in nsbind) {
      newbind[ns] = nsbind[ns];
    }
    return newbind;
  };
  var copychildren = function (pNode) {
    var children = pNode.getChildNodes ();
    var childrenLength = children.getLength ();
    var snapshot = [];
    for (var i = 0; i < childrenLength; i++) {
      snapshot.push (children.item (i));
    }
    return snapshot;
  };
  var copychildrento = function (pNode, ary) {
    var children = pNode.getChildNodes ();
    var childrenLength = children.getLength ();
    for (var i = 0; i < childrenLength; i++) {
      ary.push (children.item (i));
    }
    return ary;
  };
  var r = '';
  while (true) {
    var src = srcs.shift ();
    if (src == null) break;
    if (src instanceof Array) {
      nsbind.pop ();  // End tag
    } else if (typeof (src) == 'string' || src instanceof String) {
      r += src;
    } else {  // Node
      var nt = src.getNodeType ();
      if (nt == src.ELEMENT_NODE) {
        var csrc = [];
        var etag;
        var ns = copynsbind (nsbind[nsbind.length - 1]);
        nsbind.push (ns);
        var attrr = {};
        
        var defpfx = {};
        var ansao = {};
        var nodeAttrs = src.getAttributes ();
        var nodeAttrsLength = nodeAttrs.getLength ();
        var sns = src.getNamespaceURI ();
        var spfx = src.getPrefix ();
        for (var i = 0; i < nodeAttrsLength; i++) {
          var attr = nodeAttrs.item (i);
          var aln = attr.getLocalName ();
          var ans = attr.getNamespaceURI ();
          if (aln == null) {
            // Non-namespace attribute
            if (attr.getNodeValue ()) {
              if (isHTMLDocument) {
                attrr[attr.getNodeName ().toLowerCase ()] = copychildren (attr);
              } else {
                attrr[attr.getNodeName ()] = copychildren (attr);
              }
            }
          } else if (ans != null && ans == "http://www.w3.org/2000/xmlns/") {
            // Namespace attribute
            var nsuri = attr.getValue ();
            if (aln == 'xmlns') {
              // Default namespace
              ns[''] = nsuri;
              attrr['xmlns'] = copychildren (attr);
            } else {
              // Prefixed namespace
              if (nsuri.length > 0) {
                ns[aln] = nsuri;
              } else {
                ns[aln] = 'http://suika.fam.cx/~wakaba/-temp/2003/09/27/undef';
              }
              attrr['xmlns:' + aln] = copychildren (attr);
            }
          } else if (ans != null) {
            // Global partition attribute
            var pfx = null;
            if (!(defpfx[ans] != null)) defpfx[ans] = null;
            PFX: {
              var apfx = attr.getPrefix ();
              if (apfx) {
                if (ns[apfx]) {
                  if (ns[apfx] == ans) {
                    // The namespace is already defined
                    pfx = apfx;
                    if (!defpfx[ans]) defpfx[ans] = pfx;
                    break PFX;
                  }
                } else {
                  // The namespace prefix is not defined yet
                  pfx = apfx;
                  if (!defpfx[ans]) defpfx[ans] = pfx;
                  ns[pfx] = ans;
                  attrr['xmlns:' + pfx] = [xescape (ans)];
                  break PFX;
                }
              }
              if (defpfx[ans] != null) {
                pfx = defpfx[ans];
                break PFX;
              }
            } // PFX
            if (!ansao[ans]) ansao[ans] = [];
            ansao[ans].push ([pfx, attr]);
          } else {
            // Per-element type partition attribute
            attrr[aln] = copychildren (attr);
          }
        } // Attributes
        
        // Prefix for global attributes
        PFX: for (var ans in defpfx) {
          if (defpfx[ans] != null) continue PFX;
          
          // No prefix available from the attribute nodes
          
          // Available from already defined namespaces?
          P: for (var pfx in ns) {
            if (ns[pfx] != ans) continue P;
            if (pfx.length > 0) {
              defpfx[ans] = pfx;
              continue PFX;
            }
          }
          
          // Available from the element itself?
          if ((sns != null) &&
              (sns == ans) &&
              (spfx != null)) {
            if (ns[spfx] == ans) {
              // The namespace is already defined
              defpfx[ans] = spfx;
              continue PFX;
            } else {
              // The namespace is not defined yet
              defpfx[ans] = spfx;
              ns[defpfx[ans]] = ans;
              attrr['xmlns:' + defpfx[ans]] = [xescape (ans)];
              continue PFX;
            }
          }
          
          // No prefix is defined anywhere
          var i = 1;
          while (ns['ns' + i] != null) {i++}
          defpfx[ans] = 'ns' + i;
          ns[defpfx[ans]] = ans;
          attrr['xmlns:ns' + i] = [xescape (ans)];
        } // PFX
        
        for (var ans in ansao) {
          for (var ansn in ansao[ans]) {
            var pfx = ansao[ans][ansn][0] ? ansao[ans][ansn][0] : defpfx[ans];
            attrr[pfx + ':' + ansao[ans][ansn][1].getLocalName ()]
              = copychildren (ansao[ans][ansn][1]);
          }
        }
        
        // Element type name
        var sln = src.getLocalName ();
        if (sln != null) {
          if (sns != null) {
            if (spfx != null && ns[spfx] != null && ns[spfx] == sns) {
              // Non-null namespace and its prefix is defined
              r += '<' + spfx + ':' + sln;
              etag = '</' + spfx + ':' + sln + '>';
            } else if (spfx != null && ns[spfx] == null) {
              attrr['xmlns:' + spfx] = [xescape (sns)];
              ns[spfx] = sns;
              r += '<' + spfx + ':' + sln;
              etag = '</' + spfx + ':' + sln + '>';
            } else {
              PFX0: {
                // Non-null namespace and its prefix is not defined
                // but is already declared as a namespace attribute
                P0: for (var pfx in ns) {
                  if (ns[pfx] != sns) continue P0;
                  if (pfx.length > 0) {
                    r += '<' + pfx + ':' + sln;
                    etag = '</' + pfx + ':' + sln + '>';
                  } else {
                    r += '<' + sln;
                    etag = '</' + sln + '>';
                  }
                  break PFX0;
                }
              
                // Non-null namespace and its prefix is not defined anywhere
                var i = 1;
                while (ns['ns' + i] != null) i++;
                ns['ns' + i] = sns;
                attrr['xmlns:ns' + i] = [xescape (sns)];
                r += '<ns' + i + ':' + sln;
                etag = '</ns' + i + ':' + sln + '>';
              } // PFX0
            }
          } else {
            // Null-namespace
            if (ns[''] != '') {
              // The default namespace is not the null-namespace
              ns[''] = '';
              attrr['xmlns'] = [''];
            }
            r += '<' + sln;
            etag = '</' + sln + '>';
          }
        } else {
          // Non-namespace node
          if (isHTMLDocument) {
            r += '<' + src.getNodeName ().toLowerCase ();
            etag = '</' + src.getNodeName ().toLowerCase () + '>';
          } else {
            r += '<' + src.getNodeName ();
            etag = '</' + src.getNodeName () + '>';
          }
        }
        
        // The attribute specifications
        for (var an in attrr) {
          csrc.push (' ' + an + '="');
          for (var i = 0; i < attrr[an].length; i++) {
            csrc.push (attrr[an][i]);
          }
          csrc.push ('"');
        }
        
        // The child nodes
        if (src.hasChildNodes ()) {
          csrc.push ('>');
          copychildrento (src, csrc);
          csrc.push (etag, []);
        } else if (this._UseEmptyElemTag[sns] &&
                   this._UseEmptyElemTag[sns][sln ? sln : src.getNodeName ()]) {
          csrc.push (' />');
          nsbind.shift ();
        } else {
          csrc.push ('>' + etag, []);
        }
        for (var i = csrc.length - 1; i >= 0; i--) {
          srcs.unshift (csrc[i]);
        }
        csrc = [];
      } else if (nt == src.TEXT_NODE) {
        r += xescape (src.getData ());
      } else if (nt == src.CDATA_SECTION_NODE) {
        r += '<![CDATA[' + src.getData ().replace (/]]>/g, ']]]]>&gt;<![CDATA[') +
             ']]>';
      } else if (nt == src.PROCESSING_INSTRUCTION_NODE) {
        r += '<?' + src.getTarget ();
        var data = src.getData ();
        if (data != null && data.length > 0) {
          r += ' ' + data.replace (/\?>/g, '?&gt;');
        }
        r += '?>';
      } else if (nt == src.COMMENT_NODE) {
        r += '<!--' + src.getData ().replace (/--/g, '- - ') + '-->';
      } else if (nt == src.DOCUMENT_NODE) {
        var xv = src.getXMLVersion ();
        if (xv && xv != "1.0") {
          r += '<?xml version="' + xv + '"?>\n';
        }
        var children = src.getChildNodes ();
        var childrenLength = children.getLength ();
        for (var i = childrenLength - 1; i >= 0; i--) {
          srcs.unshift ("\n");
          srcs.unshift (children.item (i));
        }
      } else if (nt == src.DOCUMENT_FRAGMENT_NODE) {
        var children = src.getChildNodes ();
        var childrenLength = children.getLength ();
        for (var i = childrenLength - 1; i >= 0; i--) {
          srcs.unshift (children.item (i));
        }
      } // nodeType
    }
  }
  return r;
};
cx.fam.suika.y2005.LS.SimpleSerializer.prototype._UseEmptyElemTag = {};
cx.fam.suika.y2005.LS.SimpleSerializer.prototype._UseEmptyElemTag
['http://www.w3.org/1999/xhtml'] = {
  base: true,
  basefont: true,
  bgsound: true,
  br: true,
  frame: true,
  img: true,
  input: true,
  isindex: true,
  link: true,
  meta: true,
  nextid: true,
  wbr: true
};

/* Revision: $Date: 2005/11/06 14:24:23 $ */

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
 * The Original Code is manakai SimpleXMLSerializer code.
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