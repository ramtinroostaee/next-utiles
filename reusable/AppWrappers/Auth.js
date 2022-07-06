import jwtService from "reusable/auth/jwtService";
import { useEffect, useState } from "react";
import { setUserData, logoutUser } from "reusable/auth/store/userSlice";
import { Watch } from "react-loader-spinner";

const Auth = ({ children }) => {
  const [AuthCheckDone, setAuthCheckDone] = useState(false);

  useEffect(() => {
    Promise.all([
      new Promise((resolve) => {
        jwtService.on("onAutoLogin", () => {
          /**
           * Sign in and retrieve user data from Api
           */
          jwtService
            .signInWithToken()
            .then((user) => {
              setUserData(user);

              resolve();
            })
            .catch((error) => {
              // showMessage({ message: error?.message });

              resolve();
            });
        });

        jwtService.on("onAutoLogout", (message) => {
          if (message) {
            // showMessage({ message });
          }

          logoutUser();

          resolve();
        });

        jwtService.on("onNoAccessToken", () => {
          // showMessage({ message: "NoAccessToken" });

          logoutUser();

          resolve();
        });

        jwtService.init();

        return Promise.resolve();
      }),
    ]).then(() => setAuthCheckDone(true));
  }, []);

  return AuthCheckDone ? (
    <>{children}</>
  ) : (
    <Watch
      wrapperClass="fixed top-1/2 right-1/2 z-1301"
      height="100"
      width="100"
      color="grey"
      ariaLabel="loading"
    />
  );
};

export default Auth;
