import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const generateEmail = (name) => {
  if (!name) return 'n/a';
  return name.toLowerCase().replace(/\s+/g, '.') + '@example.com';
};

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
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
    const videoElement = videoRef.current;
    if (isCameraEnabled) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          setIsCameraEnabled(false);
          alert("Could not access the camera. Please ensure you have given permission.");
        });
    }
    return () => {
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraEnabled]);
  
  const handleLocationClick = () => {
      navigate('/map', { state: { employee } });
  };

  if (!employee) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 font-semibold text-red-500">Employee data not found.</p>
        <button onClick={() => navigate('/list')} className="px-6 py-2 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600">Go Back to List</button>
      </div>
    );
  }

  const department = employee.title?.split(' ').pop() || 'N/A';
  const email = generateEmail(employee.name);

  const DetailItem = ({ label, value, isClickable }) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-center">
      <dt className="col-span-1 font-semibold text-gray-700">{label}</dt>
      <dd className="col-span-2 sm:col-span-3">
        {isClickable ? (
            <button onClick={handleLocationClick} className="text-left text-indigo-600 hover:underline flex items-center gap-1">
                {value}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
        ) : (
          <span className="text-gray-600">{value}</span>
        )}
      </dd>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">Personal Information</h3>
              <dl className="space-y-3">
                <DetailItem label="Name" value={employee.name} />
                <DetailItem label="Position" value={employee.title} />
                <DetailItem label="Department" value={department} />
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">Contact Information</h3>
              <dl className="space-y-3">
                <DetailItem label="Email" value={email} />
                <DetailItem label="Phone" value="+1 (555) 123-4567" />
                <DetailItem label="Location" value={employee.city} isClickable={true} />
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">Employment Details</h3>
              <dl className="space-y-3">
                <DetailItem label="Salary" value={employee.salary} />
                <DetailItem label="Start Date" value={employee.hireDate} />
              </dl>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700 mb-4 self-start md:self-center">Employee Photo</h3>
            <div className="w-full max-w-xs h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed mb-4">
              {!isCameraEnabled ? (
                <div className="text-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="mt-2 text-sm">Camera is off</p>
                </div>
              ) : (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-lg" />
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />

            {!isCameraEnabled ? (
              <button onClick={() => setIsCameraEnabled(true)} className="w-full max-w-xs px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                Capture Photo
              </button>
            ) : (
              <div className="w-full max-w-xs space-y-2">
                <button onClick={handleCapturePhoto} className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300">
                  Take Photo
                </button>
                <button onClick={() => setIsCameraEnabled(false)} className="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300">
                  Cancel
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Details;

