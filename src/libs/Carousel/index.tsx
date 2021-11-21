import { Carousel } from 'antd';
import React from 'react';
import { carouselDisplayType } from './interfaces';
import car1 from '../../assets/images/carousel/car1.png';
import car2 from '../../assets/images/carousel/car2.png';
import car3 from '../../assets/images/carousel/car3.png';
import styles from './styles/index.module.scss';
/**
 * type:轮播图展示内容类型 [图片 | 文字]
 * content:[图片链接 | 文字内容]
 * style:CSS样式
 * link:点击后的链接地址
 */
type TProps = {
  carouselList?: { type: carouselDisplayType; content: string; style: any; link: string }[];
};

const CarouselShow: React.FC<TProps> = (props) => {
  const imgSrc = '../../assets/images/carousel/';
  const imgList = [`${imgSrc}/car1.png`, `${imgSrc}/car2.png`, `${imgSrc}/car3.png`];

  return (
    <Carousel autoplay>
      <img className={styles.carImg} src={car1} alt="暂无轮播图内容" />
      <img className={styles.carImg} src={car2} alt="暂无轮播图内容" />
      <img className={styles.carImg} src={car3} alt="暂无轮播图内容" />
    </Carousel>
  );
};

export default CarouselShow;
