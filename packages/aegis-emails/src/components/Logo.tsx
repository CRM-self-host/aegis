import { Img } from '@react-email/components';

const logoStyle = {
  marginBottom: '40px',
};

export const Logo = () => {
  return (
    <Img
      src="https://app.aegis.com/images/icons/windows11/Square150x150Logo.scale-100.png"
      alt="Aegis logo"
      width="40"
      height="40"
      style={logoStyle}
    />
  );
};
