import { FC } from "react";

interface LabelContainerProps {
  label: string;
  children?: any;
  borderColor?: string;
}
const LabelContainer: FC<LabelContainerProps> = ({
  label,
  children,
  borderColor,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        position: "relative",
        verticalAlign: "top",
      }}
    >
      <label
        style={{
          color: borderColor || "rgba(0, 0, 0, 0.6)",
          fontWeight: 400,
          fontSize: "1rem",
          lineHeight: "1.4375em",
          letterSpacing: "0.00938em",
          padding: "0px 8px",
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "calc(133% - 32px)",
          position: "absolute",
          left: "0px",
          top: "-1px",
          transform: "translate(14px, -9px) scale(0.75)",
          transition:
            "color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, maxWidth 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          zIndex: 1,
          pointerEvents: "auto",
          userSelect: "none",
          backgroundColor: "#fff",
        }}
      >
        {label}
      </label>
      <div
        style={{
          borderRadius: "4px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: borderColor || "rgba(0, 0, 0, 0.23)",
          padding: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LabelContainer;
