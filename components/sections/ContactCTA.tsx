"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  auditFormSchema,
  type AuditFormData,
  carrierOptions,
  spendRanges,
} from "@/lib/validations";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SlideIn from "@/components/animations/SlideIn";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const auditSnippet = [
  { label: "Residential surcharge overcharge", value: "+$1,847" },
  { label: "Dim weight billing errors", value: "+$923" },
  { label: "Recoverable audit credits", value: "+$2,770" },
];

export default function ContactCTA() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      carriers: [],
    },
  });

  async function onSubmit(data: AuditFormData) {
    console.log("Audit form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  }

  const inputClasses =
    "w-full bg-white border border-slate-border rounded-[4px] px-4 py-3 text-sm text-heading placeholder:text-body-text/40 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors";
  const errorClasses = "text-red-600 text-xs mt-1";
  const labelClasses = "block text-sm font-medium text-heading mb-1.5";

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 lg:py-28 bg-navy">
        <Container narrow>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald/10 rounded-[4px] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Audit Request Received
            </h2>
            <p className="text-white/70 text-lg max-w-md mx-auto">
              Our team will review your shipping data and get back to you within
              1–2 business days with a detailed savings analysis.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-navy relative overflow-hidden"
    >
      <div className="absolute inset-0 hero-grid-pattern opacity-50" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: CTA Copy */}
          <SlideIn direction="left">
            <div className="flex flex-col justify-center">
              <p className="text-emerald font-semibold text-sm uppercase tracking-wider mb-3">
                Free Shipping Audit
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold !text-white mb-6 leading-tight">
                Find Out Exactly How Much You&apos;re{" "}
                <span className="text-emerald">Overpaying</span>
              </h2>
              <p className="!text-white text-lg leading-relaxed mb-8">
                Submit your details and we&apos;ll analyze your current carrier
                agreements at no cost. Most businesses discover 20–30% in annual
                savings they didn&apos;t know were available.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "No cost, no commitment",
                  "Results within 1–2 business days",
                  "We never share your data with carriers",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-emerald rounded-full shrink-0" />
                    <span className="!text-white/95 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Sample audit snippet */}
              <div className="rounded-[4px] border border-white/10 bg-navy-light/50 p-5 backdrop-blur-sm">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3 font-semibold">
                  Sample Audit Findings
                </p>
                <div className="space-y-2">
                  {auditSnippet.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-white/60">{row.label}</span>
                      <span className="text-emerald font-bold font-display">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Right: Form */}
          <SlideIn direction="right" delay={0.15}>
            <div className="bg-white rounded-[4px] p-8 lg:p-10">
              <h3 className="font-display text-xl font-bold text-heading mb-6">
                Request Your Free Audit
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Mike Sullivan"
                      className={inputClasses}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className={errorClasses}>{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClasses}>
                      Company *
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Fulfillment"
                      className={inputClasses}
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className={errorClasses}>{errors.company.message}</p>
                    )}
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="mike@acmefulfillment.com"
                      className={inputClasses}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className={errorClasses}>{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className={inputClasses}
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className={errorClasses}>{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Carriers */}
                <div>
                  <label className={labelClasses}>Current Carriers *</label>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {carrierOptions.map((carrier) => (
                      <label
                        key={carrier.value}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          value={carrier.value}
                          className="w-4 h-4 rounded-[2px] border-slate-border text-emerald focus:ring-emerald accent-emerald"
                          {...register("carriers")}
                        />
                        <span className="text-sm text-body-text group-hover:text-heading transition-colors">
                          {carrier.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.carriers && (
                    <p className={errorClasses}>{errors.carriers.message}</p>
                  )}
                </div>

                {/* Monthly Spend */}
                <div>
                  <label htmlFor="monthlySpend" className={labelClasses}>
                    Monthly Shipping Spend *
                  </label>
                  <select
                    id="monthlySpend"
                    className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%23475569%22%20d%3d%22M2%204l4%204%204-4%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_1rem_center]`}
                    {...register("monthlySpend")}
                  >
                    {spendRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                  {errors.monthlySpend && (
                    <p className={errorClasses}>
                      {errors.monthlySpend.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Anything else we should know?
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="e.g., We ship mostly to residential addresses in the Northeast..."
                    className={`${inputClasses} resize-none`}
                    {...register("message")}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Get My Free Audit
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-body-text/50 text-center">
                  We&apos;ll never share your data. Results within 1–2 business
                  days.
                </p>
              </form>
            </div>
          </SlideIn>
        </div>
      </Container>
    </section>
  );
}
