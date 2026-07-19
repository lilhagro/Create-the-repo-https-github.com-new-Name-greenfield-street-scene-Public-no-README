"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Product } from "@/modules/catalog/types";
import type { Meet } from "@/modules/meets/types";

type Message = {
  role: "user" | "assistant";
  text: string;
  products?: Product[];
  meets?: Meet[];
};

const starters = [
  "Night lot merch for cold weather",
  "Sunrise photo meet near Phoenix",
  "Cheap gift under $20",
  "Cruise meet in San Diego",
];

export function AiAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "I’m the Greenfield Street Scene fit finder. Ask for a meet vibe, a city, or what you want to wear to the lot.",
    },
  ]);
  const [pending, setPending] = useState(false);

  async function ask(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed || pending) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = (await res.json()) as {
        reply: string;
        products: Product[];
        meets: Meet[];
      };
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
          products: data.products,
          meets: data.meets,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something glitched on my side. Try again in a second.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="assistant" className="assistant">
      <div className="section-head">
        <p className="eyebrow">AI Fit</p>
        <h2>Tell it the vibe. Get merch and meets.</h2>
        <p className="lede">
          No account needed. Local recommendations out of the box — plug in an OpenAI key later for richer chat.
        </p>
      </div>

      <div className="assistant__panel">
        <div className="assistant__thread" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`bubble bubble--${message.role}`}
            >
              <p>{message.text}</p>
              {message.products && message.products.length > 0 && (
                <div className="suggestion-row">
                  {message.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.slug}`}
                      className="suggestion-chip"
                    >
                      <strong>{product.name}</strong>
                      <span>{formatPrice(product.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
              {message.meets && message.meets.length > 0 && (
                <div className="suggestion-row">
                  {message.meets.map((meet) => (
                    <Link
                      key={meet.id}
                      href={`/meets/${meet.slug}`}
                      className="suggestion-chip suggestion-chip--meet"
                    >
                      <strong>{meet.name}</strong>
                      <span>{meet.city}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {pending && <p className="muted typing">Matching your vibe…</p>}
        </div>

        <div className="starter-row">
          {starters.map((starter) => (
            <button
              key={starter}
              type="button"
              className="starter"
              onClick={() => ask(starter)}
              disabled={pending}
            >
              {starter}
            </button>
          ))}
        </div>

        <form
          className="assistant__form"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <label className="sr-only" htmlFor="ai-prompt">
            Ask about merch or meets
          </label>
          <input
            id="ai-prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. cold night meet in Denver + hoodie"
            disabled={pending}
          />
          <button type="submit" className="btn btn-primary" disabled={pending}>
            Ask
          </button>
        </form>
      </div>
    </section>
  );
}
