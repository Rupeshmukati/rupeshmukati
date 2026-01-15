
function SectionTitle({ title }) {
  return (
    <div className="flex sm:flex-row items-center gap-4 sm:gap-10 py-6 sm:pt-10 sm:pb-10">
      <h1 className="text-2xl sm:text-3xl text-secondary text-center sm:text-left font-semibold mb-0">
        {title}
      </h1>

      <div className="w-32 sm:w-60 h-[1px] bg-tertiary"></div>
    </div>
  );
}

export default SectionTitle;
