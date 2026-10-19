// Public Formspree form ID supplied by the owner. Inbox delivery must be verified separately.
// This is an endpoint identifier, never an API key or Gmail password.
export const formspreeFormId = "mgaobllp";

export function getContactFormId(): string | null {
  const id = (process.env.FORMSPREE_FORM_ID ?? formspreeFormId).trim();
  return /^[a-z0-9]{6,32}$/i.test(id) ? id : null;
}
