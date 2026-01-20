import { useSelector } from "react-redux";
import BgAnimation from "../../components/BgAnimation";

function Introduction() {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, lastName, welcomeText, description, caption, image } =  intro;

  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="bg-primary sm:py-20 pt-6 pb-10 sm:px-0 intro_section grid grid-cols-1 md:grid-cols-[60%_40%] gap-8 md:gap-0">
        <div className="flex flex-col gap-3 md:gap-6 sm:gap-4 justify-center md:items-start items-center order-2 md:order-1 md:text-left text-center">
          <h1 className="text-white text-sm sm:text-base mb-0">
            {welcomeText || ""}
          </h1>

          <h2 className="font-semibold text-secondary text-3xl md:text-4xl lg:text-5xl mb-0">
            {firstName || ""} {lastName || ""}
          </h2>

          <h2 className="font-semibold text-white text-3xl md:text-4xl lg:text-5xl mb-0">
            {caption || ""}
          </h2>

          <p className="text-white max-w-[900px] text-sm sm:text-base leading-relaxed mb-0">
            {description || ""}
          </p>

          <button className="border border-tertiary text-tertiary px-6 sm:px-10 py-2 sm:py-3 rounded-md text-sm sm:text-base hover:bg-tertiary hover:text-primary transition">
            Get Started
          </button>
        </div>

        {/* 👉 RIGHT: Image */}
        <div className="relative flex justify-center order-1 md:order-2">
          <div className="relative z-10">
            {/* 🔹 Background Animation */}
            <div className="inset-0 z-0">
              <BgAnimation />
            </div>

            <img
              // Agar intro.image hai to uploads folder se uthao, nahi to default file
              src={
                image
                  ? `http://localhost:5000/uploads/${image}`
                  : "/rupesh-profile.png"
              }
              alt="Profile"
              className="w-[220px] md:w-[280px] lg:w-[300px] rounded-full object-cover border-4 border-white/10 z-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
