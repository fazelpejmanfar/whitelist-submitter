import "../styles/globals.css";
import { Toaster  } from "react-hot-toast";
import Wrapper from "../context/Connector";

function MyApp({ Component, pageProps }) {
  return <>
      <Wrapper>
      <Toaster />
      <Component {...pageProps} />
      </Wrapper>
  </>;
}

export default MyApp;
