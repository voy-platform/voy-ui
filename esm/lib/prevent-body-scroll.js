var previousOverflow = [];
var previousPaddingRight = [];
/**
 * Toggle the body scroll / overflow and additional styling
 * necessary to preserve scroll position and body width (scrollbar replacement)
 *
 * @param {boolean} preventScroll - whether or not to prevent body scrolling
 */

export default function preventBodyScroll(preventScroll) {
  /** Get the width before toggling the style so we can calculate the scrollbar width for a smooth, jankless style change */
  var _document$body$getBou = document.body.getBoundingClientRect(),
      width = _document$body$getBou.width;
  /** Apply or remove overflow style */


  if (preventScroll) {
    previousOverflow.push(document.body.style.overflow);
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = previousOverflow.pop() || '';
  }
  /** Get the _new width_ of the body (this will tell us the scrollbar width) */


  var newWidth = document.body.getBoundingClientRect().width;
  var scrollBarWidth = newWidth - width;
  /** If there's a diff due to scrollbars, then account for it with padding */

  if (preventScroll) {
    previousPaddingRight.push(document.body.style.paddingRight);
    document.body.style.paddingRight = Math.max(0, scrollBarWidth || 0) + 'px';
  } else {
    document.body.style.paddingRight = previousPaddingRight.pop() || '';
  }
}