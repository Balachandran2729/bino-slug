export default function ImageBlock({ src, alt }) {
  return (
    <img
      src={src}
      title={alt || ""}
      alt={alt || ""}
      className="rounded-2xl shadow-md w-50 h-50 object-cover border-2 border-gray-200" 
    />
  );
}