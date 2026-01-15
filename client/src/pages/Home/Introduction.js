import { useSelector } from "react-redux";

function Introduction() {
  const {portfolioData } = useSelector((state) => state.root);
  const {intro} = portfolioData;
  const {firstName, lastName, welcomeText, description, caption } = intro;
  return (
    <div className="bg-primary flex flex-col items-start justify-center gap-4 md:gap-8 sm:gap-5 sm:py-20 pt-5 pb-10 sm:px-0 intro_section">
      <h1 className="text-white text-sm sm:text-base mb-0">{welcomeText||''}</h1>

      <h2 className="font-semibold text-secondary text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-0">
        {firstName||''} {lastName||''}
      </h2>

      <h2 className="font-semibold text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-0">
        {caption||''}
      </h2>

      <p className="text-white max-w-[900px] text-sm sm:text-base leading-relaxed mb-0">
        {description||''}
      </p>

      <button className="border border-tertiary text-tertiary px-6 sm:px-10 py-2 sm:py-3 rounded-md text-sm sm:text-base hover:bg-tertiary hover:text-primary transition">
        Get Started
      </button>
    </div>
  );
}

export default Introduction;
