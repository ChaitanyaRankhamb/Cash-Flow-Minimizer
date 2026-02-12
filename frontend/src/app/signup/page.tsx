"use client";

import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";

import { useForm } from "@tanstack/react-form";
import { showToast } from "@/lib/authToast";
import { ArrowRightIcon, ArrowRightToLine } from "lucide-react";

export default function SignUP() {
  const authSchema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username must be at most 20 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores."
      ),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Invalid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password must be at most 64 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number, and special character."
      ),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: authSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
      });

      try {
        const res = await fetch("http://localhost:4000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(value),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          console.log("error happened!");
          showToast(
            "Signup failed",
            errorData?.message ?? "Something went wrong.",
            "top-center"
          );
          return;
        }

        const data = await res.json();
        console.log(data);
        showToast(
          "Signup successful",
          "Your account has been created.",
          "top-center"
        );
      } catch (err) {
        console.log(err);
        showToast("Network error", "Please try again later.", "top-center");
      }
    },
  });

  return (
    <div
      className="relative flex items-center justify-center min-h-screen 
  bg-gradient-to-br from-primary/10 via-background to-primary/5 
  dark:from-primary/20 dark:via-background dark:to-primary/10 
  p-4 overflow-hidden"
    >
      <Card
        className="w-full sm:max-w-md 
    backdrop-blur-xl bg-background/80 dark:bg-background/70
    border border-primary/20
    shadow-2xl shadow-primary/10
    rounded-2xl
    transition-all duration-300
    hover:shadow-primary/20"
      >
        <CardHeader className="text-center space-y-2">
          <CardTitle
            className="text-2xl font-bold tracking-tight 
        bg-gradient-to-r from-primary to-primary/70 
        bg-clip-text text-transparent"
          >
            CashFlow Accout
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Create your account to manage expenses efficiently
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-5">
              {/* Username */}
              <form.Field
                name="username"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="font-medium text-foreground"
                      >
                        Username
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="username"
                        autoComplete="username"
                        className="border-border/60 
                    bg-background/60 dark:bg-background/40
                    focus:ring-2 focus:ring-primary/40
                    focus:border-primary
                    transition-all duration-200
                    rounded-lg
                    shadow-sm hover:shadow-md"
                      />
                      <FieldDescription className="text-xs text-muted-foreground">
                        3–20 characters. Letters, numbers, and underscores only.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Email */}
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="font-medium text-foreground"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="example@email.com"
                        autoComplete="email"
                        className="border-border/60 
                    bg-background/60 dark:bg-background/40
                    focus:ring-2 focus:ring-primary/40
                    focus:border-primary
                    transition-all duration-200
                    rounded-lg
                    shadow-sm hover:shadow-md"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Password */}
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="font-medium text-foreground"
                      >
                        Password
                      </FieldLabel>
                      <InputGroup>
                        <Input
                          type="password"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter strong password"
                          autoComplete="new-password"
                          className="border-border/60 
                      bg-background/60 dark:bg-background/40
                      focus:ring-2 focus:ring-primary/40
                      focus:border-primary
                      transition-all duration-200
                      rounded-lg
                      shadow-sm hover:shadow-md"
                        />
                      </InputGroup>
                      <FieldDescription className="text-xs text-muted-foreground">
                        Minimum 8 characters. Must include uppercase, lowercase,
                        number, and special character.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col justify-center space-y-4 pt-4">
          <Button
            type="submit"
            form="signup-form"
            className="w-[250px] 
        bg-gradient-to-r from-primary to-primary/80
        text-primary-foreground 
        shadow-lg shadow-primary/20
        hover:shadow-xl hover:shadow-primary/30
        hover:scale-[1.02]
        transition-all duration-300
        rounded-xl font-semibold tracking-wide"
          >
            Submit
          </Button>

          <div>
            <h4 className="mt-2 flex text-sm text-muted-foreground justify-center">
              Already have account?{" "}
              <a
                href="/login"
                className="pl-1 inline-flex items-center 
            text-primary font-medium
            hover:underline hover:text-primary/80
            transition-colors duration-200"
              >
                Login
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </a>
            </h4>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
