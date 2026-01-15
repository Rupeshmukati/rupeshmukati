import { useSelector } from "react-redux";

function Footer() {
  const { portfolioData } = useSelector((state) => state.root);

  const firstName = portfolioData?.intro?.firstName || "";
  const lastName = portfolioData?.intro?.lastName || "";

  return (
    <footer className="pt-6 pb-3 sm:pb-6 footer_section">
      <div className="h-[1px] w-full bg-gray-700"></div>

      <div className="flex items-center justify-center flex-col mt-6 opacity-70">
        <p className="text-white mb-2">
          © {new Date().getFullYear()} Designed and Developed By
        </p>

        <p className="text-white mb-0">
          <span className="text-white">
            {firstName} {lastName}
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
