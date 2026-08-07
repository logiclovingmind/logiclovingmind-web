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
    form: "automation-forever",
    name,
    company,
    phone,
    leadsPerMonth: count(form, "leads"),
    salesTeamSize: count(form, "team"),
    receivedAt: new Date().toISOString(),
  };

  const endpoint = process.env.DOMINIUS_INTAKE_URL;
  const secret = process.env.DOMINIUS_INTAKE_SECRET;
  if (!endpoint || !secret) {
    console.error("DOMINIUS intake is not configured; application not delivered", application);
    return {
      status: "error",
      message:
        "That did not reach us. Send the same details on WhatsApp and a founder will pick it up.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(application),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Intake returned ${response.status}`);
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
