import React from 'react';
import { Button } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';

// 组件二次重构使用的话需要全局引入样式表了，不能按需引入 import 'antd/dist/antd.css'

interface CustomButtonProps extends BaseButtonProps {
  onClick?: () => void;
  clstag?: string;
}

const CustomButton: React.FC<CustomButtonProps> = props => {
  const throttle = (fn: Function, delay: number) => {
    let timer: number;
    return function Fun(...args: any) {
      const last = timer;
      const now = Date.now();
      if (!last) {
        timer = now;
        fn && fn.apply(Fun, args);
        return;
      }
      if (last + delay > now) {
        return;
      }
      timer = now;
      fn && fn.apply(Fun, args);
    };
  };
  const handClick = () => {
    console.log('无点击事件');
  };
  return (
    <Button {...props} onClick={throttle(props?.onClick || handClick, 3000)}>
      {props.children}
    </Button>
  );
};

export default CustomButton;