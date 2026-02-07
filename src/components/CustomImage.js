import { useEffect, useState } from "react";

const CustomImage = ({
  src,
  alt = "image",
  width = "auto",
  height = "auto",
  fallback = "/images/placeholder.png",
  style = {},
  className = "",
  onClick,
  lazy = true,
  fit = "cover",
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setLoading(true);
  }, [src]);

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        ...style,
      }}
    >
      {loading && <div style={loaderStyle}>Loading...</div>}

      <img
        src={imgSrc}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        onLoad={() => setLoading(false)}
        onError={() => {
          setImgSrc(fallback);
          setLoading(false);
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
};

const loaderStyle = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f4f4f4",
  fontSize: 14,
  color: "#777",
};

export default CustomImage;
