type CalorieDisplayProps = {
  calories: number;
  text: string;
};

export default function CalorieDisplay({calories, text}: CalorieDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center text-3xl">
      <span className="font-black text-8xl text-orange-500">
        {calories}
      </span>
      {text}
    </p>
  );
}
