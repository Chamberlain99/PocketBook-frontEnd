import React from 'react'
import { Button } from 'zarm'
import { get } from 'utils'

import s from './style.module.less'

export default function Index() {
  return <div className={s.index}>
    <span>样式</span>
    <Button theme='primary'>按钮</Button>
  </div>
}