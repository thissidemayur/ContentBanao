"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const router = useRouter()

    const submitLoginData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        if (!password) {
            setError("Password field is empty")
            return;
        }

        try {
            setIsLoading(true)
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false, // stay on same page to handle manually
            })

            if (result?.error === 'CredentialsSignin' || !result?.ok || result.error) {
                console.error(result?.error)
                setError(result?.error || "error while siginig in")
                return;
            } else {
                setIsLoading(false)
                setSuccess(true)
                setTimeout(() => {
                    router.push("/")
                }, 2000);
            }


        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error) setError(error.message)
            else setError("something went wrong while loging");
        }
    }


    return (
        <div>
            <h1>Login</h1>

            {error && <p className='bg-red-700 text-white text-2xl'>{error}</p>}
            {success && <p className='bg-green-700 text-white text-2xl'>{"login Successfully!"}</p>}
            <form onSubmit={submitLoginData}>
                {/* email */}
                <div></div>
                <input
                    type='email'
                    placeholder='xyz@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/*  password */}
                <div></div>
                <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='password'
                />

                <div></div>

                {
                    <button type='submit' disabled={isLoading ? true : false} > {isLoading ? "sigining..." : "login"}</button>
                }
            </form>
            <div>
                <p>Dont have an account? </p>
                <button onClick={() => router.push("/register")}>Register</button>
            </div>
        </div>
    )
}

export default LoginPage