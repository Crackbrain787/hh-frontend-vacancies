

const Header = () => {
  return (
    <header style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(15, 15, 16, 0.1)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 1000,
      gap: '40px',
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: '#d32222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 600,
        }}>
          hh
        </div>
        <span style={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: '#0F0F10',
        }}>
          .FrontEnd
        </span>
      </div>

      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '24px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            color: '#0F0F10',
          }}>
            Вакансии FE
          </span>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#4263EB',
          }}/>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
          <img 
            src="./user-circle.png" 
            alt="User" 
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              objectFit: 'cover',
            }}
          />
          <span style={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            color: 'rgba(15, 15, 16, 0.5)',
          }}>
            Обо мне
          </span>
        </div>
      </div>

  
      <div style={{ width: '140px' }} />
    </header>
  );
};

export default Header;