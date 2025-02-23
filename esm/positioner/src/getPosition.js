import { Position } from '../../constants';
/**
 * Function to create a Rect.
 * @param {Object} dimensions
 * @param {Number} dimensions.width
 * @param {Number} dimensions.height
 * @param {Object} position
 * @param {Number} position.left
 * @param {Number} position.top
 * @return {Object} Rect { width, height, left, top, right, bottom }
 */

var makeRect = function makeRect(_ref, _ref2) {
  var height = _ref.height,
      width = _ref.width;
  var left = _ref2.left,
      top = _ref2.top;
  var ceiledLeft = Math.ceil(left);
  var ceiledTop = Math.ceil(top);
  return {
    width: width,
    height: height,
    left: ceiledLeft,
    top: ceiledTop,
    right: ceiledLeft + width,
    bottom: ceiledTop + height
  };
};
/**
 * Function to flip a position upside down.
 * @param {Position} position
 * @return {Position} flipped position
 */


var flipHorizontal = function flipHorizontal(position) {
  switch (position) {
    case Position.TOP_LEFT:
      return Position.BOTTOM_LEFT;

    case Position.TOP:
    default:
      return Position.BOTTOM;

    case Position.TOP_RIGHT:
      return Position.BOTTOM_RIGHT;

    case Position.BOTTOM_LEFT:
      return Position.TOP_LEFT;

    case Position.BOTTOM:
      return Position.TOP;

    case Position.BOTTOM_RIGHT:
      return Position.TOP_RIGHT;
  }
};
/**
 * Function that returns if position is aligned on top.
 * @param {Position} position
 * @return {Boolean}
 */


var isAlignedOnTop = function isAlignedOnTop(position) {
  switch (position) {
    case Position.TOP_LEFT:
    case Position.TOP:
    case Position.TOP_RIGHT:
      return true;

    default:
      return false;
  }
};
/**
 * Function that returns if position is aligned left or right.
 * @param {Position} position
 * @return {Boolean}
 */


var isAlignedHorizontal = function isAlignedHorizontal(position) {
  switch (position) {
    case Position.LEFT:
    case Position.RIGHT:
      return true;

    default:
      return false;
  }
};
/**
 * Function that returns if a rect fits on bottom.
 * @param {Rect} rect
 * @param {Object} viewport
 * @param {Number} viewportOffset
 * @return {Boolean}
 */


var getFitsOnBottom = function getFitsOnBottom(rect, viewport, viewportOffset) {
  return rect.bottom < viewport.height - viewportOffset;
};
/**
 * Function that returns if a rect fits on top.
 * @param {Rect} rect
 * @param {Number} viewportOffset
 * @return {Boolean}
 */


var getFitsOnTop = function getFitsOnTop(rect, viewportOffset) {
  return rect.top > viewportOffset;
};
/**
 * Function that returns if a rect fits on right.
 * @param {Rect} rect
 * @param {Object} viewport
 * @param {Number} viewportOffset
 * @return {Boolean}
 */


var getFitsOnRight = function getFitsOnRight(rect, viewport, viewportOffset) {
  return rect.right < viewport.width - viewportOffset;
};
/**
 * Function that returns if a rect fits on left.
 * @param {Rect} rect
 * @param {Number} viewportOffset
 * @return {Boolean}
 */


var getFitsOnLeft = function getFitsOnLeft(rect, viewportOffset) {
  return rect.left > viewportOffset;
};
/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
 * Function that returns the CSS `tranform-origin` property.
 * @param {Rect} rect
 * @param {Position} position
 * @param {Object} dimensions — the dimensions of the positioner.
 * @param {Number} targetCenter - center of the target.
 * @return {String} transform origin
 */


var getTransformOrigin = function getTransformOrigin(_ref3) {
  var dimensions = _ref3.dimensions,
      position = _ref3.position,
      rect = _ref3.rect,
      targetCenter = _ref3.targetCenter;
  var centerY = Math.round(targetCenter - rect.top);

  if (position === Position.LEFT) {
    /* Syntax: x-offset | y-offset */
    return "".concat(dimensions.width, "px ").concat(centerY, "px");
  }

  if (position === Position.RIGHT) {
    /* Syntax: x-offset | y-offset */
    return "0px ".concat(centerY, "px");
  }

  var centerX = Math.round(targetCenter - rect.left);

  if (isAlignedOnTop(position)) {
    /* Syntax: x-offset | y-offset */
    return "".concat(centerX, "px ").concat(dimensions.height, "px ");
  }
  /* Syntax: x-offset | y-offset */


  return "".concat(centerX, "px 0px ");
};
/**
 * Function that takes in numbers and position and gives the final coords.
 * @param {Object} input
 * @param {Position} input.position — the position the positioner should be on.
 * @param {Object} input.dimensions — the dimensions of the positioner.
 * @param {Object} input.targetRect — the rect of the target.
 * @param {Number} input.targetOffset - offset from the target.
 * @param {Object} input.viewport - the width and height of the viewport.
 * @param {Number} input.viewportOffset - offset from the viewport.
 * @return {Object} - { rect: Rect, position: Position, transformOrigin: string }
 */


