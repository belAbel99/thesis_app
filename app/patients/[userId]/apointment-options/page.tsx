"use client";

import { useRouter } from "next/navigation";

const AppointmentOptionsPage = () => {
  const router = useRouter();

  const handleSetAppointment = () => {
    // eslint-disable-next-line no-template-curly-in-string
    router.push('/patients/${user.$id}/new-appointment'); // Page for setting a new appointment
  };

  const handleViewHistory = () => {
    // eslint-disable-next-line no-template-curly-in-string
    router.push('/patients/${user.$id}/appointment-history'); // Page to view appointment history
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl text-dark-200 font-bold mb-4">Welcome Back!</h1>
      <p className="mb-8 text-dark-200">What would you like to do today?</p>
      
      <div className="flex space-x-4">
        <button
          onClick={handleSetAppointment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set a New Appointment
        </button>
        <button
          onClick={handleViewHistory}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          View Appointment History
        </button>
      </div>
    </div>
  );
};

export default AppointmentOptionsPage;
