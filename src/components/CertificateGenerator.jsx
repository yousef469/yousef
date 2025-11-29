import { useRef } from 'react';
import { Download, Award, CheckCircle, Twitter, Facebook, Linkedin } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificateGenerator({ 
  userName, 
  courseName, 
  completionDate, 
  certificateId,
  totalLessons,
  score 
}) {
  const certificateRef = useRef(null);

  const downloadPDF = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${courseName.replace(/\s+/g, '_')}_Certificate.pdf`);
  };

  const downloadImage = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff'
    });
    
    const link = document.createElement('a');
    link.download = `${courseName.replace(/\s+/g, '_')}_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="bg-white text-gray-900 p-12 rounded-lg shadow-2xl"
        style={{ width: '1000px', height: '700px' }}
      >
        {/* Border */}
        <div className="border-8 border-double border-cyan-600 h-full p-8 relative">
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-cyan-500" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-cyan-500" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-cyan-500" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-cyan-500" />

          <div className="flex flex-col items-center justify-center h-full text-center">
            {/* Logo/Icon */}
            <Award className="w-24 h-24 text-cyan-600 mb-6" />

            {/* Title */}
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Certificate of Completion
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8">
              This certifies that
            </p>

            {/* Student Name */}
            <h2 className="text-4xl font-bold text-cyan-700 mb-8 border-b-2 border-gray-300 pb-2 px-12">
              {userName}
            </h2>

            {/* Achievement Text */}
            <p className="text-xl text-gray-600 mb-4">
              has successfully completed
            </p>

            {/* Course Name */}
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              {courseName}
            </h3>

            {/* Details */}
            <div className="flex items-center gap-8 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>{totalLessons} Lessons Completed</span>
              </div>
              {score && (
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>Score: {score}%</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end w-full mt-auto pt-8">
              <div className="text-left">
                <p className="text-sm text-gray-500 mb-1">Issue Date</p>
                <p className="text-lg font-semibold text-gray-700">{completionDate}</p>
              </div>

              <div className="text-center">
                <div className="w-48 border-t-2 border-gray-400 mb-2" />
                <p className="text-sm text-gray-600 font-semibold">Engineerium Platform</p>
                <p className="text-xs text-gray-500">Engineering Education</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
                <p className="text-xs font-mono text-gray-600">{certificateId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
        <button
          onClick={downloadImage}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
        >
          <Download className="w-5 h-5" />
          Download Image
        </button>
      </div>

      {/* Social Share Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => {
            const text = `🎓 I just earned my ${courseName} certificate on Engineerium! ${totalLessons} lessons completed. #Engineering #Learning`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`, '_blank');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-medium transition-colors"
        >
          <Twitter className="w-5 h-5" />
          Share on Twitter
        </button>
        <button
          onClick={() => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(`I just earned my ${courseName} certificate on Engineerium!`)}`, '_blank');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg font-medium transition-colors"
        >
          <Facebook className="w-5 h-5" />
          Share on Facebook
        </button>
        <button
          onClick={() => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, '_blank');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg font-medium transition-colors"
        >
          <Linkedin className="w-5 h-5" />
          Share on LinkedIn
        </button>
      </div>

      {/* Share Info */}
      <div className="text-center text-gray-400 text-sm">
        <p>Share your achievement and inspire others!</p>
        <p className="text-xs mt-1">Certificate ID: {certificateId} • Verify at engineerium.com/verify</p>
      </div>
    </div>
  );
}
