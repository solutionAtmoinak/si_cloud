"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { fieldStyles, Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const topics = ["Sales", "Support", "Billing", "Other"] as const;

type Field = "name" | "email" | "phone" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const value = (key: Field) => String(data.get(key) ?? "").trim();

  if (!value("name")) errors.name = "Enter your name.";
  if (!value("email")) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) errors.email = "Enter a valid email address, like name@example.com.";
  if (value("phone") && !/^(\+91[\s-]?)?[6-9]\d{9}$/.test(value("phone"))) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (!topics.includes(value("topic") as (typeof topics)[number])) errors.topic = "Choose a topic.";
  if (value("message").length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-danger-600">
      {message}
    </p>
  );
}

// OPEN: submission endpoint. Phase 1 validates on the client and shows a notice; nothing is sent.
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      setSubmittedName(null);
      return;
    }
    setSubmittedName(String(data.get("name")).trim());
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass-strong rounded-3xl p-6 sm:p-8">
      {/* Always mounted so screen readers announce changes. */}
      <div aria-live="polite" className={cn(submittedName && "mb-6 rounded-2xl border border-green-700/20 bg-green-50/80 p-4 text-base text-green-900")}>
        {submittedName && (
          <>
            Thanks, {submittedName}. Your message looks good, but sending is not switched on yet. Please email us at{" "}
            <a href={`mailto:${site.contactEmail}`} className="font-semibold underline underline-offset-4">
              {site.contactEmail}
            </a>{" "}
            for now.
          </>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div>
          <Label htmlFor="topic">Topic</Label>
          <select
            id="topic"
            name="topic"
            defaultValue=""
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={errors.topic ? "topic-error" : undefined}
            className={cn(fieldStyles, "min-h-11", errors.topic ? "border-danger-600" : "border-white/80")}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <FieldError id="topic-error" message={errors.topic} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
