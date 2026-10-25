import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Github, Linkedin, Loader2, Mail, Minus, Plus, AlertTriangle } from "lucide-react";
import {
  faqSection,
  faqs,
  contactSection,
} from "@/data/portfolio";
import { AccordionBody, Corners, Section, SectionHead, WipeButton } from "./primitives";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* FAQ — tabs "Working together" / "Projects" + accordion.             */
/* ------------------------------------------------------------------ */
type TabId = (typeof faqSection.tabs)[number]["id"];

export function Faq() {
  const [tab, setTab] = useState<TabId>("working");
  const [open, setOpen] = useState(0);
  const items = faqs[tab];
  return (
    <Section id="faq">
      <SectionHead tag={faqSection.tag} bars={8} heading={faqSection.heading} className="mb-12" />
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="flex gap-3" role="tablist" aria-label="FAQ topics">
          {faqSection.tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setOpen(0);
              }}
              className={cn(
                "group relative flex-1 border px-5 py-3.5 text-small transition-colors",
                tab === t.id
                  ? "border-border bg-surface-3 text-foreground"
                  : "border-border bg-surface-2 text-paragraph hover:text-foreground",
              )}
            >
              <Corners interactive={false} className={cn(tab === t.id && "text-primary")} />
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {items.map((item, i) => {
            const isOpen = i === open;
            return (
              <div key={item.question} className="group relative border border-border bg-surface-2">
                <Corners size={7} interactive={false} className={cn(isOpen && "text-primary")} />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="text-small font-medium text-foreground">{item.question}</span>
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-card text-paragraph"
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AccordionBody open={isOpen}>
                  <p className="px-5 pb-5 text-small text-paragraph">{item.answer}</p>
                </AccordionBody>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — form with real state + side contact cards.                */
/* ------------------------------------------------------------------ */
const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  projectType: z.enum(["Web app", "API", "AI integration"], {
    required_error: "Please choose a project type.",
  }),
  services: z.array(z.string()).optional(),
  message: z.string().min(10, "Please describe your project in at least 10 characters."),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "loading" | "success" | "error";

const cardIcons = { mail: Mail, github: Github, linkedin: Linkedin };

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { services: [] },
  });

  const selectedServices = watch("services") ?? [];
  const selectedType = watch("projectType");

  const onSubmit: SubmitHandler<ContactForm> = async (values) => {
    setStatus("loading");
    try {
      // Simulated submit — no backend connected yet.
      // TODO: connect a backend here before publishing (e.g. Supabase
      // or a transactional email service) so messages actually arrive.
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.log("Contact form payload", values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-border bg-background px-4 py-3 text-small text-foreground placeholder:text-muted-foreground focus:border-paragraph focus:outline-none";

  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <SectionHead
            tag={contactSection.tag}
            bars={9}
            heading={contactSection.heading}
            subtitle={contactSection.subtitle}
            className="mb-12"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="group relative border border-border bg-card p-6 md:p-8">
            <Corners size={7} />
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-tiny uppercase text-muted-foreground">
                  {contactSection.form.nameLabel}
                </label>
                <input
                  id="contact-name"
                  {...register("name")}
                  placeholder={contactSection.form.namePlaceholder}
                  className={cn(inputClass, "mt-2.5")}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="mt-2 text-small text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-tiny uppercase text-muted-foreground">
                  {contactSection.form.emailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  {...register("email")}
                  placeholder={contactSection.form.emailPlaceholder}
                  className={cn(inputClass, "mt-2.5")}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="mt-2 text-small text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className="text-tiny uppercase text-muted-foreground">
                {contactSection.form.projectTypeLabel}
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {(["Web app", "API", "AI integration"] as const).map((option) => (
                  <label key={option} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option}
                      {...register("projectType")}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        "group relative inline-flex items-center gap-2 border px-4 py-2.5 text-small transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary",
                        selectedType === option
                          ? "border-primary text-foreground"
                          : "border-border bg-surface-2 text-paragraph hover:text-foreground",
                      )}
                    >
                      <Corners interactive={false} className={cn(selectedType === option && "text-primary")} />
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          selectedType === option ? "bg-primary" : "bg-border",
                        )}
                      />
                      {option}
                    </span>
                  </label>
                ))}
              </div>
              {errors.projectType && (
                <p className="mt-2 text-small text-destructive">{errors.projectType.message}</p>
              )}
            </fieldset>

            <fieldset className="mt-8">
              <legend className="text-tiny uppercase text-muted-foreground">
                {contactSection.form.servicesLabel}
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {(["Frontend", "Backend", "Database", "DevOps"] as const).map((option) => (
                  <label key={option} className="cursor-pointer">
                    <input
                      type="checkbox"
                      value={option}
                      {...register("services")}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        "group relative inline-flex items-center gap-2 border px-4 py-2.5 text-small transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary",
                        selectedServices.includes(option)
                          ? "border-primary text-foreground"
                          : "border-border bg-surface-2 text-paragraph hover:text-foreground",
                      )}
                    >
                      <Corners interactive={false} className={cn(selectedServices.includes(option) && "text-primary")} />
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8">
              <label htmlFor="contact-message" className="text-tiny uppercase text-muted-foreground">
                {contactSection.form.messageLabel}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                {...register("message")}
                placeholder={contactSection.form.messagePlaceholder}
                className={cn(inputClass, "mt-2.5 resize-y")}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <p className="mt-2 text-small text-destructive">{errors.message.message}</p>}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <WipeButton
                type="submit"
                {...(status === "loading" ? {} : { icon: ArrowRight })}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    {contactSection.form.submitting}
                  </span>
                ) : (
                  contactSection.form.submit
                )}
              </WipeButton>
            </div>

            {status === "success" && (
              <div className="mt-6 flex items-start gap-3 border border-border bg-surface-2 p-4" role="status">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-card text-primary">
                  <Check size={15} />
                </span>
                <div>
                  <p className="text-small font-medium text-foreground">{contactSection.form.successTitle}</p>
                  <p className="mt-1 text-small text-paragraph">{contactSection.form.successBody}</p>
                </div>
              </div>
            )}
            {status === "error" && (
              <div className="mt-6 flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-4" role="alert">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-destructive/40 bg-card text-destructive">
                  <AlertTriangle size={15} />
                </span>
                <div>
                  <p className="text-small font-medium text-foreground">{contactSection.form.errorTitle}</p>
                  <p className="mt-1 text-small text-paragraph">{contactSection.form.errorBody}</p>
                </div>
              </div>
            )}
          </form>
        </div>

        <aside className="flex flex-col gap-4 lg:pt-2">
          {contactSection.cards.map((card) => {
            const Icon = cardIcons[card.icon as keyof typeof cardIcons];
            const content = (
              <>
                <Corners size={7} />
                <span className="flex h-10 w-10 items-center justify-center border border-border bg-background text-paragraph">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-tiny uppercase text-muted-foreground">{card.label}</p>
                  <p className="mt-1 text-small text-foreground">{card.value}</p>
                </div>
              </>
            );
            return card.href ? (
              <a key={card.label} href={card.href} className="group relative flex items-center gap-4 border border-border bg-surface-2 p-5">
                {content}
              </a>
            ) : (
              <div key={card.label} className="group relative flex items-center gap-4 border border-border bg-surface-2 p-5">
                {content}
              </div>
            );
          })}
          <p className="text-tiny text-muted-foreground">
            Placeholders — fill in the contact values in <code>src/data/portfolio.ts</code>.
          </p>
        </aside>
      </div>
    </Section>
  );
}
