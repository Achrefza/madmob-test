"use client";

import { FormEvent, useMemo, useRef, useState, useEffect, useCallback } from "react";

type Sender = "user" | "bot";

type ChatMessage = {
  id: number;
  sender: Sender;
  text: string;
  isTyping?: boolean;
};

const BOT_RESPONSES = {
  members: `The team members of MADMOB include:\n\nFounders\nAzyz – DJ, Producer & Creative Director\nGaith – Artist, DJ & Creative Director\nSaif – Videographer, Audiovisual Director\n\nCore Team\nNouhe – Executive Manager\nAsma – Community Manager & Copywriter\nYoussef – Graphic Designer\nAmir – Editor\nNadim – Photographer, Audiovisual Producer`,
  who: `MADMOB is a Tunisian-founded, globally connected music collective, label, and cultural movement dedicated to hip-hop music and art.\n\nOriginally founded in 2015 by three DJs in Tunisia, MadMob has grown into an international network of artists, producers, DJs, and event curators pushing hip-hop culture forward.\n\nFrom music production and DJing to events, music videos, and art direction, MADMOB acts as a platform for artistic expression, connecting underground talent with broader audiences.`,
  why: `Why Roll With MadMob?\n\nReal Recognizes Real – We bring raw, unfiltered energy to every stage while staying authentic.\n\nNo Stage Too Small, No Crowd Too Big – From underground clubs to major festivals, we deliver unforgettable experiences.\n\nWorldwide Connects – We bridge local talent with global audiences.\n\nNext-Level Execution – From DJ sets to music videos, we deliver high production value.\n\nWe Set Trends, Not Follow Them – MadMob is a cultural force shaping the scene.`,
  fallback:
    "I'm MadBot 🤖 — ask me about MADMOB, the team, or why to roll with us.",
};

const getBotReply = (message: string) => {
  const normalizedMessage = message.toLowerCase().trim();

  if (normalizedMessage.includes("who are madmob")) {
    return BOT_RESPONSES.who;
  }

  if (
    normalizedMessage.includes("why roll with madmob") ||
    normalizedMessage.includes("why madmob")
  ) {
    return BOT_RESPONSES.why;
  }

  if (
    normalizedMessage.includes("members") ||
    normalizedMessage.includes("team")
  ) {
    return BOT_RESPONSES.members;
  }

  return BOT_RESPONSES.fallback;
};

