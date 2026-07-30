import React, { useState, useEffect, useRef } from 'react';

/**
 * A responsive wrapper that perfectly scales a fixed-dimension A4/Landscape document
 * using React and CSS transform without breaking layout or print/export.
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
      
      const availableWidth = containerRef.current.clientWidth - 16;
      
      if (availableWidth < documentWidth) {
        setScale(availableWidth / documentWidth);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [documentWidth]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Sticky Actions */}
      {actions && (
        <div className="sticky top-0 z-50 flex gap-4 justify-center mb-6 w-full max-w-full bg-white/80 backdrop-blur p-4 rounded-b-xl border-b border-gray-200">
          {actions}
        </div>
      )}

      {/* Responsive Scaling Container */}
      <div 
        ref={containerRef}
        className="w-full flex justify-center print:block print:w-auto"
      >
        {/* Bounding box to prevent overflow */}
        <div 
          className="relative overflow-hidden print:overflow-visible transition-all duration-200 ease-out"
          style={{ 
            width: scale === 1 ? documentWidth : documentWidth * scale, 
            height: scale === 1 ? documentHeight : documentHeight * scale 
          }}
        >
          {/* Scaled Inner Element */}
          <div 
            className="origin-top-left absolute top-0 left-0 print:!transform-none"
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
