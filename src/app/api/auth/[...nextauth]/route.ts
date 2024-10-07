import NextAuth, { User as NextAuthUser} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";

interface IUser {
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        username: string;
        phone: string;
    };
}

declare module "next-auth" {
    interface User extends IUser {}
    interface Session {
        user: IUser;
    }
}

const API_URL =  "http://192.168.88.39:7000";

const authenticateUser = async (username: string, password: string): Promise<IUser | null> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            return {
                ...data.user,
                access_token: data.access_token,
            };
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
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, username, phone }),
        });

        const data = await response.json();

        if (response.ok) {
            return {
                ...data.user,
                access_token: data.access_token,
            };
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
            async authorize(credentials) {
                const user = await authenticateUser(credentials!.username, credentials!.password);
                if (user) {
                    return user as NextAuthUser; 
                } else {
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
                token = { ...token, ...user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user.access_token = token.access_token as string
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
