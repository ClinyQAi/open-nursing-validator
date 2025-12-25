import { useState } from 'react';
import {
    CheckCircle,
    AlertCircle,
    Clipboard,
    Activity,
    ShieldCheck,
    ChevronRight,
    Info,
    Github
} from 'lucide-react';

const TEMPLATES = {
    NEWS2: {
        resourceType: "Observation",
        status: "final",
        code: {
            coding: [{ system: "http://loinc.org", code: "88330-6", display: "NEWS2 Total Score" }]
        },
        subject: { reference: "Patient/example" },
        effectiveDateTime: new Date().toISOString(),
        valueInteger: 3
    },
    BradenScale: {
        resourceType: "Observation",
        status: "final",
        code: {
            coding: [{ system: "http://loinc.org", code: "38222-1", display: "Braden Scale Total Score" }]
        },
        subject: { reference: "Patient/example" },
        valueInteger: 18
    },
    Patient: {
        resourceType: "Patient",
        id: "example",
        name: [{ family: "Gombedza", given: ["Lincoln"] }],
        gender: "male",
        birthDate: "1985-05-20"
    },
    WoundAssessment: {
        resourceType: "Observation",
        status: "final",
        code: {
            coding: [{ system: "http://snomed.info/sct", code: "399912005", display: "Pressure Ulcer" }]
        },
        subject: { reference: "Patient/example" },
        effectiveDateTime: new Date().toISOString(),
        valueCodeableConcept: {
            coding: [{ system: "http://snomed.info/sct", code: "420555000", display: "Stage 3" }]
        },
        component: [
            {
                code: { coding: [{ system: "http://snomed.info/sct", code: "410668003", display: "Length" }] },
                valueQuantity: { value: 4.5, unit: "cm", system: "http://unitsofmeasure.org", code: "cm" }
            },
            {
                code: { coding: [{ system: "http://snomed.info/sct", code: "410669006", display: "Width" }] },
                valueQuantity: { value: 3.2, unit: "cm", system: "http://unitsofmeasure.org", code: "cm" }
            }
        ]
    }
};

function App() {
    const [jsonInput, setJsonInput] = useState(JSON.stringify(TEMPLATES.NEWS2, null, 2));
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleValidate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/validate-nursing-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonInput
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ status: 'error', message: 'Connection to validator service failed.' });
        } finally {
            setLoading(false);
        }
    };

    const loadTemplate = (key: keyof typeof TEMPLATES) => {
        setJsonInput(JSON.stringify(TEMPLATES[key], null, 2));
        setResult(null);
    };

    return (
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
            {/* Header */}
            <header style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: '#005EB8', padding: '8px', borderRadius: '10px' }}>
                            <ShieldCheck color="white" size={28} />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#005EB8' }}>NHS Unified Nursing Validator</h1>
                    </div>
                    <p style={{ color: '#768692', fontSize: '1.1rem' }}>Spec-driven FHIR validation for clinical documentation.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="https://github.com/ClinyQAi/nhs-unified-nursing-validator" target="_blank" style={{ color: '#212B32' }}>
                        <Github size={24} />
                    </a>
                </div>
            </header>

            <main style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
                {/* Input Column */}
                <section>
                    <div className="premium-card" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Clipboard size={20} /> FHIR JSON Input
                            </h2>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {Object.keys(TEMPLATES).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => loadTemplate(key as any)}
                                        style={{
                                            padding: '4px 10px',
                                            fontSize: '0.8rem',
                                            borderRadius: '6px',
                                            border: '1px solid #E8EDEE',
                                            background: 'white'
                                        }}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            spellCheck={false}
                            style={{
                                flex: 1,
                                minHeight: '400px',
                                width: '100%',
                                padding: '16px',
                                fontFamily: 'monospace',
                                fontSize: '14px',
                                border: '1px solid #E8EDEE',
                                borderRadius: '8px',
                                backgroundColor: '#f8fafc',
                                resize: 'none',
                                outline: 'none',
                                lineHeight: '1.5'
                            }}
                        />

                        <button
                            onClick={handleValidate}
                            disabled={loading}
                            style={{
                                marginTop: '16px',
                                padding: '14px',
                                background: '#005EB8',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%'
                            }}
                        >
                            {loading ? 'Validating...' : <>Validate Payload <ChevronRight size={18} /></>}
                        </button>
                    </div>
                </section>

                {/* Results Column */}
                <section>
                    <div className="premium-card" style={{ padding: '24px', height: '100%' }}>
                        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            <Activity size={20} /> Validation Status
                        </h2>

                        {!result && (
                            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#768692' }}>
                                <Info size={48} strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.5 }} />
                                <p>Paste your FHIR JSON data and click validate to see results.</p>
                            </div>
                        )}

                        {result && result.status === 'success' && (
                            <div style={{
                                background: '#E6F4EA',
                                border: '1px solid #34A853',
                                padding: '24px',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <CheckCircle color="#1E8E3E" size={64} style={{ marginBottom: '16px' }} />
                                <h3 style={{ color: '#1E8E3E', fontSize: '1.5rem', marginBottom: '8px' }}>Resource Valid</h3>
                                <p style={{ color: '#1E8E3E' }}>Payload strictly complies with ONC-IG / NHS standards.</p>
                            </div>
                        )}

                        {result && result.status === 'error' && (
                            <div style={{
                                background: '#FEEEEE',
                                border: '1px solid #D0021B',
                                padding: '20px',
                                borderRadius: '12px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <AlertCircle color="#D0021B" size={32} />
                                    <h3 style={{ color: '#D0021B', fontSize: '1.25rem' }}>Validation Failed</h3>
                                </div>

                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <pre style={{
                                        fontSize: '0.85rem',
                                        background: 'rgba(208, 2, 27, 0.05)',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {JSON.stringify(result.errors || result.message, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}

                        <footer style={{ marginTop: 'auto', paddingTop: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#768692' }}>
                                <Info size={14} />
                                <span>Validation against FHIR R4 & ONC-IG v1.0.0</span>
                            </div>
                        </footer>
                    </div>
                </section>
            </main>

            <footer style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #E8EDEE', paddingTop: '20px' }}>
                <p style={{ color: '#768692', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} Lincoln Gombedza - Nursing Citizen Development
                </p>
            </footer>
        </div>
    );
}

export default App;
