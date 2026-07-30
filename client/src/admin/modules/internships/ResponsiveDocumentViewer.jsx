import React, { useState, useEffect, useRef } from 'react';
import './ResponsiveDocumentViewer.css';

/**
 * A responsive wrapper that perfectly scales a fixed-dimension A4/Landscape document
 * using React and CSS transform without breaking layout or print/export.
 * Dynamically measures the unscaled content height to support multi-page or variable height layouts.
 */
export default function ResponsiveDocumentViewer({ 
  children, 
  documentWidth, 
  documentHeight = 566, // fallback default
  actions
}) {
  const [scale, setScale] = useState(1);
  const [measuredHeight, setMeasuredHeight] = useState(documentHeight);
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !innerRef.current) return;
      
      const availableWidth = containerRef.current.clientWidth - 16;
      
      let newScale = 1;
      if (availableWidth < documentWidth) {
        newScale = availableWidth / documentWidth;
      }
      setScale(newScale);
      
      // Measure actual unscaled content height dynamically.
      // This ensures multi-page reports or weekly assessment tables are never cut off.
      const actualHeight = innerRef.current.scrollHeight;
      if (actualHeight > 0) {
        setMeasuredHeight(actualHeight);
      }
    };

    updateScale();
    // Extra timeouts to ensure styles and fonts are fully loaded before measuring height
    const timer1 = setTimeout(updateScale, 100);
    const timer2 = setTimeout(updateScale, 500);

    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', updateScale);
    };
  }, [documentWidth, children]);

  return (
    <div className="rdv-viewer-container">
      {/* Sticky Actions */}
      {actions && (
        <div className="rdv-actions-wrapper">
          {actions}
        </div>
      )}

      {/* Responsive Scaling Container */}
      <div ref={containerRef} className="rdv-scale-container">
        {/* Bounding box to prevent overflow */}
        <div 
          className="rdv-bounding-box"
          style={{ 
            width: scale === 1 ? documentWidth : documentWidth * scale, 
            height: scale === 1 ? measuredHeight : measuredHeight * scale 
          }}
        >
          {/* Scaled Inner Element */}
          <div 
            ref={innerRef}
            className="rdv-scaled-inner"
            style={{ 
              transform: scale === 1 ? 'none' : `scale(${scale})`,
              width: documentWidth,
              height: measuredHeight
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
