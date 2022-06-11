// PopupAddBill/index.jsx
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Popup, Icon, Toast, Keyboard, Modal, Input  } from 'zarm';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import PopupDate from '../PopupDate'
import cx from 'classnames';
import { get, typeMap } from '@/utils';
import CustomIcon from '../CustomIcon';

import s from './style.module.less';

const PopupAddBill = forwardRef((props, ref) => {

  const dateRef = useRef();
  const [date, setDate] = useState(new Date()); // 日期
  const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。
  const [payType, setPayType] = useState('expense'); // 支出或收入类型
  // 通过 forwardRef 拿到外部传入的 ref，并添加属性，使得父组件可以通过 ref 控制子组件。
  const [amount, setAmount] = useState(''); // 账单价格
  const [currentType, setCurrentType] = useState({}); // 当前选中账单类型
  const [expense, setExpense] = useState([]); // 支出类型数组
  const [income, setIncome] = useState([]); // 收入类型数组


  useEffect(async () => {
    const { data:  list  } = await get('/api/type/list');
    const _expense = list.filter(i => i.type == 1); // 支出类型
    const _income = list.filter(i => i.type == 2); // 收入类型
    setExpense(_expense);
    setIncome(_income);
    setCurrentType(_expense[0]); // 新建账单，类型默认是支出类型数组的第一项
  }, [])


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
  // 监听输入框改变值
  const handleMoney = (value) => {
    console.log(value,'value');
    value = String(value)
    // 点击是删除按钮时
    if (value == 'delete') {
      let _amount = amount.slice(0, amount.length - 1)
      setAmount(_amount)
      return
    }

    // 点击确认按钮时
    if (value == 'ok') {
      // 这里后续将处理添加账单逻辑
      return
    }

    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (value == '.' && amount.includes('.')) return
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
    // amount += value
    setAmount(amount + value)
  }
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
        <span className={cx(s.amount, s.animation)}>{amount}</span>
      </div>

      <div className={s.typeWarp}>
        <div className={s.typeBody}>
          {/* 通过 payType 判断，是展示收入账单类型，还是支出账单类型 */}
          {
            (payType == 'expense' ? expense : income).map(item => <div onClick={() => setCurrentType(item)} key={item.id} className={s.typeItem}>
              {/* 收入和支出的字体颜色，以及背景颜色通过 payType 区分，并且设置高亮 */}
              <span className={cx({[s.iconfontWrap]: true, [s.expense]: payType == 'expense', [s.income]: payType == 'income', [s.active]: currentType.id == item.id})}>                
                <CustomIcon className={s.iconfont} type={typeMap[item.id].icon} />
              </span>
              <span>{item.name}</span>
            </div>)
          }
        </div>
      </div>


       <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
      <PopupDate ref={dateRef} onSelect={selectDate} />
    </div>
  </Popup>
})

export default PopupAddBill