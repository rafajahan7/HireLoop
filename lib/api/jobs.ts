
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Job Type
export type Job = {
  _id: string;
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  minSalary: number;
  maxSalary: number;
  frequency: string;
  deadline?: string;
  responsibilities?: string;
  requirements?: string;
  applicants?: number;
  status?: "Active" | "Expired";
  posted?: string;
};

// Get All Jobs
export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const result: Job[] = await response.json();

  return result;
};

// Delete Job
export const deleteJob = async (id: string): Promise<void> => {
  if (!id) {
    throw new Error("Job ID is required");
  }

  const response = await fetch(
    `${BASE_URL}/jobs/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || "Failed to delete job"
    );
  }
};
