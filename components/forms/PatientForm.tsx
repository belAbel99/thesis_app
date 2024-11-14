"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { checkUserExists, createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      // Check if user already exists
      const userExists = await checkUserExists(values.email);
      
      if (userExists) {
        // Redirect to Appointment Options page if the user is verified
        // eslint-disable-next-line no-template-curly-in-string
        router.push('/patients/${user.$id}/apointment-options');
      } else {
        // If user doesn't exist, create new user and redirect to dynamic registration page
        const newUser = await createUser(values);
        
        if (newUser) {
          // Redirect to /patients/[newUser.$id]/register page for new user
          router.push(`/patients/${newUser.$id}/register`);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4 text-dark-300">
          <h1 className="header">Hey There, CSUANs👋</h1>
          <p className="text-dark-700">Please, Set Your Appointment Here.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Abel"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johnabel@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(+63) 9123456789"
        />

        <SubmitButton isLoading={isLoading}>Login or Register</SubmitButton>
      </form>
    </Form>
  );
};
