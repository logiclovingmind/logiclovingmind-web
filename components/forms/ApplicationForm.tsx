"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { applyForSeat, type ApplyState } from "@/app/automation-forever/actions";
import { Button } from "@/components/ui/Button";

const INITIAL: ApplyState = { status: "idle", message: "" };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="self-start">
      {pending ? "Sending…" : "Apply for Automation Forever"}
    </Button>
  );
}

function Field({
  id,
  name,
  label,
  required,
  type = "text",
  mono,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  mono?: boolean;
  inputMode?: "tel" | "numeric";
  min?: string;
  step?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] text-text-secondary">
        {label} {required ? <span className="text-text-tertiary">(required)</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className={`field ${mono ? "field-mono" : ""}`}
        {...rest}
      />
    </div>
  );
}

export function ApplicationForm() {
  const [state, formAction] = useActionState(applyForSeat, INITIAL);

  if (state.status === "sent") {
    return (
      <div className="rounded-(--radius-md) border border-line-strong p-[clamp(24px,4vw,40px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <p className="eyebrow">Application sent</p>
        <p className="font-display heading mt-4">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field id="af-name" name="name" label="Your name" required autoComplete="name" />
      <Field
        id="af-company"
        name="company"
        label="Company"
        required
        autoComplete="organization"
      />
      <Field
        id="af-phone"
        name="phone"
        label="WhatsApp number"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        mono
      />

      <div className="flex flex-wrap gap-5">
        <div className="flex-[1_1_180px]">
          <Field
            id="af-leads"
            name="leads"
            label="Leads per month"
            type="number"
            inputMode="numeric"
            min="0"
            step="10"
            placeholder="100"
            mono
          />
        </div>
        <div className="flex-[1_1_180px]">
          <Field
            id="af-team"
            name="team"
            label="Sales team size"
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            placeholder="2"
            mono
          />
        </div>
      </div>

      <p role="status" aria-live="polite" className="font-mono m-0 text-[13px] text-izi-glow">
        {state.status === "error" ? state.message : ""}
      </p>

      <Submit />
    </form>
  );
}
