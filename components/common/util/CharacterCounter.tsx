type CharacterCounterProps = {
  text: string;
};

const CharacterCounter: React.FC<CharacterCounterProps> = ({ text }) => {
  return (
    <div className=" text-xs text-neutral-600">
      <p>{text.length} characters</p>
    </div>
  );
};

export default CharacterCounter;
