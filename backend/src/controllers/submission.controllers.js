import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status.json(200)({
      success: true,
      message: "Submissions fetched Successfully",
      submissions,
    });
  } catch (error) {
    console.error("Error while fetching Submissions", error);
    return res.status(500).json({
      error: "Error while fetching Submissions",
    });
  }
};

export const getSubmissionForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.problemId;
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Submission fetched Successfully",
      submissions,
    });
  } catch (error) {
    console.error("Error while fetching Submission", error);
    return res.status(500).json({
      error: "Error while fetching Submission",
    });
  }
};

export const getAllTheSubmissionsForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const submission = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Submission fetched Successfully",
      count: submission,
    });
  } catch (error) {
    console.error("Error while fetching Submissiosn", error);
    return res.status(500).json({
      error: "Error while fetching Submissiosn",
    });
  }
};
