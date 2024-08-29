import React from 'react'

export type ImageIconProps = React.SVGAttributes<SVGElement> & {
  isFilterIcon?: boolean
}

export const ImageIcon: React.FC<ImageIconProps> = ({
  isFilterIcon,
  ...props
}) => {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      {...props}
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
    </svg>
  )

  const filterIcon = (
    <svg
      width="100"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M553.642667 387.072h229.034666l-229.034666-228.992v228.992M262.144 95.616h333.141333l249.856 249.813333v499.669334a83.285333 83.285333 0 0 1-83.285333 83.285333H262.186667a83.242667 83.242667 0 0 1-83.285334-83.285333V178.858667c0-46.208 37.034667-83.242667 83.285334-83.242667m0 749.525333h499.626666V512l-166.528 166.570667L512 595.285333l-249.856 249.856M345.429333 387.114667a83.285333 83.285333 0 0 0-83.285333 83.285333 83.285333 83.285333 0 0 0 83.285333 83.242667 83.285333 83.285333 0 0 0 83.285334-83.242667 83.285333 83.285333 0 0 0-83.285334-83.285333z"
        fill="#26A69A"
      />
    </svg>
  )
  return isFilterIcon ? filterIcon : defaultIcon
}
