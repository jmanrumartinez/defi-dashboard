const SectionCardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-md font-bold">{children}</h2>;
};

export const SectionCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-6 dark:border-0 dark:bg-[var(--sidebar)]">
      {children}
    </div>
  );
};

SectionCard.Title = SectionCardTitle;
