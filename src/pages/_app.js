import "../../styles/globals.css";
import { Provider } from "../context/SupportContext";
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
