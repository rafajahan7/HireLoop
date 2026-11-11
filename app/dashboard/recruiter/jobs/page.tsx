
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import {
  Plus,
  MapPin,
  Globe2,
  Users,
  Pencil,
  Trash2,
  Code2,
  Palette,
  Cloud,
  Megaphone,
  Bot,
  BriefcaseBusiness,
} from "lucide-react";

import {
  getJobs,
  deleteJob,
  type Job,
} from "@/lib/api/jobs";

const categoryStyles: Record<
  string,
  { color: string; icon: typeof Code2 }
> = {
  Engineering: {
    color: "text-violet-400 bg-violet-500/10",
    icon: Code2,
  },
  Design: {
    color: "text-orange-400 bg-orange-500/10",
    icon: Palette,
  },
  Infrastructure: {
    color: "text-cyan-400 bg-cyan-500/10",
    icon: Cloud,
  },
  Marketing: {
    color: "text-purple-400 bg-purple-500/10",
    icon: Megaphone,
  },
  Quality: {
    color: "text-indigo-400 bg-indigo-500/10",
    icon: Bot,
  },
};

// Reusable Delete Button
function DeleteJobButton({
  job,
  deletingId,
  handleDelete,
}: {
  job: Job;
  deletingId: string | null;
  handleDelete: (id: string) => Promise<void>;
}) {
  const isDeleting = deletingId === job._id;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          title="Delete job"
          className="text-gray-400 hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={15} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this job post?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete "{job.jobTitle}"?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isDeleting}
            onClick={() => handleDelete(job._id)}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete Job"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function ManageJobsPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await getJobs();
        setJobs(result);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load job posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Delete Job
  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      await deleteJob(id);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== id)
      );

      toast.success("Job deleted successfully!");

      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete job. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#101012] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <span>Manage Jobs</span>
          <span>›</span>
          <span className="text-violet-400">
            Job Listings & Postings
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Manage Job Posts
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Review live listings, monitor applicants, and update job
              details across your organization.
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            <Plus size={17} />
            New Job Post
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border border-[#27272a] bg-[#151517] py-16 text-center text-sm text-gray-400">
            Loading job posts...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-500/20 bg-[#151517] py-16 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Desktop / Tablet Table */}
            <div className="hidden overflow-hidden rounded-xl border border-[#27272a] bg-[#151517] md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#27272a] bg-[#171719] text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      <th className="px-5 py-4">Job Title & Dept</th>
                      <th className="px-4 py-4">Company & Location</th>
                      <th className="px-4 py-4">Type</th>
                      <th className="px-4 py-4">Compensation</th>
                      <th className="px-4 py-4">Applicants</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4">Deadline</th>
                      <th className="px-4 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map((job) => {
                      const category =
                        categoryStyles[job.category] || {
                          color: "text-gray-400 bg-gray-500/10",
                          icon: BriefcaseBusiness,
                        };

                      const CategoryIcon = category.icon;

                      return (
                        <tr
                          key={job._id}
                          className="border-b border-[#242426] transition hover:bg-[#1b1b1e]"
                        >
                          {/* Job Title */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${category.color}`}
                              >
                                <CategoryIcon size={17} />
                              </div>

                              <div>
                                <p className="whitespace-nowrap text-sm font-medium text-gray-100">
                                  {job.jobTitle}
                                </p>
                                <p className="mt-1 text-xs text-violet-400">
                                  {job.category}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Company */}
                          <td className="px-4 py-4">
                            <p className="whitespace-nowrap text-sm text-gray-200">
                              {job.companyName}
                            </p>

                            <p className="mt-1 flex items-center gap-1 whitespace-nowrap text-xs text-gray-500">
                              {job.isRemote ? (
                                <Globe2 size={12} />
                              ) : (
                                <MapPin size={12} />
                              )}
                              {job.location}
                            </p>
                          </td>

                          {/* Job Type */}
                          <td className="px-4 py-4">
                            <span className="whitespace-nowrap rounded-full bg-[#252527] px-3 py-1.5 text-[11px] text-gray-300">
                              {job.jobType}
                            </span>
                          </td>

                          {/* Salary */}
                          <td className="px-4 py-4">
                            <span className="whitespace-nowrap text-xs text-gray-200">
                              {job.minSalary} – {job.maxSalary} / {job.frequency}
                            </span>
                          </td>

                          {/* Applicants */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-300">
                              <Users
                                size={14}
                                className="text-violet-400"
                              />
                              {job.applicants ?? 0} Candidates
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                                job.status === "Expired"
                                  ? "bg-gray-500/10 text-gray-400"
                                  : "bg-emerald-500/10 text-emerald-400"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  job.status === "Expired"
                                    ? "bg-gray-500"
                                    : "bg-emerald-400"
                                }`}
                              />
                              {job.status ?? "Active"}
                            </span>
                          </td>

                          {/* Deadline */}
                          <td className="px-4 py-4">
                            <p className="whitespace-nowrap text-xs text-gray-200">
                              {job.deadline
                                ? new Date(job.deadline).toLocaleDateString()
                                : "Not specified"}
                            </p>

                            <p className="mt-1 text-[10px] text-gray-500">
                              {job.posted ?? "Recently posted"}
                            </p>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                disabled
                                title="Edit functionality coming soon"
                                className="inline-flex items-center gap-1.5 rounded-md bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-300 opacity-70"
                              >
                                <Pencil size={12} />
                                Update
                              </button>

                              <DeleteJobButton
                                job={job}
                                deletingId={deletingId}
                                handleDelete={handleDelete}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {jobs.map((job) => {
                const category =
                  categoryStyles[job.category] || {
                    color: "text-gray-400 bg-gray-500/10",
                    icon: BriefcaseBusiness,
                  };

                const CategoryIcon = category.icon;

                return (
                  <div
                    key={job._id}
                    className="rounded-xl border border-[#29292d] bg-[#151517] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${category.color}`}
                        >
                          <CategoryIcon size={18} />
                        </div>

                        <div>
                          <h2 className="text-sm font-semibold text-gray-100">
                            {job.jobTitle}
                          </h2>
                          <p className="mt-1 text-xs text-violet-400">
                            {job.category}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] ${
                          job.status === "Expired"
                            ? "bg-gray-500/10 text-gray-400"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {job.status ?? "Active"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3 border-t border-[#29292d] pt-4 text-xs">
                      <div className="flex justify-between gap-3">
                        <span className="text-gray-500">Company</span>
                        <span className="text-right text-gray-300">
                          {job.companyName}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3">
                        <span className="text-gray-500">Location</span>
                        <span className="text-right text-gray-300">
                          {job.location}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3">
                        <span className="text-gray-500">Job Type</span>
                        <span className="text-gray-300">
                          {job.jobType}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3">
                        <span className="text-gray-500">Compensation</span>
                        <span className="text-gray-300">
                          {job.minSalary} – {job.maxSalary} / {job.frequency}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3">
                        <span className="text-gray-500">Applicants</span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <Users size={13} />
                          {job.applicants ?? 0} Candidates
                        </span>
                      </div>

                      <div className="flex justify-between gap-3">
                        <span className="text-gray-500">Deadline</span>
                        <span className="text-gray-300">
                          {job.deadline
                            ? new Date(job.deadline).toLocaleDateString()
                            : "Not specified"}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="mt-4 flex gap-2 border-t border-[#29292d] pt-4">
                      <button
                        type="button"
                        disabled
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-500/10 py-2.5 text-xs font-medium text-violet-300 opacity-70"
                      >
                        <Pencil size={13} />
                        Update
                      </button>

                      <div className="flex items-center justify-center rounded-lg bg-red-500/10 px-3">
                        <DeleteJobButton
                          job={job}
                          deletingId={deletingId}
                          handleDelete={handleDelete}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {jobs.length === 0 && (
              <div className="mt-4 rounded-xl border border-[#29292d] bg-[#151517] py-14 text-center">
                <BriefcaseBusiness
                  size={30}
                  className="mx-auto mb-3 text-gray-600"
                />

                <p className="text-sm text-gray-400">
                  No job posts available.
                </p>

                <Link
                  href="/dashboard/recruiter/jobs/new"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300"
                >
                  <Plus size={15} />
                  Create your first job post
                </Link>
              </div>
            )}

            {/* Footer */}
            <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-gray-500 sm:flex-row">
              <p>Showing {jobs.length} job posts</p>
              <p>Manage your organization&apos;s job listings</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
