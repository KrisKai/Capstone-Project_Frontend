import { Button } from '@mui/material';
import { Icon } from '@iconify/react';
import caretUpFilled from '@iconify/icons-ant-design/caret-up-filled';
import { useState } from 'react';
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Button
      sx={{
        position: 'fixed',
        width: 'fit-content',
        left: { xs: '82%', sm: '90%', md: '92%', lg: '93%', xl: '95%' },
        bottom: '40px',
        fontSize: '3rem',
        height: 'fit-content',
        cursor: 'pointer',
        zIndex: 99,
        color: 'primary.main',
        border: 'solid 1px #eee',
        backgroundColor: '#ffffff',
        borderRadius: 50,
        boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
        visibility: visible ? 'visible' : 'hidden'
      }}
    >
      <Icon icon={caretUpFilled} onClick={scrollToTop} width={30} height={50} />
    </Button>
  );
};

export default ScrollButton;
