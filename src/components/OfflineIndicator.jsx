import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const OfflineIndicator = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '999px',
                backgroundColor: isOnline ? 'var(--color-success)' : 'var(--color-danger)',
                color: '#fff',
                fontWeight: '600',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
            }}
        >
            {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
    );
};

export default OfflineIndicator;
