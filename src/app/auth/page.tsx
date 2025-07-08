"use client";

import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

import Button from "@/components/button";
import Input from "@/components/input";
import { convertPersianDigitsToEnglish } from "@/utils/convertPersianDigits";
import { motion } from "framer-motion"; // 👈 Import motion
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import styles from "./Auth.module.scss";

const validationSchema = Yup.object({
  phone: Yup.string()
    .transform((value) => convertPersianDigitsToEnglish(value))
    .test("is-valid-phone", "لطفا اعداد را به صورت لاتین وارد کنید", (value) =>
      /^[0-9]*$/.test(value ?? "")
    )
    .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامیست"),
});

interface FormValues {
  phone: string;
}

const AuthPage = () => {
  const router = useRouter();
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/dashboard");
    } else {
      setLoadingUserData(false);
    }
  }, [router]);

  const formik = useFormik<FormValues>({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: async (
      values: FormValues,
      { setSubmitting, setFieldError }: FormikHelpers<FormValues>
    ) => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
        const data = await res.json();
        const user = data.results[0];
        localStorage.setItem("user", JSON.stringify(user));
        router.replace("/dashboard");
        toast.success("بسیار خوش اومدی 🎉");
      } catch (error) {
        console.log(error);
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
            disabled={formik.isSubmitting}
          />

          <Button fullWidth type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
