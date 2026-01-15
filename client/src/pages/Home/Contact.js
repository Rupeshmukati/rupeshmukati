import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  return (
    <div className="contact_section">
      <SectionTitle title="Say Hello" />

      <div className="flex flex-col md:flex-row sm:pb-10 pt-0 pb-10 gap-3 sm:gap-10 items-center justify-center">
        {/* LEFT SIDE – USER DETAILS */}
        <div className="flex flex-col gap-1 sm:gap-4 w-full mt-4 md:mt-0 sm:w-2/2 px-10 sm:px-0 items-start">
          <p className="text-tertiary mb-0">{"{"}</p>
          {Object.keys(contact).map(
            (key) =>
              key !== "_id" && (
                <p className="ml-5 text-tertiary mb-0">
                  <span className="capitalize">{key} : </span>
                  <span>{contact[key]}</span>
                </p>
              )
          )}

          <p className="text-tertiary mb-0">{"}"}</p>
        </div>

        {/* RIGHT SIDE – ANIMATION */}
        <div className="max-w-[800px]">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
