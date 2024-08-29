import React from 'react'

export type PdfFileIconProps = React.SVGAttributes<SVGElement> & {
  isFilterIcon?: boolean
}

export const PdfFileIcon: React.FC<PdfFileIconProps> = ({
  isFilterIcon,
  ...props
}) => {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="24px"
      height="24px"
      style={{
        padding: '2px',
        ...(props.style || {}),
      }}
      {...props}
    >
      {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
      <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
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
        d="M554.666667 384h234.666666L554.666667 149.333333V384M256 85.333333h341.333333l256 256v512a85.333333 85.333333 0 0 1-85.333333 85.333334H256a85.333333 85.333333 0 0 1-85.333333-85.333334V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334m210.346667 445.44c17.493333 38.4 39.68 69.973333 65.28 91.733334l17.493333 13.653333c-37.12 6.826667-88.32 18.773333-142.506667 39.68l-4.693333 1.706667 21.333333-44.373334c19.2-37.12 33.28-70.826667 43.093334-102.4m276.48 162.56c7.68-7.68 11.52-17.493333 11.946666-28.16 1.28-8.533333-0.853333-16.64-5.12-23.466666-12.373333-20.053333-44.373333-29.44-97.28-29.44l-55.04 2.986666-37.12-24.746666c-26.88-22.186667-51.2-61.013333-68.266666-109.226667l1.706666-5.973333c14.08-56.746667 27.306667-125.44-0.853333-153.6a36.394667 36.394667 0 0 0-26.026667-10.24h-10.24c-15.786667 0-29.866667 16.64-33.706666 32.853333-15.786667 56.746667-6.4 87.893333 9.386666 139.52v0.426667c-10.666667 37.546667-24.32 81.066667-46.08 125.013333l-40.96 76.8-37.973333 20.906667c-51.2 32-75.52 67.84-80.213333 90.453333-1.706667 8.106667-0.853333 15.36 2.133333 23.04l1.28 2.133333 20.48 13.226667 18.773333 4.693333c34.56 0 73.813333-40.533333 126.72-130.986666l7.68-2.986667c43.946667-14.08 98.56-23.893333 171.946667-32 43.946667 21.76 95.573333 31.573333 128 31.573333 18.773333 0 31.573333-4.693333 38.826667-12.8m-17.493334-30.293333l3.84 4.693333c-0.426667 4.266667-1.706667 4.693333-3.84 5.546667h-1.706666l-8.106667 0.853333c-19.626667 0-49.92-8.106667-81.066667-21.76 3.84-4.266667 5.546667-4.266667 9.813334-4.266666 59.733333 0 76.8 10.666667 81.066666 14.933333M334.08 725.333333c-27.733333 50.773333-52.906667 78.933333-72.106667 85.333334 2.133333-16.213333 21.333333-44.373333 51.626667-72.106667l20.48-13.226667m128.853333-294.826666c-9.813333-38.4-10.24-69.546667-2.986666-87.466667l2.986666-5.12 6.4 2.133333c7.253333 10.24 8.106667 23.893333 3.84 46.933334l-1.28 6.826666-6.826666 34.986667z"
        fill="#F44336"
      />
    </svg>
  )

  return isFilterIcon ? filterIcon : defaultIcon
}
