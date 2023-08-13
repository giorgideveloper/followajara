"use client";
import Checkbox from "@/components/Form/Checkbox";
import Input from "@/components/Form/Input";
import { getRandomInt, randomString } from "@/utils/random";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref } from "yup";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/l10n/ka.js";
import "flatpickr/dist/themes/material_green.css";

const getCharacterValidationError = (str: string) => {
  return `პაროლი უნდა შეიცავდეს მინიმუმ 1 ${str}`;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required("* აუცილებელი ველი"),
    lastname: yup.string().required("* აუცილებელი ველი"),
    email: yup.string().email("არასწორი ფორმატი").required("* აუცილებელი ველი"),
    birthday: yup.date().required("* აუცილებელი ველი"),
    tel: yup
      .string()
      .length(9, "ნომერი უნდა შედგებოდეს 9 ციფრისაგან!")
      .matches(/^[0-9]+$/, "გამოიყენეთ მხოლოდ ციფრები!")
      .required("* აუცილებელი ველი"),
    personalNumber: yup
      .string()
      .length(11, "პირადი ნომერი უნდა შედგებოდეს 11 ციფრისაგან!")
      .matches(/^[0-9]+$/, "გამოიყენეთ მხოლოდ ციფრები!")
      .required("* აუცილებელი ველი"),
    password: yup
      .string()
      .required("* შეიყვანეთ პაროლი")
      .min(8, "პაროლი უნდა შედგებოდეს მინუმუმ 8 სიმბოლოსგან")
      .matches(/[0-9]/, getCharacterValidationError("ციფრს"))
      .matches(/[a-z]/, getCharacterValidationError("პატარა ასოს"))
      .matches(/[A-Z]/, getCharacterValidationError("დიდ ასოს")),
    rePassword: yup
      .string()
      .required("* გაიმეორეთ პაროლი")
      .oneOf([ref("password")], "პაროლები არ ემთხვევა"),
    fb: yup.string()
      .when(['ig', 'yt', 'tk'], {
        is: (ig: string, yt: string, tk: string) => !ig && !yt && !tk,
        then: () => yup.string().required('* მიუთითეთ მინიმუმ ერთი სოციალური ქსელი.'),
      }),
    ig: yup.string()
      .when(['fb', 'yt', 'tk'], {
        is: (fb: string, yt: string, tk: string) => !fb && !yt && !tk,
        then: () => yup.string().required('* მიუთითეთ მინიმუმ ერთი სოციალური ქსელი.'),
      }),
    yt: yup.string()
      .when(['fb', 'ig', 'tk'], {
        is: (fb: string, ig: string, tk: string) => !fb && !ig && !tk,
        then: () => yup.string().required('* მიუთითეთ მინიმუმ ერთი სოციალური ქსელი.'),
      }),
    tk: yup.string()
      .when(['fb', 'ig', 'yt'], {
        is: (fb: string, ig: string, yt: string) => !fb && !ig && !yt,
        then: () => yup.string().required('* მიუთითეთ მინიმუმ ერთი სოციალური ქსელი.'),
      }),
    avatar_url: yup.string().required("* აუცილებელი ველი"),
    rules: yup.boolean().required("* გთხოვთ დაეთანხმოთ წესებს და პირობებს"),
  }, [['fb', 'ig'], ['ig', 'fb'], ['fb', 'yt'], ['fb', 'tk'], ['ig', 'yt'], ['ig', 'tk'], ['yt', 'tk']])
  .required();

interface RegisterFormProps { }

