import logoname from '@/assets/logoname.svg'

const LogoOverlay = () => {
  return (
    <div className="fixed top-0 right-0 p-4 z-50">
      <a href="/">
        <img src={logoname} alt="Logo" className="h-12 w-12" />
      </a>
    </div>
  );
};

export default LogoOverlay;
