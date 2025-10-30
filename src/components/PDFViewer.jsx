import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react';

// Set up PDF.js worker - use unpkg CDN which is more reliable
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFViewer({ book, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  // Disable right-click to prevent "Save as"
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onContextMenu={handleContextMenu}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-bold text-lg text-white">{book.name}</h3>
            <p className="text-sm text-gray-400">{book.author}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-400 px-2">{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-gray-700 mx-2" />
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-400 px-2">
            {pageNumber} / {numPages || '...'}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-gray-700 mx-2" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gray-800 flex items-center justify-center p-4">
        <div 
          className="select-none"
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          <Document
            file={book.url || `/books/${encodeURIComponent(book.file)}`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="text-white text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p>Loading PDF...</p>
              </div>
            }
            error={
              <div className="text-red-400 text-center py-20 px-8">
                <p className="text-xl mb-2">Failed to load PDF</p>
                <p className="text-sm mb-4">The book file could not be found or loaded.</p>
                <p className="text-xs text-gray-400">
                  This may be due to file size limitations. Try downloading the book instead, or contact support if the issue persists.
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-2xl"
            />
          </Document>
        </div>
      </div>

      {/* Watermark overlay to prevent screenshots */}
      <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center opacity-5">
        <div className="text-white text-6xl font-bold transform rotate-45">
          ENGINEERIUM
        </div>
      </div>
    </div>
  );
}
