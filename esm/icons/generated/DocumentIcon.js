import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M9 0H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V5L9 0zm3 14H4V2h4v4h4v8z'];
var svgPaths20 = ['M11.98 0h-8c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h13c.55 0 1-.45 1-1V6l-6-6zm4 18h-11V2h6v5h5v11z'];
export var DocumentIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function DocumentIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "document"
  }, props));
}));