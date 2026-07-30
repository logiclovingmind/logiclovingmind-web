"use server";

export type ApplyState = {
  status: "idle" | "sent" | "error";
  message: string;
};

const MAX_LEN = 200;

function text(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

function count(form: FormData, key: string): number | null {
  const raw = text(form, key);
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export async function applyForSeat(
  _prev: ApplyState,
  form: FormData,
): Promise<ApplyState> {
  const name = text(form, "name");
  const company = text(form, "company");
  const phone = text(form, "phone");

  if (!name || !phone) {
    return {
      status: "error",
      message: "Name and WhatsApp number are missing. Add both, then apply.",
    };
  }

  if (!/^[+\d][\d\s-]{7,19}$/.test(phone)) {
    return {
      status: "error",
      message: "That WhatsApp number does not look complete. Check it and apply again.",
    };
  }

  const application = {
    name,
    company,
    phone,
    leadsPerMonth: count(form, "leads"),
    salesTeamSize: count(form, "team"),
    receivedAt: new Date().toISOString(),
  };

  // No application backend was specified for launch (claude.md §12.5).
  // Point this at the real endpoint before the site goes live — until then
  // applications are recorded in the server log only.
  const endpoint = process.env.APPLICATION_ENDPOINT;
  if (!endpoint) {
    console.warn("APPLICATION_ENDPOINT is not set; application not delivered", application);
    return {
      status: "error",
      message:
        "The application form is not connected yet. Send the same details on WhatsApp and a founder will pick it up.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(application),
    });
    if (!response.ok) throw new Error(`Endpoint returned ${response.status}`);
  } catch (error) {
    console.error("Application delivery failed", error);
    return {
      status: "error",
      message:
        "That did not reach us. Try again, or send the same details on WhatsApp.",
    };
  }

  return {
    status: "sent",
    message: "We have it. You will hear from Yasir or zEi within one working day.",
  };
}
