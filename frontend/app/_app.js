import "../styles/_app.css";
import { useEffect, useState } from "react";
import Providers from "@/utils/Providers";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild || typeof window === "undefined") {
    return null;
  } else {
    return (
      <Providers pageProps={pageProps}>
        <Component {...pageProps} />
      </Providers>
    );
  }
}

export default MyApp;
