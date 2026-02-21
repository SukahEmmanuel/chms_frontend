"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { validateLoginForm } from "@/lib/validators";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors = validateLoginForm(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // temporary fake login delay (optional)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // redirect directly
      route.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 p-4">
      {/* LEFT SIDE – FORM */}
      <div className="flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10">
            <Image
              src="/images/logo.png"
              alt="Church of Pentecost"
              width={100}
              height={100}
            />
            <h1 className="mt-6 text-3xl font-mulish font-semibold text-primary">
              Pentecost Church Portal
            </h1>
            <p className="mt-2 text-sm text-gray-500 font-mulish">
              Sign in to manage your church.
            </p>

            {/* Yellow Accent Line */}
            <div className="mt-4 h-1 w-12 bg-secondary rounded-full" />
          </div>

          {serverError && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@cophq.org"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              leftElement={
                <Mail className="h-4 w-4 text-primary font-mulish" />
              }
            />

            <div>
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                leftElement={<Lock className="h-4 w-4 text-primary" />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-gray-500 hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              <div className="mt-2 text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-secondary transition-colors font-mulish"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-mulish cursor-pointer"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-sm text-gray-500 font-mulish">
            Don’t have access?{" "}
            <span className="text-gray-700 font-mulish">
              Contact your administrator.
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/bgImage.jpg"
          alt="Church"
          fill
          className="object-cover rounded-2xl"
        />

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-primary/80" />

        {/* Yellow Accent Corner */}
        {/* <div className="absolute top-0 right-0 w-32 h-32 bg-secondary clip-triangle" /> */}

        <div className="absolute bottom-16 left-16 text-white max-w-sm">
          <h2 className="text-3xl font-mulish font-semibold leading-snug">
            Empowering Assemblies Through Technology.
          </h2>
        </div>
      </div>
    </div>
  );
}
