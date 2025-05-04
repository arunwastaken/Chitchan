import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { doc, writeBatch, increment } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import { useCommunitySnippets } from "../../../contexts/CommunitySnippetsContext";

const JoinButton: React.FC<{ communityId: string; communityImageURL?: string }> = ({ communityId, communityImageURL }) => {
  const firestore = useFirestore();
  const { user } = useAuth();
  const { setSnippetState } = useCommunitySnippets();
  const [isJoined, setIsJoined] = useState(false);

  const onJoinOrLeaveCommunity = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    try {
      const batch = writeBatch(firestore);

      if (isJoined) {
        // Leave community
        batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));
        
        batch.update(doc(firestore, "communities", communityId), {
          numberOfMembers: increment(-1),
        });

        await batch.commit();

        // Update local state
        setSnippetState((prev) => ({
          ...prev,
          mySnippets: prev.mySnippets.filter(
            (item) => item.communityId !== communityId
          ),
        }));
      } else {
        // Join community
        const newSnippet = {
          communityId,
          isModerator: false,
          imageURL: communityImageURL || "",
        };

        batch.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityId),
          newSnippet
        );

        batch.update(doc(firestore, "communities", communityId), {
          numberOfMembers: increment(1),
        });

        await batch.commit();

        // Update local state
        setSnippetState((prev) => ({
          ...prev,
          mySnippets: [...prev.mySnippets, newSnippet],
        }));
      }
    } catch (error) {
      console.log("onJoinOrLeaveCommunity error", error);
    }
  };

  return (
    <div onClick={onJoinOrLeaveCommunity}>Join</div>
  );
};

export default JoinButton; 