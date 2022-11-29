import { IMAGE_URL } from "@lib/constants/config";

type BackdropProps = {
  backdropPath?: string;
};

const Backdrop: React.FC<BackdropProps> = ({ backdropPath }) => {
  return backdropPath ? (
    <div
      className="max-h-[70vh] h-full absolute -z-20 -top-4 -left-12 w-[120vw] blur-[20px] bg-neutral-900"
      style={{
        backgroundImage: `url('${IMAGE_URL + "/original" + backdropPath}')`,
        backgroundSize: "cover",
      }}
    />
  ) : (
    <div className="max-h-[50vh] h-full absolute -z-20 top-0 w-full left-0 max-w-screen blur-[50px] dark:bg-neutral-900/50" />
  );
};

export default Backdrop;
