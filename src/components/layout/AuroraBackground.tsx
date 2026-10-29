// Decorative only: soft colour blobs that the glass panels blur against.
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-aurora absolute -left-24 -top-24 size-[28rem] rounded-full bg-blue-500/35 blur-3xl will-change-transform" />
      <div className="animate-aurora absolute -right-32 top-1/4 size-[32rem] rounded-full bg-violet-500/30 blur-3xl will-change-transform [animation-delay:-8s]" />
      <div className="animate-aurora absolute -bottom-32 left-1/4 size-[30rem] rounded-full bg-cyan-400/35 blur-3xl will-change-transform [animation-delay:-14s]" />
      <div className="animate-aurora absolute bottom-1/4 right-1/4 size-80 rounded-full bg-fuchsia-400/20 blur-3xl will-change-transform [animation-delay:-4s]" />
    </div>
  );
}
