// src/components/SubscribeForm.tsx
// Email newsletter subscription form connecting to Loops.so.
// Includes honeypot field for basic bot protection.

import type { FormEvent, ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import classNames from 'classnames';
import Translate, { translate } from '@docusaurus/Translate';

interface SubscribeFormProps {
  className?: string;
  inputBgColor?: string;
}

const LOOPS_ENDPOINT = 'https://app.loops.so/api/newsletter-form/cm9mjezmt4kn9x98ppgfr1h67';

const SubscribeForm: FC<SubscribeFormProps> = ({ className, inputBgColor = '' }) => {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot field — must stay empty
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Honeypot: silently succeed if a bot filled the hidden field
      if (hp && hp.trim() !== '') {
        setMessage(translate({ id: 'newsletter.success', message: 'Thank you for subscribing! 🙏' }));
        return;
      }

      const params = new URLSearchParams();
      params.set('userGroup', '');
      params.set('email', email);

      const res = await fetch(LOOPS_ENDPOINT, {
        method: 'POST',
        body: params.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (res.ok) {
        setMessage(translate({ id: 'newsletter.success', message: 'Thank you for subscribing! 🙏' }));
        setEmail('');
      } else {
        setMessage(translate({ id: 'newsletter.error', message: '🛑 Oops! Something went wrong. Please try again.' }));
      }
    } catch {
      setMessage(translate({ id: 'newsletter.error', message: '🛑 Oops! Something went wrong. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const placeholder = translate({ id: 'newsletter.email.placeholder', message: 'you@domain.com' });
  const submitLabel = translate({ id: 'newsletter.submit', message: 'Subscribe' });

  return (
    <>
      {message ? (
        <p className="text-lg text-neutral-500 dark:text-neutral-400">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className={classNames('sm:flex', className)}>
          {/* Honeypot — hidden from real users, visible only to bots */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <label>
              Do not fill this field
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setHp(e.target.value)}
              />
            </label>
          </div>

          <input
            aria-label={placeholder}
            type="email"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            id="email-address"
            required
            autoComplete="email"
            placeholder={placeholder}
            disabled={isLoading}
            className={classNames(
              'w-full appearance-none rounded-md border border-yellow-500 px-4 py-2 text-sm',
              'placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400',
              inputBgColor
            )}
          />

          <div className="mt-3 rounded-md sm:ml-3 sm:mt-0">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm text-white transition duration-200 ease-out hover:bg-yellow-400 disabled:opacity-50"
            >
              {isLoading ? translate({ id: 'newsletter.submitting', message: 'Subscribing…' }) : submitLabel}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SubscribeForm;
