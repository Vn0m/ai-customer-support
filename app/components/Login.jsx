'use client'

import { signInWithGoogle } from "../../lib/login";
import { Button, Container, Typography} from '@mui/material';
import { FaSpotify, FaGoogle } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();

    const handleLogin = async () => {
        const user = await signInWithGoogle();
        if (user) {
            router.push('/chatbot');
        }
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1DB954',
                textAlign: 'center',
            }}
        >
            <FaSpotify size={60} style={{ marginBottom: 24 }} />
            <Typography variant="h4" gutterBottom>Welcome to Spotify Chatbot</Typography>
            <Typography variant="subtitle1" marginBottom={4}>Sign in with Google to continue</Typography>
            <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                    backgroundColor: '#1DB954',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#1ED760',
                    },
                    padding: '10px 20px',
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
            >
                <FaGoogle size={20} style={{ marginRight: 8 }} />Sign in with Google
            </Button>
        </Container>
    );
}

export default Login;
