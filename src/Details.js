import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const employee = location.state?.employee;

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const photoUrl = canvas.toDataURL('image/png');
      
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
      setIsCameraEnabled(false);
      
      navigate('/photo-result', { state: { photoUrl } });
    }
  };

  useEffect(() => {
    if (isCameraEnabled) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.error("Error accessing camera:", err);
            setIsCameraEnabled(false);
          });
      }
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraEnabled]);

  const buttonBaseStyles = "px-6 py-2 font-semibold rounded-md text-white transition-colors duration-300";
  const primaryButton = `${buttonBaseStyles} bg-blue-600 hover:bg-blue-700`;
  const secondaryButton = `${buttonBaseStyles} bg-gray-500 hover:bg-gray-600`;

  if (!employee) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">Employee data not found.</p>
        <button onClick={() => navigate('/list')} className={secondaryButton}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 text-center bg-white mt-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Details for {employee.name}</h2>
      <div className="text-left space-y-2 text-gray-700">
        <p><strong>Id Number:</strong> {employee.idNumber}</p>
        <p><strong>Title:</strong> {employee.title}</p>
        <p><strong>City:</strong> {employee.city}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Hire Date:</strong> {employee.hireDate}</p>
      </div>
      
      <div className="mt-8">
        <button onClick={() => setIsCameraEnabled(!isCameraEnabled)} className={primaryButton}>
          {isCameraEnabled ? 'Disable Camera' : 'Capture Photo'}
        </button>
        {isCameraEnabled && (
          <div className="mt-6 border p-4 rounded-lg">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto rounded-md" />
            <canvas ref={canvasRef} className="hidden" />
            <br />
            <button onClick={handleCapturePhoto} className={`${primaryButton} mt-4`}>
              Take Photo
            </button>
          </div>
        )}
      </div>

      <button onClick={() => navigate(-1)} className={`${secondaryButton} mt-8`}>Go Back</button>
    </div>
  );
}

export default Details;