export default function getFittedPosition(_ref4) {
  var dimensions = _ref4.dimensions,
      position = _ref4.position,
      targetOffset = _ref4.targetOffset,
      targetRect = _ref4.targetRect,
      viewport = _ref4.viewport,
      _ref4$viewportOffset = _ref4.viewportOffset,
      viewportOffset = _ref4$viewportOffset === void 0 ? 8 : _ref4$viewportOffset;

  var _getPosition = getPosition({
    position: position,
    dimensions: dimensions,
    targetRect: targetRect,
    targetOffset: targetOffset,
    viewport: viewport,
    viewportOffset: viewportOffset
  }),
      finalPosition = _getPosition.position,
      rect = _getPosition.rect; // Push rect to the right if overflowing on the left side of the viewport.


  if (rect.left < viewportOffset) {
    rect.right += Math.ceil(Math.abs(rect.left - viewportOffset));
    rect.left = Math.ceil(viewportOffset);
  } // Push rect to the left if overflowing on the right side of the viewport.


  if (rect.right > viewport.width - viewportOffset) {
    var delta = Math.ceil(rect.right - (viewport.width - viewportOffset));
    rect.left -= delta;
    rect.right -= delta;
  } // Push rect down if overflowing on the top side of the viewport.


  if (rect.top < viewportOffset) {
    rect.top += Math.ceil(Math.abs(rect.top - viewportOffset));
    rect.bottom = Math.ceil(viewportOffset);
  } // Push rect up if overflowing on the bottom side of the viewport.


  if (rect.bottom > viewport.height - viewportOffset) {
    var _delta = Math.ceil(rect.bottom - (viewport.height - viewportOffset));

    rect.top -= _delta;
    rect.bottom -= _delta;
  }

  var targetCenter = isAlignedHorizontal(position) ? targetRect.top + targetRect.height / 2 : targetRect.left + targetRect.width / 2;
  var transformOrigin = getTransformOrigin({
    rect: rect,
    position: finalPosition,
    dimensions: dimensions,
    targetCenter: targetCenter
  });
  return {
    rect: rect,
    position: finalPosition,
    transformOrigin: transformOrigin
  };
}
/**
 * Function that takes in numbers and position and gives the final coords.
 * @param {Position} position — the position the positioner should be on.
 * @param {Object} dimensions — the dimensions of the positioner.
 * @param {Rect} targetRect — the rect of the target.
 * @param {Number} targetOffset - offset from the target.
 * @param {Object} viewport - the width and height of the viewport.
 * @param {Object} viewportOffset - offset from the viewport.
 * @return {Object} - { rect: Rect, position: Position }
 */