const RegisterForm: FC<RegisterFormProps> = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<any> = async (values) => {
    const { email, password, rules, ...rest } = values;

    try {
      setError("");
      setConfirmation(false);

      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...rest,
            tour: getRandomInt(1, 8),
          },
        },
      });

      if (error) {
        console.log("erorrr");
        throw error;
      }

      // if (onSub) onSub()
      if (data) {
        console.log("balaa");

        setConfirmation(true);
        reset();

        // router.reload()
      }
    } catch (error) {
      //@ts-ignore
      setError(error?.message);

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className=" w-full space-y-4 my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <strong className="ml-2">პირადი ინფორმაცია</strong>
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="სახელი"
                  placeholder="მაგ: გიორგი"
                  aria-invalid={errors.name ? "true" : "false"}
                />
              )}
            />
            {errors.name && (
              <span className="text-red-700 text-sm mt-2">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="lastname"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} label="გვარი" placeholder="მაგ: ბერიძე" />
              )}
            />
            {errors.lastname && (
              <span className="text-red-700 text-sm mt-2">
                {errors.lastname.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Controller
              name="personalNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="პირადი ნომერი"
                  placeholder="მაგ: 61001010010"
                  aria-invalid={errors.personalNumber ? "true" : "false"}
                />
              )}
            />
            {errors.personalNumber && (
              <span className="text-red-700 text-sm mt-2">
                {errors.personalNumber?.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className="text-lg font-medium text-gray-900">
              <span className="text-base label-text">დაბადების თარიღი</span>
            </label>
            <Controller
              name="birthday"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{
                    dateFormat: "Y-m-d",
                    minDate: "1900-01-01",
                    maxDate: "2005-12-31",
                    locale: "ka",
                  }}
                  placeholder="აირჩიეთ დაბადების თარიღი"
                  className="w-full input input-bordered mt-2 text-md text-gray-500"
                />
              )}
            />
            {errors.birthday && (
              <span className="text-red-700 text-sm mt-2">
                {errors.birthday.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Controller
              name="password"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="პაროლი"
                  placeholder="მაგ: Password123!"
                />
              )}
            />
            {errors.password && (
              <span className="text-red-700 text-sm mt-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="rePassword"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="გაიმეორეთ პაროლი"
                  placeholder="მაგ: Password123!"
                />
              )}
            />
            {errors.rePassword && (
              <span className="text-red-700 text-sm mt-2">
                {errors.rePassword.message}
              </span>
            )}
          </div>
        </div>
        <h3 className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <strong className="ml-2">საკონტაქტო ინფორმაცია</strong>
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Controller
              name="tel"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="ტელეფონი"
                  placeholder="მაგ: 555112233"
                />
              )}
            />
            {errors.tel && (
              <span className="text-red-700 text-sm mt-2">
                {errors.tel.message}
              </span>
            )}
            {/* {errors.tel && <span className="text-red-700 text-sm mt-2">* აუცილებელი ველი</span>} */}
          </div>
          <div className="w-full">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="ელ. ფოსტა"
                  placeholder="მაგ: giorgiberidze@mail.com"
                />
              )}
            />
            {errors.email && (
              <span className="text-red-700 text-sm mt-2">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <h3 className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          <strong className="ml-2">სოციალური ქსელები</strong>
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Controller
              name="fb"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="url"
                  label="Facebook"
                  placeholder="https://www.facebook.com/*********/"
                />
              )}
            />
            {errors.fb && (
              <span className="text-red-700 text-sm mt-2">
                {errors.fb.message}
              </span>
            )}

          </div>
          <div className="w-full">
            <Controller
              name="ig"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="url"
                  label="Instagram"
                  placeholder="https://www.instagram.com/*********/"
                />
              )}
            />
            {errors.ig && (
              <span className="text-red-700 text-sm mt-2">
                {errors.ig.message}
              </span>
            )}

          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Controller
              name="yt"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="url"
                  label="YouTube"
                  placeholder="https://www.youtube.com/@*********/"
                />
              )}
            />
            {errors.yt && (
              <span className="text-red-700 text-sm mt-2">
                {errors.yt.message}
              </span>
            )}

          </div>
          <div className="w-full">
            <Controller
              name="tk"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="url"
                  label="TikTok"
                  placeholder="https://www.tiktok.com/@*********/"
                />
              )}
            />
            {errors.tk && (
              <span className="text-red-700 text-sm mt-2">
                {errors.tk.message}
              </span>
            )}
          </div>
        </div>
        <h3 className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <strong className="ml-2">თქვენი ფოტო</strong>
        </h3>
        <Controller
          name="avatar_url"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              type="file"
              label=""
              className="file-input file-input-bordered w-full"
              onChange={async (e: any) => {
                setLoading(true);
                const name = randomString(16);
                const { data, error } = await supabase.storage
                  .from("avatars")
                  .upload(name, e.target.files[0]);

                field.onChange(data?.path ?? "");
                setLoading(false);
              }}
            />
          )}
        />
        {errors.avatar_url && (
          <span className="text-red-700 text-sm mt-2">
            {errors.avatar_url.message}
          </span>
        )}
        <Controller
          name="rules"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, ...rest } }) => (
            <Checkbox {...rest} label="ვეთანხმები წესებს და პირობებს" />
          )}
        />
        {errors.rules && (
          <span className="text-red-700 text-sm mt-2">
            {errors.rules.message}
          </span>
        )}
        {/* {errors.rules && <span className="text-red-700 mt-2">* გთხოვთ დაეთანხმოთ წესებს და პირობებს</span>} */}
        <div>
          <button
            className="btn btn-block btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner"></span>}
            რეგისტრაცია
          </button>
        </div>
        {/* {error && <span className="text-red-700 mt-2">{error}</span>} */}
        {confirmation && (
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>შეამოწმეთ ელ.ფოსტა და დაადასტურეთ ანგარიში!</span>
          </div>
        )}
      </form>
      <span className="mt-3">
        გაქვთ ანგარიში?
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {" "}
          შესვლა
        </Link>
      </span>
    </>
  );
};

export default RegisterForm;
