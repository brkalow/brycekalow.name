import * as React from "react";

export function useLinkHighlight() {
  const [hoveredLink, setHoveredLink] = React.useState(null);

  const highlightRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLUListElement>(null);

  const isHoveredFromNull = React.useRef<boolean>(false);
  const wrapperBoundingBox = React.useRef<DOMRect | undefined>(undefined);
  const tabBoundingBox = React.useRef<DOMRect | undefined>(undefined);

  const highlightStyles = {} as React.CSSProperties;

  const resetHighlight = () => setHoveredLink(null);

  const moveHighlight = (event, href) => {
    tabBoundingBox.current = event.target.getBoundingClientRect();
    wrapperBoundingBox.current = wrapperRef.current!.getBoundingClientRect();
    isHoveredFromNull.current = !hoveredLink;
    setHoveredLink(href);
  };

  if (tabBoundingBox.current && wrapperBoundingBox.current) {
    highlightStyles.transitionDuration = isHoveredFromNull.current
      ? "0ms"
      : "150ms";
    highlightStyles.opacity = hoveredLink ? 1 : 0;
    highlightStyles.width = `${tabBoundingBox.current.width}px`;
    highlightStyles.transform = `translate(${
      tabBoundingBox.current.left - wrapperBoundingBox.current.left
    }px) translateY(-2px)`;
  }

  return {
    refs: {
      highlightRef,
      wrapperRef,
    },
    moveHighlight,
    resetHighlight,
    highlightStyles,
  };
}
