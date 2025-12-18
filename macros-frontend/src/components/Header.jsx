import gymLogo from '../assets/GYM.png'

export default function Header() {
    return (
        <header
            style={{
                padding: '16px 20px',
                borderBottom: '2px solid #eee',
                background: 'white',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                textAlign: 'center',
                fontFamily: 
                    'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
            }}
        >
        <h1
          style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 600,
            lineHeight: 1.2, 
          }}
        >
          Get Your Macros 
        </h1>
        <img
            src={gymLogo}
            alt="GYM logo"
            width={120}
            height= {120}
            style={{ marginTop: 12 }}
            decoding="async"
            loading="eager"
        />
        </header>
    );
}