import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children, role }) {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    if (role && session.user.role !== role) {
        if (typeof window !== 'undefined') router.push('/unauthorized');
        return null;
    }

    return children;
}