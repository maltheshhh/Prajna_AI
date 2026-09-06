export function Footer() {
  return (
    <footer className="w-full border-t border-ksp-gray-100 bg-[#F5F7FA] py-3.5 px-6 text-center text-[10px] font-medium tracking-wide text-ksp-gray-600 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-ksp-gray-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <span>
          © {new Date().getFullYear()} Karnataka State Police | State Crime Records Bureau (SCRB)
        </span>
        <span className="font-mono text-ksp-navy dark:text-sky-300 font-bold uppercase">
          Prajna-AI (ಪ್ರಜ್ಞಾ-AI) — Advancing Intelligent Policing Through AI
        </span>
      </div>
    </footer>
  );
}
