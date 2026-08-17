'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { propertyTypes } from '@/content/property-types';
import { site } from '@/config/site';
import { useSite } from '@/components/providers/SiteProvider';
import { Button } from '@/components/ui/Button';
import { getAttribution, markLeadSubmitted } from '@/lib/attribution';
import { track } from '@/lib/analytics';
import { isValidIndianMobile, isValidName, normalisePhone } from '@/lib/validation';
import { cn } from '@/lib/utils';

export type FormVariant = 'hero' | 'inline' | 'modal' | 'popup';

type Props = {
  variant: FormVariant;
  /** Which page the form sits on. Sent as source_page. */
  sourcePage: string;
  /** Prefills and tags the lead when opened from a service card. */
  serviceInterest?: string;
  /** Prefills the property type dropdown when the page already knows it. */
  defaultPropertyType?: string;
  submitLabel?: string;
  /** Popup and modal variants use a tighter three-field layout. */
  compact?: boolean;
  onSuccess?: () => void;
  className?: string;
};

export function LeadForm({
  variant,
  sourcePage,
  serviceInterest,
  defaultPropertyType,
  submitLabel = 'Get my free design consultation',
  compact = false,
  onSuccess,
  className,
}: Props) {
  const router = useRouter();
  const { markLeadConverted, setFormFieldFocused } = useSite();

  const uid = useId();
  const nameId = `${uid}-name`;
  const phoneId = `${uid}-phone`;
  const propertyId = `${uid}-property`;
  const messageId = `${uid}-message`;
  const errorId = `${uid}-error`;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState(defaultPropertyType ?? '');
  /*
   * Adopt a new default property type if the page supplies one. Compared during
   * render rather than synced in an effect, which is React's documented way to
   * adjust state on a prop change and avoids a wasted render pass.
   */
  const [lastDefault, setLastDefault] = useState(defaultPropertyType);
  if (defaultPropertyType !== lastDefault) {
    setLastDefault(defaultPropertyType);
    setPropertyType(defaultPropertyType ?? '');
  }
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean }>({
    name: false,
    phone: false,
  });

  /*
   * Stamped in an effect rather than during render: Date.now() is impure, and a
   * render-time read would also be wrong under streaming, where the server
   * render happens well before the visitor sees the field.
   */
  const mountedAt = useRef<number>(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const nameError = touched.name && !isValidName(name) ? 'Please enter your name.' : null;
  const phoneError =
    touched.phone && !isValidIndianMobile(phone)
      ? 'Enter a 10 digit mobile number starting with 6, 7, 8 or 9.'
      : null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, phone: true });

    if (!isValidName(name) || !isValidIndianMobile(phone)) {
      setError('Please check the highlighted fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError(null);

    const attribution = getAttribution();

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalisePhone(phone),
          propertyType,
          message: message.trim() || undefined,
          source_page: sourcePage,
          form_variant: variant,
          service_interest: serviceInterest,
          company,
          // Omitted rather than sent as a huge number if the effect never ran,
          // so a legitimate submission is never rejected as spam.
          elapsedMs: mountedAt.current === 0 ? undefined : Date.now() - mountedAt.current,
          ...attribution,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Something went wrong. Please call us instead.');
      }

      markLeadSubmitted();
      markLeadConverted();

      track('generate_lead', {
        form_variant: variant,
        source_page: sourcePage,
        service_interest: serviceInterest ?? '',
        property_type: propertyType || 'not specified',
      });

      if (variant === 'popup') track('popup_converted', { source_page: sourcePage });

      onSuccess?.();
      router.push('/thank-you');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please call us instead.');
    }
  }

  const fieldClass =
    'w-full rounded-xl border bg-white px-4 py-3 text-body text-ink-900 placeholder:text-ink-400 transition-colors focus:border-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-1';

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('w-full', className)}>
      {/*
        Honeypot. Hidden from sight and from assistive tech, but present in the
        DOM so an automated submitter fills it. Paired with a minimum fill time
        in lib/validation.ts.
      */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className={cn('grid gap-3', !compact && 'sm:grid-cols-2')}>
        <div className={cn(!compact && 'sm:col-span-1')}>
          <label htmlFor={nameId} className="mb-1.5 block text-body-sm font-medium text-ink-700">
            Your name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFormFieldFocused(true)}
            onBlur={() => {
              setFormFieldFocused(false);
              setTouched((t) => ({ ...t, name: true }));
            }}
            placeholder="Full name"
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? `${nameId}-err` : undefined}
            className={cn(fieldClass, nameError ? 'border-accent-600' : 'border-ink-200')}
          />
          {nameError ? (
            <p id={`${nameId}-err`} className="mt-1 text-caption text-accent-700">
              {nameError}
            </p>
          ) : null}
        </div>

        <div className={cn(!compact && 'sm:col-span-1')}>
          <label htmlFor={phoneId} className="mb-1.5 block text-body-sm font-medium text-ink-700">
            Mobile number
          </label>
          <div className="flex">
            <span
              className="inline-flex select-none items-center rounded-l-xl border border-r-0 border-ink-200 bg-ink-50 px-3 text-body text-ink-600"
              aria-hidden="true"
            >
              +91
            </span>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              maxLength={13}
              autoComplete="tel-national"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setFormFieldFocused(true)}
              onBlur={() => {
                setFormFieldFocused(false);
                setTouched((t) => ({ ...t, phone: true }));
              }}
              placeholder="98765 43210"
              aria-invalid={phoneError ? true : undefined}
              aria-describedby={phoneError ? `${phoneId}-err` : undefined}
              className={cn(
                fieldClass,
                'rounded-l-none',
                phoneError ? 'border-accent-600' : 'border-ink-200',
              )}
            />
          </div>
          {phoneError ? (
            <p id={`${phoneId}-err`} className="mt-1 text-caption text-accent-700">
              {phoneError}
            </p>
          ) : null}
        </div>

        <div className={cn(!compact && 'sm:col-span-2')}>
          <label htmlFor={propertyId} className="mb-1.5 block text-body-sm font-medium text-ink-700">
            Property type
          </label>
          <select
            id={propertyId}
            name="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            onFocus={() => setFormFieldFocused(true)}
            onBlur={() => setFormFieldFocused(false)}
            className={cn(fieldClass, 'border-ink-200 appearance-none bg-[length:1rem] pr-10')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%233E5C72' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m5 8 5 5 5-5'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.9rem center',
            }}
          >
            <option value="">Select your property</option>
            {propertyTypes.map((p) => (
              <option key={p.id} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {!compact ? (
          <div className="sm:col-span-2">
            <label htmlFor={messageId} className="mb-1.5 block text-body-sm font-medium text-ink-700">
              Anything we should know <span className="font-normal text-ink-500">(optional)</span>
            </label>
            <textarea
              id={messageId}
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFormFieldFocused(true)}
              onBlur={() => setFormFieldFocused(false)}
              placeholder="Locality, possession date, or what you want done first"
              className={cn(fieldClass, 'resize-y border-ink-200')}
            />
          </div>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-3 rounded-lg bg-accent-50 px-3 py-2 text-body-sm text-accent-800">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={status === 'submitting'}
        className="mt-4"
        aria-describedby={error ? errorId : undefined}
      >
        {status === 'submitting' ? 'Sending...' : submitLabel}
      </Button>

      {site.responsePromise.enabled ? (
        <p className="mt-2.5 text-center text-body-sm font-medium text-ink-700">
          {site.responsePromise.text}
        </p>
      ) : null}

      {/* Consent line sits by the submit button, with the policy linked beneath it. */}
      <p className="mt-3 text-caption leading-relaxed text-ink-500">
        By submitting, you agree to be contacted by {site.name} by phone, SMS or WhatsApp about your
        enquiry.
        <br />
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink-700">
          Read our privacy policy
        </Link>
      </p>
    </form>
  );
}
