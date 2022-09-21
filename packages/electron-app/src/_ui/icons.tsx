import React from "react";

const CloudIcon = ({ shouldAnimateGreen, ...props }) => {
  return (
    <svg viewBox={"0 0 16 11"} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {shouldAnimateGreen ? (
        <linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stop-opacity="1" stop-color="#E42475" />
          <stop offset="40%" stop-opacity="1" stop-color="#E42475">
            <animate attributeName="offset" values="0;1" repeatCount="indefinite" dur="0.8s" begin="0s" />
          </stop>
          <stop offset="40%" stop-opacity="0" stop-color="#E42475">
            <animate attributeName="offset" values="0;1" repeatCount="indefinite" dur="0.8s" begin="0s" />
          </stop>
          <stop offset="100%" stop-opacity="0" stop-color="#E42475" />
        </linearGradient>
      ) : (
        ""
      )}
      <path
        d="M12.854 4.47C12.566 1.953 10.504 0 8 0 5.497 0 3.433 1.953 3.147 4.47 1.409 4.47 0 5.932 0 7.735 0 9.538 1.409 11 3.146 11h9.708C14.59 11 16 9.538 16 7.735c0-1.803-1.409-3.265-3.146-3.265Z"
        fill={shouldAnimateGreen ? "url(#lg)" : "#E42475"}
        stroke={"#fff"}
        strokeWidth="0.5"
      />
    </svg>
  );
};


const DisabledCloudIcon = (props) => (
  <svg
  viewBox="0 0 25 19"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <path
    d="M15.895 6.539c-.342-3.01-2.81-5.344-5.801-5.344-2.992 0-5.459 2.335-5.802 5.344-2.077 0-3.76 1.747-3.76 3.902 0 2.156 1.683 3.903 3.76 3.903h11.603c2.078 0 3.761-1.747 3.761-3.903 0-2.155-1.684-3.902-3.76-3.902Z"
    fill="#E8407C"
  />
  <mask
    id="a"
    style={{
      maskType: "alpha",
    }}
    maskUnits="userSpaceOnUse"
    x={0}
    y={0}
    width={11}
    height={16}
  >
    <path fill="#D9D9D9" d="M0 0h10.625v15.938H0z" />
  </mask>
  <g mask="url(#a)">
    <path
      d="M15.895 6.539c-.342-3.01-2.81-5.344-5.801-5.344-2.992 0-5.459 2.335-5.802 5.344-2.077 0-3.76 1.747-3.76 3.902 0 2.156 1.683 3.903 3.76 3.903h11.603c2.078 0 3.761-1.747 3.761-3.903 0-2.155-1.684-3.902-3.76-3.902Z"
      fill="#E8407C"
    />
  </g>
  <path fill="#000" d="M14.634 8.635h8.171v8.171h-8.171z" />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M17.409 10.6a.572.572 0 0 0-.81.809l1.312 1.311-1.312 1.311a.572.572 0 0 0 .81.81l1.311-1.312 1.312 1.312a.572.572 0 0 0 .808-.81L19.53 12.72l1.311-1.312a.572.572 0 0 0-.808-.808L18.72 11.91 17.409 10.6Zm-1.406-3.378C16.746 7.057 17.647 7 18.72 7c1.073 0 1.974.057 2.717.222.75.166 1.372.45 1.851.93.48.479.764 1.102.93 1.851.165.743.222 1.644.222 2.717 0 1.073-.057 1.974-.222 2.717-.166.75-.45 1.372-.93 1.851-.479.48-1.102.764-1.851.93-.743.165-1.644.222-2.717.222-1.073 0-1.974-.057-2.717-.222-.75-.166-1.372-.45-1.851-.93-.48-.479-.764-1.102-.93-1.851-.165-.743-.222-1.644-.222-2.717 0-1.073.057-1.974.222-2.717.166-.75.45-1.372.93-1.851.479-.48 1.102-.764 1.851-.93Z"
    fill="#fff"
  />
</svg>
)


export function DocsIcon(props: any) {
  return (
    <svg
      width={14}
      height={14}
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.937.673C3.521.543 4.22.5 5.034.5h3.932c.814 0 1.513.043 2.097.173.591.131 1.104.36 1.504.76.4.4.629.913.76 1.504.13.584.173 1.283.173 2.097v3.932c0 .814-.043 1.513-.173 2.097-.131.591-.36 1.104-.76 1.504-.4.4-.912.629-1.504.76-.584.13-1.283.173-2.097.173H5.034c-.814 0-1.513-.043-2.097-.173-.591-.131-1.104-.36-1.504-.76-.4-.4-.629-.912-.76-1.504C.543 10.479.5 9.78.5 8.966V5.034c0-.814.043-1.513.173-2.097.131-.591.36-1.104.76-1.504.4-.4.913-.629 1.504-.76zM3.75 1.8a.65.65 0 01.65.65v3.29c0 .571.733.806 1.065.341a1.887 1.887 0 013.07 0c.332.465 1.065.23 1.065-.34V2.45a.65.65 0 111.3 0v3.29c0 1.836-2.355 2.59-3.422 1.097a.587.587 0 00-.956 0C5.455 8.331 3.1 7.576 3.1 5.74V2.45a.65.65 0 01.65-.65z"
        fill="#989898"
      />
    </svg>
  );
}




