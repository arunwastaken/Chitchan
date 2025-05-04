import { Stack, Box, Flex, Text, Image, Icon } from "@chakra-ui/react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {
  const router = useRouter();
  const setPostStateValue = useSetRecoilState(postState);
  const [error, setError] = useState("");

  const isSinglePost = router.pathname === "/r/[community]";

  const onDeletePost = async (post: Post) => {
    try {
      // Check if post exists
      const postDocRef = doc(firestore, "posts", post.id);
      const postDoc = await getDoc(postDocRef);
      
      if (!postDoc.exists()) {
        throw new Error("Post not found");
      }

      // Delete post
      await deleteDoc(postDocRef);

      // Update local state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      // If on single post page, redirect to community
      if (isSinglePost) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      console.log("Error deleting post", error);
      setError(error.message);
    }
  };

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      bg="white"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        // ... existing code ...
      </Flex>
      <Flex direction="column" width="100%">
        // ... existing code ...
        <Stack
          direction="row"
          spacing={0.6}
          align="center"
          fontSize="9pt"
          color="gray.500"
        >
          // ... existing code ...
        </Stack>
      </Flex>
    </Flex>
  );
}; 