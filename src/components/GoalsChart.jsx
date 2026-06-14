import { useState } from 'react';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function GoalsChart({ data }) {
  const [hovered, setHovered] = useState(null);
  if (!data?.length) return null;

  const maxGoals = Math.max(...data.map((d) => d.totalGoals));
  const W = 800;
  const H = 220;
  const PAD_L = 8;
  const PAD_R = 8;
  const PAD_B = 36;
  const PAD_T = 12;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_B - PAD_T;
  const barW = Math.max(8, Math.floor(chartW / data.length) - 4);
  const step = chartW / data.length;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ overflow: 'visible' }}
        aria-label="Goals per World Cup edition"
      >
        {data.map((d, i) => {
          const barH = (d.totalGoals / maxGoals) * chartH;
          const x = PAD_L + i * step + (step - barW) / 2;
          const y = PAD_T + chartH - barH;
          const isHov = hovered === i;
          const showLabel = i % 2 === 0 || data.length <= 12;

          return (
            <g key={d.year}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={3}
                fill={isHov ? '#1FA463' : 'rgba(31,164,99,0.55)'}
                style={{ transition: 'fill 0.15s' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Year label */}
              {showLabel && (
                <text
                  x={x + barW / 2}
                  y={H - 6}
                  textAnchor="middle"
                  fontSize={10}
                  fill="rgba(255,255,255,0.3)"
                  fontFamily="monospace"
                >
                  {String(d.year).slice(2)}
                </text>
              )}
              {/* Tooltip */}
              {isHov && (
                <g>
                  <rect
                    x={Math.min(x + barW / 2 - 40, W - 88)}
                    y={Math.max(y - 56, 4)}
                    width={88}
                    height={44}
                    rx={6}
                    fill="#121820"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={1}
                  />
                  <text
                    x={Math.min(x + barW / 2 - 40, W - 88) + 44}
                    y={Math.max(y - 56, 4) + 16}
                    textAnchor="middle"
                    fontSize={14}
                    fontWeight="900"
                    fill="#ffffff"
                    fontFamily={DISPLAY}
                    letterSpacing="-0.03em"
                  >
                    {d.year}
                  </text>
                  <text
                    x={Math.min(x + barW / 2 - 40, W - 88) + 44}
                    y={Math.max(y - 56, 4) + 30}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#1FA463"
                    fontFamily="monospace"
                  >
                    {d.totalGoals}g · {d.avgPerGame}/game
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {/* Baseline */}
        <line
          x1={PAD_L}
          y1={PAD_T + chartH}
          x2={W - PAD_R}
          y2={PAD_T + chartH}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
