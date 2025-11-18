import React, { useRef, useEffect, useState } from 'react';
import { Pen, Circle, ArrowRight, Type, Eraser, Trash2 } from 'lucide-react';

/**
 * Annotation Canvas Overlay for 3D Presentation Mode
 * Allows host to draw on top of 3D viewer
 */
const AnnotationCanvas = ({
  isHost = false,
  onDraw = null, // Callback when host draws
  receivedDrawings = [], // Drawings from host (for joiners)
  onClear = null // Callback when host clears
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#FF0000');
  const [startPos, setStartPos] = useState(null);
  const drawingPathRef = useRef([]);
  const [localDrawings, setLocalDrawings] = useState([]); // Store host's own drawings

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Draw all annotations (both local for host and received for joiners)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // For host: draw local drawings + received (if any)
    // For joiners: draw only received drawings
    const drawingsToDraw = isHost 
      ? [...localDrawings, ...receivedDrawings]
      : receivedDrawings;

    drawingsToDraw.forEach(drawing => {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (drawing.tool === 'eraser') {
        // Use destination-out for proper erasing
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = drawing.color;
        ctx.lineWidth = 3;
      }

      if (drawing.tool === 'pen' || drawing.tool === 'eraser') {
        ctx.beginPath();
        drawing.points.forEach((point, index) => {
          const x = point.x * canvas.width;
          const y = point.y * canvas.height;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      } else if (drawing.tool === 'arrow') {
        drawArrow(ctx, drawing.points, canvas.width, canvas.height, drawing.color);
      } else if (drawing.tool === 'circle') {
        drawCircle(ctx, drawing.points, canvas.width, canvas.height, drawing.color);
      }
    });
  }, [receivedDrawings, isHost, localDrawings]);

  const drawArrow = (ctx, points, width, height, color) => {
    if (points.length < 2) return;
    const start = { x: points[0].x * width, y: points[0].y * height };
    const end = { x: points[points.length - 1].x * width, y: points[points.length - 1].y * height };

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    // Draw arrowhead
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const headLength = 20;
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(
      end.x - headLength * Math.cos(angle - Math.PI / 6),
      end.y - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      end.x - headLength * Math.cos(angle + Math.PI / 6),
      end.y - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  };

  const drawCircle = (ctx, points, width, height, color) => {
    if (points.length < 2) return;
    const start = { x: points[0].x * width, y: points[0].y * height };
    const end = { x: points[points.length - 1].x * width, y: points[points.length - 1].y * height };
    const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const handleMouseDown = (e) => {
    if (!isHost) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStartPos({ x, y });
    drawingPathRef.current = [{ x, y }];
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !isHost) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    drawingPathRef.current.push({ x, y });

    // Draw locally
    const ctx = canvas.getContext('2d');
    
    if (tool === 'eraser') {
      // Use destination-out composite operation for proper erasing
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'pen' || tool === 'eraser') {
      const prevPoint = drawingPathRef.current[drawingPathRef.current.length - 2];
      ctx.beginPath();
      ctx.moveTo(prevPoint.x * rect.width, prevPoint.y * rect.height);
      ctx.lineTo(x * rect.width, y * rect.height);
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !isHost) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // Draw shape locally first (for host to see it immediately)
    if (drawingPathRef.current.length > 0) {
      ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
      ctx.strokeStyle = tool === 'eraser' ? 'transparent' : color;
      ctx.lineWidth = tool === 'eraser' ? 20 : 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (tool === 'circle' && drawingPathRef.current.length >= 2) {
        const start = { 
          x: drawingPathRef.current[0].x * rect.width, 
          y: drawingPathRef.current[0].y * rect.height 
        };
        const end = { 
          x: drawingPathRef.current[drawingPathRef.current.length - 1].x * rect.width, 
          y: drawingPathRef.current[drawingPathRef.current.length - 1].y * rect.height 
        };
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (tool === 'arrow' && drawingPathRef.current.length >= 2) {
        const start = { 
          x: drawingPathRef.current[0].x * rect.width, 
          y: drawingPathRef.current[0].y * rect.height 
        };
        const end = { 
          x: drawingPathRef.current[drawingPathRef.current.length - 1].x * rect.width, 
          y: drawingPathRef.current[drawingPathRef.current.length - 1].y * rect.height 
        };
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const headLength = 20;
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(
          end.x - headLength * Math.cos(angle - Math.PI / 6),
          end.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          end.x - headLength * Math.cos(angle + Math.PI / 6),
          end.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      }
    }

    // Store drawing locally for host to see it
    if (drawingPathRef.current.length > 0) {
      const drawing = {
        tool,
        color,
        points: drawingPathRef.current
      };
      setLocalDrawings(prev => [...prev, drawing]);
    }

    // Broadcast drawing
    if (onDraw && drawingPathRef.current.length > 0) {
      onDraw({
        tool,
        color,
        points: drawingPathRef.current
      });
    }

    drawingPathRef.current = [];
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setLocalDrawings([]); // Clear local drawings too
    if (onClear) onClear();
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {/* Canvas for drawing */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${isHost ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ cursor: isHost ? 'crosshair' : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Drawing Tools - Host Only */}
      {isHost && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 pointer-events-auto z-50">
          <div className="flex items-center gap-2">
            {/* Tool Selection */}
            <button
              onClick={() => setTool('pen')}
              className={`p-2 rounded transition-all ${
                tool === 'pen' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Pen"
            >
              <Pen className="w-5 h-5" />
            </button>

            <button
              onClick={() => setTool('arrow')}
              className={`p-2 rounded transition-all ${
                tool === 'arrow' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Arrow"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setTool('circle')}
              className={`p-2 rounded transition-all ${
                tool === 'circle' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Circle"
            >
              <Circle className="w-5 h-5" />
            </button>

            <button
              onClick={() => setTool('eraser')}
              className={`p-2 rounded transition-all ${
                tool === 'eraser' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Eraser"
            >
              <Eraser className="w-5 h-5" />
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-600 mx-1"></div>

            {/* Color Picker */}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
              title="Color"
            />

            {/* Divider */}
            <div className="w-px h-8 bg-gray-600 mx-1"></div>

            {/* Clear Button */}
            <button
              onClick={clearCanvas}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all"
              title="Clear All"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnotationCanvas;
