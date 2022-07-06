import Auth from "reusable/AppWrappers/Auth";
import ReduxProvider from "reusable/AppWrappers/ReduxProvider";
import Theme from "reusable/AppWrappers/Theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Auth>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </Auth>
    </ReduxProvider>
  );
}

export default MyApp;