export default function MadBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isIntroBubbleVisible, setIsIntroBubbleVisible] = useState(false);
  const [isIntroBubbleLeaving, setIsIntroBubbleLeaving] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "bot",
      text: "Yo, I\'m MadBot 🤖 Ask me about MADMOB, our team, or why to roll with us.",
    },
  ]);

  const nextId = useRef(2);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const hasIntroRunRef = useRef(false);
  const introDelayTimerRef = useRef<number | null>(null);
  const introHideTimerRef = useRef<number | null>(null);
  const introRemoveTimerRef = useRef<number | null>(null);
  const typingIntervalIdsRef = useRef<number[]>([]);

  const panelVisibilityClasses = useMemo(() => {
    if (!isOpen) {
      return "pointer-events-none translate-y-4 scale-95 opacity-0";
    }

    return "translate-y-0 scale-100 opacity-100";
  }, [isOpen]);

  const clearIntroTimers = useCallback(() => {
    if (introDelayTimerRef.current) {
      window.clearTimeout(introDelayTimerRef.current);
      introDelayTimerRef.current = null;
    }

    if (introHideTimerRef.current) {
      window.clearTimeout(introHideTimerRef.current);
      introHideTimerRef.current = null;
    }

    if (introRemoveTimerRef.current) {
      window.clearTimeout(introRemoveTimerRef.current);
      introRemoveTimerRef.current = null;
    }
  }, []);

  const typeMessage = (text: string, messageId: number) => {
    let charIndex = 0;

    const typingInterval = window.setInterval(() => {
      charIndex += 1;
      const nextText = text.slice(0, charIndex);
      const finishedTyping = charIndex >= text.length;

      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? {
                ...message,
                text: nextText,
                isTyping: !finishedTyping,
              }
            : message,
        ),
      );

      if (finishedTyping) {
        window.clearInterval(typingInterval);
        typingIntervalIdsRef.current = typingIntervalIdsRef.current.filter(
          (intervalId) => intervalId !== typingInterval,
        );
      }
    }, 28);

    typingIntervalIdsRef.current.push(typingInterval);
  };

  useEffect(() => {
    if (!messageContainerRef.current) {
      return;
    }

    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }, [messages, isMinimized, isOpen]);

  useEffect(() => {
    if (hasIntroRunRef.current) return;

    const delayTimer = window.setTimeout(() => {
      hasIntroRunRef.current = true;
      setIsIntroBubbleVisible(true);
      setIsIntroBubbleLeaving(false);
    }, 5000);

    introDelayTimerRef.current = delayTimer;

    return () => {
      window.clearTimeout(delayTimer);
    };
  }, []);

  useEffect(() => {
    if (!isIntroBubbleVisible) {
      return;
    }

    introHideTimerRef.current = window.setTimeout(() => {
      setIsIntroBubbleLeaving(true);
    }, 6000);

    introRemoveTimerRef.current = window.setTimeout(() => {
      setIsIntroBubbleVisible(false);
      setIsIntroBubbleLeaving(false);
    }, 6600);

    return () => {
      if (introHideTimerRef.current) {
        window.clearTimeout(introHideTimerRef.current);
        introHideTimerRef.current = null;
      }

      if (introRemoveTimerRef.current) {
        window.clearTimeout(introRemoveTimerRef.current);
        introRemoveTimerRef.current = null;
      }
    };
  }, [isIntroBubbleVisible]);

  useEffect(() => {
    return () => {
      typingIntervalIdsRef.current.forEach((intervalId) => window.clearInterval(intervalId));
      typingIntervalIdsRef.current = [];
      clearIntroTimers();
    };
  }, [clearIntroTimers]);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextId.current,
      sender: "user",
      text: trimmedInput,
    };
    nextId.current += 1;

    const botReplyText = getBotReply(trimmedInput);
    const botMessageId = nextId.current;
    const botMessage: ChatMessage = {
      id: botMessageId,
      sender: "bot",
      text: "",
      isTyping: true,
    };
    nextId.current += 1;

    setMessages((prev) => [...prev, userMessage, botMessage]);
    typeMessage(botReplyText, botMessageId);
    setInputValue("");
  };

  const openWidget = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setIsIntroBubbleVisible(false);
    setIsIntroBubbleLeaving(false);
    clearIntroTimers();
  };

  const closeWidget = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-6 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:right-6 sm:bottom-6"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}>
      <section
        className={`pointer-events-auto w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/15 bg-black/70 text-white shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 ease-out ${panelVisibilityClasses}`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="font-madmob text-lg tracking-wide">MAD_BOT</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-sm transition hover:border-white/40 hover:bg-white/10"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              —
            </button>
            <button
              type="button"
              onClick={closeWidget}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-sm transition hover:border-white/40 hover:bg-white/10"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
        </header>

        <div
          className={`grid transition-all duration-300 ${
            isMinimized ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              ref={messageContainerRef}
              className="h-[280px] space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => {
                const isUserMessage = message.sender === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        isUserMessage
                          ? "rounded-br-sm bg-[var(--accent-red)] text-white"
                          : "rounded-bl-sm border border-white/15 bg-white/10 text-white/95"
                      }`}
                    >
                      {message.text}
                      {message.isTyping ? (
                        <span className="ml-1 inline-flex gap-0.5 align-middle">
                          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white/90 [animation-delay:0ms]" />
                          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white/90 [animation-delay:150ms]" />
                          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white/90 [animation-delay:300ms]" />
                        </span>
                      ) : null}
                    </p>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
            >
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Ask MadBot..."
                className="h-10 flex-1 rounded-xl border border-white/15 bg-black/45 px-3 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-[var(--accent-red)]"
              />
              <button
                type="submit"
                className="h-10 rounded-xl bg-[var(--accent-red)] px-4 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {isIntroBubbleVisible ? (
        <button
          type="button"
          onClick={openWidget}
          className={`pointer-events-auto relative max-w-[240px] rounded-2xl border border-white/20 bg-black/85 px-4 py-3 text-center font-madmob text-sm text-white shadow-[0_0_20px_rgba(205,28,24,0.25)] backdrop-blur-sm transition hover:border-white/40 ${
            isIntroBubbleLeaving
              ? "animate-[madbotMistOut_0.6s_ease-out_forwards]"
              : "animate-[madbotMistIn_0.6s_ease-out_forwards]"
          }`}
          aria-label="Open MadBot chat"
        >
          Hello, wanna chat with MadBot?
          <span className="pointer-events-none absolute right-8 -bottom-2 h-4 w-4 rotate-45 border-r border-b border-white/20 bg-black/85" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={openWidget}
        className={`pointer-events-auto font-madmob rounded-full border border-white/20 bg-black px-5 py-3 text-sm tracking-wide text-white shadow-[0_0_0_rgba(205,28,24,0)] transition-all duration-300 hover:shadow-[0_0_18px_rgba(205,28,24,0.55)] ${
          isOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        MAD_BOT
      </button>
    </div>
  );
}
