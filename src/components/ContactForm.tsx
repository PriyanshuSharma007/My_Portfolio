import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

import { profile } from '../mockData';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate a successful form submission locally
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Local Contact Form Submission:', data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-primary dark:bg-[#211F24] transition-colors duration-350 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-textMain dark:text-white tracking-tight font-sans mb-8">
          Contact
        </h2>

        {/* Logo (Hexagon with "pd" inner label) */}
        <div className="mb-6 flex justify-center">
          <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hexagonal border outer */}
            <polygon
              points="50,5 90,28 90,72 50,95 10,72 10,28"
              stroke="#FFC80A"
              strokeWidth="6"
              fill="#211F24"
            />
            {/* Hexagonal inner path shadow */}
            <polygon
              points="50,15 80,32 80,68 50,85 20,68 20,32"
              fill="#211F24"
            />
            {/* Logo initials text */}
            <text
              x="50"
              y="60"
              fill="#FFC80A"
              fontSize="34"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              ps
            </text>
          </svg>
        </div>

        {/* Email Address Circle Button */}
        <div className="flex items-center justify-center gap-3 mb-10 select-none">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2e2b33] shadow-sm border border-gray-100 dark:border-transparent flex items-center justify-center text-textMain dark:text-gray-300 transition-colors">
            <Mail size={16} />
          </div>
          <span className="text-base font-semibold text-textMain dark:text-white">
            {profile?.email || 'priyanshu3808sharma@gmail.com'}
          </span>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-5">

          {/* Name Field */}
          <div>
            <input
              {...register("name")}
              type="text"
              className="w-full px-5 py-3.5 rounded-xl border border-gray-300 dark:border-neutral-750 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-[#252229] dark:text-white shadow-sm transition-all placeholder:text-gray-400 placeholder:font-medium"
              placeholder="Name"
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500 text-left font-medium">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <input
              {...register("email")}
              type="email"
              className="w-full px-5 py-3.5 rounded-xl border border-gray-300 dark:border-neutral-755 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-[#252229] dark:text-white shadow-sm transition-all placeholder:text-gray-400 placeholder:font-medium"
              placeholder="Email"
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500 text-left font-medium">{errors.email.message}</p>}
          </div>

          {/* Message Field */}
          <div>
            <textarea
              {...register("message")}
              rows={5}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-300 dark:border-neutral-759 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-[#252229] dark:text-white shadow-sm transition-all placeholder:text-gray-400 placeholder:font-medium resize-none"
              placeholder="Message"
            ></textarea>
            {errors.message && <p className="mt-1.5 text-xs text-red-500 text-left font-medium">{errors.message.message}</p>}
          </div>

          {/* Cloudflare Turnstile Mock Captcha widget */}
          <div className="py-2">
            <div className="flex items-center justify-between w-64 mx-auto bg-[#2b2b2b] text-white px-4 py-2.5 rounded border border-neutral-700 text-xs select-none">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </div>
                <span className="font-semibold text-neutral-200">Success!</span>
              </div>
              <div className="flex flex-col items-end text-[9px] text-neutral-400 leading-tight">
                <span className="font-extrabold text-[#f48220] uppercase tracking-wider text-[8px]">Cloudflare</span>
                <span>Privacy • Help</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-40 inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#8a8a8a] hover:bg-neutral-500 dark:bg-neutral-600 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed select-none"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {isSuccess && (
            <p className="mt-4 text-sm text-green-600 font-semibold">Message sent successfully!</p>
          )}
        </form>

      </div>
    </section>
  );
};

export default ContactForm;
