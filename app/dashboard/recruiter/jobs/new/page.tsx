
"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createJob } from "@/lib/actions/jobs";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

export default function NewJobPage() {
  const [jobType, setJobType] = useState("Full-time");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const jobData = {
    ...Object.fromEntries(formData.entries()),
    jobType,
    isRemote,
  };

  try {
    console.log("New Job:", jobData);

    const result = await createJob(jobData);

    console.log("Server response:", result);

  } catch (error) {
    console.error("Failed to create job:", error);
  }
};

  const inputStyle =
    "border-zinc-800 bg-[#222225] text-white placeholder:text-zinc-500 focus-visible:ring-purple-500";

  const sectionStyle =
    "rounded-xl border border-zinc-800/70 bg-[#151517] p-5";

  return (
    <div className="min-h-screen bg-[#101012] p-4 text-white md:p-7">

      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <p className="mb-2 text-xs text-zinc-500">
              Manage Jobs <span className="mx-1">›</span> Create New Listing
            </p>

            <h1 className="text-2xl font-bold tracking-tight">
              Post a New Job
            </h1>

            <p className="mt-1 text-xs text-zinc-500">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <Button
            type="submit"
            className="bg-[#6355f5] text-white shadow-lg shadow-purple-900/20 hover:bg-[#5143df]"
          >
            Publish Job →
          </Button>

        </div>

        <div className="space-y-5">

          {/* 1. Basic Information */}
          <section className={sectionStyle}>

            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#765cff]" />
              1. Basic Information
            </h2>

            <div className="space-y-4">

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="jobTitle">
                  Job Title <span className="text-red-400">*</span>
                </Label>

                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Frontend Developer"
                  required
                  className={inputStyle}
                />
              </div>

              {/* Company and Category */}
              <div className="grid gap-4 md:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Company Name <span className="text-red-400">*</span>
                  </Label>

                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="▦ HirePulse Network"
                    required
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Job Category <span className="text-red-400">*</span></Label>

                  <Select name="category" defaultValue="engineering">
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="engineering">Engineering & Tech</SelectItem>
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label>
                  Job Type <span className="text-red-400">*</span>
                </Label>

                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setJobType(type)}
                      className={`rounded-lg border py-2.5 text-xs transition ${
                        jobType === type
                          ? "border-[#765cff] bg-[#252238] text-white"
                          : "border-zinc-800 bg-[#202023] text-zinc-400 hover:bg-zinc-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* 2. Location, Compensation & Timeline */}
          <section className={sectionStyle}>

            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#765cff]" />
              2. Location, Compensation & Timeline
            </h2>

            <div className="space-y-4">

              {/* Remote Switch */}
              <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-[#202023] p-3">

                <div>
                  <p className="text-sm font-medium">
                    ◉ Remote Work Allowed (isRemote)
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>

                <Switch
                  checked={isRemote}
                  onCheckedChange={setIsRemote}
                />

              </div>

              {/* Location and Deadline */}
              <div className="grid gap-4 md:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Job Location <span className="text-red-400">*</span>
                  </Label>

                  <Input
                    id="location"
                    name="location"
                    placeholder="⌖ New York, USA"
                    required
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">
                    Application Deadline (deadline)
                  </Label>

                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    className={inputStyle}
                  />
                </div>

              </div>

              {/* Salary */}
              <div className="grid gap-4 md:grid-cols-3">

                <div className="space-y-2">
                  <Label htmlFor="minSalary">Min Salary / Rate</Label>

                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min="0"
                    placeholder="€ 25"
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSalary">Max Salary / Rate</Label>

                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min="0"
                    placeholder="€ 40"
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Frequency</Label>

                  <Select name="frequency" defaultValue="hour">
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="hour">Per hour</SelectItem>
                      <SelectItem value="day">Per day</SelectItem>
                      <SelectItem value="week">Per week</SelectItem>
                      <SelectItem value="month">Per month</SelectItem>
                      <SelectItem value="year">Per year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

            </div>
          </section>

          {/* 3. Responsibilities & Requirements */}
          <section className={sectionStyle}>

            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#765cff]" />
              3. Responsibilities & Requirements
            </h2>

            <div className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="responsibilities">
                  Key Responsibilities <span className="text-red-400">*</span>
                </Label>

                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="Describe the responsibilities of this position..."
                  required
                  className={`${inputStyle} min-h-[110px] resize-y`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">
                  Qualifications & Requirements <span className="text-red-400">*</span>
                </Label>

                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the qualifications, skills, and experience required..."
                  required
                  className={`${inputStyle} min-h-[110px] resize-y`}
                />
              </div>

            </div>
          </section>

        </div>

        {/* Bottom Publish Button */}
        <div className="mt-5 flex justify-end">
          <Button
            type="submit"
            className="bg-[#6355f5] px-6 text-white hover:bg-[#5143df]"
          >
            Publish Job →
          </Button>
        </div>

      </form>
    </div>
  );
}
