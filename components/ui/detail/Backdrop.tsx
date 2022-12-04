import { IMAGE_URL } from "@lib/constants/config";

type BackdropProps = {
  backdropPath?: string;
};

const Backdrop: React.FC<BackdropProps> = ({ backdropPath }) => {
  return backdropPath ? (
    <>
      <div
        className="max-h-[70vh] h-full absolute -z-20 left-0 top-0 w-full max-w-[100vw] bg-neutral-900 blur-[50px]"
        style={{
          backgroundImage: `url('${IMAGE_URL + "/original" + backdropPath}')`,
          backgroundSize: "cover",
        }}
      />
      <div className="max-h-full h-full absolute -z-10 -top-12 w-full left-0  dark:bg-neutral-900/90 bg-white/50 backdrop-blur" />
    </>
  ) : (
    <div className="max-h-[50vh] h-full absolute -z-10 top-0 w-full left-0 max-w-screen blur-[50px] dark:bg-neutral-900/50" />
  );
};

export default Backdrop;
