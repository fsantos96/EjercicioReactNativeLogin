import * as Google from 'expo-google-app-auth';

export async function signInWithGoogleAsync() {  
  try {
      const result = await Google.logInAsync({
        androidClientId: "553496305737-0fm78n00bb4di1fgfk1h0ihfgpksg43u.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    } 
}