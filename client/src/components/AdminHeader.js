function AdminHeader() {
  return (
    <div className="bg-primary sm:gap-0 sm:px-10 md:py-4 sm:py-3 py-2 px-4 py-4 border-b border-[#374151]">
      <a href="/" className="flex items-center justify-center justify-between p-0 m-0">
        {" "}
        <h1 className="text-secondary text-2xl sm:text-4xl font-semibold mb-0">
          R
        </h1>
        <h1 className="text-white text-2xl sm:text-4xl font-semibold mb-0">
          K
        </h1>
        <h1 className="text-tertiary text-2xl sm:text-4xl font-semibold mb-0">
          M
        </h1>
      </a>
    </div>
  );
}

export default AdminHeader;
