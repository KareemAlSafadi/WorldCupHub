import { getFlagClass } from '../lib/flags';

// Inline styles are used for width/height/backgroundSize because flag-icons CSS
// is unlayered and therefore wins over Tailwind v4 @layer utilities at equal
// specificity — inline styles always win regardless of layer.
const DIMS = {
  sm: { width: '24px', height: '16px' },
  md: { width: '32px', height: '20px' },
  lg: { width: '40px', height: '28px' },
};

const TEXT = { sm: 'text-[9px]', md: 'text-[10px]', lg: 'text-xs' };

export default function FlagBadge({ code, size = 'md' }) {
  const flagClass = getFlagClass(code);

  if (flagClass) {
    return (
      <span
        className={`${flagClass} inline-block shrink-0 overflow-hidden rounded ring-1 ring-white/10`}
        style={{ ...DIMS[size], backgroundSize: 'cover', backgroundPosition: 'center' }}
        title={code}
      />
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded bg-white/10 font-semibold tracking-wide text-white/90 ring-1 ring-white/10 ${TEXT[size]}`}
      style={DIMS[size]}
      title={code}
    >
      {code}
    </span>
  );
}
