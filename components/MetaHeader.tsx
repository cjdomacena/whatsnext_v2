import { BASE_URL } from "@lib/constants/config";
import Head from "next/head";
type HeaderProps = {
  title: string;
  description: string;
};

const MetaHeader: React.FC<HeaderProps> = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="url" content={`${BASE_URL}`} />
      <meta property="title" content="What's Next" />
      <meta name="viewport" content="width=device-width" />
      {/* OG */}
      <meta property="og:url" content={`${BASE_URL}`} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content="What's Next" />
      <meta property="og:image" content={`/assets/meta-image.png`} />
      <meta property="og:image" content={`/assets/meta-image.png`} />

      {/* TWITTER */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta property="twitter:site" content="What's Next" />
      <meta property="twitter:image" content={`/assets/meta-image.png`} />
    </Head>
  );
};
export default MetaHeader;
