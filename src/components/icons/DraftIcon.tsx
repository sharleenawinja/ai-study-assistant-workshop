import React from 'react'

export type DraftIconProps = React.SVGAttributes<SVGElement> & {
  isFilterIcon?: boolean
}

export const DraftIcon: React.FC<DraftIconProps> = ({
  isFilterIcon,
  ...props
}) => {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      width="24px"
      viewBox="0 -960 960 960"
      {...props}
    >
      <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
    </svg>
  )

  const filterIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#2196f3"
        d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"
      ></path>
      <path fill="#bbdefb" d="M40 13L30 13 30 3z"></path>
      <path fill="#1565c0" d="M30 13L40 23 40 13z"></path>
      <path
        fill="#e3f2fd"
        d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"
      ></path>
    </svg>
  )

  return isFilterIcon ? filterIcon : defaultIcon
}
