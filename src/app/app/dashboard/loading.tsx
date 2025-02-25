import { Spinner } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="w-full min-h-screen mx-auto grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size={32} className="animate-spin" />
        <h1 className="text-2xl font-semibold text-minera-dark-500 text-center">
          Carregando...
        </h1>
      </div>
    </div>
  );
}
