export const TitleContent = ({ title }: { title: string }) => {
  return (
    <div className="bg-zinc-50 border-b dark:bg-zinc-900 p-4">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};
