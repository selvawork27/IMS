export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-outfit text-[12vw] sm:text-[150px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-transparent opacity-50 select-none">
            LINEA
          </h2>
          <div className="mt-8 flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
          </div>
          <p className="mt-8 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Linea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
