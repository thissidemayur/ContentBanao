"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const router = useRouter()

    const submitRegistrationData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("password are not matching")
            return
        }

        try {
            setIsLoading(true)
            setError("")
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json();


            if (!res.ok) {
                setError(data.error || "Regiestration failed!")
            }
            if (res.ok) {
                setIsLoading(false)
                setSuccess(true)
                setTimeout(() => {
                    router.push("/login")
                }, 3000);
            }

        } catch (err) {
            if (err instanceof Error) setError(err?.message)
            else setError("An unexpected error occured")
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div>
            <h1>Register</h1>
            {error && <p className='bg-red-700 text-white text-2xl'>{error}</p>}
            {success && <p className='bg-green-700 text-white text-2xl'>{"User created successfully!"}</p>}
            <form onSubmit={submitRegistrationData}>
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

                {/* revalidate password */}
                <div></div>
                <input
                    type="text"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder='confirm password'
                />
                <div></div>

                <button type='submit' disabled={isLoading ? true : false} > {isLoading ? "sigining..." : "login"}</button>

            </form>
            <div><p>lready have an account? <a href="/login">Login</a></p></div>
        </div>
    )
}

export default page