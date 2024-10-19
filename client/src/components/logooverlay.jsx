import logoname from '@/assets/logoname.svg'

const LogoOverlay = () => {
  return (
    <div className="fixed top-0 left-0 p-4 z-50">
      <a href="/">
        <img src={logoname} alt="Logo" className="h-20 w-20" />
      </a>
    </div>
  );
};

export default LogoOverlay;
