import type { NextPageContext } from 'next';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';
import Main from 'components/Main/Main';

const MainStyled = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 0;
`;

const Home: React.FC<NextPageContext> = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div>
        <Main />
      </div>
    </div>
  );
};

export default Home;
