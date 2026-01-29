import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact = {} } = portfolioData || {};

  const contactKeys = Object.keys(contact).filter((key) => key !== "_id");

  if (!contactKeys.length) return null; // Prevent rendering if no contact info

  return (
    <section
      className="contact_section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <SectionTitle title="Let’s Connect" id="contact-title" />

      <div className="flex flex-col md:flex-row pt-0 gap-3 sm:gap-10 items-center justify-center">
        {/* LEFT SIDE – USER DETAILS */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full mt-4 md:mt-0 sm:w-2/2 px-5 sm:px-0 items-start">
          <pre className="text-tertiary mb-0">{"{"}</pre>

          {contactKeys.map((key) => (
            <p key={key} className="ml-5 text-tertiary mb-0 break-words">
              <span className="capitalize font-medium">{key}:</span>{" "}
              <span>{contact[key]}</span>
            </p>
          ))}

          <pre className="text-tertiary mb-0">{"}"}</pre>
        </div>

        {/* RIGHT SIDE – ANIMATION */}
        <div className="max-w-[800px]">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            aria-label="Contact animation"
          ></lottie-player>
        </div>
      </div>
    </section>
  );
}

export default Contact;
