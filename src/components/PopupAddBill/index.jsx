// PopupAddBill/index.jsx
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import PopupDate from '../PopupDate'
import cx from 'classnames';
import { Popup, Icon  } from 'zarm';

import s from './style.module.less';

const PopupAddBill = forwardRef((props, ref) => {

    const dateRef = useRef();
    const [date, setDate] = useState(new Date()); // 日期
  const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。
  const [payType, setPayType] = useState('expense'); // 支出或收入类型
  // 通过 forwardRef 拿到外部传入的 ref，并添加属性，使得父组件可以通过 ref 控制子组件。
  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      }
    }
  };
    // 切换收入还是支出
    const changeType = (type) => {
        setPayType(type);
      };
    
  // 日期选择回调
  const selectDate = (val) => {
    setDate(val);
  }
  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div className={s.addWrap}>
      {/* 右上角关闭弹窗 */}
      <header className={s.header}>
        <span className={s.close} onClick={() => setShow(false)}><Icon type="wrong" /></span>
      </header>
       {/* 「收入」和「支出」类型切换 */}
      <div className={s.filter}>
        <div className={s.type}>
          <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true, [s.active]: payType == 'expense' })}>支出</span>
          <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income' })}>收入</span>
        </div>
        <div
          className={s.time}
          onClick={() => dateRef.current && dateRef.current.show()}
        >{dayjs(date).format('MM-DD')} <Icon className={s.arrow} type="arrow-bottom" /></div>
      </div>
      <div className={s.money}>
        <span className={s.sufix}>¥</span>
        <span className={cx(s.amount, s.animation)}>10</span>
        </div>
      <PopupDate ref={dateRef} onSelect={selectDate} />
    </div>
  </Popup>
})

export default PopupAddBill