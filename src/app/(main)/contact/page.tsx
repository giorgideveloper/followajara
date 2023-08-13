"use client";

import Input from "@/components/Form/Input";
import { sendMail } from "./action";

import { useRef, useState } from "react";
import Submit from "./form";
import { openGraphImage } from "@/app/shared-metadata";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "კონტაქტი",
  openGraph: {
    ...openGraphImage,
    title: "კონტაქტი",
  },
};

const Page = () => {
  const [status, setStatus] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const formHandle = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const response = await sendMail(data);

    if (response?.status === 200) setStatus(response.message);
    formRef?.current?.reset();
  };

  return (
    <div className="container mx-auto px-4">
      <div className="card w-full bg-base-100 shadow-xl mt-5">
        <div className="card-body grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="my-auto">
            <iframe
              className="shadow-xl rounded-lg"
              src="https://contact-map.vercel.app"
              width="100%"
              height="375"
            ></iframe>
          </div>
          <div>
            <h2 className="card-title">დაგვიკავშირდით</h2>
            <form className="w-full" action={formHandle} ref={formRef}>
              <div className="flex flex-col gap-4 my-6 w-full">
                <Input
                  name="name"
                  label="სახელი"
                  placeholder="თქვენი სახელი"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  label="ელ. ფოსტა"
                  placeholder="თქვენი ელ. ფოსტა"
                  required
                />
                <Input
                  name="subject"
                  label="სათაური"
                  placeholder="წერილის სათაური"
                  required
                />
                <div>
                  <label className="text-lg font-medium text-gray-900">
                    <span className="text-base label-text">წერილი</span>
                  </label>
                  <textarea
                    name="text"
                    className="textarea textarea-bordered w-full"
                    placeholder="თქვენი წერილი..."
                    required
                  ></textarea>
                </div>
                <div>
                  <Submit></Submit>
                </div>
              </div>

              {status == "success" && (
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
                  <span>შეტყობინება წარმატებით გაიგზავნა!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-10 my-10 justify-between items-start">
        <div className="">
          <h3 className="text-lg mb-3">დაგვირეკეთ</h3>
          <p className="text-slate-600 text-sm">(+995) 599 16 99 09</p>
        </div>

        <div className="">
          <h3 className="text-lg mb-3">მოგვწერეთ</h3>
          <p className="text-slate-600 text-sm">
            <a href="mailto:infovisitbatumi@gmail.com">
              infovisitbatumi@gmail.com
            </a>
          </p>
        </div>
        {/* <div className="contents">
                </div> */}
        <div className="">
          <h3 className="text-lg mb-3">მისამართი</h3>
          <p className="text-slate-600 text-sm">84/86 ფარნავაზ მეფის ქუჩა,</p>
          <p className="text-slate-600 text-sm">ბათუმი, აჭარა, საქართველო</p>
          <p className="text-slate-600 text-sm">6010</p>
        </div>

        <div className="">
          <h3 className="text-lg mb-3">ჩვენი ვებ-გვერდები</h3>
          <p className="text-slate-600 text-sm">
            <a
              href="https://visitbatumi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              visitbatumi.com
            </a>
          </p>
          <p className="text-slate-600 text-sm">
            <a
              href="https://batumievents.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              batumievents.com
            </a>
          </p>
          <p className="text-slate-600 text-sm">
            <a
              href="https://visitajara.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              visitajara.com
            </a>
          </p>
          <p className="text-slate-600 text-sm">
            <a
              href="https://infoajara.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              infoajara.com
            </a>
          </p>
          <p className="text-slate-600 text-sm">
            <a
              href="https://batumibirdfest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              batumibirdfest.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
