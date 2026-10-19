import { getContactFormId } from "@/lib/contact-config";
import { handleContactRequest } from "@/lib/contact-delivery";

export const runtime = "nodejs";
export const maxDuration = 20;

export async function POST(request: Request) {
  return handleContactRequest(request, { formId: getContactFormId() });
}
