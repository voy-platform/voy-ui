import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo, forwardRef } from 'react';
import Icon from '../src/Icon';
var svgPaths16 = ['M11 2H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V7l-5-5zm3 10H2V4h8v2H3v1h7v1h4v4zm-3-5V4l3 3h-3zm-8 3h10V9H3v1z'];
var svgPaths20 = ['M3 12h14v-1H3v1zm11-9H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V9l-6-6zm4 12H2V5h11v3H3v1h10v1h5v5zm-4-6V5l4 4h-4z'];
export var LabelIcon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function LabelIcon(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    svgPaths16: svgPaths16,
    svgPaths20: svgPaths20,
    ref: ref,
    name: "label"
  }, props));
}));