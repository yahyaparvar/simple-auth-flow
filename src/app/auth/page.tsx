"use client";

import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

import Button from "@/components/button";
import Input from "@/components/input";
import { convertPersianDigitsToEnglish } from "@/utils/convertPersianDigits";
import styles from "./Auth.module.scss";

const validationSchema = Yup.object({
  phone: Yup.string()
    .transform((value) => convertPersianDigitsToEnglish(value))
    .test(
      "is-valid-phone",
      "لطفا اعداد را به صورت لاتین وارد کنید",
      (value) => {
        return /^[0-9]*$/.test(value ?? "");
      }
    )
    .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامیست"),
});

interface FormValues {
  phone: string;
}

const AuthPage = () => {
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
        // I'm gonna call the api to get the user data
      } catch (error) {
        console.log(error);
        setFieldError("phone", "خطا در ورود. لطفاً دوباره تلاش کنید.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
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
          />

          <Button fullWidth type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
