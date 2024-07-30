// GoogleAuth.js
import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleAuth = ({ onAuthSuccess }) => {
  useEffect(() => {
    function start() {
      gapi.load('client:auth2', initClient);
    }

    function initClient() {
      gapi.client.init({

      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(authInstance.isSignedIn.get());

        document.getElementById('signin-button').addEventListener('click', () => {
          authInstance.signIn();
        });
        document.getElementById('signout-button').addEventListener('click', () => {
          authInstance.signOut();
        });
      });
    }

    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        onAuthSuccess(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse());
      }
    }

    start();
  }, [onAuthSuccess]);

  return (
    <div>
      <button id="signin-button">Sign In with Google</button>
      <button id="signout-button">Sign Out</button>
    </div>
  );
};

export default GoogleAuth;