const NotepadIcon = (props) => (
  <svg
    viewBox={"0 0 14 14"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.261 3.661a.778.778 0 0 0-1.1 0l-5.5 5.5a.778.778 0 1 0 1.1 1.1l5.5-5.5a.778.778 0 0 0 0-1.1Z"
      fill="#BDBDBD"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2.333A2.333 2.333 0 0 1 2.333 0h9.334A2.333 2.333 0 0 1 14 2.333v9.334A2.333 2.333 0 0 1 11.667 14H2.333A2.333 2.333 0 0 1 0 11.667V2.333Zm2.333-.777h9.334c.43 0 .777.348.777.777v9.334c0 .43-.348.777-.777.777H2.333a.778.778 0 0 1-.777-.777V2.333c0-.43.348-.777.777-.777Z"
      fill="#BDBDBD"
    />
  </svg>
);

const ConsoleIcon = (props) => (
  <svg
    viewBox={"0 0 11 11"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.533 0H1.467A1.42 1.42 0 0 0 .43.46C.155.756 0 1.156 0 1.572V9.43c0 .416.155.816.43 1.11.275.295.648.46 1.037.461h8.066a1.42 1.42 0 0 0 1.037-.46c.275-.295.43-.695.43-1.111V1.57c0-.416-.155-.816-.43-1.11A1.42 1.42 0 0 0 9.533 0Zm-7.7 5.5a.35.35 0 0 1-.212-.072.391.391 0 0 1-.134-.19.42.42 0 0 1-.006-.24.396.396 0 0 1 .123-.198L3.08 3.536 1.604 2.27a.413.413 0 0 1 .052-.651.35.35 0 0 1 .407.037L3.896 3.23a.39.39 0 0 1 .101.136.416.416 0 0 1-.101.477L2.063 5.414a.352.352 0 0 1-.23.086Zm3.667 0H4.033a.355.355 0 0 1-.259-.115.408.408 0 0 1-.107-.278c0-.104.038-.204.107-.278a.355.355 0 0 1 .26-.115H5.5c.097 0 .19.042.26.115a.408.408 0 0 1 .107.278.408.408 0 0 1-.108.278.355.355 0 0 1-.259.115Z"
      fill="#858585"
    />
  </svg>
)


const PointerIcon = (props) => (
  <svg
    viewBox={"0 0 8 8"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.154.18c.24.215.259.584.043.823L1.503 7.178c-.215.24-.76.216-1 0-.239-.215-.215-.76 0-1L6.33.223a.583.583 0 0 1 .824-.044Z"
      fill="#3C3C3D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.356.949A.583.583 0 0 1 .908.336L6.733.03a.583.583 0 0 1 .613.552l.305 5.826a.583.583 0 1 1-1.165.06l-.274-5.242-5.243.275A.583.583 0 0 1 .356.949Z"
      fill="#3C3C3D"
    />
  </svg>
)

const EditIcon = (props) => (
  <svg
    viewBox={"0 0 13 14"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.157 4.292h2.35a.554.554 0 0 0 0-1.11h-2.35a.554.554 0 0 0 0 1.11ZM7.06 6.422a.555.555 0 0 0-.552-.554h-2.35a.554.554 0 0 0 0 1.109h2.35c.305 0 .552-.25.552-.555ZM2.499 4.284a.544.544 0 1 0 0-1.088.544.544 0 0 0 0 1.088ZM2.499 6.966a.544.544 0 1 0 0-1.088.544.544 0 0 0 0 1.088Z"
      fill="#BDBDBD"
    />
    <path
      d="m12.833 7.372-2.157-2.157a.537.537 0 0 0-.775 0l-.645.642v-4.47a.883.883 0 0 0-.883-.884H.883A.885.885 0 0 0 0 1.387v7.455c0 .488.395.883.883.883h4.484l-.109.106a.842.842 0 0 0-.138.276L4.57 12.82c-.104.533.275.748.636.663l2.709-.554c.111 0 .194-.056.276-.139l4.643-4.645a.53.53 0 0 0 0-.772ZM1.06 8.667V1.565h7.137V6.91L6.434 8.664H1.06v.003Zm6.466 3.215-1.74.361.357-1.743 4.118-4.12 1.409 1.382-4.144 4.12Z"
      fill="#BDBDBD"
    />
  </svg>
)

const RocketIcon = (props) => (
  <svg
    viewBox={"0 0 20 20"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g clipPath="url(#a)">
      <path fill="url(#b)" d="M0 0h20v20H0z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
      <pattern
        id="b"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#c" transform="scale(.00098)" />
      </pattern>
      <image
        id="c"
        width={1024}
        height={1024}
      />
    </defs>
  </svg>
)


const ConsoleIconV3 = (props) => (
  <svg
    viewBox={"0 0 18 16"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V4Zm2.647.647a.5.5 0 0 1 .706 0l1.5 1.5a.5.5 0 0 1 0 .706l-1.5 1.5a.5.5 0 0 1-.706-.706L6.293 6.5 5.147 5.353a.5.5 0 0 1 0-.706ZM8 7.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H8Z"
      fill="#FAFAFA"
    />
  </svg>
)

const BasketBallIcon = React.forwardRef((props, ref) => (
  <svg
    viewBox={"0 0 18 18"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M15.75 9a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
      stroke="#303030"
      strokeWidth={1.5}
    />
    <path
      d="M6 10.5c.684.91 1.773 1.5 3 1.5s2.316-.59 3-1.5M6.75 7.508V7.5M11.25 7.508V7.5"
      stroke="#303030"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
));

export {
  DisabledCloudIcon,
  CloudIcon,
  DocsIcon,
  NotepadIcon,
  ConsoleIcon,
  PointerIcon,
  EditIcon,
  RocketIcon,
  ConsoleIconV3,
  BasketBallIcon
}