export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  propertySize: string;
  preferredDate: string;
  message: string;
}

const contactEmail = "info@familycleaningservices.com";

export function createMailtoLink(request: ContactRequest) {
  const subject = `Service Request - ${request.name}`;
  const body = [
    "New service request",
    "",
    `Full Name: ${request.name}`,
    `Email: ${request.email}`,
    `Phone Number: ${request.phone}`,
    `Service Type: ${request.serviceType}`,
    `Property Size: ${request.propertySize}`,
    `Preferred Date: ${request.preferredDate}`,
    "",
    "Message:",
    request.message,
  ].join("\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export async function submitContactRequest(request: ContactRequest) {
  window.location.href = createMailtoLink(request);
}
