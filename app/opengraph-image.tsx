import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Harmanpreet Singh - Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Green accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #22c55e, #16a34a)',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ color: '#22c55e', fontSize: '24px', fontWeight: 700 }}>harmanita.com</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ color: '#22c55e', fontSize: '28px', fontWeight: 700 }}>{'>'}</span>
            <h1 style={{ color: '#ffffff', fontSize: '64px', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              Harmanpreet Singh
            </h1>
          </div>

          <p style={{ color: '#a1a1aa', fontSize: '28px', margin: 0, fontWeight: 500 }}>
            Full Stack Developer & Software Engineer
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            {['React', 'Next.js', 'Node.js', 'Flutter', 'TypeScript'].map((tech) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  color: '#22c55e',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '18px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#22c55e', fontSize: '18px' }}>🏆</span>
              <span style={{ color: '#d4d4d8', fontSize: '18px' }}>Google Winner · Hack Canada 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#22c55e', fontSize: '18px' }}>👥</span>
              <span style={{ color: '#d4d4d8', fontSize: '18px' }}>1,000+ App Users</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
