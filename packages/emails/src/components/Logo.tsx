import { Img } from '@react-email/components';

const logoStyle = {
  marginBottom: '40px',
};

// TODO: replace with KesariX/Aegis CDN logo URL
const AEGIS_LOGO_URL = 'https://u84u.github.io/placeholder-images/workspaces/aegis-logo.png';

export const Logo = () => {
  return (
    <Img
      src={AEGIS_LOGO_URL}
      alt="Aegis logo"
      width="40"
      height="40"
      style={logoStyle}
    />
  );
};
