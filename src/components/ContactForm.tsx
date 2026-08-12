import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  type ContactRequest,
  sendQuoteRequest,
} from "../services/emailService";

const contactSchema = z.object({
  name: z.string().trim().min(3, "Full name must be at least 3 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Phone number must include at least 10 digits.",
    ),
  serviceType: z.string().min(1, "Select a service type."),
  propertySize: z.string().trim().min(1, "Property size is required."),
  preferredDate: z.string().optional(),
  message: z.string().trim().min(20, "Message must be at least 20 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const successMessage =
  "Thank you for contacting Family Cleaning Services. We have received your request and will contact you shortly.";

const errorMessage =
  "An error occurred while sending your request. Please try again later.";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      propertySize: "",
      preferredDate: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("idle");

    try {
      await sendQuoteRequest(data as ContactRequest);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
  };

  const fieldClass = (hasError: boolean) =>
    `form-field ${hasError ? "form-field-error" : ""}`;

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <label htmlFor="name">
          Full Name
          <input
            id="name"
            className={fieldClass(Boolean(errors.name))}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name ? <small>{errors.name.message}</small> : null}
        </label>

        <label htmlFor="email">
          Email Address
          <input
            id="email"
            className={fieldClass(Boolean(errors.email))}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? <small>{errors.email.message}</small> : null}
        </label>

        <label htmlFor="phone">
          Phone Number
          <input
            id="phone"
            className={fieldClass(Boolean(errors.phone))}
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone ? <small>{errors.phone.message}</small> : null}
        </label>

        <label htmlFor="serviceType">
          Service Type
          <select
            id="serviceType"
            className={fieldClass(Boolean(errors.serviceType))}
            aria-invalid={Boolean(errors.serviceType)}
            {...register("serviceType")}
          >
            <option value="">Select service</option>
            <option>Residential Cleaning</option>
            <option>Commercial Cleaning</option>
            <option>Deep Cleaning</option>
            <option>Move In / Move Out Cleaning</option>
          </select>
          {errors.serviceType ? <small>{errors.serviceType.message}</small> : null}
        </label>

        <label htmlFor="propertySize">
          Property Size
          <input
            id="propertySize"
            className={fieldClass(Boolean(errors.propertySize))}
            placeholder="Example: 3 bedrooms, 2 baths"
            aria-invalid={Boolean(errors.propertySize)}
            {...register("propertySize")}
          />
          {errors.propertySize ? <small>{errors.propertySize.message}</small> : null}
        </label>

        <label htmlFor="preferredDate">
          Preferred Service Date
          <input
            id="preferredDate"
            className={fieldClass(Boolean(errors.preferredDate))}
            type="date"
            aria-invalid={Boolean(errors.preferredDate)}
            {...register("preferredDate")}
          />
          {errors.preferredDate ? (
            <small>{errors.preferredDate.message}</small>
          ) : null}
        </label>
      </div>

      <label htmlFor="message">
        Message
        <textarea
          id="message"
          className={fieldClass(Boolean(errors.message))}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message ? <small>{errors.message.message}</small> : null}
      </label>

      {submitStatus === "success" ? (
        <p className="form-alert form-alert-success" role="status">
          {successMessage}
        </p>
      ) : null}

      {submitStatus === "error" ? (
        <p className="form-alert form-alert-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button className="button button-primary form-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="spinner" size={18} />
            Sending Request
          </>
        ) : (
          <>
            Request Your Free Quote
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
