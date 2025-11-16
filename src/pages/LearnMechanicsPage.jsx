import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LearnMechanicsPage() {
    const navigate = useNavigate();
    
    // Redirect directly to journey/sections page
    useEffect(() => {
        navigate('/learn/sections', { replace: true });
    }, [navigate]);

    // Return null while redirecting
    return null;
}
