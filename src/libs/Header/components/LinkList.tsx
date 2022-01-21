import { Tooltip } from 'antd';
import Link from 'antd/lib/typography/Link';
import styles from '../styles/index.module.scss';

const IndexLinkList = () => {
  const linkConfig: { name: string; link: string; disabled?: boolean }[] = [
    {
      name: '介绍页',
      link: '/login',
    },
    {
      name: '产品首页',
      link: '/home',
    },
    {
      name: '商品超市',
      link: '/shop',
    },
    {
      name: '给我留言',
      link: '',
      disabled: true,
    },
    {
      name: '数据可视化',
      link: '',
      disabled: true,
    },

    {
      name: '个人中心',
      link: '',
      disabled: true,
    },
  ];

  const menuWidth = 100;
  const listLength = linkConfig.length;
  const listWidth = menuWidth / listLength;

  return (
    <div className={styles.menu}>
      {linkConfig.map((item, index) => {
        return (
          <Tooltip title={item.disabled ? '该功能未开放' : ''} placement="bottom">
            <Link
              href={item.link}
              target="_self"
              className={styles.list}
              style={{ width: `${listWidth}%` }}
              key={index}
              disabled={item.disabled}
            >
              {item.name}
            </Link>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default IndexLinkList;
