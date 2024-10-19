import logoname from '@/assets/logoname.svg'

const LogoOverlay = () => {
  return (
    <div className="ml-5 sm:ml-10 mt-5 fixed top-0 left-0 z-50">
      <a href="/">
        <img src={logoname} alt="Logo" className="w-auto h-10 pointer-events-none select-none" />
      </a>
    </div>
  );
};

export default LogoOverlay;
