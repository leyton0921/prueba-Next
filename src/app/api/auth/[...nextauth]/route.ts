import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";



declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        username: string;
        phone: string;
    }

    interface Session {
        user: User;
    }
}


interface IUser {
    id: string;
    name: string;
    email: string;
    username: string;
    phone: string;
}


const authenticateUser = async (username: string, password: string): Promise<IUser | null> => {
    try {
        const response = await fetch("http://192.168.88.39:7000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            const { user } = data;
            return { id: user.id, name: user.name, email: user.email, username: user.username, phone: user.phone };
        } else {
            throw new Error(data.message || "Invalid username or password");
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
};

const registerUser = async (name: string, email: string, password: string, username: string, phone: string): Promise<IUser | null> => {
    try {
        const response = await fetch("http://192.168.88.39:7000/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, username, phone }),
        });

        const data = await response.json();

        if (response.ok) {
            const { user } = data;
            return { id: user.id, name: user.name, email: user.email, username: user.username, phone: user.phone };
        } else {
            throw new Error(data.message || "Error registering user");
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: { username: string; password: string } | undefined) {
                console.log('Attempting to authenticate:', credentials);
                const user = await authenticateUser(credentials!.username, credentials!.password);
                if (user) {
                    console.log('User authenticated successfully:', user);
                    return user;
                } else {
                    console.error('Authentication failed for:', credentials!.username);
                    throw new Error("Invalid username or password");
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = session.user || {};
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.username = token.username as string;
            }
            return session;
        },
    },

    secret: "abcd.123",
    debug: true,
    session: {
        strategy: "jwt",
    },
});

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { name, username, password, phone, email } = req.body;
        const user = await registerUser(name, email, password, username, phone);
        if (user) {
            res.status(201).json({ user });
        } else {
            res.status(400).json({ message: "Error registering user" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export { handler as GET, handler as POST, registerHandler as register };
