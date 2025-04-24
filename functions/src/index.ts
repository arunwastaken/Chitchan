import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection("users")
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));
  });

export const deletePostComments = functions.firestore
  .document(`posts/{postId}`)
  .onDelete(async (snap) => {
    const postId = snap.id;
    console.log("HERE IS POST ID", postId);

    admin
      .firestore()
      .collection("comments")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().postId === postId) {
            console.log("DELETING COMMENT: ", doc.id, doc.data().text);
            doc.ref.delete();
          }
        });
      })
      .catch((error) => {
        console.log("Error deleting post comments");
      });
  });

export const updateUserProfile = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to update profile'
    );
  }

  const { displayName, bio, location, website, socialLinks, avatarURL } = data;
  const userId = context.auth.uid;

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'User profile not found'
      );
    }

    const updateData: any = {};
    if (displayName) updateData.displayName = displayName;
    if (bio) updateData.bio = bio;
    if (location) updateData.location = location;
    if (website) updateData.website = website;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (avatarURL) updateData.avatarURL = avatarURL;
    updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    await userRef.update(updateData);

    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Error updating user profile',
      error
    );
  }
});
