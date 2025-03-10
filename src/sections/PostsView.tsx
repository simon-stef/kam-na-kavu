"use client";

// React imports
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";

// Server action import
import { fetchPosts, toggleLike, addComment, deleteComment } from "@/app/actions/posts";

// Post interface
interface User {
  id: string;
  name: string | null;
}

interface Like {
  id: string;
  userId: string;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  user: User;
  createdAt: Date;
}

interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  likes: Like[];
  comments: Comment[];
}

// Extend the Session type to include id
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const PostsView = () => {
  const { data: session } = useSession();
  console.log("Current session:", session);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    console.log("Loading posts...");
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      console.log("Fetching posts...");
      const fetchedPosts = (await fetchPosts()) as Post[];
      console.log("Fetched posts:", fetchedPosts);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleLike = async (postId: string) => {
    if (!session?.user?.id) return;
    const userId = session.user.id;

    try {
      const isLiked = await toggleLike(postId, userId);
      setPosts(currentPosts =>
        currentPosts.map(post => {
          if (post.id === postId) {
            const likes = isLiked
              ? [...post.likes, { id: 'temp', userId } as Like]
              : post.likes.filter(like => like.userId !== userId);
            return { ...post, likes };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!session?.user?.id || !comments[postId]?.trim()) return;
    const userId = session.user.id;

    setIsSubmitting(prev => ({ ...prev, [postId]: true }));
    try {
      const newComment = await addComment(postId, userId, comments[postId]);
      setPosts(currentPosts =>
        currentPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        })
      );
      setComments(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleCommentDelete = async (postId: string, commentId: string) => {
    if (!session?.user?.id) return;
    const userId = session.user.id;

    try {
      await deleteComment(commentId, userId);
      setPosts(currentPosts =>
        currentPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment.id !== commentId),
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
        Príspevky
      </Typography>
      {posts.map((post) => (
        <Card sx={{ m: 4 }} key={post.id}>
          <CardMedia
            component="img"
            image={post.imageUrl}
            alt={post.caption || "Príspevok bez popisu"}
          />
          <CardContent>
            <Typography variant="body1">{post.caption || "Bez popisu"}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.user.name || "Neznámy používateľ"}
            </Typography>
          </CardContent>
          
          <CardActions disableSpacing>
            <IconButton 
              onClick={() => handleLike(post.id)}
              color={post.likes.some(like => like.userId === session?.user?.id) ? "error" : "default"}
            >
              {post.likes.some(like => like.userId === session?.user?.id) 
                ? <FavoriteIcon /> 
                : <FavoriteBorderIcon />
              }
            </IconButton>
            <Typography>{post.likes.length}</Typography>
          </CardActions>

          <Divider />
          
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Komentáre ({post.comments.length})
            </Typography>
            
            {post.comments.map((comment) => (
              <Box key={comment.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" component="span">
                    {comment.user.name || "Neznámy používateľ"}
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1 }} component="span">
                    {comment.content}
                  </Typography>
                </Box>
                {session?.user?.id === comment.userId && (
                  <IconButton 
                    size="small"
                    onClick={() => handleCommentDelete(post.id, comment.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}

            {session?.user && (
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Pridať komentár..."
                  value={comments[post.id] || ''}
                  onChange={(e) => setComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit(post.id);
                    }
                  }}
                />
                <Button
                  variant="contained"
                  disabled={isSubmitting[post.id] || !comments[post.id]?.trim()}
                  onClick={() => handleCommentSubmit(post.id)}
                >
                  {isSubmitting[post.id] ? 'Pridáva sa...' : 'Pridať'}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default PostsView;