"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { validateEmail } from "@/lib/validators";
import { requestPasswordReset } from "@/services/auth";
import { ROUTES } from "@/lib/constants";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await requestPasswordReset(email);

      // Don't reveal if email exists (security best practice)
      setMessage(
        "If an account with that email exists, a password reset link has been sent.",
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 p-4">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Image
              src="/images/logo.png"
              alt="Church of Pentecost"
              width={100}
              height={100}
            />
            <h1 className="mt-6 text-3xl font-semibold text-primary">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your email to receive a reset link.
            </p>
            <div className="mt-4 h-1 w-12 bg-secondary rounded-full" />
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftElement={<Mail className="h-4 w-4 text-primary" />}
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white"
              size="lg"
            >
              Send Reset Link
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="text-primary hover:text-secondary"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/bgImage.jpg"
          alt="Church"
          fill
          className="object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute bottom-16 left-16 text-white max-w-sm">
          <h2 className="text-3xl font-semibold leading-snug">
            Secure Access to Your Church Data.
          </h2>
        </div>
      </div>
    </div>
  );
}
