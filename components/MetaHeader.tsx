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
      <meta property="og:url" content={""} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content="What's Next" />
      <meta name="viewport" content="width=device-width" />
    </Head>
  );
};
export default MetaHeader;
