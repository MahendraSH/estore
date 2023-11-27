import ModelProvider from "@/components/providers/model-provider";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ModelProvider />
      {children}
    </>
  );
}