function getPosition(_ref5) {
  var dimensions = _ref5.dimensions,
      position = _ref5.position,
      targetOffset = _ref5.targetOffset,
      targetRect = _ref5.targetRect,
      viewport = _ref5.viewport,
      _ref5$viewportOffset = _ref5.viewportOffset,
      viewportOffset = _ref5$viewportOffset === void 0 ? 8 : _ref5$viewportOffset;
  var isHorizontal = isAlignedHorizontal(position); // Handle left and right positions

  if (isHorizontal) {
    var leftRect = getRect({
      position: Position.LEFT,
      dimensions: dimensions,
      targetRect: targetRect,
      targetOffset: targetOffset
    });
    var rightRect = getRect({
      position: Position.RIGHT,
      dimensions: dimensions,
      targetRect: targetRect,
      targetOffset: targetOffset
    });
    var fitsOnLeft = getFitsOnLeft(leftRect, viewportOffset);
    var fitsOnRight = getFitsOnRight(rightRect, viewport, viewportOffset);

    if (position === Position.LEFT) {
      if (fitsOnLeft) {
        return {
          position: position,
          rect: leftRect
        };
      }

      if (fitsOnRight) {
        return {
          position: Position.RIGHT,
          rect: rightRect
        };
      }
    }

    if (position === Position.RIGHT) {
      if (fitsOnRight) {
        return {
          position: position,
          rect: rightRect
        };
      }

      if (fitsOnLeft) {
        return {
          position: Position.LEFT,
          rect: leftRect
        };
      }
    } // Default to using the position with the most space


    var spaceRight = Math.abs(viewport.width - viewportOffset - rightRect.right);
    var spaceLeft = Math.abs(leftRect.left - viewportOffset);

    if (spaceRight < spaceLeft) {
      return {
        position: Position.RIGHT,
        rect: rightRect
      };
    }

    return {
      position: Position.LEFT,
      rect: leftRect
    };
  }

  var positionIsAlignedOnTop = isAlignedOnTop(position);
  var topRect;
  var bottomRect;

  if (positionIsAlignedOnTop) {
    topRect = getRect({
      position: position,
      dimensions: dimensions,
      targetRect: targetRect,
      targetOffset: targetOffset
    });
    bottomRect = getRect({
      position: flipHorizontal(position),
      dimensions: dimensions,
      targetRect: targetRect,
      targetOffset: targetOffset
    });
  } else {
    topRect = getRect({
      position: flipHorizontal(position),
      dimensions: dimensions,
      targetRect: targetRect,
      targetOffset: targetOffset
    });
    bottomRect = getRect({
      position: position,
      dimensions: dimensions,
      targetRect: targetRect,
      targetOffset: targetOffset
    });
  }

  var topRectFitsOnTop = getFitsOnTop(topRect, viewportOffset);
  var bottomRectFitsOnBottom = getFitsOnBottom(bottomRect, viewport, viewportOffset);

  if (positionIsAlignedOnTop) {
    if (topRectFitsOnTop) {
      return {
        position: position,
        rect: topRect
      };
    }

    if (bottomRectFitsOnBottom) {
      return {
        position: flipHorizontal(position),
        rect: bottomRect
      };
    }
  }

  if (!positionIsAlignedOnTop) {
    if (bottomRectFitsOnBottom) {
      return {
        position: position,
        rect: bottomRect
      };
    }

    if (topRectFitsOnTop) {
      return {
        position: flipHorizontal(position),
        rect: topRect
      };
    }
  } // Default to most spacious if there is no fit.


  var spaceBottom = Math.abs(viewport.height - viewportOffset - bottomRect.bottom);
  var spaceTop = Math.abs(topRect.top - viewportOffset);

  if (spaceBottom < spaceTop) {
    return {
      position: positionIsAlignedOnTop ? flipHorizontal(position) : position,
      rect: bottomRect
    };
  }

  return {
    position: positionIsAlignedOnTop ? position : flipHorizontal(position),
    rect: topRect
  };
}
/**
 * Function that takes in numbers and position and gives the final coords.
 * @param {Position} position
 * @param {Number} targetOffset - offset from the target.
 * @param {Object} dimensions — the dimensions of the positioner.
 * @param {Rect} targetRect — the rect of the target.
 * @return {Rect} - Rect { width, height, left, top, right, bottom }
 */


function getRect(_ref6) {
  var dimensions = _ref6.dimensions,
      position = _ref6.position,
      targetOffset = _ref6.targetOffset,
      targetRect = _ref6.targetRect;
  var leftRect = targetRect.left + targetRect.width / 2 - dimensions.width / 2;
  var alignedTopY = targetRect.top - dimensions.height - targetOffset;
  var alignedBottomY = targetRect.bottom + targetOffset;
  var alignedRightX = targetRect.right - dimensions.width;
  var alignedLeftRightY = targetRect.top + targetRect.height / 2 - dimensions.height / 2;

  switch (position) {
    case Position.LEFT:
      return makeRect(dimensions, {
        left: targetRect.left - dimensions.width - targetOffset,
        top: alignedLeftRightY
      });

    case Position.RIGHT:
      return makeRect(dimensions, {
        left: targetRect.right + targetOffset,
        top: alignedLeftRightY
      });

    case Position.TOP:
      return makeRect(dimensions, {
        left: leftRect,
        top: alignedTopY
      });

    case Position.TOP_LEFT:
      return makeRect(dimensions, {
        left: targetRect.left,
        top: alignedTopY
      });

    case Position.TOP_RIGHT:
      return makeRect(dimensions, {
        left: alignedRightX,
        top: alignedTopY
      });

    default:
    case Position.BOTTOM:
      return makeRect(dimensions, {
        left: leftRect,
        top: alignedBottomY
      });

    case Position.BOTTOM_LEFT:
      return makeRect(dimensions, {
        left: targetRect.left,
        top: alignedBottomY
      });

    case Position.BOTTOM_RIGHT:
      return makeRect(dimensions, {
        left: alignedRightX,
        top: alignedBottomY
      });
  }
}