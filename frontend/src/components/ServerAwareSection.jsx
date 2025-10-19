// ServerAwareSection.jsx
import React, { useEffect, useRef, useState } from 'react';

/**
 * Props:
 * - healthUrl (string) : full URL to your backend health endpoint (required)
 * - initialDelayMs (number) : delay before first check (default 0)
 * - baseIntervalMs (number) : base backoff interval (default 5000)
 * - maxBackoffMs (number) : max backoff (default 60000)
 * - maxRetries (number) : give up after this many tries (default 10)
 * - onReady (fn) : optional async callback to run once health returns OK (e.g. getDoctorsData).
 *                  If provided, the overlay will wait for onReady() to resolve to a truthy value
 *                  before switching to 'ready'. If onReady() returns falsy or throws, the component
 *                  shows an error state and allows manual retry.
 */
export default function ServerAwareSection({
  children,
  healthUrl,
  initialDelayMs = 0,
  baseIntervalMs = 5000,
  maxBackoffMs = 60000,
  maxRetries = 10,
  onReady, 
}) {
  if (!healthUrl) {
    throw new Error('ServerAwareSection: healthUrl prop is required');
  }

  const [status, setStatus] = useState('checking'); // 'checking' | 'ready' | 'error'
  const mountedRef = useRef(true);
  const abortRef = useRef(null);
  const attemptsRef = useRef(0);
  const calledOnReadyRef = useRef(false);
  const nextTimerRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;

    async function checkOnce() {
      if (!mountedRef.current) return;

      attemptsRef.current += 1;
      const attemptNum = attemptsRef.current;

      // Abort previous if any
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      // append timestamp to avoid cached 304
      const url = `${healthUrl}${healthUrl.includes('?') ? '&' : '?'}_=${Date.now()}`;

      try {
        const res = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!mountedRef.current) return;

        if (res.ok) {
          // If an onReady callback was provided, wait for it to complete successfully.
          if (typeof onReady === 'function' && !calledOnReadyRef.current) {
            try {
              calledOnReadyRef.current = true; // avoid double-calling
              // allow onReady to return boolean success or just resolve
              const result = await onReady();
              // If onReady returns falsy, treat as error (so user can retry)
              if (result) {
                setStatus('ready');
                return;
              } else {
                setStatus('error');
                return;
              }
            } catch (err) {
              console.error('onReady callback failed:', err);
              setStatus('error');
              return;
            }
          } else {
            // No onReady provided, or already called — mark ready
            setStatus('ready');
            return;
          }
        } else {
          // non-200 (server responded but maybe not ready)
          setStatus('checking');
        }
      } catch (err) {
        // fetch failed or aborted
        setStatus('checking');
      }

      // schedule next with exponential backoff + jitter
      if (attemptNum < maxRetries && mountedRef.current) {
        const backoff = Math.min(baseIntervalMs * 2 ** (attemptNum - 1), maxBackoffMs);
        const jitter = Math.floor(Math.random() * (backoff * 0.25)); // up to 25% jitter
        nextTimerRef.current = setTimeout(checkOnce, backoff + jitter);
      } else if (mountedRef.current) {
        setStatus('error'); // give up after max attempts
      }
    }

    // initial kick-off
    nextTimerRef.current = setTimeout(checkOnce, initialDelayMs);

    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    };
    // including onReady intentionally so callback changes will be respected
  }, [healthUrl, baseIntervalMs, maxBackoffMs, maxRetries, initialDelayMs, onReady]);

  // manual retry handler if user clicks retry
  const handleRetry = async () => {
    // reset attempts and onReady call flag so we can re-run everything
    attemptsRef.current = 0;
    calledOnReadyRef.current = false;
    setStatus('checking');

    // do one eager check: health + onReady
    try {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch(`${healthUrl}?_=${Date.now()}`, {
        cache: 'no-store',
        signal: controller.signal,
      });

      if (res.ok) {
        if (typeof onReady === 'function') {
          try {
            const result = await onReady();
            if (result) {
              setStatus('ready');
              return;
            } else {
              setStatus('error');
              return;
            }
          } catch (e) {
            console.error('retry onReady failed', e);
            setStatus('error');
            return;
          }
        } else {
          setStatus('ready');
          return;
        }
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      {children}

      {/* Overlay: only show when not ready */}
      {status !== 'ready' && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm p-4"
        >
          <div className="max-w-sm text-center">
            <div className="flex items-center justify-center">
              {/* Tailwind spinner: uses animate-spin */}
              <svg className="h-10 w-10 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>

            <p className="mt-3 text-base font-medium text-gray-900">
              {status === 'checking' ? 'Server is starting — please wait...' : 'Server not responding.'}
            </p>

            {status === 'checking' && (
              <p className="mt-1 text-sm text-gray-600">We’ll try to connect automatically. This may take a minute.</p>
            )}

            {status === 'error' && (
              <div className="mt-3 flex flex-col items-center gap-3">
                <p className="text-sm text-red-600">Unable to reach the server right now.</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleRetry}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Retry
                  </button>
                  <a
                    href={healthUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Open health URL
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
