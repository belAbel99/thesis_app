import Image from "next/image";
import Link from "next/link";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">

          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/hmm.png"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />
          </Link>  
            <AppointmentForm
              patientId={patient?.$id}
              userId={userId}
              type="create"
            />

          <p className="copyright mt-10 py-12">© 2024 Guidance Office CSU</p>
        </div>
      </section>

      <Image
        src="/assets/images/Officee.jpg"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
