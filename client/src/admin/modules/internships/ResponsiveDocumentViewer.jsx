import React, { useState, useEffect, useRef } from 'react';
import './ResponsiveDocumentViewer.css';

/**
 * A responsive wrapper that perfectly scales a fixed-dimension A4/Landscape document
 * using React and CSS transform without breaking layout or print/export.
 * Fully styled in Vanilla CSS to ensure compatibility outside Tailwind layouts.
 */
export default function ResponsiveDocumentViewer({ 
  children, 
  documentWidth, 
  documentHeight,
  actions
}) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      // Calculate available width inside the modal scroll area.
      // Subtract 16px to ensure a small safe margin on mobile screens.
      const availableWidth = containerRef.current.clientWidth - 16;
      
      if (availableWidth < documentWidth) {
        setScale(availableWidth / documentWidth);
      } else {
        setScale(1);
      }
    };

    // Run initially and set a small timeout to handle rendering lag inside modals
    updateScale();
    const timer = setTimeout(updateScale, 100);

    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
    };
  }, [documentWidth]);

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
            height: scale === 1 ? documentHeight : documentHeight * scale 
          }}
        >
          {/* Scaled Inner Element */}
          <div 
            className="rdv-scaled-inner"
            style={{ 
              transform: scale === 1 ? 'none' : `scale(${scale})`,
              width: documentWidth,
              height: documentHeight
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
