import { BASE_URL } from "@lib/constants/config";
import Head from "next/head";
type HeaderProps = {
  title: string;
  description?: string;
  pathname?: string;
};

const MetaHeader: React.FC<HeaderProps> = (props) => {
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>{props.title}</title>
      <meta name="title" content={props.title} />
      <meta
        name="description"
        content={
          !props.description
            ? "Pick up where you left off. Track your shows!"
            : props.description
        }
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${BASE_URL}/${props.pathname ? props.pathname : ""}`}
      />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={`${BASE_URL}/assets/meta-image.png`} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${BASE_URL}`} />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta
        property="twitter:image"
        content={`${BASE_URL}/assets/meta-image.png`}
      />
    </Head>
  );
};
export default MetaHeader;
