// app/patients/[userId]/appointment-history/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAppointment } from "@/lib/actions/appointment.actions";

const AppointmentHistoryPage = ({ params }) => {
  const { userId } = params;
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecentAppointmentList = async () => {
      try {
        const data = await getAppointment(userId);
        setAppointments(data || []); // Ensure appointments is an array
      } catch (error) {
        console.error("Failed to load appointments:", error);
        setAppointments([]); // Default to empty array if there's an error
      } finally {
        setLoading(false);
      }
    };

    getRecentAppointmentList();
  }, [userId]);

  const currentDate = new Date();

  // Separate appointments into upcoming and past based on date
  const upcomingAppointments = (appointments || []).filter(
    (appt) => new Date(appt.schedule) >= currentDate
  );
  const pastAppointments = (appointments || []).filter(
    (appt) => new Date(appt.schedule) < currentDate
  );

  if (loading) {
    return <p>Loading appointment history...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl text-dark-300 ffont-bold mb-4">Appointment History</h1>

      <section className="mb-8 w-full max-w-2xl">
        <h2 className="text-xl text-dark-300 font-semibold mb-2">Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          <ul className="space-y-4">
            {upcomingAppointments.map((appt) => (
              <li key={appt.$id} className="bg-white text-dark-300 f p-4 rounded shadow">
                <p>Date: {new Date(appt.schedule).toLocaleDateString()}</p>
                <p>Time: {appt.time}</p>
                <p>Reason: {appt.reason}</p>
                <p>Status: {appt.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-dark-600">No upcoming appointments.</p>
        )}
      </section>

      <section className="w-full max-w-2xl">
        <h2 className="text-xl text-dark-300 font-semibold mb-2">Past Appointments</h2>
        {pastAppointments.length > 0 ? (
          <ul className="space-y-4">
            {pastAppointments.map((appt) => (
              <li key={appt.$id} className="bg-white text-dark-300 fp-4 rounded shadow">
                <p>Date: {new Date(appt.schedule).toLocaleDateString()}</p>
                <p>Time: {appt.time}</p>
                <p>Reason: {appt.reason}</p>
                <p>Status: {appt.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-dark-600">No past appointments.</p>
        )}
      </section>
    </div>
  );
};

export default AppointmentHistoryPage;
