import { CustomTooltip } from '@remix-ui/helper'
import React from 'react'  //eslint-disable-line

interface StaticAnalyserButtonProps {
  onClick: (event) => void
  buttonText: string,
  disabled?: boolean,
  title?: string
  classList?: string
}

const StaticAnalyserButton = ({
  onClick,
  buttonText,
  disabled,
  title,
  classList
}: StaticAnalyserButtonProps) => {
  const defaultStyle = "btn btn-sm w-25 btn-primary"
  const newclassList = disabled && classList.length > 0 ? `${classList} disabled` :
  classList.length === 0 && disabled ? `${defaultStyle} disabled` : classList.length > 0 ? `${classList}` : defaultStyle

  const buttonWithoutTooltip = () => (
    <button id="staticAnalysisRunBtn" className={newclassList} disabled={disabled} onClick={onClick}>
      <span className="pl-3 pr-4">
        {buttonText}
      </span>
    </button>
  )

  const buttonWithTooltip = () => (
    <button id="staticAnalysisRunBtn" className={newclassList} disabled={disabled} onClick={onClick}>
    <CustomTooltip
      placement="right"
      tooltipId="ssaRunButtonTooltip"
      tooltipClasses="text-nowrap"
      tooltipText={title}
    >
      <span className="pl-3 pr-4">
        {buttonText}
      </span>
    </CustomTooltip>
  </button>)

  return (
      title && title.length > 0 ? buttonWithTooltip() : buttonWithoutTooltip()
  )
}

export default StaticAnalyserButton
