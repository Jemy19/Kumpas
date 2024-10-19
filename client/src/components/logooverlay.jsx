import logoname from '@/assets/logoname.svg'

const LogoOverlay = () => {
  return (
    <div className="fixed top-0 left-0z-50">
      <a href="/">
        <img src={logoname} alt="Logo" className="h-40 w-40" />
      </a>
    </div>
  );
};

export default LogoOverlay;
