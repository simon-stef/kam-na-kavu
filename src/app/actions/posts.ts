// src/app/actions/posts.ts

"use server";

// Import Prisma client from centralized location
import { prisma } from "@/lib/prisma";

// Fetch all posts with likes and comments
export const fetchPosts = async () => {
  try {
    console.log("Server: Starting to fetch posts...");
    
    // Test database connection
    try {
      await prisma.$connect();
      console.log("Server: Database connection successful");
    } catch (connError) {
      console.error("Server: Database connection error:", connError);
      throw new Error(`Database connection failed: ${connError instanceof Error ? connError.message : String(connError)}`);
    }

    // Try to get the count first as a simpler query
    try {
      const count = await prisma.post.count();
      console.log("Server: Found post count:", count);
    } catch (countError) {
      console.error("Server: Error counting posts:", countError);
    }

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        likes: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
    });
    console.log("Server: Found posts:", posts.length);
    return posts;
  } catch (error) {
    console.error("Server: Error fetching posts:", error);
    if (error instanceof Error) {
      console.error("Server: Error details:", error.message);
      console.error("Server: Error stack:", error.stack);
    }
    throw new Error(`Could not fetch posts: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await prisma.$disconnect();
  }
};

// Fetch posts by a specific user ID
export const fetchPostsByUserId = async (userId: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts by userId:", error);
    throw new Error("Could not fetch posts");
  }
};

// Create a new post
export const createPost = async (userId: string, imageUrl: string, caption?: string) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        imageUrl,
        caption,
      },
    });

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Could not create post");
  }
};

// Toggle like on a post
export const toggleLike = async (postId: string, userId: string) => {
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return false; // Indicates post is now unliked
    } else {
      // Like
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      return true; // Indicates post is now liked
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw new Error("Could not toggle like");
  }
};

// Add a comment to a post
export const addComment = async (postId: string, userId: string, content: string) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
      include: {
        user: true,
      },
    });

    return comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Could not add comment");
  }
};

// Delete a comment
export const deleteComment = async (commentId: string, userId: string) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.userId !== userId) {
      throw new Error("Unauthorized to delete this comment");
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Could not delete comment");
  }
};