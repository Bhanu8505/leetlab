import { db } from "../libs/db.js";

export const getAllListDetails = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playlists,
    });
  } catch (error) {
    console.error("Error fetching playlist: ", error);
    return res.status(500).json({
      error: "Failed to fetch playlists",
    });
  }
};

export const getPlayListDetails = async (req, res) => {
  const { playListId } = req.params;
  try {
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error fetching playlist: ", error);
    return res.status(500).json({
      error: "Failed to fetch playlists",
    });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;
    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error creating playlist: ", error);
    return res.status(500).json({
      error: "Failed to create playlist",
    });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing problemId",
      });
    }

    //Create records for each problem in the playlist

    const problemsInPlaylist = await db.problemsInPlaylist.createMany({
      data: problemIds.map((problemId) => {
        playlistId, problemId;
      }),
    });

    res.status(201).json({
      success: true,
      message: "Problem added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error adding problem in playlist: ", error);
    return res.status(500).json({
      error: "Failed to add problem in playlist",
    });
  }
};

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });
  } catch (error) {
    console.error("Error deleting playlist: ", error);
    return res.status(500).json({
      error: "Failed to delete playlist",
    });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  const { playListId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problem) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing problemIds",
      });
    }
    const deletedProblem = await db.problemsInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem removed from playlist successfully",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error removing problem from playlist: ", error);
    return res.status(500).json({
      error: "Failed to remove problem from playlist",
    });
  }
};
