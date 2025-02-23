import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { StackingOrder, Position } from '../../constants';
import { useMergedRef, usePrevious } from '../../hooks';
import { Portal } from '../../portal';
import { Stack } from '../../stack';
import getPosition from './getPosition';
var animationEasing = {
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
};

var getCSS = function getCSS(_ref) {
  var animationDuration = _ref.animationDuration,
      initialScale = _ref.initialScale;
  return {
    position: 'fixed',
    transitionTimingFunction: animationEasing.spring,
    transitionDuration: "".concat(animationDuration, "ms"),
    transitionProperty: 'opacity, transform',
    transform: "scale(".concat(initialScale, ") translateY(-1px)"),
    selectors: {
      '&[data-state="entering"],&[data-state="entered"]': {
        opacity: 1,
        visibility: 'visible',
        transform: 'scale(1)'
      },
      '&[data-state="exiting"],&[data-state="exited"]': {
        opacity: 0,
        transform: 'scale(1)'
      }
    }
  };
};

var noop = function noop() {};

var initialDimensions = {
  left: 0,
  top: 0,
  height: 0,
  width: 0,
  transformOrigin: null
};
var Positioner = /*#__PURE__*/memo(function Positioner(props) {
  var target = props.target,
      isShown = props.isShown,
      children = props.children,
      _props$initialScale = props.initialScale,
      initialScale = _props$initialScale === void 0 ? 0.9 : _props$initialScale,
      _props$animationDurat = props.animationDuration,
      animationDuration = _props$animationDurat === void 0 ? 300 : _props$animationDurat,
      _props$position = props.position,
      position = _props$position === void 0 ? Position.BOTTOM : _props$position,
      _props$bodyOffset = props.bodyOffset,
      bodyOffset = _props$bodyOffset === void 0 ? 6 : _props$bodyOffset,
      _props$targetOffset = props.targetOffset,
      targetOffset = _props$targetOffset === void 0 ? 6 : _props$targetOffset,
      _props$onOpenComplete = props.onOpenComplete,
      onOpenComplete = _props$onOpenComplete === void 0 ? noop : _props$onOpenComplete,
      _props$onCloseComplet = props.onCloseComplete,
      onCloseComplete = _props$onCloseComplet === void 0 ? noop : _props$onCloseComplet;

  var _useState = useState(initialDimensions),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];

  var previousDimensions = usePrevious(dimensions, initialDimensions);
  var latestAnimationFrame = useRef();
  var transitionState = useRef();
  var positionerRef = useRef();
  var targetRef = useRef();
  var setTargetRef = useMergedRef(targetRef);
  var getRef = useMergedRef(positionerRef);
  var update = useCallback(function () {
    var prevHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var prevWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!isShown || !targetRef.current || !positionerRef.current) return;
    var targetRect = targetRef.current.getBoundingClientRect();
    var hasEntered = positionerRef.current.getAttribute('data-state') === 'entered';
    var viewportHeight = document.documentElement.clientHeight;
    var viewportWidth = document.documentElement.clientWidth;
    var height;
    var width;

    if (hasEntered) {
      // Only when the animation is done should we opt-in to `getBoundingClientRect`
      var positionerRect = positionerRef.current.getBoundingClientRect(); // https://github.com/segmentio/evergreen/issues/255
      // We need to ceil the width and height to prevent jitter when
      // the window is zoomed (when `window.devicePixelRatio` is not an integer)

      height = Math.round(positionerRect.height);
      width = Math.round(positionerRect.width);
    } else {
      // When the animation is in flight use `offsetWidth/Height` which
      // does not calculate the `transform` property as part of its result.
      // There is still change on jitter during the animation (although unoticable)
      // When the browser is zoomed in — we fix this with `Math.max`.
      height = Math.max(positionerRef.current.offsetHeight, prevHeight);
      width = Math.max(positionerRef.current.offsetWidth, prevWidth);
    }

    var _getPosition = getPosition({
      position: position,
      targetRect: targetRect,
      targetOffset: targetOffset,
      dimensions: {
        height: height,
        width: width
      },
      viewport: {
        width: viewportWidth,
        height: viewportHeight
      },
      viewportOffset: bodyOffset
    }),
        rect = _getPosition.rect,
        transformOrigin = _getPosition.transformOrigin;

    setDimensions({
      left: rect.left,
      top: rect.top,
      height: height,
      width: width,
      transformOrigin: transformOrigin
    });
  }, [bodyOffset, isShown, position, targetOffset]); // Call `update` whenever the component has "entered" and dimensions change
  // additionally, when there are dynamic children

  useEffect(function () {
    if (transitionState.current === 'entered') {
      latestAnimationFrame.current = requestAnimationFrame(function () {
        update(previousDimensions.height, previousDimensions.width);
      });
    }

    return function () {
      if (latestAnimationFrame.current) {
        cancelAnimationFrame(latestAnimationFrame.current);
      }
    };
  }, [previousDimensions.height, previousDimensions.width, update, children]);

  var handleEntering = function handleEntering() {
    transitionState.current = 'entering';
    update();
  };

  var handleEnter = function handleEnter() {
    transitionState.current = 'entered';
    update();
  };

  var handleExited = function handleExited() {
    transitionState.current = 'exited';
    setDimensions(initialDimensions);
    onCloseComplete();
  };

  useEffect(function () {
    var handleResizeOrScroll = function handleResizeOrScroll() {
      return update();
    };

    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll);
    return function () {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  });
  return /*#__PURE__*/React.createElement(Stack, {
    value: StackingOrder.POSITIONER
  }, function (zIndex) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, target({
      getRef: setTargetRef,
      isShown: isShown
    }), /*#__PURE__*/React.createElement(Transition, {
      nodeRef: positionerRef,
      appear: true,
      "in": isShown,
      timeout: animationDuration,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: onOpenComplete,
      onExited: handleExited,
      unmountOnExit: true
    }, function (state) {
      return /*#__PURE__*/React.createElement(Portal, null, children({
        top: dimensions.top,
        left: dimensions.left,
        state: state,
        zIndex: zIndex,
        css: getCSS({
          initialScale: initialScale,
          animationDuration: animationDuration
        }),
        style: {
          transformOrigin: dimensions.transformOrigin,
          left: dimensions.left,
          top: dimensions.top,
          zIndex: zIndex
        },
        getRef: getRef,
        animationDuration: animationDuration
      }));
    }));
  });
});
Positioner.propTypes = {
  /**
   * The position the element that is being positioned is on.
   * Smart positioning might override this.
   */
  position: PropTypes.oneOf([Position.TOP, Position.TOP_LEFT, Position.TOP_RIGHT, Position.BOTTOM, Position.BOTTOM_LEFT, Position.BOTTOM_RIGHT, Position.LEFT, Position.RIGHT]),

  /**
   * When true, show the element being positioned.
   */
  isShown: PropTypes.bool,

  /**
   * Function that returns the element being positioned.
   */
  children: PropTypes.func.isRequired,

  /**
   * The minimum distance from the body to the element being positioned.
   */
  bodyOffset: PropTypes.number,

  /**
   * The minimum distance from the target to the element being positioned.
   */
  targetOffset: PropTypes.number,

  /**
   * Function that should return a node for the target.
   * ({ getRef: () -> Ref, isShown: Bool }) -> React Node
   */
  target: PropTypes.func.isRequired,

  /**
   * Initial scale of the element being positioned.
   */
  initialScale: PropTypes.number,

  /**
   * Duration of the animation.
   */
  animationDuration: PropTypes.number,

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete: PropTypes.func,

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete: PropTypes.func
};
export default Positioner;