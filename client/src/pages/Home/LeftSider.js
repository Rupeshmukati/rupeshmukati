
function LeftSider() {
  return (
    <div className="pb-6 sm:pb-0 sm:fixed left-0 bottom-0 px-8 sm:block static social_sider">
      <div className="flex flex-col items-center">
        <div className="flex sm:flex-col gap-4 flex-row">
          <a href="https://www.facebook.com/share/1DHtsXD1Mb/" rel="noopener noreferrer" target="_blank"><i className="ri-facebook-circle-line text-gray-500"></i></a>
          <a href="mailto:rupeshmukati0101@gmail.com" rel="noopener noreferrer" target="_blank"><i className="ri-mail-line text-gray-500"></i></a>
          <a href="https://www.instagram.com/rupesh_dws?igsh=MW1wdjdlNXphN3lpMw==" rel="noopener noreferrer" target="_blank"><i className="ri-instagram-line text-gray-500"></i></a>
          <a href="https://www.linkedin.com/in/rupesh-mukati-227307115" rel="noopener noreferrer" target="_blank"><i className="ri-linkedin-box-line text-gray-500"></i></a>
        </div>

        <div className="w-[1px] h-32 bg-[#125f63] sm:block hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
