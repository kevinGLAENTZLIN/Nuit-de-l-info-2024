import React, { useRef, useEffect } from 'react';

const DrawingCanvas = ({ onImageSave, recognizedText, onValidate }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    isDrawingRef.current = true;
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    isDrawingRef.current = false;
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawingRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const recognizeImage = () => {
    const image = canvasRef.current.toDataURL('image/png');
    if (onImageSave) {
      onImageSave(image);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        style={{ border: '1px solid black', display: 'block', margin: '0 auto' }}
      />
      {recognizedText && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recognized Text:</h3>
          <h4>{recognizedText}</h4>
        </div>
      )}
      <button type='button' onClick={recognizeImage} style={{ marginTop: '20px' }}>Recognize</button>
      <button type='button' onClick={clearCanvas} style={{ marginTop: '10px', marginLeft: '10px' }}>Reset</button>
      <button type='button'
        onClick={onValidate} 
        style={{ marginTop: '10px', marginLeft: '10px' }}
        disabled={recognizedText.trim().length !== 1}
      >
        Validate
      </button>
    </div>
  );
};

export default DrawingCanvas;
