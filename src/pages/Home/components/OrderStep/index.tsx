import React from 'react';
import { TOrderStep } from '../../interfaces';
import styles from './styles/index.module.scss';

const OrderStep: React.FC<TOrderStep> = (props) => {
  const { icon, title } = props;
  return (
    <div className={styles.orderStep}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default OrderStep;
