
"use server";

import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";

export const createJob = async (data: Record<string, unknown>) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "recruiter") {
      return {
        success: false,
        message: "Only recruiters can create jobs.",
      };
    }

    if (!data.jobTitle || !data.companyName || !data.location) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    const result = await db.collection("jobs").insertOne({
      ...data,
      minSalary: Number(data.minSalary) || 0,
      maxSalary: Number(data.maxSalary) || 0,
      recruiterId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: "Job created successfully!",
      jobId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Create job error:", error);

    return {
      success: false,
      message: "Failed to create job.",
    };
  }
};
