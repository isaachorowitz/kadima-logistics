"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  calculatorSchema,
  type CalculatorFormData,
} from "@/lib/validations";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import { Package, MapPin, Zap, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const calculatorCardHeightClasses = "h-full lg:min-h-[560px]";
const calculatorPanelClasses =
  "w-full h-[320px] sm:h-[360px] lg:h-full lg:min-h-[560px] rounded-[6px] border border-white/10 bg-gradient-to-br from-navy-light/50 to-navy/80 overflow-hidden";

const AnimatedBox3D = dynamic(
  () => import("@/components/three/AnimatedBox3D"),
  {
    ssr: false,
    loading: () => (
      <div
        className={cn(
          calculatorPanelClasses,
          "flex items-center justify-center"
        )}
      >
        <Package className="w-10 h-10 text-emerald/30 animate-pulse" />
      </div>
    ),
  }
);

interface RateResult {
  carrier: string;
  logo: string;
  rate: number;
  transitDays: number;
  recommended: boolean;
}

function estimateZone(originZip: string, destZip: string): number {
  const o = parseInt(originZip.substring(0, 3));
  const d = parseInt(destZip.substring(0, 3));
  const diff = Math.abs(o - d);
  if (diff < 50) return 2;
  if (diff < 150) return 3;
  if (diff < 300) return 4;
  if (diff < 500) return 5;
  if (diff < 700) return 6;
  return 7;
}

function calculateRates(data: CalculatorFormData): RateResult[] {
  const dimWeight = (data.length * data.width * data.height) / 139;
  const billableWeight = Math.max(data.weight, dimWeight);
  const zone = estimateZone(data.originZip, data.destinationZip);
  const zoneFactor = 1 + zone * 0.12;
  const base = billableWeight * 0.42 * zoneFactor;

  const rates: RateResult[] = [
    {
      carrier: "DHL",
      logo: "/logos/dhl.svg",
      rate: Math.round(base * 0.88 * 100) / 100,
      transitDays: zone <= 4 ? 2 : 3,
      recommended: true,
    },
    {
      carrier: "UPS",
      logo: "/logos/ups.svg",
      rate: Math.round(base * 1.12 * 100) / 100,
      transitDays: zone <= 3 ? 3 : 4,
      recommended: false,
    },
    {
      carrier: "FedEx",
      logo: "/logos/fedex.svg",
      rate: Math.round(base * 1.08 * 100) / 100,
      transitDays: zone <= 3 ? 3 : 4,
      recommended: false,
    },
    {
      carrier: "USPS",
      logo: "/logos/usps.svg",
      rate: Math.round(base * 1.02 * 100) / 100,
      transitDays: zone <= 3 ? 4 : 5,
      recommended: false,
    },
  ];

  return rates.sort((a, b) => a.rate - b.rate);
}

const inputClasses =
  "w-full bg-white border border-slate-border rounded-[4px] px-4 py-3 text-sm text-heading placeholder:text-body-text/40 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors";
const errorClasses = "text-red-600 text-xs mt-1";
const labelClasses = "block text-sm font-medium text-heading mb-1.5";

export default function ShippingCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<RateResult[] | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      length: 20,
      width: 20,
      height: 20,
      weight: 5,
      originZip: "",
      destinationZip: "",
    },
  });

  const dimensions = watch(["length", "width", "height"]);

  async function onSubmit(data: CalculatorFormData) {
    setIsCalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setResults(calculateRates(data));
    setIsCalculating(false);
  }

  const bestRate = results?.find((r) => r.recommended);
  const worstRate = results ? results[results.length - 1] : null;
  const savingsPercent =
    bestRate && worstRate
      ? Math.round(((worstRate.rate - bestRate.rate) / worstRate.rate) * 100)
      : 0;

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 hero-grid-pattern opacity-30" />

      <Container className="relative z-10">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-emerald font-semibold text-sm uppercase tracking-wider mb-3">
              Rate Calculator
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold !text-white mb-4">
              Compare Rates Instantly
            </h2>
            <p className="!text-white/70 text-lg leading-relaxed">
              Enter your package details and see estimated rates across all
              major carriers — powered by Kadima&apos;s negotiated pricing.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Calculator Card */}
          <SlideIn direction="left">
            <div
              className={cn(
                "bg-white rounded-[6px] p-8 lg:p-10",
                calculatorCardHeightClasses
              )}
            >
              <h3 className="font-display text-xl font-bold text-heading mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald" />
                Package Details
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Dimensions */}
                <div>
                  <label className={labelClasses}>
                    Dimensions (inches) *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { field: "length", placeholder: "Length" },
                        { field: "width", placeholder: "Width" },
                        { field: "height", placeholder: "Height" },
                      ] as const
                    ).map(({ field, placeholder }) => (
                      <div key={field}>
                        <input
                          type="number"
                          step="0.1"
                          placeholder={placeholder}
                          className={cn(
                            inputClasses,
                            errors[field] && "border-red-400 focus:border-red-400 focus:ring-red-400"
                          )}
                          {...register(field, { valueAsNumber: true })}
                        />
                        {errors[field] && (
                          <p className={errorClasses}>
                            {errors[field]?.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className={labelClasses}>
                    Weight (lbs) *
                  </label>
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="5.0"
                    className={cn(
                      inputClasses,
                      errors.weight && "border-red-400 focus:border-red-400 focus:ring-red-400"
                    )}
                    {...register("weight", { valueAsNumber: true })}
                  />
                  {errors.weight && (
                    <p className={errorClasses}>{errors.weight.message}</p>
                  )}
                </div>

                {/* ZIP codes */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="originZip" className={labelClasses}>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald" />
                        From ZIP *
                      </span>
                    </label>
                    <input
                      id="originZip"
                      type="text"
                      maxLength={5}
                      placeholder="07724"
                      className={cn(
                        inputClasses,
                        errors.originZip && "border-red-400 focus:border-red-400 focus:ring-red-400"
                      )}
                      {...register("originZip")}
                    />
                    {errors.originZip && (
                      <p className={errorClasses}>
                        {errors.originZip.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="destinationZip" className={labelClasses}>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald" />
                        To ZIP *
                      </span>
                    </label>
                    <input
                      id="destinationZip"
                      type="text"
                      maxLength={5}
                      placeholder="10001"
                      className={cn(
                        inputClasses,
                        errors.destinationZip && "border-red-400 focus:border-red-400 focus:ring-red-400"
                      )}
                      {...register("destinationZip")}
                    />
                    {errors.destinationZip && (
                      <p className={errorClasses}>
                        {errors.destinationZip.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Calculating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Calculate Rates
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </SlideIn>

          {/* Right: Fixed panel state (preview -> loading -> results) */}
          <SlideIn direction="right" delay={0.15}>
            <div className={calculatorCardHeightClasses}>
              {isCalculating ? (
                <div
                  className={cn(
                    calculatorPanelClasses,
                    "flex flex-col items-center justify-center gap-4 px-6 text-center"
                  )}
                >
                  <span className="w-10 h-10 border-2 border-white/40 border-t-emerald rounded-full animate-spin" />
                  <p className="text-white/80 text-sm font-semibold">
                    Calculating your best carrier mix...
                  </p>
                </div>
              ) : results ? (
                <div className={cn(calculatorPanelClasses, "p-6 lg:p-8 flex flex-col")}>
                  <h4 className="font-display text-sm font-bold text-white/90 uppercase tracking-wider">
                    Estimated Rates
                  </h4>

                  <div className="mt-5 space-y-3 flex-1 overflow-y-auto pr-1">
                    {results.map((rate) => (
                      <div
                        key={rate.carrier}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-[4px] border transition-colors",
                          rate.recommended
                            ? "border-emerald/30 bg-emerald/10"
                            : "border-white/10 bg-white/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rate.logo}
                            alt={rate.carrier}
                            className="h-5 w-auto"
                          />
                          <div>
                            <span className="text-sm font-semibold text-white/95">
                              {rate.carrier}
                            </span>
                            {rate.recommended && (
                              <span className="ml-2 px-2 py-0.5 bg-emerald text-white text-[10px] font-bold rounded-full uppercase">
                                Best Rate
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-lg font-bold text-white">
                            ${rate.rate.toFixed(2)}
                          </span>
                          <span className="block text-xs text-white/65 flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3" />
                            {rate.transitDays} days
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {savingsPercent > 0 && (
                    <div className="mt-4 p-3 rounded-[4px] bg-emerald/10 border border-emerald/30 text-center">
                      <p className="text-emerald-200 text-sm font-semibold">
                        Save up to {savingsPercent}% with Kadima&apos;s
                        negotiated DHL rates
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-white/50 mt-4 text-center">
                    Estimates based on standard pricing. Actual Kadima rates
                    may be even lower.
                  </p>
                </div>
              ) : (
                <AnimatedBox3D
                  className={calculatorPanelClasses}
                  length={Number(dimensions[0]) || 20}
                  width={Number(dimensions[1]) || 20}
                  height={Number(dimensions[2]) || 20}
                />
              )}
            </div>
          </SlideIn>
        </div>

        {/* Bottom CTA */}
        <FadeUp delay={0.2}>
          <div className="text-center mt-14">
            <p className="!text-white/70 text-sm mb-4">
              Want exact rates with your negotiated pricing?
            </p>
            <Button href="#contact" variant="primary" size="lg">
              Get Your Free Audit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
