import emailjs from "@emailjs/browser";

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  propertySize: string;
  preferredDate?: string;
  message: string;
}

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export async function sendQuoteRequest(data: ContactRequest): Promise<void> {
  if (!publicKey || !serviceId || !templateId) {
    throw new Error("EmailJS environment variables are not configured.");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phone,
      service_type: data.serviceType,
      property_size: data.propertySize,
      preferred_date: data.preferredDate || "Not specified",
      message: data.message,
    },
    {
      publicKey,
    },
  );
}
