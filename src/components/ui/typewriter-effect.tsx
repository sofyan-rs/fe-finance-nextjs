"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  /** Array of texts to cycle through */
  texts: string[];
  /** Typing speed in milliseconds (default: 100) */
  typeSpeed?: number;
  /** Backspace speed in milliseconds (default: 50) */
  backSpeed?: number;
  /** Delay between texts in milliseconds (default: 2000) */
  delayBetween?: number;
  /** Delay before starting the effect (default: 0) */
  startDelay?: number;
  /** Whether to show blinking cursor (default: true) */
  showCursor?: boolean;
  /** Custom cursor character (default: "|") */
  cursorChar?: string;
  /** Whether to loop through texts (default: true) */
  loop?: boolean;
  /** Class name for the container */
  className?: string;
  /** Class name for the text */
  textClassName?: string;
  /** Class name for the cursor */
  cursorClassName?: string;
  /** Callback when typing is complete (all texts shown once) */
  onComplete?: () => void;
}

export function TypewriterEffect({
  texts,
  typeSpeed = 100,
  backSpeed = 50,
  delayBetween = 2000,
  startDelay = 0,
  showCursor = true,
  cursorChar = "|",
  loop = true,
  className,
  textClassName,
  cursorClassName,
  onComplete,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!texts.length) return;

    const startTyping = () => {
      setHasStarted(true);
      typeText();
    };

    if (startDelay > 0) {
      timeoutRef.current = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [texts, startDelay]);

  const typeText = () => {
    const currentText = texts[currentTextIndex];

    if (isTyping) {
      // Typing forward
      if (displayText.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing current text
        if (texts.length === 1 && !loop) {
          // Single text, no loop - we're done
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete?.();
          }
          return;
        }

        // Wait before starting to backspace or moving to next
        timeoutRef.current = setTimeout(() => {
          if (texts.length > 1) {
            setIsTyping(false); // Start backspacing
          } else if (loop) {
            // Single text with loop - restart
            setDisplayText("");
            timeoutRef.current = setTimeout(typeText, delayBetween);
          }
        }, delayBetween);
      }
    } else {
      // Backspacing
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, backSpeed);
      } else {
        // Finished backspacing, move to next text
        const nextIndex = (currentTextIndex + 1) % texts.length;
        setCurrentTextIndex(nextIndex);
        setIsTyping(true);

        // Check if we've completed a full cycle
        if (nextIndex === 0 && !loop) {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete?.();
          }
          return;
        }

        timeoutRef.current = setTimeout(typeText, typeSpeed);
      }
    }
  };

  useEffect(() => {
    if (hasStarted) {
      typeText();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, currentTextIndex, isTyping, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;

    const blinkInterval = setInterval(() => {
      setShowCursorBlink((prev) => !prev);
    }, 530); // Standard cursor blink rate

    return () => clearInterval(blinkInterval);
  }, [showCursor]);

  return (
    <span className={cn("inline-block", className)}>
      <span className={cn("", textClassName)}>{displayText}</span>
      {showCursor && (
        <span
          className={cn(
            "ml-0.5 inline-block transition-opacity duration-100",
            showCursorBlink ? "opacity-100" : "opacity-0",
            cursorClassName
          )}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}

// Simplified version for single text
interface SimpleTypewriterProps {
  /** Single text to type */
  text: string;
  /** Typing speed in milliseconds (default: 100) */
  typeSpeed?: number;
  /** Delay before starting (default: 0) */
  startDelay?: number;
  /** Whether to show cursor (default: true) */
  showCursor?: boolean;
  /** Custom cursor character (default: "|") */
  cursorChar?: string;
  /** Class name for the container */
  className?: string;
  /** Class name for the text */
  textClassName?: string;
  /** Class name for the cursor */
  cursorClassName?: string;
  /** Callback when typing is complete */
  onComplete?: () => void;
}

export function SimpleTypewriter({
  text,
  typeSpeed = 100,
  startDelay = 0,
  showCursor = true,
  cursorChar = "|",
  className,
  textClassName,
  cursorClassName,
  onComplete,
}: SimpleTypewriterProps) {
  return (
    <TypewriterEffect
      texts={[text]}
      typeSpeed={typeSpeed}
      startDelay={startDelay}
      showCursor={showCursor}
      cursorChar={cursorChar}
      loop={false}
      className={className}
      textClassName={textClassName}
      cursorClassName={cursorClassName}
      onComplete={onComplete}
    />
  );
}

// Hook for programmatic control
export function useTypewriter(
  texts: string[],
  options?: Partial<TypewriterEffectProps>
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const reset = () => {
    setCurrentIndex(0);
    setIsComplete(false);
  };

  const next = () => {
    if (currentIndex < texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    currentIndex,
    isComplete,
    reset,
    next,
    previous,
    TypewriterComponent: () => (
      <TypewriterEffect
        texts={[texts[currentIndex]]}
        {...options}
        onComplete={() => setIsComplete(true)}
      />
    ),
  };
}
