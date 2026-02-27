'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

const CRISP_WEBSITE_ID = 'YOUR_CRISP_WEBSITE_ID'; // Replace with your Crisp Website ID

export default function CrispChat() {
  useEffect(() => {
    if (window.$crisp) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    // Brand customization — navy + emerald palette
    window.$crisp.push(['config', 'color:theme', ['green']]);
    window.$crisp.push(['config', 'position:reverse', [true]]); // bottom-left to avoid CTA overlap

    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
