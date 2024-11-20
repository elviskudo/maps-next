import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data) => {
        // Handle email/password login
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email and Password Fields */}
                <button type="submit">Login</button>
            </form>
            <button onClick={() => signIn('google')}>Sign in with Google</button>
            <button onClick={() => signIn('apple')}>Sign in with Apple</button>
        </div>
    );
}