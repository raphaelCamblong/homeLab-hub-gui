function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-full gap-8">{children}</div>;
}

function PageTitle({
  title,
  icon,
  description,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex items-center gap-2 mb-8 pt-2">
        {icon}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
}

export { PageContainer, PageTitle };
