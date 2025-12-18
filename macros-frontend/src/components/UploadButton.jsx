/* button that has hidden file opener so user can click button, open file, and upload */

import { useRef } from 'react';

export default function UploadButton({ onClick, disabled=false }) {

    // keeps a handle (reference) to the hidden <input> 
    const inputRef = useRef(null);


    return (
        <section style={{ textAlign: 'center'}}>
            { /* label above button */ }
            <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>
                Upload Menu Item Picture 
            </p>

            { /* hidden file input -- opens file picker */ }
            <input
                ref={inputRef}
                type="file"
                accept="image/*"                    // limit to images
                style={{ display: 'none' }}        // hide it -- use button created below instead
                onChange={(e) => {       
                    const file = e.target.files?.[0] ?? null;
                    if (file) onClick?.(file)         // padd file up to parent    
                }}
            />

            { /* button that triggers hidden input */ }
            <button 
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}     // opens file picker
            style={{
                padding: '12px 18px',
                borderRadius: 10,
                border: '1px solid #e5e7eb',
                background: disabled ? '#4b5563' : '#111827',
                color: 'white',
                fontWeight: 600,
                cursor: disabled ? 'not-allowed' : 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,.05)',
            }}
            >
                {disabled ? 'Uploading...' : 'Upload'}

            </button>
        </section>
    );
}