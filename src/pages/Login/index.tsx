import { observer } from 'mobx-react-lite';
import LoginContentDescription from './components/description';
import styles from './styles/index.module.scss';

const LoginPage: React.FC<any> = () => {
  return (
    <div className={styles.desArea}>
      <LoginContentDescription />
    </div>
  );
};

export default observer(LoginPage);
