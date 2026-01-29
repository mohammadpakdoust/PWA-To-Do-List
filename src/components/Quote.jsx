import { useState, useEffect } from 'react';
import quotes from '../data/quotes.json';
import { Quote as QuoteIcon } from 'lucide-react';

const Quote = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });

    useEffect(() => {
        // Pick a random quote on mount
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }, []);

    if (!quote.text) return null;

    return (
        <div className="card quote-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '10px', opacity: 0.1 }}>
                <QuoteIcon size={80} color="var(--color-primary)" />
            </div>
            <blockquote style={{ margin: 0, position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '1rem', lineHeight: '1.6' }}>
                    "{quote.text}"
                </p>
                <footer style={{ textAlign: 'right', color: 'var(--color-text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
                    — {quote.author}
                </footer>
            </blockquote>
        </div>
    );
};

export default Quote;
