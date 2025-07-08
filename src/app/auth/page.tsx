"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { User } from "@/types/user";
import { convertPersianDigitsToEnglish } from "@/utils/convertPersianDigits";
import confetti from "canvas-confetti";
import { FormikHelpers, useFormik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import styles from "./Auth.module.scss";

const validationSchema = Yup.object({
  phone: Yup.string()
    .transform((value) => convertPersianDigitsToEnglish(value))

    .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامیست"),
});

interface FormValues {
  phone: string;
}

const AuthPage = () => {
  const router = useRouter();
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    } else {
      setLoadingUserData(false);
    }
  }, [router, user]);

  const formik = useFormik<FormValues>({
    initialValues: { phone: "" },
    validationSchema,
    onSubmit: async (
      values: FormValues,
      { setSubmitting, setFieldError }: FormikHelpers<FormValues>
    ) => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
        const data = await res.json();
        const user: User = data.results[0];
        localStorage.setItem("user", JSON.stringify(user));
        setRedirecting(true);
        router.replace("/dashboard");
        toast.success("بسیار خوش اومدی 🎉");
        confetti({ spread: 70 });
      } catch {
        setFieldError("phone", "خطا در ورود. لطفاً دوباره تلاش کنید.");
        setSubmitting(false);
      }
    },
  });

  if (loadingUserData) return null;

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.formContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h1 className={styles.title}>ورود به دشبورد</h1>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Input
            label="شماره موبایل"
            name="phone"
            placeholder="09123456789"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""
            }
            required
            minLength={11}
            maxLength={11}
            disabled={formik.isSubmitting || redirecting}
          />

          <Button
            fullWidth
            type="submit"
            disabled={formik.isSubmitting || redirecting}
          >
            {formik.isSubmitting || redirecting ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
