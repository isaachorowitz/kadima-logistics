"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItemProps = {
  question: string;
  answer: string;
};

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-semibold text-heading pr-4 group-hover:text-emerald-text transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-body-text shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="accordion-content"
        data-open={isOpen}
        role="region"
      >
        <div>
          <p className="pb-5 text-body-text leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